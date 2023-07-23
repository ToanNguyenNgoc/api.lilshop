import { Request, Response, NextFunction } from 'express'
import {
  generatePassword,
  comparePassword,
  transformDataHelper,
  validatorHelper,
  generateToken
} from '~/helpers'
import { LoginDTO, RegisterDTO } from '~/v1/dto'
import { PrismaClient } from "@prisma/client"
import { omit } from "lodash"
import { ErrorException } from '~/exceptions'
import { RequestHeader } from '~/interfaces'

const prisma = new PrismaClient()
class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    const body = new LoginDTO()
    body.email = req.body.email
    body.password = req.body.password
    await validatorHelper<LoginDTO>(body)
    const response = await prisma.account.findUnique({
      where: {
        email: body.email
      }
    })
    if (!response) throw new ErrorException(404, `Email ${body.email} is not registered`)
    if (!response.status) throw new ErrorException(403, `Account is blocked`)
    const passwordMatch = await comparePassword(body.password, response.password)
    if (!passwordMatch) throw new ErrorException(403, 'Password is wrong')
    const accessToken = generateToken(response.id, response.manager)
    res.send(transformDataHelper(omit({
      ...response,
      accessToken: accessToken
    }, 'password')))
  }
  async register(req: Request, res: Response) {
    const body = new RegisterDTO()
    body.fullname = req.body.fullname
    body.telephone = req.body.telephone
    body.email = req.body.email
    body.password = await generatePassword(req.body.password)
    body.manager = false
    await validatorHelper<RegisterDTO>(body)
    if (await prisma.account.findUnique({ where: { email: body.email } })) {
      throw new ErrorException(403, `Email belong to another account`)
    }
    if (await prisma.account.findUnique({ where: { telephone: body.telephone } })) {
      throw new ErrorException(403, `Telephone belong to another account`)
    }
    const result = await prisma.account.create({
      data: body
    })
    return res.send(transformDataHelper(omit(result, 'password')))
  }
  async profile(req: RequestHeader, res: Response) {
    const response = await prisma.account.findUnique({
      where: {
        id: req.user?.id
      }
    })
    return res.send(transformDataHelper(omit(response, 'password')))
  }
  async findRolesByUser(req: RequestHeader, res: Response) {
    const user = req.user
    const response = await prisma.account.findUnique({
      where: {
        id: user.id
      },
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    });
    return res.send(transformDataHelper(omit(response, 'password')))
  }
}
export const authController = new AuthController()