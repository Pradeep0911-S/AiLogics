import ENV from "./env.config.js";
import {defineConfig} from "prisma/config";

export default defineConfig({
    schema : "../prisma",
    migrations : {
        path : "../prisma/migrations",
        seed : "tsx src/prisma/seeders/index.ts"
    },
    datasource: {
        url : ENV.database.DATABASE_URL,
    }
})