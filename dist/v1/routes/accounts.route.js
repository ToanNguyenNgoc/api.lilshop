"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../v1/controllers");
const accountRoute = (0, express_1.Router)();
accountRoute.get('/register', controllers_1.accountController.register);
accountRoute.get('/', controllers_1.accountController.findAll);
exports.default = accountRoute;
