ALTER TABLE "roommate_users" ADD COLUMN "smoking_preference" text;--> statement-breakpoint
ALTER TABLE "roommate_users" ADD COLUMN "pet_preference" text;--> statement-breakpoint
ALTER TABLE "roommate_users" ADD COLUMN "alcohol_preference" text;--> statement-breakpoint
ALTER TABLE "roommate_users" DROP COLUMN "smoking_preferences";--> statement-breakpoint
ALTER TABLE "roommate_users" DROP COLUMN "pet_preferences";--> statement-breakpoint
ALTER TABLE "roommate_users" DROP COLUMN "alcohol_preferences";