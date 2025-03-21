import { Button } from "antd";
import { createFileRoute } from "@tanstack/react-router";

export function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className="relative flex flex-col w-full sm:w-[60vw] md:w-[40vw] lg:w-[30vw] p-6 sm:p-8 md:p-10 
          justify-center rounded-xl m-auto border border-gray-700 shadow-2xl 
          bg-gradient-to-br from-gray-900 to-gray-800"
      >
        <div className="text-center text-2xl sm:text-3xl font-bold mb-8 text-white">
          Welcome Back
          <p className="text-sm font-normal text-gray-300 mt-2">
            Please login or create a new account
          </p>
        </div>

        <Button
          className="mt-4 bg-red-700 hover:bg-red-600 text-white py-3 px-6 rounded-lg 
            cursor-pointer transition-all duration-300 ease-in-out text-lg font-medium
            border-none shadow-lg hover:shadow-red-700/30 hover:scale-105"
          onClick={() => (window.location.href = "/api/login")}
        >
          Login
        </Button>

        <Button
          className="mt-4 bg-green-700 hover:bg-green-600 text-white py-3 px-6 rounded-lg 
            cursor-pointer transition-all duration-300 ease-in-out text-lg font-medium
            border-none shadow-lg hover:shadow-green-700/30 hover:scale-105"
          onClick={() => (window.location.href = "/api/register")}
        >
          Register
        </Button>

        <div
          className="absolute -z-10 w-[200px] h-[200px] blur-[120px] rounded-full 
            bg-red-900/50 -top-10 -left-10"
        ></div>
        <div
          className="absolute -z-10 w-[200px] h-[200px] blur-[120px] rounded-full 
            bg-green-900/50 -bottom-10 -right-10"
        ></div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/login")({
  component: Login,
});
