"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../v1/controllers");
const middlewares_1 = require("../../middlewares");
const route = (0, express_1.Router)();
route.post('/', middlewares_1.authMiddleware.authentication, middlewares_1.authMiddleware.role, (0, middlewares_1.asyncMiddleware)(controllers_1.permissionController.create));
route.get('/', middlewares_1.authMiddleware.authentication, middlewares_1.authMiddleware.role, (0, middlewares_1.asyncMiddleware)(controllers_1.permissionController.findAll));
exports.default = route;
