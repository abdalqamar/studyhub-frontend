import { courseKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { courseService } from "../services/courseService";
import { errorToast } from "@/shared/utils/toastUtils";

export const useCoursePreview = (id) => {
  return useQuery({
    queryKey: courseKeys.preview(id),
    queryFn: () => courseService.getCoursePreview(id),
    enabled: !!id,
    onError: () => {
      errorToast("Failed to load course preview");
    },
  });
};
