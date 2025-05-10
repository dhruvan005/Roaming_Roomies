import { useEffect } from "react";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "@tanstack/react-router";
import { useQueryOptions, getUserByEmail } from "../../lib/api";
import {
  Button,
  Avatar,
  Card,
  Row,
  Col,
  Tag,
  Typography,
  Divider,
  Skeleton,
} from "antd";
import { useNavigate } from "@tanstack/react-router";
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
  PencilIcon,
  LogOut,
  Paintbrush,
} from "lucide-react";
import { useMessage } from "@/components/MessageProvider";

const { Title, Text, Paragraph } = Typography;

// Helper function to format dates
const formatDate = (date: string | Date) => {
  if (!date) return "Not specified";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const queryClient = useQueryClient();
  const message = useMessage();
  const { isPending, isError, data, error } = useQuery(useQueryOptions);
  const navigate = useNavigate();

  const {
    data: userData,
    isPending: isUserPending,
    refetch,
  } = getUserByEmail(data?.user?.email || "");

  const user = userData?.data;

  useEffect(() => {
    // Invalidate the query cache when the component is mounted
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (isUserPending) {
      console.log("Loading user data...");
    }
  }, [userData, isUserPending]);

  return (
    <div className="min-h-screen p-4 md:p-8 ">
      <div className="max-w-6xl mx-auto">
        {/* Loading state */}
        {isUserPending && (
          <div className="w-full p-8 rounded-xl shadow-lg">
            <Skeleton active avatar paragraph={{ rows: 10 }} />
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="text-red-500 text-center p-8  rounded-xl shadow-lg">
            <Title level={3} style={{ color: "#f56565" }}>
              Error Loading Profile
            </Title>
            <Text style={{ color: "#f56565" }}>{error?.message}</Text>
          </div>
        )}

        {/* No profile state */}
        {!isUserPending && !userData && (
          <div className="text-center p-8  rounded-xl shadow-lg">
            <Title level={3}>No Profile Found</Title>
            <Text
              style={{ color: "#4b5563", marginBottom: 24, display: "block" }}
            >
              Please create a profile to continue.
            </Text>
            <Link to="/roommateListing">
              <Button
                type="primary"
                size="large"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Create Profile
              </Button>
            </Link>
          </div>
        )}

        {/* Profile content */}
        {user && (
          <div>
            {/* Profile header with background */}
            <div className="relative mb-6  rounded-xl overflow-hidden ">
              <div className="h-28 " />
              <div className="px-6 pb-6 pt-0 -mt-16 relative z-10">
                <div className="flex flex-col items-center">
                  <Avatar
                    src={user?.profileImageUrl}
                    size={120}
                    style={{
                      border: "4px solid #1f2937",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                  <Title
                    level={2}
                    style={{
                      margin: "12px 0 4px",
                      textAlign: "center",
                    }}
                  >
                    {user?.firstName} {user?.lastName}
                  </Title>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#a3a3a3",
                      textAlign: "center",
                      display: "block",
                    }}
                  >
                    {user?.occupation} • {user?.age} years old
                  </Text>
                </div>
              </div>
            </div>

            {/* Main content */}
            <Row gutter={[24, 24]}>
              {/* Left Column */}
              <Col xs={24} md={16}>
                {/* About Me */}
                {user?.bio && (
                  <Card
                    title={
                      <div className="flex items-center">
                        <User size={18} className="mr-2 text-blue-500" />
                        <Title
                          level={4}
                          style={{ margin: 0, color: "#1f2937" }}
                        >
                          About Me
                        </Title>
                      </div>
                    }
                    style={{
                      marginBottom: "6px",
                    }}
                  >
                    <Paragraph
                      style={{
                        margin: 0,
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: "#4b5563",
                      }}
                    >
                      {user.bio}
                    </Paragraph>
                  </Card>
                )}

                {/* Interests */}
                <Card
                  title={
                    <div className="flex items-center">
                      <HeartIcon
                        size={18}
                        color="#1890ff"
                        style={{ marginRight: 12, marginTop: 2 }}
                      />
                      <Title level={4} style={{ margin: 0, color: "#1f2937" }}>
                        Interests
                      </Title>
                    </div>
                  }
                  style={{
                    marginBottom: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gridColumn: "1 / -1",
                    }}
                  >
                    <div style={{ width: "100%" }}>
                      <div
                        style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
                      >
                        {user.interests
                          ? user.interests.map(
                              (interest: string, index: number) => (
                                <Tag
                                  key={index}
                                  color="blue"
                                  style={{ margin: 0, fontSize: "14px" }}
                                >
                                  {interest.trim()}
                                </Tag>
                              )
                            )
                          : "No interests specified"}
                      </div>
                    </div>
                  </div>
                </Card>
                {/* Housing Preferences */}
                <Card
                  title={
                    <div className="flex items-center">
                      <Home size={18} className="mr-2 text-blue-500" />
                      <Title level={4} style={{ margin: 0 }}>
                        Housing Preferences
                      </Title>
                    </div>
                  }
                  style={{
                    marginBottom: "6px",
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
                        color="#3b82f6"
                        style={{ marginRight: 12, marginTop: 2 }}
                      />
                      <div>
                        <Text
                          strong
                          style={{
                            display: "block",
                            marginBottom: 2,
                            color: "#1f2937",
                          }}
                        >
                          Room Type
                        </Text>
                        <div style={{ color: "#4b5563" }}>
                          {user.desiredRoomType || "Not specified"}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                      <Paintbrush
                        size={18}
                        color="#3b82f6"
                        style={{ marginRight: 12, marginTop: 2 }}
                      />

                      <div>
                        <Text
                          strong
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          Cleanliness level
                        </Text>
                        <div>{user.cleanlinessLevel || "Not specified"}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                      <CircleDollarSign
                        size={18}
                        color="#3b82f6"
                        style={{ marginRight: 12, marginTop: 2 }}
                      />
                      <div>
                        <Text
                          strong
                          style={{
                            display: "block",
                            marginBottom: 2,
                            color: "#1f2937",
                          }}
                        >
                          Budget
                        </Text>
                        <div style={{ color: "#4b5563" }}>
                          ${user.maxRent || 0}/month
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                      <MapPin
                        size={18}
                        color="#3b82f6"
                        style={{ marginRight: 12, marginTop: 2 }}
                      />
                      <div>
                        <Text
                          strong
                          style={{
                            display: "block",
                            marginBottom: 2,
                            color: "#1f2937",
                          }}
                        >
                          Preferred Areas
                        </Text>
                        <div style={{ color: "#4b5563" }}>
                          {user.preferredLocations || "Not specified"}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                      <Calendar
                        size={18}
                        color="#3b82f6"
                        style={{ marginRight: 12, marginTop: 2 }}
                      />
                      <div>
                        <Text
                          strong
                          style={{
                            display: "block",
                            marginBottom: 2,
                            color: "#1f2937",
                          }}
                        >
                          Available From
                        </Text>
                        <div style={{ color: "#4b5563" }}>
                          {formatDate(user.moveInDate)}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                      <ClockIcon
                        size={18}
                        color="#3b82f6"
                        style={{ marginRight: 12, marginTop: 2 }}
                      />
                      <div>
                        <Text
                          strong
                          style={{
                            display: "block",
                            marginBottom: 2,
                            color: "#1f2937",
                          }}
                        >
                          Minimum Stay
                        </Text>
                        <div style={{ color: "#4b5563" }}>
                          {user.minimumStay || "Not specified"} months
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Lifestyle Preferences */}
                <Card
                  title={
                    <div className="flex items-center">
                      <BicepsFlexed size={18} className="mr-2 text-blue-500" />
                      <Title level={4} style={{ margin: 0, color: "#1f2937" }}>
                        Lifestyle Preferences
                      </Title>
                    </div>
                  }
                  className="mb-6 border-gray-200"
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
                        color="#3b82f6"
                        style={{ marginRight: 12, marginTop: 2 }}
                      />
                      <div>
                        <Text
                          strong
                          style={{
                            display: "block",
                            marginBottom: 2,
                            color: "#1f2937",
                          }}
                        >
                          Sleep Schedule
                        </Text>
                        <div style={{ color: "#4b5563" }}>
                          {user.sleepSchedule || "Not specified"}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                      <BicepsFlexed
                        size={18}
                        color="#3b82f6"
                        style={{ marginRight: 12, marginTop: 2 }}
                      />
                      <div>
                        <Text
                          strong
                          style={{
                            display: "block",
                            marginBottom: 2,
                            color: "#1f2937",
                          }}
                        >
                          Workout Habits
                        </Text>
                        <div style={{ color: "#4b5563" }}>
                          {user.workoutPreference
                            ? user.workoutPreference.toString()
                            : "Not specified"}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                      <Handshake
                        size={18}
                        color="#3b82f6"
                        style={{ marginRight: 12, marginTop: 2 }}
                      />
                      <div>
                        <Text
                          strong
                          style={{
                            display: "block",
                            marginBottom: 2,
                            color: "#1f2937",
                          }}
                        >
                          Social Traits
                        </Text>
                        <div style={{ color: "#4b5563" }}>
                          {user.socialTrait || "Not specified"}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                      <CookingPot
                        size={18}
                        color="#3b82f6"
                        style={{ marginRight: 12, marginTop: 2 }}
                      />
                      <div>
                        <Text
                          strong
                          style={{
                            display: "block",
                            marginBottom: 2,
                            color: "#1f2937",
                          }}
                        >
                          Dietary Preference
                        </Text>
                        <div style={{ color: "#4b5563" }}>
                          {user.dietaryPreference || "Not specified"}
                        </div>
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
                    <div className="flex items-center">
                      <Mail size={18} className="mr-2 text-blue-500" />
                      <Title level={4} style={{ margin: 0, color: "#1f2937" }}>
                        Contact
                      </Title>
                    </div>
                  }
                  style={{
                    marginBottom: "6px",
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
                      color="#3b82f6"
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <div>
                      <Text
                        strong
                        style={{
                          display: "block",
                          marginBottom: 2,
                          color: "#1f2937",
                        }}
                      >
                        Phone
                      </Text>
                      <div style={{ color: "#4b5563" }}>
                        {user.phone || "Not provided"}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <Mail
                      size={18}
                      color="#3b82f6"
                      style={{ marginRight: 12, marginTop: 2, flexShrink: 0 }}
                    />
                    <div style={{ minWidth: 0, width: "100%" }}>
                      <Text
                        strong
                        style={{
                          display: "block",
                          marginBottom: 2,
                          color: "#1f2937",
                        }}
                      >
                        Email
                      </Text>
                      <div
                        style={{
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                          color: "#4b5563",
                        }}
                      >
                        {user.email || "Not provided"}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Personal Details */}
                <Card
                  title={
                    <div className="flex items-center">
                      <User size={18} className="mr-2 text-blue-500" />
                      <Title level={4} style={{ margin: 0, color: "#1f2937" }}>
                        Personal Details
                      </Title>
                    </div>
                  }
                  style={{
                    marginBottom: "6px",
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
                      color="#3b82f6"
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <div>
                      <Text
                        strong
                        style={{
                          display: "block",
                          marginBottom: 2,
                          color: "#1f2937",
                        }}
                      >
                        Gender
                      </Text>
                      <div style={{ color: "#4b5563" }}>
                        {user.gender || "Not specified"}
                      </div>
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
                      color="#3b82f6"
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <div>
                      <Text
                        strong
                        style={{
                          display: "block",
                          marginBottom: 2,
                          color: "#1f2937",
                        }}
                      >
                        Age
                      </Text>
                      <div style={{ color: "#4b5563" }}>
                        {user.age || "Not specified"} years old
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <BriefcaseBusiness
                      size={18}
                      color="#3b82f6"
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <div>
                      <Text
                        strong
                        style={{
                          display: "block",
                          marginBottom: 2,
                          color: "#1f2937",
                        }}
                      >
                        Occupation
                      </Text>
                      <div style={{ color: "#4b5563" }}>
                        {user.occupation || "Not specified"}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Habits */}
                <Card
                  title={
                    <div className="flex items-center">
                      <Wine size={18} className="mr-2 text-blue-500" />
                      <Title level={4} style={{ margin: 0, color: "#1f2937" }}>
                        Habits
                      </Title>
                    </div>
                  }
                  style={{
                    marginBottom: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginBottom: 16,
                    }}
                  >
                    <Cigarette
                      size={18}
                      color="#3b82f6"
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <div>
                      <Text
                        strong
                        style={{
                          display: "block",
                          marginBottom: 2,
                          color: "#1f2937",
                        }}
                      >
                        Smoking
                      </Text>
                      <div style={{ color: "#4b5563" }}>
                        {user.smokingPreference || "Not specified"}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginBottom: 16,
                    }}
                  >
                    <Wine
                      size={18}
                      color="#3b82f6"
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <div>
                      <Text
                        strong
                        style={{
                          display: "block",
                          marginBottom: 2,
                          color: "#1f2937",
                        }}
                      >
                        Alcohol
                      </Text>
                      <div style={{ color: "#4b5563" }}>
                        {user.alcoholPreference || "Not specified"}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <PawPrint
                      size={18}
                      color="#3b82f6"
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <div>
                      <Text
                        strong
                        style={{
                          display: "block",
                          marginBottom: 2,
                          color: "#1f2937",
                        }}
                      >
                        Pets
                      </Text>
                      <div style={{ color: "#4b5563" }}>
                        {user.petPreference
                          ? user.petPreference.toString()
                          : "Not specified"}
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
            {/* Action buttons */}
            <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
              <Button
                type="primary"
                size="large"
                icon={<PencilIcon size={16} style={{ marginRight: 8 }} />}
                href="/roommateListing"
                className="bg-blue-500 hover:bg-blue-600 px-8"
              >
                Edit Profile
              </Button>

              <Button
                type="default"
                danger
                size="large"
                icon={<LogOut size={16} style={{ marginRight: 8 }} />}
                onClick={() => {
                  message.success("Loggout Successfully")
                  navigate({ to: "/login" })}}

                className="px-8"
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
