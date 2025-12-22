import { Router } from "express";
import { GuardianPolitics } from "../controller/Article.controller";

const GuardianArticle =Router();


GuardianArticle.get('/politics',GuardianPolitics );


export default GuardianArticle;