import { Menu } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import {  useNavigate } from "react-router-dom";
export default function MobileHeader(){

const navigate=useNavigate();


  const{openMobile,setOpenMobile}= useSidebar();


  return(
    <header className="lg:hidden fixed top-0 left-0 w-full h-14 bg-white border-b z-50 flex items-center px-4">

      <button onClick={()=>setOpenMobile(!openMobile)} className="p-2">
      <Menu />
      </button>
      <h1 className="flex-1 text-center font-bold text-lg" onClick={()=>navigate('/')}>
        The Daily Draft
      </h1>
      <div className="w-8" />




    </header>
  );
}