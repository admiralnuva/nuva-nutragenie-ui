// @ts-nocheck
import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/ui/back-button";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { ChevronDown, ChevronUp, Plus, Minus, ShoppingCart, List, ChefHat, Utensils, Check, X, Save, Printer, Share } from "lucide-react";
import { SiFacebook, SiInstagram, SiTiktok, SiX } from "react-icons/si";
import chef1Avatar from "@/assets/avatars/chef/chef1.png";

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

// Cooking instructions for each dish
const cookingInstructions = {
  1: [
    "Preheat oven to 400°F (200°C)",
    "Season chicken thighs with salt, pepper, and chopped rosemary",
    "Heat olive oil in an oven-safe skillet over medium-high heat",
    "Sear chicken thighs skin-side down for 5-6 minutes until golden",
    "Flip chicken and add cherry tomatoes to the pan",
    "Transfer skillet to oven and bake for 20-25 minutes",
    "Rest for 5 minutes before serving"
  ],
  2: [
    "Cook jasmine rice according to package directions",
    "Heat sesame oil in a large skillet over medium-high heat",
    "Add ground beef and cook until browned, breaking into small pieces",
    "Add soy sauce, ginger, and garlic. Cook for 2 minutes",
    "Serve beef over rice, garnish with sesame seeds and green onions"
  ],
  3: [
    "Heat olive oil in a large pot over medium heat",
    "Sauté onions and garlic until fragrant",
    "Add tomatoes, broth, and herbs. Bring to a boil",
    "Reduce heat and simmer for 20 minutes",
    "Season with salt and pepper to taste",
    "Serve hot with crusty bread"
  ],
  4: [
    "Preheat oven to 425°F (220°C)",
    "Season salmon fillets with salt, pepper, and lemon zest",
    "Heat olive oil in an oven-safe pan over medium-high heat",
    "Sear salmon skin-side up for 3-4 minutes",
    "Flip and transfer to oven for 8-10 minutes",
    "Let rest for 2 minutes before serving"
  ],
  5: [
    "Grill corn on the cob until charred, about 10 minutes",
    "Cut kernels off the cob into a large bowl",
    "Mix in cotija cheese, lime juice, and chili powder",
    "Add black beans and toss gently",
    "Garnish with cilantro and serve immediately"
  ]
};

// Mock data for selected pantry dishes
const mockSelectedPantryDishes = [
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
      }
    ]
  },
  {
    id: 2,
    name: "Asian Sesame Beef Bowl",
    day: "Tuesday",
    servings: 3,
    cookTime: 25,
    nutrition: { calories: 580, protein: 42, carbs: 45, fat: 28, fiber: 3 },
    ingredients: [
      { 
        name: "Ground Beef", 
        quantity: "1.5 lbs", 
        nutrition: { calories: 340, protein: 28, carbs: 0, fat: 24 },
        substitutions: [
          { name: "Ground Turkey", quantity: "1.5 lbs", nutrition: { calories: 280, protein: 32, carbs: 0, fat: 16 } },
          { name: "Ground Chicken", quantity: "1.5 lbs", nutrition: { calories: 250, protein: 30, carbs: 0, fat: 14 } }
        ]
      }
    ]
  }
];

// Mock data for custom dish
const createCustomDish = (dishName) => ({
  id: 1,
  name: dishName,
  day: "Custom",
  servings: 4,
  cookTime: 30,
  nutrition: { calories: 400, protein: 30, carbs: 20, fat: 20, fiber: 5 },
  ingredients: [
    { 
      name: "Main Protein", 
      quantity: "1 lb", 
      nutrition: { calories: 200, protein: 20, carbs: 0, fat: 12 },
      substitutions: [
        { name: "Chicken Breast", quantity: "1 lb", nutrition: { calories: 185, protein: 35, carbs: 0, fat: 4 } },
        { name: "Salmon Fillet", quantity: "1 lb", nutrition: { calories: 280, protein: 40, carbs: 0, fat: 12 } }
      ]
    },
    {
      name: "Fresh Vegetables",
      quantity: "2 cups",
      nutrition: { calories: 50, protein: 2, carbs: 12, fat: 0 },
      substitutions: [
        { name: "Seasonal Mix", quantity: "2 cups", nutrition: { calories: 45, protein: 2, carbs: 10, fat: 0 } },
        { name: "Frozen Vegetables", quantity: "2 cups", nutrition: { calories: 40, protein: 2, carbs: 8, fat: 0 } }
      ]
    }
  ]
});

