import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const user = pgTable("user", {
    id: text("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    organization_id: text("organization_id").notNull(),
    name: text("name"),
    email: text("email").notNull().unique(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});


export const webdata = pgTable("webdata",{
    id: text("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    userEmail: text("userEmail").notNull(),
    businessName: text("businessName").notNull(),
    websiteUrl: text("websiteUrl").notNull(),
    externalLinks: text("externalLinks"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});



export const knowledge_source = pgTable("knowledge_source", {
    id: text("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    userEmail: text("userEmail").notNull(),
    type: text("type").notNull(),
    name: text("name").notNull(),
    status: text("status").notNull().default("active"),
    source_url: text("source_url"),
    content: text("content"),
    web_data: text("web_data"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const sections = pgTable('sections', {
    id: text("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    userEmail: text("userEmail").notNull(),
    name: text("name").notNull(),
    description: text('description').notNull(),
    sourceIds: text('sourceIds').array().notNull(),
    tone: text('tone').notNull(),
    status: text('status').notNull().default('active'),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});