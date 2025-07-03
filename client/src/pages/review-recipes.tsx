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

// Generated dishes data structure
const generatedDishes = [
  {
    id: 1,
    name: "Grilled Chicken Caesar Salad",
    servings: 3,
    cookTime: 25,
    nutrition: { calories: 420, protein: 35, carbs: 12, fat: 28, fiber: 4 },
    ingredients: [
      { 
        name: "Chicken Breast", 
        quantity: "1.5 lbs", 
        nutrition: { calories: 231, protein: 44, carbs: 0, fat: 5 },
        substitutions: [
          { name: "Turkey Breast", quantity: "1.5 lbs", nutrition: { calories: 189, protein: 37, carbs: 0, fat: 4 } },
          { name: "Tofu", quantity: "14 oz", nutrition: { calories: 144, protein: 15, carbs: 3, fat: 9 } }
        ]
      },
      {
        name: "Romaine Lettuce",
        quantity: "2 heads",
        nutrition: { calories: 17, protein: 1, carbs: 3, fat: 0 },
        substitutions: [
          { name: "Spinach", quantity: "6 cups", nutrition: { calories: 21, protein: 3, carbs: 3, fat: 0 } },
          { name: "Kale", quantity: "4 cups", nutrition: { calories: 33, protein: 2, carbs: 7, fat: 0 } }
        ]
      },
      {
        name: "Parmesan Cheese",
        quantity: "1/2 cup",
        nutrition: { calories: 216, protein: 20, carbs: 1, fat: 14 },
        substitutions: [
          { name: "Nutritional Yeast", quantity: "1/4 cup", nutrition: { calories: 60, protein: 8, carbs: 5, fat: 1 } },
          { name: "Pecorino Romano", quantity: "1/2 cup", nutrition: { calories: 200, protein: 18, carbs: 1, fat: 13 } }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Vegetable Stir Fry",
    servings: 3,
    cookTime: 15,
    nutrition: { calories: 280, protein: 12, carbs: 35, fat: 12, fiber: 8 },
    ingredients: [
      {
        name: "Bell Peppers",
        quantity: "3 large",
        nutrition: { calories: 37, protein: 1, carbs: 7, fat: 0 },
        substitutions: [
          { name: "Broccoli", quantity: "2 cups", nutrition: { calories: 25, protein: 3, carbs: 5, fat: 0 } },
          { name: "Snap Peas", quantity: "2 cups", nutrition: { calories: 41, protein: 3, carbs: 7, fat: 0 } }
        ]
      },
      {
        name: "Soy Sauce",
        quantity: "3 tbsp",
        nutrition: { calories: 11, protein: 2, carbs: 1, fat: 0 },
        substitutions: [
          { name: "Tamari", quantity: "3 tbsp", nutrition: { calories: 11, protein: 2, carbs: 1, fat: 0 } },
          { name: "Coconut Aminos", quantity: "4 tbsp", nutrition: { calories: 5, protein: 0, carbs: 1, fat: 0 } }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Salmon with Quinoa",
    servings: 3,
    cookTime: 30,
    nutrition: { calories: 520, protein: 38, carbs: 42, fat: 22, fiber: 5 },
    ingredients: [
      {
        name: "Salmon Fillet",
        quantity: "1.5 lbs",
        nutrition: { calories: 412, protein: 58, carbs: 0, fat: 18 },
        substitutions: [
          { name: "Cod Fillet", quantity: "1.5 lbs", nutrition: { calories: 189, protein: 41, carbs: 0, fat: 2 } },
          { name: "Tofu", quantity: "14 oz", nutrition: { calories: 144, protein: 15, carbs: 3, fat: 9 } }
        ]
      },
      {
        name: "Quinoa",
        quantity: "1 cup dry",
        nutrition: { calories: 626, protein: 24, carbs: 109, fat: 10 },
        substitutions: [
          { name: "Brown Rice", quantity: "1 cup dry", nutrition: { calories: 649, protein: 13, carbs: 162, fat: 3 } },
          { name: "Cauliflower Rice", quantity: "3 cups", nutrition: { calories: 75, protein: 8, carbs: 15, fat: 1 } }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Lentil Curry",
    servings: 4,
    cookTime: 40,
    nutrition: { calories: 350, protein: 18, carbs: 58, fat: 6, fiber: 16 },
    ingredients: [
      {
        name: "Red Lentils",
        quantity: "1.5 cups",
        nutrition: { calories: 679, protein: 49, carbs: 117, fat: 2 },
        substitutions: [
          { name: "Green Lentils", quantity: "1.5 cups", nutrition: { calories: 678, protein: 49, carbs: 117, fat: 2 } },
          { name: "Chickpeas", quantity: "2 cups cooked", nutrition: { calories: 477, protein: 20, carbs: 79, fat: 8 } }
        ]
      },
      {
        name: "Coconut Milk",
        quantity: "1 can",
        nutrition: { calories: 445, protein: 5, carbs: 6, fat: 48 },
        substitutions: [
          { name: "Cashew Milk", quantity: "1.5 cups", nutrition: { calories: 75, protein: 1, carbs: 1, fat: 8 } },
          { name: "Oat Milk", quantity: "1.5 cups", nutrition: { calories: 120, protein: 3, carbs: 19, fat: 5 } }
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Turkey Meatballs",
    servings: 4,
    cookTime: 35,
    nutrition: { calories: 380, protein: 32, carbs: 18, fat: 20, fiber: 3 },
    ingredients: [
      {
        name: "Ground Turkey",
        quantity: "1.5 lbs",
        nutrition: { calories: 640, protein: 89, carbs: 0, fat: 29 },
        substitutions: [
          { name: "Ground Chicken", quantity: "1.5 lbs", nutrition: { calories: 540, protein: 81, carbs: 0, fat: 21 } },
          { name: "Plant-Based Ground", quantity: "1.5 lbs", nutrition: { calories: 480, protein: 54, carbs: 12, fat: 24 } }
        ]
      },
      {
        name: "Breadcrumbs",
        quantity: "1/2 cup",
        nutrition: { calories: 110, protein: 4, carbs: 20, fat: 2 },
        substitutions: [
          { name: "Oat Flour", quantity: "1/2 cup", nutrition: { calories: 120, protein: 4, carbs: 22, fat: 2 } },
          { name: "Almond Flour", quantity: "1/2 cup", nutrition: { calories: 160, protein: 6, carbs: 6, fat: 14 } }
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

  // State management
  const [selectedDishes, setSelectedDishes] = useState([1, 2, 3, 4]); // Start with all dishes selected
  const [expandedDishes, setExpandedDishes] = useState([1]); // Which dishes are expanded in Card 2
  const [selectedSubstitutions, setSelectedSubstitutions] = useState({}); // Track substitution selections
  const [shoppingCart, setShoppingCart] = useState([]);
  const [ingredientQuantities, setIngredientQuantities] = useState({});

  // Initialize shopping cart with missing ingredients
  useEffect(() => {
    const cartItems = [];
    selectedDishes.forEach(dishId => {
      const dish = generatedDishes.find(d => d.id === dishId);
      dish?.ingredients.forEach(ingredient => {
        if (!pantryItems.includes(ingredient.name)) {
          const substitution = selectedSubstitutions[`${dishId}-${ingredient.name}`];
          const finalIngredient = substitution || ingredient;
          
          const existingItem = cartItems.find(item => item.name === finalIngredient.name);
          if (existingItem) {
            existingItem.dishes.push(dish.name);
          } else {
            cartItems.push({
              name: finalIngredient.name,
              quantity: finalIngredient.quantity,
              nutrition: finalIngredient.nutrition,
              dishes: [dish.name],
              inPantry: false
            });
          }
        }
      });
    });
    setShoppingCart(cartItems);
  }, [selectedDishes, selectedSubstitutions]);

  // Toggle dish selection
  const toggleDishSelection = (dishId) => {
    setSelectedDishes(prev => 
      prev.includes(dishId) 
        ? prev.filter(id => id !== dishId)
        : [...prev, dishId]
    );
  };

  // Toggle dish expansion in Card 2
  const toggleDishExpansion = (dishId) => {
    setExpandedDishes(prev => 
      prev.includes(dishId)
        ? prev.filter(id => id !== dishId)
        : [...prev, dishId]
    );
  };

  // Handle substitution selection
  const handleSubstitutionChange = (dishId, ingredientName, substitution) => {
    const key = `${dishId}-${ingredientName}`;
    setSelectedSubstitutions(prev => ({
      ...prev,
      [key]: substitution
    }));
  };

  // Calculate total nutrition for selected dishes
  const calculateTotalNutrition = () => {
    let total = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };
    selectedDishes.forEach(dishId => {
      const dish = generatedDishes.find(d => d.id === dishId);
      if (dish) {
        total.calories += dish.nutrition.calories;
        total.protein += dish.nutrition.protein;
        total.carbs += dish.nutrition.carbs;
        total.fat += dish.nutrition.fat;
        total.fiber += dish.nutrition.fiber;
      }
    });
    return total;
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
    <div className="min-h-screen bg-warm-neutral-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center gap-3">
        <BackButton to="/recipes" />
        <h1 className="text-2xl font-bold text-gray-800">NutraGenie</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Card 1 - AI Generated Dishes */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <ChefHat className="w-5 h-5" />
              AI Generated Dishes
              <Badge variant="secondary" className="text-xs">
                {selectedDishes.length} selected
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 gap-3">
              {generatedDishes.map((dish) => (
                <div
                  key={dish.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedDishes.includes(dish.id) 
                      ? 'border-brand-green-500 bg-brand-green-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => toggleDishSelection(dish.id)}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      checked={selectedDishes.includes(dish.id)}
                      onChange={() => toggleDishSelection(dish.id)}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 mb-1">{dish.name}</h4>
                      <div className="text-sm text-gray-600">
                        {dish.nutrition.protein}g protein • {dish.nutrition.carbs}g carbs • {dish.nutrition.fat}g fat • {dish.nutrition.fiber}g fiber • {dish.nutrition.calories} cal
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Card 2 - Dish Details & Substitutions */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">🍽️ Recipe Details & Substitutions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {selectedDishes.map((dishId) => {
              const dish = generatedDishes.find(d => d.id === dishId);
              const isExpanded = expandedDishes.includes(dishId);
              const shouldCollapse = selectedDishes.length > 1;

              return (
                <div key={dishId} className="border rounded-lg p-3">
                  {/* Dish Header */}
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => shouldCollapse && toggleDishExpansion(dishId)}
                  >
                    <div>
                      <h4 className="font-semibold text-gray-800">{dish.name}</h4>
                      <p className="text-sm text-gray-600">
                        {dish.servings} servings • {dish.nutrition.calories} cal • {dish.nutrition.protein}g protein
                      </p>
                    </div>
                    {shouldCollapse && (
                      <Button variant="ghost" size="sm">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </Button>
                    )}
                  </div>

                  {/* Dish Details - Always expanded if single dish, collapsible if multiple */}
                  {(!shouldCollapse || isExpanded) && (
                    <div className="mt-3 space-y-3">
                      {dish.ingredients.map((ingredient, idx) => {
                        const selectedSub = selectedSubstitutions[`${dishId}-${ingredient.name}`];
                        const currentIngredient = selectedSub || ingredient;

                        return (
                          <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                            {/* Main Ingredient */}
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h5 className="font-medium text-gray-800">{ingredient.name}</h5>
                                <p className="text-sm text-gray-600">{ingredient.quantity}</p>
                              </div>
                              <div className="text-right text-sm text-gray-600">
                                <div>{ingredient.nutrition.calories} cal</div>
                                <div>{ingredient.nutrition.protein}g protein</div>
                              </div>
                            </div>

                            {/* Substitutions */}
                            <div className="space-y-2">
                              <p className="text-xs font-medium text-gray-700">Substitutions:</p>
                              {ingredient.substitutions.map((sub, subIdx) => (
                                <div key={subIdx} className="flex items-center gap-2">
                                  <Checkbox
                                    checked={selectedSub === sub}
                                    onChange={(checked) => 
                                      handleSubstitutionChange(
                                        dishId, 
                                        ingredient.name, 
                                        checked ? sub : null
                                      )
                                    }
                                  />
                                  <div className="flex-1 flex justify-between">
                                    <span className="text-sm">{sub.name} ({sub.quantity})</span>
                                    <span className="text-sm text-gray-500">
                                      {sub.nutrition.calories} cal • {sub.nutrition.protein}g protein
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Nutrition Summary */}
            {selectedDishes.length > 0 && (
              <div className="bg-brand-green-50 p-4 rounded-lg border border-brand-green-200">
                <h4 className="font-semibold text-brand-green-800 mb-2">Total Nutrition Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Calories:</span>
                    <span className="font-medium ml-2">{calculateTotalNutrition().calories}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Protein:</span>
                    <span className="font-medium ml-2">{calculateTotalNutrition().protein}g</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Carbs:</span>
                    <span className="font-medium ml-2">{calculateTotalNutrition().carbs}g</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Fat:</span>
                    <span className="font-medium ml-2">{calculateTotalNutrition().fat}g</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Card 3 - Shopping Cart & Actions */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              🛒 Shopping List & Actions
              <Badge variant="secondary" className="text-xs">
                {shoppingCart.length} items
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            {/* Shopping List */}
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Items to Purchase:</h4>
              {shoppingCart.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.name)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        value={item.quantity}
                        onChange={(e) => updateCartQuantity(item.name, e.target.value)}
                        className="w-20 h-8 text-xs"
                      />
                      <span className="text-xs text-gray-500">
                        for: {item.dishes.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <List className="w-4 h-4" />
                Generate Shopping List
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Add to Instacart
              </Button>
              <Button 
                className="bg-brand-green-500 hover:bg-brand-green-600 text-white flex items-center gap-2"
                onClick={() => setLocation("/cooking")}
              >
                <ChefHat className="w-4 h-4" />
                Start Cooking
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Utensils className="w-4 h-4" />
                Order Takeout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}