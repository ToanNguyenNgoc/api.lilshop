"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleAuth = exports.profile = exports.register = exports.login = exports.registerSchema = exports.loginSchema = void 0;
exports.loginSchema = {
    type: 'object',
    properties: {
        email: { type: 'string' },
        password: { type: 'string' }
    }
};
exports.registerSchema = {
    type: 'object',
    properties: {
        fullname: { type: 'string' },
        telephone: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' }
    }
};
exports.login = {
    tags: ['Auth'],
    summary: 'Auth login',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/loginSchema',
                }
            }
        }
    },
    responses: {
        '200': { description: 'Return user information' }
    }
};
exports.register = {
    tags: ['Auth'],
    summary: 'Auth register',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/registerSchema',
                }
            }
        }
    },
    responses: {
        '200': { description: 'Return new user information' }
    }
};
exports.profile = {
    tags: ['Auth'],
    summary: 'Auth profile',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        '200': { description: 'Return user profile' }
    }
};
exports.roleAuth = {
    tags: ['Auth'],
    summary: 'Auth roles',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        '200': { description: 'Return user roles' }
    }
};
