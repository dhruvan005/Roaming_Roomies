
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender:
  | "male"
  | "female"
  | "non_binary"
  | "other"
  | "prefer_not_to_say";
  occupation: string;
  profileImageUrl: string;

  // Lifestyle Preferences
  sleepSchedule:
  | "early_bird"
  | "night_owl"
  | "average"
  | "irregular";
  cleanlinessLevel: number;
  
  dietaryPreference: string;
  smokingPreference: string;
  petPreference: string;
  alcoholPreference: string;
  workoutPreference: string;
  socialTrait: string;
  interests: string[];
  desiredRoomType: "apartment" | "house" | "studio" | "other";
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
  users: User[];
}
export interface UserProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  age: number;
  gender: "male" | "female" | "non_binary" | "other" | "prefer_not_to_say";
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
  desiredRoomType?: "apartment" | "house" | "studio" | "other";
  maxRent?: number;
  preferredLocations: string;
  moveInDate?: Date;
  minimumStay?: number;

  bio?: string;
  profileImageUrl?: string;
}
