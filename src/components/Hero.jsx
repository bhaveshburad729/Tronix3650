import React, { useState, useEffect } from 'react';

const Hero = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [seats, setSeats] = useState({ available_seats: 150, total_seats: 150 });

    useEffect(() => {
        const targetDate = new Date('2026-01-05T00:00:00');

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // SSE connection for real-time seat updates
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const eventSource = new EventSource(`${apiUrl}/api/seats/stream`);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setSeats(data);
        };

        eventSource.onerror = (err) => {
            console.error("EventSource failed:", err);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const scrollToPricing = () => {
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tronix-dark/80 to-tronix-dark z-0"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tronix-primary/20 rounded-full blur-[128px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tronix-secondary/20 rounded-full blur-[128px] animate-pulse delay-1000"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="mb-8 inline-block">
                    <span className="px-4 py-2 rounded-full border border-tronix-primary/30 bg-tronix-primary/10 text-tronix-primary text-sm font-semibold tracking-wider uppercase animate-fade-in-up">
                        Registration Open for Batch 2026
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up delay-100">
                    <span className="text-white">40-Days Embedded &</span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-tronix-primary to-tronix-secondary animate-text-glow">
                        IoT Internship
                    </span>
                </h1>

                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300 mb-10 animate-fade-in-up delay-200">
                    Transforming Students into Industry-Ready Engineers. Master the art of hardware and firmware design.
                </p>

                {/* Countdown Timer */}
                <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up delay-300">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                        <div key={unit} className="flex flex-col items-center bg-[#111] border border-tronix-primary/30 rounded-lg p-4 w-24 shadow-lg shadow-tronix-primary/10">
                            <span className="text-3xl font-mono font-bold text-white">
                                {String(value).padStart(2, '0')}
                            </span>
                            <span className="text-xs text-gray-400 uppercase mt-1">{unit}</span>
                        </div>
                    ))}
                </div>

                {/* Seat Counter */}
                <div className="mb-10 animate-fade-in-up delay-400">
                    <div className="inline-flex items-center bg-[#111] border border-red-500/50 rounded-full px-6 py-2 shadow-lg shadow-red-500/20">
                        <span className="relative flex h-3 w-3 mr-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        <span className="text-red-400 font-bold tracking-wide">
                            Only {seats.available_seats} Seats of {seats.total_seats} Left!
                        </span>
                    </div>
                </div>

                <div className="animate-fade-in-up delay-500">
                    <button
                        onClick={scrollToPricing}
                        className="px-8 py-4 bg-tronix-primary text-tronix-dark font-extrabold rounded-full text-lg uppercase tracking-wide hover:bg-white hover:text-tronix-secondary transition-all duration-300 shadow-lg shadow-tronix-primary/40 hover:scale-105"
                    >
                        Secure Your Seat Now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
