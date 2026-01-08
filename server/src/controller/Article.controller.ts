import { Response,Request,NextFunction } from "express";
import axios from "axios";
import type { GuardianApiResponse,GuardianSingleResponse } from "../types";
import {connectToRedis, redis} from "../database/cashing";
import getOrSetCache from "../utils/getCache";

export async function GuardianPolitics(req:Request,res:Response) {
  try {
    const articles = await getOrSetCache(
      "guardian:politics",
      180,
      async () => {
        const response = await axios.get<GuardianApiResponse>(
          "https://content.guardianapis.com/search",
          {
            params: {
              section: "politics",
              "order-by": "newest",
              "from-date": new Date(Date.now() - 7*24*60*60*1000).toISOString().split("T")[0],
              "show-fields": "headline,trailText,thumbnail",
              "page-size": 20,
              "api-key": process.env.GUARDIAN_API_KEY,
            },
          }
        );

        return response.data.response.results.map((item) => ({
          id: item.id,
          title: item.fields?.headline ?? item.webTitle,
          description: item.fields?.trailText ?? "",
          image: item.fields?.thumbnail ?? null,
          publishedAt: item.webPublicationDate,
          apiUrl: item.apiUrl,
        }));
      }
    );

    return res.status(200).json({
      success: true,
      article: articles,
    });

  }
  catch (error: any) {
  console.error("Guardian API ERROR:", error?.response?.data || error?.message || error);

  res.status(500).json({
    success: false,
    message: "Guardian API failed",
    error: error?.response?.data || error?.message
  });
}
}



export async function ParticularGuardianArticle(
  req: Request,
  res: Response
) {
  try {
    const { apiUrl } = req.query;

    if (!apiUrl) {
      return res.status(400).json({
        success: false,
        message: "apiUrl is required",
      });
    }

    const decodedUrl = decodeURIComponent(apiUrl as string);

    const result = await axios.get<GuardianSingleResponse>(decodedUrl, {
      params: {
        "show-fields": "body,headline,trailText,thumbnail",
        "api-key": process.env.GUARDIAN_API_KEY,
      },
    });

    const content = result.data.response.content;

    return res.status(200).json({
      success: true,
      article: content,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Guardian article",
    });
  }
}




export async function  TrendingGuardingArticle(
  req:Request,res:Response,next:NextFunction
){


  try{
  const articles= await getOrSetCache("guardian:trending",180,async()=>{


  

 const result = await axios.get<GuardianApiResponse>(
 "https://content.guardianapis.com/search",
  {
    params: {
      q: "world OR global OR breaking",
      "order-by": "newest",
      "from-date": new Date(Date.now() - 7*24*60*60*1000).toISOString().split("T")[0],  
      "show-fields": "headline,trailText,thumbnail",
      "page-size": 20,
      "api-key": process.env.GUARDIAN_API_KEY,
    },

  });



  return result.data.response.results.map
  (item=>({
    id:item.id,
    title:item.webTitle,
    description: item.fields?.trailText ?? "",
    image: item.fields?.thumbnail ?? null,
    publishedAt:item.webPublicationDate,
    apiUrl:item.apiUrl,

  }));
 
  });


  return res.status(200).json({
    success:true,
    article:articles,
    
  });
}

catch(error){
  res.status(500).json({
    success:false,
    message:"Guardian Trending API failed"

  })
}
}


export async function  CryptoGuardingArticle(
  req:Request,res:Response,next:NextFunction
){


  try{
    const articles= await getOrSetCache("guardian:crypto",180,async()=>{

 const result = await axios.get<GuardianApiResponse>(
  "https://content.guardianapis.com/search",
  {
params: {
  tag: "technology/cryptocurrencies|business/cryptocurrencies",
  "order-by": "newest",
  "show-fields": "headline,trailText,thumbnail",
  "page-size": 25,
  "api-key": process.env.GUARDIAN_API_KEY,
}

  }
);


  return result.data.response.results.map
  (item=>({
    id:item.id,
    title:item.webTitle,
    description: item.fields?.trailText ?? "",
    image: item.fields?.thumbnail ?? null,
    publishedAt:item.webPublicationDate,
    apiUrl:item.apiUrl,

  }));
});
 


  return res.status(200).json({
    success:true,
    article:articles,
    
  });
}

catch(error){
  res.status(500).json({
    success:false,
    message:"Guardian crypto API failed"

  })
}
}
 

