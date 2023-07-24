import { Request, Response, NextFunction } from "express"
import { ErrorException } from "~/exceptions"
import { transformDataHelper } from "~/helpers"

class UploadController {
  media(req: Request, res: Response, next: NextFunction) {
    if (!req.file) throw new ErrorException(400, 'File is not empty')
    res.send(transformDataHelper(req.file))
  }
  media_cloud(req: Request, res: Response, next: NextFunction) {

  }
}

export const uploadController = new UploadController()