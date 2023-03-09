import {Router} from 'express'
import {filterUsers, getByIdUserPage} from '../controllers/userPage.controller.js'


const userPage = Router()


userPage.get("/user/:username", filterUsers)
userPage.get("/user/:id/post", getByIdUserPage)

export default userPage