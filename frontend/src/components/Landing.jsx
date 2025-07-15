import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import SelectionModal from './SelectionModal'; // We created this in a previous step

// Helper component for on-scroll animations
const MotionSection = ({ children, className = "", id = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.section
            id={id}
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
        >
            {children}
        </motion.section>
    );
};

// Helper component for animated numbers
function AnimatedNumber({ value, isInt = true }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            animate(0, value, {
                duration: 2,
                onUpdate(latest) {
                    if (ref.current) {
                        ref.current.textContent = latest.toLocaleString('en-US', { 
                            maximumFractionDigits: isInt ? 0 : 1 
                        });
                    }
                }
            });
        }
    }, [isInView, value, isInt]);

    return <span ref={ref}>0</span>;
}


const Landing = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => {
            setFormSubmitted(false);
        }, 5000);
    };

    return (
        <div className="bg-white font-sans text-primary antialiased">
            <AnimatePresence>
                {isModalOpen && <SelectionModal closeModal={() => setIsModalOpen(false)} />}
            </AnimatePresence>

            {/* Section 1: Hero Section */}
            <section className="min-h-screen bg-primary text-white flex flex-col items-center justify-center text-center p-6 relative isolate overflow-hidden">
                 <svg
                    viewBox="0 0 1024 1024"
                    className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                    aria-hidden="true"
                >
                    <circle cx={512} cy={512} r={512} fill="url(#gradient-hero)" fillOpacity="0.7" />
                    <defs>
                        <radialGradient id="gradient-hero">
                            <stop stopColor="#00C9A7" />
                            <stop offset={1} stopColor="#0A2A43" />
                        </radialGradient>
                    </defs>
                </svg>
                <div className="relative z-10">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-extrabold text-white"
                    >
                        Closing the Justice Gap with Artificial Intelligence.
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-300"
                    >
                        LawLine AI provides instant, affordable, and localized legal guidance for individuals, businesses, and governments. The future of legal access is here.
                    </motion.p>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-accent text-primary font-bold px-8 py-4 rounded-full w-full sm:w-auto hover:bg-white transition-colors duration-300 transform hover:scale-105"
                        >
                            Try Free Now
                        </button>
                        <a href="#contact" className="text-slate-300 hover:text-white transition-colors duration-300">View Investor Brief</a>
                    </motion.div>
                </div>
            </section>

            {/* Section 2: The Problem */}
            <MotionSection className="py-24 bg-light-gray">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold">Justice is a Universal Right, Not a Privilege.</h2>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        <div className="text-center">
                            <p className="text-6xl md:text-7xl font-extrabold text-accent"><AnimatedNumber value={5.1} isInt={false} />B</p>
                            <p className="mt-4 text-slate-600 text-lg">people worldwide lack meaningful access to justice, leaving them vulnerable.</p>
                        </div>
                        <div className="text-center">
                            <p className="text-6xl md:text-7xl font-extrabold text-accent"><AnimatedNumber value={86} />%</p>
                            <p className="mt-4 text-slate-600 text-lg">of civil legal problems for low-income Americans receive inadequate or no legal help.</p>
                        </div>
                        <div className="text-center">
                            <p className="text-6xl md:text-7xl font-extrabold text-accent">$<AnimatedNumber value={300} /></p>
                            <p className="mt-4 text-slate-600 text-lg">is the average cost of a basic legal consultation, making it unaffordable for millions.</p>
                        </div>
                        <div className="text-center">
                            <p className="text-6xl md:text-7xl font-extrabold text-accent"><AnimatedNumber value={50000} />₸</p>
                            <p className="mt-4 text-slate-600 text-lg">is the potential cost for a simple uncontested divorce in Kazakhstan, a major barrier.</p>
                        </div>
                    </div>
                </div>
            </MotionSection>

            {/* Rest of the sections would follow the same pattern... */}
            {/* For brevity, I will only include the sections relevant to our discussion, you can fill in the rest if needed */}

            {/* Section 4: Our Specialized Assistants */}
            <MotionSection id="assistants" className="py-24 bg-white">
                {/* ... This section's code for tabs goes here ... */}
            </MotionSection>
            
            {/* Section 7: Pricing & Plans */}
            <MotionSection id="pricing" className="py-24 bg-light-gray">
                {/* ... This section's code for the pricing table goes here ... */}
            </MotionSection>

            {/* Section 8: Get in Touch */}
            <MotionSection id="contact" className="py-24">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
                    <div>
                        <h3 className="text-3xl font-bold">Let's Discuss Your Needs</h3>
                        <p className="mt-4 text-lg text-slate-600">Whether you are a government entity, a business, or an investor, we're ready to talk.</p>
                        <div className="mt-8 space-y-4">
                            <p className="flex items-center gap-3"><span className="text-accent">@</span> abdbilminn@gmail.com</p>
                            <p className="flex items-center gap-3"><span className="text-accent">📞</span> +7 (778) 336-33-63</p>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <AnimatePresence mode="wait">
                            {!formSubmitted ? (
                                <motion.div
                                    key="form"
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <h3 className="text-2xl font-bold">Schedule a Demonstration</h3>
                                    <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                                        <div>
                                            <label htmlFor="full-name" className="block text-sm font-medium text-slate-700">Full Name</label>
                                            <input type="text" name="full-name" id="full-name" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Work Email</label>
                                            <input type="email" name="email" id="email" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
                                        </div>
                                        <div>
                                            <label htmlFor="organization" className="block text-sm font-medium text-slate-700">Company / Organization</label>
                                            <input type="text" name="organization" id="organization" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
                                        </div>
                                        <div>
                                            <label htmlFor="interest" className="block text-sm font-medium text-slate-700">I am interested in...</label>
                                            <select id="interest" name="interest" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                                <option>Business Plan</option>
                                                <option>Government Plan</option>
                                                <option>API Integration</option>
                                                <option>Investing</option>
                                            </select>
                                        </div>
                                        <div>
                                            <button type="submit" className="w-full bg-accent text-primary font-bold py-3 px-4 rounded-md hover:opacity-90 transition-opacity">Submit Request</button>
                                        </div>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-10"
                                >
                                    <div className="text-5xl mb-4">✅</div>
                                    <h3 className="text-2xl font-bold">Thank You!</h3>
                                    <p className="text-slate-600 mt-2">Your request has been received. We will be in touch shortly.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </MotionSection>

            {/* Section 9: Footer */}
            <footer className="bg-primary text-white">
                <div className="container mx-auto px-6 py-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="font-bold text-lg">Product</h4>
                            <ul className="mt-4 space-y-2 text-slate-300">
                                <li><a href="#assistants" className="hover:text-white">Features</a></li>
                                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-bold text-lg">Company</h4>
                            <ul className="mt-4 space-y-2 text-slate-300">
                                <li><a href="#" className="hover:text-white">About Us</a></li>
                                <li><a href="#contact" className="hover:text-white">Contact</a></li>
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-bold text-lg">Legal</h4>
                            <ul className="mt-4 space-y-2 text-slate-300">
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-bold text-lg">Contact</h4>
                            <ul className="mt-4 space-y-2 text-slate-300">
                                <li>kadylbekd@gmail.com</li>
                                <li>+7 (708) 927-26-91</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-16 border-t border-slate-700 pt-8 text-center text-slate-400">
                        <p>&copy; {new Date().getFullYear()} LawLine AI. All Rights Reserved. Made in Kazakhstan.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;