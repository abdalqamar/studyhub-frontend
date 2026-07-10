import { z } from "zod";

export const courseDetailsSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Course name is required")
    .min(3, "Minimum 3 characters required"),
  description: z.string().trim().min(1, "Description is required"),
  price: z.coerce
    .number({ invalid_type_error: "Price is required" })
    .min(0, "Price can't be negative"),
  category: z.string().min(1, "Category is required"),
  tags: z
    .array(z.string())
    .min(1, "At least one tag is required")
    .max(5, "Maximum 5 tags allowed"),
  whatYouWillLearn: z.array(z.string()).superRefine((items, ctx) => {
    items.forEach((item, i) => {
      const trimmed = item.trim();
      if (i < 3 && !trimmed) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [i],
          message: "This learning outcome is required",
        });
      } else if (trimmed && trimmed.length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [i],
          message: "Must be at least 5 characters",
        });
      }
    });
  }),
  requirements: z.string().optional(),
  instructions: z.string().optional(),
});
