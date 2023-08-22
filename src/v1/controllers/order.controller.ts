import { Request, Response } from "express"
import { ErrorException } from "~/exceptions"
import { paginationData, transformDataHelper } from "~/helpers"
import { prismaClient } from "~/prisma-client"

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

  async update(req: Request, res: Response) {
    return res.send('update')
  }

  async delete(req: Request, res: Response) {
    return res.send('delete')
  }
}
export const orderController = new OrderController()
