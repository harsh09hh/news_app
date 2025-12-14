//@ts-nocheck

import jwt from "jsonwebtoken";
import { Response } from "express";

import {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  NODE_ENV,
} from "../config/env";


const isProd=NODE_ENV==="production";


const ACCESS_TOKEN_MAX_AGE_MS = 15 * 60 * 1000;
const REFRESH_TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export interface JwtPayload{
    userId:string;
}

export const createAccessToken=(playload:JwtPayload):string=>{

    return jwt.sign(playload,JWT_ACCESS_SECRET,{
        expiresIn:JWT_ACCESS_EXPIRES_IN || "15m",
    })

}


export const createRefreshToken=(playload:JwtPayload):string=>{

    return jwt.sign(playload,JWT_REFRESH_SECRET,{
        expiresIn:JWT_REFRESH_EXPIRES_IN||"7d",
    }) 
}


export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProd,       // in prod must be HTTPS
    sameSite: isProd ? "none" : "lax", // adjust based on your setup
    maxAge: ACCESS_TOKEN_MAX_AGE_MS,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax", // "strict" if same-origin only
    maxAge: REFRESH_TOKEN_MAX_AGE_MS,
  });
}

export const clearAuthCookies = (res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
};

