import { Request, Response } from "express"
import { VnPayService } from "~/services";

class PaymentGatewayController {
    async vnPayUpdateStatus(req: Request, res: Response) {
        return VnPayService.checkoutPaymentGateway(req, res)
    }
    async notifyVnPay(req: Request, res: Response) {
        console.log('...PARAM', req.params)
        console.log('...BODY', req.body);
        return res.send('delete')
    }
}
export const paymentGatewayController = new PaymentGatewayController()
