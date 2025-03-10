import React, { useState, useEffect } from "react";
import { Button, List, Skeleton, Avatar } from "antd";
import { useUsers, dataControls } from "../lib/api";

const UserList: React.FC = () => {
  // Use the optimized query hook
  const { isPending, isError, data, error } = useUsers();
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    
    if (data?.users) {
      setList(data.users);
    }
  }, [data]);

  // Manual refresh function when needed
  const handleRefresh = () => {
    dataControls.refreshUsers();
  };

  // Create placeholder items for skeleton loading
  const skeletonItems = Array(4).fill({});

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p>Total users: {data?.total || 0}</p>
        <Button onClick={handleRefresh}>Refresh Data</Button>
      </div>

      <h2 className="text-center text-xl font-semibold">
        Find Your Future Roommate !!
      </h2>
      <div className="h-2"></div>

      {isError && <div>Error loading users</div>}

      {isPending ? (
        <div style={{ height: "40dvh", borderRadius: "10px", padding: "10px" }}>
          {skeletonItems.map((_, index) => (
            <div key={index} style={{ marginBottom: "16px" }}>
              <Skeleton 
                avatar 
                paragraph={{ rows: 1 }} 
                active 
              />
            </div>
          ))}
        </div>
      ) : (
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={list}
          style={{
            border: "1px solid #c7ced6",
            borderRadius: "10px",
            padding: "10px",
          }}
          renderItem={(user: any) => (
            <List.Item 
              key={user.id} 
              actions={[<a key="more">Load More</a>]}
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