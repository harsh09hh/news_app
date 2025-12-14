import axios from "axios";


export async function singIN(email:string,password:string){

    const response =await axios.post("http://localhost:5500/api/v1/auth/sign-in",
     
        {email,password},
        {
            withCredentials:true,
           
            headers: {
                "Content-Type": "application/json",
            },

            
        },
        
    );

   
    return response.data;


}