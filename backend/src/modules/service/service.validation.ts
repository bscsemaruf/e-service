import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const CATEGORIES = [
  "AC Repair",
  "AC Gas Refill",
  "AC Installation",
  "Refrigerator Repair",
  "Freezer Repair",
  "Home Appliance",
] as const;

// ─────────────────────────────
// CREATE SERVICE SCHEMA
// ─────────────────────────────
export const createServiceSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Too long"),

  price: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), {
      message: "Price must be a number",
    })
    .refine((val) => val >= 0, {
      message: "Price cannot be negative",
    }),

  category: z.enum(CATEGORIES),
});

// ─────────────────────────────
// UPDATE SCHEMA
// ─────────────────────────────
export const updateServiceSchema = createServiceSchema.partial();

// ─────────────────────────────
// VALIDATION MIDDLEWARE
// ─────────────────────────────
export const validateRequest =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));

      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
      return;
    }

    req.body = result.data;
    next();
  };
