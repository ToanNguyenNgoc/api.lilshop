"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.generatePassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const generatePassword = async (password) => {
    const salt = await bcrypt_1.default.genSalt(5);
    const password_hashed = await bcrypt_1.default.hash(password, salt);
    return password_hashed;
};
exports.generatePassword = generatePassword;
const comparePassword = async (newPass, oldPass) => bcrypt_1.default.compare(newPass, oldPass);
exports.comparePassword = comparePassword;
