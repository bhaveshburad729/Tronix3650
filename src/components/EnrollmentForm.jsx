import React, { useState } from 'react';
import axios from 'axios';

const EnrollmentForm = ({ onRegisterSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        confirmEmail: '',
        phone: '',
        college: '',
        branch: '',
        year: '',

        message: '',
        couponCode: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.email !== formData.confirmEmail) {
            setError("Emails do not match!");
            setLoading(false);
            return;
        }

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            // Send couponCode in the payload (UserCreate schema needs to match)
            const payload = {
                ...formData,
                coupon_code: formData.couponCode || null
            };
            const response = await axios.post(`${apiUrl}/api/register`, payload);

            if (response.data.amount === 0) {
                // Free registration (Coupon) - Show modal for "Pay 0" experience
                onRegisterSuccess(response.data);
            } else {
                onRegisterSuccess(response.data);
            }
        } catch (err) {
            setError(err.response?.data?.detail || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="enroll" className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-tronix-primary/20 mt-16">
            <h2 className="text-5xl font-bold text-center mb-12 text-white tracking-tight">
                Ready to <span className="text-tronix-secondary">Join?</span>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6 bg-[#111] p-8 rounded-xl shadow-2xl shadow-tronix-primary/20 border border-tronix-primary/30">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="mt-1 block w-full px-4 py-3 bg-tronix-dark border border-gray-600 rounded-lg text-white focus:ring-tronix-primary focus:border-tronix-primary transition duration-200"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@college.com"
                        required
                        pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                        className="mt-1 block w-full px-4 py-3 bg-tronix-dark border border-gray-600 rounded-lg text-white focus:ring-tronix-primary focus:border-tronix-primary transition duration-200"
                    />
                </div>
                <div>
                    <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-300">Confirm Email Address</label>
                    <input
                        type="email"
                        id="confirmEmail"
                        name="confirmEmail"
                        value={formData.confirmEmail}
                        onChange={handleChange}
                        placeholder="Re-enter your email"
                        required
                        onPaste={(e) => e.preventDefault()} // Prevent pasting to force typing
                        className="mt-1 block w-full px-4 py-3 bg-tronix-dark border border-gray-600 rounded-lg text-white focus:ring-tronix-primary focus:border-tronix-primary transition duration-200"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        required
                        className="mt-1 block w-full px-4 py-3 bg-tronix-dark border border-gray-600 rounded-lg text-white focus:ring-tronix-primary focus:border-tronix-primary transition duration-200"
                    />
                </div>
                <div>
                    <label htmlFor="college" className="block text-sm font-medium text-gray-300">College Name</label>
                    <input
                        type="text"
                        id="college"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        placeholder="Your College Name"
                        required
                        className="mt-1 block w-full px-4 py-3 bg-tronix-dark border border-gray-600 rounded-lg text-white focus:ring-tronix-primary focus:border-tronix-primary transition duration-200"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="branch" className="block text-sm font-medium text-gray-300">Branch</label>
                        <input
                            type="text"
                            id="branch"
                            name="branch"
                            value={formData.branch}
                            onChange={handleChange}
                            placeholder="e.g. ECE/CSE"
                            required
                            className="mt-1 block w-full px-4 py-3 bg-tronix-dark border border-gray-600 rounded-lg text-white focus:ring-tronix-primary focus:border-tronix-primary transition duration-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-300">Year of Study</label>
                        <select
                            id="year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-3 bg-tronix-dark border border-gray-600 rounded-lg text-white focus:ring-tronix-primary focus:border-tronix-primary transition duration-200"
                        >
                            <option value="">Select Year</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                            <option value="Graduate">Graduate</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300">Your College / Query (Optional)</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="3"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your background or any questions you have."
                        className="mt-1 block w-full px-4 py-3 bg-tronix-dark border border-gray-600 rounded-lg text-white focus:ring-tronix-primary focus:border-tronix-primary transition duration-200"
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="couponCode" className="block text-sm font-medium text-tronix-secondary">Have a Coupon Code?</label>
                    <input
                        type="text"
                        id="couponCode"
                        name="couponCode"
                        value={formData.couponCode}
                        onChange={handleChange}
                        placeholder="Enter Code (e.g. TRONIX-XY92)"
                        className="mt-1 block w-full px-4 py-3 bg-tronix-dark border border-tronix-secondary/50 rounded-lg text-white focus:ring-tronix-secondary focus:border-tronix-secondary transition duration-200"
                    />
                    <p className="text-xs text-gray-500 mt-1">If valid, your registration will be free.</p>
                </div>

                {error && (
                    <div className="text-red-400 text-sm text-center font-medium">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-tronix-primary text-tronix-dark font-extrabold rounded-lg text-lg uppercase transition-all duration-300 hover:bg-white hover:text-tronix-secondary shadow-lg shadow-tronix-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Processing...' : 'Submit Enrollment Request'}
                </button>
            </form>
        </section>
    );
};

export default EnrollmentForm;
