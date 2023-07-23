import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { KEY } from "~/constants";
import { ErrorException } from "~/exceptions";
import { transformDataHelper, validatePermissionsExist, validatorHelper } from "~/helpers";
import { encode } from "~/utils";
import { RoleDTO, UpdateRoleDto } from "~/v1/dto";

const prisma = new PrismaClient()

class RoleController {
  async findAll(req: Request, res: Response) {
    const [data, total] = await prisma.$transaction([
      prisma.role.findMany({ where: { deleted: false } }),
      prisma.role.count({ where: { deleted: false } })
    ])
    return res.send(transformDataHelper({ data, total }))
  }
  async create(req: Request, res: Response) {
    const body = new RoleDTO()
    body.name = req.body.name
    body.permissions = req.body.permissions
    await validatorHelper<RoleDTO>(body)
    if (!await validatePermissionsExist(body.permissions)) {
      throw new ErrorException(400, 'One or more permissions do not exist')
    }
    const data = await prisma.role.create({
      data: {
        ...body,
        code: encode(body.name),
        permissions: {
          create: body.permissions.map(id => ({
            permission: {
              connect: {
                id: id
              }
            }
          }))
        }
      }
    })
    return res.send(transformDataHelper(data))
  }
  async update(req: Request, res: Response) {
    const id = Number(req.params.id)
    const role = await prisma.role.findFirst({ where: { id: id, deleted: false } })
    if (!role) throw new ErrorException(404, 'Resource not found')
    if (role.code === encode(KEY.SPA)) throw new ErrorException(403, 'Cannot update this role')
    const body = new UpdateRoleDto()
    body.name = req.body.name
    body.permissions = req.body.permissions
    body.status = req.body.status
    await validatorHelper(body)
    if (body.permissions?.length > 0) {
      if (!await validatePermissionsExist(body.permissions))
        throw new ErrorException(400, 'One or more permissions do not exist')
    }
    const response = await prisma.role.update({
      where: { id: id },
      data: {
        ...body,
        code: body.name ? encode(body.name) : undefined,
        permissions: {
          deleteMany: {},
          create: body.permissions?.map(id => ({
            permission: {
              connect: {
                id: id
              }
            }
          })),
        }
      }
    })
    return res.send(transformDataHelper(response))
  }
  async delete(req: Request, res: Response) {
    const role = await prisma.role.findFirst({ where: { id: Number(req.params.id), deleted: false } })
    if (!role) throw new ErrorException(404, 'Resource not found')
    if (role.code === encode(KEY.SPA)) throw new ErrorException(403, 'Cannot delete this role')
    await prisma.role.update({
      where: { id: Number(req.params.id) },
      data: { deleted: true }
    })
    return res.send(transformDataHelper({ message: 'Delete role success' }))
  }
}

export const roleController = new RoleController()