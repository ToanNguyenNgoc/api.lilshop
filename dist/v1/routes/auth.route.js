"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../v1/controllers/auth.controller");
const authRoute = (0, express_1.Router)();
authRoute.post('/login', auth_controller_1.authController.login);
authRoute.post('/register', auth_controller_1.authController.register);
authRoute.get('/profile', auth_controller_1.authController.profile);
exports.default = authRoute;
