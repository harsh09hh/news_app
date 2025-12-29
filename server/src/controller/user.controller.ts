

import { Request,Response,NextFunction } from "express"
import UserModel from "../models/user.model";
import { AuthedRequest } from "../middelware/auth.middleware";
import { mongo } from "mongoose";
import { triggerAsyncId } from "async_hooks";

interface CustomError extends Error{

    statusCode?:number;
};

export const getUsers=async(req:Request,res:Response,next:NextFunction)=>{

    try{

        const users = await UserModel.find();
        
        res.status(200).json({success:true,data:users});

    }

    catch(error){
        next(error);
    }
}


export const getUser=async(req:Request,res:Response,next:NextFunction)=>{

    try{

        const user = await UserModel.findById(req.params.id).select('-password');
        if(!user){
            const error:CustomError =new Error('user Not Found');
            error.statusCode=404;
        }


        res.status(200).json({success:true,data:user});

    }

    catch(error){
        next(error);
    }
}


export async function verifyAccessToken(req:AuthedRequest,res:Response){
    try{
 const userId= req.userId;
  if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

 const user= await UserModel.findById(userId).select("-password -refreshtoken");
 if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });




}
catch(err){
    return res.status(500).json({
        success:false,
        message:"user not found"
    })
}


}