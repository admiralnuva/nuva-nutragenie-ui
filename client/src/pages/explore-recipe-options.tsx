import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronUp, ChevronDown, X, Calendar, ChefHat, Truck, ShoppingBag, BookOpen } from "lucide-react";

// Mock user avatar - in future this will come from API
const userAvatar = "/attached_assets/User/user1.png";

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
  
  // Card state management - reset to expanded when navigating from dietary preferences
  const [cardState, setCardState] = useState<"expanded" | "collapsed" | "bottom">("expanded");

  // Reset card to expanded position on component mount (when navigating from dietary preferences)
  useEffect(() => {
    // Check if we're coming from dietary preferences
    const fromDietary = localStorage.getItem('nutragenie_from_dietary');
    const hasExistingPreferences = localStorage.getItem('nutragenie_preferences_confirmed');
    
    if (fromDietary === 'true') {
      // Coming from dietary preferences - show card at position 1 (expanded)
      setCardState("expanded");
      // Clear the flag
      localStorage.removeItem('nutragenie_from_dietary');
      // Reset all confirmation states
      setPantryConfirmed(false);
      setMealPreferencesConfirmed(false);
      setHasChangedPantryPreferences(false);
      setHasChangedMealPreferences(false);
      setActivePreferencesTab("diet");
    } else if (hasExistingPreferences === 'true') {
      // Returning visit - show card at bottom (collapsed)
      setCardState("bottom");
    } else {
      // Default case - show expanded
      setCardState("expanded");
    }
  }, []);
  
  // Meal preferences state
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
    'bell-peppers': true,
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

  // Helper functions
  const handleConfirmPantryPreferences = () => {
    setPantryConfirmed(true);
    setHasChangedPantryPreferences(false);
    
    // Save preferences confirmed state to localStorage
    localStorage.setItem('nutragenie_preferences_confirmed', 'true');
    
    // Immediate slide to bottom without collapse animation for better UX
    setCardState("bottom");
  };

  const handleExpandCollapsedCard = () => {
    setCardState("expanded");
  };

  const handleCloseCollapsedCard = () => {
    setCardState("expanded");
    // Reset all states to initial
    setPantryConfirmed(false);
    setHasChangedPantryPreferences(false);
    setActivePreferencesTab("diet");
    // Clear preferences confirmed state
    localStorage.removeItem('nutragenie_preferences_confirmed');
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700">
        <Link href="/dietary">
          <ArrowLeft className="w-6 h-6 text-purple-400" />
        </Link>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
          <p className="text-lg font-semibold text-purple-600 mt-1">Explore Recipe Options</p>
        </div>
        <div className="w-6 h-6" />
      </div>

      <div className="p-6 space-y-6">
        {/* Card 1 - Recipe Options */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recipe Options</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: "chef-choice", label: "Chef's Choice" },
              { id: "pantry-dishes", label: "Pantry Dishes" },
              { id: "create-dishes", label: "Create Dishes" },
              { id: "take-out", label: "Take-Out" }
            ].map(option => (
              <Button
                key={option.id}
                variant="outline"
                className={`h-14 transition-all ${
                  selectedOption === option.id
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-300'
                }`}
                onClick={() => setSelectedOption(selectedOption === option.id ? null : option.id)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </Card>

        {/* Card 2 - History */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">History</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2 bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-300">
              <ChefHat size={20} className="text-orange-400" />
              <span className="text-sm">Dishes Cooked</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2 bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-300">
              <Truck size={20} className="text-blue-400" />
              <span className="text-sm">Takeout Orders</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2 bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-300">
              <ShoppingBag size={20} className="text-green-400" />
              <span className="text-sm">Grocery List</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2 bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-300">
              <BookOpen size={20} className="text-purple-400" />
              <span className="text-sm">Recipes Saved</span>
            </Button>
          </div>
        </Card>

        {/* Chef's Choice Card */}
        {selectedOption === "chef-choice" && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Chef Recommends</h2>
              <button
                onClick={() => setSelectedOption(null)}
                className="p-2 text-purple-400 hover:text-purple-300 hover:bg-purple-600/20 rounded-lg transition-colors"
              >
                <ChevronUp size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  name: "Grilled Chicken Caesar",
                  image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
                  calories: 420,
                  protein: "32g",
                  cookTime: "25 min",
                  difficulty: "Easy"
                },
                {
                  name: "Mediterranean Pasta",
                  image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
                  calories: 380,
                  protein: "18g", 
                  cookTime: "20 min",
                  difficulty: "Medium"
                },
                {
                  name: "Salmon Teriyaki",
                  image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop",
                  calories: 450,
                  protein: "35g",
                  cookTime: "30 min", 
                  difficulty: "Medium"
                }
              ].map((dish, index) => (
                <div key={index} className="bg-gray-700/50 rounded-lg overflow-hidden">
                  <img src={dish.image} alt={dish.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-white font-medium mb-2">{dish.name}</h3>
                    <div className="flex justify-between items-center text-sm text-gray-300 mb-4">
                      <span>{dish.calories} cal • {dish.protein} protein</span>
                      <span>{dish.cookTime} • {dish.difficulty}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                          <ArrowLeft className="w-4 h-4 text-white rotate-180" />
                        </button>
                        <button className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-white" />
                        </button>
                        <button className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                          <ChefHat className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Pantry Dishes Card */}
        {selectedOption === "pantry-dishes" && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Dishes from Pantry Ingredients</h2>
              <button
                onClick={() => setSelectedOption(null)}
                className="p-2 text-purple-400 hover:text-purple-300 hover:bg-purple-600/20 rounded-lg transition-colors"
              >
                <ChevronUp size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  name: "Garlic Fried Rice",
                  image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
                  calories: 320,
                  protein: "12g",
                  cookTime: "15 min",
                  difficulty: "Easy"
                },
                {
                  name: "Scrambled Eggs & Toast",
                  image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
                  calories: 280,
                  protein: "18g",
                  cookTime: "10 min",
                  difficulty: "Easy"
                },
                {
                  name: "Vegetable Pasta",
                  image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
                  calories: 350,
                  protein: "14g",
                  cookTime: "20 min",
                  difficulty: "Easy"
                }
              ].map((dish, index) => (
                <div key={index} className="bg-gray-700/50 rounded-lg overflow-hidden">
                  <img src={dish.image} alt={dish.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-white font-medium mb-2">{dish.name}</h3>
                    <div className="flex justify-between items-center text-sm text-gray-300 mb-4">
                      <span>{dish.calories} cal • {dish.protein} protein</span>
                      <span>{dish.cookTime} • {dish.difficulty}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                          <ArrowLeft className="w-4 h-4 text-white rotate-180" />
                        </button>
                        <button className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-white" />
                        </button>
                        <button className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                          <ChefHat className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Create Dishes Navigation */}
        {selectedOption === "create-dishes" && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Create Custom Dishes</h2>
              <button
                onClick={() => setSelectedOption(null)}
                className="p-2 text-purple-400 hover:text-purple-300 hover:bg-purple-600/20 rounded-lg transition-colors"
              >
                <ChevronUp size={20} />
              </button>
            </div>
            <div className="text-center py-8">
              <p className="text-gray-300 mb-4">Design your own custom meals with our AI chef assistant</p>
              <Link href="/create-dishes">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                  Start Creating Dishes
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {/* Take-Out Navigation */}
        {selectedOption === "take-out" && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Take-Out Ordering</h2>
              <button
                onClick={() => setSelectedOption(null)}
                className="p-2 text-purple-400 hover:text-purple-300 hover:bg-purple-600/20 rounded-lg transition-colors"
              >
                <ChevronUp size={20} />
              </button>
            </div>
            <div className="text-center py-8">
              <p className="text-gray-300 mb-4">Order healthy meals from local chefs and restaurants</p>
              <Link href="/takeout">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                  Browse Take-Out Options
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {/* Card 3 - Summary */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
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
            >
              Grocery List
            </Button>
          </div>
        </Card>

        {/* Preferences Card - Main or Collapsed based on state */}
        {cardState === "expanded" && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
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

              {/* Meal Tab */}
              {activePreferencesTab === "meal" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-yellow-300 drop-shadow-lg">Meal Preferences</h3>
                  
                  {/* Required Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-yellow-300 font-bold drop-shadow-lg">Serving Size *</Label>
                      <Select value={mealServingSize} onValueChange={(value) => handleMealPreferenceChange(setMealServingSize, value)}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 person</SelectItem>
                          <SelectItem value="2">2 people</SelectItem>
                          <SelectItem value="3">3 people</SelectItem>
                          <SelectItem value="4">4 people</SelectItem>
                          <SelectItem value="5">5+ people</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-yellow-300 font-bold drop-shadow-lg">Cuisine *</Label>
                      <Select value={mealCuisine} onValueChange={(value) => handleMealPreferenceChange(setMealCuisine, value)}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
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
                      <Label className="text-yellow-300 font-bold drop-shadow-lg">Meal Type *</Label>
                      <Select value={mealMealType} onValueChange={(value) => handleMealPreferenceChange(setMealMealType, value)}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="breakfast">Breakfast</SelectItem>
                          <SelectItem value="lunch">Lunch</SelectItem>
                          <SelectItem value="dinner">Dinner</SelectItem>
                          <SelectItem value="snack">Snack</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="h-4 bg-gray-600 rounded-sm"></div>

                  {/* Optional Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-yellow-300 font-bold drop-shadow-lg">Spice Level</Label>
                      <Select value={mealSpiceLevel} onValueChange={(value) => handleMealPreferenceChange(setMealSpiceLevel, value)}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mild">Mild</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hot">Hot</SelectItem>
                          <SelectItem value="extra-hot">Extra Hot</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-yellow-300 font-bold drop-shadow-lg">Skill Level</Label>
                      <Select value={mealSkillLevel} onValueChange={(value) => handleMealPreferenceChange(setMealSkillLevel, value)}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-yellow-300 font-bold drop-shadow-lg">Cook Method</Label>
                      <Select value={mealCookMethod} onValueChange={(value) => handleMealPreferenceChange(setMealCookMethod, value)}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oven">Oven</SelectItem>
                          <SelectItem value="stovetop">Stovetop</SelectItem>
                          <SelectItem value="grill">Grill</SelectItem>
                          <SelectItem value="slow-cooker">Slow Cooker</SelectItem>
                          <SelectItem value="instant-pot">Instant Pot</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-yellow-300 font-bold drop-shadow-lg">Prep Time</Label>
                      <Select value={mealPrepTime} onValueChange={(value) => handleMealPreferenceChange(setMealPrepTime, value)}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="90">1.5 hours</SelectItem>
                        </SelectContent>
                      </Select>
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
                      } ${!isMandatoryFieldsFilled ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={isMandatoryFieldsFilled ? handleConfirmMealPreferences : undefined}
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
                        I confirm the above meal preferences
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Pantry Tab */}
              {activePreferencesTab === "pantry" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-yellow-300 drop-shadow-lg">Pantry Ingredients</h3>
                  
                  {/* Ingredient Categories */}
                  <div className="space-y-4">
                    {/* Meat & Poultry */}
                    <div>
                      <div className="h-4 bg-gray-600 rounded-sm mb-2"></div>
                      <h4 className="text-yellow-300 font-medium mb-2">Meat & Poultry (2)</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'chicken-breast', label: 'Chicken Breast' },
                          { id: 'ground-beef', label: 'Ground Beef' }
                        ].map(ingredient => (
                          <div key={ingredient.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={selectedIngredients[ingredient.id] || false}
                              onChange={() => handleIngredientToggle(ingredient.id)}
                              className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded"
                            />
                            <span className="text-gray-300 text-sm">{ingredient.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fish & Seafood */}
                    <div>
                      <div className="h-4 bg-gray-600 rounded-sm mb-2"></div>
                      <h4 className="text-yellow-300 font-medium mb-2">Fish & Seafood (2)</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'salmon', label: 'Salmon' },
                          { id: 'shrimp', label: 'Shrimp' }
                        ].map(ingredient => (
                          <div key={ingredient.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={selectedIngredients[ingredient.id] || false}
                              onChange={() => handleIngredientToggle(ingredient.id)}
                              className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded"
                            />
                            <span className="text-gray-300 text-sm">{ingredient.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Vegetables */}
                    <div>
                      <div className="h-4 bg-gray-600 rounded-sm mb-2"></div>
                      <h4 className="text-yellow-300 font-medium mb-2">Vegetables (3)</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'bell-peppers', label: 'Bell Peppers' },
                          { id: 'tomatoes', label: 'Tomatoes' },
                          { id: 'broccoli', label: 'Broccoli' }
                        ].map(ingredient => (
                          <div key={ingredient.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={selectedIngredients[ingredient.id] || false}
                              onChange={() => handleIngredientToggle(ingredient.id)}
                              className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded"
                            />
                            <span className="text-gray-300 text-sm">{ingredient.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dairy */}
                    <div>
                      <div className="h-4 bg-gray-600 rounded-sm mb-2"></div>
                      <h4 className="text-yellow-300 font-medium mb-2">Dairy (2)</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'milk', label: 'Milk' },
                          { id: 'cheese', label: 'Cheese' }
                        ].map(ingredient => (
                          <div key={ingredient.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={selectedIngredients[ingredient.id] || false}
                              onChange={() => handleIngredientToggle(ingredient.id)}
                              className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded"
                            />
                            <span className="text-gray-300 text-sm">{ingredient.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Grains */}
                    <div>
                      <div className="h-4 bg-gray-600 rounded-sm mb-2"></div>
                      <h4 className="text-yellow-300 font-medium mb-2">Grains (2)</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'rice', label: 'Rice' },
                          { id: 'pasta', label: 'Pasta' }
                        ].map(ingredient => (
                          <div key={ingredient.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={selectedIngredients[ingredient.id] || false}
                              onChange={() => handleIngredientToggle(ingredient.id)}
                              className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded"
                            />
                            <span className="text-gray-300 text-sm">{ingredient.label}</span>
                          </div>
                        ))}
                      </div>
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



        {/* Bottom positioned collapsed card */}
        {cardState === "bottom" && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-4 mt-6">
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

        {/* Bottom padding for proper scrolling */}
        <div className="pb-24"></div>
      </div>
    </div>
  );
}