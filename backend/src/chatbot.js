import { GoogleGenAI } from "@google/genai";
//const GoogleGenAI = require("@google/genai");
import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

const ai = new GoogleGenAI({
  apiKey: "api_key",
});

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  console.log(`prompt is ${prompt}`);
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  res.json({ response: response.text });
});
app.listen(3003, () => console.log("started"));
