// frontend/src/components/SelectionModal.jsx

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

// --- Reusable Step Component ---
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

// --- Main Modal Component ---
const SelectionModal = ({ closeModal }) => {
    const [step, setStep] = useState(1);
    const [selection, setSelection] = useState({ country: 'kazakhstan', sector: '', subSector: '' }); // Default country

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
            case 1: // Optional: we default to Kazakhstan, so we can start at step 2
            case 2:
                return <SelectionStep title="Who are you seeking help for?" items={sectors[selection.country]} onSelect={(val) => handleSelect('sector', val)} />;
            case 3:
                return <SelectionStep title="Select a specialized assistant:" items={subSectors[selection.sector]} onSelect={(val) => handleSelect('subSector', val)} />;
            default:
                return null;
        }
    };

    return (
        <div 
            onClick={closeModal}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
        >
            <motion.div
                onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-light-gray rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-primary">Configure Your Assistant</h2>
                    <button onClick={closeModal} className="text-slate-400 hover:text-slate-800">&times;</button>
                </div>
                
                <AnimatePresence mode="wait">
                    {step <= 3 && (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderStep()}
                        </motion.div>
                    )}
                     {step > 3 && (
                        <motion.div
                            key="final"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-8"
                        >
                            <h2 className="text-3xl font-bold text-primary">Ready to Start!</h2>
                            <p className="mt-4 text-xl text-slate-600">
                                You've selected the <span className="font-bold text-accent">{subSectors[selection.sector].find(s => s.id === selection.subSector)?.name}</span>.
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
            </motion.div>
        </div>
    );
};

export default SelectionModal;