import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { omit } from "lodash"
import { ErrorException } from "~/exceptions"
import { generatePassword, transformDataHelper } from "~/helpers"
import { dotenvInitialize, encode } from "~/utils"
import { RegisterDTO } from "~/v1/dto"

const prisma = new PrismaClient()
dotenvInitialize()

export class InitialController {
  async createAccount(req: Request, res: Response) {
    const accountCount = await prisma.account.count()
    if (accountCount > 0) throw new ErrorException(403, 'Initial account is initialized')
    const newAccount = new RegisterDTO()
    newAccount.email = req.body.email
    newAccount.fullname = req.body.fullname
    newAccount.telephone = req.body.telephone
    newAccount.password = await generatePassword(req.body.password)
    newAccount.manager = true
    const response = await prisma.account.create({
      data: {
        ...newAccount,
        roles: {
          create: [
            {
              role: {
                create: {
                  name: 'Super Admin',
                  code: encode(process.env.SPA || '')
                }
              }
            }
          ]
        }
      }
    })
    return res.send(transformDataHelper(omit(response, 'password')))
  }
}
export const initialController = new InitialController()