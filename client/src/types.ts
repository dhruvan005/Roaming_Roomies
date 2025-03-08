export interface User {
    id: number;
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
    personalityTraits: Record<string, any>;
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