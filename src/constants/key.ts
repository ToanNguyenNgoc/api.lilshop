import { dotenvInitialize } from "~/utils"

dotenvInitialize()
const oneDay = 24 * 60 * 60
export const KEY = {
  SPA: process.env.SPA || ''
}
export const COOKIE_AGE = oneDay * 30 * 1000 //Convert to milliseconds