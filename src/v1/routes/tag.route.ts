import { Router } from "express"
import { asyncMiddleware, authMiddleware } from "~/middlewares"
import { tagController } from "~/v1/controllers"

const tagRoute = Router()

tagRoute.get(
  '/:id',
  asyncMiddleware(tagController.findById)
)

tagRoute.get(
  '/',
  asyncMiddleware(tagController.findAll)
)

tagRoute.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(tagController.create)
)

tagRoute.put(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(tagController.update)
)

tagRoute.delete(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(tagController.delete)
)

export default tagRoute