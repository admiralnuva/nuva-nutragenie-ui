import React, { useState } from "react";
import { BackButton } from "@/components/ui/back-button";
import { Card } from "@/components/ui/card";
import { DishCard } from "@/components/ui/dish-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronUp, Calendar, ChefHat, Truck, ShoppingBag, BookOpen } from "lucide-react";

export default function ExploreRecipeOptionsScreen() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChefRecommendsCollapsed, setIsChefRecommendsCollapsed] = useState(false);
  const [isPantryDishesCollapsed, setIsPantryDishesCollapsed] = useState(false);
  const [isCreateDishesCollapsed, setIsCreateDishesCollapsed] = useState(false);
  const [isTakeOutCollapsed, setIsTakeOutCollapsed] = useState(false);
  
  // Preferences state
  const [selectedPreferenceTab, setSelectedPreferenceTab] = useState<string>("diet");
  
  // Meal preferences state
  const [mealServingSize, setMealServingSize] = useState("2 people");
  const [mealCuisine, setMealCuisine] = useState("American");
  const [mealType, setMealType] = useState("Dinner");
  const [mealSpiceLevel, setMealSpiceLevel] = useState("😊 Mild");
  const [mealSkillLevel, setMealSkillLevel] = useState("🔰 Beginner");
  const [mealCookMethod, setMealCookMethod] = useState("🔥 Oven");
  const [mealPrepTime, setMealPrepTime] = useState("⏱️ 30 minutes");
  const [mealPreferencesConfirmed, setMealPreferencesConfirmed] = useState(false);
  
  // Create Dishes form state
  const [dishName, setDishName] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [createMealType, setCreateMealType] = useState("");
  const [cookMethod, setCookMethod] = useState("");
  const [generatedDishes, setGeneratedDishes] = useState<any[]>([]);
  
  // Take-Out form state
  const [takeOutServingSize, setTakeOutServingSize] = useState("");
  const [takeOutCuisine, setTakeOutCuisine] = useState("");
  const [takeOutMealType, setTakeOutMealType] = useState("");
  const [takeOutSpiceLevel, setTakeOutSpiceLevel] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [takeOutDishes, setTakeOutDishes] = useState<any[]>([]);
  
  // History selection state
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    // Reset collapse states when switching options
    setIsChefRecommendsCollapsed(false);
    setIsPantryDishesCollapsed(false);
    setIsCreateDishesCollapsed(false);
    setIsTakeOutCollapsed(false);
  };

  const handleCreateDishes = () => {
    // Generate 6 chicken curry variations with authentic images
    const baseDish = dishName || "Chicken Curry";
    const variations = [
      {
        id: 1,
        name: "Classic Indian Style",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
        calories: 420,
        protein: "28g",
        cookTime: "45 min",
        difficulty: "Medium"
      },
      {
        id: 2,
        name: "Spicy Vindaloo Style",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
        calories: 450,
        protein: "30g",
        cookTime: "50 min",
        difficulty: "Medium"
      },
      {
        id: 3,
        name: "Coconut Curry",
        image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop",
        calories: 380,
        protein: "26g",
        cookTime: "35 min",
        difficulty: "Easy"
      },
      {
        id: 4,
        name: "Butter Chicken Style",
        image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop",
        calories: 520,
        protein: "32g",
        cookTime: "40 min",
        difficulty: "Medium"
      },
      {
        id: 5,
        name: "Thai Green Curry",
        image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
        calories: 350,
        protein: "24g",
        cookTime: "25 min",
        difficulty: "Easy"
      },
      {
        id: 6,
        name: "Japanese Curry",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
        calories: 400,
        protein: "25g",
        cookTime: "30 min",
        difficulty: "Easy"
      }
    ];
    setGeneratedDishes(variations);
    // Automatically collapse the input form after generating dishes
    setIsCreateDishesCollapsed(true);
  };

  const handleDesignTakeOutMenu = () => {
    // Generate 12 take-out dishes
    const takeOutVariations = [
      {
        id: 1,
        name: "Grilled Salmon Teriyaki",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
        calories: 420,
        protein: "35g",
        cookTime: "25 min",
        difficulty: "Medium"
      },
      {
        id: 2,
        name: "Chicken Tikka Masala",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
        calories: 480,
        protein: "32g",
        cookTime: "30 min",
        difficulty: "Medium"
      },
      {
        id: 3,
        name: "Beef Stir Fry",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
        calories: 450,
        protein: "28g",
        cookTime: "20 min",
        difficulty: "Easy"
      },
      {
        id: 4,
        name: "Mediterranean Bowl",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
        calories: 380,
        protein: "25g",
        cookTime: "15 min",
        difficulty: "Easy"
      },
      {
        id: 5,
        name: "Thai Green Curry",
        image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
        calories: 400,
        protein: "24g",
        cookTime: "25 min",
        difficulty: "Medium"
      },
      {
        id: 6,
        name: "Pasta Carbonara",
        image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400&h=300&fit=crop",
        calories: 520,
        protein: "22g",
        cookTime: "18 min",
        difficulty: "Easy"
      },
      {
        id: 7,
        name: "Korean BBQ Bowl",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
        calories: 460,
        protein: "30g",
        cookTime: "22 min",
        difficulty: "Medium"
      },
      {
        id: 8,
        name: "Margherita Pizza",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop",
        calories: 380,
        protein: "18g",
        cookTime: "12 min",
        difficulty: "Easy"
      },
      {
        id: 9,
        name: "Fish Tacos",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
        calories: 350,
        protein: "26g",
        cookTime: "15 min",
        difficulty: "Easy"
      },
      {
        id: 10,
        name: "Quinoa Buddha Bowl",
        image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop",
        calories: 320,
        protein: "16g",
        cookTime: "12 min",
        difficulty: "Easy"
      },
      {
        id: 11,
        name: "Lamb Curry",
        image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop",
        calories: 510,
        protein: "34g",
        cookTime: "45 min",
        difficulty: "Hard"
      },
      {
        id: 12,
        name: "Veggie Burger",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop",
        calories: 380,
        protein: "20g",
        cookTime: "15 min",
        difficulty: "Easy"
      }
    ];
    setTakeOutDishes(takeOutVariations);
    // Automatically collapse the input form after designing menu
    setIsTakeOutCollapsed(true);
  };

  const chefRecommendedDishes = [
    {
      id: 1,
      name: "Grilled Salmon with Quinoa",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
      calories: 450,
      protein: "35g",
      cookTime: "25 min",
      difficulty: "Medium"
    },
    {
      id: 2,
      name: "Mediterranean Chicken Bowl",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      calories: 380,
      protein: "28g",
      cookTime: "20 min",
      difficulty: "Easy"
    },
    {
      id: 3,
      name: "Vegetable Stir-Fry",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
      calories: 320,
      protein: "12g",
      cookTime: "15 min",
      difficulty: "Easy"
    },
    {
      id: 4,
      name: "Beef and Broccoli",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
      calories: 420,
      protein: "32g",
      cookTime: "30 min",
      difficulty: "Medium"
    },
    {
      id: 5,
      name: "Lemon Herb Pasta",
      image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400&h=300&fit=crop",
      calories: 480,
      protein: "18g",
      cookTime: "18 min",
      difficulty: "Easy"
    },
    {
      id: 6,
      name: "Mediterranean Pasta",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop",
      calories: 520,
      protein: "22g",
      cookTime: "22 min",
      difficulty: "Medium"
    }
  ];

  const pantryDishes = [
    {
      id: 1,
      name: "Garlic Fried Rice",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
      calories: 340,
      protein: "8g",
      cookTime: "15 min",
      difficulty: "Easy"
    },
    {
      id: 2,
      name: "Scrambled Eggs & Toast",
      image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop",
      calories: 280,
      protein: "15g",
      cookTime: "10 min",
      difficulty: "Easy"
    },
    {
      id: 3,
      name: "Vegetable Soup",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop",
      calories: 180,
      protein: "6g",
      cookTime: "25 min",
      difficulty: "Easy"
    },
    {
      id: 4,
      name: "Butter Garlic Pasta",
      image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400&h=300&fit=crop",
      calories: 420,
      protein: "12g",
      cookTime: "12 min",
      difficulty: "Easy"
    },
    {
      id: 5,
      name: "Grilled Cheese Sandwich",
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop",
      calories: 380,
      protein: "18g",
      cookTime: "8 min",
      difficulty: "Easy"
    },
    {
      id: 6,
      name: "Mixed Vegetable Stir-Fry",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
      calories: 220,
      protein: "8g",
      cookTime: "12 min",
      difficulty: "Easy"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <BackButton to="/dietary" />
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
            <p className="text-lg font-semibold text-purple-600 mt-1">Explore Recipe Options</p>
          </div>
          <div className="w-8" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Card 1 - Preferences */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white">Personalize Diet & Pantry</h2>
          </div>
          
          {/* Tab Buttons */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setSelectedPreferenceTab("diet")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPreferenceTab === "diet"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Diet
            </button>
            <button
              onClick={() => setSelectedPreferenceTab("meal")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPreferenceTab === "meal"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Meal
            </button>
            <button
              onClick={() => setSelectedPreferenceTab("pantry")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPreferenceTab === "pantry"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Pantry
            </button>
          </div>

          {/* Diet Tab Content */}
          {selectedPreferenceTab === "diet" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-yellow-300">Dietary Preferences</h3>
              
              {/* Dietary Restrictions */}
              <div>
                <h4 className="text-sm font-bold text-yellow-300 mb-2">Dietary Restrictions:</h4>
                <p className="text-gray-300 text-sm">vegetarian, vegan, gluten-free, dairy-free, low-carb</p>
              </div>
              
              <hr className="border-gray-600" />
              
              {/* Health Factors */}
              <div>
                <h4 className="text-sm font-bold text-yellow-300 mb-2">Health Factors:</h4>
                <p className="text-gray-300 text-sm">diabetes, cardiovascular, kidney, blood-pressure, cancer</p>
              </div>
              
              <hr className="border-gray-600" />
              
              {/* Fitness Goals */}
              <div>
                <h4 className="text-sm font-bold text-yellow-300 mb-2">Fitness Goals:</h4>
                <p className="text-gray-300 text-sm">build muscle, lose weight, endurance, wellness</p>
              </div>
              
              <hr className="border-gray-600" />
              
              {/* Allergies/Restrictions */}
              <div>
                <h4 className="text-sm font-bold text-yellow-300 mb-2">Allergies/Restrictions:</h4>
                <p className="text-gray-300 text-sm">None specified</p>
              </div>
              
              <hr className="border-gray-600" />
              
              {/* Nutritional Goals */}
              <div>
                <h4 className="text-sm font-bold text-yellow-300 mb-2">Nutritional Goals:</h4>
                <p className="text-gray-300 text-sm">
                  Cal: 1301-1500, Protein: 71-100g<br />
                  Carbs: 101-150g, Fat: 36-50g
                </p>
              </div>
            </div>
          )}
          
          {/* Meal Tab Content */}
          {selectedPreferenceTab === "meal" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Serving Size */}
                <div>
                  <Label htmlFor="serving-size" className="text-yellow-300 font-bold text-sm mb-2 block">Serving Size *</Label>
                  <Select value={mealServingSize} onValueChange={setMealServingSize}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select serving size" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="1 person">1 person</SelectItem>
                      <SelectItem value="2 people">2 people</SelectItem>
                      <SelectItem value="4 people">4 people</SelectItem>
                      <SelectItem value="6 people">6 people</SelectItem>
                      <SelectItem value="8 people">8 people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Cuisine */}
                <div>
                  <Label htmlFor="cuisine" className="text-yellow-300 font-bold text-sm mb-2 block">Cuisine *</Label>
                  <Select value={mealCuisine} onValueChange={setMealCuisine}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select cuisine" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="American">American</SelectItem>
                      <SelectItem value="Italian">Italian</SelectItem>
                      <SelectItem value="Mexican">Mexican</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                      <SelectItem value="Indian">Indian</SelectItem>
                      <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                      <SelectItem value="Thai">Thai</SelectItem>
                      <SelectItem value="Japanese">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Meal Type */}
                <div>
                  <Label htmlFor="meal-type" className="text-yellow-300 font-bold text-sm mb-2 block">Meal Type *</Label>
                  <Select value={mealType} onValueChange={setMealType}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="Breakfast">Breakfast</SelectItem>
                      <SelectItem value="Lunch">Lunch</SelectItem>
                      <SelectItem value="Dinner">Dinner</SelectItem>
                      <SelectItem value="Snack">Snack</SelectItem>
                      <SelectItem value="Dessert">Dessert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Spice Level */}
                <div>
                  <Label htmlFor="spice-level" className="text-yellow-300 font-bold text-sm mb-2 block">Spice Level</Label>
                  <Select value={mealSpiceLevel} onValueChange={setMealSpiceLevel}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select spice level" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="😊 Mild">😊 Mild</SelectItem>
                      <SelectItem value="🌶️ Medium">🌶️ Medium</SelectItem>
                      <SelectItem value="🔥 Hot">🔥 Hot</SelectItem>
                      <SelectItem value="🌋 Very Hot">🌋 Very Hot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Skill Level */}
                <div>
                  <Label htmlFor="skill-level" className="text-yellow-300 font-bold text-sm mb-2 block">Skill Level</Label>
                  <Select value={mealSkillLevel} onValueChange={setMealSkillLevel}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select skill level" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="🔰 Beginner">🔰 Beginner</SelectItem>
                      <SelectItem value="👨‍🍳 Intermediate">👨‍🍳 Intermediate</SelectItem>
                      <SelectItem value="⭐ Advanced">⭐ Advanced</SelectItem>
                      <SelectItem value="👑 Expert">👑 Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Cook Method */}
                <div>
                  <Label htmlFor="cook-method" className="text-yellow-300 font-bold text-sm mb-2 block">Cook Method</Label>
                  <Select value={mealCookMethod} onValueChange={setMealCookMethod}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select cook method" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="🔥 Oven">🔥 Oven</SelectItem>
                      <SelectItem value="🍳 Stovetop">🍳 Stovetop</SelectItem>
                      <SelectItem value="🥘 Slow Cooker">🥘 Slow Cooker</SelectItem>
                      <SelectItem value="⚡ Microwave">⚡ Microwave</SelectItem>
                      <SelectItem value="🔥 Grill">🔥 Grill</SelectItem>
                      <SelectItem value="🍎 No Cook">🍎 No Cook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Prep Time - Full Width */}
              <div>
                <Label htmlFor="prep-time" className="text-yellow-300 font-bold text-sm mb-2 block">Prep Time</Label>
                <Select value={mealPrepTime} onValueChange={setMealPrepTime}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select prep time" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="⏱️ 15 minutes">⏱️ 15 minutes</SelectItem>
                    <SelectItem value="⏱️ 30 minutes">⏱️ 30 minutes</SelectItem>
                    <SelectItem value="⏱️ 45 minutes">⏱️ 45 minutes</SelectItem>
                    <SelectItem value="⏱️ 1 hour">⏱️ 1 hour</SelectItem>
                    <SelectItem value="⏱️ 1.5 hours">⏱️ 1.5 hours</SelectItem>
                    <SelectItem value="⏱️ 2+ hours">⏱️ 2+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Confirmation Checkbox */}
              <div 
                className="flex items-center space-x-4 mt-6 cursor-pointer" 
                onClick={() => setMealPreferencesConfirmed(!mealPreferencesConfirmed)}
              >
                <div
                  className={`w-8 h-8 min-w-8 min-h-8 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                    mealPreferencesConfirmed 
                      ? "bg-purple-600 border-purple-600" 
                      : "border-gray-400 hover:border-purple-400"
                  }`}
                >
                  {mealPreferencesConfirmed && (
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-white text-base select-text">I confirm these meal preferences are correct</span>
              </div>
            </div>
          )}
          
          {/* Pantry Tab Content */}
          {selectedPreferenceTab === "pantry" && (
            <div className="text-center py-8">
              <p className="text-gray-300">Pantry preferences will be displayed here</p>
            </div>
          )}
        </Card>

        {/* Card 2 - Recipe Options */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recipe Options</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleOptionClick("chefs-choice")}
              className={`p-4 rounded-lg border text-center transition-colors ${
                selectedOption === "chefs-choice"
                  ? "bg-purple-600 text-white border-purple-500"
                  : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
              }`}
            >
              Chef's Choice
            </button>
            <button
              onClick={() => handleOptionClick("pantry-dishes")}
              className={`p-4 rounded-lg border text-center transition-colors ${
                selectedOption === "pantry-dishes"
                  ? "bg-purple-600 text-white border-purple-500"
                  : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
              }`}
            >
              Pantry Dishes
            </button>
            <button
              onClick={() => handleOptionClick("create-dishes")}
              className={`p-4 rounded-lg border text-center transition-colors ${
                selectedOption === "create-dishes"
                  ? "bg-purple-600 text-white border-purple-500"
                  : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
              }`}
            >
              Create Dishes
            </button>
            <button
              onClick={() => handleOptionClick("take-out")}
              className={`p-4 rounded-lg border text-center transition-colors ${
                selectedOption === "take-out"
                  ? "bg-purple-600 text-white border-purple-500"
                  : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
              }`}
            >
              Take-Out
            </button>
          </div>
        </Card>

        {/* Chef Recommends Card - shown when Chef's Choice is selected and not collapsed */}
        {selectedOption === "chefs-choice" && !isChefRecommendsCollapsed && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Chef Recommends</h2>
              <button 
                onClick={() => setIsChefRecommendsCollapsed(true)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ChevronUp size={24} />
              </button>
            </div>
            <div className="space-y-4">
              {chefRecommendedDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </Card>
        )}

        {/* Pantry Dishes Card - shown when Pantry Dishes is selected and not collapsed */}
        {selectedOption === "pantry-dishes" && !isPantryDishesCollapsed && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Dishes from Pantry Ingredients</h2>
              <button 
                onClick={() => setIsPantryDishesCollapsed(true)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ChevronUp size={24} />
              </button>
            </div>
            <div className="space-y-4">
              {pantryDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </Card>
        )}

        {/* Create Dishes Input Card - shown when Create Dishes is selected and not collapsed */}
        {selectedOption === "create-dishes" && !isCreateDishesCollapsed && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-yellow-300">Tell us what you're craving</h2>
              <button 
                onClick={() => setIsCreateDishesCollapsed(true)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ChevronUp size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Dish Name */}
              <div>
                <Label htmlFor="dishName" className="text-yellow-300 font-bold text-sm mb-2 block">Dish Name</Label>
                <Input
                  id="dishName"
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  placeholder="Chicken Curry"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              {/* Row 1: Serving Size & Cuisine */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="servingSize" className="text-yellow-300 font-bold text-sm mb-2 block">Serving Size</Label>
                  <Select value={servingSize} onValueChange={setServingSize}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="2 people" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="1">1 person</SelectItem>
                      <SelectItem value="2">2 people</SelectItem>
                      <SelectItem value="4">4 people</SelectItem>
                      <SelectItem value="6">6 people</SelectItem>
                      <SelectItem value="8">8 people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cuisine" className="text-yellow-300 font-bold text-sm mb-2 block">Cuisine</Label>
                  <Select value={cuisine} onValueChange={setCuisine}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Indian" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="indian">Indian</SelectItem>
                      <SelectItem value="italian">Italian</SelectItem>
                      <SelectItem value="mexican">Mexican</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                      <SelectItem value="american">American</SelectItem>
                      <SelectItem value="mediterranean">Mediterranean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 2: Meal Type & Cook Method */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="createMealType" className="text-yellow-300 font-bold text-sm mb-2 block">Meal Type</Label>
                  <Select value={createMealType} onValueChange={setCreateMealType}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Dinner" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                      <SelectItem value="snack">Snack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cookMethod" className="text-yellow-300 font-bold text-sm mb-2 block">Cook Method</Label>
                  <Select value={cookMethod} onValueChange={setCookMethod}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="stovetop">Stovetop</SelectItem>
                      <SelectItem value="oven">Oven</SelectItem>
                      <SelectItem value="grill">Grill</SelectItem>
                      <SelectItem value="slow-cooker">Slow Cooker</SelectItem>
                      <SelectItem value="instant-pot">Instant Pot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Generate Button */}
              <Button 
                onClick={handleCreateDishes}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 text-lg mt-6 select-text"
              >
                Generate Variations
              </Button>
            </div>
          </Card>
        )}

        {/* Create Dishes Results Card - shown when dishes are generated */}
        {selectedOption === "create-dishes" && generatedDishes.length > 0 && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Your Custom {dishName || "Chicken Curry"} Collection</h2>
              <button 
                onClick={() => setGeneratedDishes([])}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ChevronUp size={24} />
              </button>
            </div>
            <div className="space-y-4">
              {generatedDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </Card>
        )}

        {/* Take-Out Input Card - shown when Take-Out is selected and not collapsed */}
        {selectedOption === "take-out" && !isTakeOutCollapsed && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-yellow-300">Take-Out for Individual, Group, Weekly Meals</h2>
              <button 
                onClick={() => setIsTakeOutCollapsed(true)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ChevronUp size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Row 1: Serving Size & Cuisine */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="takeOutServingSize" className="text-yellow-300 font-bold text-sm mb-2 block">Serving Size</Label>
                  <Select value={takeOutServingSize} onValueChange={setTakeOutServingSize}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="2 people" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="1">1 person</SelectItem>
                      <SelectItem value="2">2 people</SelectItem>
                      <SelectItem value="4">4 people</SelectItem>
                      <SelectItem value="6">6 people</SelectItem>
                      <SelectItem value="8">8 people</SelectItem>
                      <SelectItem value="10">10 people</SelectItem>
                      <SelectItem value="weekly">Weekly (14 meals)</SelectItem>
                      <SelectItem value="monthly">Monthly (30 meals)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="takeOutCuisine" className="text-yellow-300 font-bold text-sm mb-2 block">Cuisine</Label>
                  <Select value={takeOutCuisine} onValueChange={setTakeOutCuisine}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Indian" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="indian">Indian</SelectItem>
                      <SelectItem value="italian">Italian</SelectItem>
                      <SelectItem value="mexican">Mexican</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                      <SelectItem value="american">American</SelectItem>
                      <SelectItem value="mediterranean">Mediterranean</SelectItem>
                      <SelectItem value="thai">Thai</SelectItem>
                      <SelectItem value="japanese">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 2: Meal Type & Spice Level */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="takeOutMealType" className="text-yellow-300 font-bold text-sm mb-2 block">Meal Type</Label>
                  <Select value={takeOutMealType} onValueChange={setTakeOutMealType}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Dinner" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                      <SelectItem value="party">Party Catering</SelectItem>
                      <SelectItem value="mixed">Mixed Meals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="takeOutSpiceLevel" className="text-yellow-300 font-bold text-sm mb-2 block">Spice Level</Label>
                  <Select value={takeOutSpiceLevel} onValueChange={setTakeOutSpiceLevel}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Medium" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="mild">Mild</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hot">Hot</SelectItem>
                      <SelectItem value="extra-hot">Extra Hot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 3: Delivery Date */}
              <div>
                <Label htmlFor="deliveryDate" className="text-yellow-300 font-bold text-sm mb-2 block">Delivery Date</Label>
                <div className="relative">
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pr-10"
                  />
                  <Calendar size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
                </div>
              </div>

              {/* Design Button */}
              <Button 
                onClick={handleDesignTakeOutMenu}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 text-lg mt-6 select-text"
              >
                Design Take Out Menu
              </Button>
            </div>
          </Card>
        )}

        {/* Take-Out Results Card - shown when dishes are generated */}
        {selectedOption === "take-out" && takeOutDishes.length > 0 && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Select Dishes for Take-Out</h2>
              <button 
                onClick={() => setTakeOutDishes([])}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ChevronUp size={24} />
              </button>
            </div>
            <div className="space-y-4">
              {takeOutDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </Card>
        )}

        {/* Card 3 - History */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">History</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className={`h-16 flex flex-col items-center justify-center gap-2 transition-all ${
                selectedHistoryItem === 'dishes-cooked' 
                  ? 'bg-orange-600 border-orange-500 text-white' 
                  : 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-300'
              }`}
              onClick={() => setSelectedHistoryItem(selectedHistoryItem === 'dishes-cooked' ? null : 'dishes-cooked')}
            >
              <ChefHat size={20} className="text-orange-400" />
              <span className="text-sm">Dishes Cooked</span>
            </Button>
            <Button
              variant="outline"
              className={`h-16 flex flex-col items-center justify-center gap-2 transition-all ${
                selectedHistoryItem === 'takeout-orders' 
                  ? 'bg-blue-600 border-blue-500 text-white' 
                  : 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-300'
              }`}
              onClick={() => setSelectedHistoryItem(selectedHistoryItem === 'takeout-orders' ? null : 'takeout-orders')}
            >
              <Truck size={20} className="text-blue-400" />
              <span className="text-sm">Takeout Orders</span>
            </Button>
            <Button
              variant="outline"
              className={`h-16 flex flex-col items-center justify-center gap-2 transition-all ${
                selectedHistoryItem === 'grocery-list' 
                  ? 'bg-green-600 border-green-500 text-white' 
                  : 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-300'
              }`}
              onClick={() => setSelectedHistoryItem(selectedHistoryItem === 'grocery-list' ? null : 'grocery-list')}
            >
              <ShoppingBag size={20} className="text-green-400" />
              <span className="text-sm">Grocery List</span>
            </Button>
            <Button
              variant="outline"
              className={`h-16 flex flex-col items-center justify-center gap-2 transition-all ${
                selectedHistoryItem === 'recipes-saved' 
                  ? 'bg-purple-600 border-purple-500 text-white' 
                  : 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-300'
              }`}
              onClick={() => setSelectedHistoryItem(selectedHistoryItem === 'recipes-saved' ? null : 'recipes-saved')}
            >
              <BookOpen size={20} className="text-purple-400" />
              <span className="text-sm">Recipes Saved</span>
            </Button>
          </div>
        </Card>

        {/* Card 4 - Summary */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Summary</h2>
          
          {/* Section 1: Meal Preferences */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-yellow-300 mb-3">Meal Preferences</h3>
            <p className="text-gray-300 text-sm">
              Serving: 2 people, Cuisine: American<br />
              Meal Type: Dinner
            </p>
          </div>

          {/* Divider */}
          <hr className="border-gray-600 mb-6" />
          
          {/* Section 2: Pantry Ingredients */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-yellow-300 mb-3">Pantry Ingredients</h3>
            <p className="text-gray-300 text-sm">
              Chicken Breast, Salmon, Onions, Rice,<br />
              Milk, Olive Oil, Apples, Basil and 2 more
            </p>
          </div>

          {/* Single Grocery List Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="h-14 bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-300 flex items-center justify-center px-10 text-lg font-semibold select-text"
              onClick={() => {/* Navigate to grocery list */}}
            >
              Grocery List
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}