import React from "react";
import { Button } from "antd";
import { useUsers, dataControls } from "../lib/api";

const UserList: React.FC = () => {
  // Use the optimized query hook
  const { isPending, isError, data, error } = useUsers();
  
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error loading users: {error.message}</div>;

  // Manual refresh function when needed
  const handleRefresh = () => {
    dataControls.refreshUsers();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p>Total users: {data?.total || 0}</p>
        <Button onClick={handleRefresh}>Refresh Data</Button>
      </div>
      
      <h2>Users List</h2>
      
      <ul>
        {data?.users && data.users.length > 0 ? (
          data.users.map((user) => (
            <li key={user.id}>
              {user.firstName} {user.lastName} - {user.email} - {user.phone} -{" "}
              {user.age} - {user.occupation} - {user.maxRent}$
            </li>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
};

export default UserList;