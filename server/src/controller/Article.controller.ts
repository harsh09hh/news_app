import { Response,Request,NextFunction } from "express";
import axios from "axios";

import type { GuardianApiResponse,GuardianSingleResponse } from "../types";

export async function GuardianPolitics(req:Request,res:Response,next:NextFunction){


    try{


    const response =await axios.get<GuardianApiResponse>('https://content.guardianapis.com/search',

    {
        params:{
          section: "politics",
          "order-by": "newest",
          "show-fields": "headline,trailText,thumbnail",
          "page-size": 20,
          "api-key": process.env.GUARDIAN_API_KEY, 
            
        }
    }
    );

 
const article =response.data.response.results.map

  (item=>({
    id:item.id,
    title:item.fields?.headline ?? item.webTitle,
    description: item.fields?.trailText ?? "",
    image: item.fields?.thumbnail ?? null,
    publishedAt:item.webPublicationDate,
    apiUrl:item.apiUrl,

  }
));



res.status(200).json({
  success:true,
  article:article,
})

}
catch (error) {
    
      return res.status(400).json({

        success:false,
        message:"Guardian API error",
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

 const result = await axios.get<GuardianApiResponse>(
 "https://content.guardianapis.com/search",
  {
    params: {
      q: "world OR global OR breaking",
      "order-by": "newest",
      "from-date": "2025-12-24",   
      "show-fields": "headline,trailText,thumbnail",
      "page-size": 20,
      "api-key": process.env.GUARDIAN_API_KEY,
    },

  });

  const data = result.data.response.results.map
  (item=>({
    id:item.id,
    title:item.webTitle,
    description: item.fields?.trailText ?? "",
    image: item.fields?.thumbnail ?? null,
    publishedAt:item.webPublicationDate,
    apiUrl:item.apiUrl,

  }));
 


  return res.status(200).json({
    success:true,
    article:data,
    
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

 const result = await axios.get<GuardianApiResponse>(
  "https://content.guardianapis.com/search",
  {
    params: {
      q: "crypto OR cryptocurrency OR bitcoin OR ethereum",
      "order-by": "newest",
      "from-date": "2025-12-24",
      "show-fields": "headline,trailText,thumbnail",
      "page-size": 20,
      "api-key": process.env.GUARDIAN_API_KEY,
    },
  }
);


  const data = result.data.response.results.map
  (item=>({
    id:item.id,
    title:item.webTitle,
    description: item.fields?.trailText ?? "",
    image: item.fields?.thumbnail ?? null,
    publishedAt:item.webPublicationDate,
    apiUrl:item.apiUrl,

  }));
 


  return res.status(200).json({
    success:true,
    article:data,
    
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

 const result = await axios.get<GuardianApiResponse>("https://content.guardianapis.com/search", {
  params: {
    section: "business",
    "order-by": "newest",
    "show-fields": "headline,trailText,thumbnail",
    "page-size": 20,
    "api-key": process.env.GUARDIAN_API_KEY,
  },
});

  const data = result.data.response.results.map
  (item=>({
    id:item.id,
    title:item.webTitle,
    description: item.fields?.trailText ?? "",
    image: item.fields?.thumbnail ?? null,
    publishedAt:item.webPublicationDate,
    apiUrl:item.apiUrl,

  }));
 


  return res.status(200).json({
    success:true,
    article:data,
    
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

 const result = await axios.get<GuardianApiResponse>("https://content.guardianapis.com/search", {
  params: {
    section: "sport",
    "order-by": "newest",
    "show-fields": "headline,trailText,thumbnail",
    "page-size": 20,
    "api-key": process.env.GUARDIAN_API_KEY,
  },
});

  const data = result.data.response.results.map
  (item=>({
    id:item.id,
    title:item.webTitle,
    description: item.fields?.trailText ?? "",
    image: item.fields?.thumbnail ?? null,
    publishedAt:item.webPublicationDate,
    apiUrl:item.apiUrl,

  }));
 


  return res.status(200).json({
    success:true,
    article:data,
    
  });
}

catch(error){
  res.status(500).json({
    success:false,
    message:"Guardian sports API failed"

  })
}
}