export interface Lesson {
  _id: string;
  title: string;
  description: string;
  videoUrl?: string | null;
  duration?: number;
}

export interface Section {
  _id: string;
  sectionName: string;
  lesson: Lesson[];
}

export interface Course {
  _id: string;
  courseContent: Section[];
  [key: string]: unknown;
}
