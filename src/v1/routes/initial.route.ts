import { Router } from "express"
import { initialController } from "~/v1/controllers"
import { asyncMiddleware } from "~/middlewares"

const initialRoute = Router()
initialRoute.post('/account', asyncMiddleware(initialController.createAccount))
export default initialRoute