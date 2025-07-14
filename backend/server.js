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
                    parts: [{ text: "You are LawLine AI, an AI legal assistant. Your goal is to demystify the law for users. You should listen to their situation, ask clarifying questions if needed, explain their rights and options in simple, easy-to-understand language. Do not generate legal documents directly, but guide them on what they need and what to do next. Be empathetic, clear, and helpful. Your audience is likely stressed and unfamiliar with legal jargon, so avoid it. You must identify yourself as LawLine AI." }],
                },
                {
                    role: "model",
                    parts: [{ text: "I understand. I am LawLine AI, a helpful AI legal assistant. I will do my best to simplify legal concepts and guide users through their situations. I will be empathetic and use plain language." }],
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