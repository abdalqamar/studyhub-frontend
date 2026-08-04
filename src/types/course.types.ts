import { Category } from "@/types";

export interface Lesson {
  _id: string;
  title: string;
  description?: string;
  duration?: string;
  videoUrl?: string;
}

export interface Section {
  _id: string;
  sectionName: string;
  lesson: Lesson[];
}

export interface CourseInstructor {
  firstName?: string;
  lastName?: string;
}

export interface Course {
  _id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  price?: number | string;
  category?: Category;
  courseContent?: Section[];
  whatYouWillLearn?: string[];
  status?: "approved" | "pending" | "rejected";
  instructor?: CourseInstructor;
  enrolledCount?: number;
  rating?: number | string;
  duration?: string;
}

export interface CourseDetail extends Course {
  discountedPrice?: number;
  totalLectures?: number;
  totalDuration?: string;
  courseContent?: Section[];
  whatYouWillLearn?: string[];
}

export type CourseAction =
  | "delete"
  | "feedback"
  | "reject"
  | "edit"
  | "preview"
  | "approve";
