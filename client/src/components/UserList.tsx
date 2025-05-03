import React, { useState, useEffect } from "react";
import { List, Tabs, Modal, Avatar, Typography, Empty, Button } from "antd";
import { useUsers, dataControls, useQueryOptions } from "../lib/api";
import { UserType } from "../types";
import UserListHeader from "./UserListHeader";
import UserListItem from "./UserListItem";
import UserProfileModal from "./UserProfileModal";
import LoadingSkeleton from "./LoadingSkeleton";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb } from 'antd';
import { Heart } from "lucide-react";

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const LIKED_USERS_STORAGE_KEY = 'likedUsers';

const UserList: React.FC = () => {
  const [list, setList] = useState<UserType[]>([]);
  const { isPending, isError, data, error } = useUsers();
  const [likedUsers, setLikedUsers] = useState<Set<string>>(new Set());
  const [likedUsersList, setLikedUsersList] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLikedUsersModalOpen, setIsLikedUsersModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  // Get current user data
  const {
    data: currentUser,
    isPending: isCurrentUserPending,
  } = useQuery(useQueryOptions);

  // Load liked users from local storage on component mount
  useEffect(() => {
    const storedLikedUsers = localStorage.getItem(LIKED_USERS_STORAGE_KEY);
    if (storedLikedUsers) {
      setLikedUsers(new Set(JSON.parse(storedLikedUsers)));
    }
  }, []);

  useEffect(() => {
    if (data?.users && currentUser?.user) {
      // Filter out the logged-in user from the list
      const filteredUsers = data.users.filter(user => user.email !== currentUser.user.email);
      setList(filteredUsers);

      // Update liked users list
      const likedUsersArray = filteredUsers.filter(user => likedUsers.has(user.id));
      setLikedUsersList(likedUsersArray);
    } else if (data?.users) {
      setList(data.users);

      // Update liked users list
      const likedUsersArray = data.users.filter(user => likedUsers.has(user.id));
      setLikedUsersList(likedUsersArray);
    }
  }, [data, currentUser, likedUsers]);

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

      // Save to local storage
      localStorage.setItem(LIKED_USERS_STORAGE_KEY, JSON.stringify([...newLiked]));

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

  const openLikedUsersModal = () => {
    setIsLikedUsersModalOpen(true);
  };

  const closeLikedUsersModal = () => {
    setIsLikedUsersModalOpen(false);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div>
      {isError && <div>Error loading users</div>}

      {isPending ? (
        <LoadingSkeleton />
      ) : (
        <div>
          {/* Button For the liked user (it shows in the model) */}
          {/* <div className="flex items-center justify-between mb-4 mt-4">
            <Title level={4} style={{ margin: 0 }}>Users</Title>
            <Button
              type="primary"
              onClick={openLikedUsersModal}
              icon={<Heart className="w-4 h-4 mr-1" />}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              Liked Users ({likedUsersList.length})
            </Button>
          </div> */}

          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="All Users" key="1">
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
            </TabPane>
            <TabPane tab={`Liked Users (${likedUsersList.length})`} key="2">
              {likedUsersList.length > 0 ? (
                <List
                  className="demo-loadmore-list"
                  itemLayout="horizontal"
                  dataSource={likedUsersList}
                  renderItem={(user: UserType) => (
                    <UserListItem
                      user={user}
                      isLiked={true}
                      onLike={() => handleLike(user.id)}
                      onShowDetails={() => showUserDetails(user)}
                    />
                  )}
                />
              ) : (
                <Empty
                  description="No liked users yet"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </TabPane>
          </Tabs>
        </div>
      )}

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isModalOpen}
        user={selectedUser}
        onClose={handleModalClose}
      />

      {/* Liked Users Modal */}
      <Modal
        title="Liked Users"
        open={isLikedUsersModalOpen}
        onCancel={closeLikedUsersModal}
        footer={null}
        width={600}
      >
        {likedUsersList.length > 0 ? (
          <List
            className="liked-users-modal-list"
            itemLayout="horizontal"
            dataSource={likedUsersList}
            renderItem={(user: UserType) => (
              <List.Item
                key={user.id}
                actions={[
                  <Button
                    key="unlike"
                    type={likedUsers.has(user.id) ? "default" : "text"}
                    danger={likedUsers.has(user.id)}
                    shape="round"
                    onClick={() => handleLike(user.id)}
                    icon={<Heart className="w-4 h-4" fill={likedUsers.has(user.id) ? "currentColor" : "none"} />}
                  >
                    {likedUsers.has(user.id) ? "Unlike" : "Like"}
                  </Button>,
                  <Button
                    key="details"
                    type="primary"
                    onClick={() => {
                      showUserDetails(user);
                      closeLikedUsersModal();
                    }}
                  >
                    View Details
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={user.profileImageUrl} />}
                  title={`${user.firstName} ${user.lastName}`}
                  description={`${user.occupation} · ${user.age} · ${user.desiredRoomType} · ${user.maxRent}$`}
                />
              </List.Item>
            )}
          />
        ) : (
          <Empty
            description="You haven't liked any users yet"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Modal>
    </div>
  );
};

export default UserList;
