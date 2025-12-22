
import api from "./axios";

import type  { GuardianResponse } from "@/types";

export async function GuardianFintechArticle(){

    try{

    const result = await api.get<GuardianResponse>("/api/v1/articles/fintech");
    
    return  result.data;
    
    }

    catch(error){
       console.error("Failed to fetch fintech articles", error);
    throw new Error("Unable to load articles");
    }

}