"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accounts_route_1 = __importDefault(require("../../v1/routes/accounts.route"));
const auth_route_1 = __importDefault(require("../../v1/routes/auth.route"));
const initializeRouteV1 = (app) => {
    app.use('/v1/accounts', accounts_route_1.default);
    app.use('/v1/auth', auth_route_1.default);
};
exports.default = initializeRouteV1;
