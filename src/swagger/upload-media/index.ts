import { PathRequest } from "~/swagger/type";

export const uploadMedia: PathRequest = {
  tags: ['Upload & Media'],
  summary: 'v1/upload/media.POST',
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
              nullable: true
            }
          }
        }
      }
    }
  },
  responses: {
    '200': { description: 'Return new media upload' }
  }
}
export const uploadMediaMultiple = {
  tags: ['Upload & Media'],
  summary: 'v1/upload/media_multiple.POST',
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            files: {
              type: 'array',
              items: {
                type: 'string',
                format: 'binary',
                nullable: true
              }
            }
          }
        }
      }
    }
  },
  responses: {
    '200': { description: 'Return list of media' }
  }
}