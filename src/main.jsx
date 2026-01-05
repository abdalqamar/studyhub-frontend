import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/toast.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./routes/AppRoutes.jsx";
import { Toaster } from "react-hot-toast";
import store from "./app/store";
import { injectStore } from "./api/axiosInstance.js";
injectStore(store);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
);
