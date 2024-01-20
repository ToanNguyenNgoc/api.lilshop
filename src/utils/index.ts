import dotenv from "dotenv"
import moment from "moment-timezone"

export const currentTime = new Date()
export const vietnamTimeZone = 'Asia/Ho_Chi_Minh';
export const dotenvInitialize = () => dotenv.config({})
export const momentTimeZone = moment().utcOffset('+07:00', true)
export * from "./encode"
export * from "./convert"
export * from "./slugify"
export * from "./sort-object"
export * from "./random"