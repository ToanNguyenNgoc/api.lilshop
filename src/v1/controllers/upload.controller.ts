import { PrismaClient } from "@prisma/client"
import { Request, Response, NextFunction } from "express"
import { ErrorException } from "~/exceptions"
import { transformDataHelper } from "~/helpers"
import { MediaModel } from "~/v1/models"

const prisma = new PrismaClient()
class UploadController {
  async media(req: Request, res: Response, next: NextFunction) {
    if (!req.file) throw new ErrorException(400, 'File is not empty')
    const data = new MediaModel()
    data.name = req.file.originalname
    data.file_name = req.file.filename
    data.disk = req.file.destination
    data.mime_type = req.file.mimetype
    data.size = req.file.size
    data.original_url = `${process.env.DOMAIN}/media/${req.file.filename}`
    const response = await prisma.media.create({ data: data })
    res.send(transformDataHelper(response))
  }
  media_cloud(req: Request, res: Response, next: NextFunction) {

  }
}

export const uploadController = new UploadController()