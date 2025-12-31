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
import connectToRedis from './database/cashing';
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
app.use('/api/v1',verifyToken,ProtectedRoute)

app.use(errorMiddelware);


app.listen(PORT,async()=>{
    console.log(` Server running on http://localhost:${PORT}`)

   await connectionToDatabase();    // as soon as the app starts listening  the connection to the database will be established 
   await connectToRedis();
})