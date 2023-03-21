import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

import authRouter from './routes/auth.routes.js';
import postsRouter from './routes/posts.routes.js';
import trendingRoutes from './routes/trending.routes.js';
import userPage from './routes/userPage.routes.js';
import sessionRefresh from './session.js';
import likeRoutes from './routes/likes.routes.js';
import commentRouter from './routes/comments.routes.js';

app.use ([
    authRouter,
    postsRouter,
    trendingRoutes,
    userPage,
    likeRoutes,
    commentRouter
    ]);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}.`));

sessionRefresh(15, 2.5, 'minutes')