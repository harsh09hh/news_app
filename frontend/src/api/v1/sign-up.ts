import axios from"axios";
import api from "./axios";


export async function signUp(name:String ,email:String,password:String){


    const response = await api.post("/auth/sign-up",
        
       {name,email,password});
       console.log("successfull")
    


    return response.data;

};