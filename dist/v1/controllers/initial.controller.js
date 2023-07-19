"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialController = exports.InitialController = void 0;
const client_1 = require("@prisma/client");
const lodash_1 = require("lodash");
const exceptions_1 = require("../../exceptions");
const helpers_1 = require("../../helpers");
const utils_1 = require("../../utils");
const dto_1 = require("../../v1/dto");
const prisma = new client_1.PrismaClient();
(0, utils_1.dotenvInitialize)();
class InitialController {
    async createAccount(req, res) {
        const accountCount = await prisma.account.count();
        if (accountCount > 0)
            throw new exceptions_1.ErrorException(403, 'Initial account is initialized');
        const newAccount = new dto_1.RegisterDTO();
        newAccount.email = req.body.email;
        newAccount.fullname = req.body.fullname;
        newAccount.telephone = req.body.telephone;
        newAccount.password = await (0, helpers_1.generatePassword)(req.body.password);
        newAccount.manager = true;
        const response = await prisma.account.create({
            data: {
                ...newAccount,
                roles: {
                    create: [
                        {
                            role: {
                                create: {
                                    name: 'Super Admin',
                                    code: (0, utils_1.encode)(process.env.SPA || '')
                                }
                            }
                        }
                    ]
                }
            }
        });
        return res.send((0, helpers_1.transformDataHelper)((0, lodash_1.omit)(response, 'password')));
    }
}
exports.InitialController = InitialController;
exports.initialController = new InitialController();
