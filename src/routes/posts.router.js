import { Router } from 'express';
import { getPost, pushPost } from '../controllers/posts.controller.js';
import getHashtag from '../middlewares/getHashtag.middleware.js';
import { postPushValidation } from '../middlewares/posts.middleware.js';

const postsRouter = Router();

postsRouter.get("/posts", getPost);
postsRouter.post("/posts", postPushValidation, getHashtag(), pushPost);

export default postsRouter;