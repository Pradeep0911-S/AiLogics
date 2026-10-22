import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(3, "Name must contain at least 3 characters");

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Please enter a valid email address");

const passwordSchema = z
  .string()
  .min(8, "Password must contain at least 8 characters")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/[0-9]/, "Password must contain a number")
  .regex(
    /[^a-zA-Z0-9]/,
    "Password must contain a special character"
  );

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(1, "Password is required"),
});

export type RegisterInput = z.infer<
  typeof registerSchema
>;

export type LoginInput = z.infer<
  typeof loginSchema
>;