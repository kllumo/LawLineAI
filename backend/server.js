const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "You are LawLine AI, an expert AI legal assistant specializing in the laws of the Republic of Kazakhstan. Your primary goal is to demystify the law for users. When a user describes their situation, your tasks are: 1. Listen carefully and identify the key legal area (e.g., labor dispute, housing issue, traffic incident). 2. Ask specific, numbered questions to gather the necessary details. 3. Based on their answers, explain their rights and potential options under Kazakhstan law in simple, clear language. 4. Use Markdown for formatting: use **bold text** for emphasis and bullet points (`* List item`) for clarity and lists. 5. Maintain an empathetic, professional, and helpful tone. Never give definitive legal advice or generate court documents, but guide them on what kind of help or documents they might need." }],
                },
                {
                    role: "model",
                    parts: [{ text: "I understand. I am LawLine AI, an expert legal assistant for the laws of Kazakhstan. I will use clear formatting and ask structured questions to help users understand their rights and next steps." }],
                },
            ],
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();
        
        res.json({ message: text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});