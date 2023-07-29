"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertOrderByProduct = exports.convertOrderBy = exports.convertBoolean = void 0;
function convertBoolean(type) {
    let result;
    if (type === 'false')
        return result = false;
    if (type === 'true')
        return result = true;
    return result;
}
exports.convertBoolean = convertBoolean;
function convertOrderBy(type) {
    let result;
    if (!type || type === 'desc')
        return result = 'desc';
    if (type === 'asc')
        return result = 'asc';
    return result;
}
exports.convertOrderBy = convertOrderBy;
function convertOrderByProduct(type) {
    let orderBy = { 'created_at': 'desc' };
    switch (type) {
        case 'created_at':
            return orderBy = { 'created_at': 'asc' };
        case 'price':
            return orderBy = { 'price_special': 'asc' };
        case '-price':
            return orderBy = { 'price_special': 'desc' };
        case 'price_original':
            return orderBy = { 'price_original': 'asc' };
        case '-price_original':
            return orderBy = { 'price_original': 'desc' };
        default:
            break;
    }
    return orderBy;
}
exports.convertOrderByProduct = convertOrderByProduct;
