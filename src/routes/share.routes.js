import { Router } from 'express';
import { getShareList, sharePost } from '../controllers/share.controller.js';
import { authValidation } from '../middlewares/generics.middleware.js';

const shareRouter = Router();

shareRouter.get("/share/:id", authValidation, getShareList);
shareRouter.post("/share/:id", authValidation, sharePost);

export default shareRouter;