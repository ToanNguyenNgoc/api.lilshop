import { Request, Response } from "express"
import { RequestHeader } from "~/interfaces"
import { LoginGoogleMobaDTO, UserGoogle } from "../dto"
import { generatePassword, generateRefreshToken, generateToken, transformDataHelper, validatorHelper } from "~/helpers"
import { prismaClient } from "~/prisma-client"
import { COOKIE_AGE } from "~/constants"
import { omit } from "lodash"

class OAuthController {
  async google(req: Request, res: Response) {
    return res.send('google')
  }
  async googleRedirect(req: RequestHeader, res: Response) {
    const user = req.user._json
    let current = await prismaClient.account.findFirst({
      where: { email: user.email }
    })
    if (!current) {
      const newUser = new UserGoogle()
      newUser.fullname = user.name
      newUser.email = user.email
      newUser.avatar = user.picture
      newUser.social_platform = "GOOGLE"
      newUser.password = await generatePassword(user.sub)
      const response = await prismaClient.account.create({
        data: newUser
      })
      current = response
    }
    const { accessToken, token_expired_at } = generateToken(current.id, current.manager)
    const refreshToken = generateRefreshToken(
      current.email, req.headers['user-agent']
    )
    return res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: COOKIE_AGE
      })
      .cookie('accessToken', accessToken, {
        secure: true,
        sameSite: 'lax',
        maxAge: COOKIE_AGE,
        domain: process.env.DOMAIN_CLIENT
      })
      .cookie('token_expired_at', token_expired_at, {
        secure: true,
        sameSite: 'lax',
        maxAge: COOKIE_AGE,
        domain: process.env.DOMAIN_CLIENT
      })
      .redirect(process.env.GOOGLE_CALLBACK_CLIENT || '')
  }
  async loginGoogleMoba(req: Request, res: Response) {
    const body = new LoginGoogleMobaDTO()
    body.email = req.body.email
    body.server_auth_code = req.body.server_auth_code
    await validatorHelper(body)
    if(body.server_auth_code !== process.env.GOOGLE_WEB_CLIENT_ID_MOBA){
      return res.status(403).send({ statusCode: 403, message: 'server_auth_code is invalid!' })
    }
    let current = await prismaClient.account.findFirst({
      where: { email: body.email }
    })
    if (!current) {
      const newUser = new UserGoogle()
      newUser.fullname = req.body.name
      newUser.email = body.email
      newUser.avatar = req.body.avatar
      newUser.social_platform = "GOOGLE"
      newUser.password = await generatePassword(body.email)
      const response = await prismaClient.account.create({
        data: newUser
      })
      current = response
    }
    const { accessToken, token_expired_at } = generateToken(current.id, current.manager)
    const refreshToken = generateRefreshToken(
      current.email, req.headers['user-agent']
    )
    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: COOKIE_AGE
      })
      .send(transformDataHelper(omit({
        ...current,
        refreshToken,
        accessToken,
        token_expired_at
      }, 'password')))
  }

}
export const oauthController = new OAuthController()