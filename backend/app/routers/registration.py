from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.models import User, Seat, Coupon
from ..schemas import UserCreate, UserResponse
from sqlalchemy.exc import SQLAlchemyError
import logging

router = APIRouter()

from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks

import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    logger.info(f"Registering user: {user.email}")
    
    # Validate Email (DNS Check)
    from email_validator import validate_email, EmailNotValidError
    try:
        validate_email(user.email, check_deliverability=True)
    except EmailNotValidError as e:
        raise HTTPException(status_code=400, detail=f"Invalid email: {str(e)}")

    # Check if email exists
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        if db_user.payment_status == "success":
            raise HTTPException(status_code=409, detail="Email already registered and paid")
        else:
            # If payment is pending or failed, delete the old record to allow re-registration
            db.delete(db_user)
            db.commit()
    
    # Determine amount based on early bird availability
    seat = db.query(Seat).first()
    if not seat:
        # Initialize seats if not present
        seat = Seat()
        db.add(seat)
        db.commit()
        db.refresh(seat)
    
    amount = 10000
    payment_status = "pending"
    coupon_used = False
    new_code = None
    payment_id_val = None
    
    # Coupon Logic
    if user.coupon_code:
        coupon = db.query(Coupon).filter(Coupon.code == user.coupon_code, Coupon.is_used == False).first()
        if coupon:
            amount = 0
            payment_status = "success"
            coupon_used = True
            payment_id_val = "Paid by Cash"
            
            # Mark coupon as used
            coupon.is_used = True
            
            # Generate new coupon
            import random, string
            new_code = "TRONIX-" + ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
            new_coupon = Coupon(code=new_code)
            db.add(new_coupon)
            
            # Update seats immediately since it's free/paid
            if seat.available_seats > 0:
                seat.booked_seats += 1
                seat.available_seats -= 1
        else:
            raise HTTPException(status_code=404, detail="Invalid or expired coupon code")
    else:
        if seat.early_bird_taken < seat.early_bird_seats:
            amount = 6000
    
    new_user = User(
        name=user.name,
        email=user.email,
        phone=user.phone,
        college=user.college,
        branch=user.branch,
        year=user.year,
        message=user.message,
        amount=amount,
        payment_status=payment_status,
        payment_id=payment_id_val
    )
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Database error during registration: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error: Could not register user.")
    
    if coupon_used:
        logger.info("Coupon used. Scheduling background emails.")
        from ..services.email import send_admin_coupon_email, send_confirmation_email
        
        # Send admin email (Background)
        if new_code:
            background_tasks.add_task(send_admin_coupon_email, new_code)
        
        # Send user email (Background)
        background_tasks.add_task(
            send_confirmation_email,
            to_email=new_user.email,
            name=new_user.name,
            amount=0,
            payment_id="Paid by Cash",
            registration_date=new_user.registration_date
        )
    
    logger.info("Registration successful. Returning response.")
    return new_user
