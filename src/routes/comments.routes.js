import {Router} from 'express';
import { getComment, postComment } from '../controllers/comments.controller.js';
import { postCommentValidation } from '../middlewares/comments.middleware.js';

const commentRouter = Router();

commentRouter.post("/post-comment", postCommentValidation, postComment );
commentRouter.get("/get-comments/:postId", getComment);

export default commentRouter;