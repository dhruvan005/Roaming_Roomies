import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { queryClient } from "./lib/api";
import { QueryClientProvider } from "@tanstack/react-query";
import { MessageProvider } from "./components/MessageProvider";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}




createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MessageProvider>
        <RouterProvider router={router} />
      </MessageProvider>
    </QueryClientProvider>
  </StrictMode>
);
