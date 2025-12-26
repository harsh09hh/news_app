import { Router } from "express";
import { GuardianPolitics,ParticularGuardianArticle, TrendingGuardingArticle } from "../controller/Article.controller";

const GuardianArticle =Router();


GuardianArticle.get('/politics',GuardianPolitics );
GuardianArticle.get('/article',ParticularGuardianArticle );
GuardianArticle.get('/trending', TrendingGuardingArticle);


export default GuardianArticle;