// MongoDB Schema Design for NutraGenie NoSQL Data
// Flexible, document-based data storage

// Collection: recipes
// Full recipe content with steps, ingredients, substitutions
const recipeSchema = {
  _id: ObjectId(),
  postgresId: 123, // Reference to PostgreSQL recipes table
  title: "Mediterranean Quinoa Bowl",
  description: "A nutritious and flavorful quinoa bowl with fresh vegetables and herbs",
  
  // Detailed ingredients with substitutions and nutrition
  ingredients: [
    {
      name: "quinoa",
      amount: 1,
      unit: "cup",
      category: "grain",
      isOptional: false,
      nutritionPer100g: {
        calories: 368,
        protein: 14.1,
        carbs: 64.2,
        fat: 6.1,
        fiber: 7.0
      },
      substitutions: [
        {
          name: "brown rice",
          ratio: 1.0,
          note: "Similar texture, slightly different flavor"
        },
        {
          name: "bulgur wheat",
          ratio: 0.8,
          note: "Chewier texture, contains gluten"
        }
      ],
      seasonality: ["year-round"],
      storageInstructions: "Store in airtight container, cool dry place",
      preparationTips: ["Rinse thoroughly before cooking", "Toast for nuttier flavor"]
    }
  ],
  
  // Detailed cooking steps with multimedia support
  steps: [
    {
      stepNumber: 1,
      title: "Prepare the quinoa",
      instruction: "Rinse quinoa thoroughly under cold water until water runs clear. In a medium saucepan, combine quinoa with 2 cups water and bring to a boil.",
      duration: "2 minutes",
      difficulty: "easy",
      tips: [
        "Rinsing removes the bitter saponin coating",
        "A fine-mesh strainer works best for rinsing"
      ],
      warningMessages: [
        "Don't skip rinsing - it affects taste significantly"
      ],
      techniques: ["rinsing", "boiling"],
      equipment: ["medium saucepan", "fine-mesh strainer"],
      visualCues: ["water runs clear when rinsing", "vigorous boiling"],
      // Audio instructions removed
      videoReference: "quinoa-prep-basic.mp4",
      imageReference: "quinoa-rinsing-clear-water.jpg",
      temperatureGuidance: {
        target: 100, // Celsius
        type: "boiling"
      },
      commonMistakes: [
        {
          mistake: "Not rinsing thoroughly",
          consequence: "Bitter taste",
          solution: "Rinse until water is completely clear"
        }
      ]
    }
  ],
  
  // Nutritional information and dietary considerations
  nutrition: {
    perServing: {
      calories: 385,
      protein: 12.5,
      carbs: 48.2,
      fat: 8.7,
      fiber: 6.8,
      sugar: 5.2,
      sodium: 285,
      cholesterol: 0,
      saturatedFat: 1.2,
      vitamins: {
        vitaminA: 850, // IU
        vitaminC: 35,  // mg
        vitaminE: 2.1, // mg
        folate: 78     // mcg
      },
      minerals: {
        iron: 2.8,     // mg
        calcium: 125,  // mg
        magnesium: 89, // mg
        potassium: 452 // mg
      }
    },
    dailyValuePercentages: {
      calories: 19,
      protein: 25,
      fiber: 27,
      iron: 16
    },
    allergens: [],
    dietaryCompatibility: {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      dairyFree: true,
      keto: false,
      paleo: false,
      lowCarb: false,
      lowFat: true,
      highProtein: true
    }
  },
  
  // Recipe variations and modifications
  variations: [
    {
      name: "Protein-Packed Version",
      modifications: [
        {
          type: "add",
          ingredient: "grilled chicken breast",
          amount: 150,
          unit: "g"
        }
      ],
      nutritionDelta: {
        calories: +185,
        protein: +35.2
      }
    }
  ],
  
  // Chef-specific guidance and personality
  chefNotes: {
    difficulty: "beginner-friendly",
    cookingStyle: "Mediterranean",
    keyTechniques: ["grain cooking", "fresh herb usage"],
    timeManagement: "Prep vegetables while quinoa cooks",
    presentationTips: "Arrange colorfully for visual appeal",
    flavorProfile: "Fresh, herbaceous, nutty"
  },
  
  createdAt: new Date(),
  updatedAt: new Date(),
  version: 1
};

