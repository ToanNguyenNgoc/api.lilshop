import { Router } from "express"
import { customerAddressController } from "../controllers/customer-address.controller"
import { asyncMiddleware, authMiddleware } from "~/middlewares"
import { customerOrderController } from "../controllers"

const customerRoute = Router()

customerRoute
    .get(
        '/addresses/:id',
        authMiddleware.authentication,
        asyncMiddleware(customerAddressController.findById)
    )
    .get(
        '/addresses',
        authMiddleware.authentication,
        asyncMiddleware(customerAddressController.findAll)
    )
    .post(
        '/addresses',
        authMiddleware.authentication,
        asyncMiddleware(customerAddressController.create)
        // customerAddressController.create
    )
    .put(
        '/addresses/:id',
        authMiddleware.authentication,
        asyncMiddleware(customerAddressController.update)
    )
    .delete(
        '/addresses/:id',
        authMiddleware.authentication,
        asyncMiddleware(customerAddressController.delete)
    )

customerRoute
    .get(
        '/orders/:id',
        authMiddleware.authentication,
        asyncMiddleware(customerOrderController.findById)
    )
    .get(
        '/orders',
        authMiddleware.authentication,
        asyncMiddleware(customerOrderController.findAll)
    )
    .post(
        '/orders',
        authMiddleware.authentication,
        asyncMiddleware(customerOrderController.create)
        // customerOrderController.create
    )
    .delete(
        '/orders',
        customerOrderController.delete
    )

export default customerRoute