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
import { User, ChefHat, ChevronDown, ChevronUp, Sparkles, Check } from "lucide-react";
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
  legumes: ['Black Beans', 'Chickpeas', 'Lentils', 'Kidney Beans', 'Pinto Beans', 'Navy Beans', 'Split Peas', 'Edamame'],
  nuts: ['Almonds', 'Walnuts', 'Pecans', 'Cashews', 'Peanuts', 'Pine Nuts', 'Hazelnuts', 'Pistachios'],
  baking: ['Flour', 'Sugar', 'Baking Powder', 'Vanilla Extract', 'Olive Oil', 'Salt', 'Honey', 'Coconut Oil', 'Brown Sugar', 'Cocoa Powder'],
  spices: ['Black Pepper', 'Paprika', 'Cumin', 'Oregano', 'Thyme', 'Garlic Powder', 'Cinnamon', 'Turmeric', 'Chili Powder', 'Bay Leaves'],
  condiments: ['Soy Sauce', 'Hot Sauce', 'Mustard', 'Ketchup', 'Mayo', 'Vinegar', 'Worcestershire', 'BBQ Sauce', 'Sriracha', 'Tahini'],
  pantryStaples: ['Chicken Stock', 'Vegetable Broth', 'Canned Tomatoes', 'Coconut Milk', 'Fish Sauce', 'Sesame Oil', 'Maple Syrup', 'Dried Herbs', 'Sea Salt', 'Peppercorns']
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
    badges: ['High-Protein', 'Quick'],
    dishImage: (
      <div className="w-30 h-30 flex items-center justify-center text-7xl">
        🥘
      </div>
    )
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
    dishImage: (
      <div className="w-30 h-30 flex items-center justify-center text-7xl">
        🍣
      </div>
    )
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
    dishImage: (
      <div className="w-30 h-30 flex items-center justify-center text-7xl">
        🍳
      </div>
    )
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
    dishImage: (
      <div className="w-30 h-30 flex items-center justify-center text-7xl">
        🥩
      </div>
    )
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
    dishImage: (
      <div className="w-30 h-30 flex items-center justify-center text-7xl">
        🥗
      </div>
    )
  }
];

// Suggested recipes for Create a Dish view
const suggestedRecipes = [
  {
    name: 'Quick Pasta Primavera',
    ingredients: ['Pasta', 'Bell Peppers', 'Zucchini', 'Cherry Tomatoes', 'Parmesan'],
    prepTime: 10,
    cookTime: 15,
    calories: 320,
    protein: 12,
    difficulty: 'Easy',
    dishImage: (
      <div className="w-24 h-24 flex items-center justify-center text-5xl">
        🍝
      </div>
    )
  },
  {
    name: 'Honey Garlic Chicken',
    ingredients: ['Chicken Breast', 'Honey', 'Garlic', 'Soy Sauce', 'Ginger'],
    prepTime: 5,
    cookTime: 20,
    calories: 280,
    protein: 35,
    difficulty: 'Easy',
    dishImage: (
      <div className="w-24 h-24 flex items-center justify-center text-5xl">
        🍗
      </div>
    )
  },
  {
    name: 'Avocado Toast Deluxe',
    ingredients: ['Sourdough Bread', 'Avocado', 'Cherry Tomatoes', 'Eggs', 'Lime'],
    prepTime: 8,
    cookTime: 5,
    calories: 350,
    protein: 15,
    difficulty: 'Easy',
    dishImage: (
      <div className="w-24 h-24 flex items-center justify-center text-5xl">
        🥑
      </div>
    )
  },
  {
    name: 'Thai Curry Bowl',
    ingredients: ['Coconut Milk', 'Curry Paste', 'Vegetables', 'Rice', 'Basil'],
    prepTime: 15,
    cookTime: 25,
    calories: 380,
    protein: 8,
    difficulty: 'Medium',
    dishImage: (
      <div className="w-24 h-24 flex items-center justify-center text-5xl">
        🍛
      </div>
    )
  }
];

