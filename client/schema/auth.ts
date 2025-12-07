// src/schemas/auth.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export const registerSchema=z.object({
username:z.string().min(1,'username is required'),
firstName:z.string().min(5,'first name is required'),
lastName:z.string().min(5,'last name is required'),
email: z.email().min(1, "Email is required"),
password: z.string().min(6, "Password must be at least 6 characters"),
})
export type LoginInput = z.infer<typeof loginSchema>;
export type registerInput=z.infer<typeof registerSchema>;
