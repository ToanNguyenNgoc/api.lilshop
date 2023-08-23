import { Request, Response } from "express"
import { ErrorException } from "~/exceptions"
import { paginationData, transformDataHelper, validatorHelper } from "~/helpers"
import { prismaClient } from "~/prisma-client"
import { convertBoolean, convertOrderByProduct, slugify } from "~/utils"
import { CreateTagDTO, UpdateTagDTO } from "~/v1/dto/tag.dto"

class TagController {
  async findAll(req: Request, res: Response) {
    const page = Number(req.query.page || 1)
    const limit = Number(req.query.limit || 15)
    const orderBy = convertOrderByProduct(req.query.sort)
    const search = req.query.search as any
    const includes: string[] = typeof req.query.includes === "string" ? req.query.includes.trim().split('|') : []
    const _filter = {
      deleted: false,
      status: convertBoolean(req.query.status),
      type: req.query.type ? String(req.query.type) : undefined,
      name: search ? { contains: search } : {}
    }
    const [data, total] = await prismaClient.$transaction([
      prismaClient.tag.findMany({
        where: _filter,
        include: { categories: includes.includes('categories') },
        orderBy: orderBy,
        skip: ((page * limit) - limit),
        take: limit
      }),
      prismaClient.tag.count({ where: _filter })
    ])
    return res.send(transformDataHelper(paginationData(data, total, page, limit)))
  }

  async findById(req: Request, res: Response) {
    const id = req.params.id
    const response = await prismaClient.tag.findFirst({
      where: {
        OR: [
          { id: Number(id) || undefined },
          { name_slugify: id }
        ],
        AND: { deleted: false },
      }
    })
    if (!response) throw new ErrorException(404, "Resource not found")
    return res.send(transformDataHelper(response))
  }

  async create(req: Request, res: Response) {
    const body = new CreateTagDTO()
    body.name = req.body.name
    body.type = req.body.type
    body.name_slugify = slugify(req.body.name)
    await validatorHelper(body)
    const response = await prismaClient.tag.create({
      data: body
    })
    return res.send(transformDataHelper(response))
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id)
    if (!id) throw new ErrorException(404, "Resource not found")
    const tag = await prismaClient.tag.findFirst({
      where: { id: id, deleted: false }
    })
    if (!tag) throw new ErrorException(404, "Resource not found")
    const body = new UpdateTagDTO()
    body.name = req.body.name
    body.name_slugify = req.body.name ? slugify(req.body.name) : undefined
    body.status = req.body.status
    body.type = req.body.type
    await validatorHelper(body)
    const response = await prismaClient.tag.update({
      where: { id: id },
      data: body
    })
    return res.send(transformDataHelper(response))
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id)
    if (!id) throw new ErrorException(404, "Resource not found")
    const tag = await prismaClient.tag.findFirst({
      where: { id: id, deleted: false }
    })
    if (!tag) throw new ErrorException(404, "Resource not found")
    await prismaClient.tag.update({
      where: { id: id },
      data: { deleted: true }
    })
    return res.send(transformDataHelper({ message: 'Delete success' }))
  }
}

export const tagController = new TagController()