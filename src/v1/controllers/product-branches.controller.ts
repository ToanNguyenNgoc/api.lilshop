import { Request, Response, query } from "express"
import { CreateProductBranchDTO, UpdateProductBranchDTO } from "../dto"
import { ErrorException } from "~/exceptions"
import { paginationData, transformDataHelper, validatorHelper } from "~/helpers"
import { prismaClient } from "~/prisma-client"

class ProductBranchesController {
    async findAll(req: Request, res: Response) {
        const product_id = Number(req.params.id)
        if (!product_id) throw new ErrorException(404, "Resource product rot found")
        const response = await prismaClient.productsOnBranches.findMany({
            where: {
                product_id: product_id,
            },
            select: {
                quantity: true,
                status:true,
                created_at:true,
                branch: {
                    select: {
                        name: true,
                        short_address: true,
                        email: true,
                        hotline: true,
                        province: { select: { name: true } },
                        district: { select: { name: true } },
                        ward: { select: { name: true } },
                    }
                }
            }
        })
        return res.send(transformDataHelper(paginationData(response, response.length, 1, response.length)))
    }

    async findById(req: Request, res: Response) {
        return res.send('findById')
    }

    async create(req: Request, res: Response) {
        const { id } = req.params
        if (!Number(id)) throw new ErrorException(404, 'Resource product not found')
        const body = new CreateProductBranchDTO()
        body.branch_id = req.body.branch_id
        body.quantity = req.body.quantity
        await validatorHelper(body)
        const branch = await prismaClient.branch.findFirst({
            where: { id: body.branch_id, deleted: false }
        })
        if (!branch) throw new ErrorException(404, 'Resource branch not found')
        const response = await prismaClient.productsOnBranches.create({
            data: {
                product_id: Number(id),
                ...body
            }
        })
        return res.send(transformDataHelper(response))
    }

    async update(req: Request, res: Response) {
        const { id, child_id } = req.params
        if (!Number(id) || !Number(child_id)) throw new ErrorException(404, "Resource not found")
        const body = new UpdateProductBranchDTO()
        body.quantity = req.body.quantity
        body.status = req.body.status
        await validatorHelper(body)
        const response = await prismaClient.productsOnBranches.update({
            where: {
                branch_id_product_id: {
                    branch_id: Number(child_id),
                    product_id: Number(id)
                }
            },
            data: body
        })
        return res.send(transformDataHelper(response))
    }

    async delete(req: Request, res: Response) {
        const { id, child_id } = req.params
        if (!Number(id) || !Number(child_id)) throw new ErrorException(404, "Resource not found")
        await prismaClient.productsOnBranches.delete({
            where: {
                branch_id_product_id: {
                    branch_id: Number(child_id),
                    product_id: Number(id)
                }
            },
        })
        return res.send(transformDataHelper({ message: "Delete success" }))
    }
}
export const productBranchesController = new ProductBranchesController()