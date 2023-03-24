import { Router } from 'express';
import { getShareList, sharePost } from '../controllers/share.controller.js';

const shareRouter = Router();

shareRouter.get("/share", getShareList)
shareRouter.post("/share", sharePost);

export default shareRouter;