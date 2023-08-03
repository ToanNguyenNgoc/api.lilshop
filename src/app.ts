import express from 'express'
import * as bodyParser from 'body-parser'
import dotenv from 'dotenv'
import initializeRouteV1 from '~/v1/routes'
import cookieParser from 'cookie-parser'
import cors from "cors"
import helmet from "helmet"

dotenv.config()
class App {
  public app: express.Application
  private origin_cors = process.env.CORS_ORIGIN?.split('|') || []
  constructor() {
    this.app = express()
    this.config()
  }
  private config(): void {
    this.app.use(helmet())
    this.app.use(cors({
      origin: this.origin_cors,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      preflightContinue: true,
      credentials: true
    }))

    this.app.use(cookieParser())
    this.app.use(bodyParser.json({ limit: '50mb' }))
    initializeRouteV1(this.app)
  }
}

export default new App().app