// Collection: chefPersonalities
// AI chef personalities, responses, and conversation patterns
const chefPersonalitySchema = {
  _id: ObjectId(),
  name: "Chef Antoine",
  personality: "energetic",
  description: "An enthusiastic French chef who loves to encourage and motivate",
  
  // Voice and communication style
  voiceCharacteristics: {
    tone: "encouraging",
    pace: "moderate",
    accent: "slight French",
    volume: "warm and inviting",
    emotionalRange: ["excited", "supportive", "patient", "celebratory"]
  },
  
  // Response patterns for different scenarios
  responsePatterns: {
    greetings: [
      "Bonjour, mon ami! Ready to create something magnifique?",
      "Ah, welcome to the kitchen! Let's cook something wonderful together!",
      "Hello there, chef! What delicious adventure shall we embark on today?"
    ],
    encouragement: [
      "You're doing fantastique! Keep going!",
      "Très bien! I can see you're getting the hang of this!",
      "Magnifique technique! You're a natural!"
    ],
    corrections: [
      "No worries, let me help you with that. Cooking is all about learning!",
      "Ah, let's try a different approach. This happens to everyone!",
      "Perfect opportunity to learn something new! Here's what I recommend..."
    ],
    stepCompletions: [
      "Excellent work! Ready for the next step?",
      "Bravo! You've mastered that technique!",
      "Wonderful! I can smell the delicious aromas from here!"
    ],
    questions: {
      timing: [
        "Trust your senses! When it looks golden and smells amazing, it's ready.",
        "Great question! Look for these visual cues...",
        "Timing varies, but here's what to watch for..."
      ],
      techniques: [
        "Ah, excellent technique question! Let me show you...",
        "This is a classic technique. Here's the secret...",
        "I love teaching this! The key is..."
      ],
      ingredients: [
        "Wonderful ingredient choice! Here's how to make it shine...",
        "That ingredient has such beautiful flavors. Let's enhance them...",
        "Ah, one of my favorites! Here's a chef's secret..."
      ]
    }
  },
  
  // Context-aware responses based on cooking stage
  contextualGuidance: {
    preparation: {
      focus: "organization and mise en place",
      encouragement: "slow and steady wins the race",
      tips: "prep everything before you start cooking"
    },
    cooking: {
      focus: "technique and timing",
      encouragement: "trust your instincts",
      tips: "taste as you go"
    },
    finishing: {
      focus: "plating and presentation",
      encouragement: "you've almost created something beautiful",
      tips: "presentation is the final love letter to your dish"
    }
  },
  
  // Learning adaptation patterns
  adaptiveBehavior: {
    beginnerFriendly: {
      explanationDepth: "detailed",
      patience: "high",
      repetition: "frequent",
      validation: "constant"
    },
    experiencedCook: {
      explanationDepth: "concise",
      patience: "moderate",
      repetition: "minimal",
      validation: "achievement-focused"
    }
  },
  
  createdAt: new Date(),
  updatedAt: new Date()
};

