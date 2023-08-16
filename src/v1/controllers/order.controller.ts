import { Client } from "@elastic/elasticsearch"
import { Request, Response } from "express"
import { elasticClient } from "~/configs"
import { paginationData, transformDataHelper } from "~/helpers"
import { prismaClient } from "~/prisma-client"
import { convertBoolean } from "~/utils"

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
    const keyword = req.query.keyword as any
    const status = req.query.status as any
    const response = await elasticClient.search({
      index: 'tweets',
      body: {
        query: {
          bool: {
            must: [
              {
                range: {
                  price: {
                    gte: 1000,
                    lte: 3000
                  }
                }
              },
              keyword && {
                match_phrase_prefix: {
                  user: keyword
                }
              },
              status !== undefined && {
                match: {
                  status: convertBoolean(status)
                }
              }
            ].filter(Boolean)
          }
        }
      }
    })
    return res.send(response.hits.hits.map(i => i._source))
  }

  async create(req: Request, res: Response) {
    await elasticClient.indices.create({
      index: 'doc_test',
      body: {
        mappings: {
          properties: {
            id: { type: 'integer' },
            text: { type: 'text' },
            user: {
              search_analyzer: 'analyzer_startswith',
              search_quote_analyzer: 'analyzer_startswith',
              type: 'text'
            },
            status: { type: 'boolean', null_value: true },
            price: { type: 'integer' },
            time: { type: 'date' }
          }
        }
      }
    }, { ignore: [400] })
    const dataset = [{
      id: 1,
      text: 'If I fall, don\'t bring me back.',
      user: 'Nguyen Ngoc Toan',
      date: new Date(),
      status: true,
      price: 1000
    }, {
      id: 2,
      text: 'Winter is coming',
      user: 'Toan',
      date: new Date(),
      status: true,
      price: 2000
    }, {
      id: 3,
      text: 'A Lannister always pays his debts.',
      user: 'Toan',
      date: new Date(),
      status: true,
      price: 3000
    }, {
      id: 4,
      text: 'I am the blood of the dragon.',
      user: 'Do Cao Long',
      date: new Date(),
      status: false,
      price: 4000
    }, {
      id: 5,
      text: 'A girl is Arya Stark of Winterfell. And I\'m going home.',
      user: 'Do Cao Long',
      date: new Date(),
      status: false,
      price: 5000
    }]
    const body = dataset.flatMap(doc => [{ index: { _index: 'tweets' } }, doc])
    const response = await elasticClient.bulk({ refresh: true, body })

    return res.send(response)
  }

  async update(req: Request, res: Response) {
    return res.send('update')
  }

  async delete(req: Request, res: Response) {
    return res.send('delete')
  }
}
export const orderController = new OrderController()
