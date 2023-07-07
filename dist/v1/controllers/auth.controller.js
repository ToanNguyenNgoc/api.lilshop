"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const dto_1 = require("../../v1/dto");
const class_validator_1 = require("class-validator");
class AuthController {
    async login(req, res, next) {
        const body = new dto_1.LoginDTO();
        body.email = req.body.email;
        body.password = req.body.password;
        const errors = await (0, class_validator_1.validate)(body);
        if (errors.length > 0) {
            return res.status(200).json({ data: errors.map(i => i.constraints) });
        }
        return res.status(200).json({ data: body });
    }
    async register(req, res) {
        return res.status(200).json({ data: '' });
    }
    async profile(req, res) {
        return;
    }
}
exports.authController = new AuthController();
