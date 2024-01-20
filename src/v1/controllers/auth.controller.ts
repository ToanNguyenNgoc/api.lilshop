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
import { ForgotMobaDTO, LoginDTO, PutProfileDTO, RegisterDTO } from '~/v1/dto'
import { identity, omit, pickBy } from "lodash"
import { ErrorException } from '~/exceptions'
import { RequestHeader } from '~/interfaces'
import { prismaClient } from '~/prisma-client'
import { ForgotPassword } from '../dto/account.dto'
import { SendmailService } from '~/services'
import { aesDecode, randomCode } from '~/utils'
import { COOKIE_AGE, PLAT_FROM } from '~/constants'
import jwt from "jsonwebtoken"

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
    if (!response.verify) throw new ErrorException(403, 'This account is not verify')
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
        refreshToken: req.body.platform === PLAT_FROM.CLIENT_APP.key && refreshToken,
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
    const userEmail = await prismaClient.account.findUnique({ where: { email: body.email } })
    if (!userEmail) {
      if (await prismaClient.account.findUnique({ where: { telephone: body.telephone } })) {
        throw new ErrorException(403, `Telephone belong to another account`)
      }
      const result = await prismaClient.account.create({ data: { ...body, verify: false } })
      await new SendmailService().sendVerify(result.email, result.fullname || '')
      return res.send(transformDataHelper(omit(result, ['password'])))
    }
    if (userEmail && userEmail.verify === false) {
      const userTelephone = await prismaClient.account.findUnique({ where: { telephone: body.telephone } })
      if (userTelephone && userTelephone.email !== body.email) {
        throw new ErrorException(403, `Telephone belong to another account`)
      }
      const result = await prismaClient.account.update({
        where: { email: body.email },
        data: { telephone: body.telephone }
      })
      await new SendmailService().sendVerify(result.email, result.fullname || '')
      return res.send(transformDataHelper(omit(result, ['password'])))
    }
    if (userEmail && userEmail.verify === true) {
      throw new ErrorException(403, `Email belong to another account`)
    }
  }
  async profile(req: RequestHeader, res: Response) {
    const response = await prismaClient.account.findUnique({
      where: {
        id: req.user?.i
      }
    })
    return res.send(transformDataHelper(omit(response, 'password')))
  }
  async putProfile(req: RequestHeader, res: Response) {
    const { user } = req
    if (req.body.telephone) {
      const userTelephone = await prismaClient.account.findFirst({ where: { telephone: req.body.telephone } })
      if (userTelephone && userTelephone.id !== user.id) {
        throw new ErrorException(403, `Telephone belong to another account`)
      }
    }
    const body = new PutProfileDTO()
    body.fullname = req.body.fullname
    body.telephone = req.body.telephone
    body.avatar = req.body.avatar
    await validatorHelper(body)
    const response = await prismaClient.account.update({
      where: { id: user.id },
      data: body
    })
    return res.send(transformDataHelper(response))
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
  async forgotMoba(req: Request, res: Response) {
    const body = new ForgotMobaDTO()
    body.recaptcha = req.body.recaptcha
    body.email = req.body.email
    body.code = req.body.code
    body.new_password = req.body.new_password
    await validatorHelper(body)
    const responseUser = await prismaClient.account.findFirst({
      where: {
        email: body.email,
        deleted: false
      }
    })
    if (!responseUser) throw new ErrorException(404, `Email ${body.email} is not registered`)
    if (!responseUser.status) throw new ErrorException(403, `Account is blocked`)
    if (body.email && body.code && body.new_password) {
      const responseOtp = await prismaClient.opt.findFirst({
        where: {
          email: body.email,
          code: body.code
        }
      })
      if (!responseOtp) throw new ErrorException(404, `Otp is invalid!`)
      await prismaClient.account.update({
        where: { email: body.email },
        data: {
          password: await generatePassword(body.new_password)
        }
      })
      await prismaClient.opt.deleteMany({
        where: {
          email: {
            contains: body.email
          }
        }
      })
      return res.send(transformDataHelper({ message: 'Update password success !' }))
    }
    if (body.email) {
      const otp = randomCode(6).trim()
      await prismaClient.opt.create({
        data: {
          code: otp,
          email: body.email
        }
      })
      await new SendmailService().forgotMoba(body.email, otp)
      return res.send(transformDataHelper({ message: `An email send to ${body.email}` }))
    }
  }
  async refreshToken(req: Request, res: Response) {
    const obj: any = JSON.parse(aesDecode(req.cookies.refreshToken || req.body.refresh_token))
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
  async verify(req: Request, res: Response) {
    try {
      const token = req.query.token as string
      jwt.verify(token, process.env.JWT_SECRET_KET || 'jwt', async (err, jwtDecode: any) => {
        if (err) {
          return res.redirect(`${process.env.GOOGLE_CALLBACK_CLIENT}/auth/verify?code=0`)
        }
        const email = JSON.parse(aesDecode(jwtDecode.ctx)).id
        await prismaClient.account.update({
          where: { email: email },
          data: { verify: true }
        })
        return res.redirect(`${process.env.GOOGLE_CALLBACK_CLIENT}/auth/verify`)
      })
    } catch (error) {
      return res.redirect(`${process.env.GOOGLE_CALLBACK_CLIENT}/auth/verify?code=0`)
    }
  }
  async logout(req: Request, res: Response) {
    res
      .clearCookie('refreshToken', {
        secure: true,
        sameSite: 'lax',
        domain: process.env.DOMAIN_CLIENT,
      })
      .clearCookie('token_expired_at', {
        secure: true,
        domain: process.env.DOMAIN_CLIENT,
        sameSite: 'lax',
      })
      .clearCookie('accessToken', {
        secure: true,
        domain: process.env.DOMAIN_CLIENT,
        sameSite: 'lax',
      })
    return res.send(transformDataHelper({ message: 'Logout success' }))
  }
}
export const authController = new AuthController()