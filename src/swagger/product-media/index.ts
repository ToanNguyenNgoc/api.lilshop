import { PathRequest } from "~/swagger/type";

export const postProductMediaSchema = {
  type: 'object',
  properties: {
    media_ids: {
      type: 'array',
      items: {
        type: 'number'
      }
    }
  }
}

export const getProductMedia: PathRequest = {
  tags: ['Product & Product media & Product size'],
  summary: 'v1/products/:id/medias.GET',
  parameters: [
    { in: 'path', name: 'id', type: 'integer', description: 'Product id', required: true },
  ],
  responses: {
    '200': { description: 'Return product media by product id' }
  }
}
export const postProductMedia: PathRequest = {
  tags: ['Product & Product media & Product size'],
  summary: 'v1/products/:id/medias.POST',
  security: [{ bearerAuth: [] }],
  parameters: [
    { in: 'path', name: 'id', type: 'integer', description: 'Product id', required: true },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/postProductMediaSchema',
        }
      }
    },
    required: true
  },
  responses: {
    '200': { description: 'Return new product media by product id' }
  }
}
export const deleteProductMedia: PathRequest = {
  tags: ['Product & Product media & Product size'],
  summary: 'v1/products/:id/medias.DELETE',
  security: [{ bearerAuth: [] }],
  parameters: [
    { in: 'path', name: 'id', type: 'integer', description: 'Product id', required: true },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/postProductMediaSchema',
        }
      }
    },
    required: true
  },
  responses: {
    '200': { description: 'Return new product media by product id' }
  }
}