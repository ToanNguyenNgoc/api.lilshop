import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class AccountController {
  async register(req: Request, res: Response) {
    const response = await prisma.account.create({
      data: {
        fullname: 'Toan',
        password: '06011998',
        email: 'toanmeo@gmail.vn',
        telephone: '0392645740'
      }
    })
    return res.status(200).json({ data: response })
  }
  async findAll(req: Request, res: Response) {
    const data = await prisma.account.findMany()
    return res.status(200).json({ data: data })
  }
}
export const accountController = new AccountController()
