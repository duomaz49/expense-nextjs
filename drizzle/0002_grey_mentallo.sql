ALTER TABLE "budget" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "budget" ADD CONSTRAINT "budget_user_category_month_uidx" UNIQUE("user_id","category_id","month");