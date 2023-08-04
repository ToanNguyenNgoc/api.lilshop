import { validate } from "class-validator"
import { ErrorException } from "~/exceptions"

export const validatorHelper = async <T extends object>(body: T) => {
  const errors = await validate(body)
  if (errors.length > 0) {
    const constraints = errors.map(i =>
      i.constraints?.isNotEmpty ||
      i.constraints?.isArray ||
      i.constraints?.isBoolean ||
      i.constraints?.isEmail ||
      i.constraints?.isNumber||
      i.constraints?.matches
    ).join(', ')
    throw new ErrorException(400, constraints)
  }
}