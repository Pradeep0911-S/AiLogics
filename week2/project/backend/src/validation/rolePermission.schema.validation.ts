import { z } from "zod";

export const assignPermissionSchema = z.object({
  roleId: z.string().uuid("Invalid role ID"),
  permissionId: z.string().uuid("Invalid permission ID"),
}).strict();

export type AssignPermissionInput = z.infer<typeof assignPermissionSchema>;