CREATE TABLE "web_data" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userEmail" text NOT NULL,
	"businessName" text NOT NULL,
	"websiteUrl" text NOT NULL,
	"externalLinks" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
