import React from "react";
import { List, Avatar, Button, Tooltip } from "antd";
import { Heart } from "lucide-react";
import { UserType } from "../types";

interface UserListItemProps {
  user: UserType;
  isLiked: boolean;
  onLike: () => void;
  onShowDetails: () => void;
}

const UserListItem: React.FC<UserListItemProps> = ({
  user,
  isLiked,
  onLike,
  onShowDetails,
}) => {
  return (
    <List.Item
      key={user.id}
      className="custom-list-item"
      actions={[
        <Tooltip key="like" title={isLiked ? "Unlike" : "Like"}>
          <Button 
            type="text" 
            shape="circle"
            onClick={onLike}
            icon={
              <Heart 
                className={`w-5 h-5 ${isLiked ? "fill-red-400 text-red-400" : "text-gray-500"}`} 
              />
            }
            className={`flex items-center justify-center ${isLiked ? "hover:bg-red-100" : "hover:bg-gray-100"}`}
          />
        </Tooltip>,
        <Button
          key="more"
          type="link"
          className="text-md"
          onClick={onShowDetails}
        >
          View Details
        </Button>,
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
  );
};

export default UserListItem;