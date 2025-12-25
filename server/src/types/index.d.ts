export interface GuardianFields{
   
    headline?:string,
    thumbnail?:string,
    trailText?:string,
  
}

export interface GuardianArticle{
  id:string,
  webPublicationDate:string,
  webTitle:string,
  webUrl:string,
  apiUrl:string,
  fields?:GuardianFields

}
export interface GuardianApiResponse {
  response: {
    status: string;
    total: number;
    currentPage: number;
    pages: number;
    results: GuardianArticle[];
  };
}


export interface GuardianContent {
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

export interface GuardianSingleResponse {
   response: {
    status: string;
    content: GuardianContent;
  };

}
