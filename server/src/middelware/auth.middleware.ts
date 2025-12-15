// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../config/env";
import { JwtPayload } from "../utils/tokens";

interface AuthedRequest extends Request {
  userId?: string;
}

export const requireAuth = (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const decoded = jwt.verify(
      token,
      JWT_ACCESS_SECRET
    ) 
    req.userId = decoded.userId;
    next();

  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
