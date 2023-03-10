import { Router } from 'express';
import { likeCount, likePost, likePostList } from '../controllers/likes.controller.js';
import { authValidation, idSanit } from '../middlewares/generics.middleware.js';
import { likeListValidation } from '../middlewares/likes.middleware.js';

const likeRoutes = Router();

likeRoutes.post("/like/:id", idSanit, authValidation, likePost);
likeRoutes.post("/like/list/:id", idSanit, likeListValidation, likePostList);
likeRoutes.get("/like/count/:id", idSanit, likeCount);

export default likeRoutes;