// Previous recipes (recently made)
const previousRecipes = [
  {
    name: 'Classic Caesar Salad',
    ingredients: ['Romaine', 'Parmesan', 'Croutons', 'Caesar Dressing', 'Anchovies'],
    prepTime: 10,
    cookTime: 0,
    calories: 180,
    protein: 8,
    difficulty: 'Easy',
    madeWhen: 'Made 2 days ago',
    dishImage: (
      <div className="w-24 h-24 flex items-center justify-center text-5xl">
        🥗
      </div>
    )
  },
  {
    name: 'Beef Stir Fry',
    ingredients: ['Ground Beef', 'Bell Peppers', 'Onions', 'Soy Sauce', 'Rice'],
    prepTime: 10,
    cookTime: 12,
    calories: 450,
    protein: 28,
    difficulty: 'Easy',
    madeWhen: 'Made last week',
    dishImage: (
      <div className="w-24 h-24 flex items-center justify-center text-5xl">
        🥩
      </div>
    )
  },
  {
    name: 'Pancake Stack',
    ingredients: ['Flour', 'Eggs', 'Milk', 'Butter', 'Maple Syrup'],
    prepTime: 5,
    cookTime: 15,
    calories: 480,
    protein: 12,
    difficulty: 'Easy',
    madeWhen: 'Made 5 days ago',
    dishImage: (
      <div className="w-24 h-24 flex items-center justify-center text-5xl">
        🥞
      </div>
    )
  },
  {
    name: 'Chicken Quesadilla',
    ingredients: ['Chicken Breast', 'Cheese', 'Tortillas', 'Bell Peppers', 'Onions'],
    prepTime: 8,
    cookTime: 10,
    calories: 520,
    protein: 32,
    difficulty: 'Easy',
    madeWhen: 'Made yesterday',
    dishImage: (
      <div className="w-24 h-24 flex items-center justify-center text-5xl">
        🌮
      </div>
    )
  }
];

