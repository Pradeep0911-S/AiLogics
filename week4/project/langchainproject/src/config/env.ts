import dotenv from "dotenv";
import { envSchema } from "../schemas/env.schema.js";

dotenv.config();

const allenvVariables = envSchema.safeParse(process.env);

if(!allenvVariables.success){
    console.error("Invalid env variables :");
    allenvVariables.error.issues.forEach((issue) => {
        console.error(`- ${issue.path.join(".")}: ${issue.message}`);
    });
    process.exit(1);
}

export const ENV = allenvVariables.data;

