import { Router } from 'express';
import {
    getPost, pushPost, editPost,
    deletePost, getPostsUser, getRecentPosts,
    getOldPosts, getOldPostsUser, getOldPostsHashtag
} from '../controllers/posts.controller.js';
import getHashtag from '../middlewares/getHashtag.middleware.js';
import { postPushValidation, postPutValidation } from '../middlewares/posts.middleware.js';
import checkURL from '../middlewares/checkUrl.middleware.js';
import { authValidation } from '../middlewares/generics.middleware.js';

const postsRouter = Router();

postsRouter.get("/posts", authValidation, getPost);
postsRouter.get("/posts/recents/:date", authValidation, getRecentPosts);
postsRouter.get("/posts/old/:date", authValidation, getOldPosts);
postsRouter.get("/posts/:id", getPostsUser);
postsRouter.get("/posts/:id/old/:date", getOldPostsUser);
postsRouter.get("/posts/:hashtag/old/hashtag/:date", getOldPostsHashtag);
postsRouter.post("/posts", postPushValidation, checkURL(), getHashtag(), pushPost);
postsRouter.put("/posts/:id", postPutValidation, getHashtag(), editPost);
postsRouter.delete("/posts/delete/:id", deletePost);

export default postsRouter;