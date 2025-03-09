import { createFileRoute } from "@tanstack/react-router";
import { FloatButton } from "antd";

import { useQuery } from "@tanstack/react-query";
import UserList from "../components/UserList";
// import { useState } from "react";
import { ApiResponse, User } from "../types";
export const Route = createFileRoute("/allUsers")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-4">
      <div className="h-2"></div>

      <UserList />

      <FloatButton.BackTop />
    </div>
  );
}
