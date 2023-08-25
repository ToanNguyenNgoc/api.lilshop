import { BANNER_TYPE } from "~/constants";
import { PathRequest } from "~/swagger/type";

export const postBannerSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    image_url: { type: 'string' },
    type: { type: 'string' },
    product_id: { type: 'integer' },
    html_template: { type: 'string', example: '<div></div>' },
    url: { type: 'string' },
    keyword: { type: 'string' },
    priority: { tye: 'integer' }
  }
}
export const putBannerSchema = {
  type: 'object',
  properties: { ...postBannerSchema.properties, status: { type: 'boolean' } }
}
export const postBanner: PathRequest = {
  tags: ['Banner'],
  summary: 'v1/banners.POST',
  security: [{ bearerAuth: [] }],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/postBannerSchema',
        }
      }
    },
    required: true
  },
  responses: {
    '200': { description: 'Return new banner' }
  }
}
export const putBanner: PathRequest = {
  tags: ['Banner'],
  summary: 'v1/banners/:id.PUT',
  security: [
    { bearerAuth: [] }
  ],
  parameters: [
    {
      name: 'id',
      type: 'integer',
      in: 'path',
      description: 'The banner id',
      required: true
    }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/putBannerSchema',
        }
      }
    },
    required: true
  },
  responses: {
    '200': { description: 'Return banner is updated' }
  }
}
export const getBanners: PathRequest = {
  tags: ['Banner'],
  summary: 'v1/banners.GET',
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
      name: 'type',
      type: 'string',
      description: 'Filter: banner type',
      required: false,
      schema: {
        type: 'string',
        enum: BANNER_TYPE
      }
    },
    {
      in: 'query',
      name: 'sort',
      type: 'string',
      description: 'sort',
      required: false,
      schema: {
        type: 'string',
        enum: ['-created_at', 'created_at', 'priority', '-priority']
      }
    },
  ],
  responses: {
    '200': { description: 'Return list of banner' }
  }
}
export const getBanner: PathRequest = {
  tags: ['Banner'],
  summary: 'v1/banners/:id.GET',
  parameters: [
    { in: 'path', name: 'id', type: 'integer', description: 'Banner id', required: true }
  ],
  responses: {
    '200': { description: 'Return banner by id' }
  }
}
export const deleteBanner: PathRequest = {
  tags: ['Banner'],
  summary: 'v1/banners/:id.DELETE',
  parameters: [
    { in: 'path', name: 'id', type: 'integer', description: 'Banner id', required: true }
  ],
  responses: {
    '200': { description: 'Return delete banner' }
  }
}