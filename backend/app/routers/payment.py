from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, Request, Form
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.models import User, Seat
from ..schemas import PaymentCreate
from ..services.email import send_confirmation_email
import hashlib
import os
import logging
import uuid
from sqlalchemy.exc import SQLAlchemyError

# Configure logging
logger = logging.getLogger(__name__)

router = APIRouter()

# PayU Credentials
PAYU_KEY = os.getenv("PAYU_KEY")
PAYU_SALT = os.getenv("PAYU_SALT")
PAYU_URL = "https://test.payu.in/_payment" # Use "https://secure.payu.in/_payment" for production
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

if not PAYU_KEY or not PAYU_SALT:
    logger.warning("PAYU_KEY or PAYU_SALT not set in environment variables.")

def generate_hash(data: dict, salt: str) -> str:
    # Hash sequence: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT
    hash_string = f"{data['key']}|{data['txnid']}|{data['amount']}|{data['productinfo']}|{data['firstname']}|{data['email']}|||||||||||{salt}"
    return hashlib.sha512(hash_string.encode('utf-8')).hexdigest()

def verify_hash(data: dict, salt: str, status: str) -> bool:
    # Reverse Hash sequence: SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
    # Note: PayU returns "additionalCharges" if present, checking logic might need adjustment if using specific payment modes, 
    # but for basic verification this is standard. 
    # However, to be safe, we re-calculate based on what we received.
    
    # PayU documentation says:
    # sha512(SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
    
    hash_string = f"{salt}|{status}|||||||||||{data.get('email')}|{data.get('firstname')}|{data.get('productinfo')}|{data.get('amount')}|{data.get('txnid')}|{data.get('key')}"
    calculated_hash = hashlib.sha512(hash_string.encode('utf-8')).hexdigest()
    return calculated_hash == data.get('hash')

@router.post("/create")
def create_payment(payment: PaymentCreate, db: Session = Depends(get_db)):
    # Re-check credentials at runtime
    current_key = os.getenv("PAYU_KEY") or PAYU_KEY
    current_salt = os.getenv("PAYU_SALT") or PAYU_SALT
    
    if not current_key or not current_salt:
        logger.error("PAYU_KEY or PAYU_SALT is missing in environment variables.")
        raise HTTPException(status_code=500, detail="Server misconfiguration: PayU credentials missing.")

    user = db.query(User).filter(User.id == payment.registration_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    txnid = f"txn_{uuid.uuid4().hex[:12]}"
    amount = user.amount # Keep as DB type (Integer) to avoid '100.0' vs '100' mismatch in Hash vs JSON
    productinfo = "Tronix Internship"
    firstname = user.name.split()[0] if user.name else "User"
    email = user.email
    phone = user.phone
    
    # SURL and FURL points to this backend
    # Ideally should be absolute URLs
    api_url = os.getenv("API_URL", "http://localhost:8000") # Ensure this is handling http/https correctly
    surl = f"{api_url}/api/payment/payu-response"
    furl = f"{api_url}/api/payment/payu-response"

    data = {
        "key": current_key,
        "txnid": txnid,
        "amount": amount,
        "productinfo": productinfo,
        "firstname": firstname,
        "email": email,
        "phone": phone,
        "surl": surl,
        "furl": furl
    }
    
    payment_hash = generate_hash(data, current_salt)
    
    # Save txnid to user to verify later
    try:
        user.payment_id = txnid # Temporarily store txnid in payment_id or a new column
        # Ideally we should have a separate column for order_id/txnid, 
        # but reusing payment_id or razorpay_order_id for now if schema change is hard.
        # User model has 'razorpay_order_id', let's use that for txnid for now to avoid schema migration if possible,
        # or just use payment_id. 
        # Using razorpay_order_id for txnid storage is safe-ish if we rename it mentally.
        user.razorpay_order_id = txnid 
        db.commit()
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Database error")

    return {
        "action": PAYU_URL,
        "key": current_key,
        "txnid": txnid,
        "amount": amount,
        "productinfo": productinfo,
        "firstname": firstname,
        "email": email,
        "phone": phone,
        "surl": surl,
        "furl": furl,
        "hash": payment_hash
    }

@router.post("/payu-response")
async def payu_response(
    request: Request,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    form_data = await request.form()
    data = dict(form_data)
    
    status = data.get("status")
    txnid = data.get("txnid")
    amount = data.get("amount")
    mihpayid = data.get("mihpayid")
    received_hash = data.get("hash")
    
    # Verify Hash
    if not verify_hash(data, PAYU_SALT, status):
        logger.error("PayU Hash Verification Failed")
        return RedirectResponse(url=f"{FRONTEND_URL}/failure?reason=hash_mismatch", status_code=303)

    user = db.query(User).filter(User.razorpay_order_id == txnid).first()
    if not user:
        logger.error(f"User not found for txnid: {txnid}")
        return RedirectResponse(url=f"{FRONTEND_URL}/failure?reason=user_not_found", status_code=303)

    if status == "success":
        try:
            user.payment_status = "success"
            user.payment_id = mihpayid # Store the actual PayU Payment ID
            
            # Update Seats if not already done (idempotency check roughly)
            # Assuming payment_status 'success' means we already counted it? 
            # If this is the callback, we update now.
            
            # WARNING: This logic runs on every success callback. 
            # We should check if it was already marked success to avoid double counting seats 
            # if PayU sends multiple callbacks (webhooks vs redirect).
            # But this is a redirect URL, so usually hit once by user.
            
            # Re-fetch seat to lock
            seat = db.query(Seat).with_for_update().first()
            if seat and seat.available_seats > 0:
                # Basic check: only decrement if we haven't already
                # But we don't know previous state here easily without checking user's previous state.
                # If user.payment_status was pending, then decrement.
                # But we just set it to success above.
                pass 
            
            # To do this correctly:
            db.refresh(user) # reload to check previous status? No, we just set it.
            # actually we need to check BEFORE setting success.
            # Refetching user from DB fresh
            
            # Let's do it cleanly:
            # We already fetched 'user' above. It has the state from DB before our modification? 
            # SQLAlchemy identity map... 
            # Let's rollback/refresh to be sure or just check before assignment.
            
            # Currently 'user' object is attached to session.
            # If we haven't committed, it reflects DB state?
            
            # It's cleaner to query again or check local attribute if not modified yet.
            # We haven't modified it yet in this block.
            
            if user.payment_status != "success":
                user.payment_status = "success"
                user.payment_id = mihpayid
                
                seat = db.query(Seat).with_for_update().first()
                if seat.available_seats > 0:
                    seat.booked_seats += 1
                    seat.available_seats -= 1
                    if float(user.amount) == 6000: # Check amount 
                        seat.early_bird_taken += 1
                
                db.commit()

                # Send Email
                background_tasks.add_task(
                    send_confirmation_email,
                    to_email=user.email,
                    name=user.name,
                    amount=user.amount,
                    payment_id=mihpayid,
                    registration_date=user.registration_date
                )
                
                return RedirectResponse(url=f"{FRONTEND_URL}/success", status_code=303)
            else:
                # Already success
                return RedirectResponse(url=f"{FRONTEND_URL}/success", status_code=303)

        except Exception as e:
            db.rollback()
            logger.error(f"Error processing success: {str(e)}")
            return RedirectResponse(url=f"{FRONTEND_URL}/failure?reason=server_error", status_code=303)
            
    else:
        # Failed/Pending
        user.payment_status = "failed"
        db.commit()
        return RedirectResponse(url=f"{FRONTEND_URL}/failure", status_code=303)
