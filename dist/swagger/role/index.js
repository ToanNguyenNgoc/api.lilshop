"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRole = exports.putRole = exports.postRole = exports.getDetailRole = exports.getRole = exports.putRoleSchema = exports.postRoleSchema = void 0;
exports.postRoleSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        permissions: {
            type: 'array',
            items: {
                type: 'integer'
            },
        }
    }
};
exports.putRoleSchema = {
    ...exports.postRoleSchema,
    properties: {
        ...exports.postRoleSchema.properties,
        status: {
            type: 'boolean',
            example: true
        }
    }
};
exports.getRole = {
    tags: ['Role & Permission'],
    summary: 'v1/roles.GET',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        { in: 'query', name: 'includes', description: 'Includes: permissions', default: 'permissions', required: false }
    ],
    responses: {
        '200': { description: 'Return list of role' }
    }
};
exports.getDetailRole = {
    tags: ['Role & Permission'],
    summary: 'v1/roles/:id.GET',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        { in: 'path', name: 'id', description: 'Role id', required: true }
    ],
    responses: {
        '200': { description: 'Return detail role' }
    }
};
exports.postRole = {
    tags: ['Role & Permission'],
    summary: 'v1/roles.POST',
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
exports.putRole = {
    tags: ['Role & Permission'],
    summary: 'v1/roles.PUT',
    parameters: [
        {
            in: 'path',
            name: 'id',
            required: true,
            description: 'Role id'
        }
    ],
    security: [
        {
            bearerAuth: []
        }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/putRoleSchema',
                }
            }
        },
        required: true
    },
    responses: {
        '200': { description: 'Return new role is updated' }
    }
};
exports.deleteRole = {
    tags: ['Role & Permission'],
    summary: 'v1/roles.DELETE',
    parameters: [
        {
            in: 'path',
            name: 'id',
            required: true,
            description: 'Role id'
        }
    ],
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        '200': { description: 'Delete role' }
    }
};
