import { Request, Response, NextFunction } from "express"
import { KEY } from "~/constants"
import { ErrorException } from "~/exceptions"
import { prismaClient } from "~/prisma-client"
import { decode } from "~/utils"

export const protectedMiddleware = {
  superAdmin: async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id)
    if (!id) throw new ErrorException(404, "Resource not found")
    const roles = await prismaClient.rolesOnAccounts.findMany({
      where: { accountId: id },
      include: { role: { select: { code: true } } }
    })
    const roles_code = roles.map(i => decode(i.role.code))
    if ((roles_code.length !== 1) || !roles_code.includes(KEY.SPA)) {
      next()
    }
    if (roles_code.length === 1 && roles_code.includes(KEY.SPA)) {
      if (req.method === "DELETE") {
        return res.status(403).send({ statusCode: 403, message: 'Cannot delete this account' })
      }
      if (req.method === "PUT") {
        req.body = {
          ...req.body,
          roles: roles.map(i => i.roleId)
        }
        next()
      }
    }
  },
}