import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string()
    .trim()
    .min(3, "Role name must contain at least 3 characters")
    .max(50, "Role name must not exceed 50 characters")
    .transform((value) => value.toUpperCase()),
}).strict();

export type CreateRoleInput = z.infer<typeof createRoleSchema>;