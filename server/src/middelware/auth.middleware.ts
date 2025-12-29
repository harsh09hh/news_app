// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../config/env";

export interface AuthedRequest extends Request {
  userId?: string;
}


export async function verifyToken(req:AuthedRequest,res:Response,next:NextFunction){

  try{
   const token = req.cookies?.accessToken;


    if(!token){
      res.status(401).json({
        message:"not authenticated"
      });  
    }
    const secret= JWT_ACCESS_SECRET;
    if(!secret){
      console.error("JWT_ACCESS_SECRET missing");
      return res.status(500).json({ message: "Server misconfiguration" });
    
    }
    const decoded= jwt.verify(token,secret)as {
      userId: string;
      role: string;
};
    
   req.userId=decoded.userId;
   return next();

  }
  catch(err){
   return res.status(401).json({ message: "Invalid token" });
  }




}
