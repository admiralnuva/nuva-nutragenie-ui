# NutraGenie Hybrid Database Integration Guide

## Architecture Overview

This hybrid database design splits data across PostgreSQL (RDBMS) and MongoDB (NoSQL) for optimal performance and flexibility.

### Data Distribution Strategy

**PostgreSQL (RDBMS)** - Structured, transactional data:
- User accounts, authentication, and personal information
- Financial transactions and payment processing
- Nutrition tracking with daily entries and goals
- Basic recipe metadata and ratings
- Chat message logs for conversation history

**MongoDB (NoSQL)** - Flexible, document-based data:
- Full recipe content with detailed steps and ingredient information
- AI chef personalities and adaptive response patterns
- Complex user dietary profiles and preferences
- Detailed cooking session analytics and voice interaction logs
- User behavior patterns and recommendation algorithms

## Implementation Strategy

### 1. Database Connections

```javascript
// PostgreSQL connection (using Drizzle ORM)
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);
const postgresDb = drizzle(sql);

// MongoDB connection (using Mongoose)
import mongoose from 'mongoose';

const mongoDb = await mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

### 2. Cross-Database Referencing

**Pattern: Store references between databases**

```javascript
// PostgreSQL recipe record
const postgresRecipe = {
  id: 123,
  title: "Mediterranean Quinoa Bowl",
  category: "lunch",
  difficulty_level: "medium",
  mongodb_recipe_id: "507f1f77bcf86cd799439011" // Reference to MongoDB
};

// MongoDB recipe document
const mongoRecipe = {
  _id: ObjectId("507f1f77bcf86cd799439011"),
  postgresId: 123, // Reference back to PostgreSQL
  ingredients: [...],
  steps: [...],
  // Full detailed content
};
```

### 3. Service Layer Pattern

Create service classes that handle cross-database operations:

```javascript
class RecipeService {
  async getFullRecipe(recipeId) {
    // Get basic info from PostgreSQL
    const basicInfo = await postgresDb
      .select()
      .from(recipes)
      .where(eq(recipes.id, recipeId));
    
    // Get detailed content from MongoDB
    const detailedContent = await Recipe.findOne({
      postgresId: recipeId
    });
    
    return {
      ...basicInfo,
      ...detailedContent.toObject()
    };
  }
  
  async createRecipe(recipeData) {
    // Transaction-like behavior across databases
    try {
      // 1. Create MongoDB document first (detailed content)
      const mongoRecipe = await Recipe.create({
        title: recipeData.title,
        ingredients: recipeData.ingredients,
        steps: recipeData.steps,
        // ... detailed content
      });
      
      // 2. Create PostgreSQL record with reference
      const postgresRecipe = await postgresDb
        .insert(recipes)
        .values({
          title: recipeData.title,
          category: recipeData.category,
          mongodb_recipe_id: mongoRecipe._id.toString(),
          // ... basic metadata
        })
        .returning();
      
      // 3. Update MongoDB with PostgreSQL ID
      await Recipe.findByIdAndUpdate(mongoRecipe._id, {
        postgresId: postgresRecipe[0].id
      });
      
      return { postgresRecipe: postgresRecipe[0], mongoRecipe };
    } catch (error) {
      // Rollback logic needed
      throw new Error(`Recipe creation failed: ${error.message}`);
    }
  }
}
```

### 4. User Profile Management

```javascript
class UserProfileService {
  async createUserProfile(userData) {
    // Create user in PostgreSQL first
    const postgresUser = await postgresDb
      .insert(users)
      .values({
        email: userData.email,
        password_hash: userData.passwordHash,
        nickname: userData.nickname,
        // ... basic user data
      })
      .returning();
    
    // Create detailed profile in MongoDB
    const mongoProfile = await UserProfile.create({
      postgresUserId: postgresUser[0].id,
      dietaryProfile: userData.dietaryProfile,
      cookingProfile: userData.cookingProfile,
      // ... complex nested data
    });
    
    return { postgresUser: postgresUser[0], mongoProfile };
  }
  
  async getUserFullProfile(userId) {
    const [postgresUser, mongoProfile] = await Promise.all([
      postgresDb.select().from(users).where(eq(users.id, userId)),
      UserProfile.findOne({ postgresUserId: userId })
    ]);
    
    return {
      ...postgresUser[0],
      profile: mongoProfile
    };
  }
}
```

### 5. Cooking Session Analytics

```javascript
class CookingSessionService {
  async startCookingSession(userId, recipeId) {
    // Create basic session record in PostgreSQL
    const postgresSession = await postgresDb
      .insert(cookingSessions)
      .values({
        user_id: userId,
        recipe_id: recipeId,
        session_status: 'active',
        start_time: new Date(),
      })
      .returning();
    
    // Create detailed session in MongoDB
    const mongoSession = await CookingSession.create({
      postgresSessionId: postgresSession[0].id,
      userId: await this.getMongoUserId(userId),
      recipeId: await this.getMongoRecipeId(recipeId),
      sessionMetadata: {
        startTime: new Date(),
        cookingMode: 'voice',
        // ... detailed tracking
      },
      voiceInteractions: [],
      stepProgress: []
    });
    
    return { postgresSession: postgresSession[0], mongoSession };
  }
  
