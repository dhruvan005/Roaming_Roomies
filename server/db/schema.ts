import { pgTable, uuid, text, integer, boolean, timestamp, date, numeric, index } from 'drizzle-orm/pg-core';

export const roommateUsers = pgTable('roommate_users', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  age: integer('age').notNull(),
  gender: text('gender').notNull(),
  occupation: text('occupation'),
  sleepSchedule: text('sleep_schedule'),
  cleanlinessLevel: integer('cleanliness_level'),
  dietaryPreference: text('dietary_preference'),
  smokingPreference: text('smoking_preference'),
  petPreference: text('pet_preference'),
  alcoholPreference: text('alcohol_preference'),
  workoutPreference: text('workout_preference'),
  socialTrait: text('social_trait'),
  interests: text('interests').array(),
  desiredRoomType: text('desired_room_type'),
  maxRent: numeric('max_rent'),
  preferredLocations: text('preferred_locations'),
  moveInDate: text('move_in_date'),
  minimumStay: integer('minimum_stay'),
  bio: text('bio'),
  profileImageUrl: text('profile_image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => {
  return {
    emailIdx: index('email_idx').on(table.email)
  }
});
