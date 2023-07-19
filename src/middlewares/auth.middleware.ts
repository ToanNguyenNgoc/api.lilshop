import { Response, NextFunction } from "express"
import { RequestHeader } from "~/interfaces"
import jwt from "jsonwebtoken"
import { dotenvInitialize } from "~/utils"

dotenvInitialize()
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
  role: (req: RequestHeader, res: Response, next: NextFunction) => {
    const user = req.user
    if (!user.manager) return res.send({ statusCode: 403, message: 'You do not have the right roles' })
    if (user.manager) {
      next()
    }
  }
}