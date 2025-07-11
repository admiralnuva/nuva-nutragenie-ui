import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeftRight, 
  BookOpen, 
  Heart, 
  CookingPot, 
  Plus,
  ChefHat,
  Truck,
  ShoppingCart
} from 'lucide-react';

// Import avatars
import userAvatar1 from '@assets/User/file_00000000092861f8a6a01284cc629bd0.png';
import userAvatar2 from '@assets/User/file_000000006df061f8bb3e4e285dff4d1f.png';
import userAvatar3 from '@assets/User/file_00000000144c61f58d6ed72273889fd2.png';
import userAvatar4 from '@assets/User/file_00000000da2061f882c7fc433368cf6a.png';

import chefAvatar1 from '@assets/Chef/file_000000008b1061f99729a5ff4af22cb2.png';
import chefAvatar2 from '@assets/Chef/file_00000000aae061fba11590016ae2044d.png';
import chefAvatar3 from '@assets/Chef/file_00000000ba9061fb818d3ba5eec439b8 (1).png';
import chefAvatar4 from '@assets/Chef/file_00000000e49c61f58b106664f70fe407.png';

// Avatar mappings
const userAvatars = { avatar1: userAvatar1, avatar2: userAvatar2, avatar3: userAvatar3, avatar4: userAvatar4 };
const chefAvatars = { chef1: chefAvatar1, chef2: chefAvatar2, chef3: chefAvatar3, chef4: chefAvatar4 };

// Types
interface MealPreferences {
  servingSize: string;
  cuisine: string;
  mealType: string;
  spiceLevel: string;
  skillLevel: string;
  cookMethod: string;
  prepTime: string;
}

interface Dish {
  id: number;
  name: string;
  calories: number;
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  image: string;
  protein?: string;
}

