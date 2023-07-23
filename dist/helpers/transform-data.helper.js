"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationData = exports.transformDataHelper = void 0;
const transformDataHelper = (context) => {
    return {
        statusCode: 200,
        context
    };
};
exports.transformDataHelper = transformDataHelper;
const paginationData = (data, total, page, limit) => {
    const context = {
        data,
        total,
        total_page: Math.ceil(total / limit),
        prev_page: page - 1 > 0 ? page - 1 : 0,
        current_page: page,
        next_page: page + 1 > Math.ceil(total / limit) ? Math.ceil(total / limit) : page + 1
    };
    return context;
};
exports.paginationData = paginationData;
