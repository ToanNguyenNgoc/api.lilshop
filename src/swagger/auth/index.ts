import { PathRequest } from "~/swagger/type";

export const loginSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', example: 'customer@gmail.com' },
    password: { type: 'string', example: '06011998' }
  }
}
export const registerSchema = {
  type: 'object',
  properties: {
    fullname: { type: 'string' },
    telephone: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    recaptcha: { type: 'string' },
  }
}
export const forgotSchema = {
  type: 'object',
  properties: {
    recaptcha: { type: 'string' },
    platform: { type: 'string', example: 'CLIENT' },
    email: { type: 'string', example: 'customer@gmail.com' },
    password: { type: 'string', example: '123456' }
  }
}
export const loginGoogleMobaSchema={
  type:'object',
  properties:{
    email:{type:'string'},
    name:{type:'string'},
    avatar:{type:'string'},
    server_auth_code:{type:'string'}
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

export const loginGoogleMoba: PathRequest = {
  tags: ['Auth'],
  summary: 'Auth login google moba',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/loginGoogleMobaSchema',
        }
      }
    }
  },
  responses: {
    '200': { description: 'Return user information' }
  }
}

export const loginGoogle: PathRequest = {
  tags: ['Auth'],
  summary: 'Auth login google',
  responses: {
    '200': { description: 'Redirect to google login form' }
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

export const forgot: PathRequest = {
  tags: ['Auth'],
  summary: 'Auth forgot',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/forgotSchema',
        }
      }
    }
  },
  responses: {
    '200': { description: 'Return forgot password' }
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
  parameters: [
    {
      in: 'query',
      name: 'includes',
      type: 'string',
      description: 'Includes: permissions',
      default: 'permissions',
      required: false
    }
  ],
  responses: {
    '200': { description: 'Return user roles' }
  }
}
export const refreshToken: PathRequest = {
  tags: ['Auth'],
  summary: 'Auth refresh token',
  responses: {
    '200': { description: 'Return refresh token' }
  }
}
export const postLogout: PathRequest = {
  tags: ['Auth'],
  summary: 'Auth logout',
  responses: {
    '200': { description: 'Logout account' }
  }
}