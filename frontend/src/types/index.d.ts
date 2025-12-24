


export default interface Articles {
 source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description?: string;
  urlToImage?: string;
  url: string;
  publishedAt: string;
  content: string;

}

export interface GuardianArticle{
    source:"the guardian"
    id:string,
    title:string,
    description:string,
    image:string,
    publishedAt:string,
    apiUrl:string,
}

export interface GuardianResponse{
    success:boolean,
    article:GuardianArticle[],
}


export interface NewsDataIOArticle {
  article_id: string;
  title: string;
  link: string;
  keywords?: string[] | null;      
  creator?: string[] | null;        
  description?: string;
  source_icon: string;
  pubDate: string;
  source_id?: string;
  image_url?: string | null;       
  video_url?: string | null;
  content?: string;
  country?: string[];
  category?: string[];
  source_name?: string;
  source_url?: string;
  duplicate?: boolean;
}
export interface Biasearticle extends Articles{
  ai_tag:string[];
  bias:"left"|"right"|"center"|"neutral";

}




export  interface GuardianContent {
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
