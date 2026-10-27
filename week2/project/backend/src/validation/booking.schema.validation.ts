
import { z } from "zod";

export const createBookingSchema = z.object({
  service: z.string(),
});

export const assignBookingSchema = z.object({
  assignedUserId: z.string().uuid("Invalid user ID"),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum([
    "IN_PROGRESS",
    "COMPLETED",
  ]),
});

export type CreateBookingInput = z.infer<
  typeof createBookingSchema
>;

export type AssignBookingInput = z.infer<
  typeof assignBookingSchema
>;

export type UpdateBookingStatusInput = z.infer<
  typeof updateBookingStatusSchema
>;
