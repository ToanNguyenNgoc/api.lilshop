"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../v1/controllers");
const middlewares_1 = require("../../middlewares");
const initialRoute = (0, express_1.Router)();
initialRoute.post('/account', (0, middlewares_1.asyncMiddleware)(controllers_1.initialController.createAccount));
exports.default = initialRoute;
