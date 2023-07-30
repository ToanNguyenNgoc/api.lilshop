import { Request, Response } from "express"
import { ErrorException } from "~/exceptions"
import { transformDataHelper, validatorHelper } from "~/helpers"
import { prismaClient } from "~/prisma-client"
import { ProductSizeDTO, UpdateProductSizeDTO } from "~/v1/dto"

class ProductSizeController {
  async findAll(req: Request, res: Response) {
    const product_id = Number(req.params.id)
    if (!product_id) throw new ErrorException(404, "Resource rot found")
    const response = await prismaClient.productSize.findMany({
      where: { product_id: product_id }
    })
    return res.send(transformDataHelper(response))
  }

  async findById(req: Request, res: Response) {
    return res.send('findById')
  }

  async create(req: Request, res: Response) {
    const product_id = Number(req.params.id)
    if (!product_id) throw new ErrorException(404, "Resource rot found")
    const body = new ProductSizeDTO()
    body.name = req.body.name
    await validatorHelper(body)
    const response = await prismaClient.productSize.create({
      data: { ...body, product_id: product_id }
    })
    return res.send(transformDataHelper(response))
  }

  async update(req: Request, res: Response) {
    const { id, child_id } = req.params
    if (!id || !child_id) throw new ErrorException(404, "Resource rot found")
    const body = new UpdateProductSizeDTO()
    body.name = req.body.name
    body.status = req.body.status
    await validatorHelper(body)
    const response = await prismaClient.productSize.update({
      where: { id: Number(child_id) },
      data: body
    })
    return res.send(transformDataHelper(response))
  }

  async delete(req: Request, res: Response) {
    const { id, child_id } = req.params
    if (!id || !child_id) throw new ErrorException(404, "Resource rot found")
    await prismaClient.productSize.delete({
      where: { id: Number(child_id) }
    })
    return res.send(transformDataHelper({ message: 'Delete success' }))
  }
}
export const productSizeController = new ProductSizeController()