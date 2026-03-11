// src/schemas/auth.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export const registerSchema = z.object({
  username: z.string().min(1, "username is required"),
  firstName: z.string().min(5, "first name is required"),
  lastName: z.string().min(5, "last name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  terms: z.boolean().refine((v) => v === true, {
    message: "You must accept the terms and conditions",
  }),
});
export type LoginInput = z.infer<typeof loginSchema>;
export type registerInput=z.infer<typeof registerSchema>;
