import { PathRequest } from "~/swagger/type";

export const loginSchema = {
  type: 'object',
  properties: {
    email: { type: 'string'},
    password: { type: 'string' }
  }
}
export const registerSchema = {
  type: 'object',
  properties: {
    fullname: { type: 'string' },
    telephone: { type: 'string' },
    email: { type: 'string'},
    password: { type: 'string' }
  }
}
export const login: PathRequest = {
  tags: ['Auth'],
  summary: 'Auth login',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/loginSchema',
        }
      }
    }
  },
  responses: {
    '200': { description: 'Return user information' }
  }
}
export const register: PathRequest = {
  tags: ['Auth'],
  summary: 'Auth register',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/registerSchema',
        }
      }
    }
  },
  responses: {
    '200': { description: 'Return new user information' }
  }
}
export const profile: PathRequest = {
  tags: ['Auth'],
  summary: 'Auth profile',
  security: [
    {
      bearerAuth: []
    }
  ],
  responses: {
    '200': { description: 'Return user profile' }
  }
}
export const roleAuth: PathRequest = {
  tags: ['Auth'],
  summary: 'Auth roles',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters:[
    {
      in:'query',
      name:'includes',
      type:'string',
      description:'Includes: permissions',
      default:'permissions',
      required:false
    }
  ],
  responses: {
    '200': { description: 'Return user roles' }
  }
}