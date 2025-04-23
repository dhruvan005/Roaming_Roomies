import React from "react";
import { Button, Pagination , Divider } from "antd";

interface UserListFooterProps {
  totalUsers: string | number;
}

const UserListFooter: React.FC<UserListFooterProps> = ({ totalUsers }) => {
  return (
    <>
      <div className="absolute bottom-5 right-10 ">
        <div className="flex justify-between items-center mb-4 gap-3 bg-white shadow-2xl rounded-2xl py-2 px-3">
        <p>Total users: {totalUsers}</p>
        <Divider type="vertical" />
        <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </>
  );
};

export default UserListFooter;
