import { z } from 'zod';


export const RoommateUserSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().optional(),
    age: z.number().int().min(18, { message: "Must be at least 18 years old" }).max(100, { message: "Age must be reasonable" }),
    gender: z.enum(['male', 'female', 'non_binary', 'other', 'prefer_not_to_say']),
    occupation: z.string().optional(),

    // Roommate Preferences
    sleepSchedule: z.string().optional(),
    cleanlinessLevel: z.number().int().min(1).max(5).optional(),

    // Lifestyle Preferences
    dietaryPreference: z.string(),
    smokingPreference: z.string(),
    petPreference: z.string(),
    alcoholPreference: z.string(),
    workoutPreference: z.string(),
    socialTrait: z.string(),
    // Additional Preferences
    interests: z.array(z.string()).optional(),


    // Roommate Matching Criteria
    desiredRoomType: z.enum(['apartment', 'house', 'studio', 'other']).optional(),
    maxRent: z.number().positive().optional(),
    preferredLocations: z.string(),
    moveInDate: z.coerce.date().optional(),
    minimumStay: z.number().int().positive().optional(),

    // Profile Additional Details
    bio: z.string().max(200, { message: "Bio must be 200 characters or less" }).optional(),
    profileImageUrl: z.string().url().optional()
});
