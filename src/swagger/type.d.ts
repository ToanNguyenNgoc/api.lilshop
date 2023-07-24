export type PathRequest = {
  tags: Array<string>,
  summary?: string,
  parameters?: Array<{
    name: string,
    in?: 'query' | 'path',
    type?: 'integer' | 'string' | 'boolean' | 'array',
    default?: string | number | boolean,
    required?: boolean,
    description?: string,
    schema?: {
      type: 'integer' | 'string' | 'boolean' | 'array',
      enum: any[]
    }
  }>,
  security?: Array<{
    bearerAuth?: []
  }>,
  requestBody?: {
    content?: {
      'application/json'?: {
        schema?: {
          $ref: string,
        },
      },
    }
    |
    {
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
    ,
    required?: boolean,
  },
  responses?: {
    '200': { description?: string }
    '400'?: { description?: string }
    '403'?: { description?: string }
    '404'?: { description?: string }
  }
}