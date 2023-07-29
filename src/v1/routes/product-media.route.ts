import { Router } from "express"
import { productMediaController } from "~/v1/controllers"
import { asyncMiddleware, authMiddleware } from "~/middlewares"

const productMediaRoute = Router({ mergeParams: true })
productMediaRoute.get(
  '/:id/medias',
  asyncMiddleware(productMediaController.findAll)
)

productMediaRoute.post(
  '/:id/medias',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(productMediaController.create)
)


productMediaRoute.delete(
  '/:id/medias',
  authMiddleware.authentication,
  authMiddleware.role,
  asyncMiddleware(productMediaController.delete)
)

export default productMediaRoute