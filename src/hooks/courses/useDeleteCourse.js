import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../../services/courseService";
import { successToast } from "../../utils/toastUtils";

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => courseService.deleteCourse(id),
    onSuccess: () => {
      ["courses", "adminCourses", "instructorCourses"].forEach((key) =>
        queryClient.invalidateQueries([key])
      );
      successToast("Course deleted successfully!");
    },
  });
};
