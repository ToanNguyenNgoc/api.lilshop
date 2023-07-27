import { Request, Response, NextFunction } from "express"
import { pushLogErrorDiscord } from "~/helpers"

export const errHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = { ...err }
  if (err.statusCode === 400) {
    error.statusCode = 400
    error.message = err.message
    pushLogErrorDiscord(req, err.statusCode, err.message)
  }
  if (err.statusCode === 401) {
    error.statusCode = 401
    error.message = err.message
    pushLogErrorDiscord(req, err.statusCode, err.message)
  }
  if (err.statusCode === 403) {
    error.statusCode = 403
    error.message = err.message
    pushLogErrorDiscord(req, err.statusCode, err.message)
  }
  if (err.statusCode === 404) {
    error.statusCode = 404
    error.message = err.message
    pushLogErrorDiscord(req, err.statusCode, err.message)
  }
  if (err.statusCode === 502) {
    error.statusCode = 502
    error.message = err.message
    pushLogErrorDiscord(req, err.statusCode, err.message)
  }
  const statusCode = error.statusCode || 500
  const message = error.message || 'Server Error'
  res.status(statusCode).json({
    statusCode,
    message
  })
  if (statusCode === 500) {
    pushLogErrorDiscord(req, 500, 'Server Error')
  }
}