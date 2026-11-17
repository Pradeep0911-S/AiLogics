import z from "zod";

export const envSchema = z.object({
    PORT : z.coerce.number().int().positive().default(5000),

    NODE_ENV : z.enum(["development", "test", "staging", "production"]).default("development"),

    DATABASE_URL : z.string().url(),

    POSTGRES_HOST:z.string().default("localhost"),
    POSTGRES_PORT:z.coerce.number().default(5432),
    POSTGRES_USER : z.string().min(1),
    POSTGRES_PASSWORD: z.string().min(1),
    POSTGRES_DATABASE: z.string().min(1),

})