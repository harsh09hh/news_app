
export async function signUp(name:String ,email:String,password:String){


    const response = await fetch("http://localhost:5500/api/v1/auth/sign-up",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({name,email,password}),

    }) 
    
    const data=await response.json();
    if(!response.ok){
        throw new Error(data.message||"sign-up failed")
    }

    return data;

};