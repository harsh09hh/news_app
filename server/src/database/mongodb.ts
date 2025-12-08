
import mongoose from "mongoose";

import { DB_URI,NODE_ENV } from "../config/env";
import { error } from "console";


if(!DB_URI){
    throw new Error("please define a MONGODB_URI environment variable inside .env<development/production>.local");

}

const MONGO_URL = DB_URI;
const connectionToDatabase= async()=>{

    try{
        await mongoose.connect(MONGO_URL);
        console.log('Connect to database ');
    }

    catch(error){
        console.log('Error connecting to the database',error);
               
        process.exit(1); //exiting the process with the code of 1 which means failure
    }
}

export default connectionToDatabase;