import { Menu } from "lucide-react";
import { useSidebar } from "./ui/sidebar";

export default function MobileHeader(){


  const{openMobile,setOpenMobile}= useSidebar();


  return(
    <header className="lg:hidden fixed top-0 left-0 w-full h-14 bg-white border-b z-50 flex items-center px-4">

      <button onClick={()=>setOpenMobile(!openMobile)} className="p-2">
      <Menu />
      </button>
      <h1 className="flex-1 text-center font-bold text-lg">
        The Daily Draft
      </h1>
      <div className="w-8" />




    </header>
  );
}