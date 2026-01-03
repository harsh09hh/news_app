import { redis } from "../database/cashing";

async function getOrSetCache<T>(
    key:string,
    ttlSeconds:number,
    fetchFn: () => Promise<T>
):Promise<T>{

    const getCashedResult =  await redis.get(key);
    if(getCashedResult){
        console.log("result from the cache");
        return JSON.parse(getCashedResult);
    }


    const getData = await fetchFn();
    await redis.set(key,JSON.stringify(getData),{ EX: ttlSeconds });
    console.log("save result to cache");
    return getData


}

export default getOrSetCache;