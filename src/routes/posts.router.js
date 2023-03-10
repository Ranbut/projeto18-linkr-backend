import { Router } from 'express';
import { getPost, pushPost, editPost, deletePost } from '../controllers/posts.controller.js';
import getHashtag from '../middlewares/getHashtag.middleware.js';
import { postPushValidation } from '../middlewares/posts.middleware.js';
import { authValidation } from '../middlewares/generics.middleware.js';

const postsRouter = Router();

postsRouter.get("/posts", getPost);
postsRouter.post("/posts", postPushValidation, getHashtag(), pushPost);
postsRouter.put("/posts/:id", authValidation, editPost);
postsRouter.delete("/posts/delete/:id", deletePost);

export default postsRouter;