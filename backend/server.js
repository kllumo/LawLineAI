const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const cors = require('cors');
const prompts = require('./prompts.js');
const { findRelevantArticles } = require('./legal_database.js'); 

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const ragEnabledAssistants = [
    'workplace_advisor',
    'family_law',
    'consumer_rights',
    'contract_advisor',
    'corporate_assistant'
];

app.post('/api/chat', async (req, res) => {
    try {
        const { message, country, sector, subSector } = req.body;

        if (!message || !country || !sector || !subSector) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        let systemPromptText = prompts[country]?.[sector]?.[subSector] || "You are a general helpful assistant.";
        
        let ragContext = "";
        
        if (country === 'kazakhstan' && ragEnabledAssistants.includes(subSector)) {
            const relevantArticles = findRelevantArticles(message, subSector);
            
            if (relevantArticles.length > 0) {
                // This is the new, stricter instruction for the AI
                ragContext = " You are a legal information assistant. Your task is to answer the user's question based ONLY on the legal articles provided below in the CONTEXT section. " +
                             "You are strictly forbidden from using any outside knowledge or mentioning any articles not provided in the context. " +
                             "Begin your answer by citing the specific article you are using from the context. If the provided context is not sufficient to answer, you must state that the provided information does not contain the answer.\n\nCONTEXT:\n";
                relevantArticles.forEach(article => {
                    ragContext += `From: ${article.id}\nText: ${article.text}\n\n`;
                });
            }
        }
        
        const finalSystemPrompt = systemPromptText + ragContext;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: finalSystemPrompt }] },
                { role: "model", parts: [{ text: "I am ready to assist." }] }
            ],
            generationConfig: { maxOutputTokens: 1000 },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();
        
        res.json({ message: text });
    } catch (error) {
        console.error("Error in /api/chat:", error);
        res.status(500).json({ error: 'Something went wrong.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});