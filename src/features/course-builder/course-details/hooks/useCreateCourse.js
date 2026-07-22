import { courseService } from "@/features/courses/services/courseService";
import { courseKeys } from "@/lib/queryKeys";
import { useGlobalMutation } from "@/shared/hooks/useGlobalMutation";
import { errorToast, successToast } from "@/shared/utils/toastUtils";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useGlobalMutation({
    mutationFn: (courseData) => courseService.createCourse(courseData),

    onSuccess: (createdCourse) => {
      queryClient.setQueryData(courseKeys.edit(createdCourse._id), createdCourse);
      successToast("Course created successfully!");
      queryClient.invalidateQueries({ queryKey: courseKeys.all });
    },

    onError: (err) => {
      errorToast("Failed to create course", err?.response?.data?.message);
    },
  });
};
