import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "@/features/courses/services/courseService";
import { successToast } from "@/shared/utils/toastUtils";
import { courseKeys } from "@/lib/queryKeys";

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
