"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putLogs = exports.errHandler = void 0;
const errHandler = (err, req, res, next) => {
    let error = { ...err };
    if (err.statusCode === 400) {
        error.statusCode = 400;
        error.message = err.message;
        (0, exports.putLogs)(req, err.statusCode, err.message);
    }
    if (err.statusCode === 401) {
        error.statusCode = 401;
        error.message = err.message;
        (0, exports.putLogs)(req, err.statusCode, err.message);
    }
    if (err.statusCode === 403) {
        error.statusCode = 403;
        error.message = err.message;
        (0, exports.putLogs)(req, err.statusCode, err.message);
    }
    if (err.statusCode === 404) {
        error.statusCode = 404;
        error.message = err.message;
        (0, exports.putLogs)(req, err.statusCode, err.message);
    }
    if (err.statusCode === 502) {
        error.statusCode = 502;
        error.message = err.message;
        (0, exports.putLogs)(req, err.statusCode, err.message);
    }
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Server Error';
    res.status(statusCode).json({
        statusCode,
        message
    });
    if (statusCode === 500) {
        (0, exports.putLogs)(req, 500, 'Server Error');
    }
};
exports.errHandler = errHandler;
const putLogs = (req, statusCode, message) => {
    // return console.log(req.originalUrl, req.headers, statusCode, message)
};
exports.putLogs = putLogs;
