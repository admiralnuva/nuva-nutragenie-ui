import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { BackButton } from "@/components/ui/back-button";
import { User, ChefHat, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Import avatar images
import userAvatar1 from "@assets/User/file_00000000092861f8a6a01284cc629bd0.png";
import userAvatar2 from "@assets/User/file_00000000144c61f58d6ed72273889fd2.png";
import userAvatar3 from "@assets/User/file_000000006df061f8bb3e4e285dff4d1f.png";
import userAvatar4 from "@assets/User/file_00000000da2061f882c7fc433368cf6a.png";

import chefAvatar1 from "@assets/Chef/file_000000008b1061f99729a5ff4af22cb2.png";
import chefAvatar2 from "@assets/Chef/file_00000000aae061fba11590016ae2044d.png";
import chefAvatar3 from "@assets/Chef/file_00000000ba9061fb818d3ba5eec439b8 (1).png";
import chefAvatar4 from "@assets/Chef/file_00000000e49c61f58b106664f70fe407.png";

// Avatar mapping
const userAvatars = {
  'user1': userAvatar1,
  'user2': userAvatar2,
  'user3': userAvatar3,
  'user4': userAvatar4,
};

const chefAvatars = {
  'chef1': chefAvatar1,
  'chef2': chefAvatar2,
  'chef3': chefAvatar3,
  'chef4': chefAvatar4,
};

// Pantry ingredients by category with first item checked by default
const pantryIngredients = {
  meat: ['Chicken Breast', 'Ground Beef', 'Turkey', 'Pork Chops', 'Bacon', 'Ground Turkey'],
  fish: ['Salmon', 'Cod', 'Shrimp', 'Tuna', 'Tilapia', 'Crab'],
  vegetables: ['Bell Peppers', 'Tomatoes', 'Cucumber', 'Broccoli', 'Cauliflower', 'Zucchini'],
  rootVegetables: ['Onions', 'Garlic', 'Carrots', 'Potatoes', 'Sweet Potatoes', 'Ginger'],
  leafyVegetables: ['Spinach', 'Lettuce', 'Kale', 'Arugula', 'Basil', 'Cilantro'],
  dairy: ['Milk', 'Eggs', 'Butter', 'Cheese', 'Greek Yogurt', 'Cream'],
  fruits: ['Apples', 'Bananas', 'Lemons', 'Limes', 'Berries', 'Avocado'],
  baking: ['Flour', 'Sugar', 'Baking Powder', 'Vanilla Extract', 'Olive Oil', 'Salt'],
  spices: ['Black Pepper', 'Paprika', 'Cumin', 'Oregano', 'Thyme', 'Garlic Powder']
};

const cuisineTypes = [
  { label: '🇺🇸 American', value: 'american' },
  { label: '🇨🇳 Chinese', value: 'chinese' },
  { label: '🇲🇽 Mexican', value: 'mexican' },
  { label: '🇯🇵 Japanese', value: 'japanese' },
  { label: '🇮🇳 Indian', value: 'indian' },
  { label: '🇬🇷 Mediterranean', value: 'mediterranean' }
];

const mealTypes = [
  { label: '🥞 Breakfast', value: 'breakfast' },
  { label: '🥙 Lunch', value: 'lunch' },
  { label: '🍽️ Dinner', value: 'dinner' },
  { label: '🍿 Snack', value: 'snack' },
  { label: '🍲 Soup', value: 'soup' },
  { label: '🥗 Salad', value: 'salad' }
];

const spiceLevels = [
  { label: '😊 Mild', value: 'mild' },
  { label: '🌶️ Medium', value: 'medium' },
  { label: '🔥 Spicy', value: 'spicy' }
];

// Enhanced pantry dishes with matching ingredients
const pantryDishes = [
  {
    name: 'Chicken Stir Fry',
    ingredients: ['Chicken Breast', 'Bell Peppers', 'Onions', 'Garlic', 'Olive Oil'],
    prepTime: 15,
    cookTime: 12,
    calories: 320,
    protein: 28,
    difficulty: 'Easy',
    badges: ['High-Protein', 'Quick']
  },
  {
    name: 'Mediterranean Salmon',
    ingredients: ['Salmon', 'Tomatoes', 'Spinach', 'Garlic', 'Olive Oil', 'Lemons'],
    prepTime: 10,
    cookTime: 18,
    calories: 380,
    protein: 32,
    difficulty: 'Medium',
    badges: ['Heart-Healthy', 'Mediterranean']
  },
  {
    name: 'Veggie Omelet',
    ingredients: ['Eggs', 'Bell Peppers', 'Spinach', 'Cheese', 'Butter'],
    prepTime: 5,
    cookTime: 8,
    calories: 280,
    protein: 22,
    difficulty: 'Easy',
    badges: ['Vegetarian', 'Quick']
  },
  {
    name: 'Beef & Potato Skillet',
    ingredients: ['Ground Beef', 'Potatoes', 'Onions', 'Garlic', 'Paprika'],
    prepTime: 12,
    cookTime: 25,
    calories: 420,
    protein: 26,
    difficulty: 'Medium',
    badges: ['Hearty', 'One-Pan']
  },
  {
    name: 'Greek Salad Bowl',
    ingredients: ['Tomatoes', 'Cucumber', 'Cheese', 'Olive Oil', 'Oregano'],
    prepTime: 8,
    cookTime: 0,
    calories: 180,
    protein: 8,
    difficulty: 'Easy',
    badges: ['No-Cook', 'Mediterranean']
  }
];

export default function RecipesScreen() {
  const [, setLocation] = useLocation();
  const [userData] = useLocalStorage<any>("userData", null);
  
  // Card visibility states
  const [currentView, setCurrentView] = useState<"pantry" | "dishes">("pantry");
  
  // Dietary preferences state (Card 1)
  const [selectedCuisine, setSelectedCuisine] = useState("american");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState("mild");
  const [servingSize, setServingSize] = useState("2");
  
  // Pantry ingredients state (Card 2)
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customIngredient, setCustomIngredient] = useState("");
  
  // Collapsible states for ingredient categories
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    meat: true,
    fish: false,
    vegetables: false,
    rootVegetables: false,
    leafyVegetables: false,
    dairy: false,
    fruits: false,
    baking: false,
    spices: false
  });

  // Nutritional adjustments (Card 3)
  const [calorieRange, setCalorieRange] = useState([300, 600]);
  const [proteinRange, setProteinRange] = useState([15, 40]);
  const [carbRange, setCarbRange] = useState([20, 60]);
  const [fiberRange, setFiberRange] = useState([5, 25]);

  // Get user avatar
  const userAvatarSrc = userData && userData.avatar ? userAvatars[userData.avatar as keyof typeof userAvatars] : userAvatar1;
  const chefAvatarSrc = userData && userData.chefAvatar ? chefAvatars[userData.chefAvatar as keyof typeof chefAvatars] : chefAvatar1;

  // Initialize with first ingredient from each category checked
  useEffect(() => {
    const firstIngredients = Object.values(pantryIngredients).map(category => category[0]);
    setSelectedIngredients(firstIngredients);
  }, []);

  // Filter dishes based on selected ingredients
  const getMatchingDishes = () => {
    return pantryDishes.filter(dish => {
      const matchingIngredients = dish.ingredients.filter(ingredient => 
        selectedIngredients.includes(ingredient)
      );
      return matchingIngredients.length >= 2; // Need at least 2 matching ingredients
    }).sort((a, b) => {
      // Sort by number of matching ingredients (descending)
      const aMatches = a.ingredients.filter(ingredient => selectedIngredients.includes(ingredient)).length;
      const bMatches = b.ingredients.filter(ingredient => selectedIngredients.includes(ingredient)).length;
      return bMatches - aMatches;
    });
  };

  const handleIngredientToggle = (ingredient: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const addCustomIngredient = () => {
    if (customIngredient.trim() && !selectedIngredients.includes(customIngredient.trim())) {
      setSelectedIngredients(prev => [...prev, customIngredient.trim()]);
      setCustomIngredient("");
    }
  };

  const generateRecipe = () => {
    // Navigate to recipe generation results
    setLocation("/review-recipes");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-24">
      <div className="max-w-md mx-auto p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <BackButton to="/home" />
          <h1 className="text-xl font-bold text-gray-900">NutraGenie</h1>
          <div className="w-10"></div>
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-gray-900">Explore Recipes</h2>
        </div>

        {/* Card 1: Dietary Preferences Summary */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="py-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">Dietary Preferences</CardTitle>
                <div className="space-y-1 mt-1">
                  {/* Dietary Restrictions Row */}
                  {userData?.dietaryRestrictions && userData.dietaryRestrictions.length > 0 && (
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Dietary:</span> {userData.dietaryRestrictions.slice(0, 3).join(', ')}
                      {userData.dietaryRestrictions.length > 3 && ` +${userData.dietaryRestrictions.length - 3} more`}
                    </div>
                  )}
                  
                  {/* Health Goals Row */}
                  {userData?.healthGoals && userData.healthGoals.length > 0 && (
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Health:</span> {userData.healthGoals.slice(0, 2).join(', ')}
                      {userData.healthGoals.length > 2 && ` +${userData.healthGoals.length - 2} more`}
                    </div>
                  )}
                  
                  {/* Allergies Row */}
                  {userData?.allergies && userData.allergies.trim() && (
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Allergies:</span> {userData.allergies}
                    </div>
                  )}
                  
                  {/* Food Dislikes Row */}
                  {userData?.foodDislikes && userData.foodDislikes.trim() && (
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Dislikes:</span> {userData.foodDislikes}
                    </div>
                  )}
                  
                  {/* Additional Notes Row */}
                  {userData?.additionalNotes && userData.additionalNotes.trim() && (
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Notes:</span> {userData.additionalNotes}
                    </div>
                  )}
                  
                  {/* Fallback message if no data */}
                  {(!userData?.dietaryRestrictions || userData.dietaryRestrictions.length === 0) &&
                   (!userData?.healthGoals || userData.healthGoals.length === 0) &&
                   (!userData?.allergies || !userData.allergies.trim()) &&
                   (!userData?.foodDislikes || !userData.foodDislikes.trim()) &&
                   (!userData?.additionalNotes || !userData.additionalNotes.trim()) && (
                    <div className="text-xs text-gray-500 italic">
                      No dietary preferences set. Update in profile to see personalized recommendations.
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center w-20 h-20 rounded-lg overflow-hidden bg-white ml-4">
                <img 
                  src={userAvatarSrc} 
                  alt="User Avatar"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Card 2: Meal Preferences */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="py-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">Meal Preferences</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Plan your next delicious meal</p>
              </div>
              <div className="flex items-center justify-center w-20 h-20 rounded-lg overflow-hidden bg-white ml-4">
                <img 
                  src={userAvatarSrc} 
                  alt="User Avatar"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Cuisine</label>
                  <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cuisine type" />
                    </SelectTrigger>
                    <SelectContent>
                      {cuisineTypes.map(cuisine => (
                        <SelectItem key={cuisine.value} value={cuisine.value}>
                          {cuisine.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Servings</label>
                  <Select value={servingSize} onValueChange={setServingSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Servings" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 10}, (_, i) => i + 1).map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'serving' : 'servings'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Meal Type</label>
                  <Select value={selectedMealType} onValueChange={setSelectedMealType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {mealTypes.map(meal => (
                        <SelectItem key={meal.value} value={meal.value}>
                          {meal.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Spice Level</label>
                  <Select value={selectedSpiceLevel} onValueChange={setSelectedSpiceLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Spice" />
                    </SelectTrigger>
                    <SelectContent>
                      {spiceLevels.map(spice => (
                        <SelectItem key={spice.value} value={spice.value}>
                          {spice.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Pantry View Toggle */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="py-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">Your Pantry Ingredients</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  {currentView === "pantry" ? "Select available ingredients" : "Recipes you can make right now"}
                </p>
              </div>
              <div className="flex items-center justify-center w-20 h-20 rounded-lg overflow-hidden bg-white ml-4">
                <img 
                  src={currentView === "pantry" ? userAvatarSrc : chefAvatarSrc} 
                  alt={currentView === "pantry" ? "User Avatar" : "Chef Avatar"}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
            
            {/* Toggle Buttons */}
            <div className="flex bg-gray-100 rounded-lg p-1 mt-2">
              <button
                onClick={() => setCurrentView("pantry")}
                className={`flex-1 py-3 px-2 rounded-md text-sm font-medium transition-all ${
                  currentView === "pantry" 
                    ? "bg-indigo-600 text-white shadow-lg" 
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                Pantry Ingredients
              </button>
              <button
                onClick={() => setCurrentView("dishes")}
                className={`flex-1 py-3 px-2 rounded-md text-sm font-medium transition-all ${
                  currentView === "dishes" 
                    ? "bg-indigo-600 text-white shadow-lg" 
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                Pantry Recipes
              </button>
            </div>
          </CardHeader>
          
          <CardContent>
            {currentView === "pantry" ? (
              <div className="space-y-2">
                {/* Ingredient Categories */}
                {Object.entries(pantryIngredients).map(([category, ingredients]) => (
                  <Collapsible 
                    key={category} 
                    open={openCategories[category]} 
                    onOpenChange={() => toggleCategory(category)}
                  >
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between w-full py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <span className="font-medium text-gray-900 capitalize">
                          {category.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {ingredients.filter(ingredient => selectedIngredients.includes(ingredient)).length}/{ingredients.length}
                          </Badge>
                          {openCategories[category] ? (
                            <ChevronUp className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          )}
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="grid grid-cols-2 gap-2 mt-2 ml-3">
                        {ingredients.map((ingredient, index) => (
                          <div key={ingredient} className="flex items-center space-x-2">
                            <Checkbox
                              id={ingredient}
                              checked={selectedIngredients.includes(ingredient)}
                              onCheckedChange={() => handleIngredientToggle(ingredient)}
                              className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                            />
                            <label 
                              htmlFor={ingredient} 
                              className={`text-sm cursor-pointer ${
                                index === 0 ? 'font-medium text-indigo-600' : 'text-gray-700'
                              }`}
                            >
                              {ingredient}
                            </label>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}

                {/* Custom Ingredient Input */}
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add custom ingredient..."
                      value={customIngredient}
                      onChange={(e) => setCustomIngredient(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addCustomIngredient()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={addCustomIngredient}
                      disabled={!customIngredient.trim()}
                      size="sm"
                    >
                      Add
                    </Button>
                  </div>
                </div>

                {/* Selected Ingredients Display */}
                <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                  <div className="text-sm font-medium text-indigo-800 mb-2">
                    Selected Ingredients ({selectedIngredients.length})
                  </div>
                  {selectedIngredients.length > 0 ? (
                    <div className="text-xs text-indigo-700 leading-relaxed">
                      {selectedIngredients.join(', ')}
                    </div>
                  ) : (
                    <div className="text-xs text-indigo-600">No ingredients selected</div>
                  )}
                </div>
              </div>
            ) : (
              /* Recommended Dishes View */
              <div className="space-y-3">
                {getMatchingDishes().length === 0 ? (
                  <div className="text-center py-8">
                    <ChefHat className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">Select more ingredients to see recipe recommendations</p>
                  </div>
                ) : (
                  getMatchingDishes().map((dish, index) => {
                    const matchingIngredients = dish.ingredients.filter(ingredient => 
                      selectedIngredients.includes(ingredient)
                    );
                    
                    return (
                      <div key={dish.name} className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-gray-900">{dish.name}</h4>
                              {index === 0 && <Sparkles className="w-4 h-4 text-indigo-500" />}
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mb-2">
                              {dish.badges.map(badge => (
                                <Badge key={badge} variant="secondary" className="text-xs">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="text-xs text-gray-600 space-y-1">
                              <div>⏱️ {dish.prepTime + dish.cookTime} min • 🔥 {dish.calories} cal • 💪 {dish.protein}g protein</div>
                              <div className="flex items-center gap-1">
                                <span className="font-medium">Matching:</span>
                                <span className="text-indigo-600">{matchingIngredients.length}/{dish.ingredients.length} ingredients</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Card 4: Nutritional Adjustments */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="py-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">Nutritional Adjustments</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Fine-tune your meal targets</p>
              </div>
              <div className="flex items-center justify-center w-20 h-20 rounded-lg overflow-hidden bg-white ml-4">
                <img 
                  src={userAvatarSrc} 
                  alt="User Avatar"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700">Calories</label>
                <span className="text-sm text-gray-600">{calorieRange[0]} - {calorieRange[1]} cal</span>
              </div>
              <Slider
                value={calorieRange}
                onValueChange={setCalorieRange}
                max={1000}
                min={100}
                step={50}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700">Protein</label>
                <span className="text-sm text-gray-600">{proteinRange[0]} - {proteinRange[1]}g</span>
              </div>
              <Slider
                value={proteinRange}
                onValueChange={setProteinRange}
                max={60}
                min={5}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700">Carbs</label>
                <span className="text-sm text-gray-600">{carbRange[0]} - {carbRange[1]}g</span>
              </div>
              <Slider
                value={carbRange}
                onValueChange={setCarbRange}
                max={100}
                min={5}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700">Fiber</label>
                <span className="text-sm text-gray-600">{fiberRange[0]} - {fiberRange[1]}g</span>
              </div>
              <Slider
                value={fiberRange}
                onValueChange={setFiberRange}
                max={25}
                min={5}
                step={1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Generate Recipe Button */}
        <Button 
          onClick={generateRecipe}
          className="w-full py-4 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700"
          disabled={selectedIngredients.length === 0}
        >
          Generate Recipe
        </Button>

        {selectedIngredients.length === 0 && (
          <p className="text-center text-sm text-gray-500">
            Select at least one ingredient to generate recipes
          </p>
        )}
      </div>
    </div>
  );
}