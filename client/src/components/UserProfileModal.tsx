import React from "react";
import {
  Modal,
  Button,
  Avatar,
  Card,
  Row,
  Col,
  Tag,
  Typography,
  Divider,
  Tooltip,
} from "antd";
import { UserType } from "../types";
import {
  Cigarette,
  PawPrint,
  BriefcaseBusiness,
  VenusAndMars,
  Wine,
  BicepsFlexed,
  Bed,
  CookingPot,
  Handshake,
  ClockIcon,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  CircleDollarSign,
  Home,
  HeartIcon,
} from "lucide-react";

const { Title, Text, Paragraph } = Typography;

interface UserProfileModalProps {
  isOpen: boolean;
  user: UserType | null;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  user,
  onClose,
}) => {
  if (!user) return null;

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Modal
      title={null}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <div>
          <Tooltip title="Coming soon" placement="top">
            <Button
              key="message"
              disabled
              onClick={() => console.log("Message sent to", user.email)}
              style={{ marginRight: 8 }}
            >
              <Mail size={16} style={{ marginRight: 6 }} />
              Message
            </Button>
            
          </Tooltip>
          <Button key="close" type="primary" onClick={onClose}>
            Close
          </Button>
          
        </div>
      ]}
      width={800}
      centered
      className="no-scrollbar user-profile-modal custom-modal-body "
      styles={{
        body: {
          padding: 0,
          maxHeight: "80vh",
          overflow: "auto",
          borderRadius: 12,
        },
      }}
    >
      <div className="user-profile-container">
        <div className="profile-header">
          <div className="profile-header-bg" />
          <div className="profile-header-content">
            <Avatar
              src={user.profileImageUrl}
              size={120}
              style={{
                border: "4px solid white",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            />
            <div className="profile-name-section">
              <Title
                level={2}
                style={{ margin: "12px 0 4px", textAlign: "center" }}
              >
                {user.firstName} {user.lastName}
              </Title>
              <Text
                type="secondary"
                style={{ fontSize: 16, textAlign: "center", display: "block" }}
              >
                {user.occupation} • {user.age} years old
              </Text>
            </div>
          </div>
        </div>

        <div className="profile-body">
          {/* Main Content */}
          <Row gutter={[24, 24]}>
            {/* Left Column */}
            <Col xs={24} md={16}>
              {/* About Me */}
              {user.bio && (
                <Card
                  title={
                    <Title level={4} style={{ margin: 0 }}>
                      About Me
                    </Title>
                  }
                  className="custom-card-no-border custom-card-header custom-card-body"
                  style={{
                    marginBottom: 24,
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <Paragraph
                    style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}
                  >
                    {user.bio}
                  </Paragraph>
                </Card>
              )}

              <Card
                title={
                  <Title level={4} style={{ margin: 0 }}>
                    Housing Preferences
                  </Title>
                }
                className="custom-card-no-border custom-card-header custom-card-body"
                style={{
                  marginBottom: 24,
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <Home
                      size={18}
                      color="#1890ff"
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <div>
                      <Text
                        strong
                        style={{ display: "block", marginBottom: 2 }}
                      >
                        Room Type
                      </Text>
                      <div>{user.desiredRoomType}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <CircleDollarSign
                      size={18}
                      color="#1890ff"
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <div>
                      <Text
                        strong
                        style={{ display: "block", marginBottom: 2 }}
                      >
                        Budget
                      </Text>
                      <div>${user.maxRent}/month</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <MapPin
                      size={18}
                      color="#1890ff"
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <div>
                      <Text
                        strong
                        style={{ display: "block", marginBottom: 2 }}
                      >
                        Preferred Areas
                      </Text>
                      <div>{user.preferredLocations || "Not specified"}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <Calendar
                      size={18}
                      color="#1890ff"
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <div>
                      <Text
                        strong
                        style={{ display: "block", marginBottom: 2 }}
                      >
                        Available From
                      </Text>
                      <div>{formatDate(user.moveInDate)}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <ClockIcon
                      size={18}
                      color="#1890ff"
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <div>
                      <Text
                        strong
                        style={{ display: "block", marginBottom: 2 }}
                      >
                        Minimum Stay
                      </Text>
                      <div>{user.minimumStay} months</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Lifestyle Preferences */}
              <Card
                title={
                  <Title level={4} style={{ margin: 0 }}>
                    Lifestyle Preferences
                  </Title>
                }
                className="custom-card-no-border custom-card-header custom-card-body"
                style={{
                  marginBottom: 24,
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <Bed
                      size={18}
                      color="#1890ff"
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <div>
                      <Text
                        strong
                        style={{ display: "block", marginBottom: 2 }}
                      >
                        Sleep Schedule
                      </Text>
                      <div>{user.sleepSchedule}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <BicepsFlexed
                      size={18}
                      color="#1890ff"
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <div>
                      <Text
                        strong
                        style={{ display: "block", marginBottom: 2 }}
                      >
                        Workout Habits
                      </Text>
                      <div>{user.workoutPreference.toWellFormed()}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <Handshake
                      size={18}
                      color="#1890ff"
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <div>
                      <Text
                        strong
                        style={{ display: "block", marginBottom: 2 }}
                      >
                        Social Traits
                      </Text>
                      <div>{user.socialTrait || "Not specified"}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <CookingPot
                      size={18}
                      color="#1890ff"
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <div>
                      <Text
                        strong
                        style={{ display: "block", marginBottom: 2 }}
                      >
                        Dietary Preference
                      </Text>
                      <div>{user.dietaryPreference || "Not specified"}</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Habits & Social Preferences */}
              <Card
                title={
                  <Title level={4} style={{ margin: 0 }}>
                    Habits & Social Preferences
                  </Title>
                }
                className="custom-card-no-border custom-card-header custom-card-body"
                style={{
                  marginBottom: 24,
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gridColumn: "1 / -1",
                    }}
                  >
                    <HeartIcon
                      size={18}
                      color="#1890ff"
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <div style={{ width: "100%" }}>
                      <Text
                        strong
                        style={{ display: "block", marginBottom: 4 }}
                      >
                        Interests
                      </Text>
                      <div
                        style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
                      >
                        {user.interests
                          ? user.interests.map((interest, index) => (
                              <Tag
                                key={index}
                                color="blue"
                                style={{ margin: 0 }}
                              >
                                {interest.trim()}
                              </Tag>
                            ))
                          : "No interests specified"}
                      </div>
                    </div>
                  </div>

                  <Divider
                    style={{ margin: "8px 0 16px", gridColumn: "1 / -1" }}
                  />

                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <Cigarette
                      size={18}
                      color="#1890ff"
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <div>
                      <Text
                        strong
                        style={{ display: "block", marginBottom: 2 }}
                      >
                        Smoking
                      </Text>
                      <div>{user.smokingPreference}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <PawPrint
                      size={18}
                      color="#1890ff"
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <div>
                      <Text
                        strong
                        style={{ display: "block", marginBottom: 2 }}
                      >
                        Pets
                      </Text>
                      <div>{user.petPreference.toWellFormed()}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <Wine
                      size={18}
                      color="#1890ff"
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <div>
                      <Text
                        strong
                        style={{ display: "block", marginBottom: 2 }}
                      >
                        Alcohol
                      </Text>
                      <div>{user.alcoholPreference || "Not specified"}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <User
                      size={18}
                      color="#1890ff"
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <div>
                      <Text
                        strong
                        style={{ display: "block", marginBottom: 2 }}
                      >
                        Cleanliness
                      </Text>
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
                title={
                  <Title level={4} style={{ margin: 0 }}>
                    Contact
                  </Title>
                }
                className="custom-card-no-border custom-card-header custom-card-body"
                style={{
                  marginBottom: 24,
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: 16,
                  }}
                >
                  <Phone
                    size={18}
                    color="#1890ff"
                    style={{ marginRight: 12, marginTop: 2 }}
                  />
                  <div>
                    <Text strong style={{ display: "block", marginBottom: 2 }}>
                      Phone
                    </Text>
                    <div>{user.phone || "Not provided"}</div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: 16,
                  }}
                >
                  <Mail
                    size={18}
                    color="#1890ff"
                    style={{ marginRight: 12, marginTop: 2, flexShrink: 0 }}
                  />
                  <div style={{ minWidth: 0, width: "100%" }}>
                    <Text strong style={{ display: "block", marginBottom: 2 }}>
                      Email
                    </Text>
                    <div
                      style={{
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      {user.email || "Not provided"}
                    </div>
                  </div>
                </div>

                <Tooltip title="Coming soon" placement="top">
                  <Button
                    type="primary"
                    disabled
                    style={{ marginTop: 8 }}
                    icon={<Mail size={16} style={{ marginRight: 6 }} />}
                  >
                    Contact {user.firstName}
                  </Button>
                </Tooltip>
              </Card>

              {/* Personal Details */}
              <Card
                title={
                  <Title level={4} style={{ margin: 0 }}>
                    Personal Details
                  </Title>
                }
                className="custom-card-no-border custom-card-header custom-card-body"
                style={{
                  marginBottom: 24,
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: 16,
                  }}
                >
                  <VenusAndMars
                    size={18}
                    color="#1890ff"
                    style={{ marginRight: 12, marginTop: 2 }}
                  />
                  <div>
                    <Text strong style={{ display: "block", marginBottom: 2 }}>
                      Gender
                    </Text>
                    <div>{user.gender || "Not specified"}</div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: 16,
                  }}
                >
                  <User
                    size={18}
                    color="#1890ff"
                    style={{ marginRight: 12, marginTop: 2 }}
                  />
                  <div>
                    <Text strong style={{ display: "block", marginBottom: 2 }}>
                      Age
                    </Text>
                    <div>{user.age} years old</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <BriefcaseBusiness
                    size={18}
                    color="#1890ff"
                    style={{ marginRight: 12, marginTop: 2 }}
                  />
                  <div>
                    <Text strong style={{ display: "block", marginBottom: 2 }}>
                      Occupation
                    </Text>
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
