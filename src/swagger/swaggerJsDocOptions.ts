import { Options } from 'swagger-jsdoc'
import { getAccount, getDetailAccount, putAccount, putAccountSchema } from './account'
import { login, loginSchema, register, profile, registerSchema, roleAuth } from './auth'
import { postBanner, putBanner } from '~/swagger/banner'
import { postAccountInit, postAccountInitSchema } from '~/swagger/initial'
import { getRole, postRole, postRoleSchema, putRole, putRoleSchema, deleteRole } from '~/swagger/role'
import { postPermission, postPermissionSchema, getPermissions } from "~/swagger/permission"
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
        putAccountSchema,
        loginSchema,
        registerSchema,
        postAccountInitSchema,
        postRoleSchema, putRoleSchema,
        postPermissionSchema
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      { name: 'Account', description: 'Account API Mapping' },
      { name: 'Auth', description: 'Authentication API Mapping' },
      { name: 'Banner', description: 'Banner API Mapping' },
      { name: 'Initial', description: 'Initial role & account API Mapping' },
      { name: 'Role & Permission', description: 'Role & Permission API Mapping' }
    ],
    paths: {
      '/accounts': { get: getAccount },
      '/accounts/{id}': {get: getDetailAccount, put: putAccount },

      '/auth/login': { post: login },
      '/auth/register': { post: register },
      '/auth/profile': { get: profile },
      '/auth/roles': { get: roleAuth },

      '/banners': { post: postBanner },
      '/banners/{id}': { put: putBanner },

      '/initial/account': { post: postAccountInit },

      '/roles': { get: getRole, post: postRole },
      '/roles/{id}': { put: putRole, delete: deleteRole },
      '/permissions': { get: getPermissions, post: postPermission }
    }
  },
  apis: ['./v1/routes/*.ts']
}
export default swaggerJsDocOptions