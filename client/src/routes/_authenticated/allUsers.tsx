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

function RouteComponent() {
  const { data } = useUsers(); 
  const totalUsers = data?.total || 0; 

  return (
    <div className="p-4">
      <div className="h-2"></div>
      <UserListHeader onRefresh={handleRefresh} />

      <UserList />
      <UserListFooter totalUsers={totalUsers} /> {/* Pass totalUsers as a prop */}
      <FloatButton.BackTop />
    </div>
  );
}
