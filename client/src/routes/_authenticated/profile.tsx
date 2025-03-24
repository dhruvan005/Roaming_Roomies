// add kinde auth id to the database
// then fatch using the kinde auth id
// then show the user profile




import { createFileRoute } from "@tanstack/react-router";
import { Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useQueryOptions } from "../../lib/api";
import { Button } from "antd";
import { api } from "../../lib/api"; // Add this line to import the api object
import { Link, useNavigate } from "@tanstack/react-router";
import { Spin, Alert } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, isError, data, error } = useQuery(useQueryOptions);
  const navigate = useNavigate();

  // Get current authenticated user
  const { data: userData, isPending: isUserLoading } =
    useQuery(useQueryOptions);


  // // Check if user profile exists using the user's email
  // const { data: profileData, isPending: isProfileLoading } = useQuery({
  //   queryKey: ["userProfile", userData?.user?.email],
  //   queryFn: async () => {
  //     // Only fetch if we have the user email
  //     if (!userData?.user?.email) return null;
     
  //     // Use the user API endpoint to check for profile by email
  //     const response = await api.user.$get({
  //       query: { email: userData.user.email },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch user profile");
  //     }

  //     const data = await response.json();
  //     console.log(" user profile data... ", data);
  //     // If users array has entries, profile exists
  //     return {
  //       exists: data.users && data.users.length > 0,
  //       profileData: data.users && data.users.length > 0 ? data.users[0] : null,
  //     };
  //   },
  //   // Don't run query until we have the user email
  //   enabled: !!userData?.user?.email,
  // });

  // const isLoading = isUserLoading || isProfileLoading;
  // const profileExists = profileData?.exists;

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <Spin size="large" tip="Loading user information..." />
  //     </div>
  //   );
  // }

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
                <span className="ml-2">
                  {data.user.given_name} {data.user.family_name}
                </span>
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

        {/* <div className="mt-6">
          {profileExists ? (
            <Alert
              message="Profile Status"
              description="You have created a user profile. You can view or edit it from your profile page."
              type="success"
              showIcon
              className="mb-6 max-w-md"
            />
          ) : (
            <Alert
              message="Profile Status"
              description="You haven't created a user profile yet. Create a profile to connect with potential roommates."
              type="warning"
              showIcon
              className="mb-6 max-w-md"
              action={
                <Button
                  type="primary"
                  size="small"
                  onClick={() => navigate({ to: "/roomListing" })}
                >
                  Create Profile
                </Button>
              }
            />
          )}

          <div className="flex gap-4">
            {!profileExists && (
              <Button
                type="default"
                size="large"
                icon={<UserAddOutlined />}
                className="flex items-center gap-2"
                onClick={() => navigate({ to: "/roomListing" })}
              >
                Create Profile
              </Button>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
}
