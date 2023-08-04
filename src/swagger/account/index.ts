import { PathRequest } from "~/swagger/type"

export const postAccountSchema = {
  type: 'object',
  properties: {
    fullname: { type: 'string' },
    email: { type: 'string' },
    avatar: { type: 'string' },
    password:{type:'string'},
    telephone: { type: 'string' },
    full_address: { type: 'string' },
    roles: {
      type: 'array',
      items: {
        type: 'number'
      }
    }
  }
}

export const putAccountSchema = {
  type: 'object',
  properties: {
    fullname: { type: 'string' },
    email: { type: 'string' },
    avatar: { type: 'string' },
    telephone: { type: 'string' },
    status: { type: 'string' },
    full_address: { type: 'string' },
    roles: {
      type: 'array',
      items: {
        type: 'number'
      }
    }
  }
}
export const getAccount: PathRequest = {
  tags: ['Account'],
  summary: 'v1/accounts.GET',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      in: 'query',
      name: 'page',
      type: 'integer',
      required: false,
      description: 'Page',
      default: 1
    },
    {
      in: 'query',
      name: 'limit',
      type: 'integer',
      required: false,
      description: 'limit',
      default: 15
    },
    {
      in: 'query',
      name: 'search',
      type: 'string',
      description: 'Support fullname, email, telephone',
      required: false
    },
    {
      in: 'query',
      name: 'status',
      type: 'string',
      description: 'Status filter: true (active) or false (inactive)',
      required: false,
      schema: {
        type: 'string',
        enum: ['false', 'true']
      }
    },
    {
      in: 'query',
      name: 'manager',
      type: 'string',
      required: false,
      schema: { type: 'string', enum: ['true', 'false'] },
      description: 'Manager filter: true (manager) or false (customer)',
    },
    {
      in: 'query',
      name: 'created_at',
      type: 'string',
      required: false,
      schema: { type: 'string', enum: ['asc', 'desc'] },
      description: 'Sort created at',
    },
    {
      in: 'query',
      name: 'includes',
      type: 'string',
      description: 'Includes: roles',
      default: 'roles',
      required: false
    }
  ],
  responses: {
    '200': { description: 'Return list of account' },
    '400': { description: 'Unauthenticated' },
    '403': { description: 'Forbidden' }
  }
}
export const getDetailAccount: PathRequest = {
  tags: ['Account'],
  summary: 'v1/accounts/:id.GET',
  security: [{ bearerAuth: [] }],
  parameters: [
    { in: 'path', name: 'id', type: 'integer', description: 'Account id', required: true }
  ],
  responses: {
    '200': { description: 'Return account detail by id' }
  }
}
export const postAccount: PathRequest = {
  tags: ['Account'],
  summary: 'v1/accounts.POST',
  security: [
    {
      bearerAuth: []
    }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/postAccountSchema',
        }
      }
    },
    required: true
  },
  responses: {
    '200': { description: 'Return new account' }
  }
}
export const putAccount: PathRequest = {
  tags: ['Account'],
  summary: 'v1/accounts/:id.PUT',
  parameters: [
    {
      in: 'path',
      name: 'id',
      required: true,
      description: 'Account id'
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
          $ref: '#/components/schemas/putAccountSchema',
        }
      }
    },
    required: true
  },
  responses: {
    '200': { description: 'Return new account is updated' }
  }
}
export const deleteAccount: PathRequest = {
  tags: ['Account'],
  summary: 'v1/accounts/:id.DELETE',
  security: [{ bearerAuth: [] }],
  parameters: [
    { in: 'path', name: 'id', type: 'integer', description: 'Account id', required: true }
  ],
  responses: {
    '200': { description: 'Return delete account' }
  }
}
