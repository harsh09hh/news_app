import axios from"axios";


export async function signUp(name:String ,email:String,password:String){


    const response = await axios.post("http://localhost:5500/api/v1/auth/sign-up",
        
       {name,email,password},
        {
            withCredentials:true,
            headers:{
                "Content-Type":"application/json",
            },
        }

    );
    


    return response.data;

};