import sgMail from "@sendgrid/mail"
import { forgotTemplate, orderTemplate } from "~/templates/mail"

export class SendmailService {
    static async forgot(email: string, token: string, platform: 'CLIENT' | 'ADMIN') {
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
    static async sendBillOrder() {
        sgMail.setApiKey(process.env.SEND_GRID_MAIL_KEY || '')
        return
    }
}