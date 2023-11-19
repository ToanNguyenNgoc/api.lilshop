import { Router } from "express"
import { oauthController } from "../controllers"
import { OAuth2Strategy } from "passport-google-oauth"
import passport = require("passport");
import { asyncMiddleware } from "~/middlewares";

passport.serializeUser(function (user: any, cb) {
    cb(null, user);
});
passport.deserializeUser(function (obj: any, cb) {
    cb(null, obj);
});
passport.use(new OAuth2Strategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_OAUTH_CLIENT_CALLBACK_URL_SERVER || ''
},
    (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }
));

const oauthRoute = Router()
oauthRoute
    .get(
        '/login/google',
        passport.authenticate('google', { scope: ['profile', 'email'] }),
        oauthController.google
    )
    .get(
        '/redirect/google',
        passport.authenticate('google', { failureRedirect: '/404' }),
        asyncMiddleware(oauthController.googleRedirect)
    )
    .post(
        '/login/google/moba',
        asyncMiddleware(oauthController.loginGoogleMoba)
    )

export default oauthRoute