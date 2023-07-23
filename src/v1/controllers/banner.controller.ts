import { Request, Response } from "express"
import { transformDataHelper } from "~/helpers"

class BannerController {
  create(req: Request, res: Response) {
    return res.send(transformDataHelper('create banner'))
  }
  update(req: Request, res: Response) {
    return res.send(transformDataHelper('update banner'))
  }
}
export const bannerController = new BannerController()