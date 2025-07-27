
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type Articles from "@/types";
import { Newscard } from "@/components/Newscard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
interface Category {
  sports: string;
  fintech: string;
  technology: string;
  world: string;
  politics: string;
}





const Differentcatigory=()=>{
    const[isloding , setisloding] =useState(false);
    const[lodingcatigory , setlodingcatigory] =useState<Articles[]>([])

    const{category} =useParams();
    const API_KEY =import.meta.env.VITE_PUBLIC_NEWS_API;


    const differentApi: Record<string,string> = {
    sports: `https://newsapi.org/v2/everything?q=sports&apiKey=${API_KEY}`,
    fintech: `https://newsapi.org/v2/everything?q=fintech&apiKey=${API_KEY}`,
    technology: `https://newsapi.org/v2/everything?q=technology&apiKey=${API_KEY}`,
    world: `https://newsapi.org/v2/everything?q=world&apiKey=${API_KEY}`,
    politics: `https://newsapi.org/v2/everything?q=politics&apiKey=${API_KEY}`
    };


    const apiurl = differentApi[category??""]; 

   
    useEffect(()=>{
         const lodingArticles =async ()=> {
         try{
            setisloding(true);
        const response = await fetch(apiurl);
        if(!response.ok){
            console.log("faild to fetch the article ");

        }
        const data =await response.json();
        setlodingcatigory(data.articles ||[])

        }
        catch(err:any){
            console.error(err.message);
        }
        finally{
            setisloding(false);
        }

        
        };
        lodingArticles();
       
    },[apiurl]);

    return(
         <div className="flex">
      <SidebarProvider>
        
        <div className="w-[250px] h-screen fixed top-0 left-0 border-r z-50 bg-white">
          <AppSidebar />
        </div>
            <h2>different page</h2>
            
            <div className=" flex grid grid-cols-3 gap-4">
                {lodingcatigory.map((article ,index)=>(
                    <Newscard article={article} key={index} />

                ))}

            </div>
            </SidebarProvider>
        </div>
    );
}

export default Differentcatigory;