import { Request, Response } from "express"
import { paginationData, transformDataHelper } from "~/helpers"
import { prismaClient } from "~/prisma-client"

class OrderController {
  async findAll(req: Request, res: Response) {
    const { page, limit } = req.query
    const search = req.query.search as any
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
          order_deliveries: {
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
    return res.send('findById')
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
