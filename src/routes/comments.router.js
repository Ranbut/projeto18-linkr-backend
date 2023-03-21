import {Router} from 'express';
import { getComment, postComment } from '../controllers/comments.controller';
import { postCommentValidation } from '../middlewares/comments.middleware';

const commentRouter = Router();

commentRouter.post("/post-comment",postCommentValidation ,postComment );
commentRouter.get("/get-comments/:postId", getComment);

export default commentRouter;