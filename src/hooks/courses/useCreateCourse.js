import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "../../utils/toastUtils";
import { courseService } from "../../services/courseService";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseData) => courseService.createCourse(courseData),

    onSuccess: (createdCourse) => {
      queryClient.setQueryData(["course", createdCourse._id], createdCourse);
      successToast("Course created successfully!");
      queryClient.invalidateQueries(["InstructorCourses"]);
    },

    onError: (err) => {
      errorToast("Failed to create course", err?.response?.data?.message);
    },
  });
};
