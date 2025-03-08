import { createFileRoute } from "@tanstack/react-router";

import { useQuery } from "@tanstack/react-query";
import UserList from "../components/UserList";
// import { useState } from "react";

export const Route = createFileRoute("/allUsers")({
  component: RouteComponent,
});

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: "male" | "female" | "non_binary" | "other" | "prefer_not_to_say";
  occupation: string;
  sleepSchedule: string;
  cleanlinessLevel: number;
  dietaryPreferences: string;
  smokingTolerance: boolean;
  petTolerance: boolean;
  alcoholTolerance: boolean;
  interests: string[];
  personalityTraits: Record<string, any>;
  desiredRoomType: "apartment" | "house" | "studio" | "other";
  maxRent: number;
  preferredLocations: string[];
  moveInDate: Date;
  minimumStay: number;
  bio: string;
  profileImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ApiResponse {
  success: boolean;
  page: number;
  limit: number;
  total: string;
  users: User[];
}

function RouteComponent() {
  const { isLoading, error, data } = useQuery<ApiResponse>({
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
  // console.log(data);
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
            <img src={user.profileImageUrl} alt="" />
            {user.firstName} {user.lastName} - {user.email} - {user.phone} - {user.age} - {user.occupation} - { user.maxRent}$
          </li>
        ))}
      </ul>
        <UserList />
    </div>
  );
}
