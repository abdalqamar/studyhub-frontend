// import { createRoot } from "react-dom/client";
// import "./index.css";
// import "./styles/toast.css";
// import { RouterProvider } from "react-router-dom";
// import { QueryClientProvider } from "@tanstack/react-query";
// import router from "./routes/AppRoutes.jsx";
// import { Toaster } from "react-hot-toast";
// import { LoadingProvider } from "./context/LoadingContext.jsx";
// import { queryClient } from "./app/queryClient";

// createRoot(document.getElementById("root")).render(
//   <QueryClientProvider client={queryClient}>
//     <LoadingProvider>
//       <Toaster position="top-center" />
//       <RouterProvider router={router} />
//     </LoadingProvider>
//   </QueryClientProvider>
// );

import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/toast.css";
import AppProviders from "@/app/AppProviders";

createRoot(document.getElementById("root")).render(<AppProviders />);
