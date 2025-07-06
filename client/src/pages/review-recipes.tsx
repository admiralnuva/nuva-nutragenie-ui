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
        nutrition: { calories: 320, protein: 60, carbs: 0, fat: 7 },
        substitutions: [
          { name: "Chicken Thighs", quantity: "2 lbs", nutrition: { calories: 400, protein: 50, carbs: 0, fat: 20 } }
        ]
      },
      { 
        name: "Olive Oil", 
        quantity: "3 tbsp", 
        nutrition: { calories: 360, protein: 0, carbs: 0, fat: 40 },
        substitutions: [
          { name: "Avocado Oil", quantity: "3 tbsp", nutrition: { calories: 360, protein: 0, carbs: 0, fat: 40 } }
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
      }
    ]
  },
  {
    id: 3,
    name: "Garlic Butter Salmon",
    day: "Tuesday",
    meal: "Dinner", 
    servings: 3,
    cookTime: 20,
    prepTime: 10,
    calories: 420,
    protein: 35,
    difficulty: "Medium",
    badges: ["Heart-Healthy", "High-Protein"],
    nutrition: { calories: 420, protein: 35, carbs: 5, fat: 30 },
    emoji: "🐟",
    ingredients: [
      { 
        name: "Salmon Fillet", 
        quantity: "1.5 lbs", 
        nutrition: { calories: 350, protein: 52, carbs: 0, fat: 15 },
        substitutions: [
          { name: "Cod Fillet", quantity: "1.5 lbs", nutrition: { calories: 280, protein: 60, carbs: 0, fat: 2 } }
        ]
      }
    ]
  }
];

export default function ReviewRecipesScreen() {
  const [location, setLocation] = useLocation();
  const [currentUser] = useLocalStorage('currentUser', null);
  const [selectedDishes, setSelectedDishes] = useState<number[]>([]);
  const [ingredientChoices, setIngredientChoices] = useState<Record<string, string>>({});

  const toggleDishSelection = useCallback((dishId: number) => {
    setSelectedDishes(prev => {
      if (prev.includes(dishId)) {
        return prev.filter(id => id !== dishId);
      } else {
        return [...prev, dishId];
      }
    });
  }, []);

  const groceryItems = useMemo(() => {
    const items: Array<{ name: string; quantity: string; dishName: string; }> = [];
    
    selectedDishes.forEach(dishId => {
      const dish = weeklyMealPlan.find(d => d.id === dishId);
      if (dish && dish.ingredients) {
        dish.ingredients.forEach(ingredient => {
          const chosenIngredient = ingredientChoices[`${dishId}-${ingredient.name}`] || ingredient.name;
          const ingredientData = chosenIngredient === ingredient.name 
            ? ingredient 
            : ingredient.substitutions?.find(sub => sub.name === chosenIngredient) || ingredient;
          
          items.push({
            name: ingredientData.name,
            quantity: ingredientData.quantity,
            dishName: dish.name
          });
        });
      }
    });

    // Combine duplicate ingredients
    const combinedCart: Array<{ name: string; quantity: string; dishName: string; }> = [];
    
    items.forEach(item => {
      const existing = combinedCart.find(cartItem => cartItem.name === item.name);
      if (existing) {
        existing.dishName = existing.dishName !== item.dishName 
          ? `${existing.dishName}, ${item.dishName}`
          : existing.dishName;
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
      </div>

      <BottomNavigation />
    </div>
  );
}