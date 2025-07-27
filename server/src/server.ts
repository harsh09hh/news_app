import express from 'express';
import { google} from '@ai-sdk/google'
import {generateText} from 'ai'
import cors from 'cors';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import dotenv from 'dotenv';


dotenv.config();


const app =express();
const PORT =3001;


const googleAi =createGoogleGenerativeAI({
    apiKey:process.env.GOOGLE_API_KEY!,
})


app.use(cors());
app.use(express.json());

app.post('/api/analyze', async(req,res)=>{

    try{
        const article =req.body;

        const {text}=await generateText({
            model:googleAi('gemini-2.0-flash-001',),
           prompt: 
           `Please respond with **only** a valid JSON object—no markdown, no back‑ticks, no extra text and specialy no  backticks or markdown-style code fencing.

Article Details:
id: ${article.source?.id || ""}
name: ${article.source?.name || ""}
author: ${article.author || ""}
title: ${article.title || ""}
description: ${article.description || ""}
content: ${article.content || ""}

Output schema:
- ai_summary: array of summary strings
- leaning: array with one of [Far Left, Left Leaning, Neutral, Right Leaning, Far Right]
- source_Reliability: array with one of [Highly Reliable, Generally Reliable, Mixed Reliability, Unreliable]
- ai_key_points: array of key point strings
- ai_Sentiment: array with one of [positive, neutral, negative]

Do not include anything else—just the JSON.`,
    });

       const cleanText = text.trim().replace(/```json|```/g, '').trim();

    const result =JSON.parse(cleanText);
    res.json(result);

    }
    catch(err){
        console.error("AI ERROR",err)
        res.status(500).json({error:'chatbot connection failed'});

    }
});


app.listen(PORT,()=>{
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})