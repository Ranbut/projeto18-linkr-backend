import {Router} from 'express'
import { signUp, signIn} from '../controllers/auth.controller.js'
import { signUpSchemaValidation, signInSchemaValidation } from '../middlewares/auth.middleware.js'

const authRouter = Router()

authRouter.post("/signup", signUpSchemaValidation, signUp)
authRouter.post("/signin",signInSchemaValidation ,signIn)


export default authRouter