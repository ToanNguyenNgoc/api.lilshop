"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountController = void 0;
const client_1 = require("@prisma/client");
const exceptions_1 = require("../../exceptions");
const helpers_1 = require("../../helpers");
const utils_1 = require("../../utils");
const account_dto_1 = require("../../v1/dto/account.dto");
const prisma = new client_1.PrismaClient();
class AccountController {
    async findAll(req, res) {
        const page = Number(req.query.page || 1);
        const limit = Number(req.query.limit || 15);
        const search = req.query.search;
        const includes = typeof req.query.includes === 'string' ? req.query.includes.trim().split('|') : [];
        const filter = {
            OR: [
                { fullname: { contains: search ? search : '' } },
                { email: { contains: search ? search : '' } },
                { telephone: { startsWith: search ? search : '' } },
            ],
            AND: [
                { deleted: false },
                { status: (0, utils_1.convertBoolean)(req.query.status) },
                { manager: (0, utils_1.convertBoolean)(req.query.manager) }
            ]
        };
        const [data, total] = await prisma.$transaction([
            prisma.account.findMany({
                select: {
                    fullname: true, email: true, telephone: true, status: true, deleted: true, created_at: true, updated_at: true, manager: true,
                    roles: includes.includes('roles') && { select: { role: true } }
                },
                skip: ((page * limit) - limit),
                take: limit,
                where: filter,
                orderBy: { created_at: (0, utils_1.convertOrderBy)(req.query.created_at) },
            }),
            prisma.account.count({ where: filter })
        ]);
        return res.send((0, helpers_1.transformDataHelper)((0, helpers_1.paginationData)(data, total, page, limit)));
    }
    async findById(req, res) {
        const id = Number(req.params.id);
        const response = await prisma.account.findFirst({
            where: { id: id, deleted: false },
            select: {
                fullname: true, email: true, telephone: true, status: true,
                deleted: true, created_at: true, updated_at: true, manager: true,
                roles: { select: { role: true } }
            }
        });
        if (!response)
            throw new exceptions_1.ErrorException(404, 'Resource not found');
        return res.send((0, helpers_1.transformDataHelper)(response));
    }
    async update(req, res) {
        const id = Number(req.params.id);
        const body = new account_dto_1.UpdateAccountDTO();
        body.fullname = req.body.fullname;
        body.email = req.body.email;
        body.telephone = req.body.telephone;
        body.status = req.body.status;
        body.roles = req.body.roles || [];
        await (0, helpers_1.validatorHelper)(body);
        const response = await prisma.account.update({
            where: { id: id },
            data: {
                ...body,
                roles: {
                    deleteMany: {},
                    create: body.roles.map(i => ({
                        role: {
                            connect: {
                                id: i
                            }
                        }
                    }))
                }
            }
        });
        return res.send((0, helpers_1.transformDataHelper)(response));
    }
}
exports.accountController = new AccountController();
