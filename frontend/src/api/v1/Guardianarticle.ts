
import api from "./axios";

import type  { GuardianResponse } from "@/types";

export async function GuardianPoliticsArticle(){

    try{

    const result = await api.get<GuardianResponse>("/articles/politics");
    
    return  result.data;
    
    }

    catch(error){
       console.error("Failed to fetch politics articles", error);
    throw new Error("Unable to load articles");
    }

}