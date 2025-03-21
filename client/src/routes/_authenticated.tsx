// _authenticated.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQueryOptions } from "../lib/api";
import { Component as LayoutComponent } from "./_authenticated/layout";

export const isAuthenticated = async () => {
  try {
    const data = await useQueryOptions.queryFn();
    console.log("User data:", data);
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
  component: LayoutComponent
});