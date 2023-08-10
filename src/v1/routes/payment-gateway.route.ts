import { Router } from "express"
import { paymentGatewayController } from "../controllers"

const paymentGatewayRoute = Router()

paymentGatewayRoute
    .get(
        '/vnpay',
        paymentGatewayController.vnPayUpdateStatus
    )

export default paymentGatewayRoute