require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
  try {
    const key = process.env.GEMINI_API_KEY;
    console.log("Key length:", key ? key.length : "undefined");
    if (!key) throw new Error("No KEY");

    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("hello");
    console.log("Success:", result.response.text());
  } catch (error) {
    console.error("EXACT ERROR:", error);
  }
}
test();
