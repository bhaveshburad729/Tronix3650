from backend.app.database import engine, Base
from backend.app.models.models import User, Seat, Coupon

def init_db():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully.")

if __name__ == "__main__":
    init_db()
