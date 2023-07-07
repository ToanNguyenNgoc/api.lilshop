"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AccountController {
    async register(req, res) {
        const response = await prisma.account.create({
            data: {
                fullname: 'Toan',
                password: '06011998',
                email: 'toanmeo@gmail.vn',
                telephone: '0392645740'
            }
        });
        return res.status(200).json({ data: response });
    }
    async findAll(req, res) {
        const data = await prisma.account.findMany();
        return res.status(200).json({ data: data });
    }
}
exports.accountController = new AccountController();
