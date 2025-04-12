// _authenticated.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQueryOptions } from "../lib/api";
import { Component as LayoutComponent } from "./_authenticated/layout";
import { queryClient } from "../lib/api";

export const isAuthenticated = async () => {
  try {
    // First check if we already have the data in cache using getQueryData
    const cachedData = queryClient.getQueryData(useQueryOptions.queryKey) as { user?: any } | undefined;
    
    // If we have valid cached data, use it
    if (cachedData?.user) {
      console.log("Using cached user data");
      return true;
    }
    
    // Only fetch if not in cache
    const data = await queryClient.fetchQuery({
      ...useQueryOptions,
      staleTime: 5 * 60 * 1000, // Cache valid for 5 minutes
    }) as { user?: any };
    
    console.log("Fetched user data");
    return data?.user ? true : false;
  } catch (error) {
    console.error("Authentication error:", error);
    return false;
  }
};

export const Route = createFileRoute("/_authenticated")({
  loader: async ({ location }) => {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      throw redirect({
        to: "/login",
      });
    }
    return { authenticated };
  },
  component: LayoutComponent,
});
