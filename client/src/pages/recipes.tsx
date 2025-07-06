// @ts-nocheck
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { BackButton } from "@/components/ui/back-button";
import { DishCard } from "@/components/ui/dish-card";
import { User, ChefHat, ChevronDown, ChevronUp, Sparkles, Check, ShoppingCart } from "lucide-react";
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
  meat: ['Chicken Breast', 'Ground Beef', 'Turkey', 'Pork Chops', 'Bacon', 'Ground Turkey', 'Lamb', 'Duck', 'Sausage'],
  fish: ['Salmon', 'Cod', 'Shrimp', 'Tuna', 'Tilapia', 'Crab', 'Lobster', 'Mussels', 'Scallops', 'Anchovies'],
  vegetables: ['Bell Peppers', 'Tomatoes', 'Cucumber', 'Broccoli', 'Cauliflower', 'Zucchini', 'Eggplant', 'Mushrooms', 'Asparagus', 'Green Beans'],
  rootVegetables: ['Onions', 'Garlic', 'Carrots', 'Potatoes', 'Sweet Potatoes', 'Ginger', 'Beets', 'Turnips', 'Radishes', 'Shallots'],
  leafyVegetables: ['Spinach', 'Lettuce', 'Kale', 'Arugula', 'Basil', 'Cilantro', 'Parsley', 'Mint', 'Chard', 'Cabbage'],
  dairy: ['Milk', 'Eggs', 'Butter', 'Cheese', 'Greek Yogurt', 'Cream', 'Sour Cream', 'Cottage Cheese', 'Ricotta', 'Mozzarella'],
  fruits: ['Apples', 'Bananas', 'Lemons', 'Limes', 'Berries', 'Avocado', 'Oranges', 'Grapes', 'Pears', 'Mangoes'],
  grains: ['Rice', 'Quinoa', 'Pasta', 'Bread', 'Oats', 'Barley', 'Couscous', 'Bulgur', 'Noodles', 'Tortillas'],
  legumes: ['Black Beans', 'Chickpeas', 'Lentils', 'Kidney Beans', 'Navy Beans', 'Pinto Beans', 'Split Peas', 'Black-eyed Peas', 'Lima Beans', 'Soybeans'],
  nuts: ['Almonds', 'Walnuts', 'Pecans', 'Cashews', 'Pistachios', 'Pine Nuts', 'Brazil Nuts', 'Hazelnuts', 'Macadamia', 'Peanuts'],
  baking: ['Flour', 'Sugar', 'Baking Powder', 'Baking Soda', 'Vanilla Extract', 'Cocoa Powder', 'Yeast', 'Cornstarch', 'Powdered Sugar', 'Brown Sugar'],
  spices: ['Salt', 'Black Pepper', 'Paprika', 'Cumin', 'Garlic Powder', 'Onion Powder', 'Oregano', 'Thyme', 'Rosemary', 'Bay Leaves'],
  condiments: ['Olive Oil', 'Vegetable Oil', 'Vinegar', 'Soy Sauce', 'Hot Sauce', 'Mustard', 'Ketchup', 'Mayonnaise', 'Honey', 'Maple Syrup'],
  pantryStaples: ['Canned Tomatoes', 'Tomato Paste', 'Coconut Milk', 'Broth', 'Wine', 'Stock', 'Canned Beans', 'Pickles', 'Olives', 'Capers']
};

const cuisineTypes = [
  { label: '🍝 Italian', value: 'italian' },
  { label: '🥘 Mediterranean', value: 'mediterranean' },
  { label: '🍜 Asian', value: 'asian' },
  { label: '🌮 Mexican', value: 'mexican' },
  { label: '🥖 French', value: 'french' },
  { label: '🍛 Indian', value: 'indian' },
  { label: '🍳 American', value: 'american' },
  { label: '🥙 Middle Eastern', value: 'middle-eastern' }
];

