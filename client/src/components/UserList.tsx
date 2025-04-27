import React, { useState, useEffect } from "react";
import { List } from "antd";
import { useUsers, dataControls, useQueryOptions } from "../lib/api";
import { UserType } from "../types";
import UserListHeader from "./UserListHeader";
import UserListItem from "./UserListItem";
import UserProfileModal from "./UserProfileModal";
import LoadingSkeleton from "./LoadingSkeleton";
import { useQuery } from "@tanstack/react-query";

const UserList: React.FC = () => {
  const [list, setList] = useState<UserType[]>([]);
  const { isPending, isError, data, error } = useUsers();
  const [likedUsers, setLikedUsers] = useState<Set<string>>(new Set());
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get current user data
  const {
    data: currentUser,
    isPending: isCurrentUserPending,
  } = useQuery(useQueryOptions);

  useEffect(() => {
    if (data?.users && currentUser?.user) {
      // Filter out the logged-in user from the list
      const filteredUsers = data.users.filter(user => user.email !== currentUser.user.email);
      setList(filteredUsers);
    } else if (data?.users) {
      setList(data.users);
    }
  }, [data, currentUser]);

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
        <div>
          <h2>liked </h2>
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
        </div>
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
