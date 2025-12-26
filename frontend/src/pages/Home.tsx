import { useEffect,useState } from "react";
import { Newscard } from "../components/Newscard";
import type Articles from "../types";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { GuardianPoliticsArticle, TrendingGuardingArticle } from "@/api/v1/Guardianarticle";
import { mapGuardianToArticle } from "@/lib/utils";
import type { GuardianArticle } from "../types";
import { GuardianNewsCars } from "@/components/NewsCard.Guardian";

import { Key } from "lucide-react";


const Home=()=>{
   const[globalnews ,setglobalnews]= useState<Articles[]>([]);
    const [isloading ,setisloading]=useState(false);

    const[tendingnews ,settending]= useState<GuardianArticle[]>([]);
    const[politics,setpolitics]=useState<GuardianArticle[]>([]);
    const[business,setbusiness]=useState<Articles[]>([]);
    const[crypto,setcrypto]=useState<Articles[]>([]);
    const[stock,setstock]=useState<Articles[]>([]);
    const[washingtonpost ,setwashingtonpost] =useState<Articles[]>([]);
    const[wallstreet ,setwallstreet] =useState<Articles[]>([]);
    const[thehindu ,setthehindu]=useState<Articles[]>([]);
    const[nbc ,setnbc]=useState<Articles[]>([]);
     const[timesofindia ,settimesofindia]=useState<Articles[]>([]);
   


    const API_KEY =import.meta.env.VITE_PUBLIC_NEWS_API;

    const navigate =useNavigate();
    



  










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
const loadcryptoNews=async ()=>{

    try{
        setisloading(true);
    
    const endpoint=`https://newsapi.org/v2/everything?q=cryptocurrency+bitcoin+ethereum&sortBy=publishedAt&language=en&pageSize=20&apiKey=${API_KEY}`

    const response= await fetch(endpoint);
    if(!response.ok){
        console.log("failed to fetch terndingnews");
    }

    const data = await response.json();
    setcrypto(data.articles ||[]);
    }
    catch(error){
        console.log("trending news",error);
        setcrypto([]);
    }
    finally{setisloading(false)};


}


const loadwashingtonpost =async()=>{

  try{
    setisloading(true)
  const endpoint =`https://newsapi.org/v2/top-headlines?sources=the-washington-post&apiKey=${API_KEY}`

  const response =await fetch(endpoint);

  if(!response.ok){
    console.log("could not load the article for washintton post");
  }
  const data =await response.json();
  setwashingtonpost(data.articles ||[]);
  }
  catch(error){
    console.error(error);
  }
  finally{
    setisloading(false);
  }


}




const loadstocknews=async ()=>{

    try{
        setisloading(true);
    
    const endpoint=`https://newsapi.org/v2/everything?q=stock%20market&apiKey=${API_KEY}`

    const response= await fetch(endpoint);
    if(!response.ok){
        console.log("failed to fetch terndingnews");
    }

    const data = await response.json();
    setcrypto(data.articles ||[]);
    }
    catch(error){
        console.log("trending news",error);
        setcrypto([]);
    }
    finally{setisloading(false)};


}

const loadwallstreetjournal=async ()=>{

    try{
        setisloading(true);
    
    const endpoint=`https://newsapi.org/v2/top-headlines?sources=the-wall-street-journal&apiKey=${API_KEY}`

    const response= await fetch(endpoint);
    if(!response.ok){
        console.log("failed to fetch terndingnews");
    }

    const data = await response.json();
    setwallstreet(data.articles ||[]);
    }
    catch(error){
        console.log("trending news",error);
        setwallstreet([]);
    }
    finally{setisloading(false)};


}


const loadnewyorktimes=async ()=>{

    try{
        setisloading(true);
    
    const endpoint=`https://newsapi.org/v2/top-headlines?sources=nbc-news&apiKey=${API_KEY}`

    const response= await fetch(endpoint);
    if(!response.ok){
        console.log("failed to fetch terndingnews");
    }

    const data = await response.json();
    setthehindu(data.articles ||[]);
    }
    catch(error){
        console.log("trending news",error);
        setthehindu([]);
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
    loadbusinessNews();
    loadcryptoNews();
    loadstocknews();
    loadwashingtonpost();
   loadwallstreetjournal();
   loadnbs();
   loadnewyorktimes();
   loadtimesofindia();
   
GuardianPoliticsArticle()
    .then((res) => setpolitics(res.article))
    .catch(console.error);

TrendingGuardingArticle()
  .then((res) => settending(res.article))
  .catch(err => console.error(err));



},[])




 return (
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

        
     

          {/* Trending News Section with horizontal scroll */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Trending News</h2>
            <div className="overflow-x-auto">
              <div className="flex gap-6 w-max">
               {isloading? (
                <p>loading trending article</p>
               ): (
                tendingnews.map((article, index)=>(
                <GuardianNewsCars key={index} article={article}/>
                ))
               )}
              </div>
            </div>
          </section>




           <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Politics</h2>
            <div className="overflow-x-auto">
              <div className="flex gap-6 w-max">
                {isloading ? (
                  <p>Loading politics News...</p>
                ) : (
                 politics.map((article, index) => (
                    <GuardianNewsCars key={index} article={article}/>
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
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">crypto</h2>
            <div className="overflow-x-auto">
              <div className="flex gap-6 w-max">
                {isloading ? (
                  <p>Loading Trending News...</p>
                ) : (
                  crypto.map((article, index) => (
                    <Newscard key={index} article={article} />
                  ))
                )}
              </div>
            </div>
          </section>




            <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Stocks</h2>
            <div className="overflow-x-auto">
              <div className="flex gap-6 w-max">
                {isloading ? (
                  <p>Loading Trending News...</p>
                ) : (
                  crypto.map((article, index) => (
                    <Newscard key={index} article={article} />
                  ))
                )}
              </div>
            </div>
          </section>







            






           <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Washington Post</h2>
            <div className="overflow-x-auto">
              <div className="flex gap-6 w-max">
                {isloading ? (
                  <p>Loading Trending News...</p>
                ) : (
                  washingtonpost.map((article, index) => (
                    <Newscard key={index} article={article} />
                  ))
                )}
              </div>
            </div>
          </section>




          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">The Wall Street Journal</h2>
            <div className="overflow-x-auto">
              <div className="flex gap-6 w-max">
                {isloading ? (
                  <p>Loading Trending News...</p>
                ) : (
                  wallstreet.map((article, index) => (
                    <Newscard key={index} article={article} />
                  ))
                )}
              </div>
            </div>
          </section>






          




           <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">NBC News</h2>
            <div className="overflow-x-auto">
              <div className="flex gap-6 w-max">
                {isloading ? (
                  <p>Loading Trending News...</p>
                ) : (
                  nbc.map((article, index) => (
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
};



export default Home;