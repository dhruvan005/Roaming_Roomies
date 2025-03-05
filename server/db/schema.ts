import { pgTable, uuid, text, integer, boolean, timestamp, date, numeric } from 'drizzle-orm/pg-core';

export const roommateUsers = pgTable('roommate_users', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  age: integer('age').notNull(),
  gender: text('gender').$type<'male' | 'female' | 'non_binary' | 'other' | 'prefer_not_to_say'>().notNull(),
  occupation: text('occupation'),
  sleepSchedule: text('sleep_schedule'),
  cleanlinessLevel: integer('cleanliness_level'),
  dietaryPreferences: text('dietary_preferences'),
  smokingTolerance: boolean('smoking_tolerance').default(false),
  petTolerance: boolean('pet_tolerance').default(false),
  alcoholTolerance: boolean('alcohol_tolerance').default(false),
  interests: text('interests').array(),
  personalityTraits: text('personality_traits'),
  desiredRoomType: text('desired_room_type').$type<'apartment' | 'house' | 'studio' | 'other'>(),
  maxRent: numeric('max_rent'),
  preferredLocations: text('preferred_locations').array(),
  moveInDate: date('move_in_date'),
  minimumStay: integer('minimum_stay'),
  bio: text('bio'),
  profileImageUrl: text('profile_image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// import { z } from 'zod';

// // User Schema for Roommate Matching
// export const RoommateUserSchema = z.object({
//   // Basic Personal Information
//   firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
//   lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
//   email: z.string().email({ message: "Invalid email address" }),
//   phone: z.string().optional(),
//   age: z.number().min(18, { message: "Must be at least 18 years old" }).max(100, { message: "Age must be reasonable" }),
//   gender: z.enum(['male', 'female', 'non_binary', 'other', 'prefer_not_to_say']),
//   occupation: z.string().optional(),

//   // Roommate Preferences
//   sleepSchedule: z.string().optional(),
//   cleanlinessLevel: z.number().min(1).max(5).optional(),
//   noiseLevel: z.number().min(1).max(5).optional(),
//   guestFrequency: z.number().min(1).max(5).optional(),
  
//   // Lifestyle Preferences
//   dietaryPreferences: z.string().optional(),
//   smokingTolerance: z.boolean().optional(),
//   petTolerance: z.boolean().optional(),
//   alcoholTolerance: z.boolean().optional(),
  
//   // Additional Preferences
//   interests: z.array(z.string()).optional(),
//   personalityTraits: z.record(z.string(), z.any()).optional(),

//   // Roommate Matching Criteria
//   desiredRoomType: z.enum(['apartment', 'house', 'condo', 'studio', 'other']).optional(),
//   maxRent: z.number().positive().optional(),
//   preferredLocations: z.array(z.string()).optional(),
//   moveInDate: z.date().optional(),
//   minimumStay: z.number().positive().optional(),

//   // Profile Additional Details
//   bio: z.string().max(500, { message: "Bio must be 500 characters or less" }).optional(),
//   profileImage: z.string().url().optional()
// });

// // Type for the form data
// export type RoommateUserData = z.infer<typeof RoommateUserSchema>;

// // Initial form values
// export const initialRoommateUserData: RoommateUserData = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   phone: '',
//   age: 18,
//   gender: 'prefer_not_to_say',
//   occupation: '',
//   sleepSchedule: '',
//   cleanlinessLevel: 3,
//   noiseLevel: 3,
//   guestFrequency: 3,
//   dietaryPreferences: '',
//   smokingTolerance: false,
//   petTolerance: false,
//   alcoholTolerance: false,
//   interests: [],
//   desiredRoomType: 'apartment',
//   maxRent: 1500,
//   preferredLocations: [],
//   bio: ''
// };