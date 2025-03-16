import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect, useCallback } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Checkbox,
  Slider,
  Button,
  Card,
  Typography,
  Divider,
  Row,
  Col,
  Tag,
  Space,
  message,
  Layout,
  Upload,
} from "antd";
import {
  PlusOutlined,
  CloseOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
  CloudFilled,
} from "@ant-design/icons";
import { useQueryOptions } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
const { Title, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Content } = Layout;
import { useCreateProfile } from "../../lib/api";
import { useNavigate } from "@tanstack/react-router";
import { UserProfileFormValues } from "../../types";

function UserProfileForm() {
  const [form] = Form.useForm();
  const { isPending, isError, data, error } = useQuery(useQueryOptions);
  const createProfile = useCreateProfile();
  const navigate = useNavigate();

  const [newInterest, setNewInterest] = useState("");
  const [interests, setInterests] = useState<{ id: number; value: string }[]>([]);

  // Add interest with useCallback to ensure stability
  const addInterest = useCallback(() => {
    if (!newInterest.trim()) return;

    const newEntry = {
      id: Date.now(),
      value: newInterest.trim(),
    };
 
    // Use functional update to guarantee we're working with latest state
    setInterests((prevInterests) => {
      const updatedInterests = [...prevInterests, newEntry];

      // Update form here with the actual updated array
      form.setFieldsValue({
        interests: updatedInterests.map((item) => item.value),
      });

      return updatedInterests;
    });

    setNewInterest("");
  }, [newInterest]);

  // Remove interest with useCallback
  const removeInterest = useCallback((idToRemove: number) => {
    // Use functional update pattern for reliable state updates
    setInterests((prevInterests) => {
      // Create new filtered array
      const updatedInterests = prevInterests.filter(
        (item) => item.id !== idToRemove
      );

      // Update form with the same array we're using for state
      form.setFieldsValue({
        interests: updatedInterests.map((item) => item.value),
      });

      return updatedInterests;
    });
  }, []);

  // For debugging - logs whenever interests change
  // useEffect(() => {
  //   console.log("Interest state updated:", interests);
  // }, [interests]);

  // Reset all interests
  const clearAllInterests = useCallback(() => {
    setInterests([]);
    form.setFieldsValue({ interests: [] });
  }, []);

  // Example form submission handler
  const handleSubmit = useCallback(() => {
    // Get final interests from state, not from form
    const finalInterests = interests.map((item) => item.value);
    console.log("Submitting interests:", finalInterests);

    // Your form submission logic here
  }, [interests]);

  const onFinish = async (values: UserProfileFormValues) => {
    try {
      // Format the values
      const formattedValues: UserProfileFormValues = {
        ...values,
        moveInDate: values.moveInDate?.toISOString() as any,
        interests: interests.map((interest) => interest.value),
      };
      // console.log("Formatted values: in listing page", formattedValues);
     
      const response = await createProfile.mutateAsync(formattedValues);
      // console.log("Response from api", response);
      message.success("Profile created successfully!");

      // Optionally navigate to another page
      navigate({ to: "/allUsers" });
    } catch (error) {
      
      message.error("Failed to create profile. Please try again.");
      // console.error("Profile creation error:", error);
    }
  };

  function normFile(e: any) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  return (
    <Layout>
      <Content style={{ padding: "16px", margin: "0 auto" }}>
        <Card
          // variant={borderless}
          style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
        >
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: "24px" }}
          >
            User Profile Form
          </Title>
          <Divider />
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark="optional"
            scrollToFirstError
            initialValues={{
              id: 0,
              firstName: data?.user.given_name,
              lastName: data?.user.family_name,
              email: data?.user.email,
              phone: "",
              age: null,
              gender: undefined,
              occupation: "",
              sleepSchedule: undefined,
              cleanlinessLevel: 3,
              dietaryPreferences: undefined,
              smokingTolerance: false,
              petTolerance: false,
              alcoholTolerance: false,
              interests: [],
              personalityTraits: {},
              desiredRoomType: undefined,
              maxRent: null,
              preferredLocations: [],
              moveInDate: null,
              minimumStay: null,
              bio: "",
              profileImageUrl: "",
            }}
          >
            {/* Personal Information Section */}
            <Card
              title={<Title level={4}>Personal Information</Title>}
              style={{ marginBottom: 24 }}
              className="responsive-card"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your first name",
                      },
                    ]}
                  >
                    <Input
                      disabled
                      style={{ color: "#71717a" }}
                      prefix={<UserOutlined />}
                      placeholder="Enter your first name"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your last name",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Enter your last name"
                      disabled
                      style={{ color: "#71717a" }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="Enter your email"
                      disabled
                      style={{ color: "#71717a" }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                      {
                        pattern: /^[0-9-+\s()]*$/,
                        message: "Please enter a valid phone number",
                      },
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="Enter your phone number"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    name="age"
                    label="Age"
                    rules={[
                      {
                        required: true,
                        type: "number",
                        min: 18,
                        max: 80,
                        message: "Age must be between 18 and 80",
                      },
                    ]}
                  >
                    <InputNumber
                      
                      placeholder="Your age"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                      { required: true, message: "Please select your gender" },
                    ]}
                  >
                    <Select placeholder="Select gender">
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                      <Option value="non_binary">Non-binary</Option>
                      <Option value="other">Other</Option>
                      <Option value="prefer_not_to_say">
                        Prefer not to say
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={8}>
                  <Form.Item
                    name="occupation"
                    label="Occupation"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your occupation",
                      },
                    ]}
                  >
                    <Input placeholder="Your occupation" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Profile Photo">
                    <Form.Item
                      name="profilePic"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      noStyle
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Please upload a profile picture",
                      //   },
                      // ]}
                    >
                      <Upload>
                        <Button icon={<UploadOutlined />}>
                          Click to Upload
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Lifestyle Preferences Section */}
            <Card
              title={<Title level={4}>Lifestyle Preferences</Title>}
              style={{ marginBottom: 24 }}
              className="responsive-card"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="sleepSchedule"
                    label="Sleep Schedule"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Sleep Schedule ",
                      },
                    ]}
                  >
                    <Select placeholder="Select sleep schedule">
                      <Option value="early_bird">
                        Early Bird (Before 10 PM)
                      </Option>
                      <Option value="night_owl">
                        Night Owl (After Midnight)
                      </Option>
                      <Option value="average">
                        Average (10 PM - Midnight)
                      </Option>
                      <Option value="irregular">Irregular</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} style={{ paddingLeft: "40px" }}>
                  <Form.Item name="cleanlinessLevel" label="Cleanliness Level">
                    <Slider
                      min={1}
                      max={5}
                      marks={{
                        1: "Very Messy",
                        3: "Average",
                        5: "Very Clean",
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="dietaryPreferences"
                    label="Dietary Preferences"
                  >
                    <Select placeholder="Select dietary preference">
                      <Option value="vegetarian">Vegetarian</Option>
                      <Option value="vegan">Vegan</Option>
                      <Option value="non_vegetarian">Non-Vegetarian</Option>
                      <Option value="gluten_free">Gluten-Free</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Paragraph>Tolerance Options:</Paragraph>
                    <Form.Item
                      name="smokingTolerance"
                      valuePropName="checked"
                      noStyle
                    >
                      <Checkbox>Smoking Tolerance</Checkbox>
                    </Form.Item>
                    <Form.Item
                      name="petTolerance"
                      valuePropName="checked"
                      noStyle
                    >
                      <Checkbox>Pet Tolerance</Checkbox>
                    </Form.Item>
                    <Form.Item
                      name="alcoholTolerance"
                      valuePropName="checked"
                      noStyle
                    >
                      <Checkbox>Alcohol Tolerance</Checkbox>
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
            </Card>

            {/* Interests Section */}
            <Card
              title={<Title level={4}>Interests</Title>}
              style={{ marginBottom: 24 }}
              className="responsive-card"
            >
              <Form.Item
                name="interests"
                label="Your Interests"
                extra="Add your hobbies, activities, and other interests"
              >
                <div>
                  <Space direction="horizontal" style={{ marginBottom: 16 }}>
                    <Input
                      placeholder="Add an interest"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onPressEnter={addInterest}
                    />
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={addInterest}
                    >
                      Add
                    </Button>
                  </Space>

                  <div style={{ marginTop: 8 }}>
                    {interests.length > 0 ? (
                      <Space size={[8, 8]} wrap>
                        {interests.map((interest) => (
                          <Tag
                            style={{ marginBottom: 8 }}
                            key={interest.id}
                            closable
                            onClose={() => removeInterest(interest.id)}
                            color="blue"
                          >
                            {interest.value}
                          </Tag>
                        ))}
                      </Space>
                    ) : (
                      <Paragraph type="secondary">
                        No interests added yet.
                      </Paragraph>
                    )}
                  </div>
                </div>
              </Form.Item>
            </Card>

            {/* Housing Preferences Section */}
            <Card
              title={<Title level={4}>Housing Preferences</Title>}
              style={{ marginBottom: 24 }}
              className="responsive-card"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="desiredRoomType"
                    label="Desired Room Type"
                    rules={[
                      {
                        required: true,
                        message: "Please select desired room type",
                      },
                    ]}
                  >
                    <Select placeholder="Select room type">
                      <Option value="apartment">Apartment</Option>
                      <Option value="house">House</Option>
                      <Option value="studio">Studio</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="maxRent"
                    label="Maximum Rent ($)"
                    rules={[
                      { required: true, message: "Please enter maximum rent" },
                    ]}
                  >
                    <InputNumber
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) =>
                        (parseFloat((value ?? "").replace(/\$\s?|(,*)/g, "")) ||
                          0) as 0
                      }
                      min={0}
                      placeholder="Enter maximum rent"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={42} sm={12}>
                  <Form.Item
                    name="preferredLocations"
                    label="Preferred Locations"
                    extra="Add neighborhoods, cities, or areas where your room is located"
                    rules={[
                      {
                        required: true,
                        message: "Minimum 5 characters required",
                        min: 5,
                      },
                    ]}
                  >
                    <div>
                      <Space
                        direction="horizontal"
                        style={{ marginBottom: 16 }}
                      >
                        <TextArea
                          placeholder="Add a Location"
                          autoSize
                          
                        />
                      </Space>
                    </div>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="moveInDate"
                    label="Move-in Date"
                    rules={[
                      { required: true, message: "Please select move-in date" },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="minimumStay"
                    label="Minimum Stay (months)"
                    rules={[
                      {
                        type: "number",
                        min: 2,
                        message: "Minimum 2 month",
                      },
                      {
                        required: true,
                        message: "Please enter minimum stay",
                      },
                    ]}
                  >
                    <InputNumber
                      
                      placeholder="Minimum stay in months"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Bio Section */}
            <Card
              title={<Title level={4}>About You</Title>}
              style={{ marginBottom: 24 }}
              className="responsive-card"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <Form.Item
                    name="bio"
                    label="Bio"
                    extra="Tell potential roommates about yourself"
                    rules={[
                      {
                        required: true,
                        message: "Minimum 20 characters required",
                        min: 20,
                        max: 100,
                      },
                    ]}
                  >
                    {/* <TextArea
                      rows={4}
                      placeholder="Share a bit about yourself, your lifestyle, and what makes you a good roommate..."
                    /> */}
                    <TextArea
                      showCount
                      minLength={20}
                      maxLength={200}
                      placeholder="Share a bit about yourself, your lifestyle, and what makes you a good roommate..."
                      style={{ height: 120, resize: "none" }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24}></Col>
              </Row>
            </Card>

            {/* Submit Button */}
            <Form.Item>
              <Row justify="end">
                <Col>
                  <Space>
                    <Button onClick={() => form.resetFields()}>Reset</Button>
                    <Button type="primary" htmlType="submit" size="large">
                      Submit Profile
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
}

// Define the route using the UserProfileForm component
export const Route = createFileRoute("/_authenticated/roomListing")({
  component: UserProfileForm,
});

export default UserProfileForm;
