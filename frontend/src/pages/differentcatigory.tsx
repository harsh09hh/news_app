
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type Articles from "@/types";
import { Newscard } from "@/components/Newscard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { businessGuardingArticle, GuardianPoliticsArticle, sportGuardingArticle, TrendingGuardingArticle } from "@/api/v1/Guardianarticle";
import { GuardianNewsCars } from "@/components/NewsCard.Guardian";
import type { GuardianArticle } from "@/types";




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
      
      <div className="w-[250px] h-screen fixed top-0 left-0 border-r z-50 bg-white">
        <AppSidebar />
      </div>

      
      <div className="ml-[250px] flex-1 p-4">
        <h2 className="text-xl font-semibold mb-4">{category}</h2>

        <div className="grid grid-cols-3 gap-4">
          {lodingcatigory.map((article, index) => (
            <GuardianNewsCars key={index} article={article}/>
          ))}
        </div>
      </div>
    </SidebarProvider>
  </div>
);

}

export default Differentcatigory;