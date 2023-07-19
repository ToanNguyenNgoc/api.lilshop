import { Router } from "express"
import { authController } from "~/v1/controllers/auth.controller"
import { asyncMiddleware, authMiddleware } from "~/middlewares"

const authRoute = Router()

authRoute.post('/login', asyncMiddleware(authController.login))
authRoute.post('/register', asyncMiddleware(authController.register))
authRoute.get('/profile', authMiddleware.authentication, asyncMiddleware(authController.profile))
authRoute.get('/roles', authMiddleware.authentication, asyncMiddleware(authController.findRolesByUser))


export default authRoute