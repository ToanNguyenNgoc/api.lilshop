import { Router } from "express"
import { customerAddressController } from "../controllers/customer-address.controller"
import { asyncMiddleware, authMiddleware } from "~/middlewares"

const customerRoute = Router()

customerRoute.get(
    '/addresses/:id',
    authMiddleware.authentication,
    asyncMiddleware(customerAddressController.findById)
)
customerRoute.get(
    '/addresses',
    authMiddleware.authentication,
    asyncMiddleware(customerAddressController.findAll)
)
customerRoute.post(
    '/addresses',
    authMiddleware.authentication,
    asyncMiddleware(customerAddressController.create)
)
customerRoute.put(
    '/addresses/:id',
    authMiddleware.authentication,
    asyncMiddleware(customerAddressController.update)
)
customerRoute.delete(
    '/addresses/:id',
    authMiddleware.authentication,
    asyncMiddleware(customerAddressController.delete)
)
export default customerRoute