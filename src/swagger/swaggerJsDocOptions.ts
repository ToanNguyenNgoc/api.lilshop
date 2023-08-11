import { Options } from 'swagger-jsdoc'
import { getAccount, getDetailAccount, putAccount, putAccountSchema, postAccount, postAccountSchema, deleteAccount } from './account'
import { login, loginSchema, register, profile, registerSchema, roleAuth, forgot, forgotSchema, refreshToken } from './auth'
import { postBanner, putBanner } from '~/swagger/banner'
import { postAccountInit, postAccountInitSchema } from '~/swagger/initial'
import { getRole, postRole, postRoleSchema, putRole, putRoleSchema, getDetailRole, deleteRole } from '~/swagger/role'
import { postPermission, postPermissionSchema, getPermissions } from "~/swagger/permission"
import { uploadMedia, uploadMediaMultiple } from "./upload-media"
import { getDistricts, getProvinces, getWards } from "./province"
import { getBranch, postBranch, postBranchSchema, getDetailBranch, putBranch, putBranchSchema, deleteBranch } from "./branch"
import { postProduct, postProductSchema, getProduct, getDetailProduct, putProduct, putProductSchema } from "./product"
import { getProductMedia, postProductMedia, postProductMediaSchema, deleteProductMedia } from "./product-media"
import { getProductSize, postProductSize, postProductSizeSchema, putProductSize, putProductSizeSchema, deleteProductSize } from "./product-size"
import { getTags, postTag, postTagSchema, putTag, putTagSchema, deleteTag, getDetailTag } from "./tag"
import { deleteCategory, getCategories, getCategory, postCategory, postCategorySchema, putCategory, putCategorySchema } from "./category"
import {
  getProductBranches,
  deleteProductBranch,
  postProductBranches,
  postProductBranchesSchema,
  putProductBranches,
  putProductBranchesSchema,
} from "./product-branch"
import {
  getAddresses,
  postAddress,
  postAddressSchema,
  putAddress,
  putAddressSchema,
  getAddress,
  deleteAddress,
  postOrder,
  postOrderSchema,
  getOrder,
  getOrders
} from "./customer"
import { postPaymentMethod, postPaymentMethodSchema, getPaymentMethods, putPaymentMethod, putPaymentMethodSchema } from "./payment-method"

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
        putAccountSchema, postAccountSchema,
        loginSchema, forgotSchema, registerSchema,
        postAccountInitSchema,
        postRoleSchema, putRoleSchema,
        postPermissionSchema,
        postBranchSchema, putBranchSchema,
        postProductSchema, putProductSchema,
        postProductMediaSchema,
        postProductSizeSchema, putProductSizeSchema,
        postTagSchema, putTagSchema,
        postCategorySchema, putCategorySchema,
        postProductBranchesSchema, putProductBranchesSchema,
        postAddressSchema, putAddressSchema,
        postOrderSchema,
        postPaymentMethodSchema, putPaymentMethodSchema
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
      { name: 'Category', description: 'Category API Mapping' },
      { name: 'Customer', description: 'Customer API Mapping' },
      { name: 'Initial', description: 'Initial role & account API Mapping' },
      { name: 'Product & Product media & Product size', description: 'Product API Mapping' },
      { name: 'Province', description: 'Province API Mapping' },
      { name: 'Payment method', description: 'Payment method API Mapping' },
      { name: 'Role & Permission', description: 'Role & Permission API Mapping' },
      { name: 'Tag', description: 'Tag API Mapping' },
      { name: 'Upload & Media', description: 'Upload & Media API Mapping' },
    ],
    paths: {
      '/accounts': { get: getAccount, post: postAccount },
      '/accounts/{id}': { get: getDetailAccount, put: putAccount, delete: deleteAccount },

      '/auth/login': { post: login },
      '/auth/register': { post: register },
      '/auth/forgot': { post: forgot },
      '/auth/profile': { get: profile },
      '/auth/roles': { get: roleAuth },
      '/auth/refresh': { post: refreshToken },

      '/banners': { post: postBanner },
      '/banners/{id}': { put: putBanner },

      '/branches': { get: getBranch, post: postBranch },
      '/branches/{id}': { get: getDetailBranch, put: putBranch, delete: deleteBranch },

      '/initial/account': { post: postAccountInit },

      '/roles': { get: getRole, post: postRole },
      '/roles/{id}': { get: getDetailRole, put: putRole, delete: deleteRole },
      '/permissions': { get: getPermissions, post: postPermission },

      '/upload/media': { post: uploadMedia },
      '/upload/media_multiple': { post: uploadMediaMultiple },

      '/provinces': { get: getProvinces },
      '/provinces/{province_code}/districts': { get: getDistricts },
      '/districts/{district_code}/wards': { get: getWards },

      '/products': { get: getProduct, post: postProduct },
      '/products/{id}': { get: getDetailProduct, put: putProduct },
      '/products/{id}/branches': { get: getProductBranches, post: postProductBranches },
      '/products/{id}/branches/{child_id}': { put: putProductBranches, delete: deleteProductBranch },
      '/products/{id}/medias': { get: getProductMedia, post: postProductMedia, delete: deleteProductMedia },
      '/products/{id}/sizes': { get: getProductSize, post: postProductSize },
      '/products/{id}/sizes/{child_id}': { put: putProductSize, delete: deleteProductSize },

      '/tags': { get: getTags, post: postTag },
      '/tags/{id}': { get: getDetailTag, put: putTag, delete: deleteTag },

      '/categories': { get: getCategories, post: postCategory },
      '/categories/{id}': { get: getCategory, put: putCategory, delete: deleteCategory },

      '/customer/addresses': { get: getAddresses, post: postAddress },
      '/customer/addresses/{id}': { get: getAddress, put: putAddress, delete: deleteAddress },
      '/customer/orders': { get: getOrders, post: postOrder },
      '/customer/orders/{id}': { get: getOrder },

      '/paymentmethods': { get: getPaymentMethods, post: postPaymentMethod },
      '/paymentmethods/{id}': { put: putPaymentMethod },
    }
  },
  apis: ['./v1/routes/*.ts']
}
export default swaggerJsDocOptions