import { Request, Response } from "express"
import { identity, pickBy } from "lodash"
import { ErrorException } from "~/exceptions"
import { paginationData, transformDataHelper, validatorHelper } from "~/helpers"
import { RequestHeader } from "~/interfaces"
import { prismaClient } from "~/prisma-client"
import { convertBoolean, convertFilterCategoryProduct, convertOrderByProduct, slugify } from "~/utils"
import { CreateProductDTO, UpdateProductDTO } from "~/v1/dto"

class ProductController {
  async findAll(req: Request, res: Response) {
    const page = Number(req.query.page || 1)
    const limit = Number(req.query.limit || 15)
    const search = req.query.search as any
    const includes: string[] = typeof req.query.includes === "string" ? req.query.includes.trim().split('|') : []
    const orderBy = convertOrderByProduct(req.query.sort)
    const tag_id = req.query.tag_id as any
    const branch_ids = typeof req.query.branch_ids === "string" ?
      req.query.branch_ids.split('|').map(i => Number(i)).filter(Boolean)
      : []
    const { category_names, category_ids } = convertFilterCategoryProduct(req)
    const _filter = {
      AND: [
        {
          branches: {
            some: {
              branch_id: {
                in: req.query.branch_ids ? branch_ids : undefined
              }
            }
          }
        },
        {
          OR: [
            { tag_id: Number(tag_id) || undefined },
            { tag: { name_slugify: tag_id } }
          ]
        },
        {
          OR: [
            { category_id: { in: category_ids.length > 0 ? category_ids : undefined } },
            {
              category: {
                name_slugify: {
                  in: category_names.length > 0 ? category_names : undefined
                }
              }
            }
          ]
        },
        { deleted: false },
        { status: convertBoolean(req.query.status) },
        { name: search ? { contains: search } : {} },
        {
          price: {
            gte: req.query.min_price ? Number(req.query.min_price) : undefined,
            lte: req.query.max_price ? Number(req.query.max_price) : undefined,
          }
        },
        {
          price_original: {
            gte: req.query.min_price_original ? Number(req.query.min_price_original) : undefined,
            lte: req.query.max_price_original ? Number(req.query.max_price_original) : undefined,
          }
        }
      ]
    }
    const [data, total] = await prismaClient.$transaction([
      prismaClient.product.findMany({
        where: _filter,
        include: {
          branches: {
            select: {
              branch_id: true,
              branch: { select: { name: true, short_address: true } }
            }
          },
          media: includes.includes('media') && {
            where: { status: true },
            select: { media: true }
          },
          tag: { select: { id: true, name: true, name_slugify: true } },
          category: { select: { id: true, name: true, name_slugify: true } },
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
          select: { media: true, },
        },
        tag: { select: { id: true, name: true, name_slugify: true } },
        category: { select: { id: true, name: true, name_slugify: true } },
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
    body.tag_id = Number(req.body.tag_id)
    body.category_id = Number(req.body.category_id)
    const tag = await prismaClient.tag.findFirst({ where: { id: body.tag_id, deleted: false } })
    if (!tag) throw new ErrorException(404, "Tag is not found")
    const category = await prismaClient.category.findFirst({
      where: { id: body.category_id, deleted: false, tag_id: body.tag_id }
    })
    if (!category) throw new ErrorException(404, `Category is children of ${tag.name}(id=${tag.id})`)
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
    body.tag_id = req.body.tag_id
    body.category_id = req.body.category_id
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