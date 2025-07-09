import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ScreenHeader } from "@/components/ui/screen-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpandableDishCard } from "@/components/ui/expandable-dish-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Clock, Users, ChefHat, Flame, Target, Utensils, ShoppingCart, Sparkles, Plus, List, Minus, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { ProcessingAnimation, QuickProcessingAnimation } from "@/components/ui/processing-animation";

// Import user avatar images
import userAvatar1 from "@/assets/avatars/user/user1.png";
import userAvatar2 from "@/assets/avatars/user/user2.png";
import userAvatar3 from "@/assets/avatars/user/user3.png";
import userAvatar4 from "@/assets/avatars/user/user4.png";

// Import chef avatar images
import chefAvatar1 from "@/assets/avatars/chef/chef1.png";
import chefAvatar2 from "@/assets/avatars/chef/chef2.png";
import chefAvatar3 from "@/assets/avatars/chef/chef3.png";
import chefAvatar4 from "@/assets/avatars/chef/chef4.png";

const userAvatars = {
  'user1': userAvatar1,
  'user2': userAvatar2,
  'user3': userAvatar3,
  'user4': userAvatar4
};

const chefAvatars = {
  'chef1': chefAvatar1,
  'chef2': chefAvatar2,
  'chef3': chefAvatar3,
  'chef4': chefAvatar4
};

// Burger images from user's uploaded photos
const burgerImages = [
  "/images/burgers/burger1.png",
  "/images/burgers/burger2.png", 
  "/images/burgers/burger3.png",
  "/images/burgers/burger1.png", // Reusing image 1 for variation 4
  "/images/burgers/burger2.png", // Reusing image 2 for variation 5
  "/images/burgers/burger3.png"  // Reusing image 3 for variation 6
];

// Pantry dish images from user's uploaded photos
const pantryDishImages = {
  "fried-rice": "/images/pantry-dishes/fried-rice.png",
  "garlic-bread": "/images/pantry-dishes/garlic-bread.png",
  "pasta": "/images/pantry-dishes/pasta.png",
  "scrambled-eggs": "/images/pantry-dishes/scrambled-eggs.png",
  "soup": "/images/pantry-dishes/soup.png",
  "toast-and-jam": "/images/pantry-dishes/toast-and-jam.png"
};

// Chef's Choice dish images from user's uploaded photos
const chefsChoiceImages = {
  "mediterranean-bowl": "/images/chefs-choice/mediterranean-bowl.png",
  "soup": "/images/chefs-choice/soup.png",
  "quinoa-salad": "/images/chefs-choice/quinoa-salad.png",
  "stuffed-peppers": "/images/chefs-choice/stuffed-peppers.png",
  "herb-crusted-fish": "/images/chefs-choice/herb-crusted-fish.png",
  "power-smoothie-bowl": "/images/chefs-choice/power-smoothie-bowl.png"
};

