import { Router } from "express"
import { asyncMiddleware, authMiddleware } from "~/middlewares"
import { productSizeController } from "~/v1/controllers"

const productSizeRoute = Router()

productSizeRoute.get(
  "/:id/sizes",
  asyncMiddleware(productSizeController.findAll)
)

productSizeRoute.post(
  '/:id/sizes',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(productSizeController.create)
)

productSizeRoute.put(
  '/:id/sizes/:child_id',
  authMiddleware.authentication,
  authMiddleware.role,
  productSizeController.update
)

productSizeRoute.delete(
  '/:id/sizes/:child_id',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(productSizeController.delete)
)

export default productSizeRoute