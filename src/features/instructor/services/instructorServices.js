import axiosInstance from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/endpoints";

export const instructorService = {
  fetchInstructorStudents: async (params) => {
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.INSTRUCTOR_STUDENTS,
      {
        params,
      }
    );

    return data;
  },
};
