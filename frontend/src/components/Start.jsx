// frontend/src/components/Start.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data for our selectors ---
const countries = [
    { id: 'kazakhstan', name: 'Kazakhstan' },
    { id: 'kyrgyzstan', name: 'Kyrgyzstan', disabled: true },
    { id: 'uzbekistan', name: 'Uzbekistan', disabled: true },
];

const sectors = {
    kazakhstan: [
        { id: 'b2c', name: 'For Individuals (B2C)' },
        { id: 'b2b', name: 'For Business (B2B)' },
        { id: 'b2g', name: 'For Government (B2G)' },
    ]
};

const subSectors = {
    b2c: [
        { id: 'workplace_advisor', name: 'Workplace Advisor' },
        { id: 'family_law', name: 'Family Law Assistant' },
        { id: 'consumer_rights', name: 'Consumer Rights Protector' },
    ],
    b2b: [
        { id: 'contract_advisor', name: 'Contract Advisor' },
        { id: 'corporate_assistant', name: 'Corporate Legal Assistant' },
        { id: 'ip_guard', name: 'IP Guard' },
    ],
    b2g: [
        { id: 'public_service_navigator', name: 'Public Service Navigator' },
        { id: 'regulatory_compliance', name: 'Regulatory Compliance AI' },
        { id: 'digital_notary', name: 'Digital Notary Assistant' },
    ]
};

const SelectionStep = ({ title, items, onSelect }) => (
    <div>
        <h3 className="text-2xl font-semibold text-slate-800 mb-6">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {items.map(item => (
                <button
                    key={item.id}
                    onClick={() => onSelect(item.id)}
                    disabled={item.disabled}
                    className="p-6 bg-white rounded-lg shadow-md border border-slate-200 text-left hover:border-accent hover:shadow-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent"
                >
                    <span className="text-lg font-bold text-slate-900">{item.name}</span>
                </button>
            ))}
        </div>
    </div>
);

const Start = () => {
    const [step, setStep] = useState(1);
    const [selection, setSelection] = useState({ country: 'kazakhstan', sector: '', subSector: '' });

    const handleSelect = (key, value) => {
        setSelection(prev => ({ ...prev, [key]: value }));
        setStep(prev => prev + 1);
    };

    const resetSelection = () => {
        setSelection({ country: 'kazakhstan', sector: '', subSector: '' });
        setStep(1);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <SelectionStep title="Who are you seeking help for?" items={sectors[selection.country]} onSelect={(val) => handleSelect('sector', val)} />;
            case 2:
                return <SelectionStep title="Select a specialized assistant:" items={subSectors[selection.sector]} onSelect={(val) => handleSelect('subSector', val)} />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-light-gray font-sans text-primary min-h-screen flex flex-col items-center justify-center p-4">
            <Link to="/" className="absolute top-6 left-6 text-2xl font-bold text-primary">LawLine AI</Link>
            <div className="text-center w-full max-w-4xl">
                <AnimatePresence mode="wait">
                    {step <= 2 && (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Configure Your Assistant</h1>
                            <div className="mt-12">
                                {renderStep()}
                            </div>
                        </motion.div>
                    )}

                    {step > 2 && (
                        <motion.div
                            key="final"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl font-bold text-slate-900">You are all set!</h2>
                            <p className="mt-4 text-xl text-slate-600">
                                You've selected the <span className="font-bold text-accent">{subSectors[selection.sector].find(s => s.id === selection.subSector)?.name}</span> for <span className="font-bold capitalize">{selection.country}</span>.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    to={`/chat?country=${selection.country}&sector=${selection.sector}&subSector=${selection.subSector}`}
                                    className="px-8 py-4 bg-accent text-primary font-bold rounded-full hover:opacity-90 transition duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
                                >
                                    Proceed to Chat
                                </Link>
                                <button
                                    onClick={resetSelection}
                                    className="px-6 py-3 bg-transparent text-slate-600 font-semibold rounded-full hover:bg-slate-200 transition duration-300 w-full sm:w-auto"
                                >
                                    Start Over
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Start;