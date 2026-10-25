
import { z } from "zod";

export const createServiceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Service name must contain at least 2 characters")
    .max(100, "Service name cannot exceed 100 characters"),
});

export const updateServiceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Service name must contain at least 2 characters")
    .max(100, "Service name cannot exceed 100 characters"),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
