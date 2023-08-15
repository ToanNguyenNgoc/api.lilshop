import { dotenvInitialize } from "~/utils"

dotenvInitialize()
const oneDay = 24 * 60 * 60
export const KEY = {
  SPA: process.env.SPA || ''
}
export const COOKIE_AGE = oneDay * 30 * 1000 //Convert to milliseconds
export const ORDER_DELIVERY = {
  INIT: {
    key: 'INITIALIZATION',
    txt: 'Đơn hàng được khởi tạo'
  },
  CONF: {
    key: 'CONFIRM',
    txt: 'Đã xác nhận'
  },
  SHIP: {
    key: 'SHIPPING',
    txt: 'Đang giao hàng'
  },
  SUCCESS: {
    key: 'SUCCESS',
    txt: 'Đã giao thành công'
  },
  REJECT: {
    key: 'REJECT',
    txt: 'Giao hàng thất bại'
  }
}