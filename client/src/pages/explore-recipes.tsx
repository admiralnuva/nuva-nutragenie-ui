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
  
  // New navigation state for the redesigned interface
  const [activeTab, setActiveTab] = useState<'diet' | 'meal' | 'pantry'>('meal');
  const [isMealComplete, setIsMealComplete] = useState(false);
  const [isPantryComplete, setIsPantryComplete] = useState(false);
  const [preferencesCardSlid, setPreferencesCardSlid] = useState(false);

  // Get dynamic avatar for Card 3 based on active selection
  const getDynamicAvatar = () => {
    if (activeCard === 'pantry-dishes' || activeCard === 'chefs-choice') {
      return chefAvatarSrc;
    }
    return userAvatarSrc;
  };

  // Meal preferences state with sequential validation and auto-save
  const [mealPreferences, setMealPreferences] = useLocalStorage("nutragenie_meal_preferences", {
    servingSize: "2 people",
    cuisine: "American",
    mealType: "Dinner",
    spiceLevel: "Mild",
    skillLevel: "Intermediate",
    cookMethod: "Stove Top",
    prepTime: "30 minutes"
  });

  // Meal confirmation state
  const [mealConfirmed, setMealConfirmed] = useState(false);

  // Helper function to check if required fields are completed
  const isRequiredFieldsCompleted = () => {
    const { servingSize, cuisine, mealType } = mealPreferences;
    return servingSize !== "" && cuisine !== "" && mealType !== "";
  };

  // Helper function to check if all fields are completed
  const isAllFieldsCompleted = () => {
    return Object.values(mealPreferences).every(value => value !== "");
  };

  // Check meal completion status and update state
  useEffect(() => {
    const fieldsCompleted = isRequiredFieldsCompleted();
    const confirmed = mealConfirmed;
    setIsMealComplete(fieldsCompleted && confirmed);
  }, [mealPreferences, mealConfirmed]);



  // Auto-slide preferences card after both completions
  useEffect(() => {
    if (isMealComplete && isPantryComplete && !preferencesCardSlid) {
      const slideTimer = setTimeout(() => {
        setPreferencesCardSlid(true);
      }, 5000); // 5 seconds delay
      
      return () => clearTimeout(slideTimer);
    }
  }, [isMealComplete, isPantryComplete, preferencesCardSlid]);

  // Reset layout on navigation
  useEffect(() => {
    setPreferencesCardSlid(false);
    setActiveTab('meal'); // Reset to meal tab
  }, []);

  // Processing animation state
  const [showProcessing, setShowProcessing] = useState(false);
  const [showPantryProcessing, setShowPantryProcessing] = useState(false);
  const [showChefsChoiceProcessing, setShowChefsChoiceProcessing] = useState(false);
  const [showPreferencesProcessing, setShowPreferencesProcessing] = useState(false);
  
  // Card collapse state
  const [isCardCollapsed, setIsCardCollapsed] = useState(false);
  const [isMealPreferencesCardCollapsed, setIsMealPreferencesCardCollapsed] = useState(false);
  const [isPantryIngredientsCollapsed, setIsPantryIngredientsCollapsed] = useState(false);
  
  // Card sliding animation state
  const [isCard1Moving, setIsCard1Moving] = useState(false);
  const [card1AtBottom, setCard1AtBottom] = useState(false);
  
  // Reset card positions on page load
  useEffect(() => {
    // Reset card positions when navigating to page
    setIsMealPreferencesCardCollapsed(false);
  }, []);



  // Complex animation sequence on page load for Card 1 (dietary preferences)
  useEffect(() => {
    // Step 1: Auto-collapse Card 1 after 2 seconds (smooth and slow)
    const collapseTimer = setTimeout(() => {
      setIsCardCollapsed(true);
      setIsPantryIngredientsCollapsed(true);
    }, 2000);
    
    // Step 2: After collapse completes, start the sliding animation
    const slideTimer = setTimeout(() => {
      setIsCard1Moving(true);
      
      // Animation without sound effect
      
      // Complete the slide animation and set final position
      setTimeout(() => {
        setIsCard1Moving(false);
        setCard1AtBottom(true);
      }, 1500); // 1.5 second slide duration
      
    }, 3000); // Start sliding 1 second after collapse completes
    
    return () => {
      clearTimeout(collapseTimer);
      clearTimeout(slideTimer);
    };
  }, []);

  // Pantry management state
  const [activeCard, setActiveCard] = useState<string>('pantry-ingredients');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(['Chicken Breast', 'Salmon', 'Onions', 'Rice', 'Milk', 'Olive Oil', 'Apples', 'Basil', 'Cumin', 'Ketchup']);
  const [customIngredients, setCustomIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState<string>('');
  const [isPantryExpanded, setIsPantryExpanded] = useState<boolean>(true);
  
  // Custom dish creation state - Pre-fill burger for testing
  const [customDishName, setCustomDishName] = useState('Burger');
  const [customDishIngredients, setCustomDishIngredients] = useState('ground beef, buns, lettuce, tomato, onion, cheese');
  const [customCookingStyle, setCustomCookingStyle] = useState('Grilled');
  const [customPrepTime, setCustomPrepTime] = useState('Under 15 min');
  const [customDifficulty, setCustomDifficulty] = useState('Easy');
  const [showDishVariations, setShowDishVariations] = useState(false);

  // Comprehensive ingredient categories
  const ingredientCategories = {
    'Meat': ['Chicken Breast', 'Ground Beef', 'Turkey', 'Pork Chops', 'Bacon', 'Ground Turkey', 'Lamb', 'Duck', 'Sausage', 'Ham'],
    'Fish & Seafood': ['Salmon', 'Cod', 'Shrimp', 'Tuna', 'Tilapia', 'Crab', 'Lobster', 'Mussels', 'Scallops', 'Anchovies'],
    'Vegetables': ['Bell Peppers', 'Tomatoes', 'Cucumber', 'Broccoli', 'Cauliflower', 'Zucchini', 'Eggplant', 'Mushrooms', 'Asparagus', 'Green Beans'],
    'Root Vegetables': ['Onions', 'Garlic', 'Carrots', 'Potatoes', 'Sweet Potatoes', 'Ginger', 'Beets', 'Turnips', 'Radishes', 'Shallots'],
    'Leafy Greens': ['Spinach', 'Lettuce', 'Kale', 'Arugula', 'Basil', 'Cilantro', 'Parsley', 'Mint', 'Chard', 'Cabbage'],
    'Dairy & Eggs': ['Milk', 'Eggs', 'Butter', 'Cheese', 'Greek Yogurt', 'Cream', 'Sour Cream', 'Cottage Cheese', 'Ricotta', 'Mozzarella'],
    'Fruits': ['Apples', 'Bananas', 'Lemons', 'Limes', 'Berries', 'Avocado', 'Oranges', 'Grapes', 'Pears', 'Mangoes'],
    'Grains': ['Rice', 'Quinoa', 'Pasta', 'Bread', 'Oats', 'Barley', 'Couscous', 'Bulgur', 'Noodles', 'Tortillas'],
    'Legumes': ['Black Beans', 'Chickpeas', 'Lentils', 'Kidney Beans', 'Pinto Beans', 'Navy Beans', 'Split Peas', 'Edamame', 'Lima Beans'],
    'Nuts & Seeds': ['Almonds', 'Walnuts', 'Pecans', 'Cashews', 'Peanuts', 'Pine Nuts', 'Hazelnuts', 'Pistachios', 'Sunflower Seeds', 'Chia Seeds'],
    'Oils & Fats': ['Olive Oil', 'Vegetable Oil', 'Coconut Oil', 'Sesame Oil', 'Avocado Oil', 'Canola Oil', 'Sunflower Oil', 'Ghee'],
    'Spices': ['Black Pepper', 'Paprika', 'Cumin', 'Oregano', 'Thyme', 'Garlic Powder', 'Cinnamon', 'Turmeric', 'Chili Powder', 'Bay Leaves'],
    'Condiments': ['Soy Sauce', 'Hot Sauce', 'Mustard', 'Ketchup', 'Mayo', 'Vinegar', 'Worcestershire', 'BBQ Sauce', 'Sriracha', 'Tahini'],
    'Baking Essentials': ['Flour', 'Sugar', 'Baking Powder', 'Vanilla Extract', 'Salt', 'Honey', 'Brown Sugar', 'Cocoa Powder', 'Baking Soda'],
    'Pantry Staples': ['Chicken Stock', 'Vegetable Broth', 'Canned Tomatoes', 'Coconut Milk', 'Fish Sauce', 'Maple Syrup', 'Dried Herbs', 'Sea Salt', 'Peppercorns']
  };

  // Check pantry completion status
  useEffect(() => {
    const pantryCompleted = selectedIngredients.length >= 3; // At least 3 ingredients
    setIsPantryComplete(pantryCompleted);
  }, [selectedIngredients]);

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
          {/* Card 1: Preferences and Pantry Ingredients */}
          <div className={`transition-all duration-1000 ease-in-out ${
            preferencesCardSlid ? 'order-3' : 'order-1'
          }`}>
            <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 min-h-[400px]">
              <CardHeader className="pb-4 relative">
                <CardTitle className="text-lg text-white pr-20">Preferences and Pantry Ingredients</CardTitle>
                {/* User Avatar - Top Right Corner */}
                <div className="absolute top-4 right-4">
                  <img 
                    src={userAvatarSrc} 
                    alt="User Avatar" 
                    className="w-16 h-16 rounded-full"
                    style={{ border: 'none' }}
                  />
                </div>
              </CardHeader>
              <CardContent>
                {/* Tab Navigation - Exact styling match with take-out screen */}
                <div className="flex gap-2 mb-4">
                  <Button
                    variant={activeTab === 'diet' ? "default" : "outline"}
                    onClick={() => setActiveTab('diet')}
                    className={`flex-1 ${
                      activeTab === 'diet' 
                        ? 'bg-gray-600 text-white border-gray-500' 
                        : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    Diet
                  </Button>
                  <Button
                    variant={activeTab === 'meal' ? "default" : "outline"}
                    onClick={() => setActiveTab('meal')}
                    className={`flex-1 flex items-center justify-center gap-2 ${
                      activeTab === 'meal' 
                        ? 'bg-gray-600 text-white border-gray-500' 
                        : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    Meal
                    {isMealComplete && <span className="text-green-400 text-xs">✓</span>}
                  </Button>
                  <Button
                    variant={activeTab === 'pantry' ? "default" : "outline"}
                    onClick={() => setActiveTab('pantry')}
                    className={`flex-1 flex items-center justify-center gap-2 ${
                      activeTab === 'pantry' 
                        ? 'bg-gray-600 text-white border-gray-500' 
                        : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    Pantry
                    {isPantryComplete && <span className="text-green-400 text-xs">✓</span>}
                  </Button>
                </div>

                {/* Tab Content - Increased height for better utilization */}
                <div className="mt-4 min-h-[280px]">
                  {activeTab === 'diet' && (
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-purple-300 mb-3">Dietary Preferences</h4>
                      
                      {/* Dietary Restrictions - Split into two rows */}
                      <div>
                        <span className="text-sm font-medium text-gray-300">Dietary Restrictions:</span>
                        {userData?.dietaryRestrictions?.length > 0 ? (
                          <div className="text-sm text-gray-400 mt-1">
                            <div>{userData.dietaryRestrictions.slice(0, 3).join(', ')}</div>
                            {userData.dietaryRestrictions.length > 3 && (
                              <div>{userData.dietaryRestrictions.slice(3).join(', ')}</div>
                            )}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400 mt-1">None specified</div>
                        )}
                      </div>
                      
                      <hr className="border-gray-600" />
                      
                      {/* Health Factors - Compact row */}
                      <div>
                        <span className="text-sm font-medium text-gray-300">Health Factors: </span>
                        <span className="text-sm text-gray-400">
                          {userData?.healthGoals?.filter(goal => ['diabetes', 'cardiovascular', 'kidney', 'blood-pressure', 'cancer'].includes(goal))?.length > 0 ? 
                            userData.healthGoals.filter(goal => ['diabetes', 'cardiovascular', 'kidney', 'blood-pressure', 'cancer'].includes(goal)).join(', ') : 
                            'No conditions'}
                        </span>
                      </div>
                      
                      <hr className="border-gray-600" />
                      
                      {/* Fitness Goals - Compact row */}
                      <div>
                        <span className="text-sm font-medium text-gray-300">Fitness Goals: </span>
                        <span className="text-sm text-gray-400">
                          {userData?.healthGoals?.filter(goal => ['build-muscle', 'lose-weight', 'endurance', 'wellness'].includes(goal))?.length > 0 ? 
                            userData.healthGoals.filter(goal => ['build-muscle', 'lose-weight', 'endurance', 'wellness'].includes(goal)).map(goal => goal.replace('-', ' ')).join(', ') : 
                            'None set'}
                        </span>
                      </div>
                      
                      <hr className="border-gray-600" />
                      
                      {/* Allergies - Compact row */}
                      <div>
                        <span className="text-sm font-medium text-gray-300">Allergies/Restrictions: </span>
                        <span className="text-sm text-gray-400">{userData?.allergies || 'None specified'}</span>
                      </div>
                      
                      <hr className="border-gray-600" />
                      
                      {/* Nutritional Goals - Split into two rows */}
                      <div>
                        <span className="text-sm font-medium text-gray-300">Nutritional Goals:</span>
                        {userData?.selectedCalorieRange && userData?.selectedProteinRange ? (
                          <div className="text-sm text-gray-400 mt-1">
                            <div>Cal: {userData.selectedCalorieRange}, Protein: {userData.selectedProteinRange}g</div>
                            <div>Carbs: {userData.selectedCarbRange}g, Fat: {userData.selectedFatRange}g</div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400 mt-1">Goals not configured</div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === 'meal' && (
                    <div className="space-y-3">
                      {/* Row 1: Serving Size & Cuisine */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-purple-300 mb-1 block">Serving Size *</label>
                          <select
                            value={mealPreferences.servingSize || ''}
                            onChange={(e) => setMealPreferences({...mealPreferences, servingSize: e.target.value})}
                            className="w-full h-8 bg-gray-700 border border-gray-600 text-white text-sm rounded"
                          >
                            <option value="">Select</option>
                            <option value="1 person">1 person</option>
                            <option value="2 people">2 people</option>
                            <option value="4 people">4 people</option>
                            <option value="6+ people">6+ people</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-purple-300 mb-1 block">Cuisine *</label>
                          <select
                            value={mealPreferences.cuisine || ''}
                            onChange={(e) => setMealPreferences({...mealPreferences, cuisine: e.target.value})}
                            disabled={!mealPreferences.servingSize}
                            className={`w-full h-8 bg-gray-700 border border-gray-600 text-white text-sm rounded ${
                              !mealPreferences.servingSize ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <option value="">Select</option>
                            <option value="American">American</option>
                            <option value="Italian">Italian</option>
                            <option value="Mexican">Mexican</option>
                            <option value="Asian">Asian</option>
                            <option value="Mediterranean">Mediterranean</option>
                            <option value="Indian">Indian</option>
                            <option value="French">French</option>
                            <option value="Thai">Thai</option>
                          </select>
                        </div>
                      </div>

                      {/* Row 2: Meal Type & Spice Level */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-purple-300 mb-1 block">Meal Type *</label>
                          <select
                            value={mealPreferences.mealType || ''}
                            onChange={(e) => setMealPreferences({...mealPreferences, mealType: e.target.value})}
                            disabled={!mealPreferences.cuisine}
                            className={`w-full h-8 bg-gray-700 border border-gray-600 text-white text-sm rounded ${
                              !mealPreferences.cuisine ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <option value="">Select</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Snack">Snack</option>
                            <option value="Soup">Soup</option>
                            <option value="Salad">Salad</option>
                            <option value="Dessert">Dessert</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-purple-300 mb-1 block">Spice Level</label>
                          <select
                            value={mealPreferences.spiceLevel || ''}
                            onChange={(e) => setMealPreferences({...mealPreferences, spiceLevel: e.target.value})}
                            disabled={!mealPreferences.mealType}
                            className={`w-full h-8 bg-gray-700 border border-gray-600 text-white text-sm rounded ${
                              !mealPreferences.mealType ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <option value="">Select</option>
                            <option value="Mild">😊 Mild</option>
                            <option value="Medium">🌶️ Medium</option>
                            <option value="Spicy">🔥 Spicy</option>
                          </select>
                        </div>
                      </div>

                      {/* Row 3: Skill Level & Cook Method */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-purple-300 mb-1 block">Skill Level</label>
                          <select
                            value={mealPreferences.skillLevel || ''}
                            onChange={(e) => setMealPreferences({...mealPreferences, skillLevel: e.target.value})}
                            disabled={!mealPreferences.spiceLevel}
                            className={`w-full h-8 bg-gray-700 border border-gray-600 text-white text-sm rounded ${
                              !mealPreferences.spiceLevel ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <option value="">Select</option>
                            <option value="Beginner">👶 Beginner</option>
                            <option value="Intermediate">👨‍🍳 Intermediate</option>
                            <option value="Advanced">🔥 Advanced</option>
                            <option value="Expert">👑 Expert</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-purple-300 mb-1 block">Cook Method</label>
                          <select
                            value={mealPreferences.cookMethod || ''}
                            onChange={(e) => setMealPreferences({...mealPreferences, cookMethod: e.target.value})}
                            disabled={!mealPreferences.skillLevel}
                            className={`w-full h-8 bg-gray-700 border border-gray-600 text-white text-sm rounded ${
                              !mealPreferences.skillLevel ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <option value="">Select</option>
                            <option value="Stove Top">🔥 Stove Top</option>
                            <option value="Oven">🔥 Oven</option>
                            <option value="Air Fryer">🍳 Air Fryer</option>
                            <option value="Pressure Cooker">⏲️ Pressure Cooker</option>
                            <option value="No Cook">🥗 No Cook</option>
                            <option value="Grill">🔥 Grill</option>
                          </select>
                        </div>
                      </div>

                      {/* Row 4: Prep Time */}
                      <div>
                        <label className="text-xs text-purple-300 mb-1 block">Prep Time</label>
                        <select
                          value={mealPreferences.prepTime || ''}
                          onChange={(e) => setMealPreferences({...mealPreferences, prepTime: e.target.value})}
                          disabled={!mealPreferences.cookMethod}
                          className={`w-full h-8 bg-gray-700 border border-gray-600 text-white text-sm rounded ${
                            !mealPreferences.cookMethod ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <option value="">Select</option>
                          <option value="15 minutes">⚡ 15 minutes</option>
                          <option value="30 minutes">⏰ 30 minutes</option>
                          <option value="45 minutes">🕐 45 minutes</option>
                          <option value="1 hour">⏳ 1 hour</option>
                          <option value="1.5 hours">⏲️ 1.5 hours</option>
                          <option value="2+ hours">🕰️ 2+ hours</option>
                        </select>
                      </div>

                      {/* Confirmation Checkbox - Only show when required fields are completed */}
                      {isRequiredFieldsCompleted() && (
                        <div className="mt-4 pt-3 border-t border-gray-600">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="meal-confirm"
                              checked={mealConfirmed}
                              onCheckedChange={(checked) => {
                                setMealConfirmed(checked);
                                if (checked) {
                                  // Automatically switch to Pantry tab when confirmed
                                  setTimeout(() => setActiveTab('pantry'), 300);
                                }
                              }}
                              className="w-7 h-7 rounded-full border-gray-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                            />
                            <label
                              htmlFor="meal-confirm"
                              className="text-sm text-gray-300 cursor-pointer"
                            >
                              I confirm these meal preferences are correct
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'pantry' && (
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-purple-300 mb-3">Available Ingredients</h4>
                      
                      {/* Ingredient Selection Summary */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-300">Selected Ingredients:</span>
                        <span className="text-sm text-gray-400">{selectedIngredients.length} items</span>
                      </div>
                      
                      <hr className="border-gray-600" />
                      
                      {/* Comprehensive ingredient categories - matching Diet tab structure */}
                      <div className="space-y-3 max-h-[200px] overflow-y-auto">
                        {Object.entries(ingredientCategories).map(([category, ingredients]) => (
                          <div key={category}>
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-sm font-medium text-gray-300">{category}</h5>
                              <span className="text-xs text-gray-500">
                                {ingredients.filter(ingredient => selectedIngredients.includes(ingredient)).length}/{ingredients.length}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-1 mb-2">
                              {ingredients.slice(0, 8).map(ingredient => (
                                <label key={ingredient} className="flex items-center space-x-1 text-xs cursor-pointer hover:bg-gray-700/30 p-1 rounded">
                                  <input
                                    type="checkbox"
                                    checked={selectedIngredients.includes(ingredient)}
                                    onChange={() => handleIngredientToggle(ingredient)}
                                    className="w-3 h-3 rounded border-gray-500"
                                  />
                                  <span className="text-gray-400 text-xs">{ingredient}</span>
                                </label>
                              ))}
                            </div>
                            <hr className="border-gray-700" />
                          </div>
                        ))}
                      </div>

                      {/* Quick selection summary */}
                      <div className="mt-3 pt-3 border-t border-gray-600">
                        <div className="text-xs text-gray-400">
                          <span className="font-medium text-gray-300">Popular selections: </span>
                          {selectedIngredients.slice(0, 5).join(', ')}
                          {selectedIngredients.length > 5 && ` and ${selectedIngredients.length - 5} more`}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Card 2: Recipe Options */}
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-white">Recipe Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button className="h-14 bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600">
                  Pantry Dishes
                </Button>
                <Button className="h-14 bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600">
                  Chef's Choice
                </Button>
                <Button className="h-14 bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600">
                  Create a Dish
                </Button>
                <Button className="h-14 bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600">
                  Take-Out
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Summary */}
          {(isMealComplete || isPantryComplete) && (
            <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-white">
                  Summary for {userData?.nickname || 'User'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isMealComplete && (
                    <div>
                      <h4 className="text-sm font-medium text-purple-300 mb-2">Meal Preferences</h4>
                      <div className="text-sm text-gray-400 space-y-1">
                        <div>Serving: {mealPreferences.servingSize}, Cuisine: {mealPreferences.cuisine}</div>
                        <div>Meal Type: {mealPreferences.mealType}</div>
                      </div>
                    </div>
                  )}
                  
                  {isPantryComplete && (
                    <div>
                      <div className="border-t border-gray-600 pt-3"></div>
                      <h4 className="text-sm font-medium text-purple-300 mb-2">Pantry Ingredients</h4>
                      <div className="text-sm text-gray-400">
                        {selectedIngredients.slice(0, 6).map(ingredient => 
                          ingredient.replace('-', ' ')
                        ).join(', ')}
                        {selectedIngredients.length > 6 && ` and ${selectedIngredients.length - 6} more`}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600 text-gray-300">
                      Grocery List
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-gray-700 border-gray-600 text-gray-300"
                      onClick={() => setPreferencesCardSlid(false)}
                    >
                      Edit Preferences
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Bottom spacing to account for bottom navigation */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
