"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const helpers_1 = require("../../helpers");
const dto_1 = require("../../v1/dto");
const client_1 = require("@prisma/client");
const lodash_1 = require("lodash");
const exceptions_1 = require("../../exceptions");
const prisma = new client_1.PrismaClient();
class AuthController {
    async login(req, res, next) {
        const body = new dto_1.LoginDTO();
        body.email = req.body.email;
        body.password = req.body.password;
        await (0, helpers_1.validatorHelper)(body);
        const response = await prisma.account.findUnique({
            where: {
                email: body.email
            }
        });
        if (!response)
            throw new exceptions_1.ErrorException(404, `Email ${body.email} is not registered`);
        if (!response.status)
            throw new exceptions_1.ErrorException(403, `Account is blocked`);
        const passwordMatch = await (0, helpers_1.comparePassword)(body.password, response.password);
        if (!passwordMatch)
            throw new exceptions_1.ErrorException(403, 'Password is wrong');
        const accessToken = (0, helpers_1.generateToken)(response.id, response.manager);
        res.send((0, helpers_1.transformDataHelper)((0, lodash_1.omit)({
            ...response,
            accessToken: accessToken
        }, 'password')));
    }
    async register(req, res) {
        const body = new dto_1.RegisterDTO();
        body.fullname = req.body.fullname;
        body.telephone = req.body.telephone;
        body.email = req.body.email;
        body.password = await (0, helpers_1.generatePassword)(req.body.password);
        body.manager = false;
        await (0, helpers_1.validatorHelper)(body);
        if (await prisma.account.findUnique({ where: { email: body.email } })) {
            throw new exceptions_1.ErrorException(403, `Email belong to another account`);
        }
        if (await prisma.account.findUnique({ where: { telephone: body.telephone } })) {
            throw new exceptions_1.ErrorException(403, `Telephone belong to another account`);
        }
        const result = await prisma.account.create({
            data: body
        });
        return res.send((0, helpers_1.transformDataHelper)((0, lodash_1.omit)(result, 'password')));
    }
    async profile(req, res) {
        const response = await prisma.account.findUnique({
            where: {
                id: req.user?.id
            }
        });
        return res.send((0, helpers_1.transformDataHelper)((0, lodash_1.omit)(response, 'password')));
    }
    async findRolesByUser(req, res) {
        const user = req.user;
        const includes = typeof req.query.includes === 'string' ? req.query.includes.trim().split('|') : [];
        const data = await prisma.rolesOnAccounts.findMany({
            where: { accountId: user.id },
            include: {
                role: {
                    select: {
                        id: true, name: true, status: true, deleted: true, updated_at: true, created_at: true, code: true,
                        permissions: includes.includes('permissions') && { select: { permission: true } }
                    }
                }
            }
        });
        return res.send((0, helpers_1.transformDataHelper)({ data }));
    }
}
exports.authController = new AuthController();
