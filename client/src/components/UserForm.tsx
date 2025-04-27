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
  Image,
  Modal,
} from "antd";
import {
  PlusOutlined,
  CloseOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useQueryOptions } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
const { Title, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Content } = Layout;
import { useCreateProfile } from "../lib/api";
import { useNavigate } from "@tanstack/react-router";
import { UserProfileFormValues } from "../types";

interface UserProfileFormComponentProps {
  initialValues?: any;
  onFinish: (values: UserProfileFormValues) => Promise<void>;
  uploading: boolean;
  submitting: boolean;
  beforeUpload: (file: File) => boolean;
  fileList: any[];
}

const UserForm: React.FC<UserProfileFormComponentProps> = ({
  initialValues,
  onFinish,
  uploading,
  submitting,
  beforeUpload,
  fileList: initialFileList,
}) => {
  const [fileList, setFileList] = useState(initialFileList || []);
  const [form] = Form.useForm();
  const [newInterest, setNewInterest] = useState("");
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );
  const [interests, setInterests] = useState<{ id: number; value: string }[]>(
    []
  );

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);

      // Initialize interests state with existing interests from initialValues
      if (initialValues.interests && Array.isArray(initialValues.interests)) {
        const formattedInterests = initialValues.interests.map(
          (interest: any, index: number) => ({
            id: index + Date.now(),
            value:
              typeof interest === "string"
                ? interest
                : interest.value || interest,
          })
        );
        setInterests(formattedInterests);
      }
    }
  }, [initialValues, form]);

  const addInterest = useCallback(() => {
    if (!newInterest.trim()) return;

    const newEntry = {
      id: Date.now(),
      value: newInterest.trim(),
    };

    setInterests((prevInterests) => {
      const updatedInterests = [...prevInterests, newEntry];
      form.setFieldsValue({
        interests: updatedInterests.map((item) => item.value),
      });

      return updatedInterests;
    });

    setNewInterest("");
  }, [newInterest, form]);

  const removeInterest = useCallback(
    (idToRemove: number) => {
      setInterests((prevInterests) => {
        const updatedInterests = prevInterests.filter(
          (item) => item.id !== idToRemove
        );

        form.setFieldsValue({
          interests: updatedInterests.map((item) => item.value),
        });

        return updatedInterests;
      });
    },
    [form]
  );

  const clearAllInterests = useCallback(() => {
    setInterests([]);
    form.setFieldsValue({ interests: [] });
  }, [form]);

  const handleFormSubmit = async (values: UserProfileFormValues) => {
    try {
      await onFinish(values);
      message.success("Profile submitted successfully!");
    } catch (error) {
      console.error("Form submission error:", error);
      message.error("Failed to submit profile. Please try again.");
    }
  };

  const [previewVisible, setPreviewVisible] = useState(false);

  const handlePreviewClose = useCallback(() => {
    setPreviewVisible(false);
  }, []);

  return (
    <div>
      <Content style={{ padding: "16px", margin: "0 auto" }}>
        <Card
          // variant={borderless}
          style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
        >
          <Divider />
          <Form
            form={form}
            layout="vertical"
            encType="multipart/form-data"
            onFinish={onFinish}
            requiredMark="optional"
            scrollToFirstError
            // onFinish={handleFormSubmit}
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
                        pattern: /^[0-9+\-\s()]{10}$/,
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
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Non Binary">Non-binary</Option>
                      <Option value="Other">Other</Option>
                      <Option value="Prefer_Not_To_Say">
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
                  <Form.Item
                    label="Profile Photo"
                    name={["profileImageUrl"]}
                    rules={[
                      {
                        required: true,
                        message: "Please upload a profile photo",
                      },
                    ]}
                  >
                    <Upload
                      beforeUpload={beforeUpload}
                      fileList={fileList}
                      onChange={({ fileList: newFileList }) => {
                        setFileList(newFileList); // Update the fileList state
                      }}
                      onPreview={(file) => {
                        setPreviewImage(file.thumbUrl || file.url); // Set the preview image
                        setPreviewVisible(true); // Open the modal
                      }}
                      showUploadList={true}
                      listType="picture-card" // Enables image preview
                    >
                      {fileList.length < 1 && (
                        <Button icon={<UploadOutlined />}>
                          Click to Select Image
                        </Button>
                      )}
                    </Upload>

                    {/*  Show the existing image in edit mode */}
                    {fileList.length === 0 &&
                      initialFileList.length > 0 &&
                      initialFileList[0].url && (
                        <Image
                          src={initialFileList[0].url} // Display the existing image in edit mode
                          alt="Profile Preview"
                          style={{
                            marginTop: 16,
                            maxWidth: "100%",
                            maxHeight: 200,
                          }}
                        />
                      )}
                  </Form.Item>

                  {fileList.length > 0 && (
                    <Image
                      src={fileList[0].thumbUrl || fileList[0].url} // Show the preview image
                      alt="Preview"
                    />
                  )}
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
                      <Option value="Early Bird">
                        Early Bird (Before 10 PM)
                      </Option>
                      <Option value="Night Owl">
                        Night Owl (After Midnight)
                      </Option>
                      <Option value="Average">
                        Average (10 PM - Midnight)
                      </Option>
                      <Option value="Irregular">Irregular</Option>
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
                    name="dietaryPreference"
                    label="Dietary Preference"
                  >
                    <Select placeholder="Select dietary preference">
                      <Option value="Vegetarian">Vegetarian</Option>
                      <Option value="Vegan">Vegan</Option>
                      <Option value="Non-Vegetarian">Non-Vegetarian</Option>
                      <Option value="Gluten-Free">Gluten-Free</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Habits & Social Preferences Section */}
            <Card
              title={<Title level={4}> Habits & Social Preferences</Title>}
              style={{ marginBottom: 24 }}
              className="responsive-card"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="smokingPreference"
                    label="Smoking Preference"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Smoking Preference ",
                      },
                    ]}
                  >
                    <Select placeholder="Select Smoking Preference">
                      <Option value="Non-Smoker">Non-Smoker</Option>
                      <Option value="Smoker">Smoker</Option>
                      <Option value="Social Smoker">Social Smoker</Option>
                      <Option value="Vaper">Vaper</Option>
                      <Option value="Trying To Quit">Trying To Quit</Option>
                      <Option value="Smoker when drinking">
                        Smoker when drinking
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="alcoholPreference"
                    label="Alcohol Preference"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Alcohol Preference",
                      },
                    ]}
                  >
                    <Select placeholder="Select Alcohol Preference">
                      <Option value="Not for Me">Not for Me</Option>
                      <Option value="Social Drinker (On weekends)">
                        Social Drinker (On weekends)
                      </Option>
                      <Option value="Most Nights">Most Nights</Option>
                      <Option value="Sober">Sober</Option>
                      <Option value="Sober curious">Sober curious</Option>
                      <Option value="Trying To Quit">Trying To Quit</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="workoutPreference"
                    label="Workout Preference"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Workout Preference",
                      },
                    ]}
                  >
                    <Select placeholder="Select Workout Preference">
                      <Option value="Gym Rat">Gym Rat</Option>
                      <Option value="Often">Often</Option>
                      <Option value="Sometimes">Sometimes</Option>
                      <Option value="Trying To Start">Trying To Start</Option>
                      <Option value="Never">Never</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="petPreference"
                    label="Pet Preference"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Pet Preference",
                      },
                    ]}
                  >
                    <Select placeholder="Select Pet Preference">
                      <Option value="Loves Pets">Loves Pets</Option>
                      <Option value="Allergic">Allergic</Option>
                      <Option value="No Pets">No Pets</Option>
                      <Option value="Open To Pets">Open To Pets</Option>
                      <Option value="Has Pets">Has Pets</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="socialTrait"
                    label="Social Trait"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Social Trait",
                      },
                    ]}
                  >
                    <Select placeholder="Select Social Trait">
                      <Option value="Introvert">Introvert</Option>
                      <Option value="Extrovert">Extrovert</Option>
                      <Option value="Ambivert">Ambivert</Option>
                      <Option value="Shy">Shy</Option>
                      <Option value="Outgoing">Outgoing</Option>
                      <Option value="Friendly">Friendly</Option>
                      <Option value="Quiet">Quiet</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card
              title={<Title level={4}>Interests</Title>}
              style={{ marginBottom: 24 }}
              className="responsive-card"
            >
              <Form.Item
                name="interests"
                label="Your Interests"
                extra="Add your hobbies, activities, and other interests"
                required
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
                      <Option value="Apartment">Apartment</Option>
                      <Option value="House">House</Option>
                      <Option value="Studio">Studio</Option>
                      <Option value="Other">Other</Option>
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
                    <Input placeholder="Add neighborhoods, cities, or areas" />
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
                        required: true,
                        message: "Please enter minimum stay",
                      },
                    ]}
                  >
                    <Select placeholder="Select minimum stay">
                      <Option value={3}>3 months</Option>
                      <Option value={6}>6 months</Option>
                      <Option value={12}>12 months</Option>
                      <Option value={24}>24 months</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>

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
                    {/* <TextArea
                            rows={4}
                            placeholder="Share a bit about yourself, your lifestyle, and what makes you a good roommate..."
                          /> */}
                    <TextArea
                      showCount
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
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      loading={submitting || uploading}
                      disabled={submitting || uploading}
                    >
                      {submitting || uploading
                        ? "Submitting..."
                        : "Submit Profile"}
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </div>
  );
};

export default UserForm;
