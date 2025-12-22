import axios from"axios";


export async function signUp(name:String ,email:String,password:String){


    const response = await axios.post("/auth/sign-up",
        
       {name,email,password});
    


    return response.data;

};