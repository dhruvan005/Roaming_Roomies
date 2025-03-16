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
  desiredRoomType: text('desired_room_type').$type<'apartment' | 'house' | 'studio' | 'other'>(),
  maxRent: numeric('max_rent'),
  preferredLocations: text('preferred_locations'),
  moveInDate: date('move_in_date'),
  minimumStay: integer('minimum_stay'),
  bio: text('bio'),
  profileImageUrl: text('profile_image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
