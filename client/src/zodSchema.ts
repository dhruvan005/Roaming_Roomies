import { z } from 'zod';

// User Schema for Roommate Matching
// export const RoommateUserSchema = z.object({
//     // Basic Personal Information
//     firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
//     lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
//     email: z.string().email({ message: "Invalid email address" }),
//     phone: z.string().optional(),
//     age: z.number().min(18, { message: "Must be at least 18 years old" }).max(100, { message: "Age must be reasonable" }),
//     gender: z.enum(['male', 'female', 'non_binary', 'other', 'prefer_not_to_say']),
//     occupation: z.string().optional(),


//     cleanlinessLevel: z.number().min(1).max(5).optional(),

//     sleepSchedule: z.string().optional(),
//     dietaryPreference: z.string().optional(),

//     smokingPreference: z.string(),
//     petPreference: z.string(),
//     alcoholPreference: z.string(),
//     workoutPreference: z.string(),
//     socialTrait: z.string(),

//     interests: z.array(z.string()).optional(),

//     desiredRoomType: z.enum(['apartment', 'house', 'condo', 'studio', 'other']).optional(),
//     maxRent: z.number().positive().optional(),
//     preferredLocations: z.array(z.string()).optional(),
//     moveInDate: z.date().optional(),
//     minimumStay: z.number().positive().optional(),


//     bio: z.string().max(500, { message: "Bio must be 500 characters or less" }).optional(),
//     profileImageUrl: z.string().url().optional()
// })
