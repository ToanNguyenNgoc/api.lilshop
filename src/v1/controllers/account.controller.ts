import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { ErrorException } from "~/exceptions"
import { paginationData, transformDataHelper, validatorHelper } from "~/helpers"
import { convertBoolean, convertOrderBy } from "~/utils"
import { UpdateAccountDTO } from "~/v1/dto/account.dto"

const prisma = new PrismaClient()
class AccountController {
  async findAll(req: Request, res: Response) {
    const page = Number(req.query.page || 1)
    const limit = Number(req.query.limit || 15)
    const search = req.query.search as any
    const includes = typeof req.query.includes === 'string' ? req.query.includes.trim().split('|') : []
    const filter = {
      OR: [
        { fullname: { contains: search ? search : '' } },
        { email: { contains: search ? search : '' } },
        { telephone: { startsWith: search ? search : '' } },
      ],
      AND: [
        { deleted: false },
        { status: convertBoolean(req.query.status) },
        { manager: convertBoolean(req.query.manager) }
      ]
    }
    const [data, total] = await prisma.$transaction([
      prisma.account.findMany({
        select: {
          fullname: true, email: true, telephone: true, status: true, deleted: true, created_at: true, updated_at: true, manager: true,
          roles: includes.includes('roles') && { select: { role: true } }
        },
        skip: ((page * limit) - limit),
        take: limit,
        where: filter,
        orderBy: { created_at: convertOrderBy(req.query.created_at) },
      }),
      prisma.account.count({ where: filter })
    ])
    return res.send(transformDataHelper(paginationData(data, total, page, limit)))
  }
  async findById(req: Request, res: Response) {
    const id = Number(req.params.id)
    const response = await prisma.account.findFirst({
      where: { id: id, deleted: false },
      select: {
        fullname: true, email: true, telephone: true, status: true,
        deleted: true, created_at: true, updated_at: true, manager: true,
        roles: { select: { role: true } }
      }
    })
    if (!response) throw new ErrorException(404, 'Resource not found')
    return res.send(transformDataHelper(response))
  }
  async update(req: Request, res: Response) {
    const id = Number(req.params.id)
    const body = new UpdateAccountDTO()
    body.fullname = req.body.fullname
    body.email = req.body.email
    body.telephone = req.body.telephone
    body.status = req.body.status
    body.roles = req.body.roles || []
    await validatorHelper(body)
    const response = await prisma.account.update({
      where: { id: id },
      data: {
        ...body,
        roles: {
          deleteMany: {},
          create: body.roles.map(i => ({
            role: {
              connect: {
                id: i
              }
            }
          }))
        }
      }
    })
    return res.send(transformDataHelper(response))
  }
}
export const accountController = new AccountController()