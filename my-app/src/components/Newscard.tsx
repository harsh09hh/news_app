import { Clock, Eye, Share2 } from "lucide-react";
import type Articles from "../types";
import { useNavigate } from "react-router-dom";


interface Props {
  article: Articles;
  index?:number
}


export function Newscard({article,index}:Props) {
  const navigate =useNavigate();

  const handleClick =(article:Articles)=>{
    navigate("/detail",{state:{article}});
  }

  return (
    <div className="relative flex-none w-100 h-[450px] bg-white dark:bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.03] p-4 group" 
    
    onClick={() => handleClick(article) }style={{cursor:"pointer",margin:"1rem 0"}}
>

      
      <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm z-10">
        <Share2 className="w-4 h-4 text-gray-500" />
      </div>

      {/* Image */}
      <div className="w-full h-60 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
        <img
          src={article.urlToImage}
          alt="news"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Tag */}
      {article.source?.name && (
        <span className="absolute top-3 left-3 bg-gray-200 text-gray-800 text-xs px-2 py-0.5 rounded-full z-10">
          {article.source.name}
        </span>
      )}

      {/* Content */}
      <div className="mt-3">
        <h2 className="text-md font-semibold leading-tight line-clamp-2">
          {article.title}
        </h2>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {article.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>5 min read</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>12.5k</span>
          </div>
        </div>
      </div>
    </div>
  );
}
