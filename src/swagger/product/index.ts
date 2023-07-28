import { PathRequest } from "~/swagger/type"

export const postProductSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    price_original: { type: 'integer' },
    price: { type: 'integer' },
    price_special: { type: 'integer' },
    short_content: { type: 'string' },
    media_ids: {
      type: 'array',
      items: {
        type: 'number'
      }
    }
  },
}
export const postProduct: PathRequest = {
  tags: ['Product'],
  summary: 'v1/products.POST',
  security: [
    { bearerAuth: [] }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/postProductSchema',
        }
      }
    },
    required: true
  },
  responses: { '200': { description: 'Return new product' } }
}
export const getProduct: PathRequest = {
  tags: ['Product'],
  summary: 'v1/products.GET',
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
      description: 'Support name',
      required: false
    },
    {
      in: 'query',
      name: 'branch_id',
      type: 'integer',
      description: 'Filter branch id',
      required: false
    },
    {
      in: 'query',
      name: 'category_id',
      type: 'integer',
      description: 'Filter category id',
      required: false
    },
    {
      in: 'query',
      name: 'min_price',
      type: 'integer',
      description: 'Min price',
      required: false
    },
    {
      in: 'query',
      name: 'max_price',
      type: 'integer',
      description: 'Max price',
      required: false
    },
    {
      in: 'query',
      name: 'min_price_original',
      type: 'integer',
      description: 'Min price original',
      required: false
    },
    {
      in: 'query',
      name: 'max_price_original',
      type: 'integer',
      description: 'Max price original',
      required: false
    },
    {
      in: 'query',
      name: 'includes',
      type: 'string',
      description: 'Includes: media|created_by',
      required: false
    },
    {
      in: 'query',
      name: 'sort',
      type: 'string',
      description: 'Sort: -created_at(desc), created_at(asc),' +
        '-price(desc), price(asc), -price_original(desc), price_original(asc), ',
      required: false,
      schema: {
        type: 'string',
        enum: ['-created_at', 'created_at', 'price', '-price', 'price_original', '-price_original']
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
  ],
  responses: {
    '200': { description: 'Return list of product' }
  }
}