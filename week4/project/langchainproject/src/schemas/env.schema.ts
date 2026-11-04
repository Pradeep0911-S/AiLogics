import { z } from "zod";

export const envSchema = z.object({
    PORT : z.coerce.number().default(5000),
    GROQ_API_KEY: z.string(),

    POSTGRES_HOST:z.string().default("localhost"),
    POSTGRES_PORT:z.coerce.number().default(5432),
    POSTGRES_USER : z.string().min(1),
    POSTGRES_PASSWORD: z.string().min(1),
    POSTGRES_DATABASE: z.string().min(1),
    POSTGRES_PROFILE_ID: z.string().min(1),
});