import jwt from "jsonwebtoken"
import moment from "moment"
import { aesDecode, aesEncode, dotenvInitialize } from "~/utils"

dotenvInitialize()

export const generateRefreshToken = (email: string, uA: any) => {
  return aesEncode(JSON.stringify({ email, uA }))
}
export const generateToken = (id: number|string, manager: boolean) => {
  const accessToken = jwt.sign({
    ctx: aesEncode(JSON.stringify({ id, manager }))
  }, process.env.JWT_SECRET_KET || 'jwt',
    { expiresIn: process.env.JWT_SECRET_TIME || '2m' })
  const currentTime = new Date()
  const newTime = currentTime.getTime() + (60 * 1000 * 2) + (60 * 1000 * 60 * Number(process.env.TIME_ZONE_UTC || 0))
  const token_expired_at = moment(newTime).format('YYYY-MM-DD HH:mm:ss');
  return {
    accessToken,
    token_expired_at
  }
}

export const generateTokenForgot = (email: string) => {
  const token = jwt.sign(
    {
      ctx: aesEncode(email)
    },
    process.env.JWT_SECRET_KET || 'jwt',
    {
      algorithm: 'HS256',
      expiresIn: '10m'
    }
  )
  return token
}
export const decodeTokenForgot = (token: string) => {
  let email: string | undefined
  try {
    const emailCode = jwt.verify(token, process.env.JWT_SECRET_KET || 'jwt') as jwt.JwtPayload
    email = aesDecode(emailCode.ctx)
  } catch (error) { }
  return email
}