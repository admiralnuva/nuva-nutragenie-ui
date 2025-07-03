import { 
  users, recipes, chatMessages, nutritionEntries, healthMetrics, nutritionGoals,
  type User, type InsertUser, type Recipe, type InsertRecipe, type ChatMessage, type InsertChatMessage,
  type NutritionEntry, type InsertNutritionEntry, type HealthMetric, type InsertHealthMetric,
  type NutritionGoal, type InsertNutritionGoal
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByNickname(nickname: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User>;
  
  // Recipe operations
  getAllRecipes(): Promise<Recipe[]>;
  getRecipe(id: number): Promise<Recipe | undefined>;
  getRecipesByCategory(category: string): Promise<Recipe[]>;
  createRecipe(recipe: InsertRecipe): Promise<Recipe>;
  
  // Chat operations
  getChatMessages(userId: number, recipeId: number): Promise<ChatMessage[]>;
  addChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Nutrition tracking operations
  getNutritionEntries(userId: number, date?: string): Promise<NutritionEntry[]>;
  addNutritionEntry(entry: InsertNutritionEntry): Promise<NutritionEntry>;
  updateNutritionEntry(id: number, updates: Partial<NutritionEntry>): Promise<NutritionEntry>;
  deleteNutritionEntry(id: number): Promise<void>;
  
  // Health metrics operations
  getHealthMetrics(userId: number, dateRange?: { start: string; end: string }): Promise<HealthMetric[]>;
  addHealthMetric(metric: InsertHealthMetric): Promise<HealthMetric>;
  updateHealthMetric(id: number, updates: Partial<HealthMetric>): Promise<HealthMetric>;
  getLatestHealthMetric(userId: number): Promise<HealthMetric | undefined>;
  
  // Nutrition goals operations
  getNutritionGoals(userId: number): Promise<NutritionGoal | undefined>;
  setNutritionGoals(goals: InsertNutritionGoal): Promise<NutritionGoal>;
  updateNutritionGoals(userId: number, updates: Partial<NutritionGoal>): Promise<NutritionGoal>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private recipes: Map<number, Recipe>;
  private chatMessages: Map<number, ChatMessage>;
  private nutritionEntries: Map<number, NutritionEntry>;
  private healthMetrics: Map<number, HealthMetric>;
  private nutritionGoals: Map<number, NutritionGoal>;
  private currentUserId: number;
  private currentRecipeId: number;
  private currentChatId: number;
  private currentNutritionEntryId: number;
  private currentHealthMetricId: number;
  private currentNutritionGoalId: number;

  constructor() {
    this.users = new Map();
    this.recipes = new Map();
    this.chatMessages = new Map();
    this.nutritionEntries = new Map();
    this.healthMetrics = new Map();
    this.nutritionGoals = new Map();
    this.currentUserId = 1;
    this.currentRecipeId = 1;
    this.currentChatId = 1;
    this.currentNutritionEntryId = 1;
    this.currentHealthMetricId = 1;
    this.currentNutritionGoalId = 1;
    
    this.initializeRecipes();
  }

  private initializeRecipes() {
    const sampleRecipes: InsertRecipe[] = [
      {
        title: "Grilled Salmon Bowl",
        description: "Healthy omega-3 rich dinner with quinoa and fresh vegetables",
        cookTime: 25,
        servings: 2,
        calories: 420,
        difficulty: "medium",
        category: "healthy",
        ingredients: [
          "2 salmon fillets",
          "1 cup quinoa",
          "1 avocado",
          "Mixed greens",
          "Cherry tomatoes",
          "Olive oil",
          "Lemon",
          "Salt and pepper"
        ],
        instructions: [
          "Preheat oven to 400°F",
          "Season salmon with salt, pepper, and olive oil",
          "Cook quinoa according to package instructions",
          "Grill salmon for 12-15 minutes",
          "Prepare vegetables and assemble bowl"
        ],
        imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=200"
      },
      {
        title: "Veggie Stir Fry",
        description: "Quick and colorful vegetable stir fry",
        cookTime: 15,
        servings: 2,
        calories: 280,
        difficulty: "easy",
        category: "quick",
        ingredients: [
          "Mixed vegetables",
          "Soy sauce",
          "Garlic",
          "Ginger",
          "Sesame oil"
        ],
        instructions: [
          "Heat oil in wok",
          "Add garlic and ginger",
          "Stir fry vegetables",
          "Add sauce and serve"
        ],
        imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=120"
      },
      {
        title: "Mushroom Pasta",
        description: "Creamy pasta with mushrooms and herbs",
        cookTime: 20,
        servings: 2,
        calories: 450,
        difficulty: "easy",
        category: "comfort",
        ingredients: [
          "Pasta",
          "Mushrooms",
          "Cream",
          "Garlic",
          "Herbs"
        ],
        instructions: [
          "Boil pasta",
          "Sauté mushrooms",
          "Add cream and herbs",
          "Combine and serve"
        ],
        imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=120"
      }
    ];

    sampleRecipes.forEach(recipe => {
      this.createRecipe(recipe);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByNickname(nickname: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.nickname === nickname);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      ...insertUser,
      id,
      cookingPoints: 0,
      purchasePoints: 0,
      weekStreak: 0,
      completedChallenges: 0,
      recipesCompleted: 0
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const existingUser = this.users.get(id);
    if (!existingUser) {
      throw new Error('User not found');
    }
    const updatedUser = { ...existingUser, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllRecipes(): Promise<Recipe[]> {
    return Array.from(this.recipes.values());
  }

  async getRecipe(id: number): Promise<Recipe | undefined> {
    return this.recipes.get(id);
  }

  async getRecipesByCategory(category: string): Promise<Recipe[]> {
    return Array.from(this.recipes.values()).filter(recipe => 
      category === 'all' || recipe.category === category
    );
  }

  async createRecipe(insertRecipe: InsertRecipe): Promise<Recipe> {
    const id = this.currentRecipeId++;
    const recipe: Recipe = { ...insertRecipe, id };
    this.recipes.set(id, recipe);
    return recipe;
  }

  async getChatMessages(userId: number, recipeId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values()).filter(
      msg => msg.userId === userId && msg.recipeId === recipeId
    );
  }

  async addChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatId++;
    const message: ChatMessage = {
      ...insertMessage,
      id,
      timestamp: new Date().toISOString()
    };
    this.chatMessages.set(id, message);
    return message;
  }

  // Nutrition tracking operations
  async getNutritionEntries(userId: number, date?: string): Promise<NutritionEntry[]> {
    const entries = Array.from(this.nutritionEntries.values()).filter(entry => entry.userId === userId);
    if (date) {
      return entries.filter(entry => entry.date === date);
    }
    return entries;
  }

  async addNutritionEntry(insertEntry: InsertNutritionEntry): Promise<NutritionEntry> {
    const id = this.currentNutritionEntryId++;
    const entry: NutritionEntry = { ...insertEntry, id };
    this.nutritionEntries.set(id, entry);
    return entry;
  }

  async updateNutritionEntry(id: number, updates: Partial<NutritionEntry>): Promise<NutritionEntry> {
    const existing = this.nutritionEntries.get(id);
    if (!existing) throw new Error('Nutrition entry not found');
    const updated: NutritionEntry = { ...existing, ...updates };
    this.nutritionEntries.set(id, updated);
    return updated;
  }

  async deleteNutritionEntry(id: number): Promise<void> {
    this.nutritionEntries.delete(id);
  }

  // Health metrics operations
  async getHealthMetrics(userId: number, dateRange?: { start: string; end: string }): Promise<HealthMetric[]> {
    const metrics = Array.from(this.healthMetrics.values()).filter(metric => metric.userId === userId);
    if (dateRange) {
      return metrics.filter(metric => 
        metric.date >= dateRange.start && metric.date <= dateRange.end
      );
    }
    return metrics.sort((a, b) => b.date.localeCompare(a.date));
  }

  async addHealthMetric(insertMetric: InsertHealthMetric): Promise<HealthMetric> {
    const id = this.currentHealthMetricId++;
    const metric: HealthMetric = { ...insertMetric, id };
    this.healthMetrics.set(id, metric);
    return metric;
  }

  async updateHealthMetric(id: number, updates: Partial<HealthMetric>): Promise<HealthMetric> {
    const existing = this.healthMetrics.get(id);
    if (!existing) throw new Error('Health metric not found');
    const updated: HealthMetric = { ...existing, ...updates };
    this.healthMetrics.set(id, updated);
    return updated;
  }

  async getLatestHealthMetric(userId: number): Promise<HealthMetric | undefined> {
    const metrics = await this.getHealthMetrics(userId);
    return metrics[0]; // Already sorted by date desc
  }

  // Nutrition goals operations
  async getNutritionGoals(userId: number): Promise<NutritionGoal | undefined> {
    return Array.from(this.nutritionGoals.values()).find(goal => goal.userId === userId);
  }

  async setNutritionGoals(insertGoals: InsertNutritionGoal): Promise<NutritionGoal> {
    const id = this.currentNutritionGoalId++;
    const goals: NutritionGoal = { ...insertGoals, id };
    this.nutritionGoals.set(id, goals);
    return goals;
  }

  async updateNutritionGoals(userId: number, updates: Partial<NutritionGoal>): Promise<NutritionGoal> {
    const existing = Array.from(this.nutritionGoals.values()).find(goal => goal.userId === userId);
    if (!existing) throw new Error('Nutrition goals not found');
    const updated: NutritionGoal = { ...existing, ...updates };
    this.nutritionGoals.set(existing.id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
