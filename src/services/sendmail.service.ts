import sgMail from "@sendgrid/mail"
import path from "path"
import { forgotTemplate } from "~/templates/mail"
import fs from "fs"
import { handlebars } from "hbs"
import moment from "moment"
import { fmPrice } from "~/utils"

export class SendmailService {
  emailTemplateOrder = fs.readFileSync(path.join(__dirname, "../templates/order-mail.hbs"), "utf-8")
  templateOrder = handlebars.compile(this.emailTemplateOrder)
  async forgot(email: string, token: string, platform: 'CLIENT' | 'ADMIN') {
    sgMail.setApiKey(process.env.SEND_GRID_MAIL_KEY || '')
    return sgMail.send({
      to: email,
      from: process.env.SEND_GRID_MAIL_ORIGIN || '',
      subject: 'Forgot password | Fashional Shop',
      html: forgotTemplate(
        email,
        platform === "CLIENT" ?
          `${process.env.SEND_MAIL_REDIRECT_URL_CLIENT}?token=${token}`
          :
          `${process.env.SEND_MAIL_REDIRECT_URL_ADMIN}?token=${token}`
      ),
    })
  }
  async sendBillOrder(order: any) {
    try {
      sgMail.setApiKey(process.env.SEND_GRID_MAIL_KEY || '')
      const products = order.products.map((item: any) => ({
        image_url: item.product.thumbnail_url,
        name: item.product.name,
        quantity: item.quantity,
        total_price_item: item.price_order,
        price_item: fmPrice(item.price_order / item.quantity)
      }))
      return sgMail.send({
        to: order.account.email,
        from: process.env.SEND_GRID_MAIL_ORIGIN || '',
        subject: 'Thông tin đơn hàng | Fashional Shop',
        html: this.templateOrder({
          order_id: order.id,
          created_at: moment(order.created_at).format('HH:mm DD/MM/YYYY'),
          total_amount: fmPrice(order.amount),
          user_telephone: order.delivery_address?.consignee_s_telephone || order.account?.telephone,
          user_delivery_address: `${order.delivery_address?.short_address},${order.delivery_address?.ward?.name},${order.delivery_address?.district?.name},${order.delivery_address?.province?.name}`,
          payment_method: order.payment_method.name,
          products: products
        })
      })
    } catch (error) {

    }
  }
}