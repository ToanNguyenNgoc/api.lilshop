import { Router } from "express"
import { asyncMiddleware, authMiddleware } from "~/middlewares"
import { productController } from "~/v1/controllers"

const productRoute = Router()

productRoute.get(
  '/:id',
  asyncMiddleware(productController.findById)
)

productRoute.get(
  '/',
  asyncMiddleware(productController.findAll)
)

productRoute.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(productController.create)
)

productRoute.put(
  '/:id',
  productController.update
)
productRoute.delete(
  '/:id',
  productController.delete
)

export default productRoute