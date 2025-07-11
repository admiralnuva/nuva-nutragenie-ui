import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ScreenHeader } from "@/components/ui/screen-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpandableDishCard } from "@/components/ui/expandable-dish-card";
import { DishCard } from "@/components/ui/dish-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Clock, Users, ChefHat, Flame, Target, Utensils, ShoppingCart, Sparkles, Plus, List, Minus, ChevronDown, ChevronUp, ArrowLeft, BookOpen, Repeat, Heart, Truck, Save, CookingPot, ArrowLeftRight } from "lucide-react";
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

// Chef's Choice dishes data
const chefsChoiceDishes = [
  {
    id: 1,
    name: "Tuscan Salmon",
    image: chefsChoiceImages["herb-crusted-fish"],
    calories: 550,
    protein: "45g",
    cookTime: "30 min",
    difficulty: "Easy"
  },
  {
    id: 2,
    name: "Mediterranean Bowl",
    image: chefsChoiceImages["mediterranean-bowl"],
    calories: 420,
    protein: "32g",
    cookTime: "25 min",
    difficulty: "Easy"
  },
  {
    id: 3,
    name: "Quinoa Power Salad",
    image: chefsChoiceImages["quinoa-salad"],
    calories: 380,
    protein: "28g",
    cookTime: "20 min",
    difficulty: "Easy"
  },
  {
    id: 4,
    name: "Stuffed Bell Peppers",
    image: chefsChoiceImages["stuffed-peppers"],
    calories: 310,
    protein: "25g",
    cookTime: "45 min",
    difficulty: "Medium"
  },
  {
    id: 5,
    name: "Power Smoothie Bowl",
    image: chefsChoiceImages["power-smoothie-bowl"],
    calories: 290,
    protein: "22g",
    cookTime: "15 min",
    difficulty: "Easy"
  },
  {
    id: 6,
    name: "Hearty Vegetable Soup",
    image: chefsChoiceImages["soup"],
    calories: 240,
    protein: "18g",
    cookTime: "35 min",
    difficulty: "Easy"
  }
];

// Pantry Dishes data
const pantryDishes = [
  {
    id: 1,
    name: "Classic Fried Rice",
    image: pantryDishImages["fried-rice"],
    calories: 320,
    protein: "12g",
    cookTime: "15 min",
    difficulty: "Easy"
  },
  {
    id: 2,
    name: "Garlic Herb Bread",
    image: pantryDishImages["garlic-bread"],
    calories: 180,
    protein: "6g",
    cookTime: "12 min",
    difficulty: "Easy"
  },
  {
    id: 3,
    name: "Creamy Pasta",
    image: pantryDishImages["pasta"],
    calories: 450,
    protein: "18g",
    cookTime: "20 min",
    difficulty: "Easy"
  },
  {
    id: 4,
    name: "Fluffy Scrambled Eggs",
    image: pantryDishImages["scrambled-eggs"],
    calories: 280,
    protein: "24g",
    cookTime: "8 min",
    difficulty: "Easy"
  },
  {
    id: 5,
    name: "Comfort Soup",
    image: pantryDishImages["soup"],
    calories: 220,
    protein: "14g",
    cookTime: "25 min",
    difficulty: "Easy"
  },
  {
    id: 6,
    name: "Toast & Jam",
    image: pantryDishImages["toast-and-jam"],
    calories: 150,
    protein: "4g",
    cookTime: "5 min",
    difficulty: "Easy"
  }
];

// Substitution ingredient data for dishes
const dishSubstitutions = {
  1: { // Tuscan Salmon
    mainIngredients: [
      { name: "Salmon Fillet", calories: 206, protein: 22, substitutions: ["Chicken Breast", "Cod Fillet", "Tofu"] },
      { name: "Heavy Cream", calories: 51, protein: 0.4, substitutions: ["Coconut Cream", "Greek Yogurt", "Cashew Cream"] },
      { name: "Spinach", calories: 7, protein: 0.9, substitutions: ["Kale", "Arugula", "Chard"] }
    ]
  },
  2: { // Mediterranean Bowl
    mainIngredients: [
      { name: "Quinoa", calories: 222, protein: 8, substitutions: ["Brown Rice", "Bulgur", "Farro"] },
      { name: "Chickpeas", calories: 164, protein: 8.9, substitutions: ["Black Beans", "Lentils", "White Beans"] },
      { name: "Feta Cheese", calories: 75, protein: 4, substitutions: ["Goat Cheese", "Mozzarella", "Vegan Cheese"] }
    ]
  },
  3: { // Quinoa Power Salad
    mainIngredients: [
      { name: "Quinoa", calories: 222, protein: 8, substitutions: ["Brown Rice", "Wild Rice", "Barley"] },
      { name: "Almonds", calories: 164, protein: 6, substitutions: ["Walnuts", "Pecans", "Sunflower Seeds"] },
      { name: "Avocado", calories: 160, protein: 2, substitutions: ["Hummus", "Tahini", "Olive Oil"] }
    ]
  },
  4: { // Power Smoothie Bowl
    mainIngredients: [
      { name: "Acai Puree", calories: 70, protein: 1, substitutions: ["Frozen Berries", "Dragon Fruit", "Mango"] },
      { name: "Protein Powder", calories: 120, protein: 25, substitutions: ["Greek Yogurt", "Silken Tofu", "Chia Seeds"] },
      { name: "Granola", calories: 150, protein: 4, substitutions: ["Oats", "Nuts", "Seeds"] }
    ]
  },
  5: { // Stuffed Bell Peppers
    mainIngredients: [
      { name: "Ground Turkey", calories: 117, protein: 20, substitutions: ["Ground Beef", "Lentils", "Mushrooms"] },
      { name: "Brown Rice", calories: 112, protein: 2.3, substitutions: ["Quinoa", "Cauliflower Rice", "Wild Rice"] },
      { name: "Cheddar Cheese", calories: 113, protein: 7, substitutions: ["Mozzarella", "Nutritional Yeast", "Goat Cheese"] }
    ]
  },
  6: { // Herb-Crusted Fish
    mainIngredients: [
      { name: "White Fish", calories: 134, protein: 25, substitutions: ["Salmon", "Chicken", "Tempeh"] },
      { name: "Panko Breadcrumbs", calories: 110, protein: 4, substitutions: ["Almond Flour", "Crushed Nuts", "Oats"] },
      { name: "Herbs", calories: 5, protein: 0.2, substitutions: ["Spices", "Garlic", "Lemon Zest"] }
    ]
  }
};

