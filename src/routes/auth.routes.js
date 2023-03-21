import {Router} from 'express';
import { signUp, signIn, logOut, persistSession} from '../controllers/auth.controller.js';
import { signUpSchemaValidation, signInSchemaValidation } from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post("/sign-up", signUpSchemaValidation, signUp);
authRouter.post("/sign-in",signInSchemaValidation, signIn);
authRouter.get("/persist", persistSession);
authRouter.delete("/logout", logOut);

export default authRouter;