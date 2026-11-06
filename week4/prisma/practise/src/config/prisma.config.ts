import { ENV } from "./env.config";
import {defineConfig} from "prisma/config";


export default defineConfig({
    schema : "../prisma",
    migrations : {
        path : "../src/prisma/migrations"
    },
    datasource :{
        url : ENV.DATABASE_URL,
    },
});
