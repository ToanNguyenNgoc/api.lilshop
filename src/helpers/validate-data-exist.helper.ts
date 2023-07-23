import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export const validatePermissionsExist = async (permissions_id: Array<number>): Promise<boolean> => {
  const existingPermissions = await prisma.permission.findMany({
    where: {
      id: { in: permissions_id }
    },
    select: { id: true }
  })
  const existingPermissionIds = existingPermissions.map(permission => permission.id);
  return permissions_id.every(permission_id => existingPermissionIds.includes(permission_id));
}