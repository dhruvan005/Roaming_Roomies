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
  // console.log(isPending);
  return (
    <>
      <div className="max-w-[80vw] md:max-w-3xl m-auto border rounded-md">
        <div className="text-gray-300 md:p-10 p-5">
          <h1 className="md:text-2xl text-xl font-bold">Profile</h1>
          {isPending && <Skeleton className="h-[100px] w-[250px] rounded-xl" />}
          {isError && <span>Error: {error.message}</span>}
          {data && (
            <div className="p-4">
              {/* <div>
                <span className="font-bold"><img src={`${data.user.picture}`}  alt="profilePhoto" /></span> 
              </div> */}
              <div>
                <span className="font-bold">Name:</span> {data.user.given_name}
              </div>
              <div>
                <span className="font-bold">Email:</span> {data.user.email}
              </div>
            </div>
          )}
          <Button
            className="bg-red-900 cursor-pointer hover:bg-red-500 hover:text-black"
          >
            <a href="/api/logout"> Logout</a>
          </Button>
        </div>
      </div>
    </>
  );
}
