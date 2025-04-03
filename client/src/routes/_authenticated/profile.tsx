import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useQueryOptions } from "../../lib/api";
import { Button , Avatar } from "antd";
import { Link, useNavigate } from "@tanstack/react-router";
import { getUserByEmail } from "../../lib/api";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, isError, data, error } = useQuery(useQueryOptions);
  const navigate = useNavigate();
  console.log("Profile Data: of the logged in user", data?.user.email);

  // Check if the user profile created or not
  // If not, redirect to the profile creation page
  const { data: userData, isPending: isUserPending } = getUserByEmail(
    data?.user?.email || ""
  );

  console.log("profile created or not", userData);

  useEffect(() => {
    if (isUserPending) {
      console.log("Loading user data...");
    } else {
      console.log("User data loaded:", userData);
    }
  }, [userData, isUserPending]);

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

        {isUserPending && (
          <Skeleton className="h-[100px]  w-full rounded-xl" active />
        )}

        {isError && (
          <div className="text-red-500 text-center p-4">
            Error: {error.message}
          </div>
        )}

        {userData && (
          <div className="space-y-4 mb-3 text-gray-300">
            <div className="p-4 bg-gray-700/50 rounded-lg">
              <div className="flex justify-center mb-4">
              <Avatar
              src={userData.data.profileImageUrl}
              size={120}
              style={{
                border: "4px solid white",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            />
              </div>
              <div className="mb-3">
                <span className="font-bold text-gray-400">Name: </span>
                <span className="ml-2">
                  {userData.data.firstName} {userData.data.lastName}
                </span>
              </div>
              <div className="">
                <span className="font-bold text-gray-400">Email:</span>
                <span className="ml-2">{userData.data.email}</span>
              </div>
            </div>
          </div>
        )}

        <Button className="bg-gray-500/50 " type="primary" href="/api/logout">
          Logout
        </Button>
      </div>
    </div>
  );
}
