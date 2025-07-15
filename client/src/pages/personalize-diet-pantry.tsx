import React, { useState, useEffect } from "react";
import { BackButton } from "@/components/ui/back-button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function PersonalizeDietPantryScreen() {
  // Tab selection state
  const [selectedTab, setSelectedTab] = useState<"diet" | "meal" | "pantry">("diet");
  
  // Confirmation states
  const [mealPreferencesConfirmed, setMealPreferencesConfirmed] = useState(false);
  const [pantryConfirmed, setPantryConfirmed] = useState(false);

  // Meal preferences state
  const [servingSize, setServingSize] = useState("2");
  const [cuisine, setCuisine] = useState("indian");
  const [mealType, setMealType] = useState("dinner");
  const [spiceLevel, setSpiceLevel] = useState("medium");
  const [skillLevel, setSkillLevel] = useState("beginner");
  const [cookMethod, setCookMethod] = useState("stovetop");
  const [prepTime, setPrepTime] = useState("30-45");

  // Pantry state
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(["Chicken Breast", "Salmon", "Bell Peppers"]);

  // Diet preferences (stored in localStorage)
  const [dietaryRestrictions] = useLocalStorage<string[]>("nutragenie_dietary_restrictions", []);
  const [healthFactors] = useLocalStorage<string[]>("nutragenie_health_factors", []);
  const [fitnessGoals] = useLocalStorage<string[]>("nutragenie_fitness_goals", []);
  const [allergies] = useLocalStorage<string[]>("nutragenie_allergies", []);
  const [nutritionalGoals] = useLocalStorage<any>("nutragenie_nutritional_goals", {});

  // Handle meal preferences confirmation
  const handleMealConfirmation = () => {
    setMealPreferencesConfirmed(true);
    setTimeout(() => {
      setSelectedTab("pantry");
    }, 500);
  };

  // Handle pantry confirmation
  const handlePantryConfirmation = () => {
    setPantryConfirmed(true);
    // Save completion status to localStorage
    localStorage.setItem("nutragenie_diet_pantry_completed", "true");
    localStorage.setItem("nutragenie_pantry_at_bottom", "true");
  };

  // Toggle ingredient selection
  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  // Ingredient categories
  const ingredientCategories = {
    "Meat": ["Chicken Breast", "Ground Beef", "Pork Chops", "Turkey", "Lamb", "Bacon", "Sausage", "Ham"],
    "Fish & Seafood": ["Salmon", "Tuna", "Shrimp", "Cod", "Tilapia", "Crab", "Lobster", "Scallops"],
    "Vegetables": ["Bell Peppers", "Onions", "Garlic", "Tomatoes", "Carrots", "Broccoli", "Spinach", "Mushrooms"],
    "Dairy & Eggs": ["Eggs", "Milk", "Cheese", "Butter", "Yogurt", "Cream", "Sour Cream", "Mozzarella"],
    "Grains & Pasta": ["Rice", "Pasta", "Bread", "Quinoa", "Oats", "Flour", "Noodles", "Couscous"]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <BackButton />
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
          <h2 className="text-lg font-semibold text-purple-300 mt-1">Personalize Diet & Pantry</h2>
        </div>
        <div className="w-8"></div>
      </div>

      <div className="space-y-6">
        {/* Main Card */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 border-l-4 border-l-indigo-500 p-4 hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300">
          {/* Tab Buttons */}
          <div className="grid grid-cols-4 gap-2 mb-6 w-full">
            <button
              onClick={() => setSelectedTab("diet")}
              className={`p-4 rounded-lg text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                selectedTab === "diet"
                  ? "bg-indigo-600 text-white border border-indigo-500 shadow-lg shadow-indigo-500/40"
                  : "bg-indigo-500 text-white border border-indigo-400 shadow-lg shadow-indigo-500/30"
              }`}
            >
              Diet
            </button>
            <button
              onClick={() => setSelectedTab("meal")}
              className={`p-4 rounded-lg text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                selectedTab === "meal"
                  ? "bg-indigo-600 text-white border border-indigo-500 shadow-lg shadow-indigo-500/40"
                  : "bg-indigo-500 text-white border border-indigo-400 shadow-lg shadow-indigo-500/30"
              }`}
            >
              Meal
            </button>
            <button
              onClick={() => setSelectedTab("pantry")}
              className={`p-4 rounded-lg text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                selectedTab === "pantry"
                  ? "bg-indigo-600 text-white border border-indigo-500 shadow-lg shadow-indigo-500/40"
                  : "bg-indigo-500 text-white border border-indigo-400 shadow-lg shadow-indigo-500/30"
              }`}
            >
              Pantry
            </button>
            {selectedTab === "pantry" && pantryConfirmed && (
              <button
                onClick={() => setPantryConfirmed(false)}
                className="p-4 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg bg-yellow-600/20 hover:bg-yellow-600/40 border border-yellow-400/30 hover:border-yellow-400/60 flex items-center justify-center"
                title="Edit Ingredients"
              >
                <Settings size={20} className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300" />
              </button>
            )}
          </div>

          {/* Diet Tab Content */}
          {selectedTab === "diet" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-yellow-300">Dietary Preferences</h3>
              
              {/* Display saved preferences */}
              <div className="space-y-3">
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <h4 className="text-sm font-bold text-yellow-300 mb-2">Dietary Restrictions:</h4>
                  <p className="text-gray-300 text-sm">{dietaryRestrictions.length > 0 ? dietaryRestrictions.join(", ") : "None selected"}</p>
                </div>
                
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <h4 className="text-sm font-bold text-yellow-300 mb-2">Health Factors:</h4>
                  <p className="text-gray-300 text-sm">{healthFactors.length > 0 ? healthFactors.join(", ") : "None selected"}</p>
                </div>
                
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <h4 className="text-sm font-bold text-yellow-300 mb-2">Fitness Goals:</h4>
                  <p className="text-gray-300 text-sm">{fitnessGoals.length > 0 ? fitnessGoals.join(", ") : "None selected"}</p>
                </div>
                
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <h4 className="text-sm font-bold text-yellow-300 mb-2">Nutritional Goals:</h4>
                  <p className="text-gray-300 text-sm">
                    Cal: {nutritionalGoals.calories || "1301-1500"}, 
                    Protein: {nutritionalGoals.protein || "71-100g"}, 
                    Carbs: {nutritionalGoals.carbs || "101-150g"}, 
                    Fat: {nutritionalGoals.fat || "36-50g"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Meal Tab Content */}
          {selectedTab === "meal" && (
            <div className="space-y-4 pb-24">
              <h3 className="text-lg font-bold text-yellow-300">Meal Preferences</h3>
              
              <div className="space-y-4">
                {/* Required Fields */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-yellow-300 font-bold text-sm mb-2 block">Serving Size *</label>
                    <Select value={servingSize} onValueChange={setServingSize}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select serving size" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="1">1 person</SelectItem>
                        <SelectItem value="2">2 people</SelectItem>
                        <SelectItem value="4">4 people</SelectItem>
                        <SelectItem value="6">6 people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-yellow-300 font-bold text-sm mb-2 block">Cuisine *</label>
                    <Select value={cuisine} onValueChange={setCuisine}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select cuisine" />
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
                  
                  <div>
                    <label className="text-yellow-300 font-bold text-sm mb-2 block">Meal Type *</label>
                    <Select value={mealType} onValueChange={setMealType}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select meal type" />
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

                {/* Separator */}
                <div className="w-full h-px bg-gray-600 my-4"></div>

                {/* Optional Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-yellow-300 font-bold text-sm mb-2 block">Spice Level</label>
                    <Select value={spiceLevel} onValueChange={setSpiceLevel}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select spice level" />
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
                    <label className="text-yellow-300 font-bold text-sm mb-2 block">Skill Level</label>
                    <Select value={skillLevel} onValueChange={setSkillLevel}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select skill level" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-yellow-300 font-bold text-sm mb-2 block">Cook Method</label>
                    <Select value={cookMethod} onValueChange={setCookMethod}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="stovetop">Stovetop</SelectItem>
                        <SelectItem value="oven">Oven</SelectItem>
                        <SelectItem value="grill">Grill</SelectItem>
                        <SelectItem value="slow-cooker">Slow Cooker</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-yellow-300 font-bold text-sm mb-2 block">Prep Time</label>
                    <Select value={prepTime} onValueChange={setPrepTime}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select prep time" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="15-30">15-30 minutes</SelectItem>
                        <SelectItem value="30-45">30-45 minutes</SelectItem>
                        <SelectItem value="45-60">45-60 minutes</SelectItem>
                        <SelectItem value="60+">60+ minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Confirmation */}
                <div className="flex items-center space-x-3 mt-6">
                  <button
                    onClick={handleMealConfirmation}
                    className={`w-8 h-8 min-w-8 min-h-8 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      mealPreferencesConfirmed
                        ? "bg-purple-600 border-purple-500 text-white"
                        : "border-purple-500 text-purple-500 hover:bg-purple-600/20"
                    }`}
                  >
                    {mealPreferencesConfirmed && "✓"}
                  </button>
                  <span 
                    onClick={handleMealConfirmation}
                    className="text-yellow-300 font-bold text-base cursor-pointer select-text hover:text-yellow-200 transition-colors"
                  >
                    I confirm the above meal preferences
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Pantry Tab Content */}
          {selectedTab === "pantry" && (
            <div className="space-y-4 pb-24">
              <h3 className="text-lg font-bold text-yellow-300">Pantry Ingredients</h3>
              
              <div className="space-y-4">
                {Object.entries(ingredientCategories).map(([category, ingredients]) => (
                  <div key={category}>
                    <h4 className="text-sm font-bold text-yellow-300 mb-2">
                      {category} ({ingredients.filter(ing => selectedIngredients.includes(ing)).length}/{ingredients.length})
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {ingredients.map((ingredient) => (
                        <button
                          key={ingredient}
                          onClick={() => toggleIngredient(ingredient)}
                          className={`p-2 rounded-lg text-sm transition-all duration-300 ${
                            selectedIngredients.includes(ingredient)
                              ? "bg-purple-600 text-white border border-purple-500"
                              : "bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600"
                          }`}
                        >
                          {selectedIngredients.includes(ingredient) && "✓ "}{ingredient}
                        </button>
                      ))}
                    </div>
                    <div className="w-full h-px bg-gray-600 my-3"></div>
                  </div>
                ))}

                {/* Confirmation */}
                <div className="flex items-center space-x-3 mt-6">
                  <button
                    onClick={handlePantryConfirmation}
                    className={`w-8 h-8 min-w-8 min-h-8 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      pantryConfirmed
                        ? "bg-purple-600 border-purple-500 text-white"
                        : "border-purple-500 text-purple-500 hover:bg-purple-600/20"
                    }`}
                  >
                    {pantryConfirmed && "✓"}
                  </button>
                  <span 
                    onClick={handlePantryConfirmation}
                    className="text-yellow-300 font-bold text-base cursor-pointer select-text hover:text-yellow-200 transition-colors"
                  >
                    I confirm the above pantry ingredients
                  </span>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}