


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

