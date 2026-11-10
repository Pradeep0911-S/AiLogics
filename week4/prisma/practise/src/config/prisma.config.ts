import { ENV } from "./env.config";
import {defineConfig} from "prisma/config";


export default defineConfig({
    schema : "../prisma",
    migrations : {
        path : "../prisma/migrations",
        seed: "tsx src/prisma/seeders/index.ts",
    },
    datasource :{
        url : ENV.DATABASE_URL,
    },
});
