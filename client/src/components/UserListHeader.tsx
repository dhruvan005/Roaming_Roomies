import React from "react";
import { Button } from "antd";

interface UserListHeaderProps {
  // totalUsers: number;
  onRefresh: () => void;
}

const UserListHeader: React.FC<UserListHeaderProps> = ({
  // totalUsers,
  onRefresh,
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        {/* <p>Total users: {totalUsers}</p> */}
        <p></p>
        <Button onClick={onRefresh}>Refresh Data</Button>
      </div>

      <h2 className="text-center text-2xl font-semibold">
        Find Your Future Roommate !!
      </h2>
      <div className="h-2"></div>
    </>
  );
};

export default UserListHeader;
