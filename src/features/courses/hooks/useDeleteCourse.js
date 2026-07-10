import { courseService } from "@/features/courses/services/courseService";
import { courseKeys } from "@/lib/queryKeys";
import { useGlobalMutation } from "@/shared/hooks/useGlobalMutation";
import { successToast } from "@/shared/utils/toastUtils";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useGlobalMutation({
    mutationFn: (id) => courseService.deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.all });
      successToast("Course deleted successfully!");
    },
  });
};
