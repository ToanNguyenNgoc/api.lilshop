"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRole = exports.postRoleSchema = void 0;
exports.postRoleSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        permissions: {
            type: 'array',
            items: {
                type: 'integer'
            },
            example: '[]'
        }
    }
};
exports.postRole = {
    tags: ['Initial'],
    summary: 'api.roles.POST',
    security: [
        {
            bearerAuth: []
        }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/postRoleSchema',
                }
            }
        },
        required: true
    },
    responses: {
        '200': { description: 'Return new role' }
    }
};
