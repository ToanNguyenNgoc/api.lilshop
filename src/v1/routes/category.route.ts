import { Router } from "express"
import { asyncMiddleware, authMiddleware } from "~/middlewares"
import { categoryController } from "~/v1/controllers"

const categoryRoute = Router()

categoryRoute.get(
  '/:id',
  asyncMiddleware(categoryController.findById)
)

categoryRoute.get(
  '/',
  asyncMiddleware(categoryController.findAll)
)

categoryRoute.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(categoryController.create)
)

categoryRoute.put(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(categoryController.update)
)

categoryRoute.delete(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(categoryController.delete)
)

export default categoryRoute