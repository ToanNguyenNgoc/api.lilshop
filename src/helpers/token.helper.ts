import jwt from "jsonwebtoken"
import { aesDecode, aesEncode, dotenvInitialize } from "~/utils"

dotenvInitialize()
export const generateToken = (id: number, isManager: boolean): string => {
  const accessToken = jwt.sign({
    id: id,
    manager: isManager
  }, process.env.JWT_SECRET_KET || 'jwt',
    { expiresIn: '10d' })
  return accessToken
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