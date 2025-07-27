
import type Articles from "@/types"
import { useLocation ,useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { analyzeArticle } from "@/api/analyze";



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
   <div className="max-w-3xl ml-20 p-6 space-y-6">
  <h1 className="text-3xl font-bold text-gray-900">
    {article.title}
  </h1>

  <img
    src={article.urlToImage}
    alt={article.title}
    className="w-full rounded-lg shadow-md"
  />

  <p className="text-gray-700 text-base">
    {article.description}
  </p>

<p className="text-gray-600">
  {article.content?.replace(/\[\+\d+ chars\]/, '')}
</p>

<a
  href={article.url}
  target="_blank"
  className="text-blue-600 underline mt-2 inline-block"
>
  Read more
</a>



   {aiData && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg space-y-2">
          <h2 className="text-xl font-semibold">AI Analysis</h2>
          <p><strong>Leaning:</strong> {aiData.leaning.join(", ")}</p>
          <p><strong>Reliability:</strong> {aiData.source_Reliability.join(", ")}</p>
          <p><strong>Sentiment:</strong> {aiData.ai_Sentiment.join(", ")}</p>
          <p><strong>AI Summary:</strong></p>
          <ul className="list-disc list-inside">{aiData.ai_summary.map((s, i) => <li key={i}>{s}</li>)}</ul>
          <p><strong>Key Points:</strong></p>
          <ul className="list-disc list-inside">{aiData.ai_key_points.map((k, i) => <li key={i}>{k}</li>)}</ul>
        </div>
      )}


 
</div>

  );
};

export default Onclicknews;