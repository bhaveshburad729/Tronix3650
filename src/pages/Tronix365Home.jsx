import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Inline Icons
const MenuIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
);

const XIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const ChevronRightIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 18 15 12 9 6"></polyline></svg>
);

const ArrowRightIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);

const CpuIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
);

const WifiIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
);

const DatabaseIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s 9-1.34 9-3V5"></path></svg>
);

const ActivityIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);

const ServiceCard = ({ icon: Icon, title, description, delay }) => (
    <div
        className="bg-gray-900/50 p-6 rounded-xl shadow-lg border border-gray-800 group hover:border-[#00f7ff] transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm relative overflow-hidden animate-fade-in-up"
        style={{ animationDelay: delay }}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-[#00f7ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#00f7ff]/20 transition-colors duration-300 relative z-10">
            <Icon className="w-6 h-6 text-[#00f7ff] group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2 relative z-10">{title}</h3>
        <p className="text-gray-400 leading-relaxed relative z-10 group-hover:text-gray-300 transition-colors">
            {description}
        </p>
    </div>
);

const Tronix365Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans tech-bg selection:bg-[#00f7ff] selection:text-black">
            {/* Navigation */}
            <nav className="bg-[#0a0a0a]/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0 flex items-center gap-2 group cursor-pointer">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#00f7ff] to-blue-600 rounded-lg flex items-center justify-center text-black font-bold text-lg shadow-[0_0_15px_rgba(0,247,255,0.5)] group-hover:shadow-[0_0_25px_rgba(0,247,255,0.8)] transition-shadow duration-300">T</div>
                            <span className="font-bold text-xl text-white tracking-tight group-hover:text-[#00f7ff] transition-colors">TRONIX365</span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8 items-center">
                            <a href="#services" className="text-gray-300 hover:text-[#00f7ff] transition-colors font-medium hover:shadow-[0_0_10px_rgba(0,247,255,0.3)]">Expertise</a>
                            <a href="#about" className="text-gray-300 hover:text-[#00f7ff] transition-colors font-medium hover:shadow-[0_0_10px_rgba(0,247,255,0.3)]">About</a>
                            <a href="#contact" className="text-gray-300 hover:text-[#00f7ff] transition-colors font-medium hover:shadow-[0_0_10px_rgba(0,247,255,0.3)]">Contact</a>
                            <Link
                                to="/internship"
                                className="bg-gradient-to-r from-blue-600 to-[#00f7ff] text-black px-5 py-2 rounded-full font-bold hover:shadow-[0_0_20px_rgba(0,247,255,0.5)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                            >
                                Internship Program <ArrowRightIcon size={16} />
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button onClick={toggleMenu} className="text-gray-300 hover:text-white focus:outline-none">
                                {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-gray-900 border-t border-gray-800 absolute w-full shadow-lg">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a href="#services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-[#00f7ff] hover:bg-gray-800">Expertise</a>
                            <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-[#00f7ff] hover:bg-gray-800">About</a>
                            <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-[#00f7ff] hover:bg-gray-800">Contact</a>
                            <Link
                                to="/internship"
                                className="block w-full text-center mt-4 px-5 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-[#00f7ff] text-black font-bold hover:shadow-[0_0_15px_rgba(0,247,255,0.4)]"
                            >
                                Join Internship
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <div className="relative overflow-hidden pt-10">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20 px-4 sm:px-6 lg:px-8">
                        <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                    <span className="block xl:inline">Transforming Ideas</span>{' '}
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00f7ff] to-blue-500 xl:inline animate-pulse-slow">into Reality</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                    TRONIX365 is your trusted R&D partner in electronics, pioneering innovation from concept to creation. We bring groundbreaking ideas to life.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                                    <div className="rounded-md shadow">
                                        <Link
                                            to="/internship"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-md text-black bg-gradient-to-r from-[#00f7ff] to-blue-600 hover:shadow-[0_0_30px_rgba(0,247,255,0.6)] md:py-4 md:text-lg transition-all transform hover:scale-105"
                                        >
                                            Join 40-Day Internship
                                        </Link>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <a
                                            href="#contact"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-[#00f7ff]/30 text-base font-medium rounded-md text-[#00f7ff] bg-transparent hover:bg-[#00f7ff]/10 md:py-4 md:text-lg transition-all"
                                        >
                                            Contact Us
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-center justify-center p-8 opacity-90">
                    <div className="relative w-full max-w-lg animate-float">
                        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
                        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
                        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-4000"></div>
                        <img
                            className="relative rounded-2xl shadow-[0_0_50px_rgba(0,247,255,0.15)] ring-1 ring-white/10 w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                            alt="Engineering Team"
                        />
                    </div>
                </div>
            </div>

            {/* Expertise Section */}
            <section id="services" className="py-20 relative bg-[#0a0a0a]">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <h2 className="text-base text-[#00f7ff] font-semibold tracking-wide uppercase shadow-[0_0_10px_rgba(0,247,255,0.2)] inline-block px-2">What We Do</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                            Our Core Expertise
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
                            Delivering cutting-edge solutions across multiple domains of electronics and automation.
                        </p>
                    </div>

                    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <ServiceCard
                            icon={CpuIcon}
                            title="Robotics & Automation"
                            description="Designing and implementing intelligent robotic solutions for various industries, enhancing efficiency and precision."
                            delay="0s"
                        />
                        <ServiceCard
                            icon={WifiIcon}
                            title="Embedded Systems"
                            description="Developing robust and efficient embedded systems for diverse applications, from consumer electronics to industrial control."
                            delay="0.2s"
                        />
                        <ServiceCard
                            icon={DatabaseIcon}
                            title="Industrial IoT"
                            description="Connecting industrial assets to the cloud for real-time monitoring, data analysis, and predictive maintenance."
                            delay="0.4s"
                        />
                        <ServiceCard
                            icon={ActivityIcon}
                            title="Dataloggers"
                            description="Creating custom datalogging solutions for accurate and reliable data acquisition in challenging environments."
                            delay="0.6s"
                        />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-[#0f0f0f] border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <div className="mb-12 lg:mb-0">
                            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
                                About <span className="text-[#00f7ff]">TRONIX365</span>
                            </h2>
                            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                                At TRONIX365, we are passionate about transforming complex challenges into innovative electronic solutions. With a dedicated team of R&D engineers, we specialize in bringing groundbreaking ideas to life, from initial concept to final product deployment.
                            </p>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                Our commitment to excellence and continuous innovation drives us to deliver cutting-edge solutions in robotics, automation, embedded systems, Industrial IoT, and datalogging, empowering businesses to achieve their full potential.
                            </p>
                            <div className="mt-8">
                                <Link to="/internship" className="text-[#00f7ff] font-semibold hover:text-white flex items-center gap-2 group transition-colors">
                                    Check out our Internship Program <ChevronRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00f7ff]/20 to-purple-500/20 rounded-2xl blur-xl transform rotate-3"></div>
                            <div className="aspect-w-3 aspect-h-2 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-gray-800 relative z-10">
                                <img
                                    src="/innovation_lab.png"
                                    alt="Innovation Lab"
                                    className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                />
                            </div>                    </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-16 overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-md"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        Ready to start your journey?
                    </h2>
                    <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
                        Join our 40-Day Embedded & IoT Internship Program and master the skills of tomorrow.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <Link
                            to="/internship"
                            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-bold rounded-md text-black bg-gradient-to-r from-[#00f7ff] to-blue-600 hover:shadow-[0_0_40px_rgba(0,247,255,0.6)] md:py-4 md:text-lg transition-all transform hover:scale-105"
                        >
                            Enroll Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-black text-gray-300 py-12 border-t border-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h3 className="text-white text-lg font-bold mb-4">TRONIX365</h3>
                            <p className="text-gray-500">
                                Transforming ideas into reality through innovation in electronics and automation.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
                            <p className="text-gray-500">Pune, Maharashtra, India</p>
                            <p className="text-gray-500">Email: contact@tronix365.com</p>
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><Link to="/" className="text-gray-500 hover:text-[#00f7ff] transition-colors">Home</Link></li>
                                <li><Link to="/internship" className="text-gray-500 hover:text-[#00f7ff] transition-colors">Internship</Link></li>
                                <li><a href="#about" className="text-gray-500 hover:text-[#00f7ff] transition-colors">About Us</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-600">© {new Date().getFullYear()} TRONIX365. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            {/* Social placeholders */}
                            <a href="#" className="text-gray-600 hover:text-[#00f7ff] transition-colors">LinkedIn</a>
                            <a href="#" className="text-gray-600 hover:text-[#00f7ff] transition-colors">Twitter</a>
                            <a href="#" className="text-gray-600 hover:text-[#00f7ff] transition-colors">Facebook</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Tronix365Home;
