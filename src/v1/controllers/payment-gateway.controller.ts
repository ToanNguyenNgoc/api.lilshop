import { Request, Response } from "express"
import { VnPayService } from "~/services";

class PaymentGatewayController {
    async vnPayUpdateStatus(req: Request, res: Response) {
        return VnPayService.checkoutPaymentGateway(req, res)
    }
}
export const paymentGatewayController = new PaymentGatewayController()
