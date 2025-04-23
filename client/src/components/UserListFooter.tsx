import React, { useState } from "react";
import { Pagination, Divider } from "antd";

interface UserListFooterProps {
  totalUsers: number; // Ensure this is a number for proper pagination
  fetchUsers: (page: number, limit: number) => void; // Function to fetch users
}

const UserListFooter: React.FC<UserListFooterProps> = ({
  totalUsers,
  fetchUsers,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10; // Number of users per page

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchUsers(page, limit); // Fetch users for the selected page
  };

  return (
    <>
      <div className="absolute bottom-5 right-10">
        <div className="flex justify-between items-center mb-4 gap-3 bg-white shadow-2xl rounded-2xl py-2 px-3">
          <p>Total users: {totalUsers}</p>
          <Divider type="vertical" />
          <Pagination
            current={currentPage}
            total={totalUsers} // Use totalUsers here
            pageSize={limit} // Use limit as the page size
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default UserListFooter;
