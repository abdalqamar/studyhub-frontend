import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LoadingProvider } from "../context/LoadingContext.jsx";
import ErrorBoundary from "../shared/components/ErrorBoundary.jsx";
import { queryClient } from "./queryClient";
import router from "../routes/AppRoutes.jsx";

const AppProviders = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <LoadingProvider>
          <Toaster position="top-center" />
          <RouterProvider router={router} />
        </LoadingProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default AppProviders;
