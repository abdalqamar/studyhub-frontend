import { useMutation, useQueryClient } from "@tanstack/react-query";
import { successToast } from "../../utils/toastUtils";
import { courseService } from "../../services/courseService";
import { courseKeys } from "../../lib/queryKeys";

export const useApproveCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => courseService.approveCourse(id),
    onSuccess: () => {
      successToast("Course approved!");
      queryClient.invalidateQueries({ queryKey: courseKeys.all });
    },
  });
};
