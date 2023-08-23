import { PathRequest } from "~/swagger/type";

export const postTagSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    type: { type: 'string' }
  }
}
export const putTagSchema = {
  ...postTagSchema,
  properties: {
    ...postTagSchema.properties,
    status: { type: 'boolean' }
  }
}
export const getTags: PathRequest = {
  tags: ['Tag'],
  summary: 'v1/tags.GET',
  parameters: [
    { in: 'query', name: 'page', type: 'integer', description: 'Page', default: 1, required: false },
    { in: 'query', name: 'limit', type: 'integer', description: 'Limit', default: 15, required: false },
    { in: 'query', name: 'type', type: 'string', description: 'Type', required: false },
    {
      in: 'query',
      name: 'sort',
      type: 'string',
      description: 'Sort: -created_at(desc), created_at(asc)',
      required: false,
      schema: {
        type: 'string',
        enum: ['-created_at', 'created_at']
      }
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
      description: 'Includes: categories',
      default: '',
      required: false
    },
  ],
  responses: {
    '200': { description: 'Return list of tag' }
  }
}
export const postTag: PathRequest = {
  tags: ['Tag'],
  summary: 'v1/tags.POST',
  security: [
    { bearerAuth: [] }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/postTagSchema',
        }
      }
    },
    required: true
  },
  responses: { '200': { description: 'Return new tag' } }
}
export const putTag: PathRequest = {
  tags: ['Tag'],
  summary: 'v1/tags/:id.PUT',
  security: [
    { bearerAuth: [] }
  ],
  parameters: [
    { in: 'path', name: 'id', type: 'integer', description: 'Tag id', required: true }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/putTagSchema',
        }
      }
    },
    required: true
  },
  responses: { '200': { description: 'Return tag' } }
}
export const getDetailTag: PathRequest = {
  tags: ['Tag'],
  summary: 'v1/tags/:id.GET',
  parameters: [
    { in: 'path', name: 'id', type: 'integer', description: 'Tag id, support tag name_slugify', required: true }
  ],
  responses: { '200': { description: 'Return tag' } }
}
export const deleteTag: PathRequest = {
  tags: ['Tag'],
  summary: 'v1/tags/:id.DELETE',
  security: [
    { bearerAuth: [] }
  ],
  parameters: [
    { in: 'path', name: 'id', type: 'integer', description: 'Tag id', required: true }
  ],
  responses: { '200': { description: 'Return delete tag' } }
}