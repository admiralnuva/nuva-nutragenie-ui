// @ts-nocheck
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/ui/back-button";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { ChevronDown, ChevronUp, Plus, Minus, ShoppingCart, List, ChefHat, Utensils } from "lucide-react";

// Chef Recommends dishes for weekly planning
const chefRecommendedDishes = [
  {
    id: 1,
    name: "Mediterranean Herb Chicken",
    day: "Monday",
    servings: 4,
    cookTime: 35,
    nutrition: { calories: 420, protein: 35, carbs: 12, fat: 28, fiber: 4 },
    ingredients: [
      { 
        name: "Chicken Thighs", 
        quantity: "2 lbs", 
        nutrition: { calories: 250, protein: 24, carbs: 0, fat: 16 },
        substitutions: [
          { name: "Chicken Breast", quantity: "2 lbs", nutrition: { calories: 231, protein: 44, carbs: 0, fat: 5 } },
          { name: "Turkey Thighs", quantity: "2 lbs", nutrition: { calories: 208, protein: 28, carbs: 0, fat: 10 } }
        ]
      },
      {
        name: "Fresh Rosemary",
        quantity: "4 sprigs",
        nutrition: { calories: 5, protein: 0, carbs: 1, fat: 0 },
        substitutions: [
          { name: "Dried Rosemary", quantity: "2 tsp", nutrition: { calories: 4, protein: 0, carbs: 1, fat: 0 } },
          { name: "Fresh Thyme", quantity: "6 sprigs", nutrition: { calories: 3, protein: 0, carbs: 1, fat: 0 } }
        ]
      },
      {
        name: "Cherry Tomatoes",
        quantity: "2 cups",
        nutrition: { calories: 54, protein: 3, carbs: 12, fat: 1 },
        substitutions: [
          { name: "Grape Tomatoes", quantity: "2 cups", nutrition: { calories: 60, protein: 3, carbs: 13, fat: 1 } },
          { name: "Roma Tomatoes", quantity: "4 medium", nutrition: { calories: 70, protein: 3, carbs: 15, fat: 1 } }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Asian Sesame Beef Bowl",
    day: "Tuesday",
    servings: 4,
    cookTime: 25,
    nutrition: { calories: 480, protein: 32, carbs: 35, fat: 22, fiber: 6 },
    ingredients: [
      {
        name: "Ground Beef (lean)",
        quantity: "1.5 lbs",
        nutrition: { calories: 340, protein: 25, carbs: 0, fat: 26 },
        substitutions: [
          { name: "Ground Turkey", quantity: "1.5 lbs", nutrition: { calories: 240, protein: 30, carbs: 0, fat: 13 } },
          { name: "Plant-Based Ground", quantity: "1.5 lbs", nutrition: { calories: 270, protein: 20, carbs: 8, fat: 18 } }
        ]
      },
      {
        name: "Jasmine Rice",
        quantity: "2 cups dry",
        nutrition: { calories: 680, protein: 13, carbs: 148, fat: 1 },
        substitutions: [
          { name: "Brown Rice", quantity: "2 cups dry", nutrition: { calories: 649, protein: 13, carbs: 162, fat: 3 } },
          { name: "Cauliflower Rice", quantity: "6 cups", nutrition: { calories: 150, protein: 11, carbs: 30, fat: 2 } }
        ]
      },
      {
        name: "Sesame Oil",
        quantity: "3 tbsp",
        nutrition: { calories: 360, protein: 0, carbs: 0, fat: 41 },
        substitutions: [
          { name: "Avocado Oil", quantity: "3 tbsp", nutrition: { calories: 360, protein: 0, carbs: 0, fat: 41 } },
          { name: "Olive Oil", quantity: "3 tbsp", nutrition: { calories: 357, protein: 0, carbs: 0, fat: 40 } }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Tuscan White Bean Soup",
    day: "Wednesday", 
    servings: 6,
    cookTime: 45,
    nutrition: { calories: 320, protein: 18, carbs: 45, fat: 8, fiber: 12 },
    ingredients: [
      {
        name: "Cannellini Beans",
        quantity: "3 cans",
        nutrition: { calories: 945, protein: 63, carbs: 171, fat: 3 },
        substitutions: [
          { name: "Great Northern Beans", quantity: "3 cans", nutrition: { calories: 945, protein: 60, carbs: 174, fat: 3 } },
          { name: "Navy Beans", quantity: "3 cans", nutrition: { calories: 960, protein: 60, carbs: 180, fat: 4 } }
        ]
      },
      {
        name: "Italian Sausage",
        quantity: "1 lb",
        nutrition: { calories: 640, protein: 28, carbs: 4, fat: 56 },
        substitutions: [
          { name: "Turkey Sausage", quantity: "1 lb", nutrition: { calories: 480, protein: 36, carbs: 0, fat: 36 } },
          { name: "Plant-Based Sausage", quantity: "1 lb", nutrition: { calories: 400, protein: 28, carbs: 12, fat: 28 } }
        ]
      },
      {
        name: "Fresh Spinach",
        quantity: "4 cups",
        nutrition: { calories: 28, protein: 4, carbs: 4, fat: 0 },
        substitutions: [
          { name: "Kale (chopped)", quantity: "3 cups", nutrition: { calories: 49, protein: 3, carbs: 10, fat: 1 } },
          { name: "Swiss Chard", quantity: "4 cups", nutrition: { calories: 28, protein: 3, carbs: 5, fat: 0 } }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Thai Curry Salmon",
    day: "Thursday",
    servings: 4,
    cookTime: 30,
    nutrition: { calories: 520, protein: 38, carbs: 28, fat: 30, fiber: 5 },
    ingredients: [
      {
        name: "Salmon Fillets",
        quantity: "2 lbs",
        nutrition: { calories: 824, protein: 115, carbs: 0, fat: 37 },
        substitutions: [
          { name: "Cod Fillets", quantity: "2 lbs", nutrition: { calories: 378, protein: 82, carbs: 0, fat: 3 } },
          { name: "Halibut Fillets", quantity: "2 lbs", nutrition: { calories: 476, protein: 91, carbs: 0, fat: 10 } }
        ]
      },
      {
        name: "Red Curry Paste",
        quantity: "3 tbsp",
        nutrition: { calories: 45, protein: 2, carbs: 6, fat: 2 },
        substitutions: [
          { name: "Green Curry Paste", quantity: "3 tbsp", nutrition: { calories: 45, protein: 2, carbs: 6, fat: 2 } },
          { name: "Yellow Curry Paste", quantity: "3 tbsp", nutrition: { calories: 40, protein: 2, carbs: 5, fat: 2 } }
        ]
      },
      {
        name: "Coconut Milk",
        quantity: "1 can",
        nutrition: { calories: 445, protein: 5, carbs: 6, fat: 48 },
        substitutions: [
          { name: "Light Coconut Milk", quantity: "1 can", nutrition: { calories: 200, protein: 2, carbs: 3, fat: 21 } },
          { name: "Cashew Cream", quantity: "1.5 cups", nutrition: { calories: 300, protein: 10, carbs: 15, fat: 25 } }
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Mexican Street Corn Bowls",
    day: "Friday",
    servings: 4,
    cookTime: 20,
    nutrition: { calories: 450, protein: 22, carbs: 58, fat: 16, fiber: 10 },
    ingredients: [
      {
        name: "Black Beans",
        quantity: "2 cans",
        nutrition: { calories: 454, protein: 30, carbs: 80, fat: 2 },
        substitutions: [
          { name: "Pinto Beans", quantity: "2 cans", nutrition: { calories: 480, protein: 28, carbs: 88, fat: 2 } },
          { name: "Kidney Beans", quantity: "2 cans", nutrition: { calories: 450, protein: 30, carbs: 81, fat: 1 } }
        ]
      },
      {
        name: "Corn Kernels",
        quantity: "3 cups",
        nutrition: { calories: 387, protein: 14, carbs: 90, fat: 4 },
        substitutions: [
          { name: "Frozen Corn", quantity: "3 cups", nutrition: { calories: 330, protein: 12, carbs: 78, fat: 3 } },
          { name: "Grilled Corn (off cob)", quantity: "3 cups", nutrition: { calories: 400, protein: 15, carbs: 92, fat: 5 } }
        ]
      },
      {
        name: "Cotija Cheese",
        quantity: "1 cup crumbled",
        nutrition: { calories: 320, protein: 20, carbs: 4, fat: 24 },
        substitutions: [
          { name: "Queso Fresco", quantity: "1 cup crumbled", nutrition: { calories: 320, protein: 20, carbs: 4, fat: 24 } },
          { name: "Feta Cheese", quantity: "1 cup crumbled", nutrition: { calories: 396, protein: 21, carbs: 6, fat: 32 } }
        ]
      }
    ]
  }
];

// Mock pantry items
const pantryItems = ["Olive Oil", "Salt", "Black Pepper", "Garlic", "Onions"];

export default function ReviewRecipesScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage("nutragenie_user", null);

  // State management for Chef Recommends
  const [expandedDishes, setExpandedDishes] = useState({}); // Which dishes have expanded dropdowns
  const [selectedIngredients, setSelectedIngredients] = useState({}); // Track ingredient/substitution selections
  const [shoppingCart, setShoppingCart] = useState([]);

  // Initialize main ingredients as selected by default
  useEffect(() => {
    const defaultSelections = {};
    const defaultCart = [];

    chefRecommendedDishes.forEach(dish => {
      dish.ingredients.forEach(ingredient => {
        const key = `${dish.id}-${ingredient.name}-original`;
        defaultSelections[key] = true;

        // Add to default shopping cart (excluding pantry items)
        if (!pantryItems.includes(ingredient.name)) {
          defaultCart.push({
            name: ingredient.name,
            quantity: ingredient.quantity,
            dishId: dish.id,
            dishName: dish.name,
            dishDay: dish.day,
            calories: ingredient.nutrition.calories
          });
        }
      });
    });

    setSelectedIngredients(defaultSelections);
    setShoppingCart(defaultCart);
  }, []);

  // Toggle dish dropdown expansion
  const toggleDishExpansion = (dishId) => {
    setExpandedDishes(prev => ({
      ...prev,
      [dishId]: !prev[dishId]
    }));
  };

  // Calculate nutrition for a specific dish based on selected ingredients
  const calculateDishNutrition = (dishId) => {
    const dish = chefRecommendedDishes.find(d => d.id === dishId);
    if (!dish) return dish?.nutrition || { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };

    let totalNutrition = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };

    dish.ingredients.forEach(ingredient => {
      // Check what's selected for this ingredient
      const originalKey = `${dishId}-${ingredient.name}-original`;
      let hasSelection = false;

      // Check if original is selected
      if (selectedIngredients[originalKey]) {
        totalNutrition.calories += ingredient.nutrition.calories || 0;
        totalNutrition.protein += ingredient.nutrition.protein || 0;
        totalNutrition.carbs += ingredient.nutrition.carbs || 0;
        totalNutrition.fat += ingredient.nutrition.fat || 0;
        totalNutrition.fiber += ingredient.nutrition.fiber || 0;
        hasSelection = true;
      }

      // Check substitutions
      ingredient.substitutions.forEach(sub => {
        const subKey = `${dishId}-${ingredient.name}-${sub.name}`;
        if (selectedIngredients[subKey]) {
          totalNutrition.calories += sub.nutrition.calories || 0;
          totalNutrition.protein += sub.nutrition.protein || 0;
          totalNutrition.carbs += sub.nutrition.carbs || 0;
          totalNutrition.fat += sub.nutrition.fat || 0;
          totalNutrition.fiber += sub.nutrition.fiber || 0;
          hasSelection = true;
        }
      });

      // If nothing is selected, use original by default
      if (!hasSelection) {
        totalNutrition.calories += ingredient.nutrition.calories || 0;
        totalNutrition.protein += ingredient.nutrition.protein || 0;
        totalNutrition.carbs += ingredient.nutrition.carbs || 0;
        totalNutrition.fat += ingredient.nutrition.fat || 0;
        totalNutrition.fiber += ingredient.nutrition.fiber || 0;
      }
    });

    return totalNutrition;
  };

  // Handle ingredient/substitution selection
  const handleIngredientSelection = (dishId, ingredientName, option) => {
    const key = `${dishId}-${ingredientName}-${option}`;
    const isSelected = selectedIngredients[key];
    
    setSelectedIngredients(prev => ({
      ...prev,
      [key]: !isSelected
    }));

    // Update shopping cart
    if (!isSelected) {
      // Add to cart
      const dish = chefRecommendedDishes.find(d => d.id === dishId);
      const ingredient = dish?.ingredients.find(ing => ing.name === ingredientName);
      
      let selectedItem;
      if (option === 'original') {
        selectedItem = ingredient;
      } else {
        selectedItem = ingredient?.substitutions.find(sub => sub.name === option);
      }

      if (selectedItem && !pantryItems.includes(selectedItem.name)) {
        setShoppingCart(prev => {
          const existingItem = prev.find(item => item.name === selectedItem.name);
          if (existingItem) {
            return prev; // Already in cart
          } else {
            return [...prev, {
              name: selectedItem.name,
              quantity: selectedItem.quantity,
              nutrition: selectedItem.nutrition,
              dishName: dish.name,
              dishDay: dish.day
            }];
          }
        });
      }
    } else {
      // Remove from cart
      const dish = chefRecommendedDishes.find(d => d.id === dishId);
      const ingredient = dish?.ingredients.find(ing => ing.name === ingredientName);
      
      let selectedItem;
      if (option === 'original') {
        selectedItem = ingredient;
      } else {
        selectedItem = ingredient?.substitutions.find(sub => sub.name === option);
      }

      if (selectedItem) {
        setShoppingCart(prev => prev.filter(item => item.name !== selectedItem.name));
      }
    }
  };

  // Update cart item quantity
  const updateCartQuantity = (itemName, newQuantity) => {
    setShoppingCart(prev => 
      prev.map(item => 
        item.name === itemName 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Add custom ingredient to cart
  const addCustomIngredient = (name, quantity) => {
    setShoppingCart(prev => [...prev, {
      name,
      quantity,
      nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
      dishes: ["Custom"],
      inPantry: false
    }]);
  };

  // Remove item from cart
  const removeFromCart = (itemName) => {
    setShoppingCart(prev => prev.filter(item => item.name !== itemName));
  };

  // Handle authentication check
  useEffect(() => {
    if (!currentUser) {
      setLocation("/");
    }
  }, [currentUser, setLocation]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <BackButton to="/recipes" />
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-gray-800">NutraGenie</h1>
          </div>
          <div className="w-8"></div>
        </div>
        <div className="text-lg font-semibold text-indigo-600 text-center">
          Chef Recommends
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Weekly Meal Planning Header */}
        <div className="text-center space-y-1 mb-6">
          <h2 className="text-xl font-bold text-gray-900">Weekly Meal Planner</h2>
          <p className="text-sm text-gray-600">Select dishes and customize ingredients for your perfect week</p>
        </div>

        {/* Chef Recommends Dishes */}
        <div className="space-y-4">
          {chefRecommendedDishes.map((dish, index) => (
            <div key={dish.id} className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg overflow-hidden">
              {/* Full width image at top - same as pantry dishes */}
              <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-violet-200 relative flex items-center justify-center">
                {/* Large colored bowl/plate */}
                <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center relative overflow-hidden ${
                  index === 0 ? 'bg-gradient-to-b from-amber-100 to-amber-200 border-amber-300' : // Warm plate for chicken
                  index === 1 ? 'bg-gradient-to-b from-red-100 to-red-200 border-red-300' : // Red bowl for beef
                  index === 2 ? 'bg-gradient-to-b from-green-100 to-green-200 border-green-300' : // Green bowl for soup
                  index === 3 ? 'bg-gradient-to-b from-blue-100 to-blue-200 border-blue-300' : // Blue plate for salmon
                  'bg-gradient-to-b from-yellow-100 to-yellow-200 border-yellow-300' // Yellow bowl for corn
                }`}>
                  {/* Bowl interior depth shadow */}
                  <div className="absolute inset-3 bg-gradient-to-b from-transparent to-black/15 rounded-full"></div>
                  
                  {/* Main dish and additional items in bowl */}
                  <div className="relative z-10 flex items-center justify-center">
                    {index === 0 && (
                      // Mediterranean Herb Chicken - multiple chicken thighs in bowl
                      <>
                        <div className="text-8xl opacity-95">🍗</div>
                        <div className="absolute -top-3 -left-3 text-4xl opacity-75">🍗</div>
                        <div className="absolute top-3 -right-3 text-4xl opacity-80">🍗</div>
                        <div className="absolute -bottom-3 left-2 text-4xl opacity-70">🍗</div>
                      </>
                    )}
                    {index === 1 && <div className="text-8xl opacity-95">🥩</div>}
                    {index === 2 && <div className="text-8xl opacity-95">🍲</div>}
                    {index === 3 && <div className="text-8xl opacity-95">🐟</div>}
                    {index === 4 && <div className="text-8xl opacity-95">🌽</div>}
                  </div>
                </div>

                {/* Background ingredients - randomly scattered */}
                {index === 0 && (
                  // Mediterranean Herb Chicken ingredients - scattered randomly
                  <>
                    {/* Scattered rosemary */}
                    <div className="absolute top-3 left-8 text-sm opacity-60 rotate-12">🌿</div>
                    <div className="absolute top-6 right-12 text-sm opacity-55 -rotate-6">🌿</div>
                    <div className="absolute bottom-8 left-4 text-sm opacity-50 rotate-45">🌿</div>
                    
                    {/* Random tomatoes */}
                    <div className="absolute top-1 right-6 text-sm opacity-55 rotate-12">🍅</div>
                    <div className="absolute top-14 left-12 text-sm opacity-60 -rotate-12">🍅</div>
                    <div className="absolute bottom-12 right-8 text-sm opacity-50 rotate-6">🍅</div>
                    <div className="absolute top-20 right-2 text-sm opacity-45 -rotate-12">🍅</div>
                    
                    {/* Scattered cooking tools */}
                    <div className="absolute top-8 left-2 text-base opacity-50 rotate-45">🔪</div>
                    <div className="absolute bottom-6 right-4 text-base opacity-45 -rotate-12">🥄</div>
                    <div className="absolute top-18 right-14 text-base opacity-40 rotate-12">🥘</div>
                    
                    {/* Random garlic and seasonings */}
                    <div className="absolute top-12 right-3 text-xs opacity-45 rotate-12">🧄</div>
                    <div className="absolute bottom-4 left-8 text-xs opacity-40 -rotate-6">🧄</div>
                    <div className="absolute top-24 left-6 text-xs opacity-35 rotate-45">🧂</div>
                    <div className="absolute bottom-16 right-12 text-xs opacity-40 -rotate-12">🫒</div>
                  </>
                )}

                {index === 1 && (
                  // Asian Sesame Beef Bowl ingredients - scattered randomly
                  <>
                    {/* Scattered rice grains */}
                    <div className="absolute top-2 left-6 text-sm opacity-55 rotate-6">🍚</div>
                    <div className="absolute top-16 right-10 text-sm opacity-50 -rotate-12">🍚</div>
                    <div className="absolute bottom-10 left-8 text-sm opacity-45 rotate-12">🍚</div>
                    
                    {/* Random sesame seeds */}
                    <div className="absolute top-5 right-4 text-xs opacity-60 rotate-45">⚪</div>
                    <div className="absolute top-12 left-14 text-xs opacity-50 -rotate-6">⚪</div>
                    <div className="absolute bottom-8 right-6 text-xs opacity-55 rotate-12">⚪</div>
                    <div className="absolute top-22 left-3 text-xs opacity-40 -rotate-12">⚪</div>
                    
                    {/* Scattered utensils */}
                    <div className="absolute top-6 left-2 text-base opacity-50 rotate-6">🥢</div>
                    <div className="absolute bottom-4 right-12 text-base opacity-45 -rotate-45">🥄</div>
                    <div className="absolute top-20 right-2 text-base opacity-40 rotate-12">🍜</div>
                    
                    {/* Random spices and garlic */}
                    <div className="absolute top-10 right-8 text-xs opacity-50 rotate-45">🌶️</div>
                    <div className="absolute bottom-14 left-12 text-xs opacity-45 -rotate-12">🌶️</div>
                    <div className="absolute top-18 left-6 text-xs opacity-40 rotate-6">🧄</div>
                    <div className="absolute bottom-6 right-3 text-xs opacity-45 -rotate-6">🧄</div>
                    <div className="absolute top-14 right-14 text-xs opacity-35 rotate-12">🧂</div>
                  </>
                )}

                {index === 2 && (
                  // Tuscan White Bean Soup ingredients - scattered randomly
                  <>
                    {/* Scattered white beans */}
                    <div className="absolute top-4 left-5 text-sm opacity-65 rotate-12">🫘</div>
                    <div className="absolute top-12 right-8 text-sm opacity-60 -rotate-6">🫘</div>
                    <div className="absolute bottom-12 left-10 text-sm opacity-55 rotate-45">🫘</div>
                    <div className="absolute top-18 left-3 text-sm opacity-50 -rotate-12">🫘</div>
                    <div className="absolute bottom-6 right-12 text-sm opacity-60 rotate-6">🫘</div>
                    
                    {/* Random spinach leaves */}
                    <div className="absolute top-2 right-4 text-sm opacity-55 rotate-12">🥬</div>
                    <div className="absolute top-16 left-12 text-sm opacity-50 -rotate-45">🥬</div>
                    <div className="absolute bottom-8 right-6 text-sm opacity-45 rotate-6">🥬</div>
                    
                    {/* Scattered herbs */}
                    <div className="absolute top-8 left-2 text-xs opacity-50 rotate-45">🌿</div>
                    <div className="absolute top-20 right-10 text-xs opacity-45 -rotate-12">🌿</div>
                    <div className="absolute bottom-14 left-8 text-xs opacity-40 rotate-12">🌿</div>
                    
                    {/* Random utensils and seasonings */}
                    <div className="absolute top-6 right-2 text-base opacity-45 rotate-12">🥄</div>
                    <div className="absolute bottom-4 left-4 text-base opacity-40 -rotate-6">🍜</div>
                    <div className="absolute top-14 right-14 text-base opacity-35 rotate-45">🥘</div>
                    <div className="absolute bottom-10 right-3 text-xs opacity-40 rotate-6">🧂</div>
                    <div className="absolute top-22 left-6 text-xs opacity-35 -rotate-12">🍋</div>
                    <div className="absolute bottom-16 right-8 text-xs opacity-30 rotate-12">🫒</div>
                  </>
                )}

                {index === 3 && (
                  // Thai Curry Salmon ingredients - scattered randomly
                  <>
                    {/* Scattered coconut pieces */}
                    <div className="absolute top-5 left-6 text-sm opacity-65 rotate-12">🥥</div>
                    <div className="absolute top-16 right-10 text-sm opacity-60 -rotate-6">🥥</div>
                    <div className="absolute bottom-8 left-12 text-sm opacity-55 rotate-45">🥥</div>
                    <div className="absolute top-22 left-4 text-sm opacity-50 -rotate-12">🥥</div>
                    
                    {/* Random chili peppers */}
                    <div className="absolute top-2 right-6 text-sm opacity-60 rotate-45">🌶️</div>
                    <div className="absolute top-12 left-8 text-sm opacity-55 -rotate-12">🌶️</div>
                    <div className="absolute bottom-12 right-8 text-sm opacity-50 rotate-6">🌶️</div>
                    <div className="absolute top-20 right-4 text-sm opacity-45 -rotate-45">🌶️</div>
                    
                    {/* Scattered garlic */}
                    <div className="absolute top-8 right-12 text-xs opacity-55 rotate-12">🧄</div>
                    <div className="absolute bottom-6 left-6 text-xs opacity-50 -rotate-6">🧄</div>
                    <div className="absolute top-18 left-12 text-xs opacity-45 rotate-45">🧄</div>
                    
                    {/* Random herbs and lime */}
                    <div className="absolute top-4 left-2 text-xs opacity-50 rotate-6">🌿</div>
                    <div className="absolute bottom-14 right-12 text-xs opacity-45 -rotate-12">🌿</div>
                    <div className="absolute top-14 right-2 text-xs opacity-40 rotate-12">🍋</div>
                    <div className="absolute bottom-4 left-10 text-xs opacity-45 -rotate-6">🍋</div>
                    
                    {/* Scattered utensils */}
                    <div className="absolute top-10 left-14 text-base opacity-45 rotate-12">🥄</div>
                    <div className="absolute bottom-10 right-4 text-base opacity-40 -rotate-45">🍜</div>
                    <div className="absolute top-24 right-8 text-base opacity-35 rotate-6">🔪</div>
                    <div className="absolute bottom-16 left-8 text-xs opacity-35 rotate-12">🧂</div>
                  </>
                )}

                {index === 4 && (
                  // Mexican Street Corn Bowls ingredients - scattered randomly
                  <>
                    {/* Scattered black beans */}
                    <div className="absolute top-4 left-8 text-sm opacity-65 rotate-6">🫘</div>
                    <div className="absolute top-14 right-12 text-sm opacity-60 -rotate-12">🫘</div>
                    <div className="absolute bottom-10 left-4 text-sm opacity-55 rotate-45">🫘</div>
                    <div className="absolute top-20 right-6 text-sm opacity-50 -rotate-6">🫘</div>
                    <div className="absolute bottom-6 right-10 text-sm opacity-60 rotate-12">🫘</div>
                    
                    {/* Random cheese pieces */}
                    <div className="absolute top-2 right-4 text-sm opacity-60 rotate-12">🧀</div>
                    <div className="absolute top-16 left-12 text-sm opacity-55 -rotate-45">🧀</div>
                    <div className="absolute bottom-12 right-8 text-sm opacity-50 rotate-6">🧀</div>
                    <div className="absolute top-22 left-6 text-sm opacity-45 -rotate-12">🧀</div>
                    
                    {/* Scattered chili peppers */}
                    <div className="absolute top-6 left-2 text-xs opacity-55 rotate-45">🌶️</div>
                    <div className="absolute top-18 right-2 text-xs opacity-50 -rotate-12">🌶️</div>
                    <div className="absolute bottom-8 left-10 text-xs opacity-45 rotate-6">🌶️</div>
                    <div className="absolute bottom-14 right-12 text-xs opacity-40 -rotate-6">🌶️</div>
                    
                    {/* Random lime and seasonings */}
                    <div className="absolute top-8 right-14 text-xs opacity-50 rotate-12">🍋</div>
                    <div className="absolute bottom-4 left-8 text-xs opacity-45 -rotate-45">🍋</div>
                    <div className="absolute top-12 left-14 text-xs opacity-40 rotate-6">🧂</div>
                    <div className="absolute bottom-16 right-4 text-xs opacity-35 -rotate-12">🧂</div>
                    
                    {/* Scattered utensils */}
                    <div className="absolute top-10 left-6 text-base opacity-45 rotate-12">🥄</div>
                    <div className="absolute bottom-8 right-14 text-base opacity-40 -rotate-6">🍴</div>
                    <div className="absolute top-24 right-10 text-base opacity-35 rotate-45">🥣</div>
                  </>
                )}
              </div>

              {/* Dish details */}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">{dish.name}</h3>
                  <p className="text-sm text-gray-600">{dish.day} • {dish.servings} servings • {dish.cookTime} min</p>
                </div>

                {/* Nutrition info - dynamic based on selections */}
                {(() => {
                  const currentNutrition = calculateDishNutrition(dish.id);
                  return (
                    <div className="flex items-center gap-4 text-xs mb-3">
                      <span className="text-orange-600 font-semibold">{Math.round(currentNutrition.calories)} cal</span>
                      <span className="text-blue-600 font-semibold">{Math.round(currentNutrition.protein)}g protein</span>
                      <span className="text-green-600 font-semibold">{Math.round(currentNutrition.carbs)}g carbs</span>
                      <span className="text-purple-600 font-semibold">{Math.round(currentNutrition.fat)}g fat</span>
                    </div>
                  );
                })()}

                {/* Substitutions button at bottom */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleDishExpansion(dish.id)}
                  className="w-full flex items-center justify-center gap-1"
                >
                  Substitutions
                  {expandedDishes[dish.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Button>

                {/* Expanded substitutions dropdown */}
                {expandedDishes[dish.id] && (
                  <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200 relative">
                    <h4 className="font-semibold text-gray-800 mb-3">Substitutions</h4>
                    <div className="space-y-3">
                      {dish.ingredients.map((ingredient, ingredientIdx) => (
                        <div key={ingredientIdx} className="space-y-2">
                          {/* Original ingredient */}
                          <div 
                            className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                              selectedIngredients[`${dish.id}-${ingredient.name}-original`] 
                                ? 'bg-indigo-100 border border-indigo-300' 
                                : 'hover:bg-gray-50'
                            }`}
                            onClick={() => handleIngredientSelection(dish.id, ingredient.name, 'original')}
                          >
                            <Checkbox
                              checked={selectedIngredients[`${dish.id}-${ingredient.name}-original`] || false}
                              onChange={() => {}}
                              className="pointer-events-none"
                            />
                            <div className="flex-1 flex justify-between">
                              <span className="text-sm font-medium">{ingredient.name} ({ingredient.quantity})</span>
                              <span className="text-xs text-gray-500">{ingredient.nutrition.calories} cal</span>
                            </div>
                          </div>
                          
                          {/* Substitutions */}
                          {ingredient.substitutions.map((sub, subIdx) => (
                            <div 
                              key={subIdx}
                              className={`flex items-center gap-2 p-2 ml-4 rounded cursor-pointer transition-colors ${
                                selectedIngredients[`${dish.id}-${ingredient.name}-${sub.name}`] 
                                  ? 'bg-indigo-100 border border-indigo-300' 
                                  : 'hover:bg-gray-50'
                              }`}
                              onClick={() => handleIngredientSelection(dish.id, ingredient.name, sub.name)}
                            >
                              <Checkbox
                                checked={selectedIngredients[`${dish.id}-${ingredient.name}-${sub.name}`] || false}
                                onChange={() => {}}
                                className="pointer-events-none"
                              />
                              <div className="flex-1 flex justify-between">
                                <span className="text-sm text-gray-700">↳ {sub.name} ({sub.quantity})</span>
                                <span className="text-xs text-gray-500">{sub.nutrition.calories} cal</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    
                    {/* Close button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute bottom-2 right-2 w-8 h-8 p-0 rounded-full"
                      onClick={() => toggleDishExpansion(dish.id)}
                    >
                      ×
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Shopping Cart Summary - Always visible */}
        <Card className="mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Shopping List
              <Badge variant="secondary">{shoppingCart.length} items</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {shoppingCart.length > 0 ? (
              <div className="space-y-1">
                {shoppingCart.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-1">
                    <span className="text-sm">{item.name}</span>
                    <span className="text-sm text-gray-600">{item.quantity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Select ingredients from substitutions to build your shopping list</p>
              </div>
            )}
            <div className="flex gap-2 mt-4">
              <Button 
                className="flex-1" 
                onClick={() => setLocation("/grocery-list")}
                disabled={shoppingCart.length === 0}
              >
                <List size={16} className="mr-2" />
                View Grocery List
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setLocation("/instacart")}
                disabled={shoppingCart.length === 0}
              >
                <ShoppingCart size={16} className="mr-2" />
                Order Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}