import {Router} from 'express'
import {filterUsers, getByIdUserPage, GetUserByToken} from '../controllers/userPage.controller.js'

const userPage = Router()

userPage.get("/user/:username", filterUsers)
userPage.get("/user/:id/post", getByIdUserPage)
userPage.post("/get-user", GetUserByToken);

export default userPage