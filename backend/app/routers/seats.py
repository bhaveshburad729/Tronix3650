from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError
import logging

logger = logging.getLogger(__name__)
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.models import Seat
from ..schemas import SeatResponse
from fastapi.responses import StreamingResponse
import asyncio
import json

router = APIRouter()

@router.get("/available", response_model=SeatResponse)
def get_seats(db: Session = Depends(get_db)):
    try:
        seat = db.query(Seat).first()
        if not seat:
            # Initialize default
            seat = Seat(total_seats=150, available_seats=150)
            db.add(seat)
            db.commit()
            db.refresh(seat)
    except SQLAlchemyError as e:
        logger.error(f"Database error fetching seats: {str(e)}")
        raise HTTPException(status_code=500, detail="Could not fetch seat availability")
        
    return {
        "total_seats": seat.total_seats,
        "booked_seats": seat.booked_seats,
        "available_seats": seat.available_seats,
        "early_bird_available": seat.early_bird_seats - seat.early_bird_taken
    }

@router.get("/stream")
async def seat_stream(db: Session = Depends(get_db)):
    async def event_generator():
        while True:
            try:
                # Ensure we get fresh data from the DB
                db.expire_all()
                
                seat = db.query(Seat).first()
                if seat:
                    data = {
                        "total_seats": seat.total_seats,
                        "booked_seats": seat.booked_seats,
                        "available_seats": seat.available_seats,
                        "early_bird_available": seat.early_bird_seats - seat.early_bird_taken
                    }
                    yield f"data: {json.dumps(data)}\n\n"
            except Exception as e:
                logger.error(f"Error in seat stream: {str(e)}")
                # In SSE, we can't easily raise an HTTP exception once streaming starts, 
                # but we can log it and potentially stop the stream or send an error event.
                yield f"event: error\ndata: {json.dumps({'error': 'Internal Server Error'})}\n\n"
                await asyncio.sleep(5) # Wait a bit before retrying
            
            await asyncio.sleep(2)  # Update every 2 seconds

    return StreamingResponse(event_generator(), media_type="text/event-stream")
