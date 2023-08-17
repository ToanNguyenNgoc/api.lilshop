import { Router } from "express"
import { authController } from "~/v1/controllers/auth.controller"
import { asyncMiddleware, authMiddleware, recaptchaMiddleware } from "~/middlewares"
import { oAuthController } from "../controllers"
import { OAuth2Strategy } from "passport-google-oauth"
import passport from "passport"

passport.use(new OAuth2Strategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_OAUTH_CLIENT_CALLBACK_URL_SERVER || ''
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

const authRoute = Router()

authRoute
    .post('/login', asyncMiddleware(authController.login))
    .post('/register', asyncMiddleware(authController.register))
    .post(
        '/forgot',
        recaptchaMiddleware.verify,
        asyncMiddleware(authController.forgot)
    )
    .get('/profile', authMiddleware.authentication, asyncMiddleware(authController.profile))
    .get('/roles', authMiddleware.authentication, asyncMiddleware(authController.findRolesByUser))
    .post('/refresh', asyncMiddleware(authController.refreshToken))
    .get(
        '/login/google',
        passport.authenticate('google', { scope: ['profile', 'email'] }),
        oAuthController.google
    )
    .get(
        '/redirect/google',
        passport.authenticate('google', { failureRedirect: '/error' }),
        function (req: any, res) {
            return res.send(req.user);
        }
    )

export default authRoute