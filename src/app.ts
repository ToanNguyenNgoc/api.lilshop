import express from 'express'
import * as bodyParser from 'body-parser'
import dotenv from 'dotenv'
import initializeRouteV1 from '~/v1/routes'
import cookieParser from 'cookie-parser'
import cors from "cors"
import helmet, { HelmetOptions } from "helmet"
import session, { SessionOptions } from "express-session"
import passport from "passport"

dotenv.config()
class App {
  public app: express.Application
  private origin_cors = process.env.CORS_ORIGIN?.split('|') || []
  private helmet_options: HelmetOptions = {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://www.googletagmanager.com",
          "'self'",
          "https://www.google-analytics.com",
          "'unsafe-inline'",
          ...this.origin_cors,
        ],
        imgSrc: ["'self'", ...this.origin_cors],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  }
  private session_options: SessionOptions = {
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
  }
  constructor() {
    this.app = express()
    this.config()
  }
  private config(): void {
    this.app.use(cookieParser())
    this.app.use(bodyParser.json({ limit: '50mb' }))
    this.app.use(helmet(this.helmet_options));
    this.app.use(session(this.session_options))
    this.app.use(passport.initialize())
    this.app.use(passport.session())
    passport.serializeUser(function (user: any, cb) {
      cb(null, user);
    });

    passport.deserializeUser(function (obj: any, cb) {
      cb(null, obj);
    });
    this.app.use(cors({
      origin: this.origin_cors,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      preflightContinue: true,
      credentials: true
    }))
    initializeRouteV1(this.app)
  }
}

export default new App().app
