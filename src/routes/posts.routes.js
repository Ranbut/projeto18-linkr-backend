import { Router } from 'express';
import { getPost, pushPost, editPost, deletePost, getPostsUser } from '../controllers/posts.controller.js';
import getHashtag from '../middlewares/getHashtag.middleware.js';
import { postPushValidation, postPutValidation } from '../middlewares/posts.middleware.js';
import checkURL from '../middlewares/checkUrl.middleware.js';

const postsRouter = Router();

postsRouter.get("/posts", getPost);
postsRouter.get("/posts/:id", getPostsUser);
postsRouter.post("/posts", postPushValidation, checkURL(), getHashtag(), pushPost);
postsRouter.put("/posts/:id", postPutValidation, getHashtag(), editPost);
postsRouter.delete("/posts/delete/:id", deletePost);

export default postsRouter;