import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../../services/courseService";
import { successToast } from "../../utils/toastUtils";

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => courseService.createReview(id),
    onSuccess: () => {
      ["courses", "adminCourses", "instructorCourses"].forEach((key) =>
        queryClient.invalidateQueries([key])
      );
      successToast("Review created successfully!");
    },
  });
};