export default function ReviewRecipesScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage("nutragenie_user", null);

  // Get navigation context to determine what to display
  const [navigationContext, setNavigationContext] = useState(() => {
    const stored = localStorage.getItem("meal_planner_context");
    return stored ? JSON.parse(stored) : { view: "pantry", selectedDishes: [], customDishName: "", selectedIngredients: [] };
  });

  // Determine what dishes to display and card title based on navigation context
  const displayData = useMemo(() => {
    switch (navigationContext.view) {
      case "dishes":
        return {
          cardTitle: "Dishes from your Pantry Ingredients",
          dishes: mockSelectedPantryDishes.slice(0, navigationContext.selectedDishes.length)
        };
      case "custom":
        return {
          cardTitle: "Your Custom Dish",
          dishes: [createCustomDish(navigationContext.customDishName)]
        };
      case "chef":
        return {
          cardTitle: "Chef's Choices for You",
          dishes: chefRecommendedDishes
        };
      default: // pantry
        return {
          cardTitle: "Weekly Meal Planner",
          dishes: chefRecommendedDishes
        };
    }
  }, [navigationContext.view, navigationContext.selectedDishes.length, navigationContext.customDishName]);

  // State management for meal planner
  const [expandedDishes, setExpandedDishes] = useState({}); // Which dishes have expanded substitutions dropdowns
  const [expandedInstructions, setExpandedInstructions] = useState({}); // Which dishes have expanded cooking instructions
  const [selectedIngredients, setSelectedIngredients] = useState({}); // Track ingredient/substitution selections
  const [selectedDishesForAction, setSelectedDishesForAction] = useState([]); // Track which dishes are selected for cooking/grocery
  const [shoppingCart, setShoppingCart] = useState([]);

  // Scroll to top when component mounts or navigation context changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Initialize main ingredients as selected by default
  useEffect(() => {
    const defaultSelections = {};
    const defaultCart = [];

    displayData.dishes.forEach(dish => {
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
  }, [navigationContext.view, navigationContext.selectedDishes.length, navigationContext.customDishName]);

  // Toggle dish dropdown expansion
  const toggleDishExpansion = (dishId) => {
    setExpandedDishes(prev => ({
      ...prev,
      [dishId]: !prev[dishId]
    }));
  };

  // Toggle cooking instructions expansion
  const toggleInstructionsExpansion = (dishId) => {
    setExpandedInstructions(prev => ({
      ...prev,
      [dishId]: !prev[dishId]
    }));
  };

  // Handle dish selection for cooking/grocery actions
  const toggleDishSelection = (dishId) => {
    setSelectedDishesForAction(prev => {
      if (prev.includes(dishId)) {
        return prev.filter(id => id !== dishId);
      } else {
        return [...prev, dishId];
      }
    });
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
      const dish = displayData.dishes.find(d => d.id === dishId);
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
      <div className="bg-white shadow-sm p-4 pb-2">
        <div className="flex items-center justify-between mb-1">
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

      <div className="max-w-md mx-auto px-4 pt-2 pb-4 space-y-4">
        {/* Weekly Meal Planning Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{displayData.cardTitle}</h2>
            <p className="text-sm text-gray-600">Select and customize dishes below</p>
          </div>
          <div className="w-20 h-20 rounded-full flex items-center justify-center ml-4">
            <img 
              src={chef1Avatar} 
              alt="Chef Avatar" 
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Selection Info */}
        {selectedDishesForAction.length > 0 && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-indigo-700">
              <strong>{selectedDishesForAction.length} dish{selectedDishesForAction.length !== 1 ? 'es' : ''} selected</strong>
              {selectedDishesForAction.length === 1 ? 
                " - Ready for cooking!" : 
                selectedDishesForAction.length > 1 ? 
                " - Multiple dishes selected for grocery list. Select only 1 dish for cooking." :
                ""
              }
            </p>
          </div>
        )}

        {/* Dynamic Dishes */}
        <div className="space-y-4">
          {displayData.dishes.map((dish, index) => {
            const isSelected = selectedDishesForAction.includes(dish.id);
            return (
            <div 
              key={dish.id} 
              className={`bg-gradient-to-r from-indigo-50 to-purple-50 border-2 rounded-lg overflow-hidden relative cursor-pointer transition-all ${
                isSelected ? 'border-indigo-600 shadow-lg' : 'border-indigo-200 hover:border-indigo-400'
              }`}
              onClick={() => toggleDishSelection(dish.id)}
            >

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
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">{dish.day} • {dish.servings} servings • {dish.cookTime} min</p>
                    {/* Round tick selection */}
                    <div 
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-green-500 border-green-500' 
                          : 'bg-purple-100 border-purple-300 hover:border-purple-400'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDishSelection(dish.id);
                      }}
                    >
                      {isSelected && <Check className="w-5 h-5 text-white" />}
                    </div>
                  </div>
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

                {/* Action buttons */}
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleDishExpansion(dish.id)}
                    className="w-full flex items-center justify-center gap-1"
                  >
                    Substitutions
                    {expandedDishes[dish.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleInstructionsExpansion(dish.id)}
                    className="w-full flex items-center justify-center gap-1"
                  >
                    Cooking Instructions
                    {expandedInstructions[dish.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </Button>
                </div>

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

                {/* Expanded cooking instructions dropdown */}
                {expandedInstructions[dish.id] && (
                  <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 space-y-4 relative">
                    {/* Close button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 w-8 h-8 p-0 rounded-full"
                      onClick={() => toggleInstructionsExpansion(dish.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>

                    {/* Card 1: Ingredients with Nutritional Values */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="font-semibold text-gray-800 mb-3">Ingredients & Nutrition</h4>
                      <div className="space-y-2">
                        {dish.ingredients.map((ingredient, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <span className="font-medium">{ingredient.name} ({ingredient.quantity})</span>
                            <span className="text-gray-600">{ingredient.nutrition.calories} cal, {ingredient.nutrition.protein}g protein</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card 2: Step-by-step Instructions */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="font-semibold text-gray-800 mb-3">Step-by-Step Instructions</h4>
                      <div className="space-y-3">
                        {cookingInstructions[dish.id]?.map((step, idx) => (
                          <div key={idx} className="flex gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                              {idx + 1}
                            </div>
                            <p className="text-sm text-gray-700 flex-1">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-3 pt-2">
                      {/* Main action buttons */}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Printer className="w-4 h-4 mr-2" />
                          Print
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Share className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                      
                      {/* Social media share buttons */}
                      <div className="flex gap-2 justify-center">
                        <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                          <SiFacebook className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                          <SiInstagram className="w-4 h-4 text-pink-600" />
                        </Button>
                        <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                          <SiTiktok className="w-4 h-4 text-black" />
                        </Button>
                        <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                          <SiX className="w-4 h-4 text-black" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            );
          })}
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
                size="sm"
                className="flex-1" 
                onClick={() => setLocation("/grocery-list")}
                disabled={selectedDishesForAction.length === 0}
              >
                <List size={14} className="mr-2" />
                Grocery List
              </Button>
              <Button 
                size="sm"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700" 
                onClick={() => {
                  if (selectedDishesForAction.length === 1) {
                    setLocation("/voice-cooking");
                  } else {
                    alert(selectedDishesForAction.length === 0 ? "Please select 1 dish to start cooking" : "Please select only 1 dish for cooking");
                  }
                }}
                disabled={selectedDishesForAction.length === 0}
              >
                <ChefHat size={14} className="mr-2" />
                Let's Cook
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}