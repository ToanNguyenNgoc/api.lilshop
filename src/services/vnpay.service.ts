import moment from "moment"
import { encode, sortObject } from "~/utils";
import * as querystring from "qs"
import { createHmac } from "crypto"
import { prismaClient } from "~/prisma-client";
import { Response, Request } from "express";
import axios from "axios";

export class VnPayService {
    static async createPaymentGateway(order_id: number, amount: number, bankCode: string, description: string) {
        const createDate = moment().format('YYYYMMDDHHmmss');
        const ipAddr = '::1'
        const tmnCode = process.env.VN_TMN_CODE;
        const secretKey = process.env.VN_SECRET_KEY || ''
        let vnpUrl = process.env.VN_CREATE_PAY_URL || ''
        const returnUrl = process.env.VN_RETURN_URL
        const transaction_txn = encode(`${moment().format('DDHHmmss')}-${moment().milliseconds()}-${order_id}`);
        const locale = 'vn';
        const currCode = 'VND';
        let vnp_Params: any = {};
        vnp_Params['vnp_Version'] = process.env.VN_PAY_VERSION;
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = transaction_txn;
        vnp_Params['vnp_OrderInfo'] = transaction_txn;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        vnp_Params['vnp_BankCode'] = bankCode;
        vnp_Params = sortObject(vnp_Params);
        const signData = querystring.stringify(vnp_Params, { encode: true });
        const hmac = createHmac('sha512', secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: true });
        const callbackUrl = process.env.VN_PAY_CALLBACK_URL
        const responseGateway = await prismaClient.paymentGateway.create({
            data: {
                transaction_txn,
                transaction: createDate,
                order_id: order_id,
                amount,
                payment_url: vnpUrl,
                callback_url: `${callbackUrl}?transaction_txn=${transaction_txn}`,
                description,
                secure_hash: signed,
            }
        })
        return responseGateway
    }
    static async checkoutPaymentGateway(req: Request, res: Response) {
        process.env.TZ = 'Asia/Ho_Chi_Minh'
        const callbackUrl = process.env.VN_PAY_CALLBACK_URL
        const vnp_TmnCode = process.env.VN_TMN_CODE;
        const secretKey = process.env.VN_SECRET_KEY;
        const vnp_Api = process.env.VN_PAY_API || '';

        const vnp_TxnRef = req.query.vnp_TxnRef as string;
        const vnp_TransactionDate = req.query.vnp_PayDate;
        const vnp_RequestId = moment().format('HHmmss');
        const vnp_Version = '2.1.0';
        const vnp_Command = 'querydr';
        const vnp_OrderInfo = 'Truy van GD ma:' + vnp_TxnRef;

        // const vnp_IpAddr = req.headers['x-forwarded-for'] ||
        //   req.connection.remoteAddress ||
        //   req.socket.remoteAddress
        const vnp_IpAddr = '::1'
        const currCode = 'VND';
        const vnp_CreateDate = moment().format('YYYYMMDDHHmmss');
        const data = vnp_RequestId + "|" + vnp_Version + "|" + vnp_Command + "|" + vnp_TmnCode + "|" + vnp_TxnRef + "|" + vnp_TransactionDate + "|" + vnp_CreateDate + "|" + vnp_IpAddr + "|" + vnp_OrderInfo;
        const hmac = createHmac("sha512", secretKey || '');
        const vnp_SecureHash = hmac.update(new Buffer(data, 'utf-8')).digest("hex");
        const dataObj = {
            'vnp_RequestId': vnp_RequestId,
            'vnp_Version': vnp_Version,
            'vnp_Command': vnp_Command,
            'vnp_TmnCode': vnp_TmnCode,
            'vnp_TxnRef': vnp_TxnRef,
            'vnp_OrderInfo': vnp_OrderInfo,
            'vnp_TransactionDate': vnp_TransactionDate,
            'vnp_CreateDate': vnp_CreateDate,
            'vnp_IpAddr': vnp_IpAddr,
            'vnp_SecureHash': vnp_SecureHash
        };
        const result = await axios.post(vnp_Api, dataObj)
        await prismaClient.paymentGateway.update({
            where: { transaction_txn: vnp_TxnRef },
            data: {
                status: result.data.vnp_TransactionStatus === "00" ? 'SUCCESS' : 'CANCEL'
            }
        })
        return res.redirect(`${callbackUrl}?transaction_txn=${vnp_TxnRef}`)
    }
}