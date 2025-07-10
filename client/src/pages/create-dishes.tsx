import { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CreateDishesScreen() {
  const [, setLocation] = useLocation();
  const [dishName, setDishName] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [mealType, setMealType] = useState('');
  const [cookMethod, setCookMethod] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState<'variations' | 'favorites'>('variations');

  // Sample dish variations data
  const dishVariations = [
    {
      id: 1,
      name: "Classic Chicken Curry",
      image: "/api/placeholder/300/200",
      calories: 420,
      protein: "32g",
      cookTime: "45 min",
      difficulty: "Medium"
    },
    {
      id: 2,
      name: "Coconut Chicken Curry",
      image: "/api/placeholder/300/200",
      calories: 385,
      protein: "28g",
      cookTime: "40 min",
      difficulty: "Easy"
    },
    {
      id: 3,
      name: "Spicy Chicken Curry",
      image: "/api/placeholder/300/200",
      calories: 410,
      protein: "30g",
      cookTime: "50 min",
      difficulty: "Medium"
    },
    {
      id: 4,
      name: "Thai Chicken Curry",
      image: "/api/placeholder/300/200",
      calories: 395,
      protein: "29g",
      cookTime: "35 min",
      difficulty: "Easy"
    },
    {
      id: 5,
      name: "Butter Chicken Curry",
      image: "/api/placeholder/300/200",
      calories: 450,
      protein: "34g",
      cookTime: "55 min",
      difficulty: "Hard"
    },
    {
      id: 6,
      name: "Green Chicken Curry",
      image: "/api/placeholder/300/200",
      calories: 375,
      protein: "27g",
      cookTime: "42 min",
      difficulty: "Medium"
    }
  ];

  // Sample favorite dishes data
  const favoriteDishes = [
    {
      id: 1,
      name: "Mediterranean Quinoa Bowl",
      image: "/api/placeholder/300/200",
      calories: 350,
      protein: "18g",
      cookTime: "25 min",
      difficulty: "Easy"
    },
    {
      id: 2,
      name: "Grilled Salmon Teriyaki",
      image: "/api/placeholder/300/200",
      calories: 420,
      protein: "35g",
      cookTime: "20 min",
      difficulty: "Medium"
    },
    {
      id: 3,
      name: "Beef Stir Fry Noodles",
      image: "/api/placeholder/300/200",
      calories: 480,
      protein: "28g",
      cookTime: "30 min",
      difficulty: "Easy"
    },
    {
      id: 4,
      name: "Mushroom Risotto",
      image: "/api/placeholder/300/200",
      calories: 390,
      protein: "12g",
      cookTime: "40 min",
      difficulty: "Hard"
    },
    {
      id: 5,
      name: "Chicken Caesar Salad",
      image: "/api/placeholder/300/200",
      calories: 320,
      protein: "25g",
      cookTime: "15 min",
      difficulty: "Easy"
    },
    {
      id: 6,
      name: "Vegetable Pasta Primavera",
      image: "/api/placeholder/300/200",
      calories: 360,
      protein: "14g",
      cookTime: "25 min",
      difficulty: "Easy"
    }
  ];

  const handleGenerateVariations = () => {
    if (dishName && servingSize && cuisine && mealType && cookMethod) {
      setShowResults(true);
      setActiveTab('variations');
    }
  };

  const isFormComplete = dishName && servingSize && cuisine && mealType && cookMethod;

  const currentDishes = activeTab === 'variations' ? dishVariations : favoriteDishes;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setLocation('/explore-recipes')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold">NutraGenie</h1>
              <p className="text-lg font-semibold text-purple-300 mt-1">Create Your Meal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Input Form Card */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
          <CardHeader>
            <CardTitle className="text-yellow-300 font-bold text-xl drop-shadow-lg">Tell us what you're craving</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Dish Name */}
            <div>
              <label className="block text-yellow-300 font-bold text-sm mb-2 drop-shadow-lg">
                Dish Name
              </label>
              <Input
                placeholder="e.g., Chicken Curry"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            {/* First Row - Serving Size and Cuisine */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-yellow-300 font-bold text-sm mb-2 drop-shadow-lg">
                  Serving Size
                </label>
                <Select value={servingSize} onValueChange={setServingSize}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white [&>svg]:text-gray-300">
                    <SelectValue placeholder="2 people" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="1">1 person</SelectItem>
                    <SelectItem value="2">2 people</SelectItem>
                    <SelectItem value="3">3 people</SelectItem>
                    <SelectItem value="4">4 people</SelectItem>
                    <SelectItem value="6">6 people</SelectItem>
                    <SelectItem value="8">8 people</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-yellow-300 font-bold text-sm mb-2 drop-shadow-lg">
                  Cuisine
                </label>
                <Select value={cuisine} onValueChange={setCuisine}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white [&>svg]:text-gray-300">
                    <SelectValue placeholder="Indian" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="American">American</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Indian">Indian</SelectItem>
                    <SelectItem value="Italian">Italian</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                    <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                    <SelectItem value="Mexican">Mexican</SelectItem>
                    <SelectItem value="Thai">Thai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Second Row - Meal Type and Cook Method */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-yellow-300 font-bold text-sm mb-2 drop-shadow-lg">
                  Meal Type
                </label>
                <Select value={mealType} onValueChange={setMealType}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white [&>svg]:text-gray-300">
                    <SelectValue placeholder="Dinner" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="Breakfast">Breakfast</SelectItem>
                    <SelectItem value="Lunch">Lunch</SelectItem>
                    <SelectItem value="Dinner">Dinner</SelectItem>
                    <SelectItem value="Snack">Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-yellow-300 font-bold text-sm mb-2 drop-shadow-lg">
                  Cook Method
                </label>
                <Select value={cookMethod} onValueChange={setCookMethod}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white [&>svg]:text-gray-300">
                    <SelectValue placeholder="Stove-top" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="Stove-top">Stove-top</SelectItem>
                    <SelectItem value="Oven">Oven</SelectItem>
                    <SelectItem value="Grill">Grill</SelectItem>
                    <SelectItem value="Air Fryer">Air Fryer</SelectItem>
                    <SelectItem value="Slow Cooker">Slow Cooker</SelectItem>
                    <SelectItem value="Instant Pot">Instant Pot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerateVariations}
              disabled={!isFormComplete}
              className={`w-full h-12 text-white font-semibold transition-all duration-200 ${
                isFormComplete
                  ? 'bg-blue-600 hover:bg-blue-700 active:bg-purple-600'
                  : 'bg-gray-600 cursor-not-allowed'
              }`}
            >
              Generate Variations
            </Button>
          </CardContent>
        </Card>

        {/* Results Card */}
        {showResults && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className={`flex-1 h-12 transition-all duration-200 ${
                    activeTab === 'variations'
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                  }`}
                  onClick={() => setActiveTab('variations')}
                >
                  Dish Variations
                </Button>
                <Button
                  variant="outline"
                  className={`flex-1 h-12 transition-all duration-200 ${
                    activeTab === 'favorites'
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                  }`}
                  onClick={() => setActiveTab('favorites')}
                >
                  My Favorites
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {currentDishes.map((dish) => (
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
                      
                      {/* Action Buttons */}
                      <div className="flex justify-between mt-4">
                        <Button 
                          variant="outline"
                          className="flex-1 mr-2 bg-gray-700 border-gray-600 text-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                        >
                          View Recipe
                        </Button>
                        <Button 
                          className="flex-1 ml-2 bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => setLocation('/voice-cooking')}
                        >
                          Start Cooking
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}