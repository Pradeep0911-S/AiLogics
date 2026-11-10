import { prisma } from "../../config/prisma.client";

export async function seedPermissions() {
  await prisma.permission.createMany({
    data: [
      { name: "USER_CREATE" },
      { name: "USER_READ" },
      { name: "USER_UPDATE" },
      { name: "USER_DELETE" },

      { name: "ROLE_CREATE" },
      { name: "ROLE_READ" },
      { name: "ROLE_UPDATE" },
      { name: "ROLE_DELETE" },
    ],
    skipDuplicates: true,
  });

  console.log("Permissions seeded!");
}