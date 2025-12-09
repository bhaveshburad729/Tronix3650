import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaymentModal = ({ user, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePayment = async () => {
        setLoading(true);
        setError('');
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

            // Special handling for Coupon (Amount 0)
            if (user.amount === 0) {
                // Simulate a short delay for better UX
                setTimeout(() => {
                    navigate('/success');
                }, 1000);
                return;
            }

            // 1. Get PayU Details from Backend
            const orderResponse = await axios.post(`${apiUrl}/api/payment/create`, {
                registration_id: user.id,
                amount: user.amount
            });

            const { action, ...formData } = orderResponse.data;

            // 2. Create Form and Submit
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = action;
            form.style.display = 'none';

            for (const key in formData) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = formData[key];
                form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();

        } catch (err) {
            console.error(err);
            setError('Failed to initiate payment. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-[#111] border border-tronix-primary/30 p-8 rounded-xl max-w-md w-full shadow-2xl shadow-tronix-primary/20 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    ✕
                </button>

                <h3 className="text-2xl font-bold text-white mb-6 text-center">Complete Your Enrollment</h3>

                <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-gray-300">
                        <span>Name:</span>
                        <span className="font-medium text-white">{user.name}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                        <span>Email:</span>
                        <span className="font-medium text-white">{user.email}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                        <span>Amount:</span>
                        <span className="font-medium text-tronix-primary text-xl">₹{user.amount}</span>
                    </div>
                </div>

                {error && (
                    <div className="text-red-400 text-sm text-center mb-4">
                        {error}
                    </div>
                )}

                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full py-3 bg-tronix-primary text-tronix-dark font-extrabold rounded-lg text-lg uppercase transition-all duration-300 hover:bg-white hover:text-tronix-secondary shadow-lg shadow-tronix-primary/40 disabled:opacity-50"
                >
                    {loading ? 'Redirecting to PayU...' : (user.amount === 0 ? 'Complete Registration' : 'Pay Now')}
                </button>
            </div>
        </div>
    );
};

export default PaymentModal;
