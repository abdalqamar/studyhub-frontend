import axiosInstance from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { User } from "@/types";

interface UpdatePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

interface EnrolledCourse {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  instructor: string;
  progressPercentage: number;
  totalDuration: string;
  totalLessons: number;
}

export const profileService = {
  // Get user profile
  getProfile: async (): Promise<User> => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.PROFILE);
    return data?.user;
  },

  // Update user profile
  updateProfile: async (profileData: Partial<User>): Promise<User> => {
    const { data } = await axiosInstance.put(
      API_ENDPOINTS.PROFILE_UPDATE,
      profileData
    );
    return data?.user;
  },

  // Update profile photo
  updatePhoto: async (photoData: FormData): Promise<User> => {
    const { data } = await axiosInstance.put(
      API_ENDPOINTS.PROFILE_PHOTO,
      photoData
    );
    return data?.user;
  },

  // Update user password
  updatePassword: async (
    passwordData: UpdatePasswordPayload
  ): Promise<void> => {
    const { data } = await axiosInstance.put(
      API_ENDPOINTS.AUTH_UPDATE_PASSWORD,
      passwordData
    );
    return data;
  },

  //User Enrolled courses
  getEnrolledCourses: async (): Promise<EnrolledCourse[]> => {
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.PROFILE_ENROLLED_COURSES
    );
    return data?.courses;
  },
};
