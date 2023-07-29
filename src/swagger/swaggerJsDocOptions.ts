import { Options } from 'swagger-jsdoc'
import { getAccount, getDetailAccount, putAccount, putAccountSchema } from './account'
import { login, loginSchema, register, profile, registerSchema, roleAuth } from './auth'
import { postBanner, putBanner } from '~/swagger/banner'
import { postAccountInit, postAccountInitSchema } from '~/swagger/initial'
import { getRole, postRole, postRoleSchema, putRole, putRoleSchema, getDetailRole, deleteRole } from '~/swagger/role'
import { postPermission, postPermissionSchema, getPermissions } from "~/swagger/permission"
import { uploadMedia } from "./upload-media"
import { getDistricts, getProvinces, getWards } from "./province"
import { getBranch, postBranch, postBranchSchema, getDetailBranch, putBranch, putBranchSchema, deleteBranch } from "./branch"
import { postProduct, postProductSchema, getProduct, getDetailProduct, putProduct, putProductSchema } from "./product"
import { getProductMedia, postProductMedia, postProductMediaSchema, deleteProductMedia } from "./product-media"

import { dotenvInitialize } from '~/utils'

dotenvInitialize()
const swaggerJsDocOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: 'Fashional Shop API Docs',
      version: '1.0.0',
      description: 'Fashional Shop API Docs',
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
        postPermissionSchema,
        postBranchSchema, putBranchSchema,
        postProductSchema, putProductSchema,
        postProductMediaSchema
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
      { name: 'Branch', description: 'Branch API Mapping' },
      { name: 'Initial', description: 'Initial role & account API Mapping' },
      { name: 'Product & Product media', description: 'Product API Mapping' },
      { name: 'Province', description: 'Province API Mapping' },
      { name: 'Role & Permission', description: 'Role & Permission API Mapping' },
      { name: 'Upload & Media', description: 'Upload & Media API Mapping' },
    ],
    paths: {
      '/accounts': { get: getAccount },
      '/accounts/{id}': { get: getDetailAccount, put: putAccount },

      '/auth/login': { post: login },
      '/auth/register': { post: register },
      '/auth/profile': { get: profile },
      '/auth/roles': { get: roleAuth },

      '/banners': { post: postBanner },
      '/banners/{id}': { put: putBanner },

      '/branches': { get: getBranch, post: postBranch },
      '/branches/{id}': { get: getDetailBranch, put: putBranch, delete: deleteBranch },

      '/initial/account': { post: postAccountInit },

      '/roles': { get: getRole, post: postRole },
      '/roles/{id}': { get: getDetailRole, put: putRole, delete: deleteRole },
      '/permissions': { get: getPermissions, post: postPermission },

      '/upload/media': { post: uploadMedia },

      '/provinces': { get: getProvinces },
      '/provinces/{province_code}/districts': { get: getDistricts },
      '/districts/{district_code}/wards': { get: getWards },

      '/products': { get: getProduct, post: postProduct },
      '/products/{id}': { get: getDetailProduct, put: putProduct },
      '/products/{id}/medias': { get: getProductMedia, post: postProductMedia, delete:deleteProductMedia }
    }
  },
  apis: ['./v1/routes/*.ts']
}
export default swaggerJsDocOptions