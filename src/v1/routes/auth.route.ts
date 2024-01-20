import { Router } from "express"
import { authController } from "~/v1/controllers/auth.controller"
import { asyncMiddleware, authMiddleware, recaptchaMiddleware } from "~/middlewares"

const authRoute = Router()

authRoute
    .post('/login', asyncMiddleware(authController.login))
    .post('/register', recaptchaMiddleware.verify, asyncMiddleware(authController.register))
    .post('/forgot', recaptchaMiddleware.verify, asyncMiddleware(authController.forgot))
    .post('/forgot-moba', recaptchaMiddleware.verify,asyncMiddleware(authController.forgotMoba))
    .get('/profile', authMiddleware.authentication, asyncMiddleware(authController.profile))
    .put('/edit-profile', authMiddleware.authentication, asyncMiddleware(authController.putProfile))
    .get('/roles', authMiddleware.authentication, asyncMiddleware(authController.findRolesByUser))
    .post('/refresh', asyncMiddleware(authController.refreshToken))
    .get('/verify', asyncMiddleware(authController.verify))
    .post('/logout', authController.logout)

export default authRoute