import { createFileRoute } from "@tanstack/react-router";

import { useQuery } from "@tanstack/react-query";
import UserList from "../components/UserList";
// import { useState } from "react";
import { ApiResponse, User } from "../types";
export const Route = createFileRoute("/allUsers")({
  component: RouteComponent,
});



function RouteComponent() {
  // const { isLoading, error, data } = useQuery<ApiResponse>({
  //   queryKey: ["allUsers"],
  //   queryFn: async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/api/user");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       return response.json();
  //     } catch (err) {
  //       console.error("Error fetching users:", err);
  //       throw err;
  //     }
  //   },
  // });
  // console.log(data);
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading users</div>;

  return (
    <div>
      <h1>All Users</h1>
      <UserList />
      
      
      
    </div>
  );
}
