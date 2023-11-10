import { PathRequest } from "~/swagger/type"

export const postCategorySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    tag_id: { type: 'integer' },
    image_url:{type:'string'}
  }
}
export const putCategorySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    tag_id: { type: 'integer' },
    image_url:{type:'string'},
    status: { type: 'boolean' }
  }
}
export const getCategories: PathRequest = {
  tags: ['Category'],
  summary: 'v1/categories.GET',
  parameters: [
    { in: 'query', name: 'page', type: 'integer', description: 'Page', default: 1, required: false },
    { in: 'query', name: 'limit', type: 'integer', description: 'Limit', default: 15, required: false },
    {
      in: 'query',
      name: 'tag_id',
      type: 'string',
      description: 'Filter tag id, support tag name slugify',
      required: false
    },
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
  ],
  responses: { '200': { description: 'Return list of category' } }
}
export const getCategory: PathRequest = {
  tags: ['Category'],
  summary: 'v1/categories/:id.GET',
  parameters: [
    { in: 'path', name: 'id', type: 'integer', description: 'Category id, support category name_slugify', required: true }
  ],
  responses: { '200': { description: 'Return category' } }
}
export const postCategory: PathRequest = {
  tags: ['Category'],
  summary: 'v1/categories.POST',
  security: [
    { bearerAuth: [] }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/postCategorySchema',
        }
      }
    },
    required: true
  },
  responses: { '200': { description: 'Return category' } }
}
export const putCategory: PathRequest = {
  tags: ['Category'],
  summary: 'v1/categories/:id.PUT',
  security: [
    { bearerAuth: [] }
  ],
  parameters: [
    { in: 'path', name: 'id', type: 'integer', description: 'Category id', required: true }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/putCategorySchema',
        }
      }
    },
    required: true
  },
  responses: { '200': { description: 'Return category' } }
}
export const deleteCategory: PathRequest = {
  tags: ['Category'],
  summary: 'v1/categories/:id.DELETE',
  security: [
    { bearerAuth: [] }
  ],
  parameters: [
    { in: 'path', name: 'id', type: 'integer', description: 'Category id', required: true }
  ],
  responses: { '200': { description: 'Return delete category' } }
}