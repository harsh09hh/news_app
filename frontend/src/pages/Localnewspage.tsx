import { useState,useEffect } from "react";
import type Articles from "@/types";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Newscard } from "@/components/Newscard";
import type NewsDataIOArticle  from "@/types";







const Localnewspage =()=>{

    const[isloading,setisloading] =useState(false);
    const[thehindu ,setthehindu]=useState<Articles[]>([]);
    const[nbc ,setnbc]=useState<Articles[]>([]);
    const[timesofindia ,settimesofindia]=useState<Articles[]>([]);
    const[business,setbusiness]=useState<NewsDataIOArticle[]>([]);
    const[globalnews ,setglobalnews]= useState<Articles[]>([]);
    const[sports, setsports]=useState<NewsDataIOArticle[]>([]);


    const API_KEY =import.meta.env.VITE_PUBLIC_NEWS_API;
    const API_KEY_NEWSORG =import.meta.env.VITE_PUBLIC_NEWS_ORG




    


    const loadbrakingNews=async()=>{
        setisloading(true);

        try{


    const endpoint = "https://newsdata.io/api/1/latest?apikey=pub_6a9022b1b3e94782a875825908ae38ca&country=in&prioritydomain=top";

    const response = await fetch(endpoint);


    if(!response.ok){
        console.log('unable to fetch global news');
    }

    const data = await response.json();

    setglobalnews(data.results||[]);
    

}

catch(error){
    console.log('could not lode global news')
      setglobalnews([]);

}
finally{
    setisloading(false);
}
}


const loadbusinessNews=async ()=>{

    try{
        setisloading(true);
    
    const endpoint=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`

    const response= await fetch(endpoint);
    if(!response.ok){
        console.log("failed to fetch terndingnews");
    }

    const data = await response.json();
    setbusiness(data.articles ||[]);
    }
    catch(error){
        console.log("trending news",error);
        setbusiness([]);
    }
    finally{setisloading(false)};


}



const loadsports=async ()=>{

    try{
        setisloading(true);
    
    const endpoint="https://newsdata.io/api/1/news?apikey=pub_6a9022b1b3e94782a875825908ae38ca&country=in&category=sports"

    const response= await fetch(endpoint);
    if(!response.ok){
        console.log("failed to fetch terndingnews");
    }

    const data = await response.json();
    setsports(data.articles ||[]);
    }
    catch(error){
        console.log("trending news",error);
        setsports([]);
    }
    finally{setisloading(false)};

  }




    const loadnbs=async ()=>{

    try{
        setisloading(true);
    
    const endpoint=`https://newsapi.org/v2/top-headlines?sources=nbc-news&apiKey=${API_KEY}`

    const response= await fetch(endpoint);
    if(!response.ok){
        console.log("failed to fetch terndingnews");
    }

    const data = await response.json();
    setnbc(data.articles ||[]);
    }
    catch(error){
        console.log("trending news",error);
        setnbc([]);
    }
    finally{setisloading(false)};


}



const loadtimesofindia=async ()=>{

    try{
        setisloading(true);
    
    const endpoint=`https://newsapi.org/v2/top-headlines?sources=the-times-of-india&apiKey=${API_KEY}`

    const response= await fetch(endpoint);
    if(!response.ok){
        console.log("failed to fetch terndingnews");
    }

    const data = await response.json();
    settimesofindia(data.articles ||[]);
    }
    catch(error){
        console.log("trending news",error);
        settimesofindia([]);
    }
    finally{setisloading(false)};


}



useEffect(()=>{
loadnbs();
loadtimesofindia();
loadbrakingNews();
loadsports();
loadbusinessNews();
},[])

    return(
      
    <div className="flex">
      <SidebarProvider>
        
        <div className="w-[250px] h-screen fixed top-0 left-0 border-r z-50 bg-white">
          <AppSidebar />
        </div>


         <div className="ml-[250px] h-screen overflow-y-auto w-full p-6 space-y-10">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome to NewsHub</h1>
            <p className="text-sm text-gray-500 mt-4">
              Stay informed with the latest news around the world
            </p>
          </div>




          
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">India Headlines</h2>
            <div className="overflow-x-auto ">
              <div className="flex gap-6 w-max items-start">
                {isloading? (
                  <p>Loading Global News...</p>
                ) : (
                  globalnews.map((article, index) => (
                    <Newscard key={index} article={article} />
                  ))
                )}
              </div>
            </div>
          </section>





            <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Business</h2>
            <div className="overflow-x-auto">
              <div className="flex gap-6 w-max">
                {isloading ? (
                  <p>Loading Trending News...</p>
                ) : (
                  business.map((article, index) => (
                    <Newscard key={index} article={article} />
                  ))
                )}
              </div>
            </div>
          </section>



            <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Sports</h2>
            <div className="overflow-x-auto">
              <div className="flex gap-6 w-max">
                {isloading ? (
                  <p>Loading Trending News...</p>
                ) : (
                  sports.map((article, index) => (
                    <Newscard key={index} article={article} />
                  ))
                )}
              </div>
            </div>
          </section>











          <section>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Times of  India</h2>
                    <div className="overflow-x-auto">
                      <div className="flex gap-6 w-max">
                        {isloading ? (
                          <p>Loading Trending News...</p>
                        ) : (
                          timesofindia.map((article, index) => (
                            <Newscard key={index} article={article} />
                          ))
                        )}
                      </div>
                    </div>
                  </section>
        
        
        
        
        
        
        
        
        
        
                   <section>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">The Hindu</h2>
                    <div className="overflow-x-auto">
                      <div className="flex gap-6 w-max">
                        {isloading ? (
                          <p>Loading Trending News...</p>
                        ) : (
                          thehindu.map((article, index) => (
                            <Newscard key={index} article={article} />
                          ))
                        )}
                      </div>
                    </div>
                  </section>
        

          </div>
         </SidebarProvider>
    </div>

    );


}

export default Localnewspage;