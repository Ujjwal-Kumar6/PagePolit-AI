CREATE TABLE "knowledge_source" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userEmail" text NOT NULL,
	"type" text NOT NULL,
	"name" text NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"source_url" text,
	"content" text,
	"web_data" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
