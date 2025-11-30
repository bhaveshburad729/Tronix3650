import os
import requests
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

BREVO_API_KEY = os.getenv("BREVO_API_KEY")
BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"
SENDER_EMAIL = os.getenv("SENDER_EMAIL", "shubham.tronix365@gmail.com")

def send_email_via_brevo(to_email: str, subject: str, html_content: str, sender_name: str = "Tronix365", sender_email: str = None):
    if not sender_email:
        sender_email = SENDER_EMAIL
    if not BREVO_API_KEY:
        logger.warning("BREVO_API_KEY not set. Skipping email.")
        return

    headers = {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json"
    }

    payload = {
        "sender": {"name": sender_name, "email": sender_email},
        "to": [{"email": to_email}],
        "subject": subject,
        "htmlContent": html_content
    }

    try:
        response = requests.post(BREVO_API_URL, json=payload, headers=headers, timeout=10)
        response.raise_for_status()
        logger.info(f"Email sent successfully to {to_email}. Message ID: {response.json().get('messageId')}")
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to send email via Brevo: {e}")
        if e.response:
            logger.error(f"Brevo Response: {e.response.text}")

def send_confirmation_email(to_email: str, name: str, amount: int, payment_id: str, registration_date):
    subject = "Registration Confirmed - Tronix365 40-Day Internship"
    
    html_body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #0a0a0a; color: #ffffff; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #00f7ff; border-radius: 10px; padding: 20px;">
            <h1 style="color: #00f7ff; text-align: center;">Welcome to Tronix365!</h1>
            <p>Dear {name},</p>
            <p>Your registration for the <strong>40-Day Embedded & IoT Internship</strong> has been confirmed.</p>
            
            <div style="background-color: #1a1a1a; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h2 style="color: #8338ec; margin-top: 0;">Payment Details:</h2>
                <ul style="list-style: none; padding: 0;">
                    <li><strong>Amount Paid:</strong> ₹{amount}</li>
                    <li><strong>Payment ID:</strong> {payment_id}</li>
                    <li><strong>Date:</strong> {registration_date.strftime('%Y-%m-%d %H:%M:%S') if registration_date else 'N/A'}</li>
                </ul>
            </div>

            <div style="background-color: #1a1a1a; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h2 style="color: #8338ec; margin-top: 0;">Program Details:</h2>
                <ul style="list-style: none; padding: 0;">
                    <li><strong>Start Date:</strong> December 22, 2025</li>
                    <li><strong>Duration:</strong> 40 Days</li>
                    <li><strong>Mode:</strong> 100% Hands-on</li>
                </ul>
            </div>

            <p>We're excited to have you join us!</p>
            <p style="color: #888;">Best regards,<br>Team Tronix365</p>
        </div>
    </body>
    </html>
    """
    
    send_email_via_brevo(to_email, subject, html_body)

def send_admin_coupon_email(new_code: str):
    # Send to admin email (configured in env or hardcoded fallback)
    admin_email = os.getenv("ADMIN_EMAIL", "shubham.tronix365@gmail.com")
    subject = "New Coupon Code Generated"
    
    html_body = f"""
    <html>
        <body>
            <h2>New Coupon Code Generated</h2>
            <p>A coupon was just used. Here is the new code for the next student:</p>
            <h1 style="color: #00f7ff; background: #111; padding: 10px; display: inline-block;">{new_code}</h1>
            <p>Share this code with the next student.</p>
        </body>
    </html>
    """
    
    send_email_via_brevo(admin_email, subject, html_body, sender_name="Tronix365 System")
