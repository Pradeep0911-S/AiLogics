
import { z } from "zod";

const usernameSchema = z
  .string({ error: "Username is required" })
  .trim()
  .min(1, "Username is required")
  .min(3, "Username must contain at least 3 characters")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can contain only letters, numbers, and underscores"
  );

const emailSchema = z
  .string({ error: "Email is required" })
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email address");

const passwordSchema = z
  .string({ error: "Password is required" })
  .min(1, "Password is required")
  .min(8, "Password must contain at least 8 characters")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/[0-9]/, "Password must contain a number")
  .regex(/[^a-zA-Z0-9]/, "Password must contain a special character");

export const registerSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  username: usernameSchema.optional(),
  email: emailSchema.optional(),
  password: z
    .string({ error: "Password is required" })
    .min(1, "Password is required"),
}).refine(
  (data) => Boolean(data.username || data.email),
  {
    message: "Username or email is required",
    path: ["username"],
  }
);

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
