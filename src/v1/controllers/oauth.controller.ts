import { Request, Response } from "express"

class OAuthController {
  async google(req: Request, res: Response) {
    return res.send('google')
  }
}
export const oAuthController = new OAuthController()