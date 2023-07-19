import jwt from "jsonwebtoken"
import { dotenvInitialize } from "~/utils"

dotenvInitialize()
export const generateToken = (id: number, isManager: boolean): string => {
  const accessToken = jwt.sign({
    id: id,
    manager: isManager
  }, process.env.JWT_SECRET_KET || 'jwt',
    { expiresIn: '10d' })
  return accessToken
}