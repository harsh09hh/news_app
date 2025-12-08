import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import subscriptionRouter from './Routes/Subscription.routes';
import authRouter from './Routes/auth.routes';
import Summary from './Routes/gemni.routes';
import { PORT } from './config/env';
import connectionToDatabase from './database/mongodb';
import errorMiddelware from './middelware/error.middleware';


const app =express();

app.use(express.json());


app.use('/api/v1/subscription',subscriptionRouter);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/analyze',Summary);

app.use(errorMiddelware);


app.listen(PORT,async()=>{
    console.log(` Server running on http://localhost:${PORT}`)

   await connectionToDatabase();    // as soon as the app starts listening  the connection to the database will be established 
})