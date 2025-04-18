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
	Spin,
} from "antd";
import {
	PlusOutlined,
	CloseOutlined,
	UserOutlined,
	MailOutlined,
	PhoneOutlined,
	UploadOutlined,
} from "@ant-design/icons";
import { useQueryOptions, useCreateProfile } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Content } = Layout;
import { useNavigate } from "@tanstack/react-router";
import { UserProfileFormValues, GetApiResponse } from "../../types";
import UserForm from "../../components/UserForm";

function UserProfileForm() {
	const [form] = Form.useForm();
	const {
		isPending: isUserPending,
		isError: isUserError,
		data: currentUser,
	} = useQuery(useQueryOptions);

	const {
		data: userProfile,
		isPending: isProfilePending,
		isError: isProfileError,
	} = useQuery({
		queryKey: ["getByEmail", currentUser?.user?.email],
		queryFn: async () => {
			if (!currentUser?.user?.email) return null;
			const response = await fetch(`/api/user/${currentUser.user.email}`);
			if (!response.ok) return null;
			return response.json();
		},
		enabled: !!currentUser?.user?.email,
	});

	const [isEditing, setIsEditing] = useState(false);
	const [fileList, setFileList] = useState<any[]>([]);
	const [uploading, setUploading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const createProfile = useCreateProfile();
	const navigate = useNavigate();

	useEffect(() => {
		if (userProfile?.data) {
			setIsEditing(true);
			// Set form values with existing profile data
			const formattedData = {
				...userProfile.data,
				interests: userProfile.data.interests || [],
				preferredLocations: userProfile.data.preferredLocations || "",
				moveInDate: userProfile.data.moveInDate
					? dayjs(userProfile.data.moveInDate)
					: undefined,
			};
			form.setFieldsValue(formattedData);

			// Set image preview if exists
			if (userProfile.data.profileImageUrl) {
				setFileList([
					{
						uid: "-1",
						name: "profile-image",
						status: "done",
						url: userProfile.data.profileImageUrl,
					},
				]);
			}
		} else if (!isProfilePending) {
			// If profile doesn't exist and we're not waiting for the query
			setIsEditing(false);
			form.resetFields();
			setFileList([]);
		}
	}, [userProfile, isProfilePending, form]);

	const handleChange = ({ fileList: newFileList }: { fileList: any[] }) => {
		setFileList(newFileList.slice(-1)); // Keep only the latest file
	};

	const beforeUpload = (file: File) => {
		setFileList([file]); // Store only the last selected file
		return false; // Prevent Ant Design from automatically uploading
	};

	const uploadToCloudinary = async (file: File) => {
		const CLOUDINARY_UPLOAD_URL =
			"https://api.cloudinary.com/v1_1/dhruvandev/image/upload";
		const UPLOAD_PRESET = "roamingRoomies";

		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", UPLOAD_PRESET);

		try {
			const response = await fetch(CLOUDINARY_UPLOAD_URL, {
				method: "POST",
				body: formData,
			});

			const data = await response.json();
			if (data.secure_url) {
				return data.secure_url;
			} else {
				throw new Error("Failed to upload image.");
			}
		} catch (error) {
			console.error("Cloudinary upload error:", error);
			message.error("Image upload failed!");
			return null;
		}
	};

	const onFinish = async (values: UserProfileFormValues) => {
		try {
			setUploading(true);
			setSubmitting(true);

			let imageUrl = userProfile?.data?.profileImageUrl;
			if (fileList.length > 0 && fileList[0] instanceof File) {
				imageUrl = await uploadToCloudinary(fileList[0]);
			}

			if (!imageUrl && !isEditing) {
				message.error("Please upload an image before submitting.", 5);
				setUploading(false);
				setSubmitting(false);
				return;
			}

			const formattedValues = {
				...values,
				profileImageUrl: imageUrl,
				moveInDate: values.moveInDate,
			};

			const createdUser = await createProfile.mutateAsync(formattedValues);
			if (createdUser) {
				message.success(
					isEditing
						? "Profile updated successfully!"
						: "Profile created successfully!"
				);
				navigate({ to: "/allUsers" });
			} else {
				message.error("Failed to save profile. Please try again.");
			}
		} catch (error) {
			message.error("Failed to save profile. Please try again.");
		} finally {
			setUploading(false);
			setSubmitting(false);
		}
	};

	if (isUserPending || isProfilePending) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<Spin size="large" tip="Loading..." />
			</div>
		);
	}

	if (isUserError || isProfileError) {
		return <div>Error loading user data</div>;
	}

	// Prepare initial values for the UserForm component
	const initialValues = userProfile?.data ? {
		...userProfile.data,
		interests: userProfile.data.interests || [],
		preferredLocations: userProfile.data.preferredLocations || userProfile.data.preferredLocation || "",
		moveInDate: userProfile.data.moveInDate
			? dayjs(userProfile.data.moveInDate)
			: undefined,
	} : undefined;

	return (
		<Layout>
			<Content style={{ padding: "16px", margin: "0 auto" }}>
				<Card style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
					<Title
						level={2}
						style={{ textAlign: "center", marginBottom: "24px" }}
					>
						{isEditing ? "Edit Profile" : "Create Profile"}
					</Title>
					<UserForm 
						initialValues={initialValues}
						onFinish={onFinish}
						uploading={uploading}
						submitting={submitting}
						beforeUpload={beforeUpload}
						fileList={fileList}
					/>
				</Card>
			</Content>
		</Layout>
	);
}

export const Route = createFileRoute("/_authenticated/roommateListing")({
	component: UserProfileForm,
});

export default UserProfileForm;
