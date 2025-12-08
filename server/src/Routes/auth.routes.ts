
import { Router } from "express";
import { signin,signup,signout } from "../controller/auth.controller";


const authRouter =Router();


authRouter.post('/sign-up',signup);

authRouter.post('/sign-in',signin);

authRouter.post('/sign-out',signout);


export default authRouter;