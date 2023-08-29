import { Router } from "express"
import { authMiddleware } from "~/middlewares"
import { orderDeliveryController } from "../controllers"

const orderDeliveryRoute = Router()

orderDeliveryRoute
  .post(
    '/:id/deliveries',
    authMiddleware.authentication,
    authMiddleware.role,
    orderDeliveryController.create
  )

export default orderDeliveryRoute