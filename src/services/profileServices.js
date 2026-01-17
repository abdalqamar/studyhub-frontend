import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

export const profileService = {
  // Get user profile
  getProfile: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.GET_PROFILE);
    return data?.user;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const { data } = await axiosInstance.put(
      API_ENDPOINTS.UPDATE_PROFILE,
      profileData
    );
    return data?.user;
  },

  // Update profile photo
  updatePhoto: async (photoData) => {
    const { data } = await axiosInstance.put(
      API_ENDPOINTS.UPDATE_PHOTO,
      photoData
    );
    return data?.user;
  },

  // Update user password
  updatePassword: async (passwordData) => {
    const { data } = await axiosInstance.put(
      API_ENDPOINTS.UPDATE_PASSWORD,
      passwordData
    );
    return data;
  },

  //User Enrolled courses
  getEnrolledCourses: async () => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ENROLLED_COURSES);
    return data?.courses;
  },
};
