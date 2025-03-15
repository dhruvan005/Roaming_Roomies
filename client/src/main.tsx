import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";

import { StrictMode } from "react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { queryClient } from "./lib/api";
import {  QueryClientProvider } from "@tanstack/react-query";
// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    queryClient,
  },
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}




createRoot(document.getElementById("root")!).render(
  <StrictMode>
    
      <QueryClientProvider client={queryClient}>
        
          <RouterProvider router={router} />
        
      </QueryClientProvider>
   
  </StrictMode>
);
