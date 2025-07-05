// @ts-nocheck
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/ui/back-button";
import { Clock, Users, ChefHat, Play, Star, Download, Share } from "lucide-react";

// Recipe details data structure
const recipeDatabase = {
  "greek-style-cucumber-salad": {
    name: "Greek-Style Cucumber Salad",
    description: "A refreshing Mediterranean salad with crisp cucumbers, tangy feta, and fresh herbs",
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    cuisine: "Mediterranean",
    category: "Salad",
    image: "🥗",
    nutrition: {
      calories: 180,
      protein: 8,
      carbs: 12,
      fat: 14,
      fiber: 4
    },
    ingredients: [
      { name: "Cucumber", amount: "3 large", category: "vegetables" },
      { name: "Feta Cheese", amount: "200g", category: "dairy" },
      { name: "Red Onion", amount: "1 small", category: "vegetables" },
      { name: "Olive Oil", amount: "3 tbsp", category: "pantry" },
      { name: "Fresh Dill", amount: "2 tbsp", category: "herbs" },
      { name: "Lemon Juice", amount: "2 tbsp", category: "citrus" },
      { name: "Black Pepper", amount: "to taste", category: "spices" }
    ],
    steps: [
      {
        number: 1,
        instruction: "Wash and slice cucumbers into thin rounds. Place in a large mixing bowl.",
        duration: "3 minutes",
        tips: "Use a mandoline for even slices if available"
      },
      {
        number: 2,
        instruction: "Thinly slice the red onion and add to the cucumber bowl.",
        duration: "2 minutes",
        tips: "Soak onion slices in cold water for 10 minutes to reduce sharpness"
      },
      {
        number: 3,
        instruction: "Crumble the feta cheese into chunky pieces and add to the bowl.",
        duration: "1 minute",
        tips: "Don't crumble too finely - larger chunks provide better texture"
      },
      {
        number: 4,
        instruction: "In a small bowl, whisk together olive oil, lemon juice, and black pepper.",
        duration: "1 minute",
        tips: "Add a pinch of oregano for extra Mediterranean flavor"
      },
      {
        number: 5,
        instruction: "Pour dressing over the salad and toss gently. Add fresh dill and mix.",
        duration: "2 minutes",
        tips: "Let salad sit for 10 minutes before serving to allow flavors to meld"
      }
    ]
  },
  "mediterranean-salmon": {
    name: "Mediterranean Salmon",
    description: "Herb-crusted salmon with Mediterranean flavors and fresh vegetables",
    cookTime: 25,
    servings: 4,
    difficulty: "Medium",
    cuisine: "Mediterranean",
    category: "Main Course",
    image: "🐟",
    nutrition: {
      calories: 380,
      protein: 42,
      carbs: 8,
      fat: 18,
      fiber: 3
    },
    ingredients: [
      { name: "Salmon Fillets", amount: "4 pieces (150g each)", category: "fish" },
      { name: "Cherry Tomatoes", amount: "300g", category: "vegetables" },
      { name: "Spinach", amount: "200g", category: "leafy vegetables" },
      { name: "Garlic", amount: "3 cloves", category: "aromatics" },
      { name: "Olive Oil", amount: "3 tbsp", category: "pantry" },
      { name: "Lemon", amount: "1 large", category: "citrus" },
      { name: "Fresh Herbs", amount: "mixed bunch", category: "herbs" },
      { name: "Sea Salt", amount: "to taste", category: "spices" }
    ],
    steps: [
      {
        number: 1,
        instruction: "Preheat oven to 200°C (400°F). Pat salmon fillets dry and season with salt.",
        duration: "5 minutes",
        tips: "Room temperature salmon cooks more evenly"
      },
      {
        number: 2,
        instruction: "Heat olive oil in an oven-safe pan. Sear salmon skin-side up for 3 minutes.",
        duration: "3 minutes",
        tips: "Don't move the salmon once placed - let it develop a golden crust"
      },
      {
        number: 3,
        instruction: "Flip salmon and add cherry tomatoes and minced garlic around the pan.",
        duration: "2 minutes",
        tips: "Tomatoes will release juices that create a delicious pan sauce"
      },
      {
        number: 4,
        instruction: "Transfer pan to oven and bake for 8-10 minutes until salmon flakes easily.",
        duration: "10 minutes",
        tips: "Internal temperature should reach 63°C (145°F)"
      },
      {
        number: 5,
        instruction: "Add spinach to the pan and let it wilt. Finish with lemon juice and fresh herbs.",
        duration: "3 minutes",
        tips: "Spinach wilts quickly - add it in the last few minutes"
      }
    ]
  },
  "veggie-omelet": {
    name: "Garden Veggie Omelet",
    description: "Fluffy omelet packed with fresh vegetables and herbs",
    cookTime: 12,
    servings: 2,
    difficulty: "Medium",
    cuisine: "French",
    category: "Breakfast",
    image: "🥚",
    nutrition: {
      calories: 320,
      protein: 24,
      carbs: 8,
      fat: 22,
      fiber: 3
    },
    ingredients: [
      { name: "Eggs", amount: "6 large", category: "dairy" },
      { name: "Bell Pepper", amount: "1 medium", category: "vegetables" },
      { name: "Spinach", amount: "100g", category: "leafy vegetables" },
      { name: "Cheese", amount: "80g grated", category: "dairy" },
      { name: "Butter", amount: "2 tbsp", category: "dairy" },
      { name: "Fresh Herbs", amount: "2 tbsp", category: "herbs" },
      { name: "Salt & Pepper", amount: "to taste", category: "spices" }
    ],
    steps: [
      {
        number: 1,
        instruction: "Beat eggs in a bowl with salt and pepper until well combined.",
        duration: "2 minutes",
        tips: "Add a splash of milk or cream for extra fluffiness"
      },
      {
        number: 2,
        instruction: "Dice bell pepper and sauté in half the butter until softened.",
        duration: "3 minutes",
        tips: "Keep vegetables slightly crisp for better texture"
      },
      {
        number: 3,
        instruction: "Add spinach to the pan and cook until wilted. Remove vegetables and set aside.",
        duration: "1 minute",
        tips: "Squeeze excess moisture from spinach before adding to omelet"
      },
      {
        number: 4,
        instruction: "Heat remaining butter in the pan. Pour in beaten eggs and let set for 30 seconds.",
        duration: "3 minutes",
        tips: "Use medium-low heat to prevent burning the bottom"
      },
      {
        number: 5,
        instruction: "Add vegetables and cheese to one half. Fold omelet and slide onto plate.",
        duration: "2 minutes",
        tips: "Tilt the pan to help the omelet fold naturally"
      }
    ]
  },
  "beef-potato-skillet": {
    name: "Beef & Potato Skillet",
    description: "Hearty one-pan meal with seasoned ground beef and crispy potatoes",
    cookTime: 30,
    servings: 4,
    difficulty: "Easy",
    cuisine: "American",
    category: "Main Course",
    image: "🥩",
    nutrition: {
      calories: 450,
      protein: 28,
      carbs: 35,
      fat: 22,
      fiber: 4
    },
    ingredients: [
      { name: "Ground Beef", amount: "500g", category: "meat" },
      { name: "Potatoes", amount: "4 medium", category: "root vegetables" },
      { name: "Onion", amount: "1 large", category: "aromatics" },
      { name: "Bell Pepper", amount: "1 medium", category: "vegetables" },
      { name: "Garlic", amount: "3 cloves", category: "aromatics" },
      { name: "Olive Oil", amount: "2 tbsp", category: "pantry" },
      { name: "Paprika", amount: "1 tsp", category: "spices" },
      { name: "Salt & Pepper", amount: "to taste", category: "spices" }
    ],
    steps: [
      {
        number: 1,
        instruction: "Wash and dice potatoes into 1cm cubes. Pat dry with paper towels.",
        duration: "5 minutes",
        tips: "Smaller, uniform pieces cook more evenly"
      },
      {
        number: 2,
        instruction: "Heat oil in a large skillet. Add potatoes and cook until golden and crispy.",
        duration: "12 minutes",
        tips: "Don't stir too often - let potatoes develop a crust"
      },
      {
        number: 3,
        instruction: "Push potatoes to one side. Add ground beef and cook, breaking it up as it browns.",
        duration: "6 minutes",
        tips: "Let the beef brown properly before stirring for better flavor"
      },
      {
        number: 4,
        instruction: "Add diced onion, bell pepper, and garlic. Cook until vegetables soften.",
        duration: "4 minutes",
        tips: "Add vegetables in order of cooking time needed"
      },
      {
        number: 5,
        instruction: "Season with paprika, salt, and pepper. Mix everything together and serve hot.",
        duration: "2 minutes",
        tips: "Taste and adjust seasoning before serving"
      }
    ]
  }
};

