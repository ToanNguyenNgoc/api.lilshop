import { PathRequest } from "~/swagger/type";

export const postPermissionSchema = {
  type: 'array',
  items: {
    type: 'string',
  },
  example: '['
    + '"accounts","roles","permissions","banners","branches","products","products branches"'
    + ',"products medias","products sizes","tags","categories"'
    + ',"orders","orders deliveries","paymentmethods"'
    + ']'
}
export const postPermission: PathRequest = {
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
}
export const getPermissions = {
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
}