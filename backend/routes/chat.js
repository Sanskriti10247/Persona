import express from "express";
import { personas } from "../personas.js";
import dotenv from "dotenv";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config({ path: path.resolve(process.cwd(), "..", ".env") });

const router = express.Router();

if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is not set. Set it in .env or environment variables.");
}

router.post("/", async (req, res) => {
  try {
    console.log("==================================================");
    console.log("[BACKEND] 🚀 POST /chat request received at", new Date().toLocaleTimeString());
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[BACKEND] ❌ GEMINI_API_KEY is not set");
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    }

    const client = new GoogleGenerativeAI(apiKey);
    const { persona, message } = req.body;

    console.log("[BACKEND] 📝 Request payload:", { 
      persona, 
      messageLength: message?.length || 0,
      messagePreview: typeof message === 'string' ? message.slice(0, 100) : message 
    });

    const systemPrompt = personas[persona];
    if (!systemPrompt) {
      console.error("[BACKEND] ❌ Unknown persona:", persona);
      return res.status(400).json({ error: "Unknown persona" });
    }
    
    console.log("[BACKEND] ✅ Persona validated:", persona);

    console.log("[BACKEND] 🤖 Initializing Gemini model: gemini-2.5-flash-lite");
    
    const model = client.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      systemInstruction: systemPrompt,
    });

    console.log("[BACKEND] 📡 Starting streaming generation...");
    
    const result = await model.generateContentStream({
      generationConfig: {
        maxOutputTokens: 2048,
      },
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    console.log("[BACKEND] 📤 Streaming response to client...");
    let chunkCount = 0;
    let totalCharsStreamed = 0;

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      chunkCount++;
      totalCharsStreamed += chunkText.length;
      console.log(`[BACKEND] 📦 Chunk ${chunkCount}: ${chunkText.length} chars`);
      res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
    }
    
    console.log(`[BACKEND] ✅ Streaming complete! Total chunks: ${chunkCount}, Total chars: ${totalCharsStreamed}`);
    res.write('data: [DONE]\n\n');
    res.end();

  } catch (err) {
    console.error("[BACKEND] ❌ Error:", err.message);
    console.error("[BACKEND] Stack:", err.stack);
    if (!res.headersSent) {
      console.log("[BACKEND] Sending JSON error response");
      res.status(500).json({
        error: "Something went wrong. Try again.",
      });
    } else {
      console.log("[BACKEND] Sending streamed error");
      res.write(`data: ${JSON.stringify({ error: "Something went wrong. Try again." })}\n\n`);
      res.end();
    }
  }
});

export default router;
