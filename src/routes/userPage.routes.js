import {Router} from 'express'
import {filterUsers, getByIdUserPage, GetUserByID, GetUserByToken} from '../controllers/userPage.controller.js'
import { tokenValidation } from '../middlewares/token.middleware.js';

const userPage = Router()

userPage.get("/user/:username", tokenValidation, filterUsers)
userPage.get("/user/:id/post", getByIdUserPage)
userPage.post("/get-user", GetUserByToken);
userPage.get("/get-user/:id", GetUserByID);

export default userPage