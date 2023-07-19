"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerController = void 0;
const helpers_1 = require("../../helpers");
class BannerController {
    create(req, res) {
        return res.send((0, helpers_1.transformDataHelper)('create banner'));
    }
}
exports.bannerController = new BannerController();
