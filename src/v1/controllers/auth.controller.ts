import { Request, Response, NextFunction } from 'express'
import { LoginDTO } from '~/v1/dto'
import { ValidateException } from '~/exceptions'
import { validate } from 'class-validator'

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    const body = new LoginDTO()
    body.email = req.body.email
    body.password = req.body.password
    const errors = await validate(body)
    if (errors.length > 0) {
      return res.status(200).json({ data: errors.map(i => i.constraints) })
    }
    return res.status(200).json({ data: body })
  }
  async register(req: Request, res: Response) {
    return
  }
  async profile(req: Request, res: Response) {
    return
  }
}
export const authController = new AuthController()