
import api from "@/api/v1/axios";
import { useEffect, useState } from "react";
import { Navigate,Outlet } from "react-router-dom"

const ProtectedRoute=()=>{

const [loading ,setLoading]= useState(true);
const[IsAuth,setIsAuth]=useState(false);


 useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        await api.get("/me");
        if (mounted) setIsAuth(true);
      } catch {
        if (mounted) setIsAuth(false);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    checkAuth();
    return () => {
    mounted = false;
  };
  }, []);


   if (loading) return <div>Checking session…</div>;
   return IsAuth ? <Outlet /> : <Navigate to="/sign-in" replace />;

};
export default ProtectedRoute;