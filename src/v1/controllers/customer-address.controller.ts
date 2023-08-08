import { Request, Response } from "express"
import { paginationData, transformDataHelper, validatorHelper } from "~/helpers"
import { RequestHeader } from "~/interfaces"
import { prismaClient } from "~/prisma-client"
import { CreateCustomerAddressDTO, UpdateCustomerAddressDTO } from "../dto"
import { ErrorException } from "~/exceptions"

class CustomerAddressController {
  async findAll(req: RequestHeader, res: Response) {
    const { user } = req
    const page = Number(req.query.page || 1)
    const limit = Number(req.query.limit || 15)
    const [data, total] = await prismaClient.$transaction([
      prismaClient.accountAddress.findMany({
        where: { account_id: user.id, delete: false },
        include: {
          province: { select: { code: true, name: true } },
          district: { select: { code: true, name: true } },
          ward: { select: { code: true, name: true } },
        },
        skip: ((page * limit) - limit),
        take: limit,
        orderBy: { created_at: 'desc' }
      })
      ,
      prismaClient.accountAddress.count({
        where: { account_id: user.id, delete: false }
      })
    ])
    return res.send(transformDataHelper(paginationData(data, total, page, limit)))
  }

  async findById(req: RequestHeader, res: Response) {
    const id = Number(req.params.id)
    if (!id) throw new ErrorException(404, "Resource not found")
    const response = await prismaClient.accountAddress.findFirst({
      where: { id: id, account_id: req.user?.id, delete: false },
      include: {
        province: { select: { code: true, name: true } },
        district: { select: { code: true, name: true } },
        ward: { select: { code: true, name: true } },
      },
    })
    if (!response) throw new ErrorException(404, "Resource not found")
    return res.send(transformDataHelper(response))
  }

  async create(req: RequestHeader, res: Response) {
    const { user, body } = req
    const address = new CreateCustomerAddressDTO()
    address.short_address = body.short_address
    address.province_code = body.province_code
    address.district_code = body.district_code
    address.ward_code = body.ward_code
    address.is_default = body.is_default
    address.lat = body.lat
    address.long = body.long
    await validatorHelper(address)
    if (body.is_default === true) {
      await prismaClient.accountAddress.updateMany({
        where: { account_id: user.id },
        data: { is_default: false }
      })
    }
    const response = await prismaClient.accountAddress.create({
      data: {
        ...address,
        account_id: user.id
      }
    })
    return res.send(transformDataHelper(response))
  }

  async update(req: RequestHeader, res: Response) {
    const { user, body } = req
    const id = Number(req.params.id)
    if (!id) throw new ErrorException(404, "Resource not found")
    if (!await prismaClient.accountAddress.findFirst({ where: { id: id, account_id: user?.id } }))
      throw new ErrorException(404, "Resource not found")
    const address = new UpdateCustomerAddressDTO()
    address.short_address = body.short_address
    address.province_code = body.province_code
    address.district_code = body.district_code
    address.ward_code = body.ward_code
    address.is_default = body.is_default
    address.lat = body.lat
    address.long = body.long
    if (body.is_default === true) {
      await prismaClient.accountAddress.updateMany({
        where: { account_id: user.id },
        data: { is_default: false }
      })
    }
    const response = await prismaClient.accountAddress.update({
      where: { id: id },
      data: address
    })
    return res.send(transformDataHelper(response))
  }

  async delete(req: RequestHeader, res: Response) {
    const id = Number(req.params.id)
    if (!id) throw new ErrorException(404, "Resource not found")
    if (!await prismaClient.accountAddress.findFirst({ where: { id: id, account_id: req.user?.id } }))
      throw new ErrorException(404, "Resource not found")
    await prismaClient.accountAddress.update({
      where: { id: id },
      data: { delete: true }
    })
    return res.send(transformDataHelper({ message: "Delete success" }))
  }
}
export const customerAddressController = new CustomerAddressController()
