import { createFileRoute } from "@tanstack/react-router";
import { FloatButton } from "antd";
import { useUsers, dataControls } from "../../lib/api";
import UserList from "../../components/UserList";
import UserListFooter from "../../components/UserListFooter";
import UserListHeader from "../../components/UserListHeader";

export const Route = createFileRoute("/_authenticated/allUsers")({
  component: RouteComponent,
});

const handleRefresh = () => {
  dataControls.refreshUsers();
};

const handlePageChange = (page: number, limit: number) => {
  dataControls.loadMoreUsers(page, limit); // Trigger API request for the specific page
  console.log(`Fetching users for page ${page} with page size ${limit}`);
};

function RouteComponent() {
  const { data } = useUsers();
  const totalUsers = data?.total || 0;
  
  console.log("data", data);

  return (
    <div className="p-4">
      <div className="h-2"></div>
      <UserListHeader onRefresh={handleRefresh} />
      <UserList />
      <UserListFooter
        totalUsers={totalUsers}
        fetchUsers={handlePageChange} // Pass the function to fetch users
      />{" "}
      {/* Pass totalUsers as a prop */}
      <FloatButton.BackTop />
    </div>
  );
}
