"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
(0, utils_1.dotenvInitialize)();
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
    role: (req, res, next) => {
        const user = req.user;
        if (!user.manager)
            return res.send({ statusCode: 403, message: 'You do not have the right roles' });
        if (user.manager) {
            next();
        }
    }
};
