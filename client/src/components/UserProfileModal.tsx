import React from "react";
import {
  Modal,
  Button,
  Avatar,
  Card,
  Row,
  Col,
  Tag,
  Divider,
  Typography,
  Space,
} from "antd";
import { User } from "../types";
import {
  HomeOutlined,
  DollarOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Cigarette, PawPrint } from "lucide-react";
const { Title, Text, Paragraph } = Typography;

interface UserProfileModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  user,
  onClose,
}) => {
  if (!user) return null;

  return (
    <Modal
      title={null}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button
          key="message"
          onClick={() => console.log("Message sent to", user.email)}
        >
          Message
        </Button>,
        <Button key="close" type="primary" onClick={onClose}>
          Close
        </Button>,
      ]}
      width={800}
      centered
      className="user-profile-modal"
      bodyStyle={{ padding: "0", maxHeight: "80vh", overflow: "auto" }}
    >
      <div className="user-profile-container">
        {/* Header Section with Background */}
        <div className="profile-header">
          <div className="profile-header-bg" />
          <div className="profile-header-content">
            <Avatar src={user.profileImageUrl} size={120} />
            <div className="profile-name-section">
              <Title level={2} style={{ margin: "0 0 4px" }}>
                {user.firstName} {user.lastName}
              </Title>
              <Text type="secondary">
                {user.occupation} • {user.age} years old
              </Text>
            </div>
          </div>
        </div>

        <div className="profile-body">
          {/* Quick Stats */}
          <Row gutter={[16, 16]} className="quick-stats">
            <Col xs={8} sm={8}>
              <Card bordered={false} className="stat-card">
                <DollarOutlined className="stat-icon" />
                <div className="stat-content">
                  <div className="stat-value">${user.maxRent}</div>
                  <div className="stat-label">Budget</div>
                </div>
              </Card>
            </Col>
            <Col xs={8} sm={8}>
              <Card bordered={false} className="stat-card">
                <CalendarOutlined className="stat-icon" />
                <div className="stat-content">
                  <div className="stat-value">
                    {new Date(user.moveInDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="stat-label">Move-in</div>
                </div>
              </Card>
            </Col>
            <Col xs={8} sm={8}>
              <Card bordered={false} className="stat-card">
                <HomeOutlined className="stat-icon" />
                <div className="stat-content">
                  <div className="stat-value">
                    {user.desiredRoomType.split(" ")[0]}
                  </div>
                  <div className="stat-label">Room Type</div>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Main Content */}
          <Row gutter={[24, 24]}>
            {/* Left Column */}
            <Col xs={24} md={16}>
              {/* About Me */}
              {user.bio && (
                <Card
                  title={<Title level={4}>About Me</Title>}
                  bordered={false}
                  className="profile-card"
                >
                  <Paragraph>{user.bio}</Paragraph>
                </Card>
              )}

              {/* Housing Preferences */}
              <Card
                title={<Title level={4}>Housing Preferences</Title>}
                bordered={false}
                className="profile-card"
              >
                <div className="info-grid">
                  <div className="info-item">
                    <HomeOutlined className="info-icon" />
                    <div>
                      <Text strong>Room Type</Text>
                      <div>{user.desiredRoomType}</div>
                    </div>
                  </div>

                  <div className="info-item">
                    <DollarOutlined className="info-icon" />
                    <div>
                      <Text strong>Budget</Text>
                      <div>${user.maxRent}/month</div>
                    </div>
                  </div>

                  <div className="info-item">
                    <EnvironmentOutlined className="info-icon" />
                    <div>
                      <Text strong>Preferred Areas</Text>
                      <div>{user.preferredLocations || "Not specified"}</div>
                    </div>
                  </div>

                  <div className="info-item">
                    <CalendarOutlined className="info-icon" />
                    <div>
                      <Text strong>Available From</Text>
                      <div>
                        {new Date(user.moveInDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Lifestyle & Interests */}
              <Card
                title={<Title level={4}>Lifestyle & Interests</Title>}
                bordered={false}
                className="profile-card"
              >
                <div className="info-grid">
                  <div className="info-item">
                    <HeartOutlined className="info-icon" />
                    <div>
                      <Text strong>Interests</Text>
                      <div className="tags-container">
                        {user.interests
                          ? user.interests.map((interest, index) => (
                              <Tag key={index} color="blue">
                                {interest.trim()}
                              </Tag>
                            ))
                          : "No interests specified"}
                      </div>
                    </div>
                  </div>

                  <div className="info-item">
                    <Cigarette className="info-icon" />
                    <div>
                      <Text strong>Smoking</Text>
                      <div>
                        {user.smokingPreference ? "Smoker" : "Non-smoker"}
                      </div>
                    </div>
                  </div>

                  <div className="info-item">
                    <PawPrint className="info-icon" />
                    <div>
                      <Text strong>Pets</Text>
                      <div>{user.petPreference ? "Has pets" : "No pets"}</div>
                    </div>
                  </div>

                  <div className="info-item">
                    <UserOutlined className="info-icon" />
                    <div>
                      <Text strong>Cleanliness</Text>
                      <div>{user.cleanlinessLevel || "Not specified"}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Right Column */}
            <Col xs={24} md={8}>
              {/* Contact Information */}
              <Card
                title={<Title level={4}>Contact</Title>}
                bordered={false}
                className="profile-card"
              >
                <div className="info-item">
                  <PhoneOutlined className="info-icon" />
                  <div>
                    <Text strong>Phone</Text>
                    <div>{user.phone || "Not provided"}</div>
                  </div>
                </div>

                <div className="info-item">
                  <MailOutlined className="info-icon" />
                  <div>
                    <Text strong>Email</Text>
                    <div>{user.email || "Not provided"}</div>
                  </div>
                </div>

                <Button type="primary" block style={{ marginTop: 16 }}>
                  Contact {user.firstName}
                </Button>
              </Card>

              {/* Personal Details */}
              <Card
                title={<Title level={4}>Personal Details</Title>}
                bordered={false}
                className="profile-card"
              >
                <div className="info-item">
                  <UserOutlined className="info-icon" />
                  <div>
                    <Text strong>Gender</Text>
                    <div>{user.gender || "Not specified"}</div>
                  </div>
                </div>

                <div className="info-item">
                  <UserOutlined className="info-icon" />
                  <div>
                    <Text strong>Age</Text>
                    <div>{user.age} years old</div>
                  </div>
                </div>

                <div className="info-item">
                  <UserOutlined className="info-icon" />
                  <div>
                    <Text strong>Occupation</Text>
                    <div>{user.occupation || "Not specified"}</div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
};

export default UserProfileModal;
