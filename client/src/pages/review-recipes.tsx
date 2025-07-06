// @ts-nocheck
import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { BackButton } from "@/components/ui/back-button";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { Check, ShoppingCart, List, ChefHat, BarChart3, ChevronDown, ChevronUp, X, BookOpen } from "lucide-react";
import chef1Avatar from "@/assets/avatars/chef/chef1.png";

// Weekly meal planner dishes based on pantry ingredients
const weeklyMealPlan = [
  {
    id: 1,
    name: "Mediterranean Herb Chicken",
    day: "Monday",
    meal: "Dinner",
    servings: 4,
    cookTime: 35,
    nutrition: { calories: 420, protein: 35, carbs: 12, fat: 28 },
    emoji: "🍗",
    ingredients: [
      { 
        name: "Chicken Breast", 
        quantity: "2 lbs", 
        nutrition: { calories: 180, protein: 35, carbs: 0, fat: 4 },
        substitutions: [
          { name: "Chicken Thighs", quantity: "2 lbs", nutrition: { calories: 250, protein: 24, carbs: 0, fat: 16 } },
          { name: "Turkey Breast", quantity: "2 lbs", nutrition: { calories: 200, protein: 30, carbs: 0, fat: 8 } }
        ]
      },
      { 
        name: "Bell Peppers", 
        quantity: "2 large", 
        nutrition: { calories: 60, protein: 2, carbs: 14, fat: 0 },
        substitutions: [
          { name: "Zucchini", quantity: "2 medium", nutrition: { calories: 40, protein: 3, carbs: 8, fat: 0 } }
        ]
      },
      { 
        name: "Tomatoes", 
        quantity: "3 medium", 
        nutrition: { calories: 60, protein: 3, carbs: 12, fat: 0 },
        substitutions: [
          { name: "Cherry Tomatoes", quantity: "2 cups", nutrition: { calories: 60, protein: 3, carbs: 12, fat: 0 } }
        ]
      },
      { 
        name: "Garlic", 
        quantity: "4 cloves", 
        nutrition: { calories: 20, protein: 1, carbs: 4, fat: 0 },
        substitutions: [
          { name: "Garlic Powder", quantity: "1 tsp", nutrition: { calories: 10, protein: 0, carbs: 2, fat: 0 } }
        ]
      },
      { 
        name: "Basil", 
        quantity: "1/4 cup fresh", 
        nutrition: { calories: 5, protein: 0, carbs: 1, fat: 0 },
        substitutions: [
          { name: "Dried Basil", quantity: "2 tbsp", nutrition: { calories: 5, protein: 0, carbs: 1, fat: 0 } }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Veggie Scrambled Eggs",
    day: "Tuesday", 
    meal: "Breakfast",
    servings: 2,
    cookTime: 10,
    nutrition: { calories: 280, protein: 18, carbs: 8, fat: 20 },
    emoji: "🍳",
    ingredients: [
      { 
        name: "Eggs", 
        quantity: "4 large", 
        nutrition: { calories: 140, protein: 12, carbs: 1, fat: 10 },
        substitutions: [
          { name: "Egg Whites", quantity: "8 whites", nutrition: { calories: 140, protein: 30, carbs: 2, fat: 0 } }
        ]
      },
      { 
        name: "Bell Peppers", 
        quantity: "1 medium", 
        nutrition: { calories: 30, protein: 1, carbs: 7, fat: 0 },
        substitutions: [
          { name: "Mushrooms", quantity: "1 cup", nutrition: { calories: 15, protein: 2, carbs: 2, fat: 0 } }
        ]
      },
      { 
        name: "Spinach", 
        quantity: "2 cups", 
        nutrition: { calories: 14, protein: 2, carbs: 2, fat: 0 },
        substitutions: [
          { name: "Kale", quantity: "2 cups", nutrition: { calories: 20, protein: 2, carbs: 4, fat: 0 } }
        ]
      },
      { 
        name: "Cheese", 
        quantity: "1/4 cup", 
        nutrition: { calories: 110, protein: 7, carbs: 1, fat: 9 },
        substitutions: [
          { name: "Greek Yogurt", quantity: "2 tbsp", nutrition: { calories: 30, protein: 5, carbs: 2, fat: 0 } }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Garlic Butter Salmon",
    day: "Tuesday",
    meal: "Dinner", 
    servings: 3,
    cookTime: 25,
    nutrition: { calories: 380, protein: 42, carbs: 5, fat: 22 },
    emoji: "🐟",
    ingredients: [
      { name: "Salmon", quantity: "3 fillets", nutrition: { calories: 280, protein: 40, carbs: 0, fat: 12 }, substitutions: [{ name: "Cod", quantity: "3 fillets", nutrition: { calories: 160, protein: 35, carbs: 0, fat: 1 } }] },
      { name: "Garlic", quantity: "4 cloves", nutrition: { calories: 20, protein: 1, carbs: 4, fat: 0 }, substitutions: [{ name: "Garlic Powder", quantity: "1 tsp", nutrition: { calories: 10, protein: 0, carbs: 2, fat: 0 } }] },
      { name: "Butter", quantity: "2 tbsp", nutrition: { calories: 200, protein: 0, carbs: 0, fat: 22 }, substitutions: [{ name: "Olive Oil", quantity: "2 tbsp", nutrition: { calories: 240, protein: 0, carbs: 0, fat: 27 } }] },
      { name: "Asparagus", quantity: "1 lb", nutrition: { calories: 90, protein: 10, carbs: 18, fat: 1 }, substitutions: [{ name: "Green Beans", quantity: "1 lb", nutrition: { calories: 140, protein: 8, carbs: 32, fat: 1 } }] }
    ]
  },
  {
    id: 4,
    name: "Chicken & Rice Bowl",
    day: "Wednesday",
    meal: "Lunch",
    servings: 4,
    cookTime: 30,
    nutrition: { calories: 450, protein: 38, carbs: 45, fat: 15 },
    emoji: "🍚",
    ingredients: [
      { name: "Chicken Breast", quantity: "2 lbs", nutrition: { calories: 180, protein: 35, carbs: 0, fat: 4 }, substitutions: [{ name: "Turkey Breast", quantity: "2 lbs", nutrition: { calories: 200, protein: 30, carbs: 0, fat: 8 } }] },
      { name: "Rice", quantity: "2 cups", nutrition: { calories: 440, protein: 8, carbs: 90, fat: 1 }, substitutions: [{ name: "Quinoa", quantity: "2 cups", nutrition: { calories: 440, protein: 16, carbs: 78, fat: 6 } }] },
      { name: "Broccoli", quantity: "2 cups", nutrition: { calories: 55, protein: 6, carbs: 11, fat: 0 }, substitutions: [{ name: "Cauliflower", quantity: "2 cups", nutrition: { calories: 50, protein: 4, carbs: 10, fat: 0 } }] },
      { name: "Carrots", quantity: "2 large", nutrition: { calories: 60, protein: 1, carbs: 14, fat: 0 }, substitutions: [{ name: "Bell Peppers", quantity: "2 large", nutrition: { calories: 60, protein: 2, carbs: 14, fat: 0 } }] }
    ]
  },
  {
    id: 5,
    name: "Beef Stir Fry",
    day: "Thursday", 
    meal: "Dinner",
    servings: 3,
    cookTime: 20,
    nutrition: { calories: 520, protein: 42, carbs: 25, fat: 28 },
    emoji: "🥩",
    ingredients: [
      { name: "Ground Beef", quantity: "1.5 lbs", nutrition: { calories: 340, protein: 25, carbs: 0, fat: 26 }, substitutions: [{ name: "Ground Turkey", quantity: "1.5 lbs", nutrition: { calories: 240, protein: 28, carbs: 0, fat: 14 } }] },
      { name: "Bell Peppers", quantity: "2 large", nutrition: { calories: 60, protein: 2, carbs: 14, fat: 0 }, substitutions: [{ name: "Mushrooms", quantity: "2 cups", nutrition: { calories: 30, protein: 4, carbs: 4, fat: 0 } }] },
      { name: "Onions", quantity: "1 large", nutrition: { calories: 60, protein: 2, carbs: 14, fat: 0 }, substitutions: [{ name: "Shallots", quantity: "3 medium", nutrition: { calories: 60, protein: 2, carbs: 14, fat: 0 } }] },
      { name: "Garlic", quantity: "4 cloves", nutrition: { calories: 20, protein: 1, carbs: 4, fat: 0 }, substitutions: [{ name: "Ginger", quantity: "2 tbsp", nutrition: { calories: 10, protein: 0, carbs: 2, fat: 0 } }] }
    ]
  },
  {
    id: 6,
    name: "Greek Yogurt Parfait",
    day: "Friday",
    meal: "Breakfast", 
    servings: 1,
    cookTime: 5,
    nutrition: { calories: 220, protein: 15, carbs: 28, fat: 6 },
    emoji: "🥣",
    ingredients: [
      { name: "Greek Yogurt", quantity: "1 cup", nutrition: { calories: 150, protein: 20, carbs: 9, fat: 0 }, substitutions: [{ name: "Regular Yogurt", quantity: "1 cup", nutrition: { calories: 150, protein: 8, carbs: 17, fat: 8 } }] },
      { name: "Berries", quantity: "1/2 cup", nutrition: { calories: 40, protein: 1, carbs: 10, fat: 0 }, substitutions: [{ name: "Banana", quantity: "1 medium", nutrition: { calories: 105, protein: 1, carbs: 27, fat: 0 } }] },
      { name: "Milk", quantity: "1/4 cup", nutrition: { calories: 40, protein: 2, carbs: 3, fat: 2 }, substitutions: [{ name: "Almond Milk", quantity: "1/4 cup", nutrition: { calories: 10, protein: 0, carbs: 1, fat: 1 } }] }
    ]
  },
  {
    id: 7,
    name: "Weekend Pasta",
    day: "Saturday",
    meal: "Dinner",
    servings: 4, 
    cookTime: 25,
    nutrition: { calories: 480, protein: 20, carbs: 65, fat: 18 },
    emoji: "🍝",
    ingredients: [
      { name: "Pasta", quantity: "1 lb", nutrition: { calories: 1680, protein: 56, carbs: 336, fat: 8 }, substitutions: [{ name: "Zucchini Noodles", quantity: "4 cups", nutrition: { calories: 80, protein: 6, carbs: 16, fat: 0 } }] },
      { name: "Tomatoes", quantity: "4 large", nutrition: { calories: 80, protein: 4, carbs: 16, fat: 0 }, substitutions: [{ name: "Tomato Sauce", quantity: "2 cups", nutrition: { calories: 140, protein: 6, carbs: 32, fat: 1 } }] },
      { name: "Basil", quantity: "1/2 cup fresh", nutrition: { calories: 10, protein: 1, carbs: 2, fat: 0 }, substitutions: [{ name: "Oregano", quantity: "2 tbsp", nutrition: { calories: 5, protein: 0, carbs: 1, fat: 0 } }] },
      { name: "Cheese", quantity: "1 cup", nutrition: { calories: 440, protein: 28, carbs: 4, fat: 36 }, substitutions: [{ name: "Nutritional Yeast", quantity: "1/2 cup", nutrition: { calories: 120, protein: 16, carbs: 8, fat: 2 } }] },
      { name: "Garlic", quantity: "6 cloves", nutrition: { calories: 30, protein: 1, carbs: 6, fat: 0 }, substitutions: [{ name: "Garlic Powder", quantity: "2 tsp", nutrition: { calories: 20, protein: 1, carbs: 4, fat: 0 } }] }
    ]
  }
];

export default function ReviewRecipesScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage("nutragenie_user", null);
  const [selectedDishes, setSelectedDishes] = useState([]);
  
  // State for expanded dish details
  const [expandedDishes, setExpandedDishes] = useState({});
  const [expandedInstructions, setExpandedInstructions] = useState({});

  // Updated state: each ingredient can have original AND substitutions selected simultaneously
  const [ingredientChoices, setIngredientChoices] = useState({});

  const toggleDishSelection = (dishId) => {
    const isCurrentlySelected = selectedDishes.includes(dishId);
    
    setSelectedDishes(prev => 
      isCurrentlySelected
        ? prev.filter(id => id !== dishId)
        : [...prev, dishId]
    );

    // Auto-select all original ingredients when dish is selected
    if (!isCurrentlySelected) {
      const dish = weeklyMealPlan.find(d => d.id === dishId);
      if (dish) {
        setIngredientChoices(prev => {
          const newChoices = { ...prev };
          dish.ingredients.forEach((ingredient, ingredientIndex) => {
            const ingredientKey = `${dishId}-${ingredientIndex}`;
            // Default to original ingredient selected
            newChoices[ingredientKey] = { original: true, substitutions: {} };
          });
          return newChoices;
        });
      }
    } else {
      // Clear all ingredient choices when dish is deselected
      const dish = weeklyMealPlan.find(d => d.id === dishId);
      if (dish) {
        setIngredientChoices(prev => {
          const newChoices = { ...prev };
          dish.ingredients.forEach((ingredient, ingredientIndex) => {
            const ingredientKey = `${dishId}-${ingredientIndex}`;
            delete newChoices[ingredientKey];
          });
          return newChoices;
        });
      }
    }
  };

  // Toggle dish expansion for substitutions
  const toggleDishExpansion = (dishId) => {
    setExpandedDishes(prev => ({
      ...prev,
      [dishId]: !prev[dishId]
    }));
  };

  // Toggle instructions expansion
  const toggleInstructionsExpansion = (dishId) => {
    setExpandedInstructions(prev => ({
      ...prev,
      [dishId]: !prev[dishId]
    }));
  };

  // Set ingredient choice: can have original AND/OR substitutions selected
  const setIngredientChoice = (dishId, ingredientIndex, choice) => {
    const key = `${dishId}-${ingredientIndex}`;
    setIngredientChoices(prev => ({
      ...prev,
      [key]: choice
    }));
  };

  // Toggle substitution selection (keeps original if selected)
  const toggleSubstitution = (dishId, ingredientIndex, substitutionIndex) => {
    const key = `${dishId}-${ingredientIndex}`;
    const currentChoices = ingredientChoices[key] || { original: false, substitutions: {} };
    
    const newChoices = {
      ...currentChoices,
      substitutions: {
        ...currentChoices.substitutions,
        [substitutionIndex]: !currentChoices.substitutions[substitutionIndex]
      }
    };
    
    setIngredientChoice(dishId, ingredientIndex, newChoices);
  };

  // Toggle original ingredient on/off
  const toggleIngredient = (dishId, ingredientIndex) => {
    const key = `${dishId}-${ingredientIndex}`;
    const currentChoices = ingredientChoices[key] || { original: false, substitutions: {} };
    
    const newChoices = {
      ...currentChoices,
      original: !currentChoices.original
    };
    
    // Auto-select the dish when ingredient is clicked
    if (newChoices.original && !selectedDishes.includes(dishId)) {
      setSelectedDishes(prev => [...prev, dishId]);
    }
    
    setIngredientChoice(dishId, ingredientIndex, newChoices);
  };

  // Select substitution (keeps original ingredient selected, auto-selects dish)
  const selectSubstitution = (dishId, ingredientIndex, substitutionIndex) => {
    // Auto-select the dish when substitution is clicked
    if (!selectedDishes.includes(dishId)) {
      setSelectedDishes(prev => [...prev, dishId]);
    }
    
    // Toggle the substitution using the new logic
    toggleSubstitution(dishId, ingredientIndex, substitutionIndex);
  };

  // Generate shopping cart from ingredient choices
  const shoppingCart = useMemo(() => {
    const cart = [];
    
    selectedDishes.forEach(dishId => {
      const dish = weeklyMealPlan.find(d => d.id === dishId);
      if (!dish) return;

      dish.ingredients.forEach((ingredient, ingredientIndex) => {
        const ingredientKey = `${dishId}-${ingredientIndex}`;
        const choices = ingredientChoices[ingredientKey] || { original: false, substitutions: {} };

        // Add original ingredient if selected
        if (choices.original) {
          cart.push({
            name: ingredient.name,
            quantity: ingredient.quantity,
            dishId: dishId,
            dishName: dish.name,
            originalIngredient: ingredient.name,
            isSubstitution: false
          });
        }

        // Add any selected substitutions
        if (choices.substitutions && ingredient.substitutions) {
          Object.keys(choices.substitutions).forEach(substitutionIndex => {
            if (choices.substitutions[substitutionIndex] && ingredient.substitutions[substitutionIndex]) {
              const substitution = ingredient.substitutions[substitutionIndex];
              cart.push({
                name: substitution.name,
                quantity: substitution.quantity,
                dishId: dishId,
                dishName: dish.name,
                originalIngredient: ingredient.name,
                isSubstitution: true
              });
            }
          });
        }
      });
    });

    // Combine duplicate items by name
    const combinedCart = [];
    cart.forEach(item => {
      const existing = combinedCart.find(cartItem => cartItem.name === item.name);
      if (existing) {
        const qty1 = existing.quantity;
        const qty2 = item.quantity;
        existing.quantity = `${qty1} + ${qty2}`;
        existing.dishName = existing.dishName.includes(item.dishName) 
          ? existing.dishName 
          : `${existing.dishName}, ${item.dishName}`;
      } else {
        combinedCart.push({ ...item });
      }
    });

    return combinedCart;
  }, [selectedDishes, ingredientChoices]);

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
        {/* Header with Chef Avatar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">Weekly Meal Planner</h2>
            <p className="text-sm text-gray-600">
              By {currentUser?.selectedChef?.name || 'Chef Marcus'} • AI-generated meals from your pantry
            </p>
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
        {selectedDishes.length > 0 && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-indigo-700">
              <strong>{selectedDishes.length} meal{selectedDishes.length !== 1 ? 's' : ''} selected for this week</strong>
              {selectedDishes.length === 1 ? 
                " - Ready for cooking!" : 
                " - Multiple meals selected for grocery planning."
              }
            </p>
          </div>
        )}

        {/* Detailed Meal List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Select Meals for This Week</h3>
          {weeklyMealPlan.map((dish, index) => {
            const isSelected = selectedDishes.includes(dish.id);
            
            return (
              <div 
                key={dish.id}
                className={`bg-gradient-to-r from-indigo-50 to-purple-50 border-2 rounded-lg overflow-hidden relative cursor-pointer transition-all ${
                  isSelected ? 'border-indigo-600 shadow-lg' : 'border-indigo-200 hover:border-indigo-400'
                }`}
                onClick={() => toggleDishSelection(dish.id)}
              >
                {/* Dish Image */}
                <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-violet-200 relative flex items-center justify-center">
                  <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center relative overflow-hidden ${
                    index === 0 ? 'bg-gradient-to-b from-amber-100 to-amber-200 border-amber-300' : 
                    index === 1 ? 'bg-gradient-to-b from-yellow-100 to-yellow-200 border-yellow-300' : 
                    index === 2 ? 'bg-gradient-to-b from-blue-100 to-blue-200 border-blue-300' : 
                    index === 3 ? 'bg-gradient-to-b from-green-100 to-green-200 border-green-300' : 
                    index === 4 ? 'bg-gradient-to-b from-red-100 to-red-200 border-red-300' : 
                    index === 5 ? 'bg-gradient-to-b from-purple-100 to-purple-200 border-purple-300' : 
                    'bg-gradient-to-b from-orange-100 to-orange-200 border-orange-300'
                  }`}>
                    <div className="absolute inset-3 bg-gradient-to-b from-transparent to-black/15 rounded-full"></div>
                    <div className="relative z-10 flex items-center justify-center">
                      <div className="text-8xl opacity-95">{dish.emoji}</div>
                    </div>
                  </div>
                </div>

                {/* Dish Details */}
                <div className="p-4">
                  <div className="mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {dish.day} {dish.meal}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {dish.ingredients.length} ingredients from pantry
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">{dish.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">{dish.servings} servings • {dish.cookTime} min</p>
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

                  {/* Nutrition info */}
                  <div className="flex items-center gap-4 text-xs mb-3">
                    <span className="text-orange-600 font-semibold">{dish.nutrition.calories} cal</span>
                    <span className="text-blue-600 font-semibold">{dish.nutrition.protein}g protein</span>
                    <span className="text-green-600 font-semibold">{dish.nutrition.carbs}g carbs</span>
                    <span className="text-purple-600 font-semibold">{dish.nutrition.fat}g fat</span>
                  </div>

                  {/* Action buttons */}
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDishExpansion(dish.id);
                      }}
                      className="w-full flex items-center justify-center gap-1"
                    >
                      Substitutions
                      {expandedDishes[dish.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleInstructionsExpansion(dish.id);
                      }}
                      className="w-full flex items-center justify-center gap-1"
                    >
                      <BookOpen size={16} />
                      View Recipe
                      {expandedInstructions[dish.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Button>
                  </div>

                  {/* Expanded substitutions dropdown */}
                  {expandedDishes[dish.id] && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 space-y-3 relative">
                      <h4 className="font-semibold text-gray-800">Ingredients & Substitutions</h4>
                      
                      {dish.ingredients.map((ingredient, ingredientIndex) => {
                        const ingredientKey = `${dish.id}-${ingredientIndex}`;
                        const currentChoices = ingredientChoices[ingredientKey] || { original: false, substitutions: {} };
                        const isOriginalSelected = currentChoices.original;
                        
                        return (
                          <div key={ingredientIndex} className="space-y-2 border-b border-gray-200 pb-2 last:border-b-0">
                            {/* Original ingredient header */}
                            <div className="font-semibold text-gray-800 text-sm">
                              {ingredient.name} Options:
                            </div>
                            
                            {/* Original ingredient option */}
                            <div 
                              className={`flex items-center space-x-3 p-2 rounded-lg border-2 transition-all cursor-pointer ${
                                isOriginalSelected 
                                  ? 'bg-indigo-50 border-indigo-300 shadow-sm' 
                                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleIngredient(dish.id, ingredientIndex);
                              }}
                            >
                              <Checkbox
                                checked={isOriginalSelected}
                                onCheckedChange={() => toggleIngredient(dish.id, ingredientIndex)}
                              />
                              <div className="flex-1">
                                <div className="mb-1">
                                  <span className="font-medium text-gray-900">{ingredient.name} ({ingredient.quantity})</span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  {ingredient.nutrition.calories} cal • P: {ingredient.nutrition.protein}g • C: {ingredient.nutrition.carbs}g • F: {ingredient.nutrition.fat}g
                                </div>
                              </div>
                            </div>

                            {/* Substitution options */}
                            {ingredient.substitutions && ingredient.substitutions.map((substitution, substitutionIndex) => {
                              const isSubstitutionSelected = currentChoices.substitutions[substitutionIndex] || false;
                              
                              return (
                                <div 
                                  key={substitutionIndex} 
                                  className={`flex items-center space-x-3 p-2 rounded-lg border-2 transition-all ml-4 cursor-pointer ${
                                    isSubstitutionSelected 
                                      ? 'bg-blue-50 border-blue-300 shadow-sm' 
                                      : 'bg-white border-blue-200 hover:border-blue-300'
                                  }`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    selectSubstitution(dish.id, ingredientIndex, substitutionIndex);
                                  }}
                                >
                                  <Checkbox
                                    checked={isSubstitutionSelected}
                                    onCheckedChange={() => selectSubstitution(dish.id, ingredientIndex, substitutionIndex)}
                                  />
                                  <div className="flex-1">
                                    <div className="mb-1">
                                      <span className="font-medium text-blue-900">⟳ {substitution.name} ({substitution.quantity})</span>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {substitution.nutrition.calories} cal • P: {substitution.nutrition.protein}g • C: {substitution.nutrition.carbs}g • F: {substitution.nutrition.fat}g
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                      
                      {/* Close button */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute bottom-2 right-2 w-8 h-8 p-0 rounded-full"
                        onClick={() => toggleDishExpansion(dish.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  {/* Expanded recipe instructions */}
                  {expandedInstructions[dish.id] && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 space-y-4 relative">
                      <h4 className="font-semibold text-gray-800">Recipe Instructions</h4>
                      <div className="space-y-3">
                        <div className="text-sm text-gray-700">
                          Step-by-step cooking instructions for {dish.name} would appear here with detailed preparation and cooking guidance.
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-xs text-gray-600">
                            Full recipe details with timing, techniques, and tips from {currentUser?.selectedChef?.name || 'Chef Marcus'}.
                          </p>
                        </div>
                      </div>
                      
                      {/* Close button */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute bottom-2 right-2 w-8 h-8 p-0 rounded-full"
                        onClick={() => toggleInstructionsExpansion(dish.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Nutrition Tracking Card */}
        <Card className="mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Nutrition Tracking
              <Badge variant="secondary">{selectedDishes.length} dishes selected</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Daily Nutritional Goals</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-orange-50 p-2 rounded-lg border border-orange-200">
                    <div className="text-xs text-orange-700">Calories</div>
                    <div className="text-sm font-bold text-orange-800">300 - 600</div>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-700">Protein (g)</div>
                    <div className="text-sm font-bold text-blue-800">15 - 40</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded-lg border border-green-200">
                    <div className="text-xs text-green-700">Carbs (g)</div>
                    <div className="text-sm font-bold text-green-800">20 - 60</div>
                  </div>
                  <div className="bg-purple-50 p-2 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-700">Fat (g)</div>
                    <div className="text-sm font-bold text-purple-800">10 - 35</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shopping Cart Summary */}
        <Card className="mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Shopping List
              <Badge variant="secondary">{shoppingCart.length} items</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {shoppingCart.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Select dishes to build your shopping list</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {shoppingCart.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">
                        {item.isSubstitution && <span className="text-blue-600">⟳ </span>}
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.quantity}
                        {item.isSubstitution && (
                          <span className="text-blue-600 ml-1">(replaces {item.originalIngredient})</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2 mt-4">
              <Button 
                size="sm"
                className="flex-1" 
                onClick={() => setLocation("/grocery-list")}
                disabled={shoppingCart.length === 0}
              >
                <List size={14} className="mr-2" />
                Grocery List
              </Button>
              <Button 
                size="sm"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700" 
                onClick={() => {
                  if (selectedDishes.length === 1) {
                    setLocation("/voice-cooking");
                  } else {
                    alert(selectedDishes.length === 0 ? "Please select 1 dish to start cooking" : "Please select only 1 dish for cooking");
                  }
                }}
                disabled={selectedDishes.length === 0}
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