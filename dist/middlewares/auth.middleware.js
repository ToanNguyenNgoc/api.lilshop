"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
const client_1 = require("@prisma/client");
const constants_1 = require("../constants");
(0, utils_1.dotenvInitialize)();
const prisma = new client_1.PrismaClient();
exports.authMiddleware = {
    authentication: async (req, res, next) => {
        const authorization = req.headers.authorization;
        if (!authorization)
            return res.send({ statusCode: 401, message: 'Unauthenticated' });
        const accessToken = authorization.split(" ")[1];
        jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET_KET || 'jwt', async (err, user) => {
            if (err)
                return res.send({ statusCode: 401, message: 'Unauthenticated' });
            req.user = user;
            next();
        });
    },
    role: async (req, res, next) => {
        const user = req.user;
        if (!user.manager)
            return res.send({ statusCode: 403, message: 'You do not have the right roles' });
        if (user.manager) {
            const roles = await prisma.rolesOnAccounts.findMany({
                where: {
                    accountId: user.id
                },
                include: {
                    role: {
                        include: {
                            permissions: {
                                include: {
                                    permission: {
                                        select: { name: true, path: true }
                                    },
                                },
                            }
                        }
                    }
                }
            });
            const rolesCode = roles.map(i => i.role?.code) || [];
            if (rolesCode.includes((0, utils_1.encode)(constants_1.KEY.SPA || ''))) {
                next();
            }
            else {
                const permissions_user_path = roles.map(role => role.role.permissions.map(i => i.permission.path)).flat();
                const routePath = (req.baseUrl + req.route.path).replace(/^\/|\/$/g, '');
                const permissionRoutePath = `${routePath}.${req.method}`;
                if (permissions_user_path.includes(permissionRoutePath)) {
                    next();
                }
                else {
                    return res.send({ statusCode: 403, message: `You do not use method: ${req.method} with this request` });
                }
            }
        }
    },
};
