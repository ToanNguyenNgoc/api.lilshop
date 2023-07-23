"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePermissionsExist = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const validatePermissionsExist = async (permissions_id) => {
    const existingPermissions = await prisma.permission.findMany({
        where: {
            id: { in: permissions_id }
        },
        select: { id: true }
    });
    const existingPermissionIds = existingPermissions.map(permission => permission.id);
    return permissions_id.every(permission_id => existingPermissionIds.includes(permission_id));
};
exports.validatePermissionsExist = validatePermissionsExist;
