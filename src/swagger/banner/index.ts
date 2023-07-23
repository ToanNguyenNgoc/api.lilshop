import { PathRequest } from "~/swagger/type";

export const postBanner: PathRequest = {
  tags: ['Banner'],
  summary: 'v1/banners.POST',
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
  responses: {
    '200': { description: 'Return banner is updated' }
  }
}