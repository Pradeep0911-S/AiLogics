import { prisma } from "../../config/prisma.client";

export async function seedRoles() {
  await prisma.role.createMany({
    data: [
      { name: "ADMIN" },
      { name: "USER" },
      { name: "MANAGER" },
    ],
    skipDuplicates: true,
  });

  console.log("Roles seeded!");
}