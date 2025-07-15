import React, { useState, useEffect } from "react";
import { BackButton } from "@/components/ui/back-button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useLocation } from "wouter";

export default function PersonalizeDietPantryScreen() {
  const [, setLocation] = useLocation();
  
  // Tab selection state
  const [selectedTab, setSelectedTab] = useState<"diet" | "meal" | "pantry">("meal");
  
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

  // Check if coming from dietary preferences and handle completion
  useEffect(() => {
    if (mealPreferencesConfirmed && pantryConfirmed) {
      const fromDietary = localStorage.getItem("nutragenie_from_dietary");
      if (fromDietary === "true") {
        // Clear the flag and navigate back to explore recipe options
        localStorage.removeItem("nutragenie_from_dietary");
        setTimeout(() => {
          setLocation("/explore-recipe-options");
        }, 1000); // Small delay to show completion
      }
    }
  }, [mealPreferencesConfirmed, pantryConfirmed, setLocation]);

  // Toggle ingredient selection
  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  // Comprehensive ingredient categories
  const ingredientCategories = {
    "Meat": ["Chicken Breast", "Ground Beef", "Pork Chops", "Turkey", "Lamb", "Bacon", "Sausage", "Ham", "Ground Turkey", "Ribeye Steak", "Ground Pork", "Chicken Thighs"],
    "Fish & Seafood": ["Salmon", "Tuna", "Shrimp", "Cod", "Tilapia", "Crab", "Lobster", "Scallops", "Mahi-Mahi", "Halibut", "Mussels", "Clams"],
    "Vegetables": ["Bell Peppers", "Onions", "Garlic", "Tomatoes", "Carrots", "Broccoli", "Spinach", "Mushrooms", "Zucchini", "Eggplant", "Cauliflower", "Asparagus", "Green Beans", "Cucumber", "Celery", "Potatoes"],
    "Fruits": ["Apples", "Bananas", "Oranges", "Lemons", "Limes", "Berries", "Avocados", "Pineapple", "Mangoes", "Grapes", "Strawberries", "Blueberries"],
    "Dairy & Eggs": ["Eggs", "Milk", "Cheese", "Butter", "Yogurt", "Cream", "Sour Cream", "Mozzarella", "Cheddar", "Parmesan", "Feta", "Cream Cheese"],
    "Grains & Pasta": ["Rice", "Pasta", "Bread", "Quinoa", "Oats", "Flour", "Noodles", "Couscous", "Barley", "Brown Rice", "Whole Wheat", "Bulgur"],
    "Legumes & Beans": ["Black Beans", "Kidney Beans", "Chickpeas", "Lentils", "Navy Beans", "Pinto Beans", "Lima Beans", "Split Peas", "Edamame", "Soybeans"],
    "Nuts & Seeds": ["Almonds", "Walnuts", "Pecans", "Cashews", "Peanuts", "Sunflower Seeds", "Chia Seeds", "Flax Seeds", "Pumpkin Seeds", "Pine Nuts"],
    "Oils & Fats": ["Olive Oil", "Coconut Oil", "Vegetable Oil", "Canola Oil", "Sesame Oil", "Avocado Oil", "Butter", "Ghee", "Lard", "Palm Oil"],
    "Herbs & Spices": ["Basil", "Oregano", "Thyme", "Rosemary", "Cilantro", "Parsley", "Salt", "Black Pepper", "Cumin", "Paprika", "Turmeric", "Ginger"],
    "Condiments & Sauces": ["Soy Sauce", "Hot Sauce", "Ketchup", "Mustard", "Mayo", "BBQ Sauce", "Vinegar", "Honey", "Maple Syrup", "Worcestershire", "Fish Sauce", "Sriracha"],
    "Pantry Staples": ["Canned Tomatoes", "Chicken Broth", "Vegetable Broth", "Coconut Milk", "Baking Powder", "Baking Soda", "Vanilla Extract", "Sugar", "Brown Sugar", "Cornstarch"]
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
            <div className="space-y-6 pb-24">
              <h3 className="text-lg font-bold text-yellow-300">Diet Preferences Summary</h3>
              
              {/* Dietary Restrictions */}
              <div className="mb-4">
                <h4 className="text-yellow-300 font-bold text-sm mb-2">Dietary Restrictions</h4>
                <p className="text-gray-300 text-sm">Vegetarian, Low Sodium</p>
              </div>

              {/* Health Factors */}
              <div className="mb-4">
                <h4 className="text-yellow-300 font-bold text-sm mb-2">Health Factors</h4>
                <p className="text-gray-300 text-sm">Diabetes, Blood Pressure</p>
              </div>

              {/* Fitness Goals */}
              <div className="mb-4">
                <h4 className="text-yellow-300 font-bold text-sm mb-2">Fitness Goals</h4>
                <p className="text-gray-300 text-sm">Build Muscle, General Wellness</p>
              </div>

              {/* Allergies & Restrictions */}
              <div className="mb-4">
                <h4 className="text-yellow-300 font-bold text-sm mb-2">Allergies & Restrictions</h4>
                <p className="text-gray-300 text-sm">Tree Nuts, Shellfish</p>
              </div>

              {/* Nutritional Goals */}
              <div className="mb-4">
                <h4 className="text-yellow-300 font-bold text-sm mb-2">Daily Nutritional Goals</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>🔥 Calories: 1801-2000</p>
                  <p>💪 Protein: 121-140g</p>
                  <p>🌾 Carbs: 201-250g</p>
                  <p>🥑 Fat: 56-70g</p>
                  <p>🌿 Fiber: 25-30g</p>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="mb-4">
                <h4 className="text-yellow-300 font-bold text-sm mb-2">Additional Notes</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  "Prefer plant-based proteins when possible. Avoid processed foods and focus on whole grains. 
                  Need recipes that are quick to prepare on weekdays (under 30 minutes)."
                </p>
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
                    <div className="grid grid-cols-1 gap-2">
                      {ingredients.map((ingredient) => (
                        <label
                          key={ingredient}
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-600/30 cursor-pointer transition-all duration-200"
                        >
                          <input
                            type="checkbox"
                            checked={selectedIngredients.includes(ingredient)}
                            onChange={() => toggleIngredient(ingredient)}
                            className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                          />
                          <span className="text-gray-300 text-sm select-text">{ingredient}</span>
                        </label>
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