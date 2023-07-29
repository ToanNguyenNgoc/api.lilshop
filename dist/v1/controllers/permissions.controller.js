"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionController = void 0;
const client_1 = require("@prisma/client");
const helpers_1 = require("../../helpers");
const prisma = new client_1.PrismaClient();
class PermissionController {
    async findAll(req, res) {
        const [data, total] = await prisma.$transaction([
            prisma.permission.findMany(),
            prisma.permission.count()
        ]);
        return res.send((0, helpers_1.transformDataHelper)({ data, total }));
    }
    async create(req, res) {
        const permissions = req.body.map((i) => {
            const splitArray = i.split(/\s+(?=\w)/);
            if (splitArray.length === 1)
                return [
                    { name: i, path: `v1/${i}.GET` },
                    { name: i, path: `v1/${i}/:id.GET` },
                    { name: i, path: `v1/${i}.POST` },
                    { name: i, path: `v1/${i}/:id.PUT` },
                    { name: i, path: `v1/${i}/:id.DELETE` }
                ];
            if (splitArray.length === 2) {
                return [
                    { name: i, path: `v1/${splitArray[0]}/:id/${splitArray[1]}.GET` },
                    { name: i, path: `v1/${splitArray[0]}/:id/${splitArray[1]}/:child_id.GET` },
                    { name: i, path: `v1/${splitArray[0]}/:id/${splitArray[1]}/.POST` },
                    { name: i, path: `v1/${splitArray[0]}/:id/${splitArray[1]}/:child_id.PUT` },
                    { name: i, path: `v1/${splitArray[0]}/:id/${splitArray[1]}/:child_id.DELETE` },
                ];
            }
        }).flat();
        const response = await prisma.permission.createMany({
            data: permissions
        });
        return res.send((0, helpers_1.transformDataHelper)(response));
    }
}
exports.permissionController = new PermissionController();
