"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putBanner = exports.postBanner = void 0;
exports.postBanner = {
    tags: ['Banner'],
    summary: 'v1/banners.POST',
    responses: {
        '200': { description: 'Return new banner' }
    }
};
exports.putBanner = {
    tags: ['Banner'],
    summary: 'v1/banners/:id.PUT',
    security: [
        { bearerAuth: [] }
    ],
    parameters: [
        {
            name: 'id',
            type: 'integer',
            in: 'path',
            description: 'The banner id',
            required: true
        }
    ],
    responses: {
        '200': { description: 'Return banner is updated' }
    }
};
