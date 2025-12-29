
import { Router } from "express";
import { verifyAccessToken } from "../controller/user.controller";


const ProtectedRoute=Router();


ProtectedRoute.get('/me',verifyAccessToken);


export default ProtectedRoute;