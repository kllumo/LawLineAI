// frontend/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Chat from './components/Chat';
import Start from './components/Start'; // Import the new page
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/start" element={<Start />} /> {/* Add the new route */}
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </Router>
    );
}

export default App;