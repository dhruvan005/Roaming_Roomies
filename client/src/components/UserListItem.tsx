import React from "react";
import { List, Avatar } from "antd";
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
        <a key="like" className="flex items-center justify-center mr-2">
          <Heart
            onClick={onLike}
            className={`w-6 h-6 bg-gray-200 p-1 backdrop-blur-2xl rounded-full shadow-md hover:shadow-lg transition-shadow ${
              isLiked
                ? "fill-red-200 text-red-500"
                : "text-gray-600 hover:fill-red-200 hover:text-red-500"
            }`}
          />
        </a>,
        <a
          key="more"
          className="flex items-center text-md hover:text-blue-500"
          onClick={onShowDetails}
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
  );
};

export default UserListItem;