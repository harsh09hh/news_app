import { Router } from "express";
import { GuardianFintech } from "../controller/Article.controller";

const GuardianArticle =Router();


GuardianArticle.get('/fintech',GuardianFintech );


export default GuardianArticle;