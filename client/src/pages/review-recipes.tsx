// @ts-nocheck
import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/ui/back-button";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { Check, ShoppingCart, List, ChefHat, BarChart3 } from "lucide-react";
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
    ingredients: ["Chicken Breast", "Bell Peppers", "Tomatoes", "Garlic", "Basil"]
  },
  {
    id: 2,
    name: "Veggie Scrambled Eggs",
    day: "Tuesday", 
    meal: "Breakfast",
    servings: 2,
    cookTime: 10,
    nutrition: { calories: 280, protein: 18, carbs: 8, fat: 20 },
    ingredients: ["Eggs", "Bell Peppers", "Spinach", "Cheese"]
  },
  {
    id: 3,
    name: "Garlic Butter Salmon",
    day: "Tuesday",
    meal: "Dinner", 
    servings: 3,
    cookTime: 25,
    nutrition: { calories: 380, protein: 42, carbs: 5, fat: 22 },
    ingredients: ["Salmon", "Garlic", "Butter", "Asparagus"]
  },
  {
    id: 4,
    name: "Chicken & Rice Bowl",
    day: "Wednesday",
    meal: "Lunch",
    servings: 4,
    cookTime: 30,
    nutrition: { calories: 450, protein: 38, carbs: 45, fat: 15 },
    ingredients: ["Chicken Breast", "Rice", "Broccoli", "Carrots"]
  },
  {
    id: 5,
    name: "Beef Stir Fry",
    day: "Thursday", 
    meal: "Dinner",
    servings: 3,
    cookTime: 20,
    nutrition: { calories: 520, protein: 42, carbs: 25, fat: 28 },
    ingredients: ["Ground Beef", "Bell Peppers", "Onions", "Garlic"]
  },
  {
    id: 6,
    name: "Greek Yogurt Parfait",
    day: "Friday",
    meal: "Breakfast", 
    servings: 1,
    cookTime: 5,
    nutrition: { calories: 220, protein: 15, carbs: 28, fat: 6 },
    ingredients: ["Greek Yogurt", "Berries", "Milk"]
  },
  {
    id: 7,
    name: "Weekend Pasta",
    day: "Saturday",
    meal: "Dinner",
    servings: 4, 
    cookTime: 25,
    nutrition: { calories: 480, protein: 20, carbs: 65, fat: 18 },
    ingredients: ["Pasta", "Tomatoes", "Basil", "Cheese", "Garlic"]
  }
];

export default function ReviewRecipesScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage("nutragenie_user", null);
  const [selectedDishes, setSelectedDishes] = useState([]);

  const toggleDishSelection = (dishId) => {
    setSelectedDishes(prev => 
      prev.includes(dishId) 
        ? prev.filter(id => id !== dishId)
        : [...prev, dishId]
    );
  };

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
            <p className="text-sm text-gray-600">AI-generated meals based on your pantry ingredients</p>
          </div>
          <div className="w-20 h-20 rounded-full flex items-center justify-center ml-4">
            <img 
              src={chef1Avatar} 
              alt="Chef Avatar" 
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Weekly Overview */}
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              📅 This Week's Meal Plan
              <Badge variant="secondary">7 meals planned</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-7 gap-1 text-xs mb-3">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="text-center font-medium text-gray-600 p-1">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
                const dayMeals = weeklyMealPlan.filter(meal => meal.day === day + 'day');
                return (
                  <div key={day} className="bg-gray-50 rounded p-1 min-h-[40px]">
                    {dayMeals.map(meal => (
                      <div key={meal.id} className="text-[10px] text-indigo-600 mb-1 truncate">
                        {meal.meal}: {meal.name.split(' ')[0]}...
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Pantry Ingredients Used */}
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              🥘 Using Your Pantry Ingredients
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-1">
              {Array.from(new Set(weeklyMealPlan.flatMap(dish => dish.ingredients))).map(ingredient => (
                <Badge key={ingredient} variant="secondary" className="text-xs">
                  {ingredient}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              All meals use ingredients from your pantry selection
            </p>
          </CardContent>
        </Card>

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
                  <div className="w-32 h-32 rounded-full border-4 bg-gradient-to-b from-amber-100 to-amber-200 border-amber-300 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-3 bg-gradient-to-b from-transparent to-black/15 rounded-full"></div>
                    <div className="relative z-10 flex items-center justify-center">
                      <div className="text-8xl opacity-95">🍗</div>
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
              <Badge variant="secondary">0 items</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-center py-4 text-gray-500">
              <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Select dishes to build your shopping list</p>
            </div>
            <div className="flex gap-2 mt-4">
              <Button 
                size="sm"
                className="flex-1" 
                onClick={() => setLocation("/grocery-list")}
                disabled={selectedDishes.length === 0}
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