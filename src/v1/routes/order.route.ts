import { Router } from "express"
import { orderController } from "../controllers"

const orderRoute = Router()

orderRoute
  .get(
    '/:id',
    orderController.findById
  )
  .get(
    '/',
    orderController.findAll
  )
  .post(
    '/',
    orderController.create
  )
  .put(
    '/:id',
    orderController.update
  )
  .delete(
    '/:id',
    orderController.delete
  )
export default orderRoute