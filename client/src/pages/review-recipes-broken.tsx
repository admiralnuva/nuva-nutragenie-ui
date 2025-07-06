
// @ts-nocheck
import { useState, useMemo, useCallback } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DishCard } from "@/components/ui/dish-card";
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
    prepTime: 10,
    calories: 420,
    protein: 35,
    difficulty: "Medium",
    badges: ["Mediterranean", "High-Protein"],
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
    prepTime: 5,
    calories: 280,
    protein: 18,
    difficulty: "Easy",
    badges: ["Quick", "Vegetarian"],
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
  const [selectedDishes, setSelectedDishes] = useState<number[]>([]);
  
  // State for expanded dish details
  const [expandedDishes, setExpandedDishes] = useState<Record<string, boolean>>({});
  const [expandedInstructions, setExpandedInstructions] = useState<Record<string, boolean>>({});

  // Updated state: each ingredient can have original AND substitutions selected simultaneously
  const [ingredientChoices, setIngredientChoices] = useState<Record<string, any>>({});

  const toggleDishSelection = useCallback((dishId: number) => {
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
  }, [selectedDishes, ingredientChoices]);

  // Toggle dish expansion for substitutions
  const toggleDishExpansion = useCallback((dishId) => {
    setExpandedDishes(prev => ({
      ...prev,
      [dishId]: !prev[dishId]
    }));
  }, [expandedDishes]);

  // Toggle instructions expansion
  const toggleInstructionsExpansion = useCallback((dishId) => {
    setExpandedInstructions(prev => ({
      ...prev,
      [dishId]: !prev[dishId]
    }));
  }, [expandedInstructions]);

  // Set ingredient choice: can have original AND/OR substitutions selected
  const setIngredientChoice = useCallback((dishId, ingredientIndex, choice) => {
    const key = `${dishId}-${ingredientIndex}`;
    setIngredientChoices(prev => ({
      ...prev,
      [key]: choice
    }));
  }, []);

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
        {/* Card 1: Weekly Meal Planner */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Check className="h-5 w-5" />
              Weekly Meal Planner
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          <div className="grid grid-cols-1 gap-4">
            {weeklyMealPlan.map((dish, index) => {
              const isSelected = selectedDishes.includes(dish.id);
              
              const handleDishSelect = (dishId) => {
                toggleDishSelection(dishId);
              };

              const handleSubstitutions = (dishId) => {
                console.log('Substitutions for meal:', dishId);
              };

              const handleViewRecipe = (dishId) => {
                console.log('View recipe for meal:', dishId);
              };

              return (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  isSelected={isSelected}
                  onSelect={handleDishSelect}
                  onSubstitutions={handleSubstitutions}
                  onViewRecipe={handleViewRecipe}
                />
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Card 2: Recipe Details */}
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Recipe Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedDishes.length === 0 ? (
          <div className="text-gray-500 text-center py-6">
            Select a meal to view recipe details
          </div>
        ) : selectedDishes.length === 1 ? (
          <div className="space-y-4">
            {(() => {
              const selectedDish = weeklyMealPlan.find(dish => selectedDishes.includes(dish.id));
              if (!selectedDish) return null;
              
              return (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{selectedDish.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Cook Time: {selectedDish.cookTime} minutes • Serves {selectedDish.servings}</p>
                    <p>Nutrition: {selectedDish.nutrition.calories} cal, {selectedDish.nutrition.protein}g protein</p>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          <div className="text-gray-600 text-center py-6">
            Multiple meals selected - view individual recipes by selecting one meal
          </div>
        )}
      </CardContent>
    </Card>

    {/* Card 3: Shopping Cart */}
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Shopping Cart
          <Badge variant="secondary" className="ml-auto">
            {groceryItems.length} items
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => setLocation('/grocery-list')}
          >
            <List className="h-4 w-4 mr-2" />
            View Grocery List
          </Button>
        </div>
      </CardContent>
    </Card>

    {/* Card 4: Actions */}
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <ChefHat className="h-5 w-5" />
          Next Steps
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={() => setLocation('/instacart')}
            className="flex-1"
            disabled={selectedDishes.length === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Shop Instacart
          </Button>
          <Button 
            onClick={() => setLocation('/voice-cooking')}
            className="flex-1"
            disabled={selectedDishes.length === 0}
          >
            <ChefHat className="h-4 w-4 mr-2" />
            Start Cooking
          </Button>
        </div>
      </CardContent>
    </Card>

    <BottomNavigation />
  </div>
);
}
