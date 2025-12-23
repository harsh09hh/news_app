import { Router } from "express";
import { GuardianPolitics,ParticularGuardianArticle } from "../controller/Article.controller";

const GuardianArticle =Router();


GuardianArticle.get('/politics',GuardianPolitics );
GuardianArticle.get('/article',ParticularGuardianArticle );


export default GuardianArticle;