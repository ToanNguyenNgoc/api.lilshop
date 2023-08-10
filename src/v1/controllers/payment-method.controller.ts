import { Request, Response } from "express"
import { CreatePaymentMethodDTO } from "../dto"
import { paginationData, transformDataHelper, validatorHelper } from "~/helpers"
import { prismaClient } from "~/prisma-client"
import { ErrorException } from "~/exceptions"

class PaymentMethodController {
    async findAll(req: Request, res: Response) {
        const response = await prismaClient.paymentMethod.findMany({
            where: { deleted: false },
            orderBy: { created_at: 'desc' }
        })
        return res.send(transformDataHelper(paginationData(
            response, response.length, 1, response.length
        )))
    }

    async findById(req: Request, res: Response) {
        return res.send('findById')
    }

    async create(req: Request, res: Response) {
        const { name, method_key, child_key, icon, setting } = req.body
        const body = new CreatePaymentMethodDTO()
        body.name = name
        body.method_key = method_key
        await validatorHelper(body)
        const response = await prismaClient.paymentMethod.create({
            data: {
                ...body,
                child_key, icon, setting
            }
        })
        return res.send(transformDataHelper(response))
    }

    async update(req: Request, res: Response) {
        const id = Number(req.params.id)
        const { name, icon, setting, status } = req.body
        if (!id) throw new ErrorException(404, "Resource not found")
        if (!await prismaClient.paymentMethod.findFirst({ where: { id: id, deleted: false } }))
            throw new ErrorException(404, "Resource not found")
        const response = await prismaClient.paymentMethod.update({
            where: { id: id },
            data: {
                name, icon, setting, status
            }
        })
        return res.send(transformDataHelper(response))
    }

    async delete(req: Request, res: Response) {
        return res.send('delete')
    }
}
export const paymentMethodController = new PaymentMethodController()