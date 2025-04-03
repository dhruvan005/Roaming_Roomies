import React, { useState, useEffect } from "react";
import { List } from "antd";
import { useUsers, dataControls } from "../lib/api";
import { UserType } from "../types";
import UserListHeader from "./UserListHeader";
import UserListItem from "./UserListItem";
import UserProfileModal from "./UserProfileModal";
import LoadingSkeleton from "./LoadingSkeleton";

const UserList: React.FC = () => {
  const [list, setList] = useState<UserType[]>([]);
  const { isPending, isError, data, error } = useUsers();
  const [likedUsers, setLikedUsers] = useState<Set<string>>(new Set());
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (data?.users) {
      setList(data.users);
    }
  }, [data]);

  const handleRefresh = () => {
    dataControls.refreshUsers();
  };

  const handleLike = (userId: string) => {
    setLikedUsers((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(userId)) {
        newLiked.delete(userId);
      } else {
        newLiked.add(userId);
      }
      return newLiked;
    });
    console.log(`Liked user with ID: ${userId}`);
  };

  const showUserDetails = (user: UserType) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isError && <div>Error loading users</div>}

      {isPending ? (
        <LoadingSkeleton />
      ) : (
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(user: UserType) => (
            <UserListItem
              user={user}
              isLiked={likedUsers.has(user.id)}
              onLike={() => handleLike(user.id)}
              onShowDetails={() => showUserDetails(user)}
            />
          )}
        />
      )}

      <UserProfileModal
        isOpen={isModalOpen}
        user={selectedUser}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default UserList;
