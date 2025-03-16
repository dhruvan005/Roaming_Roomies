
export interface User {

  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: "male" | "female" | "non_binary" | "other" | "prefer_not_to_say";
  occupation: string;
  sleepSchedule: string;
  cleanlinessLevel: number;
  dietaryPreferences: string;
  smokingTolerance: boolean;
  petTolerance: boolean;
  alcoholTolerance: boolean;
  interests: string[];
  desiredRoomType: "apartment" | "house" | "studio" | "other";
  maxRent: number;
  preferredLocations: string[];
  moveInDate: Date;
  minimumStay: number;
  bio: string;
  profileImageUrl: string;
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
  // Personal Information

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

  // Lifestyle Preferences
  sleepSchedule:
  | "early_bird"
  | "night_owl"
  | "average"
  | "irregular";
  cleanlinessLevel: number; // 1-5 scale
  dietaryPreferences:
  | "vegetarian"
  | "vegan"
  | "non_vegetarian"
  | "gluten_free"
  | "other"
  ;
  smokingTolerance: boolean;
  petTolerance: boolean;
  alcoholTolerance: boolean;
  interests: string[];
  desiredRoomType: "apartment" | "house" | "studio" | "other";
  maxRent: number ;
  preferredLocations: string[];
  moveInDate: Date ; // Uses Moment.js from Ant Design's DatePicker
  minimumStay: number ;

  // Bio Information
  bio: string;
  profileImageUrl: string;
}
