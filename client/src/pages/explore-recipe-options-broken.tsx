import React, { useState } from "react";
import { BackButton } from "@/components/ui/back-button";
import { Card } from "@/components/ui/card";
import { DishCard } from "@/components/ui/dish-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronUp, ChevronDown, X, Calendar, ChefHat, Truck, ShoppingBag, BookOpen } from "lucide-react";

// Mock user avatar - in future this will come from API
const userAvatar = "/attached_assets/User/user1.png";

// Mock dietary preferences data - in future this will come from API
const mockDietaryData = {
  dietaryRestrictions: ["vegetarian", "vegan", "gluten-free", "dairy-free", "low-carb"],
  healthFactors: ["diabetes", "cardiovascular", "kidney", "blood-pressure", "cancer"],
  fitnessGoals: ["build muscle", "lose weight", "endurance", "wellness"],
  allergiesRestrictions: "None specified",
  nutritionalGoals: {
    calories: "1301-1500",
    protein: "71-100g",
    carbs: "101-150g",
    fat: "36-50g"
  }
};

export default function ExploreRecipeOptionsScreen() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [activePreferencesTab, setActivePreferencesTab] = useState<string>("diet");
  
  // Meal preferences state (renamed to avoid conflicts)
  const [mealServingSize, setMealServingSize] = useState<string>("2");
  const [mealCuisine, setMealCuisine] = useState<string>("american");
  const [mealMealType, setMealMealType] = useState<string>("dinner");
  const [mealSpiceLevel, setMealSpiceLevel] = useState<string>("mild");
  const [mealSkillLevel, setMealSkillLevel] = useState<string>("beginner");
  const [mealCookMethod, setMealCookMethod] = useState<string>("oven");
  const [mealPrepTime, setMealPrepTime] = useState<string>("30");
  const [mealPreferencesConfirmed, setMealPreferencesConfirmed] = useState<boolean>(false);
  const [hasChangedMealPreferences, setHasChangedMealPreferences] = useState<boolean>(false);
  
  // Pantry preferences state
  const [selectedIngredients, setSelectedIngredients] = useState<{[key: string]: boolean}>({
    // Default selections - one from each category
    'chicken-breast': true,
    'salmon': true,
    'bell-peppers': false, // Will be set to true below
    'milk': true,
    'rice': true,
    'apples': true,
    'black-beans': true,
    'almonds': true,
    'olive-oil': true,
    'salt': true
  });
  const [pantryConfirmed, setPantryConfirmed] = useState<boolean>(false);
  const [hasChangedPantryPreferences, setHasChangedPantryPreferences] = useState<boolean>(false);
  const [isCardCollapsed, setIsCardCollapsed] = useState<boolean>(false);
  const [isCardAtBottom, setIsCardAtBottom] = useState<boolean>(false);
  const [showCollapsedCard, setShowCollapsedCard] = useState<boolean>(false);
  
  // Initialize default pantry selections
  React.useEffect(() => {
    setSelectedIngredients(prev => ({
      ...prev,
      'bell-peppers': true
    }));
  }, []);
  
  // Helper functions for meal preferences
  const handleMealPreferenceChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    setHasChangedMealPreferences(true);
    setMealPreferencesConfirmed(false);
  };

  const handleConfirmMealPreferences = () => {
    const mandatoryFilled = mealServingSize && mealCuisine && mealMealType;
    if (!mandatoryFilled) {
      return; // Don't confirm if mandatory fields are empty
    }
    setMealPreferencesConfirmed(true);
    setHasChangedMealPreferences(false);
    // Auto-navigate to Pantry tab after confirmation
    setTimeout(() => {
      setActivePreferencesTab("pantry");
    }, 1000);
  };

  const isMandatoryFieldsFilled = mealServingSize && mealCuisine && mealMealType;

  // Helper functions for pantry preferences
  const handleIngredientToggle = (ingredientId: string) => {
    setSelectedIngredients(prev => ({
      ...prev,
      [ingredientId]: !prev[ingredientId]
    }));
    setHasChangedPantryPreferences(true);
    setPantryConfirmed(false);
  };

  const handleConfirmPantryPreferences = () => {
    setPantryConfirmed(true);
    setHasChangedPantryPreferences(false);
    
    // Step 1: Collapse the card immediately
    setIsCardCollapsed(true);
    
    // Step 2: After collapse animation, start sliding to bottom
    setTimeout(() => {
      setIsCardAtBottom(true);
      setShowCollapsedCard(true);
    }, 500); // 500ms for collapse animation
  };

  const handleExpandCollapsedCard = () => {
    setIsCardCollapsed(false);
    setShowCollapsedCard(false);
    setIsCardAtBottom(false);
  };

  const handleCloseCollapsedCard = () => {
    setShowCollapsedCard(false);
    // Reset all states to initial
    setPantryConfirmed(false);
    setIsCardCollapsed(false);
    setIsCardAtBottom(false);
    setHasChangedPantryPreferences(false);
    setActivePreferencesTab("diet");
  };

  // Helper functions for ingredient counting and display
  const getSelectedIngredientCount = () => {
    return Object.values(selectedIngredients).filter(Boolean).length;
  };

  const getSelectedIngredientNames = () => {
    const ingredientMap = {
      'chicken-breast': 'Chicken Breast',
      'ground-beef': 'Ground Beef',
      'turkey': 'Turkey',
      'pork-chops': 'Pork Chops',
      'bacon': 'Bacon',
      'lamb': 'Lamb',
      'salmon': 'Salmon',
      'cod': 'Cod',
      'shrimp': 'Shrimp',
      'tuna': 'Tuna',
      'tilapia': 'Tilapia',
      'crab': 'Crab',
      'bell-peppers': 'Bell Peppers',
      'tomatoes': 'Tomatoes',
      'broccoli': 'Broccoli',
      'cucumber': 'Cucumber',
      'zucchini': 'Zucchini',
      'eggplant': 'Eggplant',
      'mushrooms': 'Mushrooms',
      'spinach': 'Spinach',
      'milk': 'Milk',
      'cheese': 'Cheese',
      'yogurt': 'Yogurt',
      'butter': 'Butter',
      'eggs': 'Eggs',
      'rice': 'Rice',
      'pasta': 'Pasta',
      'bread': 'Bread',
      'quinoa': 'Quinoa',
      'oats': 'Oats',
      'apples': 'Apples',
      'bananas': 'Bananas',
      'oranges': 'Oranges',
      'berries': 'Berries',
      'black-beans': 'Black Beans',
      'lentils': 'Lentils',
      'chickpeas': 'Chickpeas',
      'kidney-beans': 'Kidney Beans',
      'almonds': 'Almonds',
      'walnuts': 'Walnuts',
      'cashews': 'Cashews',
      'peanuts': 'Peanuts',
      'olive-oil': 'Olive Oil',
      'garlic': 'Garlic',
      'onions': 'Onions',
      'herbs': 'Herbs',
      'spices': 'Spices',
      'vinegar': 'Vinegar',
      'salt': 'Salt',
      'flour': 'Flour',
      'sugar': 'Sugar',
      'baking-powder': 'Baking Powder'
    };

    return Object.entries(selectedIngredients)
      .filter(([_, selected]) => selected)
      .map(([key, _]) => ingredientMap[key] || key);
  };

  const getSelectedIngredientCount = () => {
    return Object.values(selectedIngredients).filter(Boolean).length;
  };

  const [isChefRecommendsCollapsed, setIsChefRecommendsCollapsed] = useState(false);
  const [isPantryDishesCollapsed, setIsPantryDishesCollapsed] = useState(false);
  const [isCreateDishesCollapsed, setIsCreateDishesCollapsed] = useState(false);
  const [isTakeOutCollapsed, setIsTakeOutCollapsed] = useState(false);
  
  // Create Dishes form state
  const [dishName, setDishName] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [mealType, setMealType] = useState("");
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
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6 relative">
          {/* Header with avatar */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Personalize Diet & Pantry</h2>
            <img 
              src={userAvatar} 
              alt="User Avatar" 
              className="w-16 h-16 rounded-full"
              style={{ border: 'none !important', outline: 'none', boxShadow: 'none', backgroundColor: 'transparent' }}
            />
          </div>
          
          {/* Tab buttons */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActivePreferencesTab("diet")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activePreferencesTab === "diet"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Diet
            </button>
            <button
              onClick={() => setActivePreferencesTab("meal")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activePreferencesTab === "meal"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Meal
            </button>
            <button
              onClick={() => setActivePreferencesTab("pantry")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activePreferencesTab === "pantry"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Pantry
            </button>
          </div>

          {/* Tab content */}
          {activePreferencesTab === "diet" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-yellow-300 drop-shadow-lg">Dietary Preferences</h3>
              
              {/* Dietary Restrictions */}
              <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <h4 className="text-yellow-300 font-bold mb-2 drop-shadow">Dietary Restrictions:</h4>
                <p className="text-gray-300">{mockDietaryData.dietaryRestrictions.join(", ")}</p>
              </div>

              {/* Health Factors */}
              <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <h4 className="text-yellow-300 font-bold mb-2 drop-shadow">Health Factors:</h4>
                <p className="text-gray-300">{mockDietaryData.healthFactors.join(", ")}</p>
              </div>

              {/* Fitness Goals */}
              <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <h4 className="text-yellow-300 font-bold mb-2 drop-shadow">Fitness Goals:</h4>
                <p className="text-gray-300">{mockDietaryData.fitnessGoals.join(", ")}</p>
              </div>

              {/* Allergies/Restrictions */}
              <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <h4 className="text-yellow-300 font-bold mb-2 drop-shadow">Allergies/Restrictions:</h4>
                <p className="text-gray-300">{mockDietaryData.allergiesRestrictions}</p>
              </div>

              {/* Nutritional Goals */}
              <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <h4 className="text-yellow-300 font-bold mb-2 drop-shadow">Nutritional Goals:</h4>
                <div className="text-gray-300">
                  <p>Cal: {mockDietaryData.nutritionalGoals.calories}, Protein: {mockDietaryData.nutritionalGoals.protein}</p>
                  <p>Carbs: {mockDietaryData.nutritionalGoals.carbs}, Fat: {mockDietaryData.nutritionalGoals.fat}</p>
                </div>
              </div>
            </div>
          )}

          {activePreferencesTab === "meal" && (
            <div className="space-y-4">
              {/* Mandatory Fields Section */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Serving Size */}
                  <div>
                    <label className="text-yellow-300 font-bold text-sm drop-shadow-lg">
                      Serving Size <span className="text-red-400">*</span>
                    </label>
                    <Select 
                      value={mealServingSize} 
                      onValueChange={(value) => handleMealPreferenceChange(setMealServingSize, value)}
                    >
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white mt-1">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="1" className="text-white hover:bg-gray-600">1 person</SelectItem>
                        <SelectItem value="2" className="text-white hover:bg-gray-600">2 people</SelectItem>
                        <SelectItem value="3" className="text-white hover:bg-gray-600">3 people</SelectItem>
                        <SelectItem value="4" className="text-white hover:bg-gray-600">4 people</SelectItem>
                        <SelectItem value="5" className="text-white hover:bg-gray-600">5+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Cuisine */}
                  <div>
                    <label className="text-yellow-300 font-bold text-sm drop-shadow-lg">
                      Cuisine <span className="text-red-400">*</span>
                    </label>
                    <Select 
                      value={mealCuisine} 
                      onValueChange={(value) => handleMealPreferenceChange(setMealCuisine, value)}
                    >
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white mt-1">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="american" className="text-white hover:bg-gray-600">American</SelectItem>
                        <SelectItem value="italian" className="text-white hover:bg-gray-600">Italian</SelectItem>
                        <SelectItem value="mexican" className="text-white hover:bg-gray-600">Mexican</SelectItem>
                        <SelectItem value="chinese" className="text-white hover:bg-gray-600">Chinese</SelectItem>
                        <SelectItem value="indian" className="text-white hover:bg-gray-600">Indian</SelectItem>
                        <SelectItem value="thai" className="text-white hover:bg-gray-600">Thai</SelectItem>
                        <SelectItem value="mediterranean" className="text-white hover:bg-gray-600">Mediterranean</SelectItem>
                        <SelectItem value="japanese" className="text-white hover:bg-gray-600">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Meal Type */}
                <div>
                  <label className="text-yellow-300 font-bold text-sm drop-shadow-lg">
                    Meal Type <span className="text-red-400">*</span>
                  </label>
                  <Select 
                    value={mealMealType} 
                    onValueChange={(value) => handleMealPreferenceChange(setMealMealType, value)}
                  >
                    <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white mt-1">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="breakfast" className="text-white hover:bg-gray-600">Breakfast</SelectItem>
                      <SelectItem value="lunch" className="text-white hover:bg-gray-600">Lunch</SelectItem>
                      <SelectItem value="dinner" className="text-white hover:bg-gray-600">Dinner</SelectItem>
                      <SelectItem value="snack" className="text-white hover:bg-gray-600">Snack</SelectItem>
                      <SelectItem value="dessert" className="text-white hover:bg-gray-600">Dessert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Separator Line */}
              <div className="border-t border-gray-600 my-6"></div>

              {/* Optional Fields Section */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Spice Level */}
                  <div>
                    <label className="text-yellow-300 font-bold text-sm drop-shadow-lg">Spice Level</label>
                    <Select 
                      value={mealSpiceLevel} 
                      onValueChange={(value) => handleMealPreferenceChange(setMealSpiceLevel, value)}
                    >
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="mild" className="text-white hover:bg-gray-600">😊 Mild</SelectItem>
                        <SelectItem value="medium" className="text-white hover:bg-gray-600">🌶️ Medium</SelectItem>
                        <SelectItem value="hot" className="text-white hover:bg-gray-600">🔥 Hot</SelectItem>
                        <SelectItem value="extra-hot" className="text-white hover:bg-gray-600">🌋 Extra Hot</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Skill Level */}
                  <div>
                    <label className="text-yellow-300 font-bold text-sm drop-shadow-lg">Skill Level</label>
                    <Select 
                      value={mealSkillLevel} 
                      onValueChange={(value) => handleMealPreferenceChange(setMealSkillLevel, value)}
                    >
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="beginner" className="text-white hover:bg-gray-600">🔰 Beginner</SelectItem>
                        <SelectItem value="intermediate" className="text-white hover:bg-gray-600">👨‍🍳 Intermediate</SelectItem>
                        <SelectItem value="advanced" className="text-white hover:bg-gray-600">👑 Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Cook Method */}
                  <div>
                    <label className="text-yellow-300 font-bold text-sm drop-shadow-lg">Cook Method</label>
                    <Select 
                      value={mealCookMethod} 
                      onValueChange={(value) => handleMealPreferenceChange(setMealCookMethod, value)}
                    >
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="oven" className="text-white hover:bg-gray-600">🔥 Oven</SelectItem>
                        <SelectItem value="stovetop" className="text-white hover:bg-gray-600">🍳 Stovetop</SelectItem>
                        <SelectItem value="grill" className="text-white hover:bg-gray-600">🥩 Grill</SelectItem>
                        <SelectItem value="microwave" className="text-white hover:bg-gray-600">⚡ Microwave</SelectItem>
                        <SelectItem value="slow-cooker" className="text-white hover:bg-gray-600">🍲 Slow Cooker</SelectItem>
                        <SelectItem value="air-fryer" className="text-white hover:bg-gray-600">💨 Air Fryer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Prep Time */}
                  <div>
                    <label className="text-yellow-300 font-bold text-sm drop-shadow-lg">Prep Time</label>
                    <Select 
                      value={mealPrepTime} 
                      onValueChange={(value) => handleMealPreferenceChange(setMealPrepTime, value)}
                    >
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="15" className="text-white hover:bg-gray-600">⚡ 15 minutes</SelectItem>
                        <SelectItem value="30" className="text-white hover:bg-gray-600">🕐 30 minutes</SelectItem>
                        <SelectItem value="45" className="text-white hover:bg-gray-600">🕑 45 minutes</SelectItem>
                        <SelectItem value="60" className="text-white hover:bg-gray-600">🕒 1 hour</SelectItem>
                        <SelectItem value="90" className="text-white hover:bg-gray-600">🕕 1.5 hours</SelectItem>
                        <SelectItem value="120" className="text-white hover:bg-gray-600">🕘 2+ hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Confirmation Section */}
              <div className="mt-6 pt-4">
                {hasChangedMealPreferences && !mealPreferencesConfirmed && (
                  <div className="text-center text-yellow-300 mb-4 text-sm">
                    Please confirm your meal preferences to continue
                  </div>
                )}
                
                <div 
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    mealPreferencesConfirmed 
                      ? 'bg-purple-600/20 border border-purple-500' 
                      : isMandatoryFieldsFilled 
                        ? 'bg-purple-600/10 border border-purple-400 hover:bg-purple-600/20' 
                        : 'bg-gray-700/50 border border-gray-600 cursor-not-allowed'
                  }`}
                  onClick={isMandatoryFieldsFilled ? handleConfirmMealPreferences : undefined}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    mealPreferencesConfirmed 
                      ? 'bg-purple-600 border-purple-500' 
                      : isMandatoryFieldsFilled 
                        ? 'border-purple-400' 
                        : 'border-gray-500'
                  }`}>
                    {mealPreferencesConfirmed && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className={`font-medium ${
                    mealPreferencesConfirmed 
                      ? 'text-purple-300' 
                      : isMandatoryFieldsFilled 
                        ? 'text-purple-300' 
                        : 'text-gray-500'
                  }`}>
                    I confirm meal preferences
                  </span>
                </div>
              </div>
            </div>
          )}

          {activePreferencesTab === "pantry" && (
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-yellow-300 drop-shadow-lg">Available Ingredients</h3>
                <p className="text-yellow-300 text-sm font-medium">
                  Selected Ingredients: {getSelectedIngredientCount()} items
                </p>
              </div>

              {/* Meat Category */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-white font-medium">Meat</h4>
                  <span className="text-gray-400 text-sm">
                    {Object.entries(selectedIngredients).filter(([key, selected]) => 
                      ['chicken-breast', 'ground-beef', 'turkey', 'pork-chops', 'bacon', 'lamb'].includes(key) && selected
                    ).length}/6
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'chicken-breast', name: 'Chicken Breast' },
                    { id: 'ground-beef', name: 'Ground Beef' },
                    { id: 'turkey', name: 'Turkey' },
                    { id: 'pork-chops', name: 'Pork Chops' },
                    { id: 'bacon', name: 'Bacon' },
                    { id: 'lamb', name: 'Lamb' }
                  ].map(ingredient => (
                    <div key={ingredient.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={ingredient.id}
                        checked={selectedIngredients[ingredient.id] || false}
                        onChange={() => handleIngredientToggle(ingredient.id)}
                        className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                      />
                      <label htmlFor={ingredient.id} className="text-sm text-gray-300">
                        {ingredient.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fish & Seafood Category */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-white font-medium">Fish & Seafood</h4>
                  <span className="text-gray-400 text-sm">
                    {Object.entries(selectedIngredients).filter(([key, selected]) => 
                      ['salmon', 'cod', 'shrimp', 'tuna', 'tilapia', 'crab'].includes(key) && selected
                    ).length}/6
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'salmon', name: 'Salmon' },
                    { id: 'cod', name: 'Cod' },
                    { id: 'shrimp', name: 'Shrimp' },
                    { id: 'tuna', name: 'Tuna' },
                    { id: 'tilapia', name: 'Tilapia' },
                    { id: 'crab', name: 'Crab' }
                  ].map(ingredient => (
                    <div key={ingredient.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={ingredient.id}
                        checked={selectedIngredients[ingredient.id] || false}
                        onChange={() => handleIngredientToggle(ingredient.id)}
                        className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                      />
                      <label htmlFor={ingredient.id} className="text-sm text-gray-300">
                        {ingredient.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vegetables Category */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-white font-medium">Vegetables</h4>
                  <span className="text-gray-400 text-sm">
                    {Object.entries(selectedIngredients).filter(([key, selected]) => 
                      ['bell-peppers', 'tomatoes', 'broccoli', 'cucumber', 'zucchini', 'eggplant', 'mushrooms', 'spinach'].includes(key) && selected
                    ).length}/8
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'bell-peppers', name: 'Bell Peppers' },
                    { id: 'tomatoes', name: 'Tomatoes' },
                    { id: 'broccoli', name: 'Broccoli' },
                    { id: 'cucumber', name: 'Cucumber' },
                    { id: 'zucchini', name: 'Zucchini' },
                    { id: 'eggplant', name: 'Eggplant' },
                    { id: 'mushrooms', name: 'Mushrooms' },
                    { id: 'spinach', name: 'Spinach' }
                  ].map(ingredient => (
                    <div key={ingredient.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={ingredient.id}
                        checked={selectedIngredients[ingredient.id] || false}
                        onChange={() => handleIngredientToggle(ingredient.id)}
                        className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                      />
                      <label htmlFor={ingredient.id} className="text-sm text-gray-300">
                        {ingredient.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dairy Category */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-white font-medium">Dairy</h4>
                  <span className="text-gray-400 text-sm">
                    {Object.entries(selectedIngredients).filter(([key, selected]) => 
                      ['milk', 'cheese', 'yogurt', 'butter', 'eggs'].includes(key) && selected
                    ).length}/5
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'milk', name: 'Milk' },
                    { id: 'cheese', name: 'Cheese' },
                    { id: 'yogurt', name: 'Yogurt' },
                    { id: 'butter', name: 'Butter' },
                    { id: 'eggs', name: 'Eggs' }
                  ].map(ingredient => (
                    <div key={ingredient.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={ingredient.id}
                        checked={selectedIngredients[ingredient.id] || false}
                        onChange={() => handleIngredientToggle(ingredient.id)}
                        className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                      />
                      <label htmlFor={ingredient.id} className="text-sm text-gray-300">
                        {ingredient.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grains Category */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-white font-medium">Grains</h4>
                  <span className="text-gray-400 text-sm">
                    {Object.entries(selectedIngredients).filter(([key, selected]) => 
                      ['rice', 'pasta', 'bread', 'quinoa', 'oats'].includes(key) && selected
                    ).length}/5
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'rice', name: 'Rice' },
                    { id: 'pasta', name: 'Pasta' },
                    { id: 'bread', name: 'Bread' },
                    { id: 'quinoa', name: 'Quinoa' },
                    { id: 'oats', name: 'Oats' }
                  ].map(ingredient => (
                    <div key={ingredient.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={ingredient.id}
                        checked={selectedIngredients[ingredient.id] || false}
                        onChange={() => handleIngredientToggle(ingredient.id)}
                        className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                      />
                      <label htmlFor={ingredient.id} className="text-sm text-gray-300">
                        {ingredient.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fruits Category */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-white font-medium">Fruits</h4>
                  <span className="text-gray-400 text-sm">
                    {Object.entries(selectedIngredients).filter(([key, selected]) => 
                      ['apples', 'bananas', 'oranges', 'berries'].includes(key) && selected
                    ).length}/4
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'apples', name: 'Apples' },
                    { id: 'bananas', name: 'Bananas' },
                    { id: 'oranges', name: 'Oranges' },
                    { id: 'berries', name: 'Berries' }
                  ].map(ingredient => (
                    <div key={ingredient.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={ingredient.id}
                        checked={selectedIngredients[ingredient.id] || false}
                        onChange={() => handleIngredientToggle(ingredient.id)}
                        className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                      />
                      <label htmlFor={ingredient.id} className="text-sm text-gray-300">
                        {ingredient.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legumes & Beans Category */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-white font-medium">Legumes & Beans</h4>
                  <span className="text-gray-400 text-sm">
                    {Object.entries(selectedIngredients).filter(([key, selected]) => 
                      ['black-beans', 'lentils', 'chickpeas', 'kidney-beans'].includes(key) && selected
                    ).length}/4
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'black-beans', name: 'Black Beans' },
                    { id: 'lentils', name: 'Lentils' },
                    { id: 'chickpeas', name: 'Chickpeas' },
                    { id: 'kidney-beans', name: 'Kidney Beans' }
                  ].map(ingredient => (
                    <div key={ingredient.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={ingredient.id}
                        checked={selectedIngredients[ingredient.id] || false}
                        onChange={() => handleIngredientToggle(ingredient.id)}
                        className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                      />
                      <label htmlFor={ingredient.id} className="text-sm text-gray-300">
                        {ingredient.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nuts & Seeds Category */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-white font-medium">Nuts & Seeds</h4>
                  <span className="text-gray-400 text-sm">
                    {Object.entries(selectedIngredients).filter(([key, selected]) => 
                      ['almonds', 'walnuts', 'cashews', 'peanuts'].includes(key) && selected
                    ).length}/4
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'almonds', name: 'Almonds' },
                    { id: 'walnuts', name: 'Walnuts' },
                    { id: 'cashews', name: 'Cashews' },
                    { id: 'peanuts', name: 'Peanuts' }
                  ].map(ingredient => (
                    <div key={ingredient.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={ingredient.id}
                        checked={selectedIngredients[ingredient.id] || false}
                        onChange={() => handleIngredientToggle(ingredient.id)}
                        className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                      />
                      <label htmlFor={ingredient.id} className="text-sm text-gray-300">
                        {ingredient.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Condiments & Seasonings Category */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-white font-medium">Condiments & Seasonings</h4>
                  <span className="text-gray-400 text-sm">
                    {Object.entries(selectedIngredients).filter(([key, selected]) => 
                      ['olive-oil', 'garlic', 'onions', 'herbs', 'spices', 'vinegar'].includes(key) && selected
                    ).length}/6
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'olive-oil', name: 'Olive Oil' },
                    { id: 'garlic', name: 'Garlic' },
                    { id: 'onions', name: 'Onions' },
                    { id: 'herbs', name: 'Herbs' },
                    { id: 'spices', name: 'Spices' },
                    { id: 'vinegar', name: 'Vinegar' }
                  ].map(ingredient => (
                    <div key={ingredient.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={ingredient.id}
                        checked={selectedIngredients[ingredient.id] || false}
                        onChange={() => handleIngredientToggle(ingredient.id)}
                        className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                      />
                      <label htmlFor={ingredient.id} className="text-sm text-gray-300">
                        {ingredient.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pantry Staples Category */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-white font-medium">Pantry Staples</h4>
                  <span className="text-gray-400 text-sm">
                    {Object.entries(selectedIngredients).filter(([key, selected]) => 
                      ['salt', 'flour', 'sugar', 'baking-powder'].includes(key) && selected
                    ).length}/4
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'salt', name: 'Salt' },
                    { id: 'flour', name: 'Flour' },
                    { id: 'sugar', name: 'Sugar' },
                    { id: 'baking-powder', name: 'Baking Powder' }
                  ].map(ingredient => (
                    <div key={ingredient.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={ingredient.id}
                        checked={selectedIngredients[ingredient.id] || false}
                        onChange={() => handleIngredientToggle(ingredient.id)}
                        className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                      />
                      <label htmlFor={ingredient.id} className="text-sm text-gray-300">
                        {ingredient.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirmation Section */}
              <div className="mt-6 pt-4">
                {hasChangedPantryPreferences && !pantryConfirmed && (
                  <div className="text-center text-yellow-300 mb-4 text-sm">
                    Please confirm your pantry ingredients to continue
                  </div>
                )}
                
                <div 
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    pantryConfirmed 
                      ? 'bg-purple-600/20 border border-purple-500' 
                      : 'bg-purple-600/10 border border-purple-400 hover:bg-purple-600/20'
                  }`}
                  onClick={handleConfirmPantryPreferences}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    pantryConfirmed 
                      ? 'bg-purple-600 border-purple-500' 
                      : 'border-purple-400'
                  }`}>
                    {pantryConfirmed && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className={`font-medium ${
                    pantryConfirmed 
                      ? 'text-purple-300' 
                      : 'text-purple-300'
                  }`}>
                    I confirm pantry ingredients
                  </span>
                </div>
              </div>
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
                  <Label htmlFor="mealType" className="text-yellow-300 font-bold text-sm mb-2 block">Meal Type</Label>
                  <Select value={mealType} onValueChange={setMealType}>
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 mt-6"
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 mt-6"
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
        <Card className={`bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6 transition-all duration-1000 ${
          pantryConfirmed ? 'order-4' : 'order-4'
        }`}>
          <h2 className="text-xl font-bold text-white mb-4">Summary</h2>
          
          {/* Section 1: Meal Preferences */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-yellow-300 mb-3">Meal Preferences</h3>
            {mealPreferencesConfirmed ? (
              <p className="text-gray-300 text-sm">
                Serving: {mealServingSize} people, Cuisine: {mealCuisine.charAt(0).toUpperCase() + mealCuisine.slice(1)}<br />
                Meal Type: {mealMealType.charAt(0).toUpperCase() + mealMealType.slice(1)}
              </p>
            ) : (
              <p className="text-gray-400 text-sm italic">
                Meal preferences will appear here after confirmation
              </p>
            )}
          </div>

          {/* Divider */}
          <hr className="border-gray-600 mb-6" />
          
          {/* Section 2: Pantry Ingredients */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-yellow-300 mb-3">Pantry Ingredients</h3>
            {pantryConfirmed ? (
              <div>
                <p className="text-gray-300 text-sm mb-2">
                  Selected: {getSelectedIngredientCount()} ingredients
                </p>
                <div className="flex flex-wrap gap-1">
                  {getSelectedIngredientNames().slice(0, 8).map((name, index) => (
                    <span key={index} className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs">
                      {name}
                    </span>
                  ))}
                  {getSelectedIngredientNames().length > 8 && (
                    <span className="text-purple-300 text-xs">
                      +{getSelectedIngredientNames().length - 8} more
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-sm italic">
                Pantry ingredients will appear here after confirmation
              </p>
            )}
          </div>

          {/* Single Grocery List Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="h-12 bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-300 flex items-center justify-center px-8"
              onClick={() => {/* Navigate to grocery list */}}
            >
              Grocery List
            </Button>
          </div>
        </Card>

        {/* Main Preferences Card - only show when not at bottom */}
        {!isCardAtBottom && (
          <Card className={`bg-gray-800/90 backdrop-blur-sm border-gray-700 transition-all duration-500 ${
            isCardCollapsed ? 'p-0 h-0 overflow-hidden opacity-0' : 'p-6'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Personalize Diet & Pantry</h2>
              <img src={userAvatar} alt="User" className="w-16 h-16 rounded-full" />
            </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-700/50 rounded-lg p-1 mb-6">
            {[
              { id: "diet", label: "Diet" },
              { id: "meal", label: "Meal" },
              { id: "pantry", label: "Pantry" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActivePreferencesTab(tab.id)}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                  activePreferencesTab === tab.id
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[200px]">
            {/* Diet Tab */}
            {activePreferencesTab === "diet" && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-yellow-300 drop-shadow-lg">Dietary Preferences</h3>
                <div className="grid grid-cols-1 gap-4">
                  {/* Dietary Restrictions */}
                  <div className="p-4 border border-gray-600 rounded-lg bg-gray-800/50">
                    <h4 className="text-yellow-300 font-medium mb-2">Dietary Restrictions</h4>
                    <div className="text-sm text-gray-300 space-y-1">
                      {mockDietaryData.dietaryRestrictions.map((restriction, index) => (
                        <span key={index} className="inline-block bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs mr-1 mb-1">
                          {restriction.charAt(0).toUpperCase() + restriction.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Health Factors */}
                  <div className="p-4 border border-gray-600 rounded-lg bg-gray-800/50">
                    <h4 className="text-yellow-300 font-medium mb-2">Health Factors</h4>
                    <div className="text-sm text-gray-300 space-y-1">
                      {mockDietaryData.healthFactors.map((factor, index) => (
                        <span key={index} className="inline-block bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs mr-1 mb-1">
                          {factor.charAt(0).toUpperCase() + factor.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Fitness Goals */}
                  <div className="p-4 border border-gray-600 rounded-lg bg-gray-800/50">
                    <h4 className="text-yellow-300 font-medium mb-2">Fitness Goals</h4>
                    <div className="text-sm text-gray-300 space-y-1">
                      {mockDietaryData.fitnessGoals.map((goal, index) => (
                        <span key={index} className="inline-block bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs mr-1 mb-1">
                          {goal.charAt(0).toUpperCase() + goal.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Allergies/Restrictions */}
                  <div className="p-4 border border-gray-600 rounded-lg bg-gray-800/50">
                    <h4 className="text-yellow-300 font-medium mb-2">Allergies/Restrictions</h4>
                    <p className="text-sm text-gray-300">{mockDietaryData.allergiesRestrictions}</p>
                  </div>
                  
                  {/* Nutritional Goals */}
                  <div className="p-4 border border-gray-600 rounded-lg bg-gray-800/50">
                    <h4 className="text-yellow-300 font-medium mb-2">Nutritional Goals</h4>
                    <div className="text-sm text-gray-300 space-y-1">
                      <p>Calories: {mockDietaryData.nutritionalGoals.calories}</p>
                      <p>Protein: {mockDietaryData.nutritionalGoals.protein}</p>
                      <p>Carbs: {mockDietaryData.nutritionalGoals.carbs}</p>
                      <p>Fat: {mockDietaryData.nutritionalGoals.fat}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Meal Tab Content */}
            {activePreferencesTab === "meal" && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-yellow-300 drop-shadow-lg">Meal Preferences</h3>
                
                {/* Required Fields */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="servingSize" className="text-yellow-300 font-bold text-sm mb-2 block">
                        Serving Size <span className="text-red-400">*</span>
                      </Label>
                      <Select value={mealServingSize} onValueChange={(value) => handleMealPreferenceChange(setMealServingSize, value)}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="2" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                            <SelectItem key={num} value={num.toString()}>{num} people</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="cuisine" className="text-yellow-300 font-bold text-sm mb-2 block">
                        Cuisine <span className="text-red-400">*</span>
                      </Label>
                      <Select value={mealCuisine} onValueChange={(value) => handleMealPreferenceChange(setMealCuisine, value)}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="American" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="american">American</SelectItem>
                          <SelectItem value="italian">Italian</SelectItem>
                          <SelectItem value="mexican">Mexican</SelectItem>
                          <SelectItem value="asian">Asian</SelectItem>
                          <SelectItem value="mediterranean">Mediterranean</SelectItem>
                          <SelectItem value="indian">Indian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="mealType" className="text-yellow-300 font-bold text-sm mb-2 block">
                        Meal Type <span className="text-red-400">*</span>
                      </Label>
                      <Select value={mealMealType} onValueChange={(value) => handleMealPreferenceChange(setMealMealType, value)}>
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
                  </div>
                  
                  {/* Visual Separator */}
                  <div className="border-t border-gray-600 my-4"></div>
                  
                  {/* Optional Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="spiceLevel" className="text-yellow-300 font-bold text-sm mb-2 block">Spice Level</Label>
                      <Select value={mealSpiceLevel} onValueChange={(value) => handleMealPreferenceChange(setMealSpiceLevel, value)} disabled={!isMandatoryFieldsFilled}>
                        <SelectTrigger className={`bg-gray-700 border-gray-600 text-white ${!isMandatoryFieldsFilled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          <SelectValue placeholder="Mild" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="mild">Mild</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hot">Hot</SelectItem>
                          <SelectItem value="extra-hot">Extra Hot</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="skillLevel" className="text-yellow-300 font-bold text-sm mb-2 block">Skill Level</Label>
                      <Select value={mealSkillLevel} onValueChange={(value) => handleMealPreferenceChange(setMealSkillLevel, value)} disabled={!isMandatoryFieldsFilled}>
                        <SelectTrigger className={`bg-gray-700 border-gray-600 text-white ${!isMandatoryFieldsFilled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          <SelectValue placeholder="Beginner" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="cookMethod" className="text-yellow-300 font-bold text-sm mb-2 block">Cook Method</Label>
                      <Select value={mealCookMethod} onValueChange={(value) => handleMealPreferenceChange(setMealCookMethod, value)} disabled={!isMandatoryFieldsFilled}>
                        <SelectTrigger className={`bg-gray-700 border-gray-600 text-white ${!isMandatoryFieldsFilled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          <SelectValue placeholder="Oven" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="oven">Oven</SelectItem>
                          <SelectItem value="stovetop">Stovetop</SelectItem>
                          <SelectItem value="grill">Grill</SelectItem>
                          <SelectItem value="slow-cooker">Slow Cooker</SelectItem>
                          <SelectItem value="air-fryer">Air Fryer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="prepTime" className="text-yellow-300 font-bold text-sm mb-2 block">Prep Time</Label>
                      <Select value={mealPrepTime} onValueChange={(value) => handleMealPreferenceChange(setMealPrepTime, value)} disabled={!isMandatoryFieldsFilled}>
                        <SelectTrigger className={`bg-gray-700 border-gray-600 text-white ${!isMandatoryFieldsFilled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          <SelectValue placeholder="30 min" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="90">1.5 hours</SelectItem>
                          <SelectItem value="120">2+ hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Confirmation Section */}
                <div className="mt-6 pt-4">
                  {hasChangedMealPreferences && !mealPreferencesConfirmed && (
                    <div className="text-center text-yellow-300 mb-4 text-sm">
                      Please confirm your meal preferences to continue
                    </div>
                  )}
                  
                  <div 
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      mealPreferencesConfirmed 
                        ? 'bg-purple-600/20 border border-purple-500' 
                        : 'bg-purple-600/10 border border-purple-400 hover:bg-purple-600/20'
                    }`}
                    onClick={handleConfirmMealPreferences}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      mealPreferencesConfirmed 
                        ? 'bg-purple-600 border-purple-500' 
                        : 'border-purple-400'
                    }`}>
                      {mealPreferencesConfirmed && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className={`font-medium ${
                      mealPreferencesConfirmed 
                        ? 'text-purple-300' 
                        : 'text-purple-300'
                    }`}>
                      I confirm meal preferences
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Pantry Tab Content */}
            {activePreferencesTab === "pantry" && (
              <div className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-yellow-300 drop-shadow-lg">Available Ingredients</h3>
                  <p className="text-yellow-300 text-sm font-medium">
                    Selected Ingredients: {getSelectedIngredientCount()} items
                  </p>
                </div>

                {/* Meat Category */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-medium">Meat</h4>
                    <span className="text-gray-400 text-sm">
                      {Object.entries(selectedIngredients).filter(([key, selected]) => 
                        ['chicken-breast', 'ground-beef', 'turkey', 'pork-chops', 'bacon', 'lamb'].includes(key) && selected
                      ).length}/6
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'chicken-breast', name: 'Chicken Breast' },
                      { id: 'ground-beef', name: 'Ground Beef' },
                      { id: 'turkey', name: 'Turkey' },
                      { id: 'pork-chops', name: 'Pork Chops' },
                      { id: 'bacon', name: 'Bacon' },
                      { id: 'lamb', name: 'Lamb' }
                    ].map(ingredient => (
                      <div key={ingredient.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={ingredient.id}
                          checked={selectedIngredients[ingredient.id] || false}
                          onChange={() => handleIngredientToggle(ingredient.id)}
                          className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                        />
                        <label htmlFor={ingredient.id} className="text-sm text-gray-300">
                          {ingredient.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fish & Seafood Category */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-medium">Fish & Seafood</h4>
                    <span className="text-gray-400 text-sm">
                      {Object.entries(selectedIngredients).filter(([key, selected]) => 
                        ['salmon', 'cod', 'shrimp', 'tuna', 'tilapia', 'crab'].includes(key) && selected
                      ).length}/6
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'salmon', name: 'Salmon' },
                      { id: 'cod', name: 'Cod' },
                      { id: 'shrimp', name: 'Shrimp' },
                      { id: 'tuna', name: 'Tuna' },
                      { id: 'tilapia', name: 'Tilapia' },
                      { id: 'crab', name: 'Crab' }
                    ].map(ingredient => (
                      <div key={ingredient.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={ingredient.id}
                          checked={selectedIngredients[ingredient.id] || false}
                          onChange={() => handleIngredientToggle(ingredient.id)}
                          className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                        />
                        <label htmlFor={ingredient.id} className="text-sm text-gray-300">
                          {ingredient.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vegetables Category */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-medium">Vegetables</h4>
                    <span className="text-gray-400 text-sm">
                      {Object.entries(selectedIngredients).filter(([key, selected]) => 
                        ['bell-peppers', 'tomatoes', 'broccoli', 'cucumber', 'zucchini', 'eggplant', 'mushrooms', 'spinach'].includes(key) && selected
                      ).length}/8
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'bell-peppers', name: 'Bell Peppers' },
                      { id: 'tomatoes', name: 'Tomatoes' },
                      { id: 'broccoli', name: 'Broccoli' },
                      { id: 'cucumber', name: 'Cucumber' },
                      { id: 'zucchini', name: 'Zucchini' },
                      { id: 'eggplant', name: 'Eggplant' },
                      { id: 'mushrooms', name: 'Mushrooms' },
                      { id: 'spinach', name: 'Spinach' }
                    ].map(ingredient => (
                      <div key={ingredient.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={ingredient.id}
                          checked={selectedIngredients[ingredient.id] || false}
                          onChange={() => handleIngredientToggle(ingredient.id)}
                          className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                        />
                        <label htmlFor={ingredient.id} className="text-sm text-gray-300">
                          {ingredient.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dairy Category */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-medium">Dairy</h4>
                    <span className="text-gray-400 text-sm">
                      {Object.entries(selectedIngredients).filter(([key, selected]) => 
                        ['milk', 'cheese', 'yogurt', 'butter', 'eggs'].includes(key) && selected
                      ).length}/5
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'milk', name: 'Milk' },
                      { id: 'cheese', name: 'Cheese' },
                      { id: 'yogurt', name: 'Yogurt' },
                      { id: 'butter', name: 'Butter' },
                      { id: 'eggs', name: 'Eggs' }
                    ].map(ingredient => (
                      <div key={ingredient.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={ingredient.id}
                          checked={selectedIngredients[ingredient.id] || false}
                          onChange={() => handleIngredientToggle(ingredient.id)}
                          className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                        />
                        <label htmlFor={ingredient.id} className="text-sm text-gray-300">
                          {ingredient.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grains Category */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-medium">Grains</h4>
                    <span className="text-gray-400 text-sm">
                      {Object.entries(selectedIngredients).filter(([key, selected]) => 
                        ['rice', 'pasta', 'bread', 'quinoa', 'oats'].includes(key) && selected
                      ).length}/5
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'rice', name: 'Rice' },
                      { id: 'pasta', name: 'Pasta' },
                      { id: 'bread', name: 'Bread' },
                      { id: 'quinoa', name: 'Quinoa' },
                      { id: 'oats', name: 'Oats' }
                    ].map(ingredient => (
                      <div key={ingredient.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={ingredient.id}
                          checked={selectedIngredients[ingredient.id] || false}
                          onChange={() => handleIngredientToggle(ingredient.id)}
                          className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                        />
                        <label htmlFor={ingredient.id} className="text-sm text-gray-300">
                          {ingredient.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fruits Category */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-medium">Fruits</h4>
                    <span className="text-gray-400 text-sm">
                      {Object.entries(selectedIngredients).filter(([key, selected]) => 
                        ['apples', 'bananas', 'oranges', 'berries'].includes(key) && selected
                      ).length}/4
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'apples', name: 'Apples' },
                      { id: 'bananas', name: 'Bananas' },
                      { id: 'oranges', name: 'Oranges' },
                      { id: 'berries', name: 'Berries' }
                    ].map(ingredient => (
                      <div key={ingredient.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={ingredient.id}
                          checked={selectedIngredients[ingredient.id] || false}
                          onChange={() => handleIngredientToggle(ingredient.id)}
                          className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                        />
                        <label htmlFor={ingredient.id} className="text-sm text-gray-300">
                          {ingredient.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legumes & Beans Category */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-medium">Legumes & Beans</h4>
                    <span className="text-gray-400 text-sm">
                      {Object.entries(selectedIngredients).filter(([key, selected]) => 
                        ['black-beans', 'lentils', 'chickpeas', 'kidney-beans'].includes(key) && selected
                      ).length}/4
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'black-beans', name: 'Black Beans' },
                      { id: 'lentils', name: 'Lentils' },
                      { id: 'chickpeas', name: 'Chickpeas' },
                      { id: 'kidney-beans', name: 'Kidney Beans' }
                    ].map(ingredient => (
                      <div key={ingredient.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={ingredient.id}
                          checked={selectedIngredients[ingredient.id] || false}
                          onChange={() => handleIngredientToggle(ingredient.id)}
                          className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                        />
                        <label htmlFor={ingredient.id} className="text-sm text-gray-300">
                          {ingredient.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nuts & Seeds Category */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-medium">Nuts & Seeds</h4>
                    <span className="text-gray-400 text-sm">
                      {Object.entries(selectedIngredients).filter(([key, selected]) => 
                        ['almonds', 'walnuts', 'cashews', 'peanuts'].includes(key) && selected
                      ).length}/4
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'almonds', name: 'Almonds' },
                      { id: 'walnuts', name: 'Walnuts' },
                      { id: 'cashews', name: 'Cashews' },
                      { id: 'peanuts', name: 'Peanuts' }
                    ].map(ingredient => (
                      <div key={ingredient.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={ingredient.id}
                          checked={selectedIngredients[ingredient.id] || false}
                          onChange={() => handleIngredientToggle(ingredient.id)}
                          className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                        />
                        <label htmlFor={ingredient.id} className="text-sm text-gray-300">
                          {ingredient.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Condiments & Seasonings Category */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-medium">Condiments & Seasonings</h4>
                    <span className="text-gray-400 text-sm">
                      {Object.entries(selectedIngredients).filter(([key, selected]) => 
                        ['olive-oil', 'garlic', 'onions', 'herbs', 'spices', 'vinegar'].includes(key) && selected
                      ).length}/6
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'olive-oil', name: 'Olive Oil' },
                      { id: 'garlic', name: 'Garlic' },
                      { id: 'onions', name: 'Onions' },
                      { id: 'herbs', name: 'Herbs' },
                      { id: 'spices', name: 'Spices' },
                      { id: 'vinegar', name: 'Vinegar' }
                    ].map(ingredient => (
                      <div key={ingredient.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={ingredient.id}
                          checked={selectedIngredients[ingredient.id] || false}
                          onChange={() => handleIngredientToggle(ingredient.id)}
                          className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                        />
                        <label htmlFor={ingredient.id} className="text-sm text-gray-300">
                          {ingredient.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pantry Staples Category */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-medium">Pantry Staples</h4>
                    <span className="text-gray-400 text-sm">
                      {Object.entries(selectedIngredients).filter(([key, selected]) => 
                        ['salt', 'flour', 'sugar', 'baking-powder'].includes(key) && selected
                      ).length}/4
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'salt', name: 'Salt' },
                      { id: 'flour', name: 'Flour' },
                      { id: 'sugar', name: 'Sugar' },
                      { id: 'baking-powder', name: 'Baking Powder' }
                    ].map(ingredient => (
                      <div key={ingredient.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={ingredient.id}
                          checked={selectedIngredients[ingredient.id] || false}
                          onChange={() => handleIngredientToggle(ingredient.id)}
                          className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                        />
                        <label htmlFor={ingredient.id} className="text-sm text-gray-300">
                          {ingredient.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Confirmation Section */}
                <div className="mt-6 pt-4">
                  {hasChangedPantryPreferences && !pantryConfirmed && (
                    <div className="text-center text-yellow-300 mb-4 text-sm">
                      Please confirm your pantry ingredients to continue
                    </div>
                  )}
                  
                  <div 
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      pantryConfirmed 
                        ? 'bg-purple-600/20 border border-purple-500' 
                        : 'bg-purple-600/10 border border-purple-400 hover:bg-purple-600/20'
                    }`}
                    onClick={handleConfirmPantryPreferences}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      pantryConfirmed 
                        ? 'bg-purple-600 border-purple-500' 
                        : 'border-purple-400'
                    }`}>
                      {pantryConfirmed && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className={`font-medium ${
                      pantryConfirmed 
                        ? 'text-purple-300' 
                        : 'text-purple-300'
                    }`}>
                      I confirm pantry ingredients
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          </Card>
        )}

        {/* Collapsed Card at Bottom - only show when confirmed and slid to bottom */}
        {showCollapsedCard && (
          <Card className={`bg-gray-800/90 backdrop-blur-sm border-gray-700 p-4 transition-all duration-1000 transform ${
            isCardAtBottom ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={userAvatar} alt="User" className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="text-white font-medium">Diet & Pantry Preferences</h3>
                  <p className="text-gray-400 text-sm">
                    {getSelectedIngredientCount()} ingredients selected
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleExpandCollapsedCard}
                  className="p-2 text-purple-400 hover:text-purple-300 hover:bg-purple-600/20 rounded-lg transition-colors"
                  title="Expand preferences"
                >
                  <ChevronUp size={20} />
                </button>
                <button
                  onClick={handleCloseCollapsedCard}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-600/20 rounded-lg transition-colors"
                  title="Close preferences"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}