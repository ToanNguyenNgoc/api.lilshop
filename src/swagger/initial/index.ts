import { PathRequest } from "~/swagger/type"

export const postAccountInitSchema = {
  type: 'object',
  properties: {
    fullname: { type: 'string' },
    email: { type: 'string' },
    telephone: { type: 'string' },
    password: { type: 'string' }
  }
}
export const postAccountInit: PathRequest = {
  tags: ['Initial'],
  summary: 'API create first account',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/postAccountInitSchema',
        }
      }
    },
    required: true
  },
  responses: {
    '200': { description: 'Return first account information' }
  }
}