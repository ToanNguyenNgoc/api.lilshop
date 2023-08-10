import { PathRequest } from "../type"

export const postPaymentMethodSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        method_key: { type: 'string' },
        child_key: { type: 'string' },
        icon: { type: 'string' },
        setting: { type: 'string' },
    }
}
export const putPaymentMethodSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        icon: { type: 'string' },
        setting: { type: 'string' },
        status: { type: 'boolean' }
    }
}
export const postPaymentMethod: PathRequest = {
    tags: ['Payment method'],
    summary: 'v1/paymentmethods.POST',
    security: [
        { bearerAuth: [] }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/postPaymentMethodSchema',
                }
            }
        },
        required: true
    },
    responses: {
        '200': { description: 'Return payment method' }
    }
}
export const putPaymentMethod: PathRequest = {
    tags: ['Payment method'],
    summary: 'v1/paymentmethods/:id.PUT',
    security: [
        { bearerAuth: [] }
    ],
    parameters:[
        {in:'path', name:'id', description:'Payment method id', required:true},
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/putPaymentMethodSchema',
                }
            }
        },
        required: true
    },
    responses: {
        '200': { description: 'Return payment method' }
    }
}
export const getPaymentMethods: PathRequest = {
    tags: ['Payment method'],
    summary: 'v1/paymentmethods.GET',
    security: [
        { bearerAuth: [] }
    ],
    responses: {
        '200': { description: 'Return list of payment method order' }
    }
}
