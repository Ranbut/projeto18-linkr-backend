import {Router} from 'express'
import {filterUsers, getByIdUserPage, GetUserByID, GetUserByToken} from '../controllers/userPage.controller.js'

const userPage = Router()

userPage.get("/user/:username", filterUsers)
userPage.get("/user/:id/post", getByIdUserPage)
userPage.post("/get-user", GetUserByToken);
userPage.get("/get-user/:id", GetUserByID);

export default userPage