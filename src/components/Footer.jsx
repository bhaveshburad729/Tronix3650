import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-tronix-dark/80 border-t border-tronix-secondary/20 py-12 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

                    {/* Brand & Copyright */}
                    <div>
                        <p className="text-2xl font-bold text-tronix-primary mb-4">Tronix365</p>
                        <p className="text-sm text-gray-400 mb-2">Transforming Innovative Ideas Into Reality </p>
                        <div className="mb-4">
                            <span className="inline-block px-3 py-1 rounded-full bg-tronix-primary/10 border border-tronix-primary/20 text-tronix-primary text-xs font-semibold tracking-wide">
                                Since 2017
                            </span>
                        </div>
                        <div className="mb-4 flex gap-4 justify-center md:justify-start">
                            {/* Instagram */}
                            <a href="https://www.instagram.com/tronix365?utm_source=qr&igsh=MXBpODJkcWc3d3Vveg==" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#E1306C] transition-all duration-300 transform hover:scale-110">
                                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path fill="currentColor" fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd" />
                                </svg>
                            </a>
                            {/* WhatsApp */}
                            <a href="https://wa.me/8830153805" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.82.48 3.53 1.31 5.02L2 22l5.12-1.31C8.58 21.48 10.24 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.55 0-3.02-.42-4.31-1.16l-.31-.18-3.21.82.86-3.13-.19-.32C4.34 14.88 3.96 13.47 3.96 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.53-6.04c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.07-.11-.23-.18-.48-.3z" clipRule="evenodd" />
                                </svg>
                            </a>
                            {/* LinkedIn (Profile)
                            <a href="https://www.linkedin.com/in/mangesh-adsule-018259261?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                </svg>
                            </a> */}
                            {/* LinkedIn (Company) */}
                            <a href="https://www.linkedin.com/company/tronix365/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                        <p className="text-sm text-gray-600 hidden md:block">&copy; 2025 Tronix365. All rights reserved.</p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
                        <p className="text-gray-400 mb-2">
                            <span className="block text-tronix-secondary text-sm">Email:</span>
                            <a href="mailto:admin@tronix365.in" className="hover:text-white transition-colors">admin@tronix365.in</a>
                        </p>
                        <p className="text-gray-400">
                            <span className="block text-tronix-secondary text-sm">Phone:</span>
                            <a href="tel:+918830153805" className="hover:text-white transition-colors">+91 88301 53805</a>
                        </p>
                    </div>

                    {/* Address & CEO */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Visit Us</h4>
                        <p className="text-gray-400 text-sm mb-4">
                            <a
                                href="https://maps.app.goo.gl/V65P7a6YWds7MqNN6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors flex flex-col gap-1 items-center md:items-start mx-auto md:mx-0"
                            >
                                <span>Tronix365, Near Datta Mandir,</span>
                                <span>Sinhgad College Campus, Vadgaon Budruk,</span>
                                <span>Pune, Maharashtra 411041</span>
                                <span className="text-tronix-secondary text-xs mt-1 flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    View on Google Maps
                                </span>
                            </a>
                        </p>
                        <div className="border-t border-gray-800 pt-4 mt-4">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Founder & CEO</p>
                            <p className="text-tronix-primary font-medium">Er. Mangesh Sanjay Adsule</p>
                        </div>
                    </div>

                </div>

                {/* Mobile Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-800 text-center md:hidden">
                    <p className="text-sm text-gray-600">&copy; 2025 Tronix365. All rights reserved.</p>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
