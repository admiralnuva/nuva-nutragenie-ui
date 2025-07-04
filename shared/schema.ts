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
  foodDislikes: text("food_dislikes").default(''),
  additionalNotes: text("additional_notes").default(''),
  selectedChef: jsonb("selected_chef").$type<{
    name: string;
    personality: string;
    emoji: string;
  }>().notNull(),
  cookingPoints: integer("cooking_points").default(0),
  purchasePoints: integer("purchase_points").default(0),
  weekStreak: integer("week_streak").default(0),
  completedChallenges: integer("completed_challenges").default(0),
  recipesCompleted: integer("recipes_completed").default(0),
  heightFeet: integer("height_feet"),
  heightInches: integer("height_inches"),
  currentWeight: integer("current_weight"),
  activityLevel: text("activity_level").default('moderate'), // sedentary, light, moderate, active, very_active
  streetAddress: text("street_address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code")
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

export const nutritionEntries = pgTable("nutrition_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  recipeId: integer("recipe_id").references(() => recipes.id),
  date: text("date").notNull(), // YYYY-MM-DD format
  mealType: text("meal_type").notNull(), // breakfast, lunch, dinner, snack
  calories: integer("calories").notNull(),
  protein: integer("protein").notNull(), // in grams
  carbs: integer("carbs").notNull(), // in grams
  fat: integer("fat").notNull(), // in grams
  fiber: integer("fiber").notNull(), // in grams
  sugar: integer("sugar").notNull(), // in grams
  sodium: integer("sodium").notNull(), // in mg
  customNotes: text("custom_notes").default('')
});

export const healthMetrics = pgTable("health_metrics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  date: text("date").notNull(), // YYYY-MM-DD format
  weight: integer("weight"), // in pounds or kg based on user preference
  bloodPressureSystolic: integer("blood_pressure_systolic"),
  bloodPressureDiastolic: integer("blood_pressure_diastolic"),
  bloodSugar: integer("blood_sugar"), // mg/dL
  energyLevel: integer("energy_level"), // 1-10 scale
  sleepHours: integer("sleep_hours"), // hours slept
  waterIntake: integer("water_intake"), // in ml
  exerciseMinutes: integer("exercise_minutes"),
  stressLevel: integer("stress_level"), // 1-10 scale
  notes: text("notes").default('')
});

export const nutritionGoals = pgTable("nutrition_goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  dailyCalories: integer("daily_calories").notNull(),
  dailyProtein: integer("daily_protein").notNull(),
  dailyCarbs: integer("daily_carbs").notNull(),
  dailyFat: integer("daily_fat").notNull(),
  dailyFiber: integer("daily_fiber").notNull(),
  dailySodium: integer("daily_sodium").notNull(),
  dailyWater: integer("daily_water").notNull(),
  weightGoal: text("weight_goal").notNull(), // lose, maintain, gain
  targetWeight: integer("target_weight"),
  weeklyWeightGoal: integer("weekly_weight_goal") // in pounds/kg per week
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

export const insertNutritionEntrySchema = createInsertSchema(nutritionEntries).omit({
  id: true
});

export const insertHealthMetricSchema = createInsertSchema(healthMetrics).omit({
  id: true
});

export const insertNutritionGoalSchema = createInsertSchema(nutritionGoals).omit({
  id: true
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
export type Recipe = typeof recipes.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertNutritionEntry = z.infer<typeof insertNutritionEntrySchema>;
export type NutritionEntry = typeof nutritionEntries.$inferSelect;
export type InsertHealthMetric = z.infer<typeof insertHealthMetricSchema>;
export type HealthMetric = typeof healthMetrics.$inferSelect;
export type InsertNutritionGoal = z.infer<typeof insertNutritionGoalSchema>;
export type NutritionGoal = typeof nutritionGoals.$inferSelect;
