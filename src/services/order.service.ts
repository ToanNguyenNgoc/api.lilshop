import moment from "moment";
import { prismaClient } from "~/prisma-client";
import { encode } from "~/utils";

export class OrderService {
  static methodCash(order_id: number, amount: number, description: string) {
    const transaction_txn = encode(`${moment().format('DDHHmmss')}-${moment().milliseconds()}-${order_id}`);
    const createDate = moment().format('YYYYMMDDHHmmss');
    return prismaClient.paymentGateway.create({
      data: {
        amount,
        transaction: createDate,
        transaction_txn,
        order_id,
        description
      }
    })
  }
}