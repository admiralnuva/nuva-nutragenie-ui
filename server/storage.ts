import { users, recipes, chatMessages, type User, type InsertUser, type Recipe, type InsertRecipe, type ChatMessage, type InsertChatMessage } from "@shared/schema";

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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private recipes: Map<number, Recipe>;
  private chatMessages: Map<number, ChatMessage>;
  private currentUserId: number;
  private currentRecipeId: number;
  private currentChatId: number;

  constructor() {
    this.users = new Map();
    this.recipes = new Map();
    this.chatMessages = new Map();
    this.currentUserId = 1;
    this.currentRecipeId = 1;
    this.currentChatId = 1;
    
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
}

export const storage = new MemStorage();
