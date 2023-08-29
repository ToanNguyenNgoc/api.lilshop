import { PathRequest } from "../type"

export const postOrderDeliverySchema = {
  type: 'object',
  properties: {
    status_name: { type: 'string' },
    note: { type: 'string' }
  }
}
export const postOrderDelivery: PathRequest = {
  tags: ['Order'],
  summary: 'v1/orders/:id/deliveries.POST',
  security: [{ bearerAuth: [] }],
  parameters: [
    { in: 'path', name: 'id', type: 'integer', description: 'Order id', required: true }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/postOrderDeliverySchema',
        }
      }
    },
    required: true
  },
  responses: {
    '200': { description: 'Return new order delivery by order id' }
  }
}