import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';

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
    const [activeTab, setActiveTab] = useState('b2c');

    return (
        <div className="bg-white font-sans text-primary antialiased">

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
                        {/* This button will need to be updated again later to open the modal */}
                        <Link to="/chat" className="bg-accent text-primary font-bold px-8 py-4 rounded-full w-full sm:w-auto hover:bg-white transition-colors duration-300 transform hover:scale-105">
                           Try Free Now
                        </Link>
                        <a href="#" className="text-slate-300 hover:text-white transition-colors duration-300">View Investor Brief</a>
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

            {/* Section 3: The Solution */}
            <MotionSection className="py-24 bg-white">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h3 className="text-4xl font-bold">Your Personal Legal Advisor. On-Demand.</h3>
                        <p className="mt-6 text-lg text-slate-600">LawLine AI is a purpose-built intelligence platform trained on localized legal data. We break down complex legal issues into simple, actionable advice. No more jargon, no more excessive fees. Just clear answers, right when you need them.</p>
                    </div>
                    <div className="mt-10 md:mt-0">
                        <div className="bg-slate-800 rounded-lg shadow-2xl p-4">
                            <div className="aspect-video bg-slate-900 rounded-md p-4 text-left font-mono text-sm text-slate-300">
                                <p className="text-green-400">&gt; How do I register a small business?</p>
                                <p className="mt-4 text-white">1. Choose your business structure (e.g., IE or LLP).</p>
                                <p className="mt-2 text-white">2. Prepare required documents (ID, application).</p>
                                <p className="mt-2 text-white">3. Submit your application via the eGov.kz portal...</p>
                                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse mt-4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </MotionSection>

            {/* Section 4: Specialized Assistants */}
            <MotionSection id="assistants" className="py-24 bg-light-gray">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold">AI Assistants Tailored to Your Needs</h2>
                    <div className="mt-8 flex justify-center border-b border-slate-300">
                        <button onClick={() => setActiveTab('b2c')} className={`px-6 py-3 font-bold text-lg ${activeTab === 'b2c' ? 'border-b-2 border-accent text-accent' : 'text-slate-500'}`}>For Individuals</button>
                        <button onClick={() => setActiveTab('b2b')} className={`px-6 py-3 font-bold text-lg ${activeTab === 'b2b' ? 'border-b-2 border-accent text-accent' : 'text-slate-500'}`}>For Business</button>
                        <button onClick={() => setActiveTab('b2g')} className={`px-6 py-3 font-bold text-lg ${activeTab === 'b2g' ? 'border-b-2 border-accent text-accent' : 'text-slate-500'}`}>For Government</button>
                    </div>
                    <div className="mt-12 text-left">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                            >
                                {activeTab === 'b2c' && <>
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h4 className="font-bold text-xl">Workplace Advisor</h4>
                                        <p className="text-slate-600 mt-2">Get clear guidance on labor laws, employment contracts, and workplace disputes.</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h4 className="font-bold text-xl">Family Law Assistant</h4>
                                        <p className="text-slate-600 mt-2">Understand complex topics like divorce, alimony, and child custody procedures.</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h4 className="font-bold text-xl">Consumer Rights Protector</h4>
                                        <p className="text-slate-600 mt-2">Learn how to handle issues with faulty products, poor services, and warranty claims.</p>
                                    </div>
                                </>}
                                {activeTab === 'b2b' && <>
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h4 className="font-bold text-xl">Contract Advisor</h4>
                                        <p className="text-slate-600 mt-2">Analyze business contracts for risks, ambiguous language, and missing clauses.</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h4 className="font-bold text-xl">Corporate Legal Assistant</h4>
                                        <p className="text-slate-600 mt-2">Information on business registration, compliance, and governance standards.</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h4 className="font-bold text-xl">IP Guard</h4>
                                        <p className="text-slate-600 mt-2">Explains the fundamentals of trademark, copyright, and patent law to protect your assets.</p>
                                    </div>
                                </>}
                                {activeTab === 'b2g' && <>
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h4 className="font-bold text-xl">Public Service Navigator</h4>
                                        <p className="text-slate-600 mt-2">Help citizens easily navigate e-government portals and administrative procedures.</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h4 className="font-bold text-xl">Regulatory Compliance AI</h4>
                                        <p className="text-slate-600 mt-2">Provide clear information on key industry regulations for internal and external use.</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h4 className="font-bold text-xl">Digital Notary Assistant</h4>
                                        <p className="text-slate-600 mt-2">Explain the rules and procedures for digital signatures and online notary services.</p>
                                    </div>
                                </>}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </MotionSection>

            {/* Note: I am leaving out the middle sections for brevity as they are unchanged. This is just an example. */}
            
            {/* You would include Sections 5, 6, 7, 8 here as they were */}

            {/* Section 9: Footer */}
            <footer className="bg-primary text-white">
                <div className="container mx-auto px-6 py-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {/* Footer columns */}
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