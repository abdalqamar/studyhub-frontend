import { useLoading } from "@/context/LoadingContext";
import { useMutation } from "@tanstack/react-query";

export const useGlobalMutation = (options = {}) => {
  const { show, hide } = useLoading();

  return useMutation({
    ...options,

    onMutate: async (variables) => {
      show();
      // Agar caller ka apna onMutate hai, usse bhi call karo
      return options.onMutate?.(variables);
    },

    onSuccess: (data, variables, context) => {
      hide();
      options.onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      hide();
      options.onError?.(error, variables, context);
    },

    onSettled: (data, error, variables, context) => {
      // Safety net — agar onSuccess/onError mein kuch throw ho,
      // overlay phir bhi close ho jaayega
      hide();
      options.onSettled?.(data, error, variables, context);
    },
  });
};
