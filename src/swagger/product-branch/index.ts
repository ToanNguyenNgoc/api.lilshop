import { PathRequest } from "../type"

export const postProductBranchesSchema = {
    type: 'object',
    properties: {
        branch_id: { type: 'integer' },
        quantity: { type: 'integer' }
    }
}
export const putProductBranchesSchema = {
    ...postProductBranchesSchema,
    properties: {
        quantity: { type: 'integer' },
        status: { type: 'boolean' }
    }
}
export const getProductBranches: PathRequest = {
    tags: ['Product & Product media & Product size'],
    summary: 'v1/products/:id/branches.GET',
    parameters: [
        { in: 'path', name: 'id', type: 'integer', description: 'Product id', required: true },
    ],
    responses: {
        '200': { description: 'Return product branches by product id' }
    }
}
export const postProductBranches: PathRequest = {
    tags: ['Product & Product media & Product size'],
    summary: 'v1/products/:id/branches.POST',
    security: [{ bearerAuth: [] }],
    parameters: [
        { in: 'path', name: 'id', type: 'integer', description: 'Product id', required: true },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/postProductBranchesSchema',
                }
            }
        },
        required: true
    },
    responses: {
        '200': { description: 'Return new product branch by product id' }
    }
}
export const putProductBranches: PathRequest = {
    tags: ['Product & Product media & Product size'],
    summary: 'v1/products/:id/branches/:child_id.POST',
    security: [{ bearerAuth: [] }],
    parameters: [
        { in: 'path', name: 'id', type: 'integer', description: 'Product id', required: true },
        { in: 'path', name: 'child_id', type: 'integer', description: 'Branch id', required: true },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/putProductBranchesSchema',
                }
            }
        },
        required: true
    },
    responses: {
        '200': { description: 'Return new product branch by product id' }
    }
}
export const deleteProductBranch: PathRequest = {
    tags: ['Product & Product media & Product size'],
    summary: 'v1/products/:id/branches/:child_id.DELETE',
    security: [{ bearerAuth: [] }],
    parameters: [
        { in: 'path', name: 'id', type: 'integer', description: 'Product id', required: true },
        { in: 'path', name: 'child_id', type: 'integer', description: 'Branch id', required: true },
    ],
    responses: {
        '200': { description: 'Return delete product branch by id' }
    }
}
