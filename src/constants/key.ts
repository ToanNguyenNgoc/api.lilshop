import { dotenvInitialize } from "~/utils"

dotenvInitialize()
export const KEY = {
  SPA: process.env.SPA || ''
}