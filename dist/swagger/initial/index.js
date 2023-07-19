"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAccountInit = exports.postAccountInitSchema = void 0;
exports.postAccountInitSchema = {
    type: 'object',
    properties: {
        fullname: { type: 'string' },
        email: { type: 'string' },
        telephone: { type: 'string' },
        password: { type: 'string' }
    }
};
exports.postAccountInit = {
    tags: ['Initial'],
    summary: 'API create first account',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/postAccountInitSchema',
                }
            }
        },
        required: true
    },
    responses: {
        '200': { description: 'Return first account information' }
    }
};
