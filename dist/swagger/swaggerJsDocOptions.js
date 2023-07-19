"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./auth");
const banner_1 = require("../swagger/banner");
const initial_1 = require("../swagger/initial");
const role_1 = require("../swagger/role");
const utils_1 = require("../utils");
(0, utils_1.dotenvInitialize)();
const swaggerJsDocOptions = {
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
                loginSchema: auth_1.loginSchema,
                registerSchema: auth_1.registerSchema,
                postAccountInitSchema: initial_1.postAccountInitSchema,
                postRoleSchema: role_1.postRoleSchema
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
            '/auth/login': { post: auth_1.login },
            '/auth/register': { post: auth_1.register },
            '/auth/profile': { get: auth_1.profile },
            '/auth/roles': { get: auth_1.roleAuth },
            '/banners': { post: banner_1.postBanner },
            '/initial/account': { post: initial_1.postAccountInit },
        }
    },
    apis: ['./v1/routes/*.ts']
};
exports.default = swaggerJsDocOptions;
