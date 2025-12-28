
import api from "./axios";

import type  { GuardianResponse } from "@/types";

export async function GuardianPoliticsArticle(){

    try{

    const result = await api.get<GuardianResponse>("/Guardian/politics");
    
    return  result.data;
    
    }

    catch(error){
 
    throw new Error("Unable to load articles");
    }

}


export async function ParticularGuardianArticle(apiUrl:string){

    const result = await api.get("/Guardian/article",{
        params:{
            apiUrl,
        },  
    });
    return result.data;
    
}


export async function TrendingGuardingArticle(){
    try{

    const result = await api.get<GuardianResponse>('/Guardian/trending')
    
    return result.data;
    }
    catch(error){
        throw new Error("failed to fetch the  trending article");
      

    }

}
export async function sportGuardingArticle(){
    try{

    const result = await api.get<GuardianResponse>('/Guardian/sports')
    
    return result.data;
    }
    catch(error){
        throw new Error("failed to fetch the  trending article");
      

    }

}
export async function businessGuardingArticle(){
    try{

    const result = await api.get<GuardianResponse>('/Guardian/business')
    
    return result.data;
    }
    catch(error){
        throw new Error("failed to fetch the  trending article");
      

    }

}

