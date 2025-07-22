import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

// Custom hook to parse URL query parameters
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

// Simple Avatar for the AI
const AIAvatar = () => (
    <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mr-3">
        L
    </div>
);

const Chat = () => {
    const query = useQuery();
    const chatSelections = useRef({
        country: query.get('country'),
        sector: query.get('sector'),
        subSector: query.get('subSector'),
    });

    const [messages, setMessages] = useState([
        { text: "Hello! I am your specialized LawLine AI assistant. How can I help you today?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const newMessages = [...messages, { text: input, sender: 'user' }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            // NOTE: Use your live Render URL when deployed
            const response = await fetch('https://lawline-ai-backend.onrender.com/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: input,
                    country: chatSelections.current.country,
                    sector: chatSelections.current.sector,
                    subSector: chatSelections.current.subSector
                }),
            });

            if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
            const data = await response.json();
            setMessages(prev => [...prev, { text: data.message, sender: 'ai' }]);
        } catch (error) {
            console.error("Failed to send message:", error);
            setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting to the server. Please try again later.", sender: 'ai' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-light-gray font-sans">
             <header className="bg-primary shadow-md p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-white">LawLine AI</Link>
                </div>
            </header>
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-3xl mx-auto space-y-6">
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                             {msg.sender === 'ai' && <AIAvatar />}
                            <div className={`p-4 rounded-2xl max-w-lg break-words text-base 
                                ${msg.sender === 'user' 
                                    ? 'bg-accent text-primary font-semibold rounded-br-none'
                                    : 'bg-white text-slate-800 shadow-sm border border-slate-200 rounded-bl-none'
                                }`}>
                                <div className="prose prose-slate prose-strong:text-primary">
                                    <ReactMarkdown>
                                        {msg.text}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                     {isLoading && (
                        <div className="flex items-start gap-3 justify-start">
                             <AIAvatar />
                             <div className="p-4 rounded-2xl bg-white text-slate-800 shadow-sm border border-slate-200 rounded-bl-none">
                                <div className="typing-indicator">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <footer className="p-4 bg-white border-t border-slate-200">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center bg-slate-100 rounded-full p-2">
                        <input
                            type="text"
                            className="flex-1 bg-transparent py-2 px-4 focus:outline-none text-slate-800"
                            placeholder="Describe your situation here..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading}
                            className="p-2 bg-accent text-primary font-semibold rounded-full hover:opacity-90 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed transition"
                        >
                             {/* ===== CORRECTED ICON SVG ===== */}
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                               <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                             </svg>
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Chat;