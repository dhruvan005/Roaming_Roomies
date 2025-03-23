ALTER TABLE "roommate_users" RENAME COLUMN "smoking_tolerance" TO "smoking_preferences";--> statement-breakpoint
ALTER TABLE "roommate_users" RENAME COLUMN "pet_tolerance" TO "pet_preferences";--> statement-breakpoint
ALTER TABLE "roommate_users" RENAME COLUMN "alcohol_tolerance" TO "alcohol_preferences";--> statement-breakpoint
ALTER TABLE "roommate_users" ALTER COLUMN "dietary_preferences" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "roommate_users" ADD COLUMN "workout_preferences" text NOT NULL;--> statement-breakpoint
ALTER TABLE "roommate_users" ADD COLUMN "social_traits" text NOT NULL;