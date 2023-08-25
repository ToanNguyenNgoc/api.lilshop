import { Request, Response } from "express"
import { paginationData, transformDataHelper, validatorHelper } from "~/helpers"
import { CreateBannerDTO, UpdateBannerDTO } from "../dto"
import { prismaClient } from "~/prisma-client"
import { convertBoolean, convertOrderByBanner } from "~/utils"
import { ErrorException } from "~/exceptions"
import { b } from "@discordjs/core/dist/files-74da8658"

class BannerController {
  async findAll(req: Request, res: Response) {
    const page = Number(req.query.page || 1)
    const limit = Number(req.query.limit || 15)
    const type = req.query.type as string
    const _filter = {
      deleted: false,
      status: convertBoolean(req.query.status),
      type: type
    }
    const [data, total] = await prismaClient.$transaction([
      prismaClient.banner.findMany({
        where: _filter,
        orderBy: convertOrderByBanner(req.query.sort),
        skip: (page * limit) - limit,
        take: limit
      }),
      prismaClient.banner.count({ where: _filter })
    ])
    return res.send(transformDataHelper(paginationData(data, total, page, limit)))
  }
  async findById(req: Request, res: Response) {
    const id = Number(req.params.id)
    if (!id) throw new ErrorException(404, "Resource not found")
    const result = await prismaClient.banner.findFirst({
      where: { id: id, deleted: false }
    })
    if (!result) throw new ErrorException(404, "Resource not found")
    return res.send(transformDataHelper(result))
  }
  async create(req: Request, res: Response) {
    const { body } = req
    const banner = new CreateBannerDTO()
    banner.name = body.name
    banner.image_url = body.image_url
    banner.keyword = body.keyword
    banner.html_template = body.html_template
    banner.type = body.type
    banner.url = body.url
    banner.priority = body.priority
    await validatorHelper(banner)
    const result = await prismaClient.banner.create({ data: banner })
    return res.send(transformDataHelper(result))
  }
  async update(req: Request, res: Response) {
    const id = Number(req.params.id)
    if (!id) throw new ErrorException(404, "Resource not found")
    const banner = new UpdateBannerDTO()
    banner.html_template = req.body.html_template
    banner.image_url = req.body.image_url
    banner.keyword = req.body.keyword
    banner.priority = req.body.priority
    banner.product_id = req.body.product_id
    banner.status = req.body.status
    banner.type = req.body.type
    banner.url = req.body.url
    await validatorHelper(banner)
    const result = await prismaClient.banner.update({
      where: { id: id },
      data: banner
    })
    return res.send(transformDataHelper(result))
  }
  async delete(req: Request, res: Response) {
    const id = Number(req.params.id)
    if (!id) throw new ErrorException(404, "Resource not found")
    if (!await prismaClient.banner.findFirst({ where: { id: id, deleted: false } })) {
      throw new ErrorException(404, "Resource not found")
    }
    await prismaClient.banner.update({
      where: { id: id },
      data: { deleted: true }
    })
    return res.send(transformDataHelper({ message: "Delete success" }))
  }
}
export const bannerController = new BannerController()