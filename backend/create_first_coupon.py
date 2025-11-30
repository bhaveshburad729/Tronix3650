from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import DATABASE_URL, Base
from app.models.models import Coupon
import random, string

def create_first_coupon():
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    
    # Ensure table exists
    Base.metadata.create_all(bind=engine)
    
    # Generate Code done 
    code = "TRONIX-" + ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    
    coupon = Coupon(code=code)
    db.add(coupon)
    db.commit()
    
    print(f"First Coupon Created: {code}")
    print("Share this code with the first student!")
    
    # Send email
    try:
        from app.services.email import send_admin_coupon_email
        send_admin_coupon_email(code)
    except Exception as e:
        print(f"Could not send email: {e}")

if __name__ == "__main__":
    create_first_coupon()