const skillLevels = [
  { label: '👶 Beginner', value: 'beginner' },
  { label: '👨‍🍳 Intermediate', value: 'intermediate' },
  { label: '👨‍🎓 Advanced', value: 'advanced' },
  { label: '🧒 Kid Friendly', value: 'kid-friendly' }
];

const timeFriendlyOptions = [
  { label: '⚡ Quick (under 15 min)', value: 'quick' },
  { label: '⏰ Moderate (15-30 min)', value: 'moderate' },
  { label: '🕐 Long (30+ min)', value: 'long' }
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
    badges: ['High-Protein', 'Quick'],
    emoji: '🥘'
  },
  {
    name: 'Mediterranean Salmon',
    ingredients: ['Salmon', 'Tomatoes', 'Spinach', 'Garlic', 'Olive Oil', 'Lemons'],
    prepTime: 10,
    cookTime: 18,
    calories: 380,
    protein: 32,
    difficulty: 'Medium',
    badges: ['Heart-Healthy', 'Mediterranean'],
    emoji: '🍣'
  },
  {
    name: 'Veggie Omelet',
    ingredients: ['Eggs', 'Bell Peppers', 'Spinach', 'Cheese', 'Butter'],
    prepTime: 5,
    cookTime: 8,
    calories: 280,
    protein: 22,
    difficulty: 'Easy',
    badges: ['Vegetarian', 'Quick'],
    emoji: '🍳'
  },
  {
    name: 'Beef & Potato Skillet',
    ingredients: ['Ground Beef', 'Potatoes', 'Onions', 'Garlic', 'Paprika'],
    prepTime: 12,
    cookTime: 25,
    calories: 420,
    protein: 26,
    difficulty: 'Medium',
    badges: ['Hearty', 'One-Pan'],
    emoji: '🥩'
  },
  {
    name: 'Greek Salad Bowl',
    ingredients: ['Tomatoes', 'Cucumber', 'Cheese', 'Olive Oil', 'Oregano'],
    prepTime: 8,
    cookTime: 0,
    calories: 180,
    protein: 8,
    difficulty: 'Easy',
    badges: ['No-Cook', 'Mediterranean'],
    emoji: '🥗'
  }
];

// Constants
const MAX_DISH_SELECTION = 5;

