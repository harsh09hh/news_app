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

