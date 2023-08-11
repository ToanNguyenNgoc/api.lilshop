import { Request, Response, NextFunction } from 'express'
import {
  generatePassword,
  comparePassword,
  transformDataHelper,
  validatorHelper,
  generateToken,
  generateTokenForgot,
  decodeTokenForgot,
  generateRefreshToken
} from '~/helpers'
import { LoginDTO, RegisterDTO } from '~/v1/dto'
import { omit } from "lodash"
import { ErrorException } from '~/exceptions'
import { RequestHeader } from '~/interfaces'
import { prismaClient } from '~/prisma-client'
import { ForgotPassword } from '../dto/account.dto'
import { SendmailService } from '~/services'
import { aesDecode } from '~/utils'
import { COOKIE_AGE } from '~/constants'

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    const body = new LoginDTO()
    body.email = req.body.email
    body.password = req.body.password
    await validatorHelper<LoginDTO>(body)
    const response = await prismaClient.account.findUnique({
      where: {
        email: body.email
      }
    })
    if (!response) throw new ErrorException(404, `Email ${body.email} is not registered`)
    if (!response.status) throw new ErrorException(403, `Account is blocked`)
    const passwordMatch = await comparePassword(body.password, response.password)
    if (!passwordMatch) throw new ErrorException(403, 'Password is wrong')
    const { accessToken, token_expired_at } = generateToken(response.id, response.manager)
    const refreshToken = generateRefreshToken(
      response.email, req.headers['user-agent']
    )
    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: COOKIE_AGE
      })
      .send(transformDataHelper(omit({
        ...response,
        accessToken,
        token_expired_at
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
    if (await prismaClient.account.findUnique({ where: { email: body.email } })) {
      throw new ErrorException(403, `Email belong to another account`)
    }
    if (await prismaClient.account.findUnique({ where: { telephone: body.telephone } })) {
      throw new ErrorException(403, `Telephone belong to another account`)
    }
    const result = await prismaClient.account.create({
      data: body
    })
    return res.send(transformDataHelper(omit(result, 'password')))
  }
  async profile(req: RequestHeader, res: Response) {
    const response = await prismaClient.account.findUnique({
      where: {
        id: req.user?.id
      }
    })
    return res.send(transformDataHelper(omit(response, 'password')))
  }
  async findRolesByUser(req: RequestHeader, res: Response) {
    const user = req.user
    if (!user.manager) throw new ErrorException(403, 'You do not have the right roles')
    const includes: string[] = typeof req.query.includes === 'string' ? req.query.includes.trim().split('|') : []
    const data = await prismaClient.rolesOnAccounts.findMany({
      where: { accountId: user.id },
      include: {
        role: {
          select: {
            id: true, name: true, status: true, deleted: true, updated_at: true, created_at: true, code: true,
            permissions: includes.includes('permissions') && { select: { permission: true } }
          }
        }
      }
    })
    return res.send(transformDataHelper({ data }))
  }
  async forgot(req: RequestHeader, res: Response) {
    const { email, token, password, platform } = req.body
    if (!['CLIENT', 'ADMIN'].includes(platform))
      throw new ErrorException(403, 'Platform is in [CLIENT,ADMIN]')
    if (email) {
      const user = await prismaClient.account.findFirst({
        where: { email: email }
      })
      if (!user) throw new ErrorException(404, "Email does not exist")
      const token = generateTokenForgot(email)
      await new SendmailService().forgot(email, token, platform)
      return res.send(transformDataHelper({ message: `An email send to ${email}` }))
    }
    if (token) {
      const emailDecode = decodeTokenForgot(token)
      if (!emailDecode) throw new ErrorException(401, "Unauthenticated")
      const body = new ForgotPassword()
      body.password = password
      await validatorHelper(body)
      await prismaClient.account.update({
        where: { email: emailDecode },
        data: {
          password: await generatePassword(body.password)
        }
      })
      return res.send(transformDataHelper({ message: "Change password success" }))
    }
  }
  async refreshToken(req: Request, res: Response) {
    const obj: any = JSON.parse(aesDecode(req.cookies.refreshToken))
    if (obj.uA !== req.headers['user-agent'])
      throw new ErrorException(401, "Unauthenticated")
    const user = await prismaClient.account.findFirst({
      where: {
        email: obj.email
      }
    })
    if (!user) throw new ErrorException(401, "Unauthenticated")
    const { accessToken, token_expired_at } = generateToken(user?.id, user?.manager)
    return res.send(transformDataHelper({ accessToken, token_expired_at }))
  }
}
export const authController = new AuthController()