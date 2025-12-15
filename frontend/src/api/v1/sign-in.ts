import api from "./axios";

export async function singIN(email:string,password:string){

    const response =await api.post("/auth/sign-in",{
        email,
        password
    });

   
    return response.data;


}