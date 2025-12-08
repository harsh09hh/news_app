//@ts-nocheck

import { Request ,Response,NextFunction} from "express"
import mongoose from "mongoose";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { JWT_SECRET,JWT_EXPIRES_IN} from "../config/env";


interface CustomError extends Error{

    statusCode?:number;

}

export const signup=async(req:Request,res:Response,next:NextFunction)=>{
    
    const session=await mongoose.startSession();
    session.startTransaction();


    try{
        
       const {name,email ,password} =req.body;

        const existingUser= await UserModel.findOne({email});
        if(existingUser){
            const message= "User already exists"
            const error: CustomError = new Error(message);
            error.statusCode=409;
            throw error;

        } 

        //Hashed Password
        const salt =  await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const newUser= await new UserModel({
            name,
            email,
            password:hashedPassword});  

        await newUser.save({session});
        


        const token= jwt.sign({userId:newUser._id.toString()},
                      JWT_SECRET,
                      {expiresIn:JWT_EXPIRES_IN}                              
        )
        
        
        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({
                success: true,
                message:"user created successfully",
                token,
                user: {
                 id: newUser._id,
                 name: newUser.name,
                 email: newUser.email,
                },

        });

    }
    catch(error){

        await session.abortTransaction();
        session.endSession();
        next(error);

    }



};



export const signin=async(req:Request,res:Response,next:NextFunction)=>{

try{

    const{email,password}=req.body;


    const currentUser=await UserModel.findOne({email});

    if(!currentUser){
        const error:CustomError=new Error("User not found");
        error.statusCode=404;
        throw error;

    }


    const isPasswordValid =await bcrypt.compare(password,currentUser.password);

    if(!isPasswordValid){
        const error:CustomError =new Error("Invalid Password");
        error.statusCode=401;
        throw error;

    }

    const token= jwt.sign({userId:currentUser._id.toString()},
                      JWT_SECRET,
                      {expiresIn:JWT_EXPIRES_IN}                              
    )
        
    return res.status(200).json({
        success: true,
        message:"user signed in successfully",
        token,
        user: {
        id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,

        },

        });


}   
catch(error){
    next(error)


}


};

export const signout=(req:Request,res:Response,next:NextFunction)=>{


};