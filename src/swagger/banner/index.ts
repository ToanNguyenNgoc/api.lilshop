import { PathRequest } from "~/swagger/type";

export const postBanner: PathRequest = {
  tags: ['Banner'],
  summary: 'api.banners.POST',
  responses: {
    '200': { description: 'Return new banner' }
  }
}