// Collection: userProfiles
// Complex nested dietary restrictions, preferences, and behavior
const userProfileSchema = {
  _id: ObjectId(),
  postgresUserId: 123, // Reference to PostgreSQL users table
  
  // Comprehensive dietary profile
  dietaryProfile: {
    restrictions: {
      allergies: [
        {
          allergen: "tree nuts",
          severity: "severe",
          symptoms: ["anaphylaxis"],
          avoidanceList: ["almonds", "walnuts", "pecans", "cashews"],
          crossContamination: true
        }
      ],
      medicalRestrictions: [
        {
          condition: "diabetes_type2",
          restrictions: ["high glycemic foods"],
          guidelines: ["limit refined sugars", "focus on complex carbs"],
          monitoringRequired: ["blood sugar levels"]
        }
      ],
      lifestyle: {
        primary: "vegetarian",
        secondary: ["organic_preferred", "local_sourced"],
        flexibility: "strict",
        cheatDayFrequency: "never"
      },
      culturalPreferences: {
        cuisine: ["mediterranean", "indian"],
        avoidedCuisines: ["heavily processed"],
        spiceLevel: "medium"
      }
    },
    
    preferences: {
      favoriteFlavors: ["garlic", "herbs", "citrus"],
      dislikedFlavors: ["bitter", "overly sweet"],
      texturePreferences: ["crunchy", "creamy"],
      dislikedTextures: ["slimy", "mushy"],
      cookingMethods: {
        preferred: ["grilling", "roasting", "steaming"],
        avoided: ["deep frying"]
      }
    },
    
    // Nutritional goals and tracking preferences
    nutritionalGoals: {
      macroTargets: {
        proteinPercent: 25,
        carbPercent: 45,
        fatPercent: 30
      },
      micronutrientFocus: ["iron", "vitamin_b12", "omega3"],
      calorieDistribution: {
        breakfast: 25,
        lunch: 35,
        dinner: 30,
        snacks: 10
      },
      mealTimingPreferences: {
        breakfast: "7:00-8:00",
        lunch: "12:00-13:00",
        dinner: "18:00-19:00"
      }
    }
  },
  
  // Cooking behavior and skill profile
  cookingProfile: {
    skillLevel: "intermediate",
    confidenceAreas: ["vegetable prep", "pasta dishes"],
    learningAreas: ["meat cooking", "baking"],
    preferredCookingTime: "30-45 minutes",
    kitchenEquipment: {
      available: ["food processor", "stand mixer", "cast iron"],
      missing: ["sous vide", "pressure cooker"],
      preferred: ["cast iron skillet"]
    },
    cookingFrequency: "daily",
    mealPrepPreference: "batch cooking on weekends"
  },
  
  // AI interaction preferences
  aiInteractionProfile: {
    preferredChefPersonality: "energetic",
    communicationStyle: "detailed explanations",
    feedbackFrequency: "frequent",
    learningPace: "moderate",
    reminderPreferences: {
      stepByStep: true,
      timing: true,
      techniques: true
    }
  },
  
  createdAt: new Date(),
  updatedAt: new Date()
};

// Collection: cookingSessions
// Detailed cooking session data and voice interaction logs
const cookingSessionSchema = {
  _id: ObjectId(),
  postgresSessionId: 123, // Reference to PostgreSQL cooking_sessions table
  userId: ObjectId("user_profile_id"),
  recipeId: ObjectId("recipe_id"),
  
  // Session details
  sessionMetadata: {
    startTime: new Date(),
    endTime: new Date(),
    totalDuration: 2340, // seconds
    cookingMode: "voice",
    deviceUsed: "smartphone",
    kitchenConditions: {
      lighting: "good",
      noise_level: "quiet",
      multitasking: false
    }
  },
  
  // Voice interaction tracking
  voiceInteractions: [
    {
      timestamp: new Date(),
      type: "user_question",
      // Audio file reference removed
      transcript: "How do I know when the onions are ready?",
      confidence: 0.94,
      intent: "timing_question",
      context: {
        currentStep: 3,
        ingredient: "onions",
        cookingMethod: "sautéing"
      },
      aiResponse: {
        text: "Great question! Look for the onions to become translucent and golden around the edges. They should smell sweet and aromatic, not sharp.",
        confidence: 0.98,
        responseTime: 847, // milliseconds
        personalityUsed: "energetic",
        adaptations: ["beginner_friendly", "visual_cues"]
      }
    }
  ],
  
  // Step-by-step progress tracking
  stepProgress: [
    {
      stepNumber: 1,
      startTime: new Date(),
      endTime: new Date(),
      duration: 180, // seconds
      completed: true,
      difficulty_experienced: 2, // 1-5 scale
      helpRequested: false,
      mistakes: [],
      adaptations: ["extra_time_taken"]
    }
  ],
  
  // User behavior analytics
  behaviorData: {
    pauseFrequency: 3,
    averagePauseLength: 45, // seconds
    helpRequestCount: 2,
    mostCommonQuestions: ["timing", "technique"],
    confidenceIndicators: {
      voiceAssurance: "moderate",
      stepCompletionSpeed: "average",
      questionTypes: ["clarification", "confirmation"]
    }
  },
  
  // Session outcome and feedback
  sessionOutcome: {
    completed: true,
    satisfactionRating: 4, // 1-5
    dishQualityRating: 4, // 1-5
    difficultyExperienced: 3, // 1-5
    wouldCookAgain: true,
    improvements: ["more prep time", "better knife skills"],
    highlights: ["loved the voice guidance", "perfect timing alerts"]
  },
  
  createdAt: new Date(),
  updatedAt: new Date()
};

