import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import SelectionModal from './SelectionModal'; // Import our new modal component

// Helper component for animated numbers (no changes)
function AnimatedNumber({ value }) { /* ... same as before ... */ }

// Helper for on-scroll animations (no changes)
const MotionSection = ({ children, className = "" }) => { /* ... same as before ... */ };

// Main Landing Page Component
const Landing = () => {
    // --- STATE MANAGEMENT ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleFormSubmit = (event) => {
        event.preventDefault(); // Prevent page reload
        setFormSubmitted(true);
        // Optional: Reset form after a few seconds
        setTimeout(() => {
            setFormSubmitted(false);
        }, 5000);
    };

    // Canvas animation logic (no changes)
    const canvasRef = useRef(null);
    useEffect(() => { /* ... same as before ... */ }, []);

    return (
        <div className="bg-white font-sans text-primary antialiased">
            <AnimatePresence>
                {isModalOpen && <SelectionModal closeModal={() => setIsModalOpen(false)} />}
            </AnimatePresence>

            {/* Section 1: Hero Section */}
            <section className="min-h-screen bg-primary text-white ..."> {/* ... same as before ... */}
                <div className="relative z-10">
                    {/* ... same hero content ... */}
                    <motion.div /* ... */ >
                        {/* THIS BUTTON NOW OPENS THE MODAL */}
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-accent text-primary font-bold px-8 py-4 rounded-full w-full sm:w-auto hover:bg-white transition-colors duration-300 transform hover:scale-105"
                        >
                            Try Free Now
                        </button>
                        <a href="#investor" className="text-slate-300 hover:text-white transition-colors duration-300">View Investor Brief</a>
                    </motion.div>
                </div>
            </section>

            {/* Section 4: Specialized Assistants - ADDING ID */}
            <MotionSection id="assistants" className="py-24 bg-light-gray">
                 {/* ... same section content ... */}
            </MotionSection>

            {/* Section 7: Pricing & Plans - ADDING ID */}
            <MotionSection id="pricing" className="py-24 bg-white">
                {/* ... same section content ... */}
            </MotionSection>

            {/* Section 8: Get in Touch - ADDING ID and FORM LOGIC */}
            <MotionSection id="contact" className="py-24 bg-light-gray">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
                    {/* ... same contact details on the left ... */}
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <AnimatePresence mode="wait">
                            {!formSubmitted ? (
                                <motion.div
                                    key="form"
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <h3 className="text-2xl font-bold">Schedule a Demonstration</h3>
                                    <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                                        {/* ... all form fields are the same ... */}
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

            {/* Section 9: Footer - UPDATED LINKS */}
            <footer className="bg-primary text-white">
                <div className="container mx-auto px-6 py-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="font-bold text-lg">Product</h4>
                            <ul className="mt-4 space-y-2 text-slate-300">
                                <li><a href="#assistants" className="hover:text-white">Features</a></li>
                                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                                {/* These are examples of links that scroll to sections */}
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-bold text-lg">Company</h4>
                            <ul className="mt-4 space-y-2 text-slate-300">
                                <li><a href="#" className="hover:text-white">About Us</a></li>
                                <li><a href="#" className="hover:text-white">Investor Relations</a></li>
                                <li><a href="#contact" className="hover:text-white">Contact</a></li>
                            </ul>
                        </div>
                         {/* ... other footer columns ... */}
                    </div>
                    {/* ... copyright ... */}
                </div>
            </footer>
        </div>
    );
};

export default Landing;