
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type Articles from "@/types";
import { Newscard } from "@/components/Newscard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { businessGuardingArticle, GuardianPoliticsArticle, sportGuardingArticle, TrendingGuardingArticle } from "@/api/v1/Guardianarticle";
import { GuardianNewsCars } from "@/components/NewsCard.Guardian";
import type { GuardianArticle } from "@/types";
import MobileHeader from "@/components/MobileHeader";




const Differentcatigory=()=>{
    const[isloding , setisloding] =useState(false);
    const[lodingcatigory , setlodingcatigory] =useState<GuardianArticle[]>([])

    const{category} =useParams();
    const API_KEY =import.meta.env.VITE_PUBLIC_NEWS_API;


    const loadHandler:Record<string ,()=>Promise<any>>={
    politics: ()=> GuardianPoliticsArticle(),
    technology:()=>TrendingGuardingArticle(),
    fintech:()=>businessGuardingArticle(),
    sports:()=>sportGuardingArticle(),
    trending:()=> TrendingGuardingArticle()
    }
 

    useEffect(()=>{
         
      const lodingArticles =async ()=> {
          if(!category)return;

         try{

            setisloding(true);

            const response =  loadHandler[category];

        if(!response){
            console.log("failed to fetch the article ");
          return;
        }
        const data =await response();
        setlodingcatigory(data.article||[]);

        }
        catch(err:any){
            console.error(err.message);
        }
        finally{
            setisloding(false);
        }

        
        };
        lodingArticles();
       
    },[category]);

    return (
  <div className="flex">
    <SidebarProvider>
      <MobileHeader />
      <AppSidebar />

      <div className="mt-14 lg:mt-0 h-screen overflow-y-auto w-full p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 capitalize">{category}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isloding ? (
            <div>Loading...</div>
          ) : (
            lodingcatigory.map((article, index) => (
              <GuardianNewsCars key={index} article={article}/>
            ))
          )}
        </div>
      </div>
    </SidebarProvider>
  </div>
);

}

export default Differentcatigory;