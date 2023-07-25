"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const account_route_1 = __importDefault(require("../../v1/routes/account.route"));
const auth_route_1 = __importDefault(require("../../v1/routes/auth.route"));
const banner_route_1 = __importDefault(require("../../v1/routes/banner.route"));
const initial_route_1 = __importDefault(require("../../v1/routes/initial.route"));
const role_route_1 = __importDefault(require("../../v1/routes/role.route"));
const permission_route_1 = __importDefault(require("../../v1/routes/permission.route"));
const upload_route_1 = __importDefault(require("../../v1/routes/upload.route"));
const media_route_1 = __importDefault(require("../../v1/routes/media.route"));
const province_route_1 = __importDefault(require("../../v1/routes/province.route"));
const district_route_1 = __importDefault(require("../../v1/routes/district.route"));
const initializeRouteV1 = (app) => {
    app.use('/v1/accounts', account_route_1.default);
    app.use('/v1/auth', auth_route_1.default);
    app.use('/v1/banners', banner_route_1.default);
    app.use('/v1/initial', initial_route_1.default);
    app.use('/v1/roles', role_route_1.default);
    app.use('/v1/permissions', permission_route_1.default);
    app.use('/v1/upload', upload_route_1.default);
    app.use('/v1/provinces', province_route_1.default);
    app.use('/v1/districts', district_route_1.default);
    app.use('/media', media_route_1.default);
};
exports.default = initializeRouteV1;
