import { createFileRoute, Outlet, RouteContext } from "@tanstack/react-router";
import { Button } from "antd";
import { useQueryOptions } from "../lib/api";
import { queryClient } from "../lib/api";

const Login = () => {
  return (
    <>
      <div className="relative flex flex-col w-full sm:w-[60vw] md:w-[40vw] lg:w-[30vw] p-4 sm:p-6 md:p-10 justify-center rounded-md m-auto border-2 shadow-lg bg-opacity-10 backdrop-blur-md backdrop-saturate-150">
        <div className="text-center text-xl sm:text-2xl font-semibold mb-4">
          Please login or Register
        </div>
        <Button
          className="mt-4 bg-red-800 text-white py-2 px-4 rounded cursor-pointer"
          onClick={() => (window.location.href = "/api/login")}
        >
          Login
        </Button>
        <Button
          className="mt-4 bg-green-800 text-white py-2 px-4 rounded cursor-pointer"
          onClick={() => (window.location.href = "/api/register")}
        >
          Register
        </Button>
      </div>
    </>
  );
};

const Component = () => {
  const { user } = Route.useRouteContext();
  // console.log(user)
  if (!user) {
    return <Login />;
  }
  return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    if (!context.queryClient) {
      throw new Error("QueryClient is not available in context");
    }

    try {
      const data = await context.queryClient.fetchQuery(useQueryOptions);
      if (!data) {
        return { user: null };
      }
      return { user: data.user };
    } catch (error) {
      console.error("Authentication error:", error);
      return { user: null };
    }
  },
  component: Component,
});
