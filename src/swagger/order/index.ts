import { PathRequest } from "../type";

export const postOrderAdminSchema = {
  type: 'object',
  properties: {
    address_id: { type: 'integer' },
    branch_id: { type: 'integer' },
    product_ids: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          product_id: { type: 'integer' },
          quantity: { type: 'integer' },
          product_size_id: { type: 'integer' }
        }
      }
    },
    payment_method_id: { type: 'integer' }
  }
}

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
    {
      in: 'query',
      name: 'includes',
      type: 'string',
      description: 'Includes: delivery_address|order_deliveries',
      required: false
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
    { in: 'path', name: 'id', description: 'Order id', type: 'integer' }
  ],
  responses: {
    '200': { description: 'Return order' }
  }
}
export const postOrder = {
  tags: ['Order'],
  summary: 'v1/orders.POST',
  security: [
    { bearerAuth: [] }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/postOrderAdminSchema',
        }
      }
    },
    required: true
  },
  responses: { '200': { description: 'Return new order' } }
}