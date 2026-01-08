import { redis } from "../database/cashing";

async function getOrSetCache<T>(
    key:string,
    ttlSeconds:number,
    fetchFn: () => Promise<T>
):Promise<T>{

    const getCashedResult =  await redis.get(key);
    if(getCashedResult){
        
        return JSON.parse(getCashedResult);
    }


    const getData = await fetchFn();
    await redis.set(key,JSON.stringify(getData),{ EX: ttlSeconds });
    return getData


}

export default getOrSetCache;