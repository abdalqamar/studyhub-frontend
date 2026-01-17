import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

export const instructorService = {
  // fetchInstructorCourses: async (params) => {
  //   const { data } = await axiosInstance.get(
  //     API_ENDPOINTS.INSTRUCTOR_MY_COURSES,
  //     {
  //       params,
  //     }
  //   );

  //   return data;
  // },

  fetchInstructorStudents: async (params) => {
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.INSTRUCTOR_MY_STUDENTS,
      {
        params,
      }
    );

    return data;
  },
};
