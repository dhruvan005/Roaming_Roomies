import React, { useState, useEffect } from "react";
import { Button, List, Skeleton, Avatar } from "antd";
import { useUsers, dataControls } from "../lib/api";

const UserList: React.FC = () => {
  // Use the optimized query hook
  const { isPending, isError, data, error } = useUsers();
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState(data?.users || []);

  useEffect(() => {
    if (isPending) {
      setLoading(true);
    } else if (data?.users) {
      setList(data.users);
      setInitLoading(false);
      setLoading(false);
    } else if (isError) {
      setLoading(false);
    }
  }, [isPending, data, isError]);


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

      <h2 className="text-center text-xl  font-semibold">
        Find Your Future Roommate !!
      </h2>
      <div className="h-2"></div>

      {/* {isPending && <div>Loading...</div>} */}
      {isError && <div>Error loading users: {error.message}</div>}

      {!isPending && !isError && (
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          style={{
            border: "1px solid #c7ced6 ",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          {list.map((user) => (
            <List.Item key={user.id} actions={[<a key="more">Load More</a>]}>
              <Skeleton avatar title={false} loading={loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={user.profileImageUrl} />}
                  title={
                    <a href="https://ant.design">
                      {user.firstName} {user.lastName}
                    </a>
                  }
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
