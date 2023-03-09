import { Router } from 'express';
import { getTrend, getPostByHashtag } from '../controllers/trending.controller.js';

const trendingRoutes = Router();

trendingRoutes.get("/trending", getTrend);
trendingRoutes.get("/hashtag/:hashtag", getPostByHashtag);

export default trendingRoutes;