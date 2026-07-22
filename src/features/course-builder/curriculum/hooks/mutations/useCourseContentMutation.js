import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseKeys } from "@/lib/queryKeys";
import { useGlobalMutation } from "@/shared/hooks/useGlobalMutation";
import { errorToast, successToast } from "@/shared/utils/toastUtils";

/**
 * Shared factory for every section/lesson mutation. Each concrete hook
 * (useCreateSection, useDeleteLesson, ...) used to hand-roll the same
 * cancel -> snapshot -> optimistic-update -> rollback-on-error -> toast
 * -> invalidate sequence. That's now written once, here — a concrete
 * hook just describes *what* changes in the cache, not *how* the
 * cache dance works.
 *
 * `useGlobal: false` opts out of the app-wide mutation wrapper for
 * mutations that manage their own inline progress UI (lesson video
 * uploads), matching the original behaviour.
 */
export const useCourseContentMutation = ({
  courseId,
  mutationFn,
  optimisticUpdate,
  applyServerResult,
  successMessage,
  errorMessage,
  useGlobal = true,
}) => {
  const queryClient = useQueryClient();
  const queryKey = courseKeys.edit(courseId);
  const mutationHook = useGlobal ? useGlobalMutation : useMutation;

  return mutationHook({
    mutationFn,

    onMutate: async (vars) => {
      if (!optimisticUpdate) return {};
      await queryClient.cancelQueries({ queryKey });
      const prevCourse = queryClient.getQueryData(queryKey);
      if (!prevCourse) return { prevCourse: null };
      queryClient.setQueryData(queryKey, (old) => optimisticUpdate(old, vars));
      return { prevCourse };
    },

    onError: (err, vars, ctx) => {
      if (ctx?.prevCourse) queryClient.setQueryData(queryKey, ctx.prevCourse);
      if (errorMessage) errorToast(errorMessage);
    },

    onSuccess: (result, vars) => {
      if (applyServerResult) {
        queryClient.setQueryData(queryKey, (old) => applyServerResult(old, result, vars));
      }
      if (successMessage) successToast(successMessage);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
