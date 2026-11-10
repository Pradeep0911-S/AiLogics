import { prisma } from "../../config/prisma.client";

import { seedRoles } from "./role.seeder";
import { seedPermissions } from "./permission.seeder";
import { seedUsers } from "./user.seeder";
import { seedProfiles } from "./profile.seeder";
import { seedRolePermissions } from "./role.permission.seeder";

async function main() {
  await seedRoles();
  await seedPermissions();
  await seedUsers();
  await seedProfiles();
  await seedRolePermissions();

  console.log("All seeders completed!");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });