import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
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
  HomeOutlined,
  InboxOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Content } = Layout;
interface UserProfileFormValues {
  // Personal Information
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number | null;
  gender:
    | "male"
    | "female"
    | "non_binary"
    | "other"
    | "prefer_not_to_say"
    | undefined;
  occupation: string;

  // Lifestyle Preferences
  sleepSchedule:
    | "early_bird"
    | "night_owl"
    | "average"
    | "irregular"
    | undefined;
  cleanlinessLevel: number; // 1-5 scale
  dietaryPreferences:
    | "vegetarian"
    | "vegan"
    | "pescatarian"
    | "omnivore"
    | "gluten_free"
    | "other"
    | undefined;
  smokingTolerance: boolean;
  petTolerance: boolean;
  alcoholTolerance: boolean;

  // Interests
  interests: string[];

  // Personality Traits
  personalityTraits: Record<string, string>; // Key-value pairs of traits

  // Housing Preferences
  desiredRoomType: "apartment" | "house" | "studio" | "other" | undefined;
  maxRent: number | null;
  preferredLocations: string[];
  moveInDate: moment.Moment | null; // Uses Moment.js from Ant Design's DatePicker
  minimumStay: number | null;

  // Bio Information
  bio: string;
  profileImageUrl: string;
}

function UserProfileForm() {
  const [form] = Form.useForm();

  // States for managing dynamic fields
  const [newInterest, setNewInterest] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [traitKey, setTraitKey] = useState("");
  const [traitValue, setTraitValue] = useState("");

  // Get current lists from form for dynamic fields
  const getInterests = () => form.getFieldValue("interests") || [];
  const getLocations = () => form.getFieldValue("preferredLocations") || [];
  const getTraits = () => form.getFieldValue("personalityTraits") || {};

  // Add new interest
  const addInterest = () => {
    if (!newInterest.trim()) return;
    const interests = getInterests();
    // Make sure interests is an array
    const currentInterests = Array.isArray(interests) ? interests : [];
    form.setFieldsValue({ interests: [...currentInterests, newInterest.trim()] });
    setNewInterest(""); // Clear the input field after adding
  };

  // Remove interest
  const removeInterest = (index: number) => {
    const interests = getInterests();
    form.setFieldsValue({
      interests: interests.filter((_: any, i: number) => i !== index),
    });
  };

  // Add new location
  const addLocation = () => {
    if (!newLocation.trim()) return;

    const locations = getLocations();
    form.setFieldsValue({
      preferredLocations: [...locations, newLocation.trim()],
    });
    setNewLocation("");
  };

  // Remove location
  const removeLocation = (index: number) => {
    const locations = getLocations();
    form.setFieldsValue({
      preferredLocations: locations.filter((_: any, i: number) => i !== index),
    });
  };

  // Add personality trait
  const addPersonalityTrait = () => {
    if (!traitKey.trim() || !traitValue.trim()) return;

    const traits = getTraits();
    form.setFieldsValue({
      personalityTraits: {
        ...traits,
        [traitKey.trim()]: traitValue.trim(),
      },
    });

    setTraitKey("");
    setTraitValue("");
  };

  // Remove personality trait
  const removePersonalityTrait = (key: string) => {
    const traits = getTraits();
    const newTraits = { ...traits };
    delete newTraits[key];

    form.setFieldsValue({ personalityTraits: newTraits });
  };

  // Form submission
  const onFinish = (values: UserProfileFormValues) => {
    // Convert moment to ISO string for move-in date
    const formattedValues: UserProfileFormValues = {
      ...values,
      moveInDate: values.moveInDate?.toISOString() as any,
    };

    console.log("Form values:", formattedValues);
    message.success("Profile submitted successfully!");

    // Here you would typically send the data to your API
  };

  function normFile(e: any) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  return (
    <Layout>
      <Content
        style={{ padding: "16px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <Card
          bordered={false}
          style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
        >
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: "24px" }}
          >
            User Profile Form
          </Title>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark="optional"
            scrollToFirstError
            initialValues={{
              id: 0,
              firstName: "",
              lastName: "",
              email: "",
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
                      { required: true, message: "Please enter your age" },
                    ]}
                  >
                    <InputNumber
                      min={18}
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
                  <Form.Item name="occupation" label="Occupation">
                    <Input placeholder="Your occupation" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Dragger">
                    <Form.Item
                      name="dragger"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      noStyle
                    >
                      <Upload.Dragger name="files" action="/upload.do">
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                          Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                          Support for a single or bulk upload.
                        </p>
                      </Upload.Dragger>
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
                  <Form.Item name="sleepSchedule" label="Sleep Schedule">
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

                <Col xs={24} sm={12}>
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
                      <Option value="pescatarian">Pescatarian</Option>
                      <Option value="omnivore">Omnivore</Option>
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
                      onClick={() => addInterest()}
                    >
                      Add
                    </Button>
                  </Space>

                  <div style={{ marginTop: 8 }}>
                    {getInterests().length > 0 ? (
                      <Space size={[8, 8]} wrap>
                        {Array.isArray(getInterests()) ? (
                          getInterests().map(
                            (interest: string, index: number) => (
                              <Tag
                                key={index}
                                closable
                                onClose={() => removeInterest(index)}
                                color="blue"
                              >
                                {interest}
                              </Tag>
                            )
                          )
                        ) : (
                          <Paragraph type="secondary">
                            No interests added yet.
                          </Paragraph>
                        )}
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

            {/* Personality Traits Section */}
            <Card
              title={<Title level={4}>Personality Traits</Title>}
              style={{ marginBottom: 24 }}
              className="responsive-card"
            >
              <Form.Item
                name="personalityTraits"
                label="Your Personality Traits"
                extra="Add key personality traits that describe you"
              >
                <div>
                  <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                    <Col xs={24} sm={10}>
                      <Input
                        placeholder="Trait (e.g., Sociability)"
                        value={traitKey}
                        onChange={(e) => setTraitKey(e.target.value)}
                      />
                    </Col>
                    <Col xs={24} sm={10}>
                      <Input
                        placeholder="Value (e.g., Highly social)"
                        value={traitValue}
                        onChange={(e) => setTraitValue(e.target.value)}
                        onPressEnter={addPersonalityTrait}
                      />
                    </Col>
                    <Col xs={24} sm={4}>
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={addPersonalityTrait}
                        block
                      >
                        Add
                      </Button>
                    </Col>
                  </Row>

                  <div style={{ marginTop: 8 }}>
                    {Object.keys(getTraits()).length > 0 ? (
                      <Space direction="vertical" style={{ width: "100%" }}>
                        {Object.entries(getTraits()).map(([key, value]) => (
                          <Card
                            key={key}
                            size="small"
                            style={{ marginBottom: 8 }}
                            extra={
                              <Button
                                type="text"
                                danger
                                icon={<CloseOutlined />}
                                onClick={() => removePersonalityTrait(key)}
                              />
                            }
                          >
                            <strong>{key as string}:</strong> {value as string}
                          </Card>
                        ))}
                      </Space>
                    ) : (
                      <Paragraph type="secondary">
                        No personality traits added yet.
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

                <Col xs={24}>
                  <Form.Item
                    name="preferredLocations"
                    label="Preferred Locations"
                    extra="Add neighborhoods, cities, or areas you'd like to live in"
                  >
                    <div>
                      <Space
                        direction="horizontal"
                        style={{ marginBottom: 16 }}
                      >
                        <Input
                          prefix={<HomeOutlined />}
                          placeholder="Add a location"
                          value={newLocation}
                          onChange={(e) => setNewLocation(e.target.value)}
                          onPressEnter={addLocation}
                        />
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={addLocation}
                        >
                          Add
                        </Button>
                      </Space>

                      <div style={{ marginTop: 8 }}>
                        {getLocations().length > 0 ? (
                          <Space size={[8, 8]} wrap>
                            {getLocations().map(
                              (
                                location:
                                  | string
                                  | number
                                  | bigint
                                  | boolean
                                  | React.ReactElement<
                                      unknown,
                                      string | React.JSXElementConstructor<any>
                                    >
                                  | Iterable<React.ReactNode>
                                  | React.ReactPortal
                                  | Promise<
                                      | string
                                      | number
                                      | bigint
                                      | boolean
                                      | React.ReactPortal
                                      | React.ReactElement<
                                          unknown,
                                          | string
                                          | React.JSXElementConstructor<any>
                                        >
                                      | Iterable<React.ReactNode>
                                      | null
                                      | undefined
                                    >
                                  | null
                                  | undefined,
                                index: number
                              ) => (
                                <Tag
                                  key={index}
                                  closable
                                  onClose={() =>
                                    removeLocation(index as number)
                                  }
                                  color="green"
                                >
                                  {location}
                                </Tag>
                              )
                            )}
                          </Space>
                        ) : (
                          <Paragraph type="secondary">
                            No locations added yet.
                          </Paragraph>
                        )}
                      </div>
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
                      { required: true, message: "Please enter minimum stay" },
                    ]}
                  >
                    <InputNumber
                      min={1}
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
                  >
                    <TextArea
                      rows={4}
                      placeholder="Share a bit about yourself, your lifestyle, and what makes you a good roommate..."
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
export const Route = createFileRoute("/roomListing")({
  component: UserProfileForm,
});

export default UserProfileForm;
