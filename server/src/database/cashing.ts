import { createClient } from "redis";

const connectToRedis=async()=>{


    try{

    const redis =createClient();

    await redis.connect();
    console.log("connected to redis");
    } 
    catch(err){

        console.error("redis error",err);
    }
}


export default connectToRedis;