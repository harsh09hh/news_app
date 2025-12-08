
import Router from "express";
import { getUser, getUsers } from "../controller/user.controller";


const userRoutes=Router();

userRoutes.get('/',getUsers);


userRoutes.get('/:id',getUser);



export default userRoutes;
