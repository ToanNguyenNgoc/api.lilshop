import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { transformDataHelper } from "~/helpers"

const prisma = new PrismaClient()

class PermissionController {
  async findAll(req: Request, res: Response) {
    const [data, total] = await prisma.$transaction([
      prisma.permission.findMany({}),
      prisma.permission.count()
    ])
    return res.send(transformDataHelper({ data, total }))
  }
  async create(req: Request, res: Response) {
    const permissions = req.body.map((i: string) => {
      const splitArray = i.split(/\s+(?=\w)/)
      if (splitArray.length === 1)
        return [
          { name: i, path: `v1/${i}.GET` },
          { name: i, path: `v1/${i}/:id.GET` },
          { name: i, path: `v1/${i}.POST` },
          { name: i, path: `v1/${i}/:id.PUT` },
          { name: i, path: `v1/${i}/:id.DELETE` }
        ]
      if (splitArray.length === 2) {
        return [
          { name: i, path: `v1/${splitArray[0]}/:id/${splitArray[1]}.GET` },
          { name: i, path: `v1/${splitArray[0]}/:id/${splitArray[1]}/:child_id.GET` },
          { name: i, path: `v1/${splitArray[0]}/:id/${splitArray[1]}/.POST` },
          { name: i, path: `v1/${splitArray[0]}/:id/${splitArray[1]}/:child_id.PUT` },
          { name: i, path: `v1/${splitArray[0]}/:id/${splitArray[1]}/:child_id.DELETE` },
        ]
      }
    }).flat()
    const response = await prisma.permission.createMany({
      data: permissions,
      skipDuplicates: true
    })
    return res.send(transformDataHelper(response))
  }
}
export const permissionController = new PermissionController()