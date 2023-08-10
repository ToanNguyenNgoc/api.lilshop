import { PathRequest } from "../type"

export const postOrderSchema = {
    type: 'object',
    properties: {
        address_id: { type: 'integer' },
        branch_id: { type: 'integer' },
        product_ids: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    product_id: { type: 'integer' },
                    quantity: { type: 'integer' }
                }
            }
        },
        payment_method_id: { type: 'integer' }
    }
}
export const getOrders: PathRequest = {
    tags: ['Customer'],
    security: [
        { bearerAuth: [] }
    ],
    parameters: [
        {
            in: 'query',
            name: 'page',
            type: 'integer',
            required: false,
            description: 'Page',
            default: 1
        },
        {
            in: 'query',
            name: 'limit',
            type: 'integer',
            required: false,
            description: 'limit',
            default: 15
        },
        {
            in: 'query',
            name: 'payment_status',
            type: 'string',
            description: 'Order payment status filter:',
            required: false,
            schema: {
                type: 'string',
                enum: ['PENDING', 'SUCCESS', 'CANCEL']
            }
        },
        {
            in: 'query',
            name: 'includes',
            type: 'string',
            description: 'Includes: products|delivery_address',
            required: false
        },
    ],
    responses: {
        '200': { description: 'Return list of order' }
    }
}
export const getOrder: PathRequest = {
    tags: ['Customer'],
    security: [
        { bearerAuth: [] }
    ],
    parameters: [
        { in: 'path', name: 'id', description: 'Order id', required: true }
    ],
    responses: {
        '200': { description: 'Return order detail' }
    }
}
export const postOrder: PathRequest = {
    tags: ['Customer'],
    summary: 'v1/customer/orders.POST',
    security: [
        { bearerAuth: [] }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/postOrderSchema',
                }
            }
        },
        required: true
    },
    responses: {
        '200': { description: 'Return new order' }
    }
}