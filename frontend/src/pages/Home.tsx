import { useEffect,useState } from "react";
import { Newscard } from "../components/Newscard";
import type Articles from "../types";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { businessGuardingArticle, cryptoGuardingArticle, GuardianPoliticsArticle, healthGuardingArticle, moviesGuardingArticle, sportGuardingArticle, TrendingGuardingArticle } from "@/api/v1/Guardianarticle";
import { mapGuardianToArticle } from "@/lib/utils";
import type { GuardianArticle } from "../types";
import { GuardianNewsCars } from "@/components/NewsCard.Guardian";
import { Skletonloading } from "@/components/SkletonLoding";
import MobileHeader from "@/components/MobileHeader";


const Home=()=>{
   const[globalnews ,setglobalnews]= useState<Articles[]>([]);
    const [isloading ,setisloading]=useState(false);
    const[lodingsection ,setlodingsection]= useState({});

    const[tendingnews ,settending]= useState<GuardianArticle[]>([]);
    const[politics,setpolitics]=useState<GuardianArticle[]>([]);
    const[business,setbusiness]=useState<GuardianArticle[]>([]);
    const[crypto,setcrypto]=useState<GuardianArticle[]>([]);
    const[stock,setstock]=useState<Articles[]>([]);
    const[movies ,setmovies] =useState<GuardianArticle[]>([]);
    const[health ,sethealth] =useState<GuardianArticle[]>([]);
    const[thehindu ,setthehindu]=useState<Articles[]>([]);
    const[nbc ,setnbc]=useState<Articles[]>([]);
    const[timesofindia ,settimesofindia]=useState<Articles[]>([]);
    


    const API_KEY =import.meta.env.VITE_PUBLIC_NEWS_API;

    const navigate =useNavigate();
    









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

  const fetchall=()=>{
  
   
   loadnbs();
   loadnewyorktimes();
   loadtimesofindia();
   
GuardianPoliticsArticle()
    .then((res) => setpolitics(res.article))
    .catch(console.error);

TrendingGuardingArticle()
  .then((res) => settending(res.article))
  .catch(err => console.error(err));

  moviesGuardingArticle()
    .then((res) => setmovies(res.article))
    .catch(console.error);


  businessGuardingArticle().then((res) => setbusiness(res.article))
  .catch(err => console.error(err));

  cryptoGuardingArticle().then((res) => setcrypto(res.article))
  .catch(err => console.error(err));

  healthGuardingArticle().then((res)=>sethealth(res.article))
  .catch(err => console.error(err));

  }
  fetchall();



},[])




 return (
    <div className="flex">
      <SidebarProvider>

          <MobileHeader />
        
       
          <AppSidebar />
   

       
         <div className="lg:pl-[var(--sidebar-width)] mt-14 lg:mt-0 h-screen overflow-y-auto w-full p-6 space-y-10">

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">The Daily Draft</h1>
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
                <Skletonloading/>
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
                  <Skletonloading/>
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
                  <Skletonloading/>
                ) : (
                  business.map((article, index) => (
                    <GuardianNewsCars key={index} article={article} />
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
                  <Skletonloading/>
                ) : (
                  crypto.map((article, index) => (
                    <GuardianNewsCars key={index} article={article} />
                  ))
                )}
              </div>
            </div>
          </section>




           <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Movies</h2>
            <div className="overflow-x-auto">
              <div className="flex gap-6 w-max">
                {isloading ? (
                  <Skletonloading/>
                ) : (
                  movies.map((article, index) => (
                    <GuardianNewsCars key={index} article={article} />
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
                  <Skletonloading/>
                ) : (
                 health.map((article, index) => (
                    <GuardianNewsCars key={index} article={article} />
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
                  <Skletonloading/>
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