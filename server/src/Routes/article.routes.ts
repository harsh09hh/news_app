import { Router } from "express";
import { businessGuardingArticle, GuardianPolitics,ParticularGuardianArticle, SportsGuardingArticle, TrendingGuardingArticle } from "../controller/Article.controller";

const GuardianArticle =Router();


GuardianArticle.get('/politics',GuardianPolitics );
GuardianArticle.get('/article',ParticularGuardianArticle );
GuardianArticle.get('/sports', SportsGuardingArticle);
GuardianArticle.get('/ business',  businessGuardingArticle);


export default GuardianArticle;