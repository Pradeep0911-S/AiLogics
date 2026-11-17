import dotenv from "dotenv";
import { envSchema } from "../schemas/env.schema.js";

dotenv.config()

export const ENV = {
    PORT : process.env.PORT,
    NODE_ENV : process.env.NODE_ENV,
    database : {
        DATABASE_URL : process.env.DATABASE_URL,
        
        POSTGRES_HOST: process.env.DATABASE_URL,
        POSTGRES_PORT: process.env.POSTGRES_PORT,
        POSTGRES_USER: process.env.POSTGRES_USER,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
        POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    },
}

export default ENV;


// const allenvVariables = envSchema.safeParse(process.env);

// if(!allenvVariables.success){
//     console.error("Invalid env variables :");
//     allenvVariables.error.issues.forEach((issue)=>{
//         console.error(`-${issue.path.join(".")} : ${issue.message}`);
//     });
//     process.exit(1);
// }

// export const Env = allenvVariables.data;