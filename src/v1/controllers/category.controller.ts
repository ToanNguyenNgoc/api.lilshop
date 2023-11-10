import { Request, Response } from "express"
import { ErrorException } from "~/exceptions"
import { paginationData, transformDataHelper, validatorHelper } from "~/helpers"
import { prismaClient } from "~/prisma-client"
import { convertBoolean, convertOrderByProduct, slugify } from "~/utils"
import { CreateCategoryDTO, UpdateCategoryDTO } from "~/v1/dto"

class CategoryController {
  async findAll(req: Request, res: Response) {
    const page = Number(req.query.page || 1)
    const limit = Number(req.query.limit || 15)
    const tag_id = req.query.tag_id as any
    const orderBy = convertOrderByProduct(req.query.sort)
    const search = req.query.search as any
    const filter = {
      AND: [
        {
          OR: [
            { tag_id: Number(tag_id) || undefined },
            { tag: { name_slugify: tag_id } }
          ]
        },
        { name: search ? { contains: search } : {} },
        { deleted: false },
        { status: convertBoolean(req.query.status) },
      ],
    }
    const [data, total] = await prismaClient.$transaction([
      prismaClient.category.findMany({
        include: { tag: { select: { id: true, name: true, name_slugify: true } } },
        where: filter,
        orderBy: orderBy,
        skip: ((page * limit) - limit),
        take: limit
      }),
      prismaClient.category.count({ where: filter })
    ])
    return res.send(transformDataHelper(paginationData(data, total, page, limit)))
  }

  async findById(req: Request, res: Response) {
    const id = req.params.id
    const response = await prismaClient.category.findFirst({
      where: {
        OR: [
          { id: Number(id) || undefined },
          { name_slugify: id }
        ],
        AND: { deleted: false },
      },
      include: { tag: { select: { id: true, name: true, name_slugify: true } } }
    })
    if (!response) throw new ErrorException(404, "Resource not found")
    return res.send(transformDataHelper(response))
  }

  async create(req: Request, res: Response) {
    const tag_id = Number(req.body.tag_id)
    if (!tag_id) throw new ErrorException(404, "Tag not found")
    const tag = await prismaClient.tag.findFirst({
      where: { id: tag_id, deleted: false }
    })
    if (!tag) throw new ErrorException(404, "Tag not found")
    const body = new CreateCategoryDTO()
    body.name = req.body.name
    body.name_slugify = slugify(req.body.name)
    body.tag_id = tag.id
    body.image_url = req.body.image_url
    await validatorHelper(body)
    const response = await prismaClient.category.create({
      data: body
    })
    return res.send(transformDataHelper(response))
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id)
    if (!id) throw new ErrorException(404, "Resource not found")
    const body = new UpdateCategoryDTO()
    body.name = req.body.name
    body.name_slugify = slugify(req.body.name)
    body.tag_id =  Number(req.body.tag_id)
    body.status = req.body.status
    body.image_url = req.body.image_url
    const response = await prismaClient.category.update({
      where: { id: id },
      data: body
    })
    return res.send(transformDataHelper(response))
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id)
    if (!id) throw new ErrorException(404, "Resource not found")
    await prismaClient.category.update({
      where: { id: id },
      data: {
        deleted: true
      }
    })
    return res.send(transformDataHelper({ message: "Delete success" }))
  }
}
export const categoryController = new CategoryController()