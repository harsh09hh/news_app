

import { Request,Response,NextFunction } from "express"
import UserModel from "../models/user.model";


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