import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { ENV } from "./env.config";
const adapter = new PrismaPg({
    connectionString: ENV.DATABASE_URL,
});
export const prisma = new PrismaClient({ adapter });
