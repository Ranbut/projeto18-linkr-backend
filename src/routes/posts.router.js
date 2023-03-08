import { Router } from 'express';
import { getPost, pushPost } from '../controllers/posts.controller.js';
import { postPushValidation } from '../middlewares/posts.middleware.js';

const postsRouter = Router();

postsRouter.get("/posts", getPost);
postsRouter.post("/posts", postPushValidation, pushPost);

export default postsRouter;