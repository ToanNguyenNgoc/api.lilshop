import { Request, Response } from "express"
import { ErrorException } from "~/exceptions"
import { paginationData, transformDataHelper, validatorHelper } from "~/helpers"
import { prismaClient } from "~/prisma-client"
import { UpdateOrderDTO } from "../dto"
import { ORDER_DELIVERY } from "~/constants"
import { RequestHeader } from "~/interfaces"
import { omit } from "lodash"

class OrderController {
  async findAll(req: Request, res: Response) {
    const { page, limit } = req.query
    const search = req.query.search as any
    const includes = typeof req.query.includes === 'string' ? req.query.includes.split('|') : []
    const p = Number(page || 1)
    const l = Number(limit || 15)
    const [data, total] = await prismaClient.$transaction([
      prismaClient.order.findMany({
        include: {
          account: {
            select: { avatar: true, id: true, email: true, telephone: true, fullname: true }
          },
          payment_method: true,
          payment_gateway: true,
          delivery_address: includes.includes('delivery_address') && {
            include: {
              province: { select: { name: true } },
              district: { select: { name: true } },
              ward: { select: { name: true } },
            }
          },
          order_deliveries: includes.includes("order_deliveries") && {
            orderBy: { created_at: 'desc' },
            take: 1
          },
        },
        skip: ((p * l) - l),
        take: l,
        orderBy: { created_at: 'desc' }
      }),
      prismaClient.order.count({})
    ])
    return res.send(transformDataHelper(paginationData(data, total, p, l)))
  }

  async findById(req: Request, res: Response) {
    const id = Number(req.params.id)
    if (!id) throw new ErrorException(404, "Resource not found")
    const data = await prismaClient.order.findFirst({
      where: { id: id },
      include: {
        account: {
          select: { avatar: true, id: true, email: true, telephone: true, fullname: true }
        },
        payment_method: true,
        payment_gateway: true,
        delivery_address: {
          include: {
            province: { select: { name: true } },
            district: { select: { name: true } },
            ward: { select: { name: true } },
          }
        },
        order_deliveries: {
          orderBy: { created_at: 'desc' }
        },
      },
    })
    if (!data) throw new ErrorException(404, "Resource not found")
    return res.send(transformDataHelper(data))
  }

  async create(req: Request, res: Response) {
    return res.send('create')
  }

  async update(req: RequestHeader, res: Response) {
    const id = Number(req.params.id)
    const { body, user } = req
    if (!id) throw new ErrorException(404, "Resource not found")
    const updateOrder = new UpdateOrderDTO()
    updateOrder.note = body.note
    updateOrder.confirm = body.confirm
    updateOrder.products = body.product_ids
    await validatorHelper(updateOrder)
    const order = await prismaClient.order.findFirst({
      where: { id: id },
      include: {
        payment_method: true
      }
    })
    if (!order) throw new ErrorException(404, "Resource not found")
    const response = await prismaClient.order.update({
      where: { id: id },
      data: {
        ...omit(updateOrder, ['products']),
        confirm: !order.confirm ? updateOrder.confirm : undefined,
        products: {
          update: updateOrder.products.map(item => ({
            data: {
              branch_id: item.branch_id
            },
            where: { id: item.id }
          }))
        }
      },
      include: {
        products: true
      }
    })
    //[UPDATE] order delivery when employ confirm with customer
    if (!order.confirm) {
      await prismaClient.orderDelivery.create({
        data: {
          order_id: id,
          status_name: ORDER_DELIVERY.CONF.key,
          note: ORDER_DELIVERY.CONF.txt,
          created_by: user.id
        }
      })
    }
    return res.send(transformDataHelper(response))
  }

  async delete(req: Request, res: Response) {
    return res.send('delete')
  }
}
export const orderController = new OrderController()
