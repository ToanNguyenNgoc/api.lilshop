import { PathRequest } from "../type";

export const postAddressSchema = {
    type: 'object',
    properties: {
        short_address: { type: 'string' },
        province_code: { type: 'integer' },
        district_code: { type: 'integer' },
        ward_code: { type: 'integer' },
        is_default: { type: 'boolean' },
        lat: { type: 'float', example: 10.00000 },
        long: { type: 'float', example: 20.00000 }
    }
}
export const putAddressSchema = {
    ...postAddressSchema,
    properties: {
        ...postAddressSchema.properties,
        status: { type: 'boolean' }
    }
}
export const getAddresses: PathRequest = {
    tags: ['Customer'],
    summary: 'v1/customer/addresses.GET',
    security: [
        { bearerAuth: [] }
    ],
    parameters: [
        {
            in: 'query',
            name: 'page',
            type: 'integer',
            description: 'page',
            default: 1,
            required: false
        },
        {
            in: 'query',
            name: 'limit',
            type: 'integer',
            description: 'limit',
            default: 15,
            required: false
        },
        {
            in: 'query',
            name: 'status',
            type: 'string',
            description: 'Status filter: true (active) or false (inactive)',
            required: false,
            schema: {
                type: 'string',
                enum: ['false', 'true']
            }
        },
        {
            in: 'query',
            name: 'is_default',
            type: 'string',
            description: 'Is default filter: true (active) or false (inactive)',
            required: false,
            schema: {
                type: 'string',
                enum: ['false', 'true']
            }
        },
    ],
    responses: {
        '200': { description: 'Return list of addresses' }
    }
}
export const getAddress: PathRequest = {
    tags: ['Customer'],
    summary: 'v1/customer/addresses/:id.GET',
    security: [{ bearerAuth: [] }],
    parameters: [
        { name: 'id', in: 'path', description: 'Address id', type: 'integer', required: true }
    ],
    responses: {
        '200': { description: 'Return address' }
    }
}
export const postAddress: PathRequest = {
    tags: ['Customer'],
    summary: 'v1/customer/addresses.POST',
    security: [
        { bearerAuth: [] }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/postAddressSchema',
                }
            }
        },
        required: true
    },
    responses: {
        '200': { description: 'Return new address' }
    }
}
export const putAddress: PathRequest = {
    tags: ['Customer'],
    summary: 'v1/customer/addresses/:id.PUT',
    security: [
        { bearerAuth: [] }
    ],
    parameters: [
        { name: 'id', in: 'path', description: 'Address id', type: 'integer', required: true }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/putAddressSchema',
                }
            }
        },
        required: true
    },
    responses: {
        '200': { description: 'Return new address update' }
    }
}
export const deleteAddress: PathRequest = {
    tags: ['Customer'],
    summary: 'v1/customer/addresses/:id.DELETE',
    security: [{ bearerAuth: [] }],
    parameters: [
        { name: 'id', in: 'path', description: 'Address id', type: 'integer', required: true }
    ],
    responses: {
        '200': { description: 'Return delete address' }
    }
}