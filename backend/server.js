const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const cors = require('cors');
const prompts = require('./prompts.js'); // Import our prompt library
const { findRelevantArticles } = require('./labor_code_kz.js'); // Import our RAG function

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
    try {
        const { message, country, sector, subSector } = req.body;

        if (!message || !country || !sector || !subSector) {
            return res.status(400).json({ error: 'Missing required fields: message, country, sector, subSector' });
        }

        // --- Dynamic Prompt Selection ---
        let systemPromptText = prompts[country]?.[sector]?.[subSector];

        if (!systemPromptText) {
            systemPromptText = "You are a general helpful assistant."; // Fallback prompt
        }

        // --- RAG Logic for the Special Demo Case ---
        let ragContext = "";
        if (country === 'kazakhstan' && sector === 'b2c' && subSector === 'workplace_advisor') {
            const relevantArticles = findRelevantArticles(message);
            if (relevantArticles.length > 0) {
                ragContext = " Based ONLY on the following legal context, answer the user's question. Start your answer by citing the article.\n\nCONTEXT:\n";
                relevantArticles.forEach(article => {
                    ragContext += `Article: ${article.id}\nText: ${article.text}\n\n`;
                });
            }
        }
        
        // Combine the base prompt with the RAG context
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
        res.status(500).json({ error: 'Something went wrong with the AI service.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});