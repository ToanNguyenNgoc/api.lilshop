"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPermissions = exports.postPermission = exports.postPermissionSchema = void 0;
exports.postPermissionSchema = {
    type: 'array',
    items: {
        type: 'string',
    },
    example: '["accounts","roles","permissions","banners"]'
};
exports.postPermission = {
    tags: ['Role & Permission'],
    summary: 'v1/permissions.POST',
    security: [
        {
            bearerAuth: []
        }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/postPermissionSchema',
                }
            }
        },
        required: true
    },
    responses: {
        '200': { description: 'Return new permissions' }
    }
};
exports.getPermissions = {
    tags: ['Role & Permission'],
    summary: 'v1/permissions.GET',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        '200': { description: 'Return permissions' }
    }
};
