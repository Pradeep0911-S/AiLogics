import { prisma } from "../../config/prisma.client";

export async function seedProfiles() {
  const admin = await prisma.user.findUnique({
    where: { email: "admin@example.com" },
  });

  const user = await prisma.user.findUnique({
    where: { email: "user@example.com" },
  });

  const manager = await prisma.user.findUnique({
    where: { email: "manager@example.com" },
  });

  if (!admin || !user || !manager) {
    throw new Error("Users not found. Run user seeder first.");
  }

  await prisma.profile.createMany({
    data: [
      {
        userId: admin.id,
        firstName: "Admin",
        lastName: "Account",
        address: "Hyderabad",
      },
      {
        userId: user.id,
        firstName: "Normal",
        lastName: "Account",
        address: "Bangalore",
      },
      {
        userId: manager.id,
        firstName: "Manager",
        lastName: "Account",
        address: "Chennai",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Profiles seeded!");
}