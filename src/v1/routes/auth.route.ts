import { Router } from "express"
import { authController } from "~/v1/controllers/auth.controller"
import { asyncMiddleware, authMiddleware, recaptchaMiddleware } from "~/middlewares"

const authRoute = Router()

authRoute
    .post('/login', asyncMiddleware(authController.login))
    .post('/register', asyncMiddleware(authController.register))
    .post('/forgot', recaptchaMiddleware.verify, asyncMiddleware(authController.forgot))
    .get('/profile', authMiddleware.authentication, asyncMiddleware(authController.profile))
    .get('/roles', authMiddleware.authentication, asyncMiddleware(authController.findRolesByUser))
    .post('/refresh', asyncMiddleware(authController.refreshToken))

export default authRoute