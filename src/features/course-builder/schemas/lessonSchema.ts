import { z } from "zod";

export const lessonSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
});
export type LessonFormValues = z.infer<typeof lessonSchema>;
