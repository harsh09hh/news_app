
import type Articles from "@/types"
import { useLocation ,useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { analyzeArticle } from "@/api/v1/analyze";

interface  AIresponse{
  ai_summary :string[],
  leaning:string[],
  source_Reliability:string[],
  ai_key_points: string[],
  ai_Sentiment:string[]

}




const Onclicknews=()=>{

  const navigate =useNavigate();
  const {state} = useLocation(); 
  const [aiData ,setaidata] =useState<AIresponse |null>(null);
  const[isloding,setisloding]=useState(false);
  const[error ,seterror] =useState<string |null>(null);
const article = state?.article ;




 if (!article) {
      return (
      <div>
        <p>No article data found.</p>
        <button onClick={() => navigate(-1)}   className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">Go Back</button>
      </div>
    );
  }




  useEffect(()=>{
   

    let cancelled = false;
    setisloding(true);
    seterror(null);

    (async () => {
      try {
        const data = await analyzeArticle(article);
        if (!cancelled) {
          setaidata(data);
        }
      } catch (err: any) {
        console.error(err);
        if (!cancelled) {
          seterror(err.message || "Failed to fetch AI analysis");
        }
      } finally {
        if (!cancelled) {
          setisloding(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
   

  },[article])



   

  



return (
  <div className="flex justify-center px-4 py-8 bg-gray-50 min-h-screen">
    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 space-y-6">
      
      <h1 className="text-3xl font-bold text-gray-900 leading-snug">
        {article.title}
      </h1>

      
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full rounded-xl shadow-md object-cover"
        />
      )}

     
      <p className="text-gray-700 text-lg">
        {article.description}
      </p>

      <p className="text-gray-600 leading-relaxed">
        {article.content?.replace(/\[\+\d+ chars\]/, '')}
      </p>

     
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
      >
        Read full article
      </a>

      {aiData && (
        <div className="mt-8 p-6 bg-gray-100 rounded-xl space-y-4 shadow-inner">
          <h2 className="text-2xl font-semibold text-gray-800">AI Analysis</h2>
          <p><strong>Leaning:</strong> {aiData.leaning.join(", ")}</p>
          <p><strong>Reliability:</strong> {aiData.source_Reliability.join(", ")}</p>
          <p><strong>Sentiment:</strong> {aiData.ai_Sentiment.join(", ")}</p>

          <div>
            <h3 className="font-semibold">AI Summary:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {aiData.ai_summary.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Key Points:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {aiData.ai_key_points.map((k, i) => <li key={i}>{k}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  </div>
);

};

export default Onclicknews;