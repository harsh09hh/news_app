


export async function singIN(email:string,password:string){

    const response =await fetch("http://localhost:5500/api/v1/auth/sign-in",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },   
        body:JSON.stringify({email,password}),

    });

    const data=await response.json();

    if(!response.ok){

        throw new Error(data.message || "Login failed");
    }
   
    return data;


}