export default function RecipeDetailsScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage("nutragenie_user", null);
  const [selectedRecipes, setSelectedRecipes] = useLocalStorage("selected_recipes", []);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  
  // Get recipe data
  const currentRecipeId = selectedRecipes[currentRecipeIndex];
  const recipe = recipeDatabase[currentRecipeId];
  
  // Check if user is authenticated
  useEffect(() => {
    if (!currentUser) {
      setLocation("/");
    }
  }, [currentUser, setLocation]);

  if (!currentUser || !recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Recipe not found or you need to select recipes first.</p>
          <Button onClick={() => setLocation("/recipes")}>
            Back to Recipes
          </Button>
        </div>
      </div>
    );
  }

  const startCooking = () => {
    // Store current recipe for cooking mode
    localStorage.setItem("current_recipe", JSON.stringify(recipe));
    setLocation("/voice-cooking");
  };

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
          Your Recipes
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Recipe Navigation */}
        {selectedRecipes.length > 1 && (
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentRecipeIndex(Math.max(0, currentRecipeIndex - 1))}
              disabled={currentRecipeIndex === 0}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              {currentRecipeIndex + 1} of {selectedRecipes.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentRecipeIndex(Math.min(selectedRecipes.length - 1, currentRecipeIndex + 1))}
              disabled={currentRecipeIndex === selectedRecipes.length - 1}
            >
              Next
            </Button>
          </div>
        )}

        {/* Recipe Header Card */}
        <Card className="bg-white border border-indigo-200">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="text-6xl mb-3">{recipe.image}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{recipe.name}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{recipe.description}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Clock className="w-5 h-5 mx-auto mb-1 text-indigo-600" />
                <p className="text-sm font-medium">{recipe.cookTime} min</p>
              </div>
              <div>
                <Users className="w-5 h-5 mx-auto mb-1 text-indigo-600" />
                <p className="text-sm font-medium">{recipe.servings} servings</p>
              </div>
              <div>
                <ChefHat className="w-5 h-5 mx-auto mb-1 text-indigo-600" />
                <p className="text-sm font-medium">{recipe.difficulty}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              <Badge variant="secondary">{recipe.cuisine}</Badge>
              <Badge variant="outline">{recipe.category}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Nutrition Info */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Nutrition (per serving)</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-orange-600">{recipe.nutrition.calories}</p>
                <p className="text-xs text-gray-600">Calories</p>
              </div>
              <div>
                <p className="text-lg font-bold text-blue-600">{recipe.nutrition.protein}g</p>
                <p className="text-xs text-gray-600">Protein</p>
              </div>
              <div>
                <p className="text-lg font-bold text-green-600">{recipe.nutrition.carbs}g</p>
                <p className="text-xs text-gray-600">Carbs</p>
              </div>
              <div>
                <p className="text-lg font-bold text-purple-600">{recipe.nutrition.fat}g</p>
                <p className="text-xs text-gray-600">Fat</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ingredients */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Ingredients</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm font-medium">{ingredient.name}</span>
                  <span className="text-sm text-gray-600">{ingredient.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cooking Steps */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Cooking Instructions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {recipe.steps.map((step, index) => (
                <div key={index} className="border-l-4 border-indigo-200 pl-4">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-indigo-600">Step {step.number}</h4>
                    <span className="text-xs text-gray-500">{step.duration}</span>
                  </div>
                  <p className="text-sm text-gray-800 mb-2 leading-relaxed">{step.instruction}</p>
                  <p className="text-xs text-green-700">💡 {step.tips}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={startCooking}
            className="w-full py-4 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Cooking
          </Button>
          
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm">
              <Star className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}