import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';

// Helper component for animated numbers
function AnimatedNumber({ value }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            animate(0, value, {
                duration: 2,
                onUpdate(latest) {
                    if (ref.current) {
                        ref.current.textContent = latest.toLocaleString('en-US', { maximumFractionDigits: 0 });
                    }
                }
            });
        }
    }, [isInView, value]);

    return <span ref={ref}>0</span>;
}

// Helper for on-scroll animations
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const MotionSection = ({ children, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.section
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={sectionVariants}
        >
            {children}
        </motion.section>
    );
};


const Landing = () => {

    const [activeTab, setActiveTab] = useState('b2c');

    // Canvas animation for hero background
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let nodes = [];
        for (let i = 0; i < 50; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 1.5 + 1
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.strokeStyle = 'rgba(0, 201, 167, 0.1)';

            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i; j < nodes.length; j++) {
                    const dist = Math.sqrt(Math.pow(nodes[i].x - nodes[j].x, 2) + Math.pow(nodes[i].y - nodes[j].y, 2));
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);


    return (
        <div className="bg-white font-sans text-primary antialiased">
            
            {/* Section 1: Hero Section */}
            <section className="min-h-screen bg-primary text-white flex flex-col items-center justify-center text-center p-6 relative">
                <canvas ref={canvasRef} id="hero-canvas"></canvas>
                <div className="relative z-10">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-extrabold"
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
                        <Link to="/chat">
                            <button className="bg-accent text-primary font-bold px-8 py-4 rounded-full w-full sm:w-auto hover:bg-white transition-colors duration-300 transform hover:scale-105">
                                Try Free Now
                            </button>
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
                            <p className="text-6xl md:text-7xl font-extrabold text-accent"><AnimatedNumber value={5.1} />B</p>
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
            <MotionSection className="py-24 bg-light-gray">
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

            {/* Section 5: The LawLine Advantage */}
            <MotionSection className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center">
                     <h2 className="text-4xl md:text-5xl font-bold">A Complete Legal Ecosystem</h2>
                     <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
                        <div className="p-6">
                            <h3 className="text-2xl font-bold">🧠 Purpose-Built Legal Intelligence</h3>
                            <p className="mt-4 text-lg text-slate-600">Trained specifically on the laws of Kazakhstan, with native understanding of Kazakh, Russian, and legal English for unparalleled accuracy.</p>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold">✅ AI + Human-in-the-Loop Review</h3>
                            <p className="mt-4 text-lg text-slate-600">Gain ultimate confidence. Escalate any AI-generated advice for optional review by a licensed lawyer from the LawLine network.</p>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold">❤️‍🩹 UX Designed for High-Stress Situations</h3>
                            <p className="mt-4 text-lg text-slate-600">Our AI can activate an empathetic tone, adapting its language to reduce user stress and cognitive load during sensitive situations.</p>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold">⚙️ Embedded API for Ultimate Scalability</h3>
                            <p className="mt-4 text-lg text-slate-600">Integrate our powerful legal intelligence directly into your HR systems, CRMs, or eGov portals with our robust and secure API.</p>
                        </div>
                     </div>
                </div>
            </MotionSection>

            {/* Section 6: Security by Design */}
            <MotionSection className="py-24 bg-light-gray">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold">Security by Design: Your Trust is Our Foundation</h2>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">We understand that legal matters are sensitive. We have built our platform with uncompromising security and confidentiality at its core.</p>
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Security Card */}
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                           <div className="text-4xl mb-4">🔒</div>
                           <h4 className="font-bold text-xl">End-to-End Encryption</h4>
                           <p className="text-slate-600 mt-2 text-sm">Your data is encrypted both in transit and at rest using AES-256, the standard trusted by major banks.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                           <div className="text-4xl mb-4">🎭</div>
                           <h4 className="font-bold text-xl">Principled Anonymity</h4>
                           <p className="text-slate-600 mt-2 text-sm">Fully compliant with Kazakhstan's Law on Personal Data, your identity is decoupled from your legal questions.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                           <div className="text-4xl mb-4">📜</div>
                           <h4 className="font-bold text-xl">Confidentiality Guaranteed</h4>
                           <p className="text-slate-600 mt-2 text-sm">We operate on the principles of attorney-client privilege. Your information will never be shared or sold.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                           <div className="text-4xl mb-4">🛡️</div>
                           <h4 className="font-bold text-xl">Secure Infrastructure</h4>
                           <p className="text-slate-600 mt-2 text-sm">Built on world-class cloud infrastructure compliant with ISO 27001 and SOC 2 for maximum resilience.</p>
                        </div>
                    </div>
                </div>
            </MotionSection>
            
            {/* Section 7: Pricing & Plans */}
            <MotionSection className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-center">Affordable Plans for Every Need</h2>
                    <div className="mt-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* This is a simplified table using divs. For complex tables, consider a different structure. */}
                        <div className="border border-slate-200 rounded-lg p-6 flex flex-col">
                            <h3 className="font-bold text-2xl">For Individuals</h3>
                            <p className="mt-4 text-4xl font-bold">$9<span className="text-lg font-normal text-slate-500"> / month</span></p>
                            <ul className="mt-6 space-y-4 text-slate-600 flex-grow">
                                <li className="flex items-center gap-3"><span className="text-accent">✓</span>B2C Assistants</li>
                                <li className="flex items-center gap-3"><span className="text-accent">✓</span>50 AI Queries / month</li>
                            </ul>
                            <button className="mt-8 w-full bg-slate-200 text-primary font-bold py-3 rounded-lg hover:bg-slate-300 transition-colors">Get Started</button>
                        </div>

                        <div className="border-2 border-accent rounded-lg p-6 flex flex-col relative shadow-2xl">
                            <p className="absolute top-0 -translate-y-1/2 bg-accent text-primary font-bold px-4 py-1 rounded-full text-sm">Most Popular</p>
                            <h3 className="font-bold text-2xl">For Business</h3>
                            <p className="mt-4 text-4xl font-bold">$49<span className="text-lg font-normal text-slate-500"> / month</span></p>
                            <ul className="mt-6 space-y-4 text-slate-600 flex-grow">
                                <li className="flex items-center gap-3"><span className="text-accent">✓</span>All B2C & B2B Assistants</li>
                                <li className="flex items-center gap-3"><span className="text-accent">✓</span>500 AI Queries / month</li>
                                <li className="flex items-center gap-3"><span className="text-accent">✓</span>Up to 10 Team Members</li>
                            </ul>
                            <button className="mt-8 w-full bg-accent text-primary font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">Start Your Trial</button>
                        </div>

                        <div className="border border-slate-200 rounded-lg p-6 flex flex-col">
                            <h3 className="font-bold text-2xl">For Government</h3>
                            <p className="mt-4 text-4xl font-bold">Custom</p>
                            <ul className="mt-6 space-y-4 text-slate-600 flex-grow">
                                <li className="flex items-center gap-3"><span className="text-accent">✓</span>All Assistant Types</li>
                                <li className="flex items-center gap-3"><span className="text-accent">✓</span>Unlimited Queries</li>
                                <li className="flex items-center gap-3"><span className="text-accent">✓</span>Custom Region Support</li>
                            </ul>
                            <button className="mt-8 w-full bg-slate-200 text-primary font-bold py-3 rounded-lg hover:bg-slate-300 transition-colors">Request a Demo</button>
                        </div>
                        
                        <div className="border border-slate-200 rounded-lg p-6 flex flex-col">
                            <h3 className="font-bold text-2xl">Enterprise API</h3>
                            <p className="mt-4 text-4xl font-bold">Custom</p>
                            <ul className="mt-6 space-y-4 text-slate-600 flex-grow">
                                <li className="flex items-center gap-3"><span className="text-accent">✓</span>Usage-Based Pricing</li>
                                <li className="flex items-center gap-3"><span className="text-accent">✓</span>Global Scalability</li>
                                <li className="flex items-center gap-3"><span className="text-accent">✓</span>Full Integration Support</li>
                            </ul>
                            <button className="mt-8 w-full bg-slate-200 text-primary font-bold py-3 rounded-lg hover:bg-slate-300 transition-colors">Get API Keys</button>
                        </div>
                    </div>
                </div>
            </MotionSection>

            {/* Section 8: Get in Touch */}
            <MotionSection className="py-24 bg-light-gray">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
                    <div>
                        <h3 className="text-3xl font-bold">Let's Discuss Your Needs</h3>
                        <p className="mt-4 text-lg text-slate-600">Whether you are a government entity looking for a custom solution, a business wanting to integrate our API, or an investor interested in our mission, we're ready to talk.</p>
                        <div className="mt-8 space-y-4">
                            <p className="flex items-center gap-3"><span className="text-accent">@</span> abdbilminn@gmail.com</p>
                            <p className="flex items-center gap-3"><span className="text-accent">📞</span> +7 (778) 336-33-63</p>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-bold">Schedule a Demonstration</h3>
                        <form className="mt-6 space-y-4">
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
                                <li><a href="#" className="hover:text-white">Features</a></li>
                                <li><a href="#" className="hover:text-white">Pricing</a></li>
                                <li><a href="#" className="hover:text-white">For Individuals</a></li>
                                <li><a href="#" className="hover:text-white">For Business</a></li>
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-bold text-lg">Company</h4>
                            <ul className="mt-4 space-y-2 text-slate-300">
                                <li><a href="#" className="hover:text-white">About Us</a></li>
                                <li><a href="#" className="hover:text-white">Careers</a></li>
                                <li><a href="#" className="hover:text-white">Investor Relations</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
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