import { Request, Response } from "express"
import { ORDER_DELIVERY } from "~/constants"
import { ErrorException } from "~/exceptions"
import { paginationData, transformDataHelper } from "~/helpers"
import { validateOrderHelper } from "~/helpers/validate-order.helper"
import { RequestHeader } from "~/interfaces"
import { prismaClient } from "~/prisma-client"
import { OrderService, SendmailService, VnPayService } from "~/services"


class CustomerOrderController {
  async findAll(req: RequestHeader, res: Response) {
    const { user, query } = req
    const page = Number(query.page || 1)
    const limit = Number(query.limit || 15)
    const includes: string[] = typeof query.includes === "string" ? query.includes.trim().split('|') : []
    const [data, total] = await prismaClient.$transaction([
      prismaClient.order.findMany({
        where: {
          account_id: user.id,
          deleted: false
        },
        include: {
          products: {
            include: {
              product: includes.includes('products'),
              product_size: includes.includes('products_size')
            }
          },
          delivery_address: includes.includes('delivery_address') && {
            select: {
              id: true,
              short_address: true,
              is_default: true,
              delete: true,
              province: { select: { name: true } },
              district: { select: { name: true } },
              ward: { select: { name: true } },
            }
          },
          payment_gateway: true,
          payment_method: true
        },
        skip: ((page * limit) - limit),
        take: limit,
        orderBy: { created_at: 'desc' }
      }),
      prismaClient.order.count({
        where: {
          account_id: user.id
        }
      })
    ])
    return res.send(transformDataHelper(paginationData(data, total, page, limit)))
  }

  async findById(req: RequestHeader, res: Response) {
    const { user, params } = req
    const response = await prismaClient.order.findFirst({
      where: {
        account_id: user.id,
        OR: [
          { id: Number(params.id) ? Number(params.id) : undefined },
          {
            payment_gateway: {
              transaction_txn: params.id
            }
          }
        ],
      },
      include: {
        products: {
          include: {
            product: true,
            product_size: true
          }
        },
        payment_method: true,
        payment_gateway: true,
        delivery_address: {
          select: {
            id: true,
            short_address: true,
            is_default: true,
            delete: true,
            province: { select: { name: true } },
            district: { select: { name: true } },
            ward: { select: { name: true } },
          }
        },
        order_deliveries: true
      }
    })
    if (!response) throw new ErrorException(404, "Resource not found")
    return res.send(transformDataHelper(response))
  }

  async create(req: RequestHeader, res: Response) {
    const { body, paymentMethod } = await validateOrderHelper(req)
    const productables = await prismaClient.product.findMany({
      where: {
        id: { in: body.product_ids.map((i: any) => i.product_id) },
        deleted: false,
        status: true
      },
    })
    const products = productables.map(productable => {
      const productItem = body.product_ids.find(product_id => product_id.product_id === productable.id)
      const quantity = productItem?.quantity || 1
      const product_size_id = productItem?.product_size_id || 1
      return {
        ...productable,
        quantity: quantity,
        product_size_id: product_size_id,
        price_order: productable.price_special < productable.price ?
          quantity * productable.price_special
          :
          quantity * productable.price
      }
    })
    const amount = products.reduce((total, product) => total + product.price_order, 0);
    const response = await prismaClient.order.create({
      data: {
        account_id: req.user?.id,
        amount,
        order_original: 'CLIENT',
        payment_method_id: body.payment_method_id,
        address_id: body.address_id,
        products: {
          createMany: {
            data: products.map(product => ({
              product_id: product.id,
              quantity: product.quantity,
              product_size_id: product.product_size_id,
              price_order: product.price_order
            }))
          }
        },
        order_deliveries: {
          create: {
            status_name: ORDER_DELIVERY.INIT.key,
            note: ORDER_DELIVERY.INIT.txt
          }
        }
      },
      include: {
        products: {
          select: { id: true, quantity: true, product: true, price_order: true, product_size: { select: { id: true, name: true } } }
        },
        payment_method: true,
        account: {
          select: {
            id: true,
            email: true,
            telephone: true,
            fullname: true
          }
        },
        delivery_address: {
          select: {
            id: true,
            consignee_s_name: true,
            consignee_s_telephone: true,
            short_address: true,
            is_default: true,
            delete: true,
            province: { select: { name: true } },
            district: { select: { name: true } },
            ward: { select: { name: true } },
          }
        },
      }
    })
    let payment_gateway
    if (paymentMethod.method_key === "VNPAY" && paymentMethod.child_key) {
      const responseGateway = await VnPayService.createPaymentGateway(
        response.id, amount,
        paymentMethod.child_key,
        `Thanh toán cho sản phẩm: ${productables.map(i => i.name).join(',')}`
      )
      payment_gateway = responseGateway
    }
    const order = { ...response, payment_gateway: payment_gateway }
    if (paymentMethod.method_key === "COD") {
      await OrderService.methodCode(response.id, amount, `${productables.map(i => i.name).join(',')}`)
      await new SendmailService().sendBillOrder(order)
    }
    return res.send(transformDataHelper(order))
  }

  async update(req: Request, res: Response) {
    return res.send('update')
  }

  async delete(req: Request, res: Response) {
    return res.send('delete')
  }
}
export const customerOrderController = new CustomerOrderController()