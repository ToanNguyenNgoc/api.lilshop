import { PathRequest } from "~/swagger/type";

export const postBranchSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    media_id: { type: 'integer' },
    short_address: { type: 'string' },
    province_code: { type: 'integer' },
    district_code: { type: 'integer' },
    ward_code: { type: 'integer' },
    hotline: { type: 'string' },
    email: { type: 'string', example: 'string@gmail.com' },
    lat: { type: 'float', example: 10.00000 },
    long: { type: 'float', example: 20.00000 }
  },
}
export const putBranchSchema = {
  ...postBranchSchema,
  properties: {
    ...postBranchSchema.properties,
    status: { type: 'boolean' }
  }
}

export const getBranch: PathRequest = {
  tags: ['Branch'],
  summary: 'v1/branches.GET',
  parameters: [
    {
      in: 'query',
      name: 'page',
      type: 'integer',
      description: 'page',
      default: 1,
      required: false
    },
    {
      in: 'query',
      name: 'limit',
      type: 'integer',
      description: 'limit',
      default: 15,
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
      name: 'includes',
      type: 'string',
      description: 'Includes: media|province|district|ward',
      default: '',
      required: false
    },
    {
      in: 'query',
      name: 'created_at',
      type: 'string',
      required: false,
      schema: { type: 'string', enum: ['asc', 'desc'] },
      description: 'Sort created at',
    },
  ],
  responses: {
    '200': { description: 'Return list of branch' }
  }
}
export const getDetailBranch: PathRequest = {
  tags: ['Branch'],
  summary: 'v1/branches/:id.GET',
  parameters: [
    { in: 'path', name: 'id', type: 'integer', description: 'Branch id', required: true }
  ],
  responses: {
    '200': { description: 'Return branch detail by id' }
  }
}
export const postBranch: PathRequest = {
  tags: ['Branch'],
  summary: 'v1/branches.POST',
  security: [
    { bearerAuth: [] }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/postBranchSchema',
        }
      }
    },
    required: true
  },
  responses: { '200': { description: 'Return new branch' } }
}
export const putBranch: PathRequest = {
  tags: ['Branch'],
  summary: 'v1/branches/:id.PUT',
  security: [
    { bearerAuth: [] }
  ],
  parameters: [
    {
      in: 'path',
      name: 'id',
      description: 'Branch id',
      type: 'integer',
      required: true
    }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/putBranchSchema',
        }
      }
    },
    required: true
  },
  responses: { '200': { description: 'Return update branch' } }
}
export const deleteBranch: PathRequest = {
  tags: ['Branch'],
  summary: 'v1/branches/:id.DELETE',
  security: [{ bearerAuth: [] }],
  parameters: [
    { in: 'path', name: 'id', type: 'integer', description: 'Branch id', required: true }
  ],
  responses: {
    '200': { description: 'Return delete branch' }
  }
}