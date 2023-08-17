import { Request, Response } from "express"

class OAuthController {
  async google(req: Request, res: Response) {
    return res.send('google')
  }
  async googleRedirect(req: Request, res: Response) {
    return res.send(req.user)
  }

}
export const oauthController = new OAuthController()