export default function RecipesScreen() {
  const [, setLocation] = useLocation();
  const [userData] = useLocalStorage<any>("userData", null);
  
  // Card visibility states
  const [currentView, setCurrentView] = useState<"pantry" | "dishes" | "create">("pantry");
  
  // Dietary preferences state (Card 1)
  const [selectedCuisine, setSelectedCuisine] = useState("american");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState("mild");
  const [servingSize, setServingSize] = useState("2");
  
  // Pantry ingredients state (Card 2)
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customIngredient, setCustomIngredient] = useState("");
  
  // Selected dishes state
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);
  
  // Custom dish creation state
  const [customDishName, setCustomDishName] = useState("");
  const [customDishServings, setCustomDishServings] = useState("2");
  
  // Maximum dish selection limit
  const MAX_DISH_SELECTION = 5;
  
  // Helper function to calculate total selected dishes
  const getTotalSelectedDishes = () => {
    let total = selectedDishes.length;
    if (customDishName.trim()) {
      total += 1;
    }
    return total;
  };
  
  // Collapsible states for ingredient categories
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
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

  const toggleDishSelection = (dishId: string) => {
    setSelectedDishes(prev => {
      if (prev.includes(dishId)) {
        // Deselecting - always allow
        return prev.filter(id => id !== dishId);
      } else {
        // Selecting - check if we're at limit
        const totalSelected = getTotalSelectedDishes();
        if (totalSelected >= MAX_DISH_SELECTION) {
          // Don't add if at max limit
          return prev;
        }
        return [...prev, dishId];
      }
    });
  };

  const generateRecipe = () => {
    if (currentView === "dishes" && selectedDishes.length > 0) {
      // Store selected recipes in localStorage for recipe details page
      localStorage.setItem("selected_recipes", JSON.stringify(selectedDishes));
      setLocation("/recipe-details");
    } else {
      // Navigate to meal planning (Chef Recommends)
      setLocation("/review-recipes");
    }
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
                  {currentView === "pantry" ? "Select available ingredients" : 
                   currentView === "dishes" ? "Dishes you can make right now" : 
                   "Create custom dishes and browse recipes"}
                </p>
              </div>
              <div className="flex flex-col items-center ml-4">
                <div className="flex items-center justify-center w-20 h-20 rounded-lg overflow-hidden bg-white">
                  <img 
                    src={currentView === "pantry" ? userAvatarSrc : chefAvatarSrc} 
                    alt={currentView === "pantry" ? "User Avatar" : "Chef Avatar"}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1 text-center">
                  {currentView === "pantry" 
                    ? (userData?.nickname || "User") 
                    : (userData?.chefNickname || "Chef")}
                </p>
              </div>
            </div>
            
            {/* Toggle Buttons */}
            <div className="flex bg-gray-100 rounded-lg p-1 mt-2">
              <button
                onClick={() => setCurrentView("pantry")}
                className={`flex-1 py-2 px-1 rounded-md text-xs font-medium transition-all ${
                  currentView === "pantry" 
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
            ) : currentView === "dishes" ? (
              /* Pantry Dishes View */
              <div className="space-y-3">
                {selectedDishes.length === 0 && (
                  <p className="text-center text-gray-600 text-sm mb-4">
                    Select dishes to generate recipes
                  </p>
                )}
                {pantryDishes.slice(0, 4).map((dish, index) => {
                  const matchingIngredients = dish.ingredients.filter(ingredient => 
                    selectedIngredients.includes(ingredient)
                  );
                  
                  // Special rectangular layout for all dishes
                  if (index <= 3) {
                    const dishId = dish.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                    const isSelected = selectedDishes.includes(dishId);
                    const isDisabled = !isSelected && getTotalSelectedDishes() >= MAX_DISH_SELECTION;
                    
                    return (
                      <div 
                        key={dish.name} 
                        className={`bg-gradient-to-r from-indigo-50 to-purple-50 border-2 rounded-lg overflow-hidden transition-all relative ${
                          isDisabled ? 'opacity-50 cursor-not-allowed border-gray-200' :
                          isSelected ? 'border-indigo-500 bg-indigo-100 cursor-pointer' : 'border-indigo-200 hover:border-indigo-300 cursor-pointer'
                        }`}
                        onClick={() => !isDisabled && toggleDishSelection(dishId)}
                      >
                        {/* Selection Checkbox */}
                        <div className="absolute bottom-2 right-2 z-10">
                          <Checkbox
                            checked={isSelected}
                            onChange={() => {}}
                            className="pointer-events-none w-6 h-6"
                          />
                        </div>
                        {/* Full width image at top */}
                        <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-violet-200 relative flex items-center justify-center">
                          {/* Background ingredients and kitchen items */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            {index === 0 && (
                              // Chicken Stir Fry ingredients
                              <>
                                {/* Top left bunch of carrots */}
                                <div className="absolute top-1 left-2 text-lg opacity-60">
                                  <span>🥕</span><span className="ml-1">🥕</span><span className="ml-1">🥕</span>
                                </div>
                                
                                {/* Top right cluster of garlic and onions */}
                                <div className="absolute top-2 right-2 text-sm opacity-50">
                                  <div>🧄🧄🧄</div>
                                  <div className="mt-1">🧅🧅</div>
                                </div>
                                
                                {/* Left side bell pepper bunch */}
                                <div className="absolute left-1 top-12 text-lg opacity-55">
                                  <div>🫑🫑</div>
                                  <div className="mt-1">🫑</div>
                                </div>
                                
                                {/* Right side kitchen tools cluster */}
                                <div className="absolute right-1 top-16 text-base opacity-45">
                                  <div>🔪🥄</div>
                                  <div className="mt-1">🥘</div>
                                </div>
                                
                                {/* Bottom left ginger cluster */}
                                <div className="absolute bottom-3 left-3 text-sm opacity-50">
                                  <span>🫚</span><span className="ml-1">🫚</span><span className="ml-1">🫚</span>
                                </div>
                                
                                {/* Bottom right herbs and spices bunch */}
                                <div className="absolute bottom-2 right-3 text-xs opacity-40">
                                  <div>🌿🌿🌿</div>
                                  <div className="mt-1">🧂🫒🧂</div>
                                </div>
                                
                                {/* Center left cucumber cluster */}
                                <div className="absolute left-1 bottom-8 text-base opacity-45">
                                  <span>🥒</span><span className="ml-1">🥒</span>
                                </div>
                              </>
                            )}
                            
                            {index === 1 && (
                              // Mediterranean Salmon ingredients
                              <>
                                {/* Top right tomato and garlic cluster */}
                                <div className="absolute top-1 right-3 text-sm opacity-55">
                                  <div>🍅🍅🧄</div>
                                  <div className="mt-1">🍅🧄</div>
                                </div>
                                
                                {/* Left side salmon pieces */}
                                <div className="absolute left-2 top-8 text-lg opacity-60">
                                  <span>🐟</span><span className="ml-1">🐟</span>
                                </div>
                                
                                {/* Top left spinach bunch */}
                                <div className="absolute top-3 left-1 text-base opacity-50">
                                  <div>🥬🥬🥬</div>
                                </div>
                                
                                {/* Bottom right kitchen tools */}
                                <div className="absolute right-2 bottom-4 text-base opacity-45">
                                  <div>🔪</div>
                                  <div className="mt-1">🥘🥄</div>
                                </div>
                                
                                {/* Bottom left lemon and olive cluster */}
                                <div className="absolute bottom-2 left-4 text-sm opacity-50">
                                  <div>🍋🍋🫒</div>
                                  <div className="mt-1">🫒🍋</div>
                                </div>
                                
                                {/* Right side herbs scattered */}
                                <div className="absolute right-1 top-20 text-xs opacity-40">
                                  <div>🌿🌿</div>
                                  <div className="mt-1">🧂</div>
                                </div>
                              </>
                            )}
                            
                            {index === 2 && (
                              // Veggie Omelet ingredients
                              <>
                                {/* Center top egg cluster */}
                                <div className="absolute top-2 left-12 text-lg opacity-60">
                                  <span>🥚</span><span className="ml-1">🥚</span><span className="ml-1">🥚</span>
                                </div>
                                
                                {/* Left side cheese and butter */}
                                <div className="absolute left-1 top-10 text-sm opacity-55">
                                  <div>🧀🧀</div>
                                  <div className="mt-2">🧈🧈</div>
                                </div>
                                
                                {/* Right side bell pepper bunch */}
                                <div className="absolute right-3 top-6 text-base opacity-50">
                                  <div>🫑🫑</div>
                                  <div className="mt-1">🫑</div>
                                </div>
                                
                                {/* Bottom left spinach cluster */}
                                <div className="absolute bottom-4 left-2 text-lg opacity-50">
                                  <div>🥬🥬🥬</div>
                                </div>
                                
                                {/* Top right kitchen tools */}
                                <div className="absolute top-1 right-1 text-base opacity-45">
                                  <div>🔪🥄</div>
                                  <div className="mt-1">🥘</div>
                                </div>
                                
                                {/* Bottom right seasonings */}
                                <div className="absolute bottom-1 right-4 text-xs opacity-40">
                                  <div>🌿🧂</div>
                                  <div className="mt-1">🫒</div>
                                </div>
                              </>
                            )}
                            
                            {index === 3 && (
                              // Beef & Potato Skillet ingredients
                              <>
                                {/* Bottom left potato cluster */}
                                <div className="absolute bottom-1 left-1 text-base opacity-60">
                                  <div>🥔🥔🥔</div>
                                  <div className="mt-1">🥔</div>
                                </div>
                                
                                {/* Top center beef pieces */}
                                <div className="absolute top-3 left-8 text-lg opacity-65">
                                  <span>🥩</span><span className="ml-1">🥩</span>
                                </div>
                                
                                {/* Right side onion and garlic */}
                                <div className="absolute right-2 top-8 text-sm opacity-55">
                                  <div>🧅🧅</div>
                                  <div className="mt-1">🧄🧄🧄</div>
                                </div>
                                
                                {/* Left top kitchen tools */}
                                <div className="absolute left-3 top-2 text-base opacity-45">
                                  <div>🔪</div>
                                  <div className="mt-1">🥘🥄</div>
                                </div>
                                
                                {/* Bottom right paprika and seasonings */}
                                <div className="absolute bottom-3 right-3 text-xs opacity-40">
                                  <div>🌶️🌶️</div>
                                  <div className="mt-1">🧂🌿</div>
                                </div>
                                
                                {/* Center right scattered herbs */}
                                <div className="absolute right-1 bottom-8 text-xs opacity-35">
                                  <div>🌿</div>
                                  <div className="mt-1">🧂</div>
                                </div>
                              </>
                            )}
                          </div>
                          
                          {/* Main dish image in center */}
                          <div className="transform scale-150 z-10 relative">
                            {dish.dishImage}
                          </div>
                        </div>
                        
                        {/* Content below */}
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{dish.name}</h4>
                            <Sparkles className="w-4 h-4 text-indigo-500" />
                          </div>
                          
                          <div className="text-xs text-gray-600 space-y-1">
                            <div>🔥 {dish.calories} cal • 💪 {dish.protein}g protein</div>
                            <div className="flex items-center gap-3">
                              <span className="text-indigo-600">{matchingIngredients.length}/{dish.ingredients.length} ingredients</span>
                              <span>⏱️ {dish.prepTime + dish.cookTime} min</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  
                  // Regular horizontal layout for other dishes
                  return (
                    <div key={dish.name} className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{dish.name}</h4>
                          </div>
                          
                          <div className="text-xs text-gray-600 space-y-1">
                            <div>🔥 {dish.calories} cal • 💪 {dish.protein}g protein</div>
                            <div className="flex items-center gap-3">
                              <span className="text-indigo-600">{matchingIngredients.length}/{dish.ingredients.length} ingredients</span>
                              <span>⏱️ {dish.prepTime + dish.cookTime} min</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="ml-4">
                          {dish.dishImage}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : currentView === "create" ? (
              /* Create a Dish View */
              <div className="space-y-4">
                {/* Custom Dish Input Card */}
                <Card className="bg-white border border-gray-200">
                  <CardHeader className="py-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 py-1">
                        <CardTitle className="text-lg leading-tight">Create Your Custom Dish</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">Design a personalized Dish</p>
                      </div>
                      <div className="flex flex-col items-center ml-4 flex-shrink-0">
                        <div className="flex items-center justify-center w-20 h-20 rounded-lg overflow-hidden bg-white">
                          <img 
                            src={userAvatarSrc} 
                            alt="User Avatar"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <p className="text-xs text-gray-600 mt-1 text-center">
                          {userData?.nickname || "User"}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Dish Name</label>
                      <Input
                        value={customDishName}
                        onChange={(e) => {
                          // Only allow changes if not at limit or if field is currently empty
                          if (!customDishName.trim() && selectedDishes.length >= MAX_DISH_SELECTION) {
                            return; // Don't allow new input if at limit
                          }
                          setCustomDishName(e.target.value);
                        }}
                        placeholder={
                          !customDishName.trim() && selectedDishes.length >= MAX_DISH_SELECTION 
                            ? "Maximum dishes selected..."
                            : "Enter your dish name..."
                        }
                        disabled={!customDishName.trim() && selectedDishes.length >= MAX_DISH_SELECTION}
                        className={`w-full text-lg py-3 ${
                          !customDishName.trim() && selectedDishes.length >= MAX_DISH_SELECTION 
                            ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>
                    <Button 
                      className="w-full bg-indigo-600 hover:bg-indigo-700"
                      disabled={!customDishName.trim()}
                      onClick={() => {
                        if (customDishName.trim()) {
                          // Handle custom dish creation
                          console.log("Creating custom dish:", customDishName);
                        }
                      }}
                    >
                      Create Custom Dish
                    </Button>
                  </CardContent>
                </Card>
                
                {/* Suggested Recipes Section */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Suggested Recipes</h4>
                  <div className="space-y-3">
                    {suggestedRecipes.map((recipe, index) => {
                      const recipeId = recipe.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                      const isSelected = selectedDishes.includes(recipeId);
                      const isDisabled = !isSelected && getTotalSelectedDishes() >= MAX_DISH_SELECTION;
                      
                      return (
                        <div 
                          key={recipe.name} 
                          className={`bg-gradient-to-r from-indigo-50 to-purple-50 border-2 rounded-lg overflow-hidden transition-all relative ${
                            isDisabled ? 'opacity-50 cursor-not-allowed border-gray-200' :
                            isSelected ? 'border-indigo-600 shadow-lg cursor-pointer' : 'border-indigo-200 hover:border-indigo-400 cursor-pointer'
                          }`}
                          onClick={() => !isDisabled && toggleDishSelection(recipeId)}
                        >
                          {/* Checkbox in bottom right */}
                          <div className="absolute bottom-3 right-3 z-10">
                            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                              isSelected ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'
                            }`}>
                              {isSelected && <Check className="w-4 h-4 text-white" />}
                            </div>
                          </div>
                          
                          {/* Compact horizontal layout */}
                          <div className="flex items-center p-3 min-h-[120px]">
                            {/* Dish Image */}
                            <div className="flex-shrink-0 flex items-center justify-center">
                              {recipe.dishImage}
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 ml-3 flex flex-col justify-center">
                              <h4 className="font-semibold text-gray-900 mb-1">{recipe.name}</h4>
                              
                              <div className="text-xs text-gray-600 space-y-1">
                                <div className="flex items-center gap-3">
                                  <span>⏱️ {recipe.prepTime + recipe.cookTime} min</span>
                                  <span>🔥 {recipe.calories} cal</span>
                                  <span>💪 {recipe.protein}g protein</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Previous Recipes Section */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Previous Recipes</h4>
                  <div className="space-y-3">
                    {previousRecipes.map((recipe, index) => {
                      const recipeId = recipe.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                      const isSelected = selectedDishes.includes(recipeId);
                      const isDisabled = !isSelected && getTotalSelectedDishes() >= MAX_DISH_SELECTION;
                      
                      return (
                        <div 
                          key={recipe.name} 
                          className={`bg-gradient-to-r from-indigo-50 to-purple-50 border-2 rounded-lg overflow-hidden transition-all relative ${
                            isDisabled ? 'opacity-50 cursor-not-allowed border-gray-200' :
                            isSelected ? 'border-indigo-600 shadow-lg cursor-pointer' : 'border-indigo-200 hover:border-indigo-400 cursor-pointer'
                          }`}
                          onClick={() => !isDisabled && toggleDishSelection(recipeId)}
                        >
                          {/* Checkbox in bottom right */}
                          <div className="absolute bottom-3 right-3 z-10">
                            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                              isSelected ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'
                            }`}>
                              {isSelected && <Check className="w-4 h-4 text-white" />}
                            </div>
                          </div>
                          
                          {/* Compact horizontal layout */}
                          <div className="flex items-center p-3 min-h-[120px]">
                            {/* Dish Image */}
                            <div className="flex-shrink-0 flex items-center justify-center">
                              {recipe.dishImage}
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 ml-3 flex flex-col justify-center">
                              <h4 className="font-semibold text-gray-900 mb-1">{recipe.name}</h4>
                              
                              <div className="text-xs text-gray-600 space-y-1">
                                <div className="flex items-center gap-3">
                                  <span>⏱️ {recipe.prepTime + recipe.cookTime} min</span>
                                  <span>🔥 {recipe.calories} cal</span>
                                  <span>💪 {recipe.protein}g protein</span>
                                </div>
                                <div className="text-gray-500">
                                  {recipe.madeWhen}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Card 4: Nutritional Adjustments */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="py-1 pb-0">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle className="text-base">Nutritional Adjustments</CardTitle>
                <p className="text-xs text-gray-600">Fine-tune your meal targets</p>
              </div>
              <div className="flex flex-col items-center ml-3">
                <div className="flex items-center justify-center w-20 h-20 rounded-lg overflow-hidden bg-white">
                  <img 
                    src={userAvatarSrc} 
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1 text-center">
                  {userData?.nickname || "User"}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-2 pb-3 px-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-gray-700">Calories</label>
                <span className="text-xs text-gray-600">{calorieRange[0]} - {calorieRange[1]} cal</span>
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
                <label className="text-xs font-medium text-gray-700">Protein</label>
                <span className="text-xs text-gray-600">{proteinRange[0]} - {proteinRange[1]}g</span>
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
                <label className="text-xs font-medium text-gray-700">Carbs</label>
                <span className="text-xs text-gray-600">{carbRange[0]} - {carbRange[1]}g</span>
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
                <label className="text-xs font-medium text-gray-700">Fiber</label>
                <span className="text-xs text-gray-600">{fiberRange[0]} - {fiberRange[1]}g</span>
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
          disabled={currentView === "pantry" ? selectedIngredients.length === 0 : selectedDishes.length === 0}
        >
          {currentView === "dishes" 
            ? "Generate Recipes"
            : currentView === "create"
            ? "Generate Recipes"
            : "Generate Meal Plan"
          }
        </Button>

        {(currentView === "dishes" || currentView === "create") && (
          <div className="text-center text-sm space-y-1">
            <p className={`${getTotalSelectedDishes() >= MAX_DISH_SELECTION ? 'text-orange-600' : 'text-gray-600'}`}>
              {getTotalSelectedDishes()}/{MAX_DISH_SELECTION} dishes selected for weekly meal plan
            </p>
            {getTotalSelectedDishes() >= MAX_DISH_SELECTION && (
              <p className="text-xs text-orange-500">
                Maximum selection reached. Deselect a dish to choose another.
              </p>
            )}
          </div>
        )}

        {currentView === "pantry" && selectedIngredients.length === 0 && (
          <p className="text-center text-sm text-gray-500">
            Select at least one ingredient to generate recipes
          </p>
        )}
        
        {currentView === "dishes" && selectedDishes.length === 0 && (
          <p className="text-center text-sm text-gray-500">
            Select dishes above to view detailed recipes with cooking instructions
          </p>
        )}
      </div>
    </div>
  );
}