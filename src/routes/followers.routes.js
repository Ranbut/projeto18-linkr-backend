import {Router} from 'express';
 import followController from '../controllers/follow.controller.js';
 import { tokenValidation } from '../middlewares/token.middleware.js';

const followRouter = Router();

followRouter.post("/follow/:followId",tokenValidation, followController.toggleFollow);
followRouter.get("/followers", tokenValidation, followController.getFollowById);
export default followRouter;
