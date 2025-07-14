import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const Landing = () => {
    return (
        <div className="bg-white text-slate-800 antialiased">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-20 p-6">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-slate-900">LawLine AI</h1>
                </div>
            </header>

            {/* ===== ENHANCED INTERACTIVE HERO SECTION ===== */}
            <section className="min-h-screen flex items-center relative bg-white overflow-hidden">
                {/* Layer 1: Animated Shapes (from before) */}
                <div className="absolute inset-0 z-0 opacity-50">
                    <div className="shape-blob one"></div>
                    <div className="shape-blob two"></div>
                </div>

                {/* ===== UPDATED: Layer 2: Floating Themed Icons ===== */}
                <div className="absolute inset-0 z-0">
                    {/* Icon 1: Scales of Justice */}
                    <div className="floating-icon icon-one">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-6.869 0c-.483-.174-.711-.703-.59-1.202L12 5.491V4.5m-3.75 .47l-2.62 10.726c-.122.499.106 1.028.589 1.202a5.989 5.989 0 006.869 0c.483-.174.711-.703.59-1.202L12 5.491V4.5" />
                        </svg>
                    </div>
                    {/* Icon 2: Document */}
                    <div className="floating-icon icon-two">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                    </div>
                    {/* ===== NEW ICON ADDED ===== */}
                    {/* Icon 3: Gavel */}
                    <div className="floating-icon icon-three">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M11.412 15.655L9.75 21.75l3.745-4.012M9.257 7.5l4.386 4.386m0 0l3.745-4.012M13.643 11.886l1.578-1.578m0 0l3.745-4.012M21.75 9.75l-4.012 3.745M3.25 9.25l4.386 4.386" />
                         </svg>
                    </div>
                    {/* ===== NEW ICON ADDED ===== */}
                    {/* Icon 4: Book */}
                    <div className="floating-icon icon-four">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
                        </svg>
                    </div>
                </div>
                
                <div className="container mx-auto px-6 text-center relative z-10">
                    {/* This part remains the same */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight"
                    >
                        <TypeAnimation
                            sequence={[
                                'Demystifying the Law, Instantly.',
                                3000,
                                'Your Personal Legal Guide.',
                                3000,
                                'Clear Answers, Right Away.',
                                3000,
                            ]}
                            wrapper="span"
                            speed={50}
                            cursor={true}
                            repeat={Infinity}
                        />
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto"
                    >
                        Describe your situation in plain language. Our AI listens, asks the right questions, and explains your rights and options.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Link to="/chat">
                            <button className="mt-10 px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                Try Now For Free
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>
            {/* The rest of the page remains the same */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">The Global Justice Gap is a Human Crisis.</h3>
                    <p className="text-slate-600 mb-16 text-lg">Meaningful access to justice is out of reach for billions.</p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 bg-white rounded-2xl shadow-md border border-slate-200">
                            <p className="text-6xl font-extrabold text-blue-600">5.1B</p>
                            <p className="mt-4 text-slate-700 font-medium">People lack meaningful access to justice worldwide.</p>
                        </div>
                        <div className="p-8 bg-white rounded-2xl shadow-md border border-slate-200">
                            <p className="text-6xl font-extrabold text-blue-600">31%</p>
                            <p className="mt-4 text-slate-700 font-medium">In Kazakhstan, only a fraction knew where to get legal advice.</p>
                        </div>
                        <div className="p-8 bg-white rounded-2xl shadow-md border border-slate-200">
                            <p className="text-6xl font-extrabold text-blue-600">#1</p>
                            <p className="mt-4 text-slate-700 font-medium">Reason for not getting help? Fear of high costs.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-3xl md:text-4xl font-bold mb-16">Get Started in 3 Simple Steps</h3>
                    <div className="grid md:grid-cols-3 gap-12 text-left md:text-center relative">
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-slate-200" style={{ transform: 'translateY(-50%)', zIndex: 0 }}></div>
                        <div className="relative z-10">
                            <div className="mx-auto md:mx-auto mb-4 h-12 w-12 flex items-center justify-center bg-blue-600 text-white font-bold text-2xl rounded-full">1</div>
                            <h4 className="text-xl font-semibold mb-2">Describe Your Problem</h4>
                            <p className="text-slate-600">Tell us about your situation in your own words. No legal jargon required.</p>
                        </div>
                        <div className="relative z-10">
                            <div className="mx-auto md:mx-auto mb-4 h-12 w-12 flex items-center justify-center bg-blue-600 text-white font-bold text-2xl rounded-full">2</div>
                            <h4 className="text-xl font-semibold mb-2">Answer Simple Questions</h4>
                            <p className="text-slate-600">Our AI guide will ask clarifying questions to understand your unique needs.</p>
                        </div>
                        <div className="relative z-10">
                            <div className="mx-auto md:mx-auto mb-4 h-12 w-12 flex items-center justify-center bg-blue-600 text-white font-bold text-2xl rounded-full">3</div>
                            <h4 className="text-xl font-semibold mb-2">Receive Your Guidance</h4>
                            <p className="text-slate-600">Instantly get an explanation of your rights and actionable next steps.</p>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto py-8 px-6 text-center text-slate-500">
                    <p>&copy; 2025 LawLine AI. All Rights Reserved.</p>
                    <p className="text-sm mt-2">This is not legal advice. For informational purposes only.</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;