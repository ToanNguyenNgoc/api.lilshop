import express from 'express'
import * as bodyParser from 'body-parser'
import dotenv from 'dotenv'
import initializeRouteV1 from '~/v1/routes'
import cookieParser from 'cookie-parser'
import cors from "cors"
import helmet from "helmet"
import session from "express-session"
import passport from "passport"
import { cors_options, helmet_options, session_options } from './configs'

dotenv.config()
class App {
  public app: express.Application
  constructor() {
    this.app = express()
    this.config()
  }
  private config(): void {
    this.app.use(cors(cors_options))
    this.app.use(cookieParser())
    this.app.use(bodyParser.json({ limit: '50mb' }))
    this.app.use(helmet(helmet_options));
    this.app.use(session(session_options))
    this.app.use(passport.initialize())
    this.app.use(passport.session())
    initializeRouteV1(this.app)
  }
}

export default new App().app