// Collection: userAnalytics
// Comprehensive user behavior, patterns, and recommendation data
const userAnalyticsSchema = {
  _id: ObjectId(),
  userId: ObjectId("user_profile_id"),
  
  // Cooking patterns and trends
  cookingPatterns: {
    preferredCookingDays: ["saturday", "sunday"],
    preferredCookingTimes: ["18:00-20:00"],
    sessionDurations: {
      average: 1800, // seconds
      shortest: 900,
      longest: 3600
    },
    recipeDifficulty: {
      attempted: ["easy", "medium"],
      successful: ["easy", "medium"],
      preferred: "medium"
    },
    cuisineExploration: {
      mostCookedCuisines: ["mediterranean", "italian"],
      newCuisinesTried: ["thai", "mexican"],
      willingnessToExplore: "high"
    }
  },
  
  // Feature usage analytics
  featureUsage: {
    voiceCooking: {
      frequency: "always",
      satisfactionRating: 4.8,
      mostUsedFeatures: ["step_guidance", "timing_alerts"]
    },
    recipeGeneration: {
      frequency: "weekly",
      successRate: 0.85,
      preferredIngredientCount: "8-12"
    },
    nutritionTracking: {
      frequency: "daily",
      completionRate: 0.92,
      focusAreas: ["protein", "calories"]
    }
  },
  
  // Recommendation data
  recommendationProfile: {
    successfulRecommendations: [
      {
        recipeId: ObjectId("recipe_id"),
        recommendationReason: "similar_ingredients",
        userResponse: "loved_it",
        cookingResult: "successful"
      }
    ],
    recommendationPreferences: {
      novelty: "moderate", // prefers some new things, but not too adventurous
      similarity: "high", // likes recipes similar to past successes
      complexity: "moderate",
      time_constraints: "weekday_quick_weekend_elaborate"
    }
  },
  
  // Learning progression
  skillProgression: {
    techniques_mastered: ["knife_skills_basic", "pasta_cooking", "vegetable_roasting"],
    techniques_learning: ["bread_making", "sauce_preparation"],
    techniques_to_learn: ["meat_cooking", "advanced_baking"],
    progressionRate: "steady",
    confidenceGrowth: [
      {
        skill: "knife_skills",
        startLevel: 2,
        currentLevel: 4,
        timeToImprove: 45 // days
      }
    ]
  },
  
  // Social and sharing behavior
  socialBehavior: {
    sharesRecipes: true,
    shareFrequency: "weekly",
    preferredPlatforms: ["instagram", "family_chat"],
    reviewsWritten: 23,
    averageReviewLength: 150, // characters
    helpfulnessRating: 4.2
  },
  
  lastUpdated: new Date(),
  dataVersion: 1
};

// MongoDB Indexes for Performance
/*
// Recipe collection indexes
db.recipes.createIndex({ "postgresId": 1 })
db.recipes.createIndex({ "nutrition.dietaryCompatibility.vegetarian": 1, "nutrition.dietaryCompatibility.vegan": 1 })
db.recipes.createIndex({ "ingredients.name": "text", "title": "text", "description": "text" })
db.recipes.createIndex({ "chefNotes.difficulty": 1, "nutrition.perServing.calories": 1 })

// User profiles indexes  
db.userProfiles.createIndex({ "postgresUserId": 1 }, { unique: true })
db.userProfiles.createIndex({ "dietaryProfile.restrictions.allergies.allergen": 1 })
db.userProfiles.createIndex({ "cookingProfile.skillLevel": 1 })

// Cooking sessions indexes
db.cookingSessions.createIndex({ "postgresSessionId": 1 })
db.cookingSessions.createIndex({ "userId": 1, "sessionMetadata.startTime": -1 })
db.cookingSessions.createIndex({ "recipeId": 1 })

// Analytics indexes
db.userAnalytics.createIndex({ "userId": 1 }, { unique: true })
db.userAnalytics.createIndex({ "cookingPatterns.preferredCookingDays": 1 })
*/

// Export schemas for application use
module.exports = {
  recipeSchema,
  chefPersonalitySchema,
  userProfileSchema,
  cookingSessionSchema,
  userAnalyticsSchema
};