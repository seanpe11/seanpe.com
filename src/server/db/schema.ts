import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const quotes = pgTable("seanpecom_quotes", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}); 