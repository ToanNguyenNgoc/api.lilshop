"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorException = void 0;
class ErrorException extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.ErrorException = ErrorException;
