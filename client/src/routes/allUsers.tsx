import { createFileRoute } from "@tanstack/react-router";
import { api } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const Route = createFileRoute("/allUsers")({
  component: RouteComponent,
});

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface ApiResponse {
  success: boolean;
  page: number; 
  limit: number;
  total: string;
  users: User[];
}

function RouteComponent() {
  const { isLoading, error, data, refetch } = useQuery<ApiResponse>({
    queryKey: ["allUsers"],
    queryFn: async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        
        return response.json();
      } catch (err) {
        console.error("Error fetching users:", err);
        throw err;
      }
    },
  });
  console.log(data)
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div>
       <h1>All Users</h1>
      <p>Total users: {data?.total}</p>
      {/* <p>Page: {data?.page} of {Math.ceil(parseInt(data?.total || "0") / (data?.limit || 1))}</p> */}
      
      <ul>
        {data?.users?.map((user: User) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} - {user.email} - {user.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}