export default function ExploreRecipesScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage<any>("nutragenie_user", null);
  const [tempUser] = useLocalStorage<any>("nutragenie_temp_user", null);
  
  // Get user data - check both current and temp user
  const userData = currentUser || tempUser;

  // Get user and chef avatars
  const userAvatarSrc = userData?.avatar ? userAvatars[userData.avatar as keyof typeof userAvatars] : userAvatar1;
  const chefAvatarSrc = userData?.chef ? chefAvatars[userData.chef as keyof typeof chefAvatars] : chefAvatar1;
  
  // Get dynamic avatar for Card 3 based on active selection
  const getDynamicAvatar = () => {
    if (activeCard === 'pantry-dishes' || activeCard === 'chefs-choice') {
      return chefAvatarSrc;
    }
    return userAvatarSrc;
  };

  // Meal preferences state with sequential validation
  const [mealPreferences, setMealPreferences] = useState({
    servingSize: "",
    cuisine: "",
    mealType: "",
    spiceLevel: "",
    skillLevel: "",
    cookingMethod: "",
    prepTime: ""
  });

  // Helper function to check if all fields are completed
  const isAllFieldsCompleted = () => {
    return Object.values(mealPreferences).every(value => value !== "");
  };

  // Processing animation state
  const [showProcessing, setShowProcessing] = useState(false);
  const [showPantryProcessing, setShowPantryProcessing] = useState(false);
  const [showChefsChoiceProcessing, setShowChefsChoiceProcessing] = useState(false);
  const [showPreferencesProcessing, setShowPreferencesProcessing] = useState(false);
  
  // Card collapse state
  const [isCardCollapsed, setIsCardCollapsed] = useState(false);
  const [isMealPreferencesCardCollapsed, setIsMealPreferencesCardCollapsed] = useState(false);
  const [isPantryIngredientsCollapsed, setIsPantryIngredientsCollapsed] = useState(false);
  
  // Auto-collapse effect - collapse all cards after 2 seconds on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCardCollapsed(true);
      setIsMealPreferencesCardCollapsed(true);
      setIsPantryIngredientsCollapsed(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Pantry management state
  const [activeCard, setActiveCard] = useState<string>('pantry-ingredients');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(['chicken-breast', 'salmon', 'onions', 'rice', 'milk', 'olive-oil', 'apples', 'basil', 'cumin', 'ketchup']);
  const [customIngredients, setCustomIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState<string>('');
  const [isPantryExpanded, setIsPantryExpanded] = useState<boolean>(true);
  const [isMealPreferencesExpanded, setIsMealPreferencesExpanded] = useState<boolean>(true);
  
  // Custom dish creation state - Pre-fill burger for testing
  const [customDishName, setCustomDishName] = useState('Burger');
  const [customDishIngredients, setCustomDishIngredients] = useState('ground beef, buns, lettuce, tomato, onion, cheese');
  const [customCookingStyle, setCustomCookingStyle] = useState('Grilled');
  const [customPrepTime, setCustomPrepTime] = useState('Under 15 min');
  const [customDifficulty, setCustomDifficulty] = useState('Easy');
  const [showDishVariations, setShowDishVariations] = useState(false);

  // Ingredient categories
  const ingredientCategories = {
    'Meat': ['chicken-breast', 'ground-beef', 'pork-chops', 'turkey', 'lamb', 'bacon', 'ham', 'sausage'],
    'Fish': ['salmon', 'tuna', 'cod', 'shrimp', 'crab', 'tilapia', 'mahi-mahi', 'scallops'],
    'Vegetables': ['onions', 'garlic', 'tomatoes', 'carrots', 'broccoli', 'spinach', 'bell-peppers', 'mushrooms', 'zucchini', 'potatoes'],
    'Grains': ['rice', 'pasta', 'quinoa', 'bread', 'oats', 'barley', 'couscous', 'bulgur'],
    'Dairy': ['milk', 'cheese', 'yogurt', 'butter', 'eggs', 'cream-cheese', 'sour-cream', 'heavy-cream'],
    'Pantry': ['olive-oil', 'salt', 'pepper', 'flour', 'sugar', 'vinegar', 'soy-sauce', 'honey', 'garlic-powder'],
    'Fruits': ['apples', 'bananas', 'lemons', 'limes', 'oranges', 'berries', 'avocados', 'grapes'],
    'Herbs': ['basil', 'oregano', 'thyme', 'rosemary', 'parsley', 'cilantro', 'mint', 'dill'],
    'Spices': ['cumin', 'paprika', 'chili-powder', 'cinnamon', 'ginger', 'turmeric', 'bay-leaves'],
    'Condiments': ['ketchup', 'mustard', 'mayo', 'hot-sauce', 'worcestershire', 'balsamic-vinegar']
  };

  const handleIngredientToggle = (ingredient: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(item => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  // Generate 6 variations of the custom dish
  const generateDishVariations = (baseDishName: string, ingredients: string, cookingStyle: string, prepTime: string, difficulty: string) => {
    const variations = [
      'Classic',
      'Spicy',
      'Garlic & Herb',
      'Mediterranean',
      'Asian-Style',
      'Healthy'
    ];
    
    const cookingMethods = ['Grilled', 'Baked', 'Stir-fried', 'Steamed', 'Pan-seared', 'Roasted'];
    const difficultyLevels = ['Easy', 'Easy', 'Medium', 'Easy', 'Medium', 'Easy'];
    const calories = [320, 385, 295, 410, 345, 280];
    const cookTimes = ['15 min', '20 min', '12 min', '25 min', '18 min', '10 min'];
    
    // Check if this is a burger dish to use special images
    const isBurgerDish = baseDishName.toLowerCase().includes('burger');
    
    return variations.map((variation, index) => ({
      id: index + 1,
      name: `${variation} ${baseDishName}`,
      calories: calories[index],
      cookTime: cookTimes[index],
      difficulty: difficultyLevels[index] as "Easy" | "Medium" | "Hard",
      description: `A delicious ${variation.toLowerCase()} twist on your ${baseDishName.toLowerCase()}`,
      image: isBurgerDish ? burgerImages[index] : undefined
    }));
  };

  const handleCreateRecipe = () => {
    if (!customDishName.trim()) {
      alert('Please enter a dish name');
      return;
    }
    setShowProcessing(true);
    // Simulate processing time before showing variations
    setTimeout(() => {
      setShowProcessing(false);
      setShowDishVariations(true);
    }, 3000);
  };

  const handleGenerateRecipes = (cardType: string) => {
    setShowProcessing(true);
    // Simulate recipe generation processing
    setTimeout(() => {
      setShowProcessing(false);
      setLocation('/weekly-meal-planning');
    }, 4000);
  };

  const addCustomIngredient = () => {
    if (newIngredient.trim() && !customIngredients.includes(newIngredient.trim()) && !selectedIngredients.includes(newIngredient.trim())) {
      const ingredient = newIngredient.trim();
      setCustomIngredients(prev => [...prev, ingredient]);
      setSelectedIngredients(prev => [...prev, ingredient]);
      setNewIngredient('');
    }
  };

  // Handler functions for dish card actions
  const handleRecipeView = (dish: any) => {
    // Navigate to recipe details with ingredient and step cards
    setLocation(`/recipe-details?dish=${encodeURIComponent(dish.name)}&id=${dish.id}`);
  };

  const handleSaveRecipe = (dish: any) => {
    // Save recipe to localStorage for Profile page access
    const savedRecipes = JSON.parse(localStorage.getItem("nutragenie_saved_recipes") || "[]");
    const newRecipe = {
      id: dish.id,
      name: dish.name,
      calories: dish.calories,
      cookTime: dish.cookTime,
      difficulty: dish.difficulty,
      savedDate: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
    
    // Check if recipe already saved
    const isAlreadySaved = savedRecipes.some((recipe: any) => recipe.id === dish.id);
    if (!isAlreadySaved) {
      savedRecipes.unshift(newRecipe); // Add to beginning of array
      localStorage.setItem("nutragenie_saved_recipes", JSON.stringify(savedRecipes));
      alert(`"${dish.name}" saved to your profile!`);
    } else {
      alert(`"${dish.name}" is already saved in your profile.`);
    }
  };

  const handleCookNow = (dish: any) => {
    // Navigate to voice cooking with dish information
    setLocation(`/voice-cooking?dish=${encodeURIComponent(dish.name)}&id=${dish.id}`);
  };

  // Format dietary preferences data into text rows (max 6 rows)
  const formatDietaryData = () => {
    const rows = [];
    
    // Helper function to capitalize first letter of each word
    const capitalizeWords = (str: string) => {
      return str.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    };

    // Row 1: Dietary Restrictions (comma-separated)
    if (userData?.dietaryRestrictions && userData.dietaryRestrictions.length > 0) {
      const formattedRestrictions = userData.dietaryRestrictions.map(restriction => 
        capitalizeWords(restriction)
      );
      rows.push({ value: formattedRestrictions.join(", ") });
    }
    
    // Row 2: Health Conditions (comma-separated)
    if (userData?.healthGoals && userData.healthGoals.length > 0) {
      const healthConditions = userData.healthGoals.filter((goal: string) => 
        ['diabetes', 'cardiovascular', 'kidney', 'blood-pressure', 'cancer', 'bone-health'].includes(goal)
      );
      if (healthConditions.length > 0) {
        const formattedConditions = healthConditions.map(condition => 
          capitalizeWords(condition)
        );
        rows.push({ value: formattedConditions.join(", ") });
      }
      
      // Row 3: Fitness Goals (comma-separated)
      const fitnessGoals = userData.healthGoals.filter((goal: string) => 
        ['build-muscle', 'lose-weight', 'endurance', 'wellness'].includes(goal)
      );
      if (fitnessGoals.length > 0) {
        const formattedGoals = fitnessGoals.map(goal => 
          capitalizeWords(goal)
        );
        rows.push({ value: formattedGoals.join(", ") });
      }
    }
    
    // Row 4: Allergies with label
    if (userData?.allergies && userData.allergies.trim()) {
      rows.push({ label: "Allergies", value: userData.allergies });
    }
    
    // Row 5 & 6: Nutritional Goals Summary (2x2 grid)
    if (userData?.selectedCalorieRange || userData?.selectedProteinRange || userData?.selectedCarbRange || userData?.selectedFatRange) {
      // Row 1: Goals with Cal and Protein
      const firstRowParts = [];
      if (userData.selectedCalorieRange) firstRowParts.push(`Cal (${userData.selectedCalorieRange})`);
      if (userData.selectedProteinRange) firstRowParts.push(`Protein (${userData.selectedProteinRange}g)`);
      
      if (firstRowParts.length > 0) {
        rows.push({ label: "Goals", value: firstRowParts.join(", ") });
      }
      
      // Row 2: Carbs and Fat
      const secondRowParts = [];
      if (userData.selectedCarbRange) secondRowParts.push(`Carbs (${userData.selectedCarbRange}g)`);
      if (userData.selectedFatRange) secondRowParts.push(`Fat (${userData.selectedFatRange}g)`);
      
      if (secondRowParts.length > 0) {
        rows.push({ value: secondRowParts.join(", ") });
      }
    }
    
    return rows.slice(0, 6); // Ensure max 6 rows
  };

  const dietaryRows = formatDietaryData();
  
  // Check if user has any dietary data
  const hasDietaryData = userData?.dietaryRestrictions || userData?.healthGoals || userData?.allergies;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6">
      {showProcessing && (
        <ProcessingAnimation 
          onComplete={() => setShowProcessing(false)}
          duration={3000}
        />
      )}
      <div className="max-w-md mx-auto pt-2">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => setLocation("/dietary")}
            className="text-white hover:text-purple-300 transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
            <p className="text-lg font-semibold text-purple-300 mt-1">Explore Recipe Options</p>
          </div>
          <div className="w-8"></div>
        </div>

        <div className="space-y-4">
          {/* Card 1: Dietary Preferences Summary */}
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white">Your dietary preferences:</CardTitle>
                <button 
                  onClick={() => setIsCardCollapsed(!isCardCollapsed)}
                  className="text-purple-400 hover:text-purple-300 transition-colors bg-purple-600/20 hover:bg-purple-600/40 rounded-full p-2"
                >
                  {isCardCollapsed ? (
                    <ChevronDown size={42} />
                  ) : (
                    <ChevronUp size={42} />
                  )}
                </button>
              </div>
            </CardHeader>
            
            {/* Content with smooth collapse animation */}
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isCardCollapsed ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
            }`}>
              <CardContent>
                <div className="text-gray-300">
                  {!userData ? (
                    <div>
                      <p className="text-gray-400 text-sm mb-3">Please create your account first to view dietary preferences</p>
                      <button 
                        onClick={() => setLocation("/nuva-signup")}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
                      >
                        Create Account
                      </button>
                    </div>
                  ) : dietaryRows.length > 0 ? (
                    <div className="space-y-0">
                      {dietaryRows.map((row, index) => (
                        <div key={index} className="flex items-center text-sm py-0.5">
                          {row.label ? (
                            <>
                              <span className="font-medium text-gray-300">{row.label}:</span>
                              <span className="text-gray-400 ml-2">{row.value}</span>
                            </>
                          ) : (
                            <span className="text-gray-400">{row.value}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm py-2">No dietary preferences set</p>
                  )}
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Preferences Processing Animation */}
          {showPreferencesProcessing && (
            <ProcessingAnimation
              title="Saving Your Preferences"
              subtitle="Adding your preferences to be used for all your dishes"
              steps={[
                "Storing your meal preferences",
                "Configuring recipe recommendations", 
                "Personalizing dish suggestions",
                "Optimizing for your taste profile"
              ]}
            />
          )}

          {/* Card 2: Meal Preferences */}
          {!showPreferencesProcessing && (
            <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg text-white whitespace-nowrap">Meal Preferences</CardTitle>
                </div>
                <button 
                  onClick={() => setIsMealPreferencesCardCollapsed(!isMealPreferencesCardCollapsed)}
                  className="text-purple-400 hover:text-purple-300 transition-colors bg-purple-600/20 hover:bg-purple-600/40 rounded-full p-2"
                >
                  {isMealPreferencesCardCollapsed ? (
                    <ChevronDown size={42} />
                  ) : (
                    <ChevronUp size={42} />
                  )}
                </button>
              </div>
            </CardHeader>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isMealPreferencesCardCollapsed ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
            }`}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                {/* Serving Size */}
                <div className="space-y-2">
                  <Label htmlFor="servingSize" className="text-sm font-medium text-purple-300 flex items-center gap-2">
                    <Users size={16} className="text-purple-400" />
                    Serving Size
                  </Label>
                  <Select value={mealPreferences.servingSize} onValueChange={(value) => setMealPreferences(prev => ({...prev, servingSize: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select serving size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-person">1 person</SelectItem>
                      <SelectItem value="2-people">2 people</SelectItem>
                      <SelectItem value="3-4-people">3-4 people</SelectItem>
                      <SelectItem value="5-6-people">5-6 people</SelectItem>
                      <SelectItem value="7-8-people">7-8 people</SelectItem>
                      <SelectItem value="large-group">Large group (9+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Cuisine */}
                <div className="space-y-2">
                  <Label htmlFor="cuisine" className="text-sm font-medium text-purple-300 flex items-center gap-2">
                    <ChefHat size={16} className="text-purple-400" />
                    Cuisine
                  </Label>
                  <Select 
                    value={mealPreferences.cuisine} 
                    onValueChange={(value) => setMealPreferences(prev => ({...prev, cuisine: value}))}
                    disabled={!mealPreferences.servingSize}
                  >
                    <SelectTrigger className={!mealPreferences.servingSize ? "opacity-50 cursor-not-allowed" : ""}>
                      <SelectValue placeholder="Select cuisine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="italian">Italian</SelectItem>
                      <SelectItem value="mexican">Mexican</SelectItem>
                      <SelectItem value="asian">Asian</SelectItem>
                      <SelectItem value="american">American</SelectItem>
                      <SelectItem value="mediterranean">Mediterranean</SelectItem>
                      <SelectItem value="indian">Indian</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="thai">Thai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Meal Type */}
                <div className="space-y-2">
                  <Label htmlFor="mealType" className="text-sm font-medium text-purple-300 flex items-center gap-2">
                    <Utensils size={16} className="text-purple-400" />
                    Meal Type
                  </Label>
                  <Select 
                    value={mealPreferences.mealType} 
                    onValueChange={(value) => setMealPreferences(prev => ({...prev, mealType: value}))}
                    disabled={!mealPreferences.cuisine}
                  >
                    <SelectTrigger className={!mealPreferences.cuisine ? "opacity-50 cursor-not-allowed" : ""}>
                      <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                      <SelectItem value="snack">Snack</SelectItem>
                      <SelectItem value="dessert">Dessert</SelectItem>
                      <SelectItem value="appetizer">Appetizer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Spice Level */}
                <div className="space-y-2">
                  <Label htmlFor="spiceLevel" className="text-sm font-medium text-purple-300 flex items-center gap-2">
                    <Flame size={16} className="text-purple-400" />
                    Spice Level
                  </Label>
                  <Select 
                    value={mealPreferences.spiceLevel} 
                    onValueChange={(value) => setMealPreferences(prev => ({...prev, spiceLevel: value}))}
                    disabled={!mealPreferences.mealType}
                  >
                    <SelectTrigger className={!mealPreferences.mealType ? "opacity-50 cursor-not-allowed" : ""}>
                      <SelectValue placeholder="Select spice level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mild">Mild</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hot">Hot</SelectItem>
                      <SelectItem value="extra-hot">Extra Hot</SelectItem>
                      <SelectItem value="no-spice">No Spice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Skill Level */}
                <div className="space-y-2">
                  <Label htmlFor="skillLevel" className="text-sm font-medium text-purple-300 flex items-center gap-2">
                    <Target size={16} className="text-purple-400" />
                    Skill Level
                  </Label>
                  <Select 
                    value={mealPreferences.skillLevel} 
                    onValueChange={(value) => setMealPreferences(prev => ({...prev, skillLevel: value}))}
                    disabled={!mealPreferences.spiceLevel}
                  >
                    <SelectTrigger className={!mealPreferences.spiceLevel ? "opacity-50 cursor-not-allowed" : ""}>
                      <SelectValue placeholder="Select skill level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Cooking Method */}
                <div className="space-y-2">
                  <Label htmlFor="cookingMethod" className="text-sm font-medium text-purple-300 flex items-center gap-2">
                    <ChefHat size={16} className="text-purple-400" />
                    Cook Method
                  </Label>
                  <Select 
                    value={mealPreferences.cookingMethod} 
                    onValueChange={(value) => setMealPreferences(prev => ({...prev, cookingMethod: value}))}
                    disabled={!mealPreferences.skillLevel}
                  >
                    <SelectTrigger className={!mealPreferences.skillLevel ? "opacity-50 cursor-not-allowed" : ""}>
                      <SelectValue placeholder="Select cooking method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baking">Baking</SelectItem>
                      <SelectItem value="grilling">Grilling</SelectItem>
                      <SelectItem value="frying">Frying</SelectItem>
                      <SelectItem value="steaming">Steaming</SelectItem>
                      <SelectItem value="roasting">Roasting</SelectItem>
                      <SelectItem value="slow-cooking">Slow Cooking</SelectItem>
                      <SelectItem value="stir-frying">Stir Frying</SelectItem>
                      <SelectItem value="no-cook">No Cook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Prep Time */}
                <div className="space-y-2">
                  <Label htmlFor="prepTime" className="text-sm font-medium text-purple-300 flex items-center gap-2">
                    <Clock size={16} className="text-purple-400" />
                    Prep Time
                  </Label>
                  <Select 
                    value={mealPreferences.prepTime} 
                    onValueChange={(value) => {
                      setMealPreferences(prev => ({...prev, prepTime: value}));
                      // Show preferences processing animation
                      setShowPreferencesProcessing(true);
                      // Auto-collapse when prep time is selected (last field)
                      setTimeout(() => {
                        setIsMealPreferencesExpanded(false);
                        setShowPreferencesProcessing(false);
                      }, 3000);
                    }}
                    disabled={!mealPreferences.cookingMethod}
                  >
                    <SelectTrigger className={!mealPreferences.cookingMethod ? "opacity-50 cursor-not-allowed" : ""}>
                      <SelectValue placeholder="Select prep time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15-min">15 minutes</SelectItem>
                      <SelectItem value="30-min">30 minutes</SelectItem>
                      <SelectItem value="45-min">45 minutes</SelectItem>
                      <SelectItem value="1-hour">1 hour</SelectItem>
                      <SelectItem value="1.5-hour">1.5 hours</SelectItem>
                      <SelectItem value="2-hour">2+ hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                </div>
              </CardContent>
            </div>
            

            </Card>
          )}

          {/* Card 3 - Recipe Options */}
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg text-white whitespace-nowrap">Recipe Options</CardTitle>
                  <p className="text-gray-300 mt-1">Choose how you'd like to create your recipes</p>
                </div>
                <div className="flex flex-col items-center flex-shrink-0">
                  <img 
                    src={getDynamicAvatar()} 
                    alt="Avatar"
                    className="w-20 h-20 object-cover rounded-lg border-0"
                    style={{ border: 'none !important', outline: 'none', boxShadow: 'none', backgroundColor: 'transparent' }}
                  />
                  <p className="text-xs text-gray-300 mt-1 text-center font-medium">
                    {activeCard === 'pantry-dishes' || activeCard === 'chefs-choice' 
                      ? userData?.selectedChef?.name || "Chef"
                      : userData?.nickname || "User"
                    }
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  className={`h-14 flex flex-col items-center justify-center space-y-1 border-gray-600 hover:border-purple-400 ${
                    activeCard === 'pantry-ingredients' 
                      ? 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700' 
                      : 'bg-gray-700 hover:bg-purple-600/20'
                  }`}
                  onClick={() => setActiveCard('pantry-ingredients')}
                >
                  <ShoppingCart size={16} className={activeCard === 'pantry-ingredients' ? 'text-white' : 'text-purple-600'} />
                  <span className={`text-xs font-medium ${activeCard === 'pantry-ingredients' ? 'text-white' : 'text-gray-200'} text-center leading-tight`}>Pantry Items</span>
                </Button>

                <Button 
                  variant="outline" 
                  className={`h-14 flex flex-col items-center justify-center space-y-1 border-gray-600 hover:border-purple-400 ${
                    activeCard === 'create-dish' 
                      ? 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700' 
                      : 'bg-gray-700 hover:bg-purple-600/20'
                  }`}
                  onClick={() => setActiveCard('create-dish')}
                >
                  <Plus size={16} className={activeCard === 'create-dish' ? 'text-white' : 'text-purple-600'} />
                  <span className={`text-xs font-medium ${activeCard === 'create-dish' ? 'text-white' : 'text-gray-200'} text-center leading-tight`}>Create Dish</span>
                </Button>

                <Button 
                  variant="outline" 
                  className={`h-14 flex flex-col items-center justify-center space-y-1 border-gray-600 hover:border-purple-400 ${
                    activeCard === 'pantry-dishes' 
                      ? 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700' 
                      : 'bg-gray-700 hover:bg-purple-600/20'
                  }`}
                  onClick={() => {
                    setShowPantryProcessing(true);
                    setTimeout(() => {
                      setShowPantryProcessing(false);
                      setActiveCard('pantry-dishes');
                    }, 3000);
                  }}
                >
                  <Utensils size={16} className={activeCard === 'pantry-dishes' ? 'text-white' : 'text-purple-600'} />
                  <span className={`text-xs font-medium ${activeCard === 'pantry-dishes' ? 'text-white' : 'text-gray-200'} text-center leading-tight`}>Pantry Dishes</span>
                </Button>

                <Button 
                  variant="outline" 
                  className={`h-14 flex flex-col items-center justify-center space-y-1 border-gray-600 hover:border-purple-400 ${
                    activeCard === 'chefs-choice' 
                      ? 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700' 
                      : 'bg-gray-700 hover:bg-purple-600/20'
                  }`}
                  onClick={() => {
                    setShowChefsChoiceProcessing(true);
                    setTimeout(() => {
                      setShowChefsChoiceProcessing(false);
                      setActiveCard('chefs-choice');
                    }, 3000);
                  }}
                >
                  <Sparkles size={16} className={activeCard === 'chefs-choice' ? 'text-white' : 'text-purple-600'} />
                  <span className={`text-xs font-medium ${activeCard === 'chefs-choice' ? 'text-white' : 'text-gray-200'} text-center leading-tight`}>Chef's Choice</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pantry Dishes Processing Animation */}
          {showPantryProcessing && (
            <ProcessingAnimation
              title="Analyzing Your Pantry"
              subtitle="Finding the perfect dishes from your ingredients"
              steps={[
                "Scanning pantry ingredients",
                "Matching recipes to available items", 
                "Calculating nutrition profiles",
                "Curating personalized dishes"
              ]}
            />
          )}

          {/* Pantry Dishes Large Card */}
          {activeCard === 'pantry-dishes' && !showPantryProcessing && (
            <>
              <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 shadow-lg">
                <CardHeader className="pb-2 pt-2">
                  <CardTitle className="text-base text-purple-300 mt-2">Dishes that can be cooked from pantry ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 1, name: "Pasta", cookTime: "15 min", calories: 340, difficulty: "Easy" as const, image: pantryDishImages["pasta"] },
                      { id: 2, name: "Fried Rice", cookTime: "20 min", calories: 280, difficulty: "Easy" as const, image: pantryDishImages["fried-rice"] },
                      { id: 3, name: "Scrambled Eggs", cookTime: "5 min", calories: 190, difficulty: "Easy" as const, image: pantryDishImages["scrambled-eggs"] },
                      { id: 4, name: "Garlic Bread", cookTime: "10 min", calories: 160, difficulty: "Easy" as const, image: pantryDishImages["garlic-bread"] },
                      { id: 5, name: "Soup", cookTime: "25 min", calories: 120, difficulty: "Easy" as const, image: pantryDishImages["soup"] },
                      { id: 6, name: "Toast and Jam", cookTime: "3 min", calories: 140, difficulty: "Easy" as const, image: pantryDishImages["toast-and-jam"] }
                    ].map((dish) => (
                      <ExpandableDishCard
                        key={dish.id}
                        dish={dish}
                        onRecipe={(dish) => handleRecipeView(dish)}
                        onSaveRecipe={(dish) => handleSaveRecipe(dish)}
                        onCookNow={(dish) => handleCookNow(dish)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Chef's Choice Processing Animation */}
          {showChefsChoiceProcessing && (
            <ProcessingAnimation
              title="Chef's Choice Selection"
              subtitle="Personalizing gourmet recommendations for you"
              steps={[
                "Analyzing your dietary preferences",
                "Consulting chef's expertise",
                "Selecting premium recipes",
                "Customizing for your taste profile"
              ]}
            />
          )}

          {/* Chef's Choice Large Card */}
          {activeCard === 'chefs-choice' && !showChefsChoiceProcessing && (
            <>
              <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 shadow-lg">
                <CardHeader className="pb-2 pt-2">
                  <CardTitle className="text-base text-purple-300 mt-2">Chef's Choice of Dishes Personalized for you</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 1, name: "Mediterranean Bowl", cookTime: "30 min", calories: 420, difficulty: "Medium" as const, image: chefsChoiceImages["mediterranean-bowl"] },
                      { id: 2, name: "Soup", cookTime: "35 min", calories: 380, difficulty: "Medium" as const, image: chefsChoiceImages["soup"] },
                      { id: 3, name: "Quinoa Salad", cookTime: "20 min", calories: 310, difficulty: "Easy" as const, image: chefsChoiceImages["quinoa-salad"] },
                      { id: 4, name: "Stuffed Peppers", cookTime: "45 min", calories: 350, difficulty: "Medium" as const, image: chefsChoiceImages["stuffed-peppers"] },
                      { id: 5, name: "Herb Crusted Fish", cookTime: "25 min", calories: 290, difficulty: "Medium" as const, image: chefsChoiceImages["herb-crusted-fish"] },
                      { id: 6, name: "Power Smoothie Bowl", cookTime: "10 min", calories: 240, difficulty: "Easy" as const, image: chefsChoiceImages["power-smoothie-bowl"] }
                    ].map((dish) => (
                      <ExpandableDishCard
                        key={dish.id}
                        dish={dish}
                        onRecipe={(dish) => handleRecipeView(dish)}
                        onSaveRecipe={(dish) => handleSaveRecipe(dish)}
                        onCookNow={(dish) => handleCookNow(dish)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Create Dish Large Card */}
          {activeCard === 'create-dish' && !showDishVariations && (
            <>
              <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base text-purple-300">Create Your Custom Dish</CardTitle>
                    <div className="flex items-center">
                      <div className="rounded-lg overflow-hidden bg-gray-700 shadow-sm" style={{width: '80px', height: '80px'}}>
                        <img 
                          src={userAvatarSrc} 
                          alt="User Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Dish Name</label>
                      <Input 
                        value={customDishName}
                        onChange={(e) => setCustomDishName(e.target.value)}
                        placeholder="Enter your dish name..." 
                        className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Main Ingredients</label>
                      <Input 
                        value={customDishIngredients}
                        onChange={(e) => setCustomDishIngredients(e.target.value)}
                        placeholder="e.g., chicken, rice, vegetables..." 
                        className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Cooking Style</label>
                      <select 
                        value={customCookingStyle}
                        onChange={(e) => setCustomCookingStyle(e.target.value)}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:border-purple-400 focus:ring-purple-400"
                      >
                        <option>Grilled</option>
                        <option>Baked</option>
                        <option>Stir-fried</option>
                        <option>Steamed</option>
                        <option>Raw/Salad</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Prep Time</label>
                        <select 
                          value={customPrepTime}
                          onChange={(e) => setCustomPrepTime(e.target.value)}
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:border-purple-400 focus:ring-purple-400"
                        >
                          <option>Under 15 min</option>
                          <option>15-30 min</option>
                          <option>30-60 min</option>
                          <option>Over 1 hour</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
                        <select 
                          value={customDifficulty}
                          onChange={(e) => setCustomDifficulty(e.target.value)}
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:border-purple-400 focus:ring-purple-400"
                        >
                          <option>Easy</option>
                          <option>Medium</option>
                          <option>Advanced</option>
                        </select>
                      </div>
                    </div>
                    <Button 
                      onClick={handleCreateRecipe}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Create Recipe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Pantry Ingredients Large Card */}
          {activeCard === 'pantry-ingredients' && (
            <>
              <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
                <CardHeader className="pb-2 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="mt-2">
                      <CardTitle className="text-base text-purple-300">Select Pantry Ingredients</CardTitle>
                      <p className="text-xs text-gray-400 mt-1">Choose your available ingredients</p>
                    </div>
                    <button 
                      onClick={() => setIsPantryIngredientsCollapsed(!isPantryIngredientsCollapsed)}
                      className="text-purple-400 hover:text-purple-300 transition-colors bg-purple-600/20 hover:bg-purple-600/40 rounded-full p-2"
                    >
                      {isPantryIngredientsCollapsed ? (
                        <ChevronDown size={42} />
                      ) : (
                        <ChevronUp size={42} />
                      )}
                    </button>
                  </div>
                </CardHeader>
                
                {/* Content with smooth collapse animation */}
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isPantryIngredientsCollapsed ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
                }`}>
                  <CardContent className="space-y-2 pb-4">
                  {Object.entries(ingredientCategories).map(([category, ingredients]) => (
                    <div key={category} className="flex items-center gap-1.5 bg-gray-700/50 p-1 rounded-md shadow-lg shadow-purple-900/50 border border-purple-800">
                      <Label htmlFor={`${category}-select`} className="text-sm font-medium text-gray-200 flex items-center gap-2 min-w-[100px]">
                        <ChefHat size={16} className="text-purple-400" />
                        {category}
                      </Label>
                      <Select>
                        <SelectTrigger className="flex-1 shadow-sm border-gray-600 bg-gray-700 text-gray-200">
                          <SelectValue placeholder={`Select ${category.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {ingredients.map((ingredient) => (
                            <div 
                              key={ingredient} 
                              className="flex items-center space-x-3 p-3 hover:bg-purple-50 cursor-pointer"
                              onClick={() => handleIngredientToggle(ingredient)}
                            >
                              <Checkbox
                                id={ingredient}
                                checked={selectedIngredients.includes(ingredient)}
                                onCheckedChange={() => handleIngredientToggle(ingredient)}
                                className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 w-5 h-5"
                              />
                              <Label 
                                htmlFor={ingredient}
                                className="text-sm text-gray-700 capitalize cursor-pointer flex-1"
                              >
                                {ingredient.replace('-', ' ')}
                              </Label>
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}

                  {/* Custom Ingredients Section */}
                  <div className="space-y-2 border-t border-gray-200 pt-3 mt-4">
                    <h3 className="font-medium text-gray-800 text-sm">Add Custom Ingredients</h3>
                    <div className="flex space-x-2">
                      <Input
                        value={newIngredient}
                        onChange={(e) => setNewIngredient(e.target.value)}
                        placeholder="Enter ingredient name"
                        className="flex-1 shadow-sm"
                        onKeyPress={(e) => e.key === 'Enter' && addCustomIngredient()}
                      />
                      <Button 
                        onClick={addCustomIngredient}
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 shadow-sm"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                    {customIngredients.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {customIngredients.map((ingredient) => (
                          <div 
                            key={ingredient} 
                            className="flex items-center space-x-3 p-2 hover:bg-purple-50 rounded cursor-pointer"
                            onClick={() => handleIngredientToggle(ingredient)}
                          >
                            <Checkbox
                              id={`custom-${ingredient}`}
                              checked={selectedIngredients.includes(ingredient)}
                              onCheckedChange={() => handleIngredientToggle(ingredient)}
                              className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 w-5 h-5"
                            />
                            <Label 
                              htmlFor={`custom-${ingredient}`}
                              className="text-sm text-gray-700 capitalize cursor-pointer"
                            >
                              {ingredient}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  </CardContent>
                </div>
              </Card>

              {/* Ingredients in Your Pantry Card */}
              <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-purple-300">
                    Ingredients in your pantry
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-purple-300 leading-relaxed">
                    {selectedIngredients.length > 0 ? (
                      selectedIngredients.map((ingredient, index) => (
                        <span key={ingredient} className="capitalize">
                          {ingredient.replace('-', ' ')}
                          {index < selectedIngredients.length - 1 ? ', ' : ''}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">No ingredients selected</span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button 
                      className="bg-blue-500 text-white border-blue-500 hover:bg-blue-600 active:bg-purple-600 active:border-purple-600"
                      onClick={() => setLocation("/grocery-list")}
                    >
                      Grocery List
                    </Button>
                    <Button 
                      className="bg-blue-500 text-white border-blue-500 hover:bg-blue-600 active:bg-purple-600 active:border-purple-600"
                      onClick={() => setLocation("/weekly-meal-planning")}
                    >
                      Weekly Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

        </div>
        
        {/* Show Dish Variations Grid */}
        {activeCard === 'create-dish' && showDishVariations && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 shadow-lg mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-purple-300 flex items-center gap-2">
                <ChefHat size={18} />
                Recipe Variations for "{customDishName}"
              </CardTitle>
              <p className="text-sm text-gray-300 mt-1">Choose from these 6 variations created by our AI chef</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {generateDishVariations(customDishName, customDishIngredients, customCookingStyle, customPrepTime, customDifficulty).map(dish => (
                  <ExpandableDishCard
                    key={dish.id}
                    dish={dish}
                    onRecipe={() => setLocation('/review-recipes')}
                    onSaveRecipe={() => console.log('Save recipe:', dish.name)}
                    onCookNow={() => setLocation('/voice-cooking')}
                  />
                ))}
              </div>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                  onClick={() => setShowDishVariations(false)}
                >
                  Back to Create
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      {/* Bottom spacing to account for bottom navigation */}
      <div className="h-20"></div>
    </div>
  );
}