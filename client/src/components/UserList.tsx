import React, { useState, useEffect } from "react";
import { Button, List, Skeleton, Avatar } from "antd";
import { useUsers, dataControls } from "../lib/api";
import { Heart } from "lucide-react";
import { User } from "../types";
import { get } from "http";

const UserList: React.FC = () => {
  // Use the optimized query hook
  const { isPending, isError, data, error } = useUsers();
  const [likedUsers, setLikedUsers] = useState<Set<string>>(new Set());

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

  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    if (data?.users) {
      setList(data.users);
    }
  }, [data]);
  // console.log("UserList data", data);

  const handleRefresh = () => {
    dataControls.refreshUsers();
  };

  const getUserProfile = (user: User) => {
    return (
      <div>
        <h2 className="text-center text-2xl  font-semibold">
          {user.firstName} {user.lastName}
        </h2>
        <div className="h-2"></div>
        <div className="flex justify-center items-center mb-4">
          <Avatar src={user.profileImage} size={100} />
        </div>
        <div className="text-center text-md mb-4">
          <p>{user.occupation}</p>
          <p>{user.age}</p>
          <p>{user.desiredRoomType}</p>
          <p>{user.maxRent}$</p>
        </div>
      </div>
    );
  };
  const skeletonItems = Array(4).fill({});

  return (
    <div>
      <style>{`
        .custom-list-item .ant-list-item-action {
          display: flex;
          justify-content: center;
          align-items: center;
          }
          
          .custom-list-item .ant-list-item-action li {
            display: flex;
            justify-content: center;
            margin: 0 8px;
        }
      `}</style>
      <div className="flex justify-between items-center mb-4">
        <p>Total users: {data?.total || 0}</p>
        <Button onClick={handleRefresh}>Refresh Data</Button>
      </div>

      <h2 className="text-center text-2xl  font-semibold">
        Find Your Future Roommate !!
      </h2>
      <div className="h-2"></div>

      {isError && <div>Error loading users</div>}

      {isPending ? (
        <div style={{ height: "40dvh", borderRadius: "10px", padding: "10px" }}>
          {skeletonItems.map((_, index) => (
            <div key={index} style={{ marginBottom: "16px" }}>
              <Skeleton avatar paragraph={{ rows: 1 }} active />
            </div>
          ))}
        </div>
      ) : (
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={list}
          style={{}}
          renderItem={(user: any) => (
            <List.Item
              key={user.id}
              className="custom-list-item"
              actions={[
                <a key="like" className="flex items-center justify-center mr-2">
                  <Heart
                    onClick={() => handleLike(user.id)}
                    className={`w-6 h-6 bg-gray-200 p-1 backdrop-blur-2xl rounded-full shadow-md hover:shadow-lg transition-shadow ${
                      likedUsers.has(user.id)
                        ? "fill-red-200 text-red-500"
                        : "text-gray-600 hover:fill-red-200 hover:text-red-500"
                    }`}
                  />
                </a>,
                <a
                  key="more"
                  className="flex items-center text-md"
                  
                >
                  Load More
                </a>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={user.profileImageUrl} />}
                title={
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                }
                description={`${user.occupation} · ${user.age} · ${user.desiredRoomType} · ${user.maxRent}$`}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default UserList;
