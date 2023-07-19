import { Router } from "express"
import { bannerController } from "~/v1/controllers"
import { authMiddleware } from "~/middlewares"

const bannerRoute = Router()
bannerRoute.post('/',
  authMiddleware.authentication,
  authMiddleware.role,
  bannerController.create
)

export default bannerRoute