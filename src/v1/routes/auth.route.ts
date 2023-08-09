import { Router } from "express"
import { authController } from "~/v1/controllers/auth.controller"
import { asyncMiddleware, authMiddleware, recaptchaMiddleware } from "~/middlewares"

const authRoute = Router()

authRoute.post('/login', asyncMiddleware(authController.login))
authRoute.post('/register', asyncMiddleware(authController.register))
authRoute.post(
    '/forgot',
    recaptchaMiddleware.verify,
    asyncMiddleware(authController.forgot)
)
authRoute.get('/profile', authMiddleware.authentication, asyncMiddleware(authController.profile))
authRoute.get('/roles', authMiddleware.authentication, asyncMiddleware(authController.findRolesByUser))


export default authRoute