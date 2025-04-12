export interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  occupation: string;
  profileImageUrl: string;

  // Lifestyle Preferences
  sleepSchedule: string;
  cleanlinessLevel: number;

  dietaryPreference: string;
  smokingPreference: string;
  petPreference: string;
  alcoholPreference: string;
  workoutPreference: string;
  socialTrait: string;
  interests: string[];
  desiredRoomType: string;
  maxRent: number;
  preferredLocations: string;
  moveInDate: Date; // Uses Moment.js from Ant Design's DatePicker
  minimumStay: number;

  // Bio Information
  bio: string;
  createdAt: Date;
  updatedAt: Date;

}

export interface ApiResponse {
  success: boolean;
  page: number;
  limit: number;
  total: string;
  users: UserType[];
}

export interface GetApiResponse {
  success: boolean;
  users: UserType;
}

export interface UserProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  age: number;
  gender: string;
  occupation?: string;

  // Lifestyle Preferences
  sleepSchedule?: string;
  cleanlinessLevel?: number;
  dietaryPreference: string;
  smokingPreference: string;
  petPreference: string;
  alcoholPreference: string;
  workoutPreference: string;
  socialTrait: string;

  interests?: string[];
  desiredRoomType?: string;
  maxRent?: number;
  preferredLocations: string;
  moveInDate?: string | null;
  minimumStay?: number;

  bio?: string;
  profileImageUrl?: string;
}
