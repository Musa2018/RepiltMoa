import { pgTable, text, serial, integer, timestamp, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// News/Announcements
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  titleEn: text("title_en").notNull(),
  titleAr: text("title_ar").notNull(),
  contentEn: text("content_en").notNull(),
  contentAr: text("content_ar").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(),
  publishDate: timestamp("publish_date").notNull(),
  isPublished: boolean("is_published").notNull().default(true),
});

export const insertNewsSchema = createInsertSchema(news).omit({
  id: true,
});

export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;

// Resources (documents, guides, etc.)
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  titleEn: text("title_en").notNull(),
  titleAr: text("title_ar").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionAr: text("description_ar").notNull(),
  category: text("category").notNull(),
  fileType: text("file_type").notNull(), // PDF, XLSX, PPT, etc.
  fileUrl: text("file_url").notNull(),
  fileSize: text("file_size"), // Optional size info
  isPublished: boolean("is_published").notNull().default(true),
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
});

export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Resource = typeof resources.$inferSelect;

// Ministry Services
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  titleEn: text("title_en").notNull(),
  titleAr: text("title_ar").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionAr: text("description_ar").notNull(),
  category: text("category").notNull(),
  icon: text("icon"), // FontAwesome icon class
  isPublished: boolean("is_published").notNull().default(true),
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// Directories (ministry offices, departments)
export const directories = pgTable("directories", {
  id: serial("id").primaryKey(),
  nameEn: text("name_en").notNull(),
  nameAr: text("name_ar").notNull(),
  region: text("region").notNull(), // Central, North, South, etc.
  addressEn: text("address_en").notNull(),
  addressAr: text("address_ar").notNull(),
  phone: text("phone"),
  email: text("email"),
  hoursEn: text("hours_en"),
  hoursAr: text("hours_ar"),
  servicesEn: text("services_en").array(),
  servicesAr: text("services_ar").array(),
  isPublished: boolean("is_published").notNull().default(true),
});

export const insertDirectorySchema = createInsertSchema(directories).omit({
  id: true,
});

export type InsertDirectory = z.infer<typeof insertDirectorySchema>;
export type Directory = typeof directories.$inferSelect;

// Statistics
export const statistics = pgTable("statistics", {
  id: serial("id").primaryKey(),
  labelEn: text("label_en").notNull(),
  labelAr: text("label_ar").notNull(),
  value: text("value").notNull(),
  order: integer("order").notNull(),
  isPublished: boolean("is_published").notNull().default(true),
});

export const insertStatisticSchema = createInsertSchema(statistics).omit({
  id: true,
});

export type InsertStatistic = z.infer<typeof insertStatisticSchema>;
export type Statistic = typeof statistics.$inferSelect;
