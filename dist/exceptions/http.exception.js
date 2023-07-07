"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException {
    Success(res, data) {
        return res.status(200).json({
            statusCode: 200,
            data: data
        });
    }
    NotFound(res, message) {
        return res.status(404).json({
            statusCode: 404,
            message: message ?? 'Not found',
            error: 'Not Found'
        });
    }
    ServerError(res) {
        return res.status(500).json({
            statusCode: 500,
            message: 'Server error',
            error: 'Not Found'
        });
    }
}
exports.HttpException = HttpException;
