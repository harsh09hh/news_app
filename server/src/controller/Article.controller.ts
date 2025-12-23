import { Response,Request,NextFunction } from "express";
import axios from "axios";

interface GuardianFields{
   
    headline?:string,
    thumbnail?:string,
    trailText?:string,
  
}

interface GuardianArticle{
  id:string,
  webPublicationDate:string,
  webTitle:string,
  webUrl:string,
  apiUrl:string,
  fields?:GuardianFields

}
interface GuardianApiResponse {
  response: {
    status: string;
    total: number;
    currentPage: number;
    pages: number;
    results: GuardianArticle[];
  };
}


interface GuardianContent {
  id:string,
  webPublicationDate:string,
  webTitle:string,
  webUrl:string,
  apiUrl:string,
  fields:{
    headline?:string,
    trailText?:string,
    body?:string,
    thumbnail?:string,
  }

}

interface GuardianSingleResponse {
   response: {
    status: string;
    content: GuardianContent;
  };

}


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
  article,
})

}
catch (error) {
    
      return res.status(400).json({

        success:false,
        message:"Guardian API error",
      });


  }
}


export async function ParticularGuardianArticle(req:Request,res:Response,next:NextFunction){


  try{
    const {apiUri}= req.body;

    if(!apiUri){
      res.status(400).json({
        success:false,
        message: "apiUrl is required",
      })
    }

    const result=axios.get<GuardianSingleResponse>(apiUri,{
      params:{
        "show-fields": "body,headline,trailText,thumbnail",
        "api-key": process.env.GUARDIAN_API_KEY,
      },
    });

    const content = (await result).data.response.content;
    
    
    const article = {
       id:content.id,
       webPublicationDate:content.webPublicationDate,
       webTitle:content.webTitle,
       webUrl:content.webUrl,
       apiUrl:content.apiUrl,
  fields:{
    headline:content.fields?.headline,
    trailText:content.fields?.trailText,
    body:content.fields?.body,
    thumbnail:content.fields?.thumbnail,
        }

      }
    

      return res.status(200).json({
        success:true,
        article,
      });

    

  }
  catch(error){

    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Guardian article",
    });

  }
}
