import { PathRequest } from "~/swagger/type"

export const postRoleSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    permissions: {
      type: 'array',
      items:{
        type:'integer'
      },
      example:'[]'
    }
  }
}
export const postRole: PathRequest = {
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
}