import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import subscriptionRouter from './Routes/Subscription.routes';
import GuardianArticle from './Routes/article.routes';
import authRouter from './Routes/auth.routes';
import Summary from './Routes/gemni.routes';
import { PORT } from './config/env';
import connectionToDatabase from './database/mongodb';
import errorMiddelware from './middelware/error.middleware';
import userRoutes from './Routes/user.routes';
import cors from "cors"
import cookieParser from 'cookie-parser';
import ProtectedRoute from './Routes/protected.routes';
import { verifyToken } from './middelware/auth.middleware';
import {connectToRedis} from './database/cashing';
import axios from "axios";

const app =express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173", 
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }))
  



app.use('/api/v1/subscription',subscriptionRouter);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/analyze',Summary);
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/Guardian',GuardianArticle);


app.post('/api/v1/chat',async(req,res)=>{
  try{
    const {prompt}= req.body;
     const model = "meta-llama/Meta-Llama-3-8B-Instruct";
      const response = await axios.post(
        "https://router.huggingface.co/v1/chat/completions",
        {
          model: "meta-llama/Llama-3.2-3B-Instruct",
          messages: [
            { role: "user", content: prompt }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_API_KEY}`,
          }
        }
      );
      return res.json(response.data);
  }
  catch(err:any){
    console.error("HF Error:", err?.response?.data || err.message);
  return res.status(500).json({
    error: "HuggingFace request failed",
    details: err?.response?.data || err.message
  });
  }


})

app.use('/api/v1',verifyToken,ProtectedRoute)
app.use(errorMiddelware);


app.listen(PORT,async()=>{
    console.log(` Server running on http://localhost:${PORT}`)

   await connectionToDatabase();    // as soon as the app starts listening  the connection to the database will be established 

})