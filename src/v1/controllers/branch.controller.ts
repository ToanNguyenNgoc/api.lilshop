import { Request, Response } from "express"
import { identity, pickBy } from "lodash"
import { ErrorException } from "~/exceptions"
import { paginationData, transformDataHelper, validatorHelper } from "~/helpers"
import { prismaClient } from "~/prisma-client"
import { convertBoolean, convertOrderBy } from "~/utils"
import { CreateBranchDTO, UpdateBranchDTO } from "~/v1/dto"

class BranchController {
  async findAll(req: Request, res: Response) {
    const page = Number(req.query.page || 1)
    const limit = Number(req.query.limit || 15)
    const includes: string[] = typeof req.query.includes === "string" ? req.query.includes.trim().split('|') : []
    const filter = {
      AND: [
        { deleted: false },
        { status: convertBoolean(req.query.status) }
      ]
    }
    const [data, total] = await prismaClient.$transaction([
      prismaClient.branch.findMany({
        where: filter,
        include: {
          province: includes.includes('province'),
          district: includes.includes('district'),
          ward: includes.includes('ward'),
          media: includes.includes('media')
        },
        orderBy: { created_at: convertOrderBy(req.query.created_at) },
        skip: ((page * limit) - limit),
        take: limit
      }),
      prismaClient.branch.count({ where: filter })
    ])
    return res.send(transformDataHelper(paginationData(data, total, page, limit)))
  }

  async create(req: Request, res: Response) {
    const body = new CreateBranchDTO()
    body.name = req.body.name
    body.media_id = req.body.media_id
    body.short_address = req.body.short_address
    body.province_code = Number(req.body.province_code)
    body.district_code = Number(req.body.district_code)
    body.ward_code = Number(req.body.ward_code)
    body.hotline = req.body.hotline
    body.email = req.body.email
    body.lat = Number(req.body.lat || 0)
    body.long = Number(req.body.long || 0)
    await validatorHelper(body)
    const response = await prismaClient.branch.create({
      data: body
    })
    return res.send(transformDataHelper(response))
  }

  async findById(req: Request, res: Response) {
    const id = Number(req.params.id)
    const response = await prismaClient.branch.findFirst({
      where: { id: id, deleted: false },
      include: { media: true, province: true, district: true, ward: true }
    })
    if (!response) throw new ErrorException(404, "Resource not found")
    return res.send(transformDataHelper(response))
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id)
    const body = new UpdateBranchDTO()
    body.name = req.body.name
    body.media_id = Number(req.body.media_id)
    body.short_address = req.body.short_address
    body.province_code = Number(req.body.province_code)
    body.district_code = Number(req.body.district_code)
    body.ward_code = Number(req.body.ward_code)
    body.hotline = req.body.hotline
    body.email = req.body.email
    body.lat = Number(req.body.lat)
    body.long = Number(req.body.long)
    body.status = req.body.status
    await validatorHelper(pickBy(body, identity))
    const response = await prismaClient.branch.update({
      where: { id: id },
      data: {
        ...pickBy(body, identity),
        status: req.body.status
      }
    })
    return res.send(transformDataHelper(response))
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id)
    const response = await prismaClient.branch.findFirst({ where: { id: id, deleted: false } })
    if (!response) throw new ErrorException(404, "Resource not found")
    await prismaClient.branch.update({
      where: { id: id },
      data: { deleted: true }
    })
    return res.send(transformDataHelper({ message: "Delete success" }))
  }
}

export const branchController = new BranchController()