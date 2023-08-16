import { PathRequest } from "../type";

export const getOrdersAdmin: PathRequest = {
  tags: ['Order'],
  summary: 'v1/orders.GET',
  security: [{ bearerAuth: [] }],
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
    // {
    //   in: 'query',
    //   name: 'search',
    //   type: 'string',
    //   description: 'Support order id, customer name, customer telephone',
    //   required: false
    // },
  ],
  responses: {
    '200': { description: 'Return list of order' }
  }
}
export const getOrderAdmin: PathRequest = {
  tags: ['Order'],
  summary: 'v1/orders/:id.GET',
  security: [{ bearerAuth: [] }],
  parameters: [
    { in: 'path', name: 'id', description: 'Order id', type: 'integer', required: true }
  ],
  responses: {
    '200': { description: 'Return order' }
  }
}
export const postOrderAdmin: PathRequest = {
  tags: ['Order'],
  summary: 'v1/orders.POST',
  security: [
    { bearerAuth: [] }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/postOrderSchema',
        }
      }
    },
    required: true
  },
  responses: {
    '200': { description: 'Return new order' }
  }
}