export default function ExploreRecipesScreen() {
  const [location, setLocation] = useLocation();
  const [currentUser] = useLocalStorage<any>("nutragenie_user", null);
  const [tempUser] = useLocalStorage<any>("nutragenie_temp_user", null);
  
  // Get user data - check both current and temp user
  const userData = currentUser || tempUser;
  
  // Navigation detection - check if coming from bottom tabs
  const [navigationSource, setNavigationSource] = useLocalStorage<string>("nutragenie_navigation_source", "");
  const isNavigatingFromTabs = navigationSource === "home" || navigationSource === "cook" || navigationSource === "take-out";

  // Get user and chef avatars
  const userAvatarSrc = userData?.avatar ? userAvatars[userData.avatar as keyof typeof userAvatars] : userAvatar1;
  const chefAvatarSrc = userData?.chef ? chefAvatars[userData.chef as keyof typeof chefAvatars] : chefAvatar1;
  
  // New navigation state for the redesigned interface
  const [activeTab, setActiveTab] = useState<'diet' | 'meal' | 'pantry'>('meal');
  const [isMealComplete, setIsMealComplete] = useState(false);
  const [isPantryComplete, setIsPantryComplete] = useState(false);
  const [preferencesCardSlid, setPreferencesCardSlid] = useState(false);
  const [showChefsChoice, setShowChefsChoice] = useState(false);
  const [showPantryDishes, setShowPantryDishes] = useState(false);
  const [showTakeOut, setShowTakeOut] = useState(false);
  const [selectedRecipeOption, setSelectedRecipeOption] = useState<string>('');

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
  
  // Pantry confirmation state
  const [isPantryConfirmed, setIsPantryConfirmed] = useState(false);
  
  // Card collapse state
  const [isPantryCardCollapsed, setIsPantryCardCollapsed] = useState(false);
  const [isPantryCardAtBottom, setIsPantryCardAtBottom] = useState(false);

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
      // Auto-collapse after 2 seconds
      const collapseTimer = setTimeout(() => {
        setIsPantryCardCollapsed(true);
      }, 2000);

      // Auto-slide to bottom after collapse animation and auto-select Chef's Choice
      const slideTimer = setTimeout(() => {
        setIsPantryCardAtBottom(true);
        setPreferencesCardSlid(true);
        
        // Auto-select Chef's Choice and show dishes
        setShowChefsChoice(true);
        setShowPantryDishes(false);
        setShowTakeOut(false);
        setSelectedRecipeOption('chefs-choice');
        
        // Play swish sound effect
        if (typeof Audio !== 'undefined') {
          const audio = new Audio('/api/placeholder/audio/swish');
          audio.volume = 0.3;
          audio.play().catch(e => console.log('Audio play failed:', e));
        }
      }, 3500);

      return () => {
        clearTimeout(collapseTimer);
        clearTimeout(slideTimer);
      };
    }
  }, [isMealComplete, isPantryComplete, preferencesCardSlid]);

  // Navigation-based initialization
  useEffect(() => {
    if (isNavigatingFromTabs) {
      // Coming from Home/Cook/Take-Out tabs - prioritize Recipe Options
      setShowChefsChoice(true);
      setSelectedRecipeOption('chefs-choice');
      setShowPantryDishes(false);
      setShowTakeOut(false);
      
      // Clear navigation source after handling
      setNavigationSource("");
    }
  }, [isNavigatingFromTabs, setNavigationSource]);
  
  // No automatic reset on navigation - preserve collapsed state after completion

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

  // Substitution state management
  const [substitutionOpenDish, setSubstitutionOpenDish] = useState<number | null>(null);
  const [selectedSubstitutions, setSelectedSubstitutions] = useState<{[dishId: number]: {[ingredientIndex: number]: string}}>({});
  const [substitutionConfirmed, setSubstitutionConfirmed] = useState<{[dishId: number]: boolean}>({});

  // Helper function to calculate updated nutrition values
  const calculateUpdatedNutrition = (dishId: number, originalCalories: number, originalProtein: string) => {
    const dishSubs = dishSubstitutions[dishId as keyof typeof dishSubstitutions];
    if (!dishSubs) return { calories: originalCalories, protein: originalProtein };

    const selectedSubs = selectedSubstitutions[dishId] || {};
    let totalCalories = originalCalories;
    let totalProtein = parseFloat(originalProtein.replace('g', ''));

    // Calculate nutrition difference for each substitution
    dishSubs.mainIngredients.forEach((ingredient, index) => {
      const selectedSub = selectedSubs[index];
      if (selectedSub && selectedSub !== ingredient.name) {
        // Calculate actual nutrition differences based on ingredient data
        const originalIngredient = ingredient;
        const substitutionIndex = ingredient.substitutions.indexOf(selectedSub);
        
        if (substitutionIndex !== -1) {
          // Apply specific nutrition changes based on substitution type
          if (selectedSub.toLowerCase().includes('tofu') || selectedSub.toLowerCase().includes('tempeh')) {
            // Plant proteins: lower calories, similar protein
            totalCalories -= Math.round(originalIngredient.calories * 0.2);
            totalProtein -= Math.round(originalIngredient.protein * 0.1);
          } else if (selectedSub.toLowerCase().includes('greek yogurt') || selectedSub.toLowerCase().includes('cashew')) {
            // Dairy alternatives: moderate calorie reduction
            totalCalories -= Math.round(originalIngredient.calories * 0.3);
            totalProtein += Math.round(originalIngredient.protein * 0.1);
          } else if (selectedSub.toLowerCase().includes('turkey') || selectedSub.toLowerCase().includes('fish')) {
            // Lean meats: slight calorie reduction, protein boost
            totalCalories -= Math.round(originalIngredient.calories * 0.1);
            totalProtein += Math.round(originalIngredient.protein * 0.15);
          } else {
            // Default: moderate reduction for healthier options
            totalCalories -= Math.round(originalIngredient.calories * 0.15);
            totalProtein -= Math.round(originalIngredient.protein * 0.05);
          }
        }
      }
    });

    // Ensure minimum values
    totalCalories = Math.max(totalCalories, Math.round(originalCalories * 0.7));
    totalProtein = Math.max(totalProtein, Math.round(parseFloat(originalProtein.replace('g', '')) * 0.8));

    return { calories: totalCalories, protein: `${totalProtein}g` };
  };

  // Handle substitution selection
  const handleSubstitutionSelect = (dishId: number, ingredientIndex: number, substitution: string) => {
    setSelectedSubstitutions(prev => ({
      ...prev,
      [dishId]: {
        ...prev[dishId],
        [ingredientIndex]: substitution
      }
    }));
  };

  // Handle substitution confirmation
  const handleSubstitutionConfirm = (dishId: number) => {
    setSubstitutionConfirmed(prev => ({ ...prev, [dishId]: true }));
    // Auto-collapse substitution card after 1 second
    setTimeout(() => {
      setSubstitutionOpenDish(null);
    }, 1000);
  };

  // Cook confirmation state
  const [cookConfirmationOpen, setCookConfirmationOpen] = useState<number | null>(null);
  const [cookConfirmed, setCookConfirmed] = useState<{[dishId: number]: boolean}>({});

  // Take-Out form state
  const [takeOutServingSize, setTakeOutServingSize] = useState('');
  const [takeOutCuisine, setTakeOutCuisine] = useState('');
  const [takeOutMealType, setTakeOutMealType] = useState('');
  const [takeOutDeliveryDate, setTakeOutDeliveryDate] = useState('');
  const [isTakeOutFormCollapsed, setIsTakeOutFormCollapsed] = useState(false);
  const [showTakeOutMenu, setShowTakeOutMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'soup' | 'salad' | 'entree' | 'dessert'>('soup');

  // Handle cook button click
  const handleCookClick = (dishId: number, dishName: string) => {
    setCookConfirmationOpen(dishId);
  };

  // Handle cook confirmation
  const handleCookConfirm = (dishId: number) => {
    setCookConfirmed(prev => ({ ...prev, [dishId]: true }));
    // Navigate to cook screen after confirmation
    setTimeout(() => {
      setLocation('/voice-cooking');
    }, 500);
  };

  // Handle take-out form submission
  const handleDesignTakeOutMenu = () => {
    if (takeOutServingSize && takeOutCuisine && takeOutMealType && takeOutDeliveryDate) {
      // Collapse the form and show menu
      setIsTakeOutFormCollapsed(true);
      setShowTakeOutMenu(true);
      console.log('Take-Out menu designed:', {
        servingSize: takeOutServingSize,
        cuisine: takeOutCuisine,
        mealType: takeOutMealType,
        deliveryDate: takeOutDeliveryDate
      });
    }
  };

  // Check if take-out form is complete
  const isTakeOutFormComplete = takeOutServingSize && takeOutCuisine && takeOutMealType && takeOutDeliveryDate;

  // Take-Out menu dish data
  const takeOutDishes = {
    soup: [
      { id: 201, name: 'Tomato Basil Soup', calories: 280, cookTime: '25 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 202, name: 'Chicken Noodle Soup', calories: 320, cookTime: '35 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 203, name: 'Minestrone Soup', calories: 260, cookTime: '40 min', difficulty: 'Medium' as const, image: '/api/placeholder/200/150' },
      { id: 204, name: 'Butternut Squash Soup', calories: 240, cookTime: '30 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 205, name: 'French Onion Soup', calories: 350, cookTime: '45 min', difficulty: 'Medium' as const, image: '/api/placeholder/200/150' },
      { id: 206, name: 'Mushroom Bisque', calories: 290, cookTime: '35 min', difficulty: 'Medium' as const, image: '/api/placeholder/200/150' }
    ],
    salad: [
      { id: 301, name: 'Caesar Salad', calories: 340, cookTime: '15 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 302, name: 'Greek Salad', calories: 280, cookTime: '10 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 303, name: 'Garden Salad', calories: 180, cookTime: '10 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 304, name: 'Cobb Salad', calories: 420, cookTime: '20 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 305, name: 'Quinoa Power Salad', calories: 360, cookTime: '15 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 306, name: 'Spinach Berry Salad', calories: 240, cookTime: '12 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' }
    ],
    entree: [
      { id: 401, name: 'Grilled Chicken Breast', calories: 520, cookTime: '25 min', difficulty: 'Medium' as const, image: '/api/placeholder/200/150' },
      { id: 402, name: 'Pan-Seared Salmon', calories: 480, cookTime: '20 min', difficulty: 'Medium' as const, image: '/api/placeholder/200/150' },
      { id: 403, name: 'Beef Stir Fry', calories: 560, cookTime: '30 min', difficulty: 'Medium' as const, image: '/api/placeholder/200/150' },
      { id: 404, name: 'Tofu Pad Thai', calories: 420, cookTime: '25 min', difficulty: 'Medium' as const, image: '/api/placeholder/200/150' },
      { id: 405, name: 'Pork Tenderloin', calories: 540, cookTime: '35 min', difficulty: 'Hard' as const, image: '/api/placeholder/200/150' },
      { id: 406, name: 'Lamb Chops', calories: 580, cookTime: '30 min', difficulty: 'Hard' as const, image: '/api/placeholder/200/150' }
    ],
    dessert: [
      { id: 501, name: 'Chocolate Cheesecake', calories: 450, cookTime: '15 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 502, name: 'Vanilla Ice Cream', calories: 280, cookTime: '5 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 503, name: 'Tiramisu', calories: 380, cookTime: '20 min', difficulty: 'Medium' as const, image: '/api/placeholder/200/150' },
      { id: 504, name: 'Apple Pie', calories: 420, cookTime: '45 min', difficulty: 'Hard' as const, image: '/api/placeholder/200/150' },
      { id: 505, name: 'Chocolate Lava Cake', calories: 520, cookTime: '25 min', difficulty: 'Medium' as const, image: '/api/placeholder/200/150' },
      { id: 506, name: 'Fruit Tart', calories: 340, cookTime: '30 min', difficulty: 'Medium' as const, image: '/api/placeholder/200/150' }
    ]
  };



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

  // Check pantry completion status - requires both ingredients AND confirmation
  useEffect(() => {
    const hasEnoughIngredients = selectedIngredients.length >= 3;
    const isConfirmed = isPantryConfirmed;
    setIsPantryComplete(hasEnoughIngredients && isConfirmed);
  }, [selectedIngredients, isPantryConfirmed]);

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

        <div className="flex flex-col space-y-4">
          {/* Card 1: Preferences and Pantry Ingredients */}
          <div className={`transition-all duration-700 ease-in-out transform ${
            isPantryCardAtBottom ? 'order-5 translate-y-2 scale-95 opacity-95' : 
            isNavigatingFromTabs ? 'order-3 translate-y-0 scale-100 opacity-100' :
            'order-1 translate-y-0 scale-100 opacity-100'
          }`}>
            <Card className={`bg-gray-800/90 backdrop-blur-sm border border-gray-700 transition-all duration-700 ease-in-out ${
              isPantryCardCollapsed ? 'min-h-[120px] scale-98' : 'min-h-[400px] scale-100'
            }`}>
              <CardHeader className="pb-4 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg text-white">Personalize Diet & Pantry</CardTitle>
                    {isPantryCardCollapsed && (
                      <button
                        onClick={() => setIsPantryCardCollapsed(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <ChevronDown size={20} />
                      </button>
                    )}
                  </div>
                  {/* User Avatar - Top Right Corner */}
                  <div className="flex items-center">
                    <img 
                      src={userAvatarSrc} 
                      alt="User Avatar" 
                      className="w-16 h-16 rounded-full"
                      style={{ border: 'none' }}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Tab Navigation - Always visible */}
                <div className="flex gap-2 mb-4">
                  <Button
                    variant={activeTab === 'diet' ? "default" : "outline"}
                    onClick={() => !isPantryCardCollapsed && setActiveTab('diet')}
                    disabled={isPantryCardCollapsed}
                    className={`flex-1 ${
                      activeTab === 'diet' 
                        ? 'bg-purple-600 text-white border-purple-600' 
                        : 'bg-transparent border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                    } ${isPantryCardCollapsed ? 'opacity-75 cursor-default' : ''}`}
                  >
                    Diet
                  </Button>
                  <Button
                    variant={activeTab === 'meal' ? "default" : "outline"}
                    onClick={() => !isPantryCardCollapsed && setActiveTab('meal')}
                    disabled={isPantryCardCollapsed}
                    className={`flex-1 flex items-center justify-center gap-2 ${
                      activeTab === 'meal' 
                        ? 'bg-purple-600 text-white border-purple-600' 
                        : 'bg-transparent border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                    } ${isPantryCardCollapsed ? 'opacity-75 cursor-default' : ''}`}
                  >
                    Meal
                    {isMealComplete && <span className="text-green-400 text-xs">✓</span>}
                  </Button>
                  <Button
                    variant={activeTab === 'pantry' ? "default" : "outline"}
                    onClick={() => !isPantryCardCollapsed && setActiveTab('pantry')}
                    disabled={isPantryCardCollapsed}
                    className={`flex-1 flex items-center justify-center gap-2 ${
                      activeTab === 'pantry' 
                        ? 'bg-purple-600 text-white border-purple-600' 
                        : 'bg-transparent border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                    } ${isPantryCardCollapsed ? 'opacity-75 cursor-default' : ''}`}
                  >
                    Pantry
                    {isPantryComplete && <span className="text-green-400 text-xs">✓</span>}
                  </Button>
                </div>

                {/* Tab Content - Hidden when collapsed */}
                {!isPantryCardCollapsed && (
                  <div className="mt-4 min-h-[280px] transition-all duration-500 ease-in-out opacity-100">
                  {activeTab === 'diet' && (
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-yellow-300 mb-3 drop-shadow-lg">Dietary Preferences</h4>
                      
                      {/* Dietary Restrictions - Split into two rows */}
                      <div>
                        <span className="text-sm font-bold text-yellow-300 drop-shadow-lg">Dietary Restrictions:</span>
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
                        <span className="text-sm font-bold text-yellow-300 drop-shadow-lg">Health Factors: </span>
                        <span className="text-sm text-gray-400">
                          {userData?.healthGoals?.filter(goal => ['diabetes', 'cardiovascular', 'kidney', 'blood-pressure', 'cancer'].includes(goal))?.length > 0 ? 
                            userData.healthGoals.filter(goal => ['diabetes', 'cardiovascular', 'kidney', 'blood-pressure', 'cancer'].includes(goal)).join(', ') : 
                            'No conditions'}
                        </span>
                      </div>
                      
                      <hr className="border-gray-600" />
                      
                      {/* Fitness Goals - Compact row */}
                      <div>
                        <span className="text-sm font-bold text-yellow-300 drop-shadow-lg">Fitness Goals: </span>
                        <span className="text-sm text-gray-400">
                          {userData?.healthGoals?.filter(goal => ['build-muscle', 'lose-weight', 'endurance', 'wellness'].includes(goal))?.length > 0 ? 
                            userData.healthGoals.filter(goal => ['build-muscle', 'lose-weight', 'endurance', 'wellness'].includes(goal)).map(goal => goal.replace('-', ' ')).join(', ') : 
                            'None set'}
                        </span>
                      </div>
                      
                      <hr className="border-gray-600" />
                      
                      {/* Allergies - Compact row */}
                      <div>
                        <span className="text-sm font-bold text-yellow-300 drop-shadow-lg">Allergies/Restrictions: </span>
                        <span className="text-sm text-gray-400">{userData?.allergies || 'None specified'}</span>
                      </div>
                      
                      <hr className="border-gray-600" />
                      
                      {/* Nutritional Goals - Split into two rows */}
                      <div>
                        <span className="text-sm font-bold text-yellow-300 drop-shadow-lg">Nutritional Goals:</span>
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
                    <div className="space-y-3 transition-all duration-500 ease-in-out">
                      {/* Row 1: Serving Size & Cuisine */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-bold text-yellow-300 mb-1 block drop-shadow-lg">Serving Size *</label>
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
                          <label className="text-sm font-bold text-yellow-300 mb-1 block drop-shadow-lg">Cuisine *</label>
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
                          <label className="text-sm font-bold text-yellow-300 mb-1 block drop-shadow-lg">Meal Type *</label>
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
                          <label className="text-sm font-bold text-yellow-300 mb-1 block drop-shadow-lg">Spice Level</label>
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
                          <label className="text-sm font-bold text-yellow-300 mb-1 block drop-shadow-lg">Skill Level</label>
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
                          <label className="text-sm font-bold text-yellow-300 mb-1 block drop-shadow-lg">Cook Method</label>
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
                        <label className="text-sm font-bold text-yellow-300 mb-1 block drop-shadow-lg">Prep Time</label>
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
                                  // Smoothly switch to Pantry tab when confirmed
                                  setTimeout(() => setActiveTab('pantry'), 500);
                                }
                              }}
                              className="w-7 h-7 rounded-full border-gray-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                            />
                            <label
                              htmlFor="meal-confirm"
                              className="text-sm font-bold text-yellow-300 cursor-pointer drop-shadow-lg"
                            >
                              I confirm these meal preferences are correct
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'pantry' && (
                    <div className="space-y-3 transition-all duration-500 ease-in-out">
                      <h4 className="text-lg font-bold text-yellow-300 mb-3 drop-shadow-lg">Available Ingredients</h4>
                      
                      {/* Ingredient Selection Summary */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-yellow-300 drop-shadow-lg">Selected Ingredients:</span>
                        <span className="text-sm text-gray-400">{selectedIngredients.length} items</span>
                      </div>
                      
                      <hr className="border-gray-600" />
                      
                      {/* Comprehensive ingredient categories - increased height, no scroll */}
                      <div className="space-y-3 min-h-[350px]">
                        {Object.entries(ingredientCategories).map(([category, ingredients]) => (
                          <div key={category}>
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-sm font-bold text-yellow-300 drop-shadow-lg">{category}</h5>
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

                      {/* Add Custom Ingredients */}
                      <div className="mt-4 pt-3 border-t border-gray-600">
                        <h5 className="text-sm font-bold text-yellow-300 mb-2 drop-shadow-lg">Add Ingredients</h5>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newIngredient}
                            onChange={(e) => setNewIngredient(e.target.value)}
                            placeholder="Enter ingredient name"
                            className="flex-1 h-8 bg-gray-700 border border-gray-600 text-white text-sm rounded px-2"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && newIngredient.trim()) {
                                setSelectedIngredients([...selectedIngredients, newIngredient.trim()]);
                                setNewIngredient('');
                              }
                            }}
                          />
                          <button
                            onClick={() => {
                              if (newIngredient.trim()) {
                                setSelectedIngredients([...selectedIngredients, newIngredient.trim()]);
                                setNewIngredient('');
                              }
                            }}
                            className="px-3 h-8 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                          >
                            Add
                          </button>
                        </div>
                      </div>

                      {/* Confirmation Checkbox */}
                      {selectedIngredients.length >= 5 && (
                        <div className="mt-4 pt-3 border-t border-gray-600">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="pantry-confirm"
                              checked={isPantryConfirmed}
                              onCheckedChange={(checked) => {
                                setIsPantryConfirmed(checked);
                              }}
                              className="w-7 h-7 rounded-full border-gray-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                            />
                            <label
                              htmlFor="pantry-confirm"
                              className="text-sm font-bold text-yellow-300 cursor-pointer drop-shadow-lg"
                            >
                              I confirm these pantry ingredients are complete
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
          <div className={`${isNavigatingFromTabs ? 'order-1' : 'order-2'}`}>
            <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
              <CardHeader className="pb-4">
              <CardTitle className="text-lg text-white">Recipe Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline"
                  className={`h-14 border transition-all duration-200 ${
                    selectedRecipeOption === 'pantry-ingredients'
                      ? 'bg-purple-600 border-purple-600 text-white' 
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                  }`}
                  onClick={() => {
                    // Only expand the card, don't trigger any dish displays
                    setIsPantryCardCollapsed(false);
                    setIsPantryCardAtBottom(false);
                    setActiveTab('pantry');
                    setSelectedRecipeOption('pantry-ingredients');
                    // Hide all dish displays
                    setShowChefsChoice(false);
                    setShowPantryDishes(false);
                    setShowTakeOut(false);
                  }}
                >
                  Pantry Ingredients
                </Button>
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
                    setSelectedRecipeOption('create-dishes');
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
            <div className={`${isNavigatingFromTabs ? 'order-2' : 'order-2'}`}>
              <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white">Chef Recommends</CardTitle>
                    <button
                      onClick={() => setShowChefsChoice(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <ChevronUp size={20} />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {chefsChoiceDishes.map((dish) => {
                      const updatedNutrition = calculateUpdatedNutrition(dish.id, dish.calories, dish.protein);
                      const isSubstitutionOpen = substitutionOpenDish === dish.id;
                      const dishSubs = dishSubstitutions[dish.id as keyof typeof dishSubstitutions];
                      
                      return (
                        <div key={dish.id} className="bg-gray-800 rounded-lg overflow-hidden">
                          {/* Dish Image */}
                          <div className="relative h-40">
                            <img 
                              src={dish.image} 
                              alt={dish.name}
                              className="w-full h-full object-cover"
                            />
                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          </div>
                          
                          {/* Info Section */}
                          <div className="p-4 space-y-3">
                            {/* Dish Name */}
                            <h3 className="text-white font-semibold text-xl mb-3">{dish.name}</h3>
                            
                            {/* Real-time Nutrition Updates */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                <span className="text-sm text-gray-300">
                                  {updatedNutrition.calories} calories
                                  {substitutionConfirmed[dish.id] && updatedNutrition.calories !== dish.calories && (
                                    <span className="text-green-400 ml-1">✓</span>
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span className="text-sm text-gray-300">
                                  {updatedNutrition.protein} protein
                                  {substitutionConfirmed[dish.id] && updatedNutrition.protein !== dish.protein && (
                                    <span className="text-green-400 ml-1">✓</span>
                                  )}
                                </span>
                              </div>
                            </div>
                            
                            {/* Row 2: Cook Time and Difficulty */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span className="text-sm text-gray-300">{dish.cookTime} cook time</span>
                              </div>
                              <span className="text-sm text-gray-300">{dish.difficulty} difficulty</span>
                            </div>
                            
                            {/* Action Icons Row */}
                            <div className="flex items-center justify-between mt-4">
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
                                  onClick={() => handleCookClick(dish.id, dish.name)}
                                  className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center hover:from-orange-600 hover:to-red-700 transition-all"
                                >
                                  <CookingPot size={18} className="text-white" />
                                </button>
                                <button className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all">
                                  <Plus size={18} className="text-white" />
                                </button>
                            </div>
                          </div>

                          {/* Substitution Expandable Card */}
                          {isSubstitutionOpen && dishSubs && (
                            <div className="border-t border-gray-700 bg-gray-800/90 backdrop-blur-sm p-4 space-y-4">
                              {/* Header - Title Only */}
                              <div className="text-center">
                                <h4 className="text-lg font-semibold text-white">Ingredient Substitutions</h4>
                              </div>
                              
                              {/* Nutrition Summary - Second Row */}
                              <div className="flex items-center justify-center gap-6 text-sm">
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                  <span className="text-gray-300">{updatedNutrition.calories} cal</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                  <span className="text-gray-300">{updatedNutrition.protein}</span>
                                </div>
                              </div>

                              {/* Ingredient List with Substitutions */}
                              <div className="space-y-3">
                                {dishSubs.mainIngredients.map((ingredient, index) => {
                                  const selectedSub = selectedSubstitutions[dish.id]?.[index];
                                  
                                  return (
                                    <div key={index} className="bg-gray-700/50 rounded-lg p-3">
                                      {/* Main Ingredient */}
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-yellow-300 drop-shadow-lg">{ingredient.name}</span>
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                          <span>🔥 {ingredient.calories}</span>
                                          <span>💪 {ingredient.protein}g</span>
                                        </div>
                                      </div>
                                      
                                      {/* Substitution Options */}
                                      <div className="grid grid-cols-3 gap-2">
                                        {[ingredient.name, ...ingredient.substitutions].map((option) => (
                                          <button
                                            key={option}
                                            onClick={() => handleSubstitutionSelect(dish.id, index, option)}
                                            className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                                              (selectedSub || ingredient.name) === option
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-gray-600 text-gray-300 hover:bg-purple-500/50'
                                            }`}
                                          >
                                            {option}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Confirmation Section */}
                              <div className="pt-3 border-t border-gray-600">
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`substitution-confirm-${dish.id}`}
                                    checked={substitutionConfirmed[dish.id] || false}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        handleSubstitutionConfirm(dish.id);
                                      }
                                    }}
                                    className="w-7 h-7 rounded-full border-gray-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                  />
                                  <label
                                    htmlFor={`substitution-confirm-${dish.id}`}
                                    className="text-sm font-bold text-yellow-300 cursor-pointer drop-shadow-lg"
                                  >
                                    I confirm these substitutions are complete
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Pantry Dishes Card */}
          {showPantryDishes && (
            <div className={`${isNavigatingFromTabs ? 'order-2' : 'order-2'}`}>
              <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white">Pantry Dishes</CardTitle>
                    <button
                      onClick={() => setShowPantryDishes(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <ChevronUp size={20} />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {pantryDishes.map((dish) => (
                      <div key={dish.id} className="bg-gray-800 rounded-lg overflow-hidden">
                        {/* Dish Image */}
                        <div className="relative h-40">
                          <img 
                            src={dish.image} 
                            alt={dish.name}
                            className="w-full h-full object-cover"
                          />
                          {/* Dark overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        </div>
                        
                        {/* Info Section */}
                        <div className="p-4 space-y-3">
                          {/* Dish Name */}
                          <h3 className="text-white font-semibold text-xl mb-3">{dish.name}</h3>
                          {/* Row 1: Calories and Protein */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                              <span className="text-sm text-gray-300">{dish.calories} calories</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                              <span className="text-sm text-gray-300">{dish.protein} protein</span>
                            </div>
                          </div>
                          
                          {/* Row 2: Cook Time and Difficulty */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <span className="text-sm text-gray-300">{dish.cookTime} cook time</span>
                            </div>
                            <span className="text-sm text-gray-300">{dish.difficulty} difficulty</span>
                          </div>
                          
                          {/* Action Icons Row */}
                          <div className="flex items-center justify-between mt-4">
                              <button className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center hover:from-yellow-600 hover:to-yellow-700 transition-all">
                                <ArrowLeftRight size={18} className="text-white" />
                              </button>
                              <button className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-purple-700 transition-all">
                                <BookOpen size={18} className="text-white" />
                              </button>
                              <button className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center hover:from-green-600 hover:to-green-700 transition-all">
                                <Heart size={18} className="text-white" />
                              </button>
                              <button 
                                onClick={() => handleCookClick(dish.id, dish.name)}
                                className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center hover:from-orange-600 hover:to-red-700 transition-all"
                              >
                                <CookingPot size={18} className="text-white" />
                              </button>
                              <button className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all">
                                <Plus size={18} className="text-white" />
                              </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Take-Out Form Card */}
          {showTakeOut && (
            <div className={`${isNavigatingFromTabs ? 'order-2' : 'order-2'}`}>
              <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-yellow-300 font-bold text-xl drop-shadow-lg">
                      Order take out for group or weekly meals
                    </CardTitle>
                    {isTakeOutFormCollapsed && (
                      <button
                        onClick={() => setIsTakeOutFormCollapsed(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <ChevronDown size={20} />
                      </button>
                    )}
                    {!isTakeOutFormCollapsed && (
                      <button
                        onClick={() => setShowTakeOut(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <ChevronUp size={20} />
                      </button>
                    )}
                  </div>
                </CardHeader>
                
                {!isTakeOutFormCollapsed && (
                  <CardContent className="space-y-4">
                    {/* Serving Size and Cuisine Row */}
                    <div className="grid grid-cols-2 gap-4">
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
                            <SelectItem value="10+ people">10+ people</SelectItem>
                            <SelectItem value="Weekly (14 meals)">Weekly (14 meals)</SelectItem>
                            <SelectItem value="Monthly (30 meals)">Monthly (30 meals)</SelectItem>
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
                )}
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
                    <Button
                      variant="outline"
                      className={`h-12 border transition-all duration-200 ${
                        selectedCategory === 'soup'
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                      }`}
                      onClick={() => setSelectedCategory('soup')}
                    >
                      Soup
                    </Button>
                    <Button
                      variant="outline"
                      className={`h-12 border transition-all duration-200 ${
                        selectedCategory === 'salad'
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                      }`}
                      onClick={() => setSelectedCategory('salad')}
                    >
                      Salad
                    </Button>
                    <Button
                      variant="outline"
                      className={`h-12 border transition-all duration-200 ${
                        selectedCategory === 'entree'
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                      }`}
                      onClick={() => setSelectedCategory('entree')}
                    >
                      Entree
                    </Button>
                    <Button
                      variant="outline"
                      className={`h-12 border transition-all duration-200 ${
                        selectedCategory === 'dessert'
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                      }`}
                      onClick={() => setSelectedCategory('dessert')}
                    >
                      Dessert
                    </Button>
                  </div>

                  {/* Dish Grid */}
                  <div className="grid grid-cols-1 gap-4">
                    {takeOutDishes[selectedCategory].map((dish) => (
                      <div key={dish.id} className="bg-gray-800 rounded-lg overflow-hidden">
                        {/* Dish Image */}
                        <div className="relative h-40">
                          <img 
                            src={dish.image} 
                            alt={dish.name}
                            className="w-full h-full object-cover"
                          />
                          {/* Dark overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        </div>
                        
                        {/* Info Section */}
                        <div className="p-4 space-y-3">
                          {/* Dish Name */}
                          <h3 className="text-white font-semibold text-xl mb-3">{dish.name}</h3>
                          
                          {/* Nutrition Info - 2x2 Grid */}
                          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                              <span className="text-sm text-gray-300">{dish.calories} calories</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                              <span className="text-sm text-gray-300">25g protein</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <span className="text-sm text-gray-300">{dish.cookTime}</span>
                            </div>
                            <div className="text-sm text-gray-300">{dish.difficulty} difficulty</div>
                          </div>
                          
                          {/* Action Icons */}
                          <div className="flex items-center justify-between pt-2">
                            <button className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center hover:from-yellow-600 hover:to-yellow-700 transition-all">
                              <ArrowLeftRight size={18} className="text-white" />
                            </button>
                            <button 
                              onClick={() => {}}
                              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-purple-700 transition-all"
                            >
                              <BookOpen size={18} className="text-white" />
                            </button>
                            <button className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center hover:from-green-600 hover:to-green-700 transition-all">
                              <Heart size={18} className="text-white" />
                            </button>
                            <button 
                              onClick={handleCookClick}
                              className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center hover:from-orange-600 hover:to-red-700 transition-all"
                            >
                              <CookingPot size={18} className="text-white" />
                            </button>
                            <button className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all">
                              <Plus size={18} className="text-white" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Card 3: History */}
          {(isMealComplete || isPantryComplete) && (
            <div className={`${isNavigatingFromTabs ? 'order-4' : 'order-3'} mb-4`}>
              <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-white">
                    History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white h-12 flex flex-col items-center justify-center"
                      onClick={() => {
                        // Navigate to dishes cooked history
                        console.log('Navigate to dishes cooked');
                      }}
                    >
                      <ChefHat className="w-4 h-4 mb-1" />
                      <span className="text-xs">Dishes Cooked</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white h-12 flex flex-col items-center justify-center"
                      onClick={() => {
                        // Navigate to takeout orders history
                        console.log('Navigate to takeout orders');
                      }}
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
                      onClick={() => {
                        // Navigate to saved recipes
                        console.log('Navigate to saved recipes');
                      }}
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
          {(isMealComplete || isPantryComplete) && (
            <div className={`${isNavigatingFromTabs ? 'order-5' : 'order-4'}`}>
              <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-white">
                  Summary for {userData?.nickname || 'Peter'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isMealComplete && (
                    <div>
                      <h4 className="text-sm font-bold text-yellow-300 mb-2 drop-shadow-lg">Meal Preferences</h4>
                      <div className="text-sm text-gray-400 space-y-1">
                        <div>Serving: {mealPreferences.servingSize}, Cuisine: {mealPreferences.cuisine}</div>
                        <div>Meal Type: {mealPreferences.mealType}</div>
                      </div>
                    </div>
                  )}
                  
                  {isPantryComplete && (
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
                        // Reset all states with smooth animation like navigation reset
                        setPreferencesCardSlid(false);
                        setActiveTab('meal');
                        setIsPantryCardCollapsed(false);
                        setIsPantryCardAtBottom(false);
                        setIsPantryConfirmed(false);
                        setMealConfirmed(false);
                        setIsMealComplete(false);
                        setIsPantryComplete(false);
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
        
        {/* Bottom spacing to account for bottom navigation */}
        <div className="h-20"></div>
      </div>

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

            {/* Confirmation Checkbox */}
            <div className="flex items-center space-x-2 mb-6">
              <Checkbox
                id="cook-confirm"
                checked={cookConfirmed[cookConfirmationOpen] || false}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleCookConfirm(cookConfirmationOpen);
                  }
                }}
                className="w-7 h-7 rounded-full border-gray-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <label
                htmlFor="cook-confirm"
                className="text-sm font-bold text-yellow-300 cursor-pointer drop-shadow-lg"
              >
                I confirm I'm ready to start cooking
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setCookConfirmationOpen(null)}
                className="flex-1 bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleCookConfirm(cookConfirmationOpen)}
                disabled={!cookConfirmed[cookConfirmationOpen]}
                className={`flex-1 ${
                  cookConfirmed[cookConfirmationOpen]
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
