import { validate } from "class-validator"
import { Response, NextFunction } from "express"

export class ValidateException {
  async onValidate<T extends object>(body: T, res: Response, next: NextFunction) {
    const errors = await validate(body)
    if (errors.length > 0) {
      return res.status(400).json({ data: errors.map(i => i.constraints) })
    }
    return
  }
}