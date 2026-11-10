import { prisma } from "../../config/prisma.client";

export async function seedRolePermissions() {
  const roles = await prisma.role.findMany();

  const permissions = await prisma.permission.findMany();

  const roleMap = new Map(
    roles.map((role) => [role.name, role.id])
  );

  const permissionMap = new Map(
    permissions.map((permission) => [
      permission.name,
      permission.id,
    ])
  );

  const adminRoleId = roleMap.get("ADMIN");
  const managerRoleId = roleMap.get("MANAGER");
  const userRoleId = roleMap.get("USER");

  if (!adminRoleId || !managerRoleId || !userRoleId) {
    throw new Error("Required roles not found.");
  }

  const permissionNames = [
    "USER_CREATE",
    "USER_READ",
    "USER_UPDATE",
    "USER_DELETE",
    "ROLE_CREATE",
    "ROLE_READ",
    "ROLE_UPDATE",
    "ROLE_DELETE",
  ];

  const missingPermissions = permissionNames.filter(
    (name) => !permissionMap.has(name)
  );

  if (missingPermissions.length > 0) {
    throw new Error(
      `Missing permissions: ${missingPermissions.join(", ")}`
    );
  }

  const data = [
    // ADMIN gets all permissions
    ...permissionNames.map((name) => ({
      roleId: adminRoleId,
      permissionId: permissionMap.get(name)!,
    })),

    // MANAGER gets user read and update
    ...["USER_READ", "USER_UPDATE"].map((name) => ({
      roleId: managerRoleId,
      permissionId: permissionMap.get(name)!,
    })),

    // USER gets user read
    {
      roleId: userRoleId,
      permissionId: permissionMap.get("USER_READ")!,
    },
  ];

  await prisma.rolePermission.createMany({
    data,
    skipDuplicates: true,
  });

  console.log("Role permissions seeded!");
}   