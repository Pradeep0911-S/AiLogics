import { z } from "zod";

export const createPermissionSchema = z.object({
  name: z.string()
    .trim()
    .min(3, "Permission name must contain at least 3 characters")
    .max(100, "Permission name must not exceed 100 characters")
    .transform((value) => value.toUpperCase()),
}).strict();

export type CreatePermissionInput = z.infer<typeof createPermissionSchema>;