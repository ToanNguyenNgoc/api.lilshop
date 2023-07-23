"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertOrderBy = exports.convertBoolean = void 0;
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
