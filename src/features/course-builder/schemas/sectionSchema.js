import { z } from "zod";

export const sectionSchema = z.object({
  sectionName: z.string().trim().min(1, "Section name is required"),
});
