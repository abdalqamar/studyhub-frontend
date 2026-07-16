import { useLoading } from "@/context/LoadingContext";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useGlobalMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext> = {}
) => {
  const { show, hide } = useLoading();

  return useMutation({
    ...options,

    onMutate: async (variables, context) => {
      show();
      return options.onMutate?.(variables, context);
    },

    onSuccess: (data, variables, onMutateResult, context) => {
      hide();
      options.onSuccess?.(data, variables, onMutateResult as TContext, context);
    },

    onError: (error, variables, onMutateResult, context) => {
      hide();
      options.onError?.(error, variables, onMutateResult as TContext, context);
    },

    onSettled: (data, error, variables, onMutateResult, context) => {
      hide();
      options.onSettled?.(
        data,
        error,
        variables,
        onMutateResult as TContext,
        context
      );
    },
  });
};
