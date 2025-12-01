from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import registration, payment, seats
from fastapi import Request
from fastapi.responses import JSONResponse
import logging

logger = logging.getLogger(__name__)

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Tronix365 API")

from fastapi.middleware.trustedhost import TrustedHostMiddleware
import os

# Security: Trusted Host Middleware
# In production, set ALLOWED_HOSTS to your domain (e.g., "tronix365.com")
allowed_hosts = os.getenv("ALLOWED_HOSTS", "*").split(",")
app.add_middleware(
    TrustedHostMiddleware, 
    allowed_hosts=allowed_hosts
)

# Security: CORS
# Allow ALL origins to fix connection issues
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"], # Restrict methods
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal Server Error. Please try again later."},
    )

app.include_router(registration.router, prefix="/api", tags=["Registration"])
app.include_router(payment.router, prefix="/api/payment", tags=["Payment"])
app.include_router(seats.router, prefix="/api/seats", tags=["Seats"])

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
