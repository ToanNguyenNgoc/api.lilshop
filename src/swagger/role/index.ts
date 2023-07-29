import { PathRequest } from "~/swagger/type"

export const postRoleSchema = {
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
}
export const putRoleSchema = {
  ...postRoleSchema,
  properties: {
    ...postRoleSchema.properties,
    status: {
      type: 'boolean',
      example: true
    }
  }
}
export const getRole: PathRequest = {
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
}
export const getDetailRole: PathRequest = {
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
}
export const postRole: PathRequest = {
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
}
export const putRole: PathRequest = {
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
}
export const deleteRole: PathRequest = {
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
}