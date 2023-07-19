"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
(0, utils_1.dotenvInitialize)();
const generateToken = (id, isManager) => {
    const accessToken = jsonwebtoken_1.default.sign({
        id: id,
        manager: isManager
    }, process.env.JWT_SECRET_KET || 'jwt', { expiresIn: '10d' });
    return accessToken;
};
exports.generateToken = generateToken;
