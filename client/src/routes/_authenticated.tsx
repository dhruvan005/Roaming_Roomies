// _authenticated.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQueryOptions } from "../lib/api";
import { Component as LayoutComponent } from "./_authenticated/layout";
import { queryClient } from "../lib/api";

export const isAuthenticated = async () => {
  try {
    console.log("Checking authentication...");
    
    // First check if we already have the data in cache
    const cachedData = queryClient.getQueryData(useQueryOptions.queryKey) as { user?: any } | undefined;
    
    if (cachedData?.user) {
      console.log("Using cached user data:", cachedData.user);
      return true;
    }
    
    console.log("Fetching user data from API...");
    const data = await queryClient.fetchQuery({
      ...useQueryOptions,
      staleTime: 5 * 60 * 1000, // Cache valid for 5 minutes
    }) as { user?: any };
    
    console.log("Fetched user data:", data);
    return data?.user ? true : false;
  } catch (error) {
    console.error("Authentication error:", error);
    return false;
  }
};

export const Route = createFileRoute("/_authenticated")({
  loader: async ({ location }) => {
    console.log("=== AUTHENTICATION LOADER ===");
    console.log("Checking authentication for:", location.pathname);
    
    const authenticated = await isAuthenticated();
    console.log("Authentication result:", authenticated);
    
    if (!authenticated) {
      console.log("Not authenticated, redirecting to login");
      throw redirect({
        to: "/login",
      });
    }
    
    console.log("Authentication successful, proceeding to route");
    console.log("=== END AUTHENTICATION LOADER ===");
    return { authenticated };
  },
  component: LayoutComponent,
});
