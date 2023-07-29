import { Request, Response } from "express"
import { identity, pickBy } from "lodash"
import { ErrorException } from "~/exceptions"
import { paginationData, transformDataHelper, validatorHelper } from "~/helpers"
import { RequestHeader } from "~/interfaces"
import { prismaClient } from "~/prisma-client"
import { convertBoolean, convertOrderByProduct, slugify } from "~/utils"
import { CreateProductDTO, UpdateProductDTO } from "~/v1/dto"

class ProductController {
  async findAll(req: Request, res: Response) {
    const page = Number(req.query.page || 1)
    const limit = Number(req.query.limit || 15)
    const search = req.query.search as any
    const includes: string[] = typeof req.query.includes === "string" ? req.query.includes.trim().split('|') : []
    const orderBy = convertOrderByProduct(req.query.sort)
    const _filter = {
      deleted: false,
      status: convertBoolean(req.query.status),
      name: search ? { contains: search } : {},
      price: {
        gte: req.query.min_price ? Number(req.query.min_price) : undefined,
        lte: req.query.max_price ? Number(req.query.max_price) : undefined,
      },
      price_original: {
        gte: req.query.min_price_original ? Number(req.query.min_price_original) : undefined,
        lte: req.query.max_price_original ? Number(req.query.max_price_original) : undefined,
      }
    }
    const [data, total] = await prismaClient.$transaction([
      prismaClient.product.findMany({
        where: _filter,
        include: {
          media: includes.includes('media') && {
            where: { status: true },
            select: { media: true }
          },
          account: includes.includes('created_by') && { select: { id: true, fullname: true } }
        },
        orderBy: orderBy,
        skip: ((page * limit) - limit),
        take: limit
      }),
      prismaClient.product.count({ where: _filter })
    ])
    return res.send(transformDataHelper(paginationData(data, total, page, limit)))
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params
    const includes = typeof req.query.includes === 'string' ? req.query.includes.split('|') : []
    const response = await prismaClient.product.findFirst({
      where: {
        OR: [
          { id: Number(id) || undefined },
          { name_slugify: id }
        ],
        AND: { deleted: false },
      },
      include: {
        media: {
          where: { status: true },
          select: { media: true }
        },
        account: includes.includes('created_by') && { select: { id: true, fullname: true } }
      }
    })
    if (!response) throw new ErrorException(404, "Resource not found")
    return res.send(transformDataHelper(response))
  }

  async create(req: RequestHeader, res: Response) {
    const { user } = req
    const body = new CreateProductDTO()
    body.name = req.body.name
    body.name_slugify = slugify(req.body.name)
    body.price_original = req.body.price_original
    body.price = req.body.price
    body.price_special = req.body.price_special || req.body.price
    body.short_content = req.body.short_content
    await validatorHelper(body)
    const response = await prismaClient.product.create({
      data: {
        ...body,
        created_by_id: user.id,
      }
    })
    return res.send(transformDataHelper(response))
  }

  async update(req: Request, res: Response) {
    if (!Number(req.params.id)) throw new ErrorException(404, "Resource not found")
    const response = await prismaClient.product.findFirst({
      where: { id: Number(req.params.id), deleted: false }
    })
    const product_id = Number(req.params.id)
    if (!response) throw new ErrorException(404, "Resource not found")
    const body = new UpdateProductDTO()
    body.name = req.body.name
    body.price = req.body.price
    body.price_original = req.body.price_original
    body.price_special = req.body.price_special || req.body.price
    body.short_content = req.body.short_content
    await validatorHelper(pickBy(body, identity))
    const result = await prismaClient.product.update({
      where: { id: product_id },
      data: {
        ...body,
        status: req.body.status
      }
    })
    return res.send(transformDataHelper(result))
  }

  async delete(req: Request, res: Response) {
    return res.send('delete')
  }
}

export const productController = new ProductController()