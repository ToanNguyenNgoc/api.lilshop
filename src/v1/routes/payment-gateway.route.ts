import { Router } from "express"
import { paymentGatewayController } from "../controllers"

const paymentGatewayRoute = Router()

paymentGatewayRoute
    .get(
        '/vnpay',
        paymentGatewayController.vnPayUpdateStatus
    )
    .get('/notify', paymentGatewayController.notifyVnPay)
    .post('/notify', paymentGatewayController.notifyVnPay)

export default paymentGatewayRoute