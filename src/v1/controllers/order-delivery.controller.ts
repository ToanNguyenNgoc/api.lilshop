import { Request, Response } from "express"
import { ErrorException } from "~/exceptions"
import { RequestHeader } from "~/interfaces"
import { CreateOrderDeliveryDTO } from "../dto"
import { validateOrderHelper } from "~/helpers/validate-order.helper"
import { transformDataHelper, validatorHelper } from "~/helpers"
import { prismaClient } from "~/prisma-client"
import { forEach } from "lodash"
import { ORDER_DELIVERY } from "~/constants"

class OrderDeliveryController {
  async findAll(req: Request, res: Response) {
    return res.send('findAll')
  }

  async findById(req: Request, res: Response) {
    return res.send('findById')
  }

  async create(req: RequestHeader, res: Response) {
    const { params, body, user } = req
    const order_id = Number(params.id)
    if (!order_id) throw new ErrorException(404, "Resource not found")
    const order = await prismaClient.order.findFirst({
      where: { id: order_id },
      include: {
        products: true
      }
    })
    if (!order) throw new ErrorException(404, "Resource not found")
    const orderDelivery = new CreateOrderDeliveryDTO()
    orderDelivery.status_name = body.status_name
    orderDelivery.note = body.note
    await validatorHelper(orderDelivery)
    const data = await prismaClient.orderDelivery.create({
      data: {
        ...orderDelivery,
        order_id,
        created_by: user.id
      }
    })
    if (orderDelivery.status_name === ORDER_DELIVERY.SHIP.key) {
      order.products.forEach(async (product) => {
        if (product.branch_id) {
          const productOnBranch = await prismaClient.productsOnBranches.findFirst({
            where: { product_id: product.product_id, branch_id: product.branch_id }
          })
          await prismaClient.productsOnBranches.update({
            where: { branch_id_product_id: { branch_id: product.branch_id, product_id: product.product_id } },
            data: { quantity: productOnBranch ? productOnBranch?.quantity - product.quantity : undefined }
          })
        }
      })
    }
    return res.send(transformDataHelper(data))
  }

  async update(req: Request, res: Response) {
    return res.send('update')
  }

  async delete(req: Request, res: Response) {
    return res.send('delete')
  }
}
export const orderDeliveryController = new OrderDeliveryController()