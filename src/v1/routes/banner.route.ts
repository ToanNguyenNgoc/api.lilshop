import { Router } from "express"
import { bannerController } from "~/v1/controllers"
import { asyncMiddleware, authMiddleware } from "~/middlewares"

const bannerRoute = Router()
bannerRoute
  .get(
    '/:id',
    asyncMiddleware(bannerController.findById)
  )
  .get(
    '/',
    asyncMiddleware(bannerController.findAll)
  )
  .post('/',
    authMiddleware.authentication,
    authMiddleware.role,
    asyncMiddleware(bannerController.create)
  )
  .put(
    '/:id',
    authMiddleware.authentication,
    authMiddleware.role,
    asyncMiddleware(bannerController.update)
  )
  .delete(
    '/:id',
    authMiddleware.authentication,
    authMiddleware.role,
    asyncMiddleware(bannerController.delete)
  )

export default bannerRoute