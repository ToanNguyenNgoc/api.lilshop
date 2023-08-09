import axios from "axios";
import { Request, Response, NextFunction } from "express"

export const recaptchaMiddleware = {
  verify: (req: Request, res: Response, next: NextFunction) => {
    const recaptcha = req.body.recaptcha
    if (!recaptcha || recaptcha === '') {
      return res.status(401).send({ statusCode: 401, message: 'Recaptcha is required' })
    }
    const secretKey = process.env.RECAPTCHA_SITE_KEY_SERVER;
    const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + recaptcha + "&remoteip=" + req.connection.remoteAddress;
    axios.get(verificationURL)
      .then(responseRecaptcha => {
        if (!responseRecaptcha.data.success) return res.status(401).send({ statusCode: 401, message: 'Recaptcha is invalid' })
        next()
      })
      .catch(() => res.status(401).send({ statusCode: 401, message: 'Recaptcha is invalid!' }))
  }
}