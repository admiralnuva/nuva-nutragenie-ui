import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  nickname: text("nickname").notNull(),
  avatar: text("avatar").notNull().default('😀'),
  ageGroup: text("age_group").notNull(),
  phoneNumber: text("phone_number").notNull(),
  dietaryRestrictions: jsonb("dietary_restrictions").$type<string[]>().default([]),
  healthGoals: jsonb("health_goals").$type<string[]>().default([]),
  allergies: text("allergies").default(''),
  selectedChef: jsonb("selected_chef").$type<{
    name: string;
    personality: string;
    emoji: string;
  }>().notNull(),
  cookingPoints: integer("cooking_points").default(0),
  purchasePoints: integer("purchase_points").default(0),
  weekStreak: integer("week_streak").default(0),
  completedChallenges: integer("completed_challenges").default(0),
  recipesCompleted: integer("recipes_completed").default(0)
});

export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  cookTime: integer("cook_time").notNull(), // in minutes
  servings: integer("servings").notNull(),
  calories: integer("calories").notNull(),
  difficulty: text("difficulty").notNull(), // easy, medium, hard
  category: text("category").notNull(), // quick, healthy, dessert, etc.
  ingredients: jsonb("ingredients").$type<string[]>().notNull(),
  instructions: jsonb("instructions").$type<string[]>().notNull(),
  rating: integer("rating").default(5), // 1-5 stars
  imageUrl: text("image_url")
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  recipeId: integer("recipe_id").references(() => recipes.id),
  sender: text("sender").notNull(), // 'user' or 'chef'
  message: text("message").notNull(),
  timestamp: text("timestamp").notNull()
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  cookingPoints: true,
  purchasePoints: true,
  weekStreak: true,
  completedChallenges: true,
  recipesCompleted: true
});

export const insertRecipeSchema = createInsertSchema(recipes).omit({
  id: true
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  timestamp: true
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
export type Recipe = typeof recipes.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
