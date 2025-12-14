//@ts-nocheck

import { Request ,Response,NextFunction} from "express"
import mongoose from "mongoose";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { createAccessToken, createRefreshToken, setAuthCookies,JwtPayload, clearAuthCookies } from "../utils/tokens";
import { JWT_REFRESH_SECRET } from "../config/env";






interface CustomError extends Error{

    statusCode?:number;

}

export const signup=async(req:Request,res:Response,next:NextFunction)=>{
    
    const session=await mongoose.startSession();
    session.startTransaction();


    try{
        
       const {name,email ,password} =req.body;

        const existingUser= await UserModel.findOne({email}).session(session);
        if(existingUser){
            const message= "User already exists"
            const error: CustomError = new Error(message);
            error.statusCode=409;
            throw error;

        } 

        const salt =  await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const newUser= await new UserModel({
            name,
            email,
            password:hashedPassword});  
        
        

   const payload: JwtPayload = { userId: newUser._id.toString() };

        const refreshToken= createRefreshToken(payload);
        
        const accessToken= createAccessToken(payload);



    const hashedrefreshtoken= await bcrypt.hash(refreshToken,10);
    newUser.refreshtoken=hashedrefreshtoken;
    await newUser.save({session});

    await session.commitTransaction();
    session.endSession();


    setAuthCookies(res,accessToken,refreshToken);

        return res.status(201).json({
                success: true,
                message:"user created successfully",
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

  const session =await mongoose.startSession();
  session.startTransaction();


try{

    const{email,password}=req.body;


    const currentUser=await UserModel.findOne({email}).session(session);

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

    const payload:JwtPayload={
        userId:currentUser._id.toString()
    };

    
    const refreshToken=createRefreshToken(payload);
    const accessToken=createAccessToken(payload);

    currentUser.refreshtoken=await bcrypt.hash(refreshToken,10);
    await currentUser.save({session});


    setAuthCookies(res,accessToken,refreshToken);
    await session.commitTransaction();
    session.endSession();
 
    return res.status(200).json({
        success: true,
        message:"user signed in successfully",
        user: {
        id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,

        },

        });


}   
catch(error){
    next(error)
    session.abortTransaction();
    session.endSession();



}


};

export const refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {

    const session =await mongoose.startSession();
    session.startTransaction();


  try {
    const tokenFromCookie = req.cookies?.refreshToken;
    if (!tokenFromCookie) {
      throw  new Error("Refresh token missing", );
    }
    let decoded: any;
    try {
      decoded = jwt.verify(tokenFromCookie, JWT_REFRESH_SECRET) 
    } catch {
      throw new Error("Invalid refresh token", );
    }

    const userId = decoded.userId;
    const user = await UserModel.findById(userId).session(session);
    if (!user || !user.refreshtoken) {
      throw new Error("Refresh token not found");
    }


    const isValid = await bcrypt.compare(tokenFromCookie, user.refreshtoken);
    if (!isValid) {
      throw new Error("Refresh token does not match");
    }

    const payload: JwtPayload = { userId };
    const newAccessToken = createAccessToken(payload);

    // just update access token cookie
    setAuthCookies(res, newAccessToken, tokenFromCookie);

    await session.commitTransaction();
    session.endSession();


    return res.status(200).json({
      success: true,
      message: "Access token refreshed",
    });


  } catch (error) {


   await  session.abortTransaction();
    session.endSession();

     next(error);
  }
};


export const signout=async(req:Request,res:Response,next:NextFunction)=>{


    const session =await mongoose.startSession();
    session.startTransaction(); 
  try {
    const tokenFromCookie = req.cookies?.refreshToken;

    if (tokenFromCookie) {
 
      const decoded = jwt.decode(tokenFromCookie) as JwtPayload | null;
      if (decoded?.userId) {
        const user = await UserModel.findById(decoded.userId).session(session);
        if (user) {
          user.refreshtoken = null;
          await user.save({session});
        }
      }
    }

    clearAuthCookies(res);
    
    
    session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);


    
   await session.abortTransaction();
    session.endSession();
  }
};