import { validate } from "class-validator"
import { ErrorException } from "~/exceptions"

export const validatorHelper = async <T extends object>(body: T) => {
  const errors = await validate(body)
  if (errors.length > 0) {
    const constraints = errors.map(i => i.constraints?.isNotEmpty).join(', ')
    throw new ErrorException(400, constraints)
  }
}