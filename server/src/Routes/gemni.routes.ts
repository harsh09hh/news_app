
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import dotenv from 'dotenv';
import { Router } from "express";
import axios from "axios";

const Summary =Router();


dotenv.config();


Summary.post('/',async(req,res)=>{


      try{
        const {article}= req.body;
        const model = "meta-llama/Meta-Llama-3-8B-Instruct";
        const response = await axios.post<any>(
        "https://router.huggingface.co/v1/chat/completions",
        {
          model: "meta-llama/Llama-3.2-3B-Instruct",
            messages: [
            {
                role: "user",
                content: `
                You are an AI journalism analysis assistant.

                Return ONLY a valid JSON object. 
                NO markdown. NO code fence. NO explanations. Only JSON.

                Analyze the article and PRODUCE REAL VALUES — do NOT return empty arrays, example text, or schemas.

                Return the JSON in EXACT format:

                {
                "ai_summary": [
                    "2-3 bullet points summarizing the article clearly in plain English"
                ],
                "leaning": [
                    "Far Left" | "Left Leaning" | "Neutral" | "Right Leaning" | "Far Right"
                ],
                "source_Reliability": [
                    "Highly Reliable" | "Generally Reliable" | "Mixed Reliability" | "Unreliable"
                ],
                "ai_key_points": [
                    "short key facts extracted from the article"
                ],
                "ai_Sentiment": [
                    "positive" | "neutral" | "negative"
                ]
                }

                Article:
                id: ${article.source?.id || ""}
                source: ${article.source?.name || ""}
                author: ${article.author || ""}
                title: ${article.title || ""}
                description: ${article.description || ""}
                content: ${article.content || ""}
                `
            }
            ]

        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_API_KEY}`,
          }
        }
      );
    //   return res.json(response.data);
    const content = response.data.choices?.[0]?.message?.content;

try {
  const parsed = JSON.parse(content);
  return res.json(parsed);
} catch {
  return res.json({ raw: content });
}
  }
  catch(err:any){
    console.error("HF Error:", err?.response?.data || err.message);
  return res.status(500).json({
    error: "HuggingFace request failed",
    details: err?.response?.data || err.message
  });
  }

})

export default Summary;