export default function ExploreRecipesScreen() {
  const [, setLocation] = useLocation();
  
  // User data
  const [currentUser] = useLocalStorage("nutragenie_current_user", null);
  const [tempUser] = useLocalStorage("nutragenie_temp_user", null);
  const userData = currentUser || tempUser;
  
  // Navigation cleanup
  const [navigationSource, setNavigationSource] = useLocalStorage<string>("nutragenie_navigation_source", "");
  useEffect(() => {
    if (navigationSource) {
      setNavigationSource("");
    }
  }, []);
  
  // CLEAN STATE MANAGEMENT
  const [cardPosition, setCardPosition] = useState<'top' | 'bottom'>('top');
  const [cardCollapsed, setCardCollapsed] = useState(false);
  const [mealConfirmed, setMealConfirmed] = useState(false);
  const [pantryConfirmed, setPantryConfirmed] = useState(false);
  
  // Tabs and preferences
  const [activeTab, setActiveTab] = useState<'diet' | 'meal' | 'pantry'>('meal');
  const [mealPreferences, setMealPreferences] = useState<MealPreferences>({
    servingSize: '2 people', cuisine: 'American', mealType: 'Dinner', spiceLevel: 'Mild', skillLevel: 'Beginner', cookMethod: 'Oven', prepTime: '30 minutes'
  });
  
  // Pantry ingredients - Pre-select one from each category
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    'Chicken Breast', 'Salmon', 'Spinach', 'Apples', 'Brown Rice', 
    'Greek Yogurt', 'Black Beans', 'Almonds', 'Olive Oil', 'Salt'
  ]);
  const [customIngredients, setCustomIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  
  // Recipe options - COMPLETELY INDEPENDENT STATE
  const [selectedRecipeOption, setSelectedRecipeOption] = useState<string>('');
  const [showChefsChoice, setShowChefsChoice] = useState(false);
  const [showPantryDishes, setShowPantryDishes] = useState(false);
  const [showTakeOut, setShowTakeOut] = useState(false);
  
  // TEST FUNCTION - Log state changes for debugging
  const logRecipeOptionState = (action: string) => {
    const currentState = {
      selectedRecipeOption,
      showChefsChoice,
      showPantryDishes,
      showTakeOut,
      cardPosition,
      mealConfirmed,
      pantryConfirmed
    };
    
    console.log(`RECIPE OPTION TEST - ${action}:`, currentState);
    
    // Validation checks
    const activeShows = [showChefsChoice, showPantryDishes, showTakeOut].filter(Boolean).length;
    if (activeShows > 1) {
      console.error('❌ MULTIPLE SHOW STATES ACTIVE:', { showChefsChoice, showPantryDishes, showTakeOut });
    }
    
    if (selectedRecipeOption && activeShows === 0 && selectedRecipeOption !== 'create-dishes') {
      console.warn('⚠️ SELECTED BUT NO SHOW STATE:', selectedRecipeOption);
    }
    
    // Check for unexpected coupling
    const shouldNotBeAffected = ['cardPosition', 'mealConfirmed', 'pantryConfirmed'];
    console.log('✅ Card state (should not change):', { cardPosition, mealConfirmed, pantryConfirmed });
  };
  
  // Take-out form
  const [takeOutServingSize, setTakeOutServingSize] = useState('');
  const [takeOutCuisine, setTakeOutCuisine] = useState('');
  const [takeOutMealType, setTakeOutMealType] = useState('');
  const [takeOutDeliveryDate, setTakeOutDeliveryDate] = useState('');
  const [showTakeOutMenu, setShowTakeOutMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('soup');
  
  // Substitutions
  const [substitutionOpenDish, setSubstitutionOpenDish] = useState<number | null>(null);
  const [dishSubstitutions, setDishSubstitutions] = useState<{[key: number]: {[key: string]: boolean}}>({});
  
  // Cook confirmation
  const [cookConfirmationOpen, setCookConfirmationOpen] = useState<number | null>(null);
  const [cookConfirmed, setCookConfirmed] = useState(false);
  
  // Get avatars
  const userAvatarSrc = userData?.avatar ? userAvatars[userData.avatar as keyof typeof userAvatars] : userAvatar1;
  const chefAvatarSrc = userData?.chef ? chefAvatars[userData.chef as keyof typeof chefAvatars] : chefAvatar1;
  
  // Computed values - requires all 6 fields as shown in screenshot
  const mealFieldsComplete = mealPreferences.servingSize && mealPreferences.cuisine && mealPreferences.mealType && 
                            mealPreferences.spiceLevel && mealPreferences.skillLevel && mealPreferences.cookMethod && 
                            mealPreferences.prepTime;
  const pantryFieldsComplete = true; // Always show confirmation checkbox
  const bothConfirmed = mealConfirmed && pantryConfirmed;
  
  // Card positioning logic - COMPLETELY INDEPENDENT FROM RECIPE OPTIONS
  useEffect(() => {
    if (bothConfirmed && cardPosition === 'top') {
      console.log('🔄 CARD POSITIONING: Both confirmed, moving card to bottom');
      setTimeout(() => setCardCollapsed(true), 1000);
      setTimeout(() => setCardPosition('bottom'), 2000);
      
      // Play sound effect
      setTimeout(() => {
        if (typeof Audio !== 'undefined') {
          const audio = new Audio('/api/placeholder/audio/swish');
          audio.volume = 0.3;
          audio.play().catch(e => console.log('Audio play failed:', e));
        }
      }, 2000);
      
      // DO NOT AUTO-SELECT ANYTHING - Recipe Options are completely independent
    }
  }, [bothConfirmed, cardPosition]);
  
  // Data definitions - Comprehensive ingredient categories
  const ingredientCategories = {
    'Meat & Poultry': ['Chicken Breast', 'Ground Beef', 'Ground Turkey', 'Pork Chops', 'Turkey Breast', 'Bacon', 'Sausage', 'Lamb'],
    'Fish & Seafood': ['Salmon', 'Tuna', 'Shrimp', 'Cod', 'Tilapia', 'Crab', 'Lobster', 'Scallops'],
    'Vegetables': ['Spinach', 'Broccoli', 'Carrots', 'Bell Peppers', 'Onions', 'Tomatoes', 'Mushrooms', 'Zucchini', 'Cucumber', 'Lettuce', 'Kale', 'Cabbage'],
    'Fruits': ['Apples', 'Bananas', 'Berries', 'Oranges', 'Grapes', 'Avocado', 'Lemons', 'Limes'],
    'Grains & Starches': ['Brown Rice', 'White Rice', 'Quinoa', 'Pasta', 'Sweet Potatoes', 'Regular Potatoes', 'Bread', 'Oats', 'Barley'],
    'Dairy & Eggs': ['Greek Yogurt', 'Regular Yogurt', 'Cheese', 'Milk', 'Eggs', 'Butter', 'Cream', 'Cottage Cheese'],
    'Legumes & Beans': ['Black Beans', 'Kidney Beans', 'Chickpeas', 'Lentils', 'Pinto Beans', 'Navy Beans'],
    'Nuts & Seeds': ['Almonds', 'Walnuts', 'Cashews', 'Peanuts', 'Chia Seeds', 'Flax Seeds', 'Sunflower Seeds'],
    'Pantry Essentials': ['Olive Oil', 'Coconut Oil', 'Garlic', 'Fresh Herbs', 'Dried Spices', 'Vinegar', 'Soy Sauce', 'Hot Sauce'],
    'Condiments & Seasonings': ['Salt', 'Black Pepper', 'Paprika', 'Cumin', 'Oregano', 'Basil', 'Mustard', 'Ketchup']
  };
  
  const chefsChoiceDishes: Dish[] = [
    { id: 1, name: 'Mediterranean Bowl', calories: 420, cookTime: '25 min', difficulty: 'Easy', image: '/api/placeholder/200/150', protein: '28g' },
    { id: 2, name: 'Herb Crusted Fish', calories: 380, cookTime: '30 min', difficulty: 'Medium', image: '/api/placeholder/200/150', protein: '35g' },
    { id: 3, name: 'Power Smoothie Bowl', calories: 320, cookTime: '10 min', difficulty: 'Easy', image: '/api/placeholder/200/150', protein: '22g' },
    { id: 4, name: 'Quinoa Salad', calories: 290, cookTime: '15 min', difficulty: 'Easy', image: '/api/placeholder/200/150', protein: '18g' },
    { id: 5, name: 'Stuffed Peppers', calories: 350, cookTime: '45 min', difficulty: 'Medium', image: '/api/placeholder/200/150', protein: '24g' },
    { id: 6, name: 'Vegetable Soup', calories: 180, cookTime: '20 min', difficulty: 'Easy', image: '/api/placeholder/200/150', protein: '8g' }
  ];
  
  const pantryDishes: Dish[] = [
    { id: 101, name: 'Fried Rice', calories: 320, cookTime: '15 min', difficulty: 'Easy', image: '/api/placeholder/200/150' },
    { id: 102, name: 'Garlic Bread', calories: 180, cookTime: '10 min', difficulty: 'Easy', image: '/api/placeholder/200/150' },
    { id: 103, name: 'Pasta Primavera', calories: 280, cookTime: '20 min', difficulty: 'Medium', image: '/api/placeholder/200/150' },
    { id: 104, name: 'Scrambled Eggs', calories: 220, cookTime: '5 min', difficulty: 'Easy', image: '/api/placeholder/200/150' },
    { id: 105, name: 'Vegetable Soup', calories: 150, cookTime: '25 min', difficulty: 'Easy', image: '/api/placeholder/200/150' },
    { id: 106, name: 'Toast & Jam', calories: 160, cookTime: '3 min', difficulty: 'Easy', image: '/api/placeholder/200/150' }
  ];
  
  const takeOutDishes = {
    soup: [
      { id: 401, name: 'Tomato Basil Soup', calories: 180, cookTime: '5 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 402, name: 'Chicken Noodle Soup', calories: 220, cookTime: '5 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' }
    ],
    salad: [
      { id: 403, name: 'Caesar Salad', calories: 280, cookTime: '5 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 404, name: 'Greek Salad', calories: 240, cookTime: '5 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' }
    ],
    entree: [
      { id: 405, name: 'Grilled Salmon', calories: 420, cookTime: '5 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 406, name: 'Chicken Teriyaki', calories: 380, cookTime: '5 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' }
    ],
    dessert: [
      { id: 407, name: 'Chocolate Cake', calories: 320, cookTime: '5 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 408, name: 'Apple Pie', calories: 280, cookTime: '5 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' }
    ]
  };
  
  // Substitution data
  const substitutionIngredients = {
    1: { // Mediterranean Bowl
      'Chicken': [
        { name: 'Tofu', calories: 340, protein: '24g' },
        { name: 'Chickpeas', calories: 380, protein: '20g' },
        { name: 'Salmon', calories: 450, protein: '32g' }
      ]
    },
    2: { // Herb Crusted Fish
      'Fish': [
        { name: 'Chicken', calories: 360, protein: '30g' },
        { name: 'Tofu', calories: 320, protein: '22g' },
        { name: 'Tempeh', calories: 340, protein: '25g' }
      ]
    }
  };
  
  // Event handlers
  const handleIngredientToggle = (ingredient: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };
  
  const handleAddCustomIngredient = () => {
    if (newIngredient.trim()) {
      setCustomIngredients(prev => [...prev, newIngredient.trim()]);
      setSelectedIngredients(prev => [...prev, newIngredient.trim()]);
      setNewIngredient('');
    }
  };
  
  const handleSubstitutionToggle = (dishId: number, ingredient: string, substitution: string) => {
    setDishSubstitutions(prev => ({
      ...prev,
      [dishId]: {
        ...prev[dishId],
        [`${ingredient}-${substitution}`]: !prev[dishId]?.[`${ingredient}-${substitution}`]
      }
    }));
  };
  
  const calculateUpdatedNutrition = (dishId: number, originalCalories: number, originalProtein: string) => {
    const subs = dishSubstitutions[dishId] || {};
    const activeSubs = Object.entries(subs).filter(([, active]) => active);
    
    if (activeSubs.length === 0) {
      return { calories: originalCalories, protein: originalProtein };
    }
    
    return { calories: originalCalories + 20, protein: '30g' };
  };
  
  const handleCookClick = (dishId: number) => {
    setCookConfirmationOpen(dishId);
  };
  
  const handleConfirmCook = () => {
    setCookConfirmationOpen(null);
    setCookConfirmed(false);
    setLocation('/voice-cooking');
  };
  
  const isTakeOutFormComplete = takeOutServingSize && takeOutCuisine && takeOutMealType && takeOutDeliveryDate;
  
  const handleDesignTakeOutMenu = () => {
    if (isTakeOutFormComplete) {
      console.log('Take-Out menu designed:', {
        servingSize: takeOutServingSize,
        cuisine: takeOutCuisine,
        mealType: takeOutMealType,
        deliveryDate: takeOutDeliveryDate
      });
      setShowTakeOutMenu(true);
    }
  };
  
  const renderDishCard = (dish: Dish, showActions = true) => {
    const updatedNutrition = calculateUpdatedNutrition(dish.id, dish.calories, dish.protein || '0g');
    const isSubstitutionOpen = substitutionOpenDish === dish.id;
    const dishSubs = substitutionIngredients[dish.id as keyof typeof substitutionIngredients];
    
    return (
      <div key={dish.id} className="bg-gray-800 rounded-lg overflow-hidden">
        {/* Dish Image */}
        <div className="relative h-40">
          <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
        </div>
        
        {/* Dish Content */}
        <div className="p-4 space-y-3">
          {/* Dish Name - First Row */}
          <div className="text-center">
            <h3 className="text-white font-semibold text-lg">{dish.name}</h3>
          </div>
          
          {/* Nutrition Summary - Second Row */}
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span className="text-gray-300">
                {updatedNutrition.calories} cal
                {dishSubstitutions[dish.id] && Object.values(dishSubstitutions[dish.id]).some(Boolean) && 
                  <span className="text-green-400 ml-1">✓</span>
                }
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-gray-300">
                {updatedNutrition.protein}
                {dishSubstitutions[dish.id] && Object.values(dishSubstitutions[dish.id]).some(Boolean) && 
                  <span className="text-green-400 ml-1">✓</span>
                }
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-gray-300">{dish.cookTime}</span>
            </div>
          </div>
          
          {/* Action Icons - Third Row */}
          {showActions && (
            <div className="flex justify-between">
              <button 
                onClick={() => setSubstitutionOpenDish(isSubstitutionOpen ? null : dish.id)}
                className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center hover:from-yellow-600 hover:to-yellow-700 transition-all"
              >
                <ArrowLeftRight size={18} className="text-white" />
              </button>
              <button className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-purple-700 transition-all">
                <BookOpen size={18} className="text-white" />
              </button>
              <button className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center hover:from-green-600 hover:to-green-700 transition-all">
                <Heart size={18} className="text-white" />
              </button>
              <button 
                onClick={() => handleCookClick(dish.id)}
                className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center hover:from-orange-600 hover:to-red-700 transition-all"
              >
                <CookingPot size={18} className="text-white" />
              </button>
              <button className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all">
                <Plus size={18} className="text-white" />
              </button>
            </div>
          )}
        </div>
        
        {/* Substitution Expansion */}
        {isSubstitutionOpen && dishSubs && (
          <div className="border-t border-gray-700 p-4 bg-gray-750">
            <div className="text-center mb-4">
              <h4 className="text-lg font-bold text-yellow-300 drop-shadow-lg">Ingredient Substitutions</h4>
              <div className="flex items-center justify-center gap-6 text-sm mt-2">
                <div className="flex items-center gap-1">
                  <span className="text-gray-300">🔥 {updatedNutrition.calories} cal</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-300">💪 {updatedNutrition.protein}</span>
                </div>
              </div>
            </div>
            
            {Object.entries(dishSubs).map(([ingredient, substitutions]) => (
              <div key={ingredient} className="mb-4">
                <h5 className="text-yellow-300 font-bold mb-2 drop-shadow-lg">{ingredient} Alternatives:</h5>
                <div className="grid grid-cols-3 gap-2">
                  {substitutions.map((sub) => (
                    <button
                      key={sub.name}
                      onClick={() => handleSubstitutionToggle(dish.id, ingredient, sub.name)}
                      className={`p-2 rounded text-sm border transition-all ${
                        dishSubstitutions[dish.id]?.[`${ingredient}-${sub.name}`]
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white'
                      }`}
                    >
                      <div className="font-semibold">{sub.name}</div>
                      <div className="text-xs">{sub.calories} cal, {sub.protein}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox
                id={`confirm-${dish.id}`}
                className="w-7 h-7 rounded-full border-gray-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <label htmlFor={`confirm-${dish.id}`} className="text-sm font-bold text-yellow-300 drop-shadow-lg">
                Confirm substitution changes
              </label>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 pb-24">
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

      <div className="flex flex-col space-y-4">
        {/* Card 1: Personalize Diet & Pantry */}
        <div className={`transition-all duration-700 ease-in-out transform ${
          cardPosition === 'bottom' ? 'order-5 translate-y-2 scale-95 opacity-95' : 
          'order-1 translate-y-0 scale-100 opacity-100'
        }`}>
          <Card className={`bg-gray-800/90 backdrop-blur-sm border border-gray-700 transition-all duration-700 ease-in-out ${
            cardCollapsed ? 'min-h-[120px] scale-98' : 'min-h-[400px] scale-100'
          }`}>
            <CardHeader className="pb-4 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-lg text-white">Personalize Diet & Pantry</CardTitle>
                  {cardCollapsed && (
                    <button
                      onClick={() => setCardCollapsed(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <ChevronDown size={20} />
                    </button>
                  )}
                </div>
                {!cardCollapsed && (
                  <button
                    onClick={() => setCardCollapsed(true)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronUp size={20} />
                  </button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {/* Tab Navigation */}
              <div className="flex gap-2 mb-4">
                <Button
                  variant={activeTab === 'diet' ? "default" : "outline"}
                  onClick={() => !cardCollapsed && setActiveTab('diet')}
                  disabled={cardCollapsed}
                  className={`flex-1 ${
                    activeTab === 'diet' 
                      ? 'bg-purple-600 text-white border-purple-600' 
                      : 'bg-transparent border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                  } ${cardCollapsed ? 'opacity-75 cursor-default' : ''}`}
                >
                  Diet
                </Button>
                <Button
                  variant={activeTab === 'meal' ? "default" : "outline"}
                  onClick={() => !cardCollapsed && setActiveTab('meal')}
                  disabled={cardCollapsed}
                  className={`flex-1 flex items-center justify-center gap-2 ${
                    activeTab === 'meal' 
                      ? 'bg-purple-600 text-white border-purple-600' 
                      : 'bg-transparent border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                  } ${cardCollapsed ? 'opacity-75 cursor-default' : ''}`}
                >
                  Meal
                  {mealConfirmed && <span className="text-green-400 text-xs">✓</span>}
                </Button>
                <Button
                  variant={activeTab === 'pantry' ? "default" : "outline"}
                  onClick={() => !cardCollapsed && setActiveTab('pantry')}
                  disabled={cardCollapsed}
                  className={`flex-1 flex items-center justify-center gap-2 ${
                    activeTab === 'pantry' 
                      ? 'bg-purple-600 text-white border-purple-600' 
                      : 'bg-transparent border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                  } ${cardCollapsed ? 'opacity-75 cursor-default' : ''}`}
                >
                  Pantry
                  {pantryConfirmed && <span className="text-green-400 text-xs">✓</span>}
                </Button>
              </div>

              {/* Tab Content */}
              {!cardCollapsed && (
                <div className="space-y-4">
                  {/* Diet Tab */}
                  {activeTab === 'diet' && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-yellow-300 mb-3 drop-shadow-lg">Dietary Preferences</h4>
                      
                      {/* Dietary Restrictions */}
                      <div className="space-y-4">
                        <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-3">
                          <h5 className="text-sm font-bold text-yellow-300 mb-2 drop-shadow-lg">Dietary Restrictions:</h5>
                          <div className="text-sm text-gray-300">
                            {userData?.dietaryRestrictions && userData.dietaryRestrictions.length > 0 
                              ? userData.dietaryRestrictions.map(item => 
                                  item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
                                ).join(', ')
                              : 'Vegetarian, Vegan, Gluten-Free, Dairy-Free, Low-Carb'
                            }
                          </div>
                        </div>
                        
                        {/* Health Factors */}
                        <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-3">
                          <h5 className="text-sm font-bold text-yellow-300 mb-2 drop-shadow-lg">Health Factors:</h5>
                          <div className="text-sm text-gray-300">
                            {userData?.healthConditions && userData.healthConditions.length > 0 
                              ? userData.healthConditions.map(item => 
                                  item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
                                ).join(', ')
                              : 'Diabetes, Cardiovascular, Kidney, Blood-Pressure, Cancer'
                            }
                          </div>
                        </div>
                        
                        {/* Fitness Goals */}
                        <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-3">
                          <h5 className="text-sm font-bold text-yellow-300 mb-2 drop-shadow-lg">Fitness Goals:</h5>
                          <div className="text-sm text-gray-300">
                            {userData?.fitnessGoals && userData.fitnessGoals.length > 0 
                              ? userData.fitnessGoals.map(item => 
                                  item.split('-').map(word => 
                                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                                  ).join(' ')
                                ).join(', ')
                              : 'Build Muscle, Lose Weight, Endurance, Wellness'
                            }
                          </div>
                        </div>
                        
                        {/* Allergies/Restrictions */}
                        <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-3">
                          <h5 className="text-sm font-bold text-yellow-300 mb-2 drop-shadow-lg">Allergies/Restrictions:</h5>
                          <div className="text-sm text-gray-300">
                            {userData?.allergies && userData.allergies.trim() 
                              ? userData.allergies
                              : 'None specified'
                            }
                          </div>
                        </div>
                        
                        {/* Nutritional Goals */}
                        <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-3">
                          <h5 className="text-sm font-bold text-yellow-300 mb-2 drop-shadow-lg">Nutritional Goals:</h5>
                          <div className="text-sm text-gray-300">
                            {userData?.nutritionalGoals 
                              ? `Cal: ${userData.nutritionalGoals.calories || '1301-1500'}, Protein: ${userData.nutritionalGoals.protein || '71-100g'}, Carbs: ${userData.nutritionalGoals.carbs || '101-150g'}, Fat: ${userData.nutritionalGoals.fat || '36-50g'}`
                              : 'Cal: 1301-1500, Protein: 71-100g, Carbs: 101-150g, Fat: 36-50g'
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Meal Tab */}
                  {activeTab === 'meal' && (
                    <div className="space-y-4">
                      {/* Row 1: Serving Size & Cuisine */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-bold text-yellow-300 mb-1 block drop-shadow-lg">Serving Size *</label>
                          <Select 
                            value={mealPreferences.servingSize || ''} 
                            onValueChange={(value) => setMealPreferences({...mealPreferences, servingSize: value})}
                          >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white h-10">
                              <SelectValue placeholder="2 people" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              <SelectItem value="1 person" className="text-white hover:bg-gray-600">1 person</SelectItem>
                              <SelectItem value="2 people" className="text-white hover:bg-gray-600">2 people</SelectItem>
                              <SelectItem value="3-4 people" className="text-white hover:bg-gray-600">3-4 people</SelectItem>
                              <SelectItem value="5+ people" className="text-white hover:bg-gray-600">5+ people</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-bold text-yellow-300 mb-1 block drop-shadow-lg">Cuisine *</label>
                          <Select 
                            value={mealPreferences.cuisine || ''} 
                            onValueChange={(value) => setMealPreferences({...mealPreferences, cuisine: value})}
                            disabled={!mealPreferences.servingSize}
                          >
                            <SelectTrigger className={`bg-gray-700 border-gray-600 text-white h-10 ${
                              !mealPreferences.servingSize ? 'opacity-50 cursor-not-allowed' : ''
                            }`}>
                              <SelectValue placeholder="American" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              <SelectItem value="American" className="text-white hover:bg-gray-600">American</SelectItem>
                              <SelectItem value="Italian" className="text-white hover:bg-gray-600">Italian</SelectItem>
                              <SelectItem value="Mexican" className="text-white hover:bg-gray-600">Mexican</SelectItem>
                              <SelectItem value="Chinese" className="text-white hover:bg-gray-600">Chinese</SelectItem>
                              <SelectItem value="Indian" className="text-white hover:bg-gray-600">Indian</SelectItem>
                              <SelectItem value="Mediterranean" className="text-white hover:bg-gray-600">Mediterranean</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Row 2: Meal Type & Spice Level */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-bold text-yellow-300 mb-1 block drop-shadow-lg">Meal Type *</label>
                          <Select 
                            value={mealPreferences.mealType || ''} 
                            onValueChange={(value) => setMealPreferences({...mealPreferences, mealType: value})}
                            disabled={!mealPreferences.cuisine}
                          >
                            <SelectTrigger className={`bg-gray-700 border-gray-600 text-white h-10 ${
                              !mealPreferences.cuisine ? 'opacity-50 cursor-not-allowed' : ''
                            }`}>
                              <SelectValue placeholder="Dinner" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              <SelectItem value="Breakfast" className="text-white hover:bg-gray-600">Breakfast</SelectItem>
                              <SelectItem value="Lunch" className="text-white hover:bg-gray-600">Lunch</SelectItem>
                              <SelectItem value="Dinner" className="text-white hover:bg-gray-600">Dinner</SelectItem>
                              <SelectItem value="Snack" className="text-white hover:bg-gray-600">Snack</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-bold text-yellow-300 mb-1 block drop-shadow-lg">Spice Level</label>
                          <Select 
                            value={mealPreferences.spiceLevel || ''} 
                            onValueChange={(value) => setMealPreferences({...mealPreferences, spiceLevel: value})}
                            disabled={!mealPreferences.mealType}
                          >
                            <SelectTrigger className={`bg-gray-700 border-gray-600 text-white h-10 ${
                              !mealPreferences.mealType ? 'opacity-50 cursor-not-allowed' : ''
                            }`}>
                              <SelectValue placeholder="😊 Mild" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              <SelectItem value="Mild" className="text-white hover:bg-gray-600">😊 Mild</SelectItem>
                              <SelectItem value="Medium" className="text-white hover:bg-gray-600">🌶️ Medium</SelectItem>
                              <SelectItem value="Spicy" className="text-white hover:bg-gray-600">🔥 Spicy</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Separator between required and optional fields */}
                      <div className="my-4">
                        <div className="bg-gray-600 h-px w-full"></div>
                      </div>

                      {/* Row 3: Skill Level & Cook Method */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-bold text-yellow-300 mb-1 block drop-shadow-lg">Skill Level</label>
                          <Select 
                            value={mealPreferences.skillLevel || ''} 
                            onValueChange={(value) => setMealPreferences({...mealPreferences, skillLevel: value})}
                            disabled={!mealPreferences.spiceLevel}
                          >
                            <SelectTrigger className={`bg-gray-700 border-gray-600 text-white h-10 ${
                              !mealPreferences.spiceLevel ? 'opacity-50 cursor-not-allowed' : ''
                            }`}>
                              <SelectValue placeholder="🔰 Beginner" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              <SelectItem value="Beginner" className="text-white hover:bg-gray-600">🔰 Beginner</SelectItem>
                              <SelectItem value="Intermediate" className="text-white hover:bg-gray-600">⚡ Intermediate</SelectItem>
                              <SelectItem value="Advanced" className="text-white hover:bg-gray-600">🎯 Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-bold text-yellow-300 mb-1 block drop-shadow-lg">Cook Method</label>
                          <Select 
                            value={mealPreferences.cookMethod || ''} 
                            onValueChange={(value) => setMealPreferences({...mealPreferences, cookMethod: value})}
                            disabled={!mealPreferences.skillLevel}
                          >
                            <SelectTrigger className={`bg-gray-700 border-gray-600 text-white h-10 ${
                              !mealPreferences.skillLevel ? 'opacity-50 cursor-not-allowed' : ''
                            }`}>
                              <SelectValue placeholder="🔥 Oven" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              <SelectItem value="Oven" className="text-white hover:bg-gray-600">🔥 Oven</SelectItem>
                              <SelectItem value="Stovetop" className="text-white hover:bg-gray-600">🍳 Stovetop</SelectItem>
                              <SelectItem value="Microwave" className="text-white hover:bg-gray-600">⚡ Microwave</SelectItem>
                              <SelectItem value="Grill" className="text-white hover:bg-gray-600">🔥 Grill</SelectItem>
                              <SelectItem value="Air Fryer" className="text-white hover:bg-gray-600">💨 Air Fryer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Row 4: Prep Time */}
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <label className="text-sm font-bold text-yellow-300 mb-1 block drop-shadow-lg">Prep Time</label>
                          <Select 
                            value={mealPreferences.prepTime || ''} 
                            onValueChange={(value) => setMealPreferences({...mealPreferences, prepTime: value})}
                            disabled={!mealPreferences.cookMethod}
                          >
                            <SelectTrigger className={`bg-gray-700 border-gray-600 text-white h-10 ${
                              !mealPreferences.cookMethod ? 'opacity-50 cursor-not-allowed' : ''
                            }`}>
                              <SelectValue placeholder="⏰ 30 minutes" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              <SelectItem value="15 minutes" className="text-white hover:bg-gray-600">⏰ 15 minutes</SelectItem>
                              <SelectItem value="30 minutes" className="text-white hover:bg-gray-600">⏰ 30 minutes</SelectItem>
                              <SelectItem value="45 minutes" className="text-white hover:bg-gray-600">⏰ 45 minutes</SelectItem>
                              <SelectItem value="60 minutes" className="text-white hover:bg-gray-600">⏰ 60 minutes</SelectItem>
                              <SelectItem value="90+ minutes" className="text-white hover:bg-gray-600">⏰ 90+ minutes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Confirmation Checkbox */}
                      {mealFieldsComplete && (
                        <div className="mt-4 pt-3">
                          <div className="flex items-center space-x-3 bg-purple-600/20 border border-purple-600 rounded-lg p-3">
                            <Checkbox
                              id="meal-confirm"
                              checked={mealConfirmed}
                              onCheckedChange={(checked) => {
                                setMealConfirmed(checked);
                                if (checked) {
                                  setTimeout(() => setActiveTab('pantry'), 500);
                                }
                              }}
                              className="w-6 h-6 rounded-full border-purple-400 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                            />
                            <label htmlFor="meal-confirm" className="text-sm font-bold text-yellow-300 drop-shadow-lg">
                              I confirm the above meal preferences
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Pantry Tab */}
                  {activeTab === 'pantry' && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-yellow-300 mb-3 drop-shadow-lg">Available Ingredients</h4>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-yellow-300 drop-shadow-lg">Selected Ingredients:</span>
                        <span className="text-sm text-gray-400">{selectedIngredients.length} items selected</span>
                      </div>
                      
                      <hr className="border-gray-600" />
                      
                      <div className="space-y-3 min-h-[350px]">
                        {Object.entries(ingredientCategories).map(([category, ingredients], index) => (
                          <div key={category}>
                            <h5 className="text-sm font-bold text-yellow-300 mb-2 drop-shadow-lg">{category}</h5>
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              {ingredients.map((ingredient) => (
                                <label key={ingredient} className="flex items-center space-x-2 cursor-pointer">
                                  <Checkbox
                                    checked={selectedIngredients.includes(ingredient)}
                                    onCheckedChange={() => handleIngredientToggle(ingredient)}
                                    className="w-4 h-4 rounded border-gray-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                  />
                                  <span className="text-sm text-gray-300">{ingredient}</span>
                                </label>
                              ))}
                            </div>
                            {/* Separator between categories (except last one) */}
                            {index < Object.entries(ingredientCategories).length - 1 && (
                              <div className="my-3">
                                <div className="bg-gray-600 h-px w-full"></div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {/* Add Custom Ingredient */}
                      <div className="border-t border-gray-600 pt-3">
                        <h5 className="text-sm font-bold text-yellow-300 mb-2 drop-shadow-lg">Add Custom Ingredient</h5>
                        <div className="flex gap-2">
                          <Input
                            value={newIngredient}
                            onChange={(e) => setNewIngredient(e.target.value)}
                            placeholder="Enter ingredient name"
                            className="flex-1 bg-gray-700 border-gray-600 text-white"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddCustomIngredient()}
                          />
                          <Button
                            onClick={handleAddCustomIngredient}
                            disabled={!newIngredient.trim()}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4"
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      </div>

                      {/* Pantry Confirmation */}
                      {pantryFieldsComplete && (
                        <div className="mt-4 pt-3">
                          <div className="flex items-center space-x-3 bg-purple-600/20 border border-purple-600 rounded-lg p-3">
                            <Checkbox
                              id="pantry-confirm"
                              checked={pantryConfirmed}
                              onCheckedChange={(checked) => setPantryConfirmed(checked)}
                              className="w-6 h-6 rounded-full border-purple-400 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                            />
                            <label htmlFor="pantry-confirm" className="text-sm font-bold text-yellow-300 drop-shadow-lg">
                              I confirm the above pantry ingredients
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Card 2: Recipe Options */}
        <div className="order-2">
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-white">Recipe Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline"
                  className={`h-14 border transition-all duration-200 ${
                    selectedRecipeOption === 'chefs-choice'
                      ? 'bg-purple-600 border-purple-600 text-white' 
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                  }`}
                  onClick={() => {
                    setShowChefsChoice(true);
                    setShowPantryDishes(false);
                    setShowTakeOut(false);
                    setSelectedRecipeOption('chefs-choice');
                    logRecipeOptionState('Chef\'s Choice clicked');
                  }}
                >
                  Chef's Choice
                </Button>
                <Button 
                  variant="outline"
                  className={`h-14 border transition-all duration-200 ${
                    selectedRecipeOption === 'pantry-dishes'
                      ? 'bg-purple-600 border-purple-600 text-white' 
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                  }`}
                  onClick={() => {
                    setShowPantryDishes(true);
                    setShowChefsChoice(false);
                    setShowTakeOut(false);
                    setSelectedRecipeOption('pantry-dishes');
                    logRecipeOptionState('Pantry Dishes clicked');
                  }}
                >
                  Pantry Dishes
                </Button>
                <Button 
                  variant="outline"
                  className={`h-14 border transition-all duration-200 ${
                    selectedRecipeOption === 'create-dishes'
                      ? 'bg-purple-600 border-purple-600 text-white' 
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                  }`}
                  onClick={() => {
                    setShowChefsChoice(false);
                    setShowPantryDishes(false);
                    setShowTakeOut(false);
                    setSelectedRecipeOption('create-dishes');
                    logRecipeOptionState('Create Dishes clicked');
                    setLocation('/create-dishes');
                  }}
                >
                  Create Dishes
                </Button>
                <Button 
                  variant="outline"
                  className={`h-14 border transition-all duration-200 ${
                    selectedRecipeOption === 'take-out'
                      ? 'bg-purple-600 border-purple-600 text-white' 
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                  }`}
                  onClick={() => {
                    setShowTakeOut(true);
                    setShowChefsChoice(false);
                    setShowPantryDishes(false);
                    setSelectedRecipeOption('take-out');
                    logRecipeOptionState('Take-Out clicked');
                  }}
                >
                  Take-Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chef's Choice Dishes Card */}
        {showChefsChoice && (
          <div className="order-2">
            <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">Chef Recommends</CardTitle>
                  <button
                    onClick={() => {
                      setShowChefsChoice(false);
                      setSelectedRecipeOption('');
                      logRecipeOptionState('Chef\'s Choice chevron collapse');
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronUp size={20} />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {chefsChoiceDishes.map((dish) => renderDishCard(dish))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Pantry Dishes Card */}
        {showPantryDishes && (
          <div className="order-2">
            <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">Pantry Dishes</CardTitle>
                  <button
                    onClick={() => {
                      setShowPantryDishes(false);
                      setSelectedRecipeOption('');
                      logRecipeOptionState('Pantry Dishes chevron collapse');
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronUp size={20} />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {pantryDishes.map((dish) => renderDishCard(dish))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Take-Out Form Card */}
        {showTakeOut && (
          <div className="order-2">
            <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-yellow-300 font-bold text-xl drop-shadow-lg">
                    Order take out for group or weekly meals
                  </CardTitle>
                  <button
                    onClick={() => {
                      setShowTakeOut(false);
                      setSelectedRecipeOption('');
                      logRecipeOptionState('Take-Out chevron collapse');
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronUp size={20} />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Serving Size and Cuisine Row */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-yellow-300 font-bold text-sm mb-2 drop-shadow-lg">
                      Serving Size
                    </label>
                    <Select onValueChange={setTakeOutServingSize} value={takeOutServingSize}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2 people">2 people</SelectItem>
                        <SelectItem value="4 people">4 people</SelectItem>
                        <SelectItem value="6 people">6 people</SelectItem>
                        <SelectItem value="8 people">8 people</SelectItem>
                        <SelectItem value="10 people">10 people</SelectItem>
                        <SelectItem value="15 meals">15 meals</SelectItem>
                        <SelectItem value="20 meals">20 meals</SelectItem>
                        <SelectItem value="30 meals">30 meals (monthly)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-yellow-300 font-bold text-sm mb-2 drop-shadow-lg">
                      Cuisine
                    </label>
                    <Select onValueChange={setTakeOutCuisine} value={takeOutCuisine}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select cuisine" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="American">American</SelectItem>
                        <SelectItem value="Italian">Italian</SelectItem>
                        <SelectItem value="Mexican">Mexican</SelectItem>
                        <SelectItem value="Chinese">Chinese</SelectItem>
                        <SelectItem value="Indian">Indian</SelectItem>
                        <SelectItem value="Japanese">Japanese</SelectItem>
                        <SelectItem value="Thai">Thai</SelectItem>
                        <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Meal Type and Delivery Date Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-yellow-300 font-bold text-sm mb-2 drop-shadow-lg">
                      Meal Type
                    </label>
                    <Select onValueChange={setTakeOutMealType} value={takeOutMealType}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select meal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Breakfast">Breakfast</SelectItem>
                        <SelectItem value="Lunch">Lunch</SelectItem>
                        <SelectItem value="Dinner">Dinner</SelectItem>
                        <SelectItem value="Mixed Meals">Mixed Meals</SelectItem>
                        <SelectItem value="Party Catering">Party Catering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-yellow-300 font-bold text-sm mb-2 drop-shadow-lg">
                      Delivery Date
                    </label>
                    <Input
                      type="date"
                      value={takeOutDeliveryDate}
                      onChange={(e) => setTakeOutDeliveryDate(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                {/* Design Take out Menu Button */}
                <Button
                  onClick={handleDesignTakeOutMenu}
                  disabled={!isTakeOutFormComplete}
                  className={`w-full h-12 mt-6 ${
                    isTakeOutFormComplete
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Design Take out Menu
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Take-Out Menu Card */}
        {showTakeOutMenu && (
          <div className="order-2">
            <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">Take-Out Menu Categories</CardTitle>
                  <button
                    onClick={() => setShowTakeOutMenu(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronUp size={20} />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Category Buttons */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {Object.keys(takeOutDishes).map((category) => (
                    <Button
                      key={category}
                      variant="outline"
                      className={`h-12 border transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                </div>

                {/* Dish Grid */}
                <div className="grid grid-cols-1 gap-4">
                  {takeOutDishes[selectedCategory as keyof typeof takeOutDishes].map((dish) => renderDishCard(dish, false))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Card 3: History */}
        {(mealConfirmed || pantryConfirmed) && (
          <div className="order-3 mb-4">
            <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-white">History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white h-12 flex flex-col items-center justify-center"
                  >
                    <ChefHat className="w-4 h-4 mb-1" />
                    <span className="text-xs">Dishes Cooked</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white h-12 flex flex-col items-center justify-center"
                  >
                    <Truck className="w-4 h-4 mb-1" />
                    <span className="text-xs">Takeout Orders</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white h-12 flex flex-col items-center justify-center"
                    onClick={() => setLocation('/grocery-list')}
                  >
                    <ShoppingCart className="w-4 h-4 mb-1" />
                    <span className="text-xs">Grocery List</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white h-12 flex flex-col items-center justify-center"
                  >
                    <BookOpen className="w-4 h-4 mb-1" />
                    <span className="text-xs">Recipes Saved</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Card 4: Summary */}
        {(selectedIngredients.length > 0 || Object.values(mealPreferences).some(val => val !== "")) && (
          <div className="order-4">
            <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-white">
                  Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(mealPreferences.servingSize || mealPreferences.cuisine || mealPreferences.mealType) && (
                    <div>
                      <h4 className="text-sm font-bold text-yellow-300 mb-2 drop-shadow-lg">Meal Preferences</h4>
                      <div className="text-sm text-gray-400 space-y-1">
                        <div>Serving: {mealPreferences.servingSize}, Cuisine: {mealPreferences.cuisine}</div>
                        <div>Meal Type: {mealPreferences.mealType}</div>
                      </div>
                    </div>
                  )}
                  
                  {selectedIngredients.length > 0 && (
                    <div>
                      <div className="border-t border-gray-600 pt-3"></div>
                      <h4 className="text-sm font-bold text-yellow-300 mb-2 drop-shadow-lg">Pantry Ingredients</h4>
                      <div className="text-sm text-gray-400">
                        {selectedIngredients.slice(0, 8).join(', ')}
                        {selectedIngredients.length > 8 && ` and ${selectedIngredients.length - 8} more`}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-gray-700 border-gray-600 text-gray-300"
                      onClick={() => setLocation('/grocery-list')}
                    >
                      Grocery List
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-gray-700 border-gray-600 text-gray-300"
                      onClick={() => {
                        setActiveTab('meal');
                        setCardCollapsed(false);
                        setCardPosition('top');
                        setPantryConfirmed(false);
                        setMealConfirmed(false);
                      }}
                    >
                      Edit Preferences
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      {/* Bottom spacing for navigation */}
      <div className="h-20"></div>

      {/* Cook Confirmation Dialog */}
      {cookConfirmationOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">Ready to Start Cooking?</h3>
            
            <p className="text-gray-300 text-center mb-6">
              Confirm you have made substitutions for{" "}
              <span className="text-yellow-300 font-bold">
                {chefsChoiceDishes.find(d => d.id === cookConfirmationOpen)?.name || 
                 pantryDishes.find(d => d.id === cookConfirmationOpen)?.name}
              </span>{" "}
              and have ingredients in the pantry so you can start cooking
            </p>

            <div className="flex items-center space-x-2 mb-6">
              <Checkbox
                id="cook-confirm"
                checked={cookConfirmed}
                onCheckedChange={setCookConfirmed}
                className="w-5 h-5 rounded border-gray-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <label htmlFor="cook-confirm" className="text-sm text-gray-300">
                I confirm I have all ingredients ready
              </label>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setCookConfirmationOpen(null)}
                className="flex-1 bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmCook}
                disabled={!cookConfirmed}
                className={`flex-1 ${
                  cookConfirmed 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Start Cooking
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}