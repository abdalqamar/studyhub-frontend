import { useQuery } from "@tanstack/react-query";
import { courseService } from "../../services/courseService";
import { errorToast } from "../../utils/toastUtils";
import { courseKeys } from "../../lib/queryKeys";

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
