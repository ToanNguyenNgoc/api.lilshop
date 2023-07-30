import { PathRequest } from "~/swagger/type";

export const postProductSizeSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' }
  }
}
export const putProductSizeSchema = Object.assign(
  postProductSizeSchema,
  Object.assign(
    postProductSizeSchema.properties,
    {
      status: { type: 'boolean' }
    }
  )
)

export const getProductSize: PathRequest = {
  tags: ['Product & Product media & Product size'],
  summary: 'v1/products/:id/sizes.GET',
  parameters: [
    { in: 'path', name: 'id', type: 'integer', description: 'Product id', required: true },
  ],
  responses: {
    '200': { description: 'Return product size by product id' }
  }
}
export const postProductSize: PathRequest = {
  tags: ['Product & Product media & Product size'],
  summary: 'v1/products/:id/sizes.POST',
  security: [{ bearerAuth: [] }],
  parameters: [
    { in: 'path', name: 'id', type: 'integer', description: 'Product id', required: true },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/postProductSizeSchema',
        }
      }
    },
    required: true
  },
  responses: {
    '200': { description: 'Return new product size by product id' }
  }
}
export const putProductSize: PathRequest = {
  tags: ['Product & Product media & Product size'],
  summary: 'v1/products/:id/sizes/:id.PUT',
  security: [{ bearerAuth: [] }],
  parameters: [
    { in: 'path', name: 'id', type: 'integer', description: 'Product id', required: true },
    { in: 'path', name: 'child_id', type: 'integer', description: 'Product size id', required: true },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/putProductSizeSchema',
        }
      }
    },
    required: true
  },
  responses: {
    '200': { description: 'Return new product size by id' }
  }
}
export const deleteProductSize: PathRequest = {
  tags: ['Product & Product media & Product size'],
  summary: 'v1/products/:id/sizes.DELETE',
  security: [{ bearerAuth: [] }],
  parameters: [
    { in: 'path', name: 'id', type: 'integer', description: 'Product id', required: true },
    { in: 'path', name: 'child_id', type: 'integer', description: 'Product size id', required: true },
  ],
  responses: {
    '200': { description: 'Return delete product size by id' }
  }
}