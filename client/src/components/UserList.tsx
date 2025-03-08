import React, { useState, useEffect } from "react";
import { Button, List, Skeleton, Avatar } from "antd";
import { useUsers, dataControls } from "../lib/api";

const UserList: React.FC = () => {
  // Use the optimized query hook
  const { isPending, isError, data, error } = useUsers();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(data?.users || []);

  useEffect(() => {
    if (data?.users) {
      setList(data.users);
    }
  }, [data]);

  // Manual refresh function when needed
  const handleRefresh = () => {
    dataControls.refreshUsers();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        {/* <p>Total users: {data?.total || 0}</p> */}
        <p></p>
        <Button onClick={handleRefresh}>Refresh Data</Button>
      </div>

      <h2 className="text-center text-xl  font-semibold">Find Your Future Roommate !!</h2>

      {isPending && <div>Loading...</div>}
      {isError && <div>Error loading users: {error.message}</div>}

      {!isPending && !isError && (
        <List className="demo-loadmore-list" loading={loading} itemLayout="horizontal" style={{ border: "1px solid #f0f0ff  " ,
        borderRadius: "10px",
        padding: "10px",
        }}>
          {list.map((user) => (
            <List.Item key={user.id} actions={[<a key="more">Load More</a>]}>
              <Skeleton avatar title={false} loading={loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={user.profileImageUrl} />}
                  title={<a href="https://ant.design">{user.firstName} {user.lastName}</a>}
                  description={`${user.occupation} · ${user.age} · ${user.desiredRoomType} · ${user.maxRent}$`}
                />
              </Skeleton>
            </List.Item>
          ))}
        </List>
      )}
    </div>
  );
};

export default UserList;