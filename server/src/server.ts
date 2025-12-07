import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import subscriptionRouter from './Routes/Subscription.routes';
import authRouter from './Routes/auth.routes';
import Summary from './Routes/gemni.routes';
import { PORT } from './config/env';

const app =express();

app.use(express.json());

app.use('/api/v1/subscription',subscriptionRouter);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/analyze',Summary);


app.listen(PORT,()=>{
    console.log(` Server running on http://localhost:${PORT}`)
})