export async function  businessGuardingArticle(
  req:Request,res:Response,next:NextFunction
){


  try{
    const articles= await getOrSetCache("guardian:business",180,async()=>{

 const result = await axios.get<GuardianApiResponse>("https://content.guardianapis.com/search", {
  params: {
    section: "business",
    "order-by": "newest",
    "show-fields": "headline,trailText,thumbnail",
    "page-size": 20,
    "api-key": process.env.GUARDIAN_API_KEY,
  },
});

  return result.data.response.results.map
  (item=>({
    id:item.id,
    title:item.webTitle,
    description: item.fields?.trailText ?? "",
    image: item.fields?.thumbnail ?? null,
    publishedAt:item.webPublicationDate,
    apiUrl:item.apiUrl,

  }));
});
 


  return res.status(200).json({
    success:true,
    article:articles,
    
  });
}

catch(error){
  res.status(500).json({
    success:false,
    message:"Guardian Business API failed"

  })
}
}

export async function  SportsGuardingArticle(
  req:Request,res:Response,next:NextFunction
){


  try{
    const articles= await getOrSetCache("guardian:sports",180,async()=>{

 const result = await axios.get<GuardianApiResponse>("https://content.guardianapis.com/search", {
  params: {
    section: "sport",
    "order-by": "newest",
    "from-date": new Date(Date.now() - 7*24*60*60*1000).toISOString().split("T")[0], 
    "show-fields": "headline,trailText,thumbnail",
    "page-size": 20,
    "api-key": process.env.GUARDIAN_API_KEY,
  },
});

  return result.data.response.results.map
  (item=>({
    id:item.id,
    title:item.webTitle,
    description: item.fields?.trailText ?? "",
    image: item.fields?.thumbnail ?? null,
    publishedAt:item.webPublicationDate,
    apiUrl:item.apiUrl,

  }));
});
 


  return res.status(200).json({
    success:true,
    article:articles,
    
  });
}

catch(error){
  res.status(500).json({
    success:false,
    message:"Guardian sports API failed"

  })
}
}




export async function GuardianMovies(req:Request,res:Response){
  try{
    const articles= await getOrSetCache("guardian:sports",180,async()=>{

 const result = await axios.get<GuardianApiResponse>("https://content.guardianapis.com/search", {
 params: {
  section: "culture",
  tag: "film/film",
  "show-fields": "headline,trailText,thumbnail",
  "order-by": "newest",
  "page-size": 20,
  "api-key": process.env.GUARDIAN_API_KEY,
}
});

  return result.data.response.results.map
  (item=>({
    id:item.id,
    title:item.webTitle,
    description: item.fields?.trailText ?? "",
    image: item.fields?.thumbnail ?? null,
    publishedAt:item.webPublicationDate,
    apiUrl:item.apiUrl,

  }));
});
 


  return res.status(200).json({
    success:true,
    article:articles,
    
  });
}

catch(error){
  res.status(500).json({
    success:false,
    message:"Guardian sports API failed"

  })
}
}




export async function GuardianHealth(req: Request, res: Response) {
  try {
    const articles = await getOrSetCache(
      "guardian:health",
      180,
      async () => {
        const result = await axios.get<GuardianApiResponse>(
          "https://content.guardianapis.com/search",
          {
            params: {
              section: "science",
              q: "health medicine medical healthcare",
              "order-by": "newest",
              "show-fields": "headline,trailText,thumbnail",
              "page-size": 25,
              "api-key": process.env.GUARDIAN_API_KEY,
            },
          }
        );

        return result.data.response.results.map((item) => ({
          id: item.id,
          title: item.webTitle,
          description: item.fields?.trailText ?? "",
          image: item.fields?.thumbnail ?? null,
          publishedAt: item.webPublicationDate,
          apiUrl: item.apiUrl,
        }));
      }
    );

    return res.status(200).json({
      success: true,
      article: articles,
    });
  } catch (error) {
    console.error("GuardianHealth error:", error);
    return res.status(500).json({
      success: false,
      message: "Guardian health API failed",
    });
  }
}
