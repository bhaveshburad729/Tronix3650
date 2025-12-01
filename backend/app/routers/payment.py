from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.models import User, Seat
from ..schemas import PaymentCreate, PaymentVerify
from ..services.email import send_confirmation_email
from fastapi import BackgroundTasks
import razorpay
import os
import logging
from sqlalchemy.exc import SQLAlchemyError

# Configure logging
logger = logging.getLogger(__name__)

router = APIRouter()

# Initialize Razorpay
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")
client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

@router.post("/create")
def create_payment(payment: PaymentCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == payment.registration_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Create Razorpay Order
    data = {
        "amount": user.amount * 100,  # Amount in paise
        "currency": "INR",
        "receipt": f"receipt_{user.id}",
        "notes": {
            "user_id": user.id,
            "email": user.email
        }
    }

    try:
        order = client.order.create(data=data)
    except razorpay.errors.BadRequestError as e:
        logger.error(f"Razorpay Bad Request: {str(e)}")
        raise HTTPException(status_code=400, detail="Invalid payment request")
    except razorpay.errors.GatewayError as e:
        logger.error(f"Razorpay Gateway Error: {str(e)}")
        raise HTTPException(status_code=502, detail="Payment gateway unavailable")
    except Exception as e:
        logger.error(f"Razorpay Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Could not create payment order")
    
    try:
        user.razorpay_order_id = order['id']
        db.commit()
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Database error saving order ID: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
    return {
        "razorpay_order_id": order['id'],
        "amount": user.amount * 100,
        "currency": "INR",
        "key_id": RAZORPAY_KEY_ID
    }

@router.post("/verify")
def verify_payment(payment: PaymentVerify, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    try:
        # Verify Signature
        client.utility.verify_payment_signature({
            'razorpay_order_id': payment.razorpay_order_id,
            'razorpay_payment_id': payment.razorpay_payment_id,
            'razorpay_signature': payment.razorpay_signature
        })
        
        # Update User
        user = db.query(User).filter(User.razorpay_order_id == payment.razorpay_order_id).first()
        if not user:
             raise HTTPException(status_code=404, detail="User not found")
             
        user.payment_status = "success"
        user.payment_id = payment.razorpay_payment_id
        
        # Update Seats
        seat = db.query(Seat).with_for_update().first()
        if seat.available_seats > 0:
            seat.booked_seats += 1
            seat.available_seats -= 1
            if user.amount == 6000:
                seat.early_bird_taken += 1
        
        db.commit()
        
        # Send Email (Async)
        background_tasks.add_task(
            send_confirmation_email,
            to_email=user.email,
            name=user.name,
            amount=user.amount,
            payment_id=payment.razorpay_payment_id,
            registration_date=user.registration_date
        )
        
        return {"status": "success", "message": "Payment verified"}
        
    except razorpay.errors.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