export default function RecipesScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage("nutragenie_user", null) as any;
  const [userData] = useLocalStorage("userData", null);
  
  // Current view state
  const [currentView, setCurrentView] = useState("ingredients");
  const [pantryView, setPantryView] = useState("ingredients");
  
  // Form state
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [servingSize, setServingSize] = useState("4");
  const [skillLevel, setSkillLevel] = useState("");
  const [timeFriendly, setTimeFriendly] = useState("");
  
  // Ingredient selection state
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customIngredient, setCustomIngredient] = useState("");
  
  // Dish selection state
  const [selectedDishes, setSelectedDishes] = useState<number[]>([]);
  const [customDishName, setCustomDishName] = useState("");
  
  // Track maximum dishes selected for proper limiting
  const getTotalSelectedDishes = () => {
    let total = selectedDishes.length;
    if (customDishName.trim()) {
      total += 1;
    }
    return total;
  };
  
  // Collapsible states for ingredient categories
  const [openCategories, setOpenCategories] = useState({
    meat: true,
    fish: false,
    vegetables: false,
    rootVegetables: false,
    leafyVegetables: false,
    dairy: false,
    fruits: false,
    grains: false,
    legumes: false,
    nuts: false,
    baking: false,
    spices: false,
    condiments: false,
    pantryStaples: false
  });

  // Get user avatar
  const userAvatarSrc = currentUser && currentUser.avatar ? userAvatars[currentUser.avatar] : userAvatar1;
  
  // Fix chef avatar mapping
  let chefAvatarSrc = chefAvatar1;
  if (currentUser?.selectedChef?.avatar) {
    const avatarPath = currentUser.selectedChef.avatar;
    if (avatarPath.includes('chef1')) {
      chefAvatarSrc = chefAvatar1;
    } else if (avatarPath.includes('chef2')) {
      chefAvatarSrc = chefAvatar2;
    } else if (avatarPath.includes('chef3')) {
      chefAvatarSrc = chefAvatar3;
    } else if (avatarPath.includes('chef4')) {
      chefAvatarSrc = chefAvatar4;
    }
  }

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
      return matchingIngredients.length >= 2;
    }).sort((a, b) => {
      const aMatches = a.ingredients.filter(ingredient => selectedIngredients.includes(ingredient)).length;
      const bMatches = b.ingredients.filter(ingredient => selectedIngredients.includes(ingredient)).length;
      return bMatches - aMatches;
    });
  };

  const handleIngredientToggle = (ingredient) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const toggleCategory = (category) => {
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

  const toggleDishSelection = (dishId) => {
    setSelectedDishes(prev => {
      if (prev.includes(dishId)) {
        return prev.filter(id => id !== dishId);
      } else {
        const totalSelected = getTotalSelectedDishes();
        if (totalSelected >= MAX_DISH_SELECTION) {
          return prev;
        }
        return [...prev, dishId];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BackButton to="/home" />
            <h1 className="text-xl font-bold text-gray-900">NutraGenie</h1>
          </div>
          <ChefHat className="w-6 h-6 text-indigo-600" />
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto">
        {/* Card 1: User Profile */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="py-3 pb-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">Recipe Explorer</CardTitle>
                <p className="text-xs text-gray-600 mt-1">Discover delicious recipes based on your pantry</p>
                
                <div className="mt-2 space-y-1">
                  {currentUser?.dietaryRestrictions && currentUser.dietaryRestrictions.length > 0 && (
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Diet:</span> {currentUser.dietaryRestrictions.slice(0, 2).join(', ')}
                      {currentUser.dietaryRestrictions.length > 2 && ` +${currentUser.dietaryRestrictions.length - 2} more`}
                    </div>
                  )}
                  
                  {currentUser?.healthGoals && currentUser.healthGoals.length > 0 && (
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Health:</span> {currentUser.healthGoals.slice(0, 2).join(', ')}
                      {currentUser.healthGoals.length > 2 && ` +${currentUser.healthGoals.length - 2} more`}
                    </div>
                  )}
                  
                  {currentUser?.allergies && currentUser.allergies.trim() && (
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Allergies:</span> {currentUser.allergies}
                    </div>
                  )}
                  
                  {(!currentUser?.dietaryRestrictions || currentUser.dietaryRestrictions.length === 0) &&
                   (!currentUser?.healthGoals || currentUser.healthGoals.length === 0) &&
                   (!currentUser?.allergies || !currentUser.allergies.trim()) && (
                    <div className="text-xs text-gray-500 italic">
                      No dietary preferences set. Update in profile to see personalized recommendations.
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center ml-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-white">
                  <img 
                    src={userAvatarSrc} 
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1 text-center font-medium">
                  {currentUser?.nickname || "User"}
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Card 2: Meal Preferences */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="py-1 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle className="text-base">Meal Preferences</CardTitle>
                <p className="text-xs text-gray-600">Plan your next delicious meal</p>
              </div>
              <div className="flex flex-col items-center ml-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white">
                  <img 
                    src={userAvatarSrc} 
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-0.5 text-center font-medium">
                  {currentUser?.nickname || "User"}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 pt-1 pb-2">
            <div className="grid grid-cols-1 gap-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-0.5 block">Cuisine</label>
                  <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                    <SelectTrigger className="h-8">
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
                  <label className="text-xs font-medium text-gray-700 mb-0.5 block">Servings</label>
                  <Select value={servingSize} onValueChange={setServingSize}>
                    <SelectTrigger className="h-8">
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
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-0.5 block">Skill Level</label>
                  <Select value={skillLevel} onValueChange={setSkillLevel}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {skillLevels.map(level => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700 mb-0.5 block">Time Available</label>
                  <Select value={timeFriendly} onValueChange={setTimeFriendly}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeFriendlyOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Pantry Ingredients */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="py-3 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Pantry Ingredients</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPantryView(pantryView === 'ingredients' ? 'dishes' : 'ingredients')}
                  className="text-xs"
                >
                  {pantryView === 'ingredients' ? 'View Dishes' : 'View Ingredients'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-1 pb-3">
            {pantryView === 'ingredients' ? (
              <div className="space-y-3">
                {/* Ingredient Categories */}
                {Object.entries(pantryIngredients).map(([category, ingredients]) => (
                  <div key={category} className="border rounded-lg">
                    <Collapsible open={openCategories[category]} onOpenChange={() => toggleCategory(category)}>
                      <CollapsibleTrigger className="w-full p-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <Badge variant="secondary" className="text-xs">
                            {ingredients.filter(ing => selectedIngredients.includes(ing)).length}/{ingredients.length}
                          </Badge>
                        </div>
                        {openCategories[category] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </CollapsibleTrigger>
                      <CollapsibleContent className="border-t bg-gray-50">
                        <div className="p-3 grid grid-cols-2 gap-2">
                          {ingredients.map(ingredient => (
                            <div key={ingredient} className="flex items-center space-x-2">
                              <Checkbox
                                id={ingredient}
                                checked={selectedIngredients.includes(ingredient)}
                                onCheckedChange={() => handleIngredientToggle(ingredient)}
                              />
                              <label
                                htmlFor={ingredient}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {ingredient}
                              </label>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                ))}
                
                {/* Custom Ingredients */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add custom ingredient..."
                      value={customIngredient}
                      onChange={(e) => setCustomIngredient(e.target.value)}
                      className="flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && addCustomIngredient()}
                    />
                    <Button onClick={addCustomIngredient} size="sm" variant="outline">
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-sm text-gray-600 mb-3">
                  Recommended dishes based on your selected ingredients ({selectedIngredients.length} ingredients)
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {getMatchingDishes().slice(0, 5).map((dish) => (
                    <DishCard
                      key={dish.id}
                      dish={dish}
                      isSelected={selectedDishes.includes(dish.id)}
                      onSelect={toggleDishSelection}
                      onSubstitutions={(dishId) => console.log('Substitutions for:', dishId)}
                      onViewRecipe={(dishId) => console.log('View recipe for:', dishId)}
                    />
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Card 4: Recipe Generation */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="py-3 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">Recipe Generation</CardTitle>
                <p className="text-xs text-gray-600">Choose your approach</p>
              </div>
              <div className="flex flex-col items-center ml-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-white">
                  <img 
                    src={chefAvatarSrc} 
                    alt="Chef Avatar"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1 text-center font-medium">
                  {currentUser?.selectedChef?.name || "Chef Marcus"}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-1 pb-2">
            <div className="mb-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setCurrentView("ingredients")}
                  className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-all ${
                    currentView === "ingredients" 
                      ? "bg-indigo-600 text-white shadow-lg" 
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  Pantry Ingredients
                </button>
                <button
                  onClick={() => setCurrentView("dishes")}
                  className={`flex-1 py-2 px-1 rounded-md text-xs font-medium transition-all ${
                    currentView === "dishes" 
                      ? "bg-indigo-600 text-white shadow-lg" 
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  Pantry Dishes
                </button>
                <button
                  onClick={() => setCurrentView("create")}
                  className={`flex-1 py-2 px-1 rounded-md text-xs font-medium transition-all ${
                    currentView === "create" 
                      ? "bg-indigo-600 text-white shadow-lg" 
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  Create a Dish
                </button>
              </div>
            </div>

            {currentView === "ingredients" ? (
              /* Pantry Ingredients View */
              <div className="space-y-3">
                <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                  <div className="text-xs font-medium text-indigo-700 mb-2">Selected Ingredients</div>
                  <div className="flex flex-wrap gap-1">
                    {selectedIngredients.length > 0 ? (
                      selectedIngredients.slice(0, 8).map((ingredient, index) => (
                        <Badge
                          key={ingredient}
                          variant="secondary"
                          className={`text-xs ${
                            index === 0 ? 'font-medium text-indigo-600' : 'text-gray-700'
                          }`}
                        >
                          {ingredient}
                        </Badge>
                      ))
                    ) : (
                      <div className="text-xs text-indigo-600">No ingredients selected</div>
                    )}
                  </div>
                </div>
              </div>
            ) : currentView === "dishes" ? (
              /* Pantry Dishes View */
              <div className="space-y-3">
                {selectedDishes.length === 0 && (
                  <p className="text-center text-gray-600 text-sm mb-4">
                    Select dishes and cook
                  </p>
                )}
                <div className="grid grid-cols-1 gap-4">
                  {pantryDishes.slice(0, 4).map((dish, index) => {
                    const dishId = dish.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                    const isSelected = selectedDishes.includes(dishId);
                    const isDisabled = !isSelected && getTotalSelectedDishes() >= MAX_DISH_SELECTION;

                    const handleDishSelect = (selectedDishId) => {
                      if (!isDisabled) {
                        toggleDishSelection(selectedDishId);
                      }
                    };

                    const handleSubstitutions = (selectedDishId) => {
                      console.log('Substitutions for:', selectedDishId);
                    };

                    const handleViewRecipe = (selectedDishId) => {
                      console.log('View recipe for:', selectedDishId);
                    };

                    return (
                      <DishCard
                        key={dish.name}
                        dish={dish}
                        isSelected={isSelected}
                        onSelect={handleDishSelect}
                        onSubstitutions={handleSubstitutions}
                        onViewRecipe={handleViewRecipe}
                        className={isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                      />
                    );
                  })}
                </div>
                
                {/* Shopping Cart Section */}
                {selectedDishes.length > 0 && (
                  <Card className="bg-white border border-gray-200 mt-4">
                    <CardHeader className="py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="w-5 h-5 text-indigo-600" />
                          <CardTitle className="text-base">Shopping Cart</CardTitle>
                        </div>
                        <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
                          {selectedDishes.length} dishes
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="py-3">
                      <div className="space-y-3">
                        {selectedDishes.map((dishId) => {
                          const dish = pantryDishes.find(d => d.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === dishId);
                          if (!dish) return null;
                          
                          return (
                            <div key={dishId} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">{dish.emoji}</div>
                                <div>
                                  <p className="font-medium text-sm">{dish.name}</p>
                                  <p className="text-xs text-gray-600">{dish.ingredients.slice(0, 3).join(', ')}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">{dish.calories} cal</p>
                                <p className="text-xs text-gray-600">{dish.cookTime} min</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="mt-4 pt-3 border-t">
                        <Button 
                          className="w-full bg-indigo-600 hover:bg-indigo-700"
                          onClick={() => setLocation("/review-recipes")}
                        >
                          Generate Recipe ({selectedDishes.length} dishes)
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              /* Create a Dish View */
              <div className="space-y-4">
                <Card className="bg-white border border-gray-200">
                  <CardHeader className="py-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight">Custom Dish</CardTitle>
                        <p className="text-xs text-gray-600 mt-1">Create your own or let chef decide</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 py-3">
                    <div>
                      <Input
                        value={customDishName}
                        onChange={(e) => setCustomDishName(e.target.value)}
                        placeholder="Enter your dish name..."
                        className="w-full py-2"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        className="bg-indigo-600 hover:bg-indigo-700 text-sm py-2"
                        disabled={!customDishName.trim()}
                        onClick={() => setLocation("/review-recipes")}
                      >
                        Let Chef Create
                      </Button>
                      <Button 
                        variant="outline"
                        className="text-sm py-2"
                        disabled={!customDishName.trim()}
                        onClick={() => setLocation("/review-recipes")}
                      >
                        I'll Plan It
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}