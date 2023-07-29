import { Response, NextFunction } from "express"
import { RequestHeader } from "~/interfaces"
import jwt from "jsonwebtoken"
import { dotenvInitialize, encode } from "~/utils"
import { PrismaClient } from "@prisma/client"
import { KEY } from "~/constants"

dotenvInitialize()
const prisma = new PrismaClient()
export const authMiddleware = {
  authentication: async (req: RequestHeader, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization
    if (!authorization) return res.send({ statusCode: 401, message: 'Unauthenticated' })
    const accessToken = authorization.split(" ")[1]
    jwt.verify(accessToken, process.env.JWT_SECRET_KET || 'jwt', async (err, user) => {
      if (err) return res.send({ statusCode: 401, message: 'Unauthenticated' })
      req.user = user
      next()
    })
  },
  role: async (req: RequestHeader, res: Response, next: NextFunction) => {
    const user = req.user
    if (!user.manager) return res.send({ statusCode: 403, message: 'You do not have the right roles' })
    if (user.manager) {
      const roles = await prisma.rolesOnAccounts.findMany({
        where: {
          accountId: user.id
        },
        include: {
          role: {
            include: {
              permissions: {
                include: {
                  permission: {
                    select: { name: true, path: true }
                  },
                },
              }
            }
          }
        }
      })
      const rolesCode = roles.map(i => i.role?.code) || []
      if (rolesCode.includes(encode(KEY.SPA || ''))) {
        next()
      } else {
        const permissions_user_path = roles.map(role => role.role.permissions.map(i => i.permission.path)).flat()
        const routePath = (req.baseUrl + req.route.path).replace(/^\/|\/$/g, '')
        const permissionRoutePath = `${routePath}.${req.method}`
        if (permissions_user_path.includes(permissionRoutePath)) {
          next()
        } else {
          return res.send({ statusCode: 403, message: `You do not use method: ${req.method} with this request` })
        }
      }
    }
  },
}