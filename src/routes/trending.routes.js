import { Router } from 'express';
import { getTrend } from '../controllers/trending.controller.js';

const trendingRoutes = Router();

trendingRoutes.get("/trending", getTrend);

export default trendingRoutes;