"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEY = void 0;
const utils_1 = require("../utils");
(0, utils_1.dotenvInitialize)();
exports.KEY = {
    SPA: process.env.SPA || ''
};
