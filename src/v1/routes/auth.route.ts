import {Router} from "express"
import { authController } from "~/v1/controllers/auth.controller"

const authRoute = Router()

authRoute.post('/login', authController.login)
authRoute.post('/register', authController.register)
authRoute.get('/profile', authController.profile)

export default authRoute