import sgMail from "@sendgrid/mail"
import { forgotTemplate } from "~/templates/mail"

export class SendmailService {
    static async forgot(email: string, token: string) {
        sgMail.setApiKey(process.env.SEND_GRID_MAIL_KEY || '')
        return sgMail.send({
            to: email,
            from: process.env.SEND_GRID_MAIL_ORIGIN || '',
            subject: 'Forgot password | Fashional Shop',
            html: forgotTemplate(email, `https://fashional.pro/forgot?token=${token}`),
        })
    }
}