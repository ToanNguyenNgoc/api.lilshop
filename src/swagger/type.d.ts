export type PathRequest = {
  tags: Array<string>,
  summary?: string,
  parameters?: Array<{
    name: string,
    in?: 'query' | 'path',
    type?: 'integer' | 'string' | 'boolean' | 'array',
    default?: string | number | boolean
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
    },
    required?: boolean,
  },
  responses?: {
    '200': { description?: string }
  }
}