  async logVoiceInteraction(sessionId, interactionData) {
    // Update MongoDB with detailed interaction data
    await CookingSession.findOneAndUpdate(
      { postgresSessionId: sessionId },
      {
        $push: {
          voiceInteractions: interactionData
        }
      }
    );
    
    // Update PostgreSQL with summary stats if needed
    await postgresDb
      .update(cookingSessions)
      .set({ updated_at: new Date() })
      .where(eq(cookingSessions.id, sessionId));
  }
}
```

## Data Synchronization Strategies

### 1. Event-Driven Updates

```javascript
// Use events to keep data synchronized
const EventEmitter = require('events');
const dbEvents = new EventEmitter();

dbEvents.on('user.created', async (userData) => {
  // Trigger MongoDB profile creation
  await UserProfileService.createMongoProfile(userData);
});

dbEvents.on('recipe.rated', async (ratingData) => {
  // Update both PostgreSQL aggregates and MongoDB analytics
  await Promise.all([
    updatePostgresRating(ratingData),
    updateMongoAnalytics(ratingData)
  ]);
});
```

### 2. Consistency Checks

```javascript
class DataConsistencyService {
  async validateUserConsistency(userId) {
    const postgresUser = await postgresDb
      .select()
      .from(users)
      .where(eq(users.id, userId));
    
    const mongoProfile = await UserProfile.findOne({
      postgresUserId: userId
    });
    
    return {
      hasPostgresRecord: !!postgresUser.length,
      hasMongoProfile: !!mongoProfile,
      consistent: !!(postgresUser.length && mongoProfile)
    };
  }
  
  async repairInconsistency(userId) {
    const status = await this.validateUserConsistency(userId);
    
    if (status.hasPostgresRecord && !status.hasMongoProfile) {
      // Create missing MongoDB profile
      await UserProfileService.createDefaultMongoProfile(userId);
    }
    // Add other repair logic as needed
  }
}
```

## Performance Optimization

### 1. Smart Caching Strategy

```javascript
class CacheManager {
  constructor() {
    this.cache = new Map();
    this.TTL = 5 * 60 * 1000; // 5 minutes
  }
  
  async getRecipe(recipeId) {
    const cacheKey = `recipe:${recipeId}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < this.TTL) {
      return cached.data;
    }
    
    // Fetch from both databases
    const recipe = await RecipeService.getFullRecipe(recipeId);
    
    this.cache.set(cacheKey, {
      data: recipe,
      timestamp: Date.now()
    });
    
    return recipe;
  }
}
```

### 2. Query Optimization

```javascript
// Batch operations for efficiency
class BatchOperations {
  async batchUpdateNutritionEntries(entries) {
    // PostgreSQL batch insert
    await postgresDb.insert(nutritionEntries).values(entries);
    
    // MongoDB analytics update (aggregated)
    const userStats = this.aggregateNutritionStats(entries);
    await UserAnalytics.bulkWrite(userStats);
  }
  
  async getPopularRecipes(limit = 10) {
    // Use PostgreSQL for fast aggregation
    const popularIds = await postgresDb
      .select({
        recipeId: recipes.id,
        avgRating: avg(recipeRatings.rating),
        totalRatings: count(recipeRatings.id)
      })
      .from(recipes)
      .leftJoin(recipeRatings, eq(recipes.id, recipeRatings.recipeId))
      .groupBy(recipes.id)
      .orderBy(desc(avg(recipeRatings.rating)))
      .limit(limit);
    
    // Get full content from MongoDB
    const fullRecipes = await Recipe.find({
      postgresId: { $in: popularIds.map(r => r.recipeId) }
    });
    
    return fullRecipes;
  }
}
```

## Migration Strategy

### Phase 1: PostgreSQL First
1. Start with PostgreSQL for all current functionality
2. Ensure current app works with new schema
3. Add MongoDB connection infrastructure

### Phase 2: MongoDB Integration
1. Migrate recipe content to MongoDB
2. Create user profiles in MongoDB
3. Implement dual-write for new data

### Phase 3: Advanced Features
1. Enable voice interaction logging
2. Implement advanced analytics
3. Add AI personality customization

### Phase 4: Optimization
1. Add caching layer
2. Optimize cross-database queries
3. Implement monitoring and alerts

## Monitoring and Maintenance

```javascript
class DatabaseMonitoring {
  async checkHealth() {
    const checks = await Promise.allSettled([
      this.checkPostgreSQL(),
      this.checkMongoDB(),
      this.checkConsistency()
    ]);
    
    return {
      postgresql: checks[0].status === 'fulfilled',
      mongodb: checks[1].status === 'fulfilled',
      consistency: checks[2].status === 'fulfilled',
      timestamp: new Date()
    };
  }
  
  async generateReport() {
    return {
      userCount: await this.getTotalUsers(),
      recipeCount: await this.getTotalRecipes(),
      sessionCount: await this.getTotalSessions(),
      consistencyIssues: await this.findConsistencyIssues()
    };
  }
}
```

This hybrid approach gives you the best of both worlds: ACID compliance for critical data and flexibility for content and analytics. The key is maintaining clear boundaries and implementing proper synchronization patterns.