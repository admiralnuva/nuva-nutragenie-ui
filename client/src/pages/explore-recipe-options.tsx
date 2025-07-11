import { useState } from "react";
import { BackButton } from "@/components/ui/back-button";
import { Card } from "@/components/ui/card";
import { DishCard } from "@/components/ui/dish-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronUp } from "lucide-react";

export default function ExploreRecipeOptionsScreen() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChefRecommendsCollapsed, setIsChefRecommendsCollapsed] = useState(false);
  const [isPantryDishesCollapsed, setIsPantryDishesCollapsed] = useState(false);
  const [isCreateDishesCollapsed, setIsCreateDishesCollapsed] = useState(false);
  
  // Create Dishes form state
  const [dishName, setDishName] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [mealType, setMealType] = useState("");
  const [spiceLevel, setSpiceLevel] = useState("");
  const [cookMethod, setCookMethod] = useState("");
  const [generatedDishes, setGeneratedDishes] = useState<any[]>([]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    // Reset collapse states when switching options
    setIsChefRecommendsCollapsed(false);
    setIsPantryDishesCollapsed(false);
    setIsCreateDishesCollapsed(false);
  };

  const handleCreateDishes = () => {
    // Generate 6 chicken curry variations with authentic images
    const baseDish = dishName || "Chicken Curry";
    const variations = [
      {
        id: 1,
        name: "Classic Indian Style",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
        calories: 420,
        protein: "28g",
        cookTime: "45 min",
        difficulty: "Medium"
      },
      {
        id: 2,
        name: "Spicy Vindaloo Style",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
        calories: 450,
        protein: "30g",
        cookTime: "50 min",
        difficulty: "Medium"
      },
      {
        id: 3,
        name: "Coconut Curry",
        image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop",
        calories: 380,
        protein: "26g",
        cookTime: "35 min",
        difficulty: "Easy"
      },
      {
        id: 4,
        name: "Butter Chicken Style",
        image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop",
        calories: 520,
        protein: "32g",
        cookTime: "40 min",
        difficulty: "Medium"
      },
      {
        id: 5,
        name: "Thai Green Curry",
        image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
        calories: 350,
        protein: "24g",
        cookTime: "25 min",
        difficulty: "Easy"
      },
      {
        id: 6,
        name: "Japanese Curry",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
        calories: 400,
        protein: "25g",
        cookTime: "30 min",
        difficulty: "Easy"
      }
    ];
    setGeneratedDishes(variations);
    // Automatically collapse the input form after generating dishes
    setIsCreateDishesCollapsed(true);
  };

  const chefRecommendedDishes = [
    {
      id: 1,
      name: "Grilled Salmon with Quinoa",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
      calories: 450,
      protein: "35g",
      cookTime: "25 min",
      difficulty: "Medium"
    },
    {
      id: 2,
      name: "Mediterranean Chicken Bowl",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      calories: 380,
      protein: "28g",
      cookTime: "20 min",
      difficulty: "Easy"
    },
    {
      id: 3,
      name: "Vegetable Stir-Fry",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
      calories: 320,
      protein: "12g",
      cookTime: "15 min",
      difficulty: "Easy"
    },
    {
      id: 4,
      name: "Beef and Broccoli",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
      calories: 420,
      protein: "32g",
      cookTime: "30 min",
      difficulty: "Medium"
    },
    {
      id: 5,
      name: "Lemon Herb Pasta",
      image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400&h=300&fit=crop",
      calories: 480,
      protein: "18g",
      cookTime: "18 min",
      difficulty: "Easy"
    },
    {
      id: 6,
      name: "Mediterranean Pasta",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop",
      calories: 520,
      protein: "22g",
      cookTime: "22 min",
      difficulty: "Medium"
    }
  ];

  const pantryDishes = [
    {
      id: 1,
      name: "Garlic Fried Rice",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
      calories: 340,
      protein: "8g",
      cookTime: "15 min",
      difficulty: "Easy"
    },
    {
      id: 2,
      name: "Scrambled Eggs & Toast",
      image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop",
      calories: 280,
      protein: "15g",
      cookTime: "10 min",
      difficulty: "Easy"
    },
    {
      id: 3,
      name: "Vegetable Soup",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop",
      calories: 180,
      protein: "6g",
      cookTime: "25 min",
      difficulty: "Easy"
    },
    {
      id: 4,
      name: "Butter Garlic Pasta",
      image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400&h=300&fit=crop",
      calories: 420,
      protein: "12g",
      cookTime: "12 min",
      difficulty: "Easy"
    },
    {
      id: 5,
      name: "Grilled Cheese Sandwich",
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop",
      calories: 380,
      protein: "18g",
      cookTime: "8 min",
      difficulty: "Easy"
    },
    {
      id: 6,
      name: "Mixed Vegetable Stir-Fry",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
      calories: 220,
      protein: "8g",
      cookTime: "12 min",
      difficulty: "Easy"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <BackButton to="/explore-recipe-options" />
          <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
        </div>
        <h2 className="text-lg font-semibold text-purple-600">Explore Recipe Options</h2>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Card 1 - Preferences */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Preferences</h2>
          <p className="text-gray-300">Configure your dietary preferences and nutrition goals.</p>
        </Card>

        {/* Card 2 - Recipe Options */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recipe Options</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleOptionClick("chefs-choice")}
              className={`p-4 rounded-lg border text-center transition-colors ${
                selectedOption === "chefs-choice"
                  ? "bg-purple-600 text-white border-purple-500"
                  : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
              }`}
            >
              Chef's Choice
            </button>
            <button
              onClick={() => handleOptionClick("pantry-dishes")}
              className={`p-4 rounded-lg border text-center transition-colors ${
                selectedOption === "pantry-dishes"
                  ? "bg-purple-600 text-white border-purple-500"
                  : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
              }`}
            >
              Pantry Dishes
            </button>
            <button
              onClick={() => handleOptionClick("create-dishes")}
              className={`p-4 rounded-lg border text-center transition-colors ${
                selectedOption === "create-dishes"
                  ? "bg-purple-600 text-white border-purple-500"
                  : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
              }`}
            >
              Create Dishes
            </button>
            <button
              onClick={() => handleOptionClick("take-out")}
              className={`p-4 rounded-lg border text-center transition-colors ${
                selectedOption === "take-out"
                  ? "bg-purple-600 text-white border-purple-500"
                  : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
              }`}
            >
              Take-Out
            </button>
          </div>
        </Card>

        {/* Chef Recommends Card - shown when Chef's Choice is selected and not collapsed */}
        {selectedOption === "chefs-choice" && !isChefRecommendsCollapsed && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Chef Recommends</h2>
              <button 
                onClick={() => setIsChefRecommendsCollapsed(true)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ChevronUp size={24} />
              </button>
            </div>
            <div className="space-y-4">
              {chefRecommendedDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </Card>
        )}

        {/* Pantry Dishes Card - shown when Pantry Dishes is selected and not collapsed */}
        {selectedOption === "pantry-dishes" && !isPantryDishesCollapsed && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Dishes from Pantry Ingredients</h2>
              <button 
                onClick={() => setIsPantryDishesCollapsed(true)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ChevronUp size={24} />
              </button>
            </div>
            <div className="space-y-4">
              {pantryDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </Card>
        )}

        {/* Create Dishes Input Card - shown when Create Dishes is selected and not collapsed */}
        {selectedOption === "create-dishes" && !isCreateDishesCollapsed && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-yellow-300">Tell us what you're craving</h2>
              <button 
                onClick={() => setIsCreateDishesCollapsed(true)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ChevronUp size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Dish Name */}
              <div>
                <Label htmlFor="dishName" className="text-yellow-300 font-bold text-sm mb-2 block">Dish Name</Label>
                <Input
                  id="dishName"
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  placeholder="Chicken Curry"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              {/* Row 1: Serving Size & Cuisine */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="servingSize" className="text-yellow-300 font-bold text-sm mb-2 block">Serving Size</Label>
                  <Select value={servingSize} onValueChange={setServingSize}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="2 people" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="1">1 person</SelectItem>
                      <SelectItem value="2">2 people</SelectItem>
                      <SelectItem value="4">4 people</SelectItem>
                      <SelectItem value="6">6 people</SelectItem>
                      <SelectItem value="8">8 people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cuisine" className="text-yellow-300 font-bold text-sm mb-2 block">Cuisine</Label>
                  <Select value={cuisine} onValueChange={setCuisine}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Indian" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="indian">Indian</SelectItem>
                      <SelectItem value="italian">Italian</SelectItem>
                      <SelectItem value="mexican">Mexican</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                      <SelectItem value="american">American</SelectItem>
                      <SelectItem value="mediterranean">Mediterranean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 2: Meal Type & Cook Method */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mealType" className="text-yellow-300 font-bold text-sm mb-2 block">Meal Type</Label>
                  <Select value={mealType} onValueChange={setMealType}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Dinner" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                      <SelectItem value="snack">Snack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cookMethod" className="text-yellow-300 font-bold text-sm mb-2 block">Cook Method</Label>
                  <Select value={cookMethod} onValueChange={setCookMethod}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="stovetop">Stovetop</SelectItem>
                      <SelectItem value="oven">Oven</SelectItem>
                      <SelectItem value="grill">Grill</SelectItem>
                      <SelectItem value="slow-cooker">Slow Cooker</SelectItem>
                      <SelectItem value="instant-pot">Instant Pot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Generate Button */}
              <Button 
                onClick={handleCreateDishes}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 mt-6"
              >
                Generate Variations
              </Button>
            </div>
          </Card>
        )}

        {/* Create Dishes Results Card - shown when dishes are generated */}
        {selectedOption === "create-dishes" && generatedDishes.length > 0 && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Your Custom {dishName || "Chicken Curry"} Collection</h2>
              <button 
                onClick={() => setGeneratedDishes([])}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ChevronUp size={24} />
              </button>
            </div>
            <div className="space-y-4">
              {generatedDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </Card>
        )}

        {/* Card 3 - History */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">History</h2>
          <p className="text-gray-300">View your cooking and ordering history.</p>
        </Card>

        {/* Card 4 - Summary */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Summary</h2>
          <p className="text-gray-300">Overview of your nutrition and cooking progress.</p>
        </Card>
      </div>
    </div>
  );
}