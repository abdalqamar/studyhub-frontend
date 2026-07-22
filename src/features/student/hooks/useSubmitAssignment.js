import { useQueryClient } from "@tanstack/react-query";
import { useGlobalMutation } from "@/shared/hooks/useGlobalMutation";
import { assignmentService } from "../services/assignmentService";
import { assignmentKeys } from "@/lib/queryKeys";

export const useSubmitAssignment = () => {
  const queryClient = useQueryClient();

  return useGlobalMutation({
    mutationFn: assignmentService.submit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assignmentKeys.all });
    },
  });
};
