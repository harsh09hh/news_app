
import { Router } from "express";
import { signin,signup,signout, refreshAccessToken } from "../controller/auth.controller";


const authRouter =Router();


authRouter.post('/sign-up',signup);

authRouter.post('/sign-in',signin);

authRouter.post('/refresh',refreshAccessToken);

authRouter.post('/sign-out',signout);
// authRouter.post('/forgot-password',);


export default authRouter;