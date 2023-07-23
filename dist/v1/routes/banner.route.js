"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../v1/controllers");
const middlewares_1 = require("../../middlewares");
const bannerRoute = (0, express_1.Router)();
bannerRoute.post('/', middlewares_1.authMiddleware.authentication, middlewares_1.authMiddleware.role, controllers_1.bannerController.create);
bannerRoute.put('/:id', middlewares_1.authMiddleware.authentication, middlewares_1.authMiddleware.role, controllers_1.bannerController.update);
exports.default = bannerRoute;
