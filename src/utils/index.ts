import dotenv from "dotenv"
import moment from "moment-timezone"

export const currentTime = new Date()
export const vietnamTimeZone = 'Asia/Ho_Chi_Minh';
export const dotenvInitialize = () => dotenv.config({})
export const momentTimeZone = moment.tz(currentTime, vietnamTimeZone)

export * from "./encode"
export * from "./convert"
export * from "./slugify"
export * from "./sort-object"