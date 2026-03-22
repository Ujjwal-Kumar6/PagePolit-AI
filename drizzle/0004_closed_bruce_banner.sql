CREATE TABLE "sections" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userEmail" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"sourceIds" text[] NOT NULL,
	"tone" text NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
