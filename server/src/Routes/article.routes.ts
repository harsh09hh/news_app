import { Router } from "express";
import { businessGuardingArticle, CryptoGuardingArticle, GuardianHealth, GuardianMovies, GuardianPolitics,ParticularGuardianArticle, SportsGuardingArticle, TrendingGuardingArticle } from "../controller/Article.controller";

const GuardianArticle =Router();


GuardianArticle.get('/politics',GuardianPolitics );
GuardianArticle.get('/article',ParticularGuardianArticle );
GuardianArticle.get('/sports', SportsGuardingArticle);
GuardianArticle.get('/business',  businessGuardingArticle);
GuardianArticle.get('/trending',TrendingGuardingArticle );
GuardianArticle.get('/crypto',CryptoGuardingArticle );
GuardianArticle.get('/movies',GuardianMovies);
GuardianArticle.get('/health',GuardianHealth);


export default GuardianArticle;