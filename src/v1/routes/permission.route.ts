import {Router} from "express"
import { permissionController } from "~/v1/controllers"
import { asyncMiddleware, authMiddleware } from "~/middlewares"

const route = Router()
route.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(permissionController.create)
)
route.get(
  '/',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(permissionController.findAll)
)
export default route