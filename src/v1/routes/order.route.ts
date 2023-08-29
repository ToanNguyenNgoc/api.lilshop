import { Router } from "express"
import { orderController } from "../controllers"
import { asyncMiddleware, authMiddleware } from "~/middlewares"

const orderRoute = Router()

orderRoute
  .get(
    '/:id',
    authMiddleware.authentication,
    authMiddleware.role,
    asyncMiddleware(orderController.findById)
  )
  .get(
    '/',
    authMiddleware.authentication,
    authMiddleware.role,
    asyncMiddleware(orderController.findAll)
  )
  .post(
    '/',
    orderController.create
  )
  .put(
    '/:id',
    authMiddleware.authentication,
    authMiddleware.role,
    orderController.update
  )
  .delete(
    '/:id',
    orderController.delete
  )
export default orderRoute