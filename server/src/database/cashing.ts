import { createClient, RedisClientType } from "redis";

export const redis: RedisClientType = createClient();

redis.on("error", (err) => console.error("Redis Error:", err));

export async function connectToRedis() {
  if (!redis.isOpen) {
    await redis.connect();
    console.log("Connected to Redis");
  }
}