import { prisma } from "./config/prisma.client";
async function create() {
    const user = await prisma.user.create({
        data: {
            name: "dem",
            email: "demo@gmail.com",
            password: "$2b$10$N9qo8uLOickgx2ZMRZojZAgcfl7p92ldGxad68LJZdL17lhWy",
            roleId: "c2422abc-a21f-4441-8e53-ffcf048d1695",
            isActive: false,
        },
    });
    console.log(user);
}
await console.log(create());
