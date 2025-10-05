import { z } from "zod";

// Create admin
export const createAdminSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").trim(),
    email: z.string().email("Invalid email address").trim(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["ADMIN", "SUPER_ADMIN"]).optional(),
  }),
});

// Login admin
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address").trim(),
    password: z.string(),
  }),
});

// Update admin
export const updateAdminSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").trim().optional(),
    email: z.string().email("Invalid email address").trim().optional(),
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
    role: z.enum(["ADMIN", "SUPER_ADMIN"]).optional(),
  }).refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  }),
});
