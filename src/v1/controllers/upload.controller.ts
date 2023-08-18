import { PrismaClient } from "@prisma/client"
import { Request, Response, NextFunction, Express } from "express"
import { ErrorException } from "~/exceptions"
import { paginationData, transformDataHelper } from "~/helpers"
import { MediaModel } from "../models"

const prisma = new PrismaClient()
interface FileUp extends Express.Multer.File {
  fieldname: string;
}
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
  async media_multiple(req: Request, res: Response, next: NextFunction) {
    const files = req.files as Express.Multer.File[] || []
    if (req.files?.length === 0) throw new ErrorException(400, 'File not empty')
    const media_list = files.map(file => ({
      name: file.originalname,
      file_name: file.filename,
      disk: file.destination,
      mime_type: file.mimetype,
      size: file.size,
      original_url: `${process.env.DOMAIN}/media/${file.filename}`
    }))
    const responseList: any[] = []
    for (const file of files) {
      const response = await prisma.media.create({
        data: {
          name: file.originalname,
          file_name: file.filename,
          disk: file.destination,
          mime_type: file.mimetype,
          size: file.size,
          original_url: `${process.env.DOMAIN}/media/${file.filename}`
        },
      })
      responseList.push(response)
    }

    return res.send(transformDataHelper(paginationData(responseList, responseList.length, 1, responseList.length)))
  }
}

export const uploadController = new UploadController()