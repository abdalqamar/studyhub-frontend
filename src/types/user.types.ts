export type UserRole = "admin" | "instructor" | "student";

export interface User {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  dateOfBirth?: string;
  contactNumber?: string;
  gender?: string;
  about?: string;
}
