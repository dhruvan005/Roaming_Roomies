import { createFileRoute } from "@tanstack/react-router";
import { FloatButton } from "antd";
import { useUsers, dataControls } from "../../lib/api";

import { useQuery } from "@tanstack/react-query";
import UserList from "../../components/UserList";
// import { useState } from "react";
import { ApiResponse, User } from "../../types";
export const Route = createFileRoute("/_authenticated/allUsers")({
  component: RouteComponent,
});
import UserListHeader from "../../components/UserListHeader";

const handleRefresh = () => {
  dataControls.refreshUsers();
};

function RouteComponent() {
  return (
    <div className="p-4">
      <div className="h-2"></div>
      <UserListHeader onRefresh={handleRefresh} />

      <UserList />

      <FloatButton.BackTop />
    </div>
  );
}
