"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleController = void 0;
const client_1 = require("@prisma/client");
const constants_1 = require("../../constants");
const exceptions_1 = require("../../exceptions");
const helpers_1 = require("../../helpers");
const utils_1 = require("../../utils");
const dto_1 = require("../../v1/dto");
const prisma = new client_1.PrismaClient();
class RoleController {
    async findAll(req, res) {
        const [data, total] = await prisma.$transaction([
            prisma.role.findMany({ where: { deleted: false } }),
            prisma.role.count({ where: { deleted: false } })
        ]);
        return res.send((0, helpers_1.transformDataHelper)({ data, total }));
    }
    async create(req, res) {
        const body = new dto_1.RoleDTO();
        body.name = req.body.name;
        body.permissions = req.body.permissions;
        await (0, helpers_1.validatorHelper)(body);
        if (!await (0, helpers_1.validatePermissionsExist)(body.permissions)) {
            throw new exceptions_1.ErrorException(400, 'One or more permissions do not exist');
        }
        const data = await prisma.role.create({
            data: {
                ...body,
                code: (0, utils_1.encode)(body.name),
                permissions: {
                    create: body.permissions.map(id => ({
                        permission: {
                            connect: {
                                id: id
                            }
                        }
                    }))
                }
            }
        });
        return res.send((0, helpers_1.transformDataHelper)(data));
    }
    async update(req, res) {
        const id = Number(req.params.id);
        const role = await prisma.role.findFirst({ where: { id: id, deleted: false } });
        if (!role)
            throw new exceptions_1.ErrorException(404, 'Resource not found');
        if (role.code === (0, utils_1.encode)(constants_1.KEY.SPA))
            throw new exceptions_1.ErrorException(403, 'Cannot update this role');
        const body = new dto_1.UpdateRoleDto();
        body.name = req.body.name;
        body.permissions = req.body.permissions;
        body.status = req.body.status;
        await (0, helpers_1.validatorHelper)(body);
        if (body.permissions?.length > 0) {
            if (!await (0, helpers_1.validatePermissionsExist)(body.permissions))
                throw new exceptions_1.ErrorException(400, 'One or more permissions do not exist');
        }
        const response = await prisma.role.update({
            where: { id: id },
            data: {
                ...body,
                code: body.name ? (0, utils_1.encode)(body.name) : undefined,
                permissions: {
                    deleteMany: {},
                    create: body.permissions?.map(id => ({
                        permission: {
                            connect: {
                                id: id
                            }
                        }
                    })),
                }
            }
        });
        return res.send((0, helpers_1.transformDataHelper)(response));
    }
    async delete(req, res) {
        const role = await prisma.role.findFirst({ where: { id: Number(req.params.id), deleted: false } });
        if (!role)
            throw new exceptions_1.ErrorException(404, 'Resource not found');
        if (role.code === (0, utils_1.encode)(constants_1.KEY.SPA))
            throw new exceptions_1.ErrorException(403, 'Cannot delete this role');
        await prisma.role.update({
            where: { id: Number(req.params.id) },
            data: { deleted: true }
        });
        return res.send((0, helpers_1.transformDataHelper)({ message: 'Delete role success' }));
    }
}
exports.roleController = new RoleController();
