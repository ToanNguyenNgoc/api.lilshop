import express from 'express'
import * as bodyParser from 'body-parser'
import dotenv from 'dotenv'
import initializeRouteV1 from '~/v1/routes'

dotenv.config()
class App {
  public app: express.Application
  constructor() {
    this.app = express()
    this.config()
  }
  private config(): void {
    this.app.use(bodyParser.urlencoded({ extended: false }))
    initializeRouteV1(this.app)
    
  }
}

export default new App().app
