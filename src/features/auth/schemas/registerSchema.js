import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(3, "First name must be at least 3 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),

    email: z
      .string()
      .min(1, { message: "Email is required" })
      .pipe(z.email({ message: "Please enter a valid email address" })),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .refine(
        (val) => /[A-Z]/.test(val) && /[a-z]/.test(val) && /\d/.test(val),
        {
          message: "Password must contain uppercase, lowercase & number",
        }
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
