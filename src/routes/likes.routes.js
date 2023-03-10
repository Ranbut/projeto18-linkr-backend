import { Router } from 'express';
import { likePost, likePostList } from '../controllers/likes.controller.js';
import { authValidation, idSanit } from '../middlewares/generics.middleware.js';

const likeRoutes = Router();

likeRoutes.post("/like/:id", idSanit, authValidation, likePost);
likeRoutes.get("/like/list/:id", idSanit, likePostList);

export default likeRoutes;