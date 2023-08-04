import { prismaClient } from "~/prisma-client";

export const validateRolesExist = async (role_ids: number[]): Promise<boolean> => {
  const existingRoles = await prismaClient.role.findMany({
    where: {
      id: { in: role_ids }
    },
    select: { id: true }
  })
  const existingRoleIds = existingRoles.map(role => role.id);
  return role_ids.every(role_id => existingRoleIds.includes(role_id));
}

export const validatePermissionsExist = async (permissions_id: Array<number>): Promise<boolean> => {
  const existingPermissions = await prismaClient.permission.findMany({
    where: {
      id: { in: permissions_id }
    },
    select: { id: true }
  })
  const existingPermissionIds = existingPermissions.map(permission => permission.id);
  return permissions_id.every(permission_id => existingPermissionIds.includes(permission_id));
}