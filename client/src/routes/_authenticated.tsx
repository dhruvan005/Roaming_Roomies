// _authenticated.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQueryOptions } from "../lib/api";
import { Component as LayoutComponent } from "./_authenticated/layout";
import { queryClient } from "../lib/api";

export const isAuthenticated = async () => {
  try {
    // First check if we already have the data in cache
    const cachedData = await useQueryOptions.queryFn();
    // console.log("Cached data:", cachedData);
    // it checks if the user is already authenticated
    // If the user is already authenticated, return true
    if (cachedData?.user) {
      return true;
    }
    // if user is not found in chache,then fetch the data
    // Only fetch if not in cache
    const data = await queryClient.fetchQuery({
      ...useQueryOptions,
      staleTime: 5 * 60 * 1000, // Cache valid for 5 minutes
    });
    console.log("Fetched data:", data);
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
