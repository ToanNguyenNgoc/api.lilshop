import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { omit } from "lodash"
import { ErrorException } from "~/exceptions"
import { generatePassword, paginationData, transformDataHelper, validateRolesExist, validatorHelper } from "~/helpers"
import { convertBoolean, convertOrderBy } from "~/utils"
import { CreateAccountDTO, UpdateAccountDTO } from "~/v1/dto/account.dto"

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
          id: true,
          fullname: true, email: true, telephone: true, status: true,
          deleted: true, created_at: true, updated_at: true, manager: true, avatar:true,
          roles:{
            select:{role:true}
          }
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
        fullname: true, email: true,avatar:true, telephone: true, status: true,
        deleted: true, created_at: true, updated_at: true, manager: true,
        roles: { select: { role: true } }
      }
    })
    if (!response) throw new ErrorException(404, 'Resource not found')
    return res.send(transformDataHelper(response))
  }
  async create(req: Request, res: Response) {
    const body = new CreateAccountDTO()
    body.fullname = req.body.fullname
    body.email = req.body.email
    body.avatar = req.body.avatar
    body.password = await generatePassword(req.body.password)
    body.telephone = req.body.telephone
    body.roles = req.body.roles || []
    await validatorHelper(body)
    if (await prisma.account.findFirst({ where: { email: body.email } }))
      throw new ErrorException(403, `Email belong to another account`)
    if (await prisma.account.findFirst({ where: { telephone: body.telephone } }))
      throw new ErrorException(403, `Telephone belong to another account`)
    await validatorHelper(body)
    if (!await validateRolesExist(body.roles))
      throw new ErrorException(404, 'One or more roles do not exist')
    const response = await prisma.account.create({
      data: {
        ...body,
        manager: true,
        roles: {
          createMany: {
            data: body.roles.map(i => ({
              roleId: i
            }))
          }
        }
      }
    })
    return res.send(transformDataHelper(omit(response, 'password')))
  }
  async update(req: Request, res: Response) {
    const id = Number(req.params.id)
    const body = new UpdateAccountDTO()
    body.fullname = req.body.fullname
    body.email = req.body.email
    body.telephone = req.body.telephone
    body.status = req.body.status
    body.avatar = req.body.avatar
    body.roles = req.body.roles || []
    await validatorHelper(body)
    if (!await validateRolesExist(body.roles))
      throw new ErrorException(404, 'One or more roles do not exist')
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
      },
    })
    return res.send(transformDataHelper(omit(response, "password")))
  }
  async delete(req: Request, res: Response) {
    const id = Number(req.params.id)
    if (!id) throw new ErrorException(404, "Resource not found")
    await prisma.account.update({
      where: { id: id },
      data: { deleted: true }
    })
    return res.send(transformDataHelper({ message: "Delete success" }))
  }
}
export const accountController = new AccountController()