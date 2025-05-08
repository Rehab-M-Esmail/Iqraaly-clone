import { GoogleGenAI } from "@google/genai";
import express from 'express';
const app = express();
app.use(express.json())

const ai = new GoogleGenAI({
    apiKey: "api_key"
  });

app.post("/generate", async (req, res) => { 
    const {prompt}=req.body;
    const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  res.json({response:response.text})
})
app.listen(3000,()=> console.log("started"))
