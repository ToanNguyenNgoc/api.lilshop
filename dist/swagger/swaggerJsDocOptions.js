"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_1 = require("./account");
const auth_1 = require("./auth");
const banner_1 = require("../swagger/banner");
const initial_1 = require("../swagger/initial");
const role_1 = require("../swagger/role");
const permission_1 = require("../swagger/permission");
const upload_media_1 = require("./upload-media");
const province_1 = require("./province");
const branch_1 = require("./branch");
const product_1 = require("./product");
const product_media_1 = require("./product-media");
const utils_1 = require("../utils");
(0, utils_1.dotenvInitialize)();
const swaggerJsDocOptions = {
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
                putAccountSchema: account_1.putAccountSchema,
                loginSchema: auth_1.loginSchema,
                registerSchema: auth_1.registerSchema,
                postAccountInitSchema: initial_1.postAccountInitSchema,
                postRoleSchema: role_1.postRoleSchema, putRoleSchema: role_1.putRoleSchema,
                postPermissionSchema: permission_1.postPermissionSchema,
                postBranchSchema: branch_1.postBranchSchema, putBranchSchema: branch_1.putBranchSchema,
                postProductSchema: product_1.postProductSchema, putProductSchema: product_1.putProductSchema,
                postProductMediaSchema: product_media_1.postProductMediaSchema
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
            '/accounts': { get: account_1.getAccount },
            '/accounts/{id}': { get: account_1.getDetailAccount, put: account_1.putAccount },
            '/auth/login': { post: auth_1.login },
            '/auth/register': { post: auth_1.register },
            '/auth/profile': { get: auth_1.profile },
            '/auth/roles': { get: auth_1.roleAuth },
            '/banners': { post: banner_1.postBanner },
            '/banners/{id}': { put: banner_1.putBanner },
            '/branches': { get: branch_1.getBranch, post: branch_1.postBranch },
            '/branches/{id}': { get: branch_1.getDetailBranch, put: branch_1.putBranch, delete: branch_1.deleteBranch },
            '/initial/account': { post: initial_1.postAccountInit },
            '/roles': { get: role_1.getRole, post: role_1.postRole },
            '/roles/{id}': { get: role_1.getDetailRole, put: role_1.putRole, delete: role_1.deleteRole },
            '/permissions': { get: permission_1.getPermissions, post: permission_1.postPermission },
            '/upload/media': { post: upload_media_1.uploadMedia },
            '/provinces': { get: province_1.getProvinces },
            '/provinces/{province_code}/districts': { get: province_1.getDistricts },
            '/districts/{district_code}/wards': { get: province_1.getWards },
            '/products': { get: product_1.getProduct, post: product_1.postProduct },
            '/products/{id}': { get: product_1.getDetailProduct, put: product_1.putProduct },
            '/products/{id}/medias': { get: product_media_1.getProductMedia, post: product_media_1.postProductMedia, delete: product_media_1.deleteProductMedia }
        }
    },
    apis: ['./v1/routes/*.ts']
};
exports.default = swaggerJsDocOptions;
