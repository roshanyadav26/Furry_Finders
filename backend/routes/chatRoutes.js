const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check if API key is provided
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured in the backend .env file.' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Prepend context to guide the AI
    const prompt = `You are a friendly 'Virtual Veterinarian' assistant for a platform called 'Furry Finders', where users can adopt and buy pets, as well as pet products. Answer the user's question clearly, concisely, and helpfully. Try to keep answers relatively short since this is a chat widget.\n\nUser message: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: `API Error: ${error.message}` });
  }
});

module.exports = router;
