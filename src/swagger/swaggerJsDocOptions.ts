import { Options } from 'swagger-jsdoc'
import { login, loginSchema, register, profile, registerSchema, roleAuth } from './auth'
import { postBanner } from '~/swagger/banner'
import { postAccountInit, postAccountInitSchema } from '~/swagger/initial'
import { postRole, postRoleSchema } from '~/swagger/role'
import { dotenvInitialize } from '~/utils'

dotenvInitialize()
const swaggerJsDocOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: 'LilShop API Docs',
      version: '1.0.0',
      description: 'LilShop API Docs',
      contact: {
        email: 'ngoctoan06011998@gmail.com'
      }
    },
    servers: [
      {
        url: `${process.env.DOMAIN}/v1`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "Bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        loginSchema,
        registerSchema,
        postAccountInitSchema,
        postRoleSchema
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      { name: 'Auth', description: 'Authentication API Mapping' },
      { name: 'Banner', description: 'Banner API Mapping' },
      { name: 'Initial', description: 'Initial role & account API Mapping' }
    ],
    paths: {
      '/auth/login': { post: login },
      '/auth/register': { post: register },
      '/auth/profile': { get: profile },
      '/auth/roles': { get: roleAuth },

      '/banners': { post: postBanner },

      '/initial/account': { post: postAccountInit },
    }
  },
  apis: ['./v1/routes/*.ts']
}
export default swaggerJsDocOptions