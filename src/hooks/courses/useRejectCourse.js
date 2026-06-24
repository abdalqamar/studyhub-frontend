import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../../services/courseService";
import { successToast } from "../../utils/toastUtils";

export const useRejectCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, feedback }) => courseService.rejectCourse(id, feedback),

    onSuccess: () => {
      successToast("Course rejected!");
      queryClient.invalidateQueries(["adminCourses"]);
    },
  });
};
