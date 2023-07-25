"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errHandler = void 0;
const helpers_1 = require("../helpers");
const errHandler = (err, req, res, next) => {
    let error = { ...err };
    if (err.statusCode === 400) {
        error.statusCode = 400;
        error.message = err.message;
        (0, helpers_1.pushLogErrorDiscord)(req, err.statusCode, err.message);
    }
    if (err.statusCode === 401) {
        error.statusCode = 401;
        error.message = err.message;
        (0, helpers_1.pushLogErrorDiscord)(req, err.statusCode, err.message);
    }
    if (err.statusCode === 403) {
        error.statusCode = 403;
        error.message = err.message;
        (0, helpers_1.pushLogErrorDiscord)(req, err.statusCode, err.message);
    }
    if (err.statusCode === 404) {
        error.statusCode = 404;
        error.message = err.message;
        (0, helpers_1.pushLogErrorDiscord)(req, err.statusCode, err.message);
    }
    if (err.statusCode === 502) {
        error.statusCode = 502;
        error.message = err.message;
        (0, helpers_1.pushLogErrorDiscord)(req, err.statusCode, err.message);
    }
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Server Error';
    res.status(statusCode).json({
        statusCode,
        message
    });
    if (statusCode === 500) {
        (0, helpers_1.pushLogErrorDiscord)(req, 500, 'Server Error');
    }
};
exports.errHandler = errHandler;
