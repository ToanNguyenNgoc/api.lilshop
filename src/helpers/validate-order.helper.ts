import { RequestHeader } from "~/interfaces";
import { CreateCustomerOrderDTO } from "~/v1/dto";
import { validatorHelper } from "./validator.helper";
import { prismaClient } from "~/prisma-client";
import { ErrorException } from "~/exceptions";

interface productId { product_id: number; quantity: number }

export const validateOrderHelper = async (req: RequestHeader) => {
    const { address_id, payment_method_id, product_ids } = req.body
    const body = new CreateCustomerOrderDTO
    body.address_id = address_id
    body.payment_method_id = payment_method_id
    body.product_ids = product_ids.filter((product_id: productId) => Number(product_id.quantity) && Number(product_id.quantity) > 0)
    await validatorHelper(body)
    const userAddress = await prismaClient.accountAddress.findFirst({
        where: { id: body.address_id, is_default: true }
    })
    if (!userAddress) throw new ErrorException(401, "User address does not exist")
    const paymentMethod = await prismaClient.paymentMethod.findFirst({
        where: { id: body.payment_method_id, status: true }
    })
    if (!paymentMethod) throw new ErrorException(401, "Payment method does not exist")

    return {
        body,
        paymentMethod
    }
}