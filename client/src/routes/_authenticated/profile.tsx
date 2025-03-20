import { createFileRoute } from "@tanstack/react-router";
import { Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useQueryOptions } from "../../lib/api";
import { Button } from "antd";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});



function Profile() {
  const { isPending, isError, data, error } = useQuery(useQueryOptions);
 
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className="relative flex flex-col w-full sm:w-[60vw] md:w-[40vw] lg:w-[30vw] p-6 sm:p-8 md:p-10 
        justify-center rounded-xl m-auto border border-gray-700 shadow-2xl 
        bg-gradient-to-br from-gray-900 to-gray-800"
      >
        <div className="text-center text-2xl sm:text-3xl font-bold mb-8 text-white">
          Profile
          <p className="text-sm font-normal text-gray-300 mt-2">
            Your Account Information
          </p>
        </div>

        {isPending && (
          <Skeleton className="h-[100px] w-full rounded-xl" active />
        )}

        {isError && (
          <div className="text-red-500 text-center p-4">
            Error: {error.message}
          </div>
        )}

        {data && (
          <div className="space-y-4 mb-3 text-gray-300">
            {/* {data.user.picture && (
              <div className="flex  justify-center mb-6">
                <img
                  src={data.user.picture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-2 border-gray-600"
                />
              </div>
            )} */}
            <div className="p-4 bg-gray-700/50 rounded-lg">
              <div className="mb-3">
                <span className="font-bold text-gray-400">Name:</span>
                <span className="ml-2">{data.user.given_name}</span>
              </div>
              <div className="">
                <span className="font-bold text-gray-400">Email:</span>
                <span className="ml-2">{data.user.email}</span>
              </div>
            </div>
          </div>
        )}
        <Button className="bg-gray-500/50 " type="primary" href="/api/logout">
          Logout
        </Button>

        <div
          className="absolute -z-10 w-[200px] h-[200px] blur-[120px] rounded-full 
          bg-red-900/50 -top-10 -left-10"
        ></div>
        <div
          className="absolute -z-10 w-[200px] h-[200px] blur-[120px] rounded-full 
          bg-blue-900/50 -bottom-10 -right-10"
        ></div>
      </div>
    </div>
  );
}
