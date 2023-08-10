import { Router } from "express"
import { paymentMethodController } from "../controllers"
import { asyncMiddleware, authMiddleware } from "~/middlewares"

const paymentMethodRoute = Router()

paymentMethodRoute
  .get(
    '/',
    authMiddleware.authentication,
    asyncMiddleware(paymentMethodController.findAll)
  )
  .post(
    '/',
    authMiddleware.authentication,
    authMiddleware.role,
    asyncMiddleware(paymentMethodController.create)
  )
  .put(
    '/:id',
    authMiddleware.authentication,
    authMiddleware.role,
    asyncMiddleware(paymentMethodController.update)
  )

export default paymentMethodRoute