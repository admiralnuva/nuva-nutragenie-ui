import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertChatMessageSchema } from "@shared/schema";
import OpenAI from "openai";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data", error: error.message });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error: error.message });
    }
  });

  app.patch("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const user = await storage.updateUser(id, updates);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Error updating user", error: error.message });
    }
  });

  // Recipe routes
  app.get("/api/recipes", async (req, res) => {
    try {
      const category = req.query.category as string;
      const recipes = category ? 
        await storage.getRecipesByCategory(category) : 
        await storage.getAllRecipes();
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recipes", error: error.message });
    }
  });

  app.get("/api/recipes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const recipe = await storage.getRecipe(id);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recipe", error: error.message });
    }
  });

  // Chat routes
  app.get("/api/chat/:userId/:recipeId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const recipeId = parseInt(req.params.recipeId);
      const messages = await storage.getChatMessages(userId, recipeId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Error fetching chat messages", error: error.message });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const messageData = insertChatMessageSchema.parse(req.body);
      const message = await storage.addChatMessage(messageData);
      
      // If it's a user message, generate AI chef response
      if (messageData.sender === 'user') {
        const recipe = await storage.getRecipe(messageData.recipeId!);
        const user = await storage.getUser(messageData.userId!);
        
        if (recipe && user) {
          // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
          const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: `You are ${user.selectedChef.name}, a friendly AI cooking assistant with personality: ${user.selectedChef.personality}. You're helping cook "${recipe.title}". Be encouraging, helpful, and stay in character. Respond in JSON format: {"message": "your response"}`
              },
              {
                role: "user",
                content: messageData.message
              }
            ],
            response_format: { type: "json_object" }
          });

          const aiResponse = JSON.parse(response.choices[0].message.content || '{"message": "I\'m here to help!"}');
          
          const chefMessage = await storage.addChatMessage({
            userId: messageData.userId,
            recipeId: messageData.recipeId,
            sender: 'chef',
            message: aiResponse.message
          });

          res.json({ userMessage: message, chefMessage });
        } else {
          res.json({ userMessage: message });
        }
      } else {
        res.json({ userMessage: message });
      }
    } catch (error) {
      res.status(400).json({ message: "Error sending message", error: error.message });
    }
  });

  // Health Analytics Routes

  // Nutrition entries
  app.get("/api/nutrition-entries", async (req, res) => {
    try {
      const { userId, date } = req.query;
      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }
      const entries = await storage.getNutritionEntries(Number(userId), date as string);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "Error fetching nutrition entries", error: error.message });
    }
  });

  app.post("/api/nutrition-entries", async (req, res) => {
    try {
      const entry = await storage.addNutritionEntry(req.body);
      res.json(entry);
    } catch (error) {
      res.status(400).json({ message: "Error adding nutrition entry", error: error.message });
    }
  });

  app.patch("/api/nutrition-entries/:id", async (req, res) => {
    try {
      const entry = await storage.updateNutritionEntry(Number(req.params.id), req.body);
      res.json(entry);
    } catch (error) {
      res.status(400).json({ message: "Error updating nutrition entry", error: error.message });
    }
  });

  app.delete("/api/nutrition-entries/:id", async (req, res) => {
    try {
      await storage.deleteNutritionEntry(Number(req.params.id));
      res.json({ message: "Nutrition entry deleted" });
    } catch (error) {
      res.status(400).json({ message: "Error deleting nutrition entry", error: error.message });
    }
  });

  // Health metrics
  app.get("/api/health-metrics", async (req, res) => {
    try {
      const { userId, start, end } = req.query;
      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }
      
      let dateRange;
      if (start && end) {
        dateRange = { start: start as string, end: end as string };
      }
      
      const metrics = await storage.getHealthMetrics(Number(userId), dateRange);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Error fetching health metrics", error: error.message });
    }
  });

  app.post("/api/health-metrics", async (req, res) => {
    try {
      const metric = await storage.addHealthMetric(req.body);
      res.json(metric);
    } catch (error) {
      res.status(400).json({ message: "Error adding health metric", error: error.message });
    }
  });

  app.patch("/api/health-metrics/:id", async (req, res) => {
    try {
      const metric = await storage.updateHealthMetric(Number(req.params.id), req.body);
      res.json(metric);
    } catch (error) {
      res.status(400).json({ message: "Error updating health metric", error: error.message });
    }
  });

  app.get("/api/health-metrics/latest/:userId", async (req, res) => {
    try {
      const metric = await storage.getLatestHealthMetric(Number(req.params.userId));
      res.json(metric);
    } catch (error) {
      res.status(500).json({ message: "Error fetching latest health metric", error: error.message });
    }
  });

  // Nutrition goals
  app.get("/api/nutrition-goals", async (req, res) => {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }
      const goals = await storage.getNutritionGoals(Number(userId));
      res.json(goals);
    } catch (error) {
      res.status(500).json({ message: "Error fetching nutrition goals", error: error.message });
    }
  });

  app.post("/api/nutrition-goals", async (req, res) => {
    try {
      const goals = await storage.setNutritionGoals(req.body);
      res.json(goals);
    } catch (error) {
      res.status(400).json({ message: "Error setting nutrition goals", error: error.message });
    }
  });

  app.patch("/api/nutrition-goals/:userId", async (req, res) => {
    try {
      const goals = await storage.updateNutritionGoals(Number(req.params.userId), req.body);
      res.json(goals);
    } catch (error) {
      res.status(400).json({ message: "Error updating nutrition goals", error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
