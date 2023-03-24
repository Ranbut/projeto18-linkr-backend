import { Router } from 'express';
import { getShareList, sharePost, getUserName } from '../controllers/share.controller.js';
import { authValidation } from '../middlewares/generics.middleware.js';

const shareRouter = Router();

shareRouter.get("/share/:id", authValidation, getShareList);
shareRouter.get("/share/username/:userId", getUserName);
shareRouter.post("/share/:id", authValidation, sharePost);

export default shareRouter;