import { Request } from "express"

export interface RequestHeader extends Request {
  user?: any
}
export interface RequestBody<T> extends Request {
  body: T
}