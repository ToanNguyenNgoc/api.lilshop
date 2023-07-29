import { Request, Response } from "express"
import { ErrorException } from "~/exceptions"
import { paginationData, transformDataHelper } from "~/helpers"
import { prismaClient } from "~/prisma-client"

class ProductMediaController {
  async findAll(req: Request, res: Response) {
    const product_id = Number(req.params.id)
    if (!product_id) throw new ErrorException(404, "Resource rot found")
    const data = await prismaClient.productMedia.findMany({
      where: { product_id: product_id },
      select: { media: true }
    })
    return res.send(transformDataHelper(paginationData(data, data.length, 1, data.length)))
  }
  async findById(req: Request, res: Response) {
    return res.send('findById')
  }

  async create(req: Request, res: Response) {
    const product_id = Number(req.params.id)
    if (!product_id) throw new ErrorException(404, "Resource rot found")
    const old_media_ids = (await prismaClient.productMedia.findMany({
      where: { product_id: product_id },
      select: { media_id: true }
    })).map(i => i.media_id) as number[]
    const body_media_ids: number[] = req.body.media_ids || []
    const new_media_ids = body_media_ids.filter((item) => !old_media_ids.includes(item));
    const response = await prismaClient.productMedia.createMany({
      data: new_media_ids.map(i => ({
        product_id: product_id,
        media_id: i
      }))
    })
    return res.send(transformDataHelper(response))
  }

  async update(req: Request, res: Response) {
    return res.send('create')
  }

  async delete(req: Request, res: Response) {
    const product_id = Number(req.params.id)
    if (!product_id) throw new ErrorException(404, "Resource rot found")
    const media_ids: number[] = req.body.media_ids || []
    media_ids.forEach(async (media_id) => {
      await prismaClient.productMedia.delete({
        where: { media_id: media_id }
      })
    })
    return res.send(transformDataHelper({ message: "Delete success" }))
  }
}
export const productMediaController = new ProductMediaController()