import { prisma } from "../../config/prisma.client";

export async function seedUsers() {
  const adminRole = await prisma.role.findUnique({
    where: { name: "ADMIN" },
  });

  const userRole = await prisma.role.findUnique({
    where: { name: "USER" },
  });

  const managerRole = await prisma.role.findUnique({
    where: { name: "MANAGER" },
  });

  if (!adminRole || !userRole || !managerRole) {
    throw new Error("Required roles not found. Run role seeder first.");
  }

  const hashedPassword =
  "$2b$10$N9qo8uLOickgx2ZMRZojZAgcfl7p92ldGxad68LJZdL17lhWy";

await prisma.user.createMany({
  data: [
    {
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      roleId: adminRole.id,
    },
    {
      name: "Normal User",
      email: "user@example.com",
      password: hashedPassword,
      roleId: userRole.id,
    },
    {
      name: "Manager User",
      email: "manager@example.com",
      password: hashedPassword,
      roleId: managerRole.id,
    },
  ],
  skipDuplicates: true,
});

  console.log("Users seeded!");
}