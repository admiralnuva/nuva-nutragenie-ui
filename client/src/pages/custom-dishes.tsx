import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ChevronUp, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DishCard } from "@/components/ui/dish-card";

export default function CustomDishesScreen() {
  const [showForm, setShowForm] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    dishName: "",
    servingSize: "",
    cuisine: "",
    mealType: "",
    cookMethod: ""
  });

  const customDishes = [
    {
      id: 1,
      name: "Classic Indian Style",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
      calories: 380,
      protein: "32g",
      cookTime: "35 min",
      difficulty: "Medium"
    },
    {
      id: 2,
      name: "Thai Coconut Style",
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
      calories: 420,
      protein: "28g",
      cookTime: "40 min",
      difficulty: "Medium"
    },
    {
      id: 3,
      name: "Mediterranean Herb",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop",
      calories: 350,
      protein: "30g",
      cookTime: "30 min",
      difficulty: "Easy"
    }
  ];

  const handleGenerate = () => {
    setShowForm(false);
    setShowResults(true);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <Link href="/explore-recipe-options">
            <ArrowLeft className="w-6 h-6 text-white cursor-pointer" />
          </Link>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
            <p className="text-lg font-semibold text-purple-300 mt-1">Create Custom Dishes</p>
          </div>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-3 py-3 space-y-3 pb-20">
        {/* Input Form Card */}
        {showForm && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
            <h2 className="text-xl font-bold text-yellow-400 mb-4 text-center drop-shadow">Tell us what you're craving</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-yellow-400 text-sm font-medium mb-2 drop-shadow">Dish Name</label>
                <Input
                  value={formData.dishName}
                  onChange={(e) => setFormData({...formData, dishName: e.target.value})}
                  placeholder="e.g., Chicken Curry"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <label className="block text-yellow-400 text-sm font-medium mb-2 drop-shadow">Serving Size</label>
                <Select value={formData.servingSize} onValueChange={(value) => setFormData({...formData, servingSize: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select serving size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 person</SelectItem>
                    <SelectItem value="2">2 people</SelectItem>
                    <SelectItem value="4">4 people</SelectItem>
                    <SelectItem value="6">6 people</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-yellow-400 text-sm font-medium mb-2 drop-shadow">Cuisine</label>
                <Select value={formData.cuisine} onValueChange={(value) => setFormData({...formData, cuisine: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="american">American</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="asian">Asian</SelectItem>
                    <SelectItem value="mexican">Mexican</SelectItem>
                    <SelectItem value="indian">Indian</SelectItem>
                    <SelectItem value="mediterranean">Mediterranean</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-yellow-400 text-sm font-medium mb-2 drop-shadow">Meal Type</label>
                <Select value={formData.mealType} onValueChange={(value) => setFormData({...formData, mealType: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-yellow-400 text-sm font-medium mb-2 drop-shadow">Cook Method</label>
                <Select value={formData.cookMethod} onValueChange={(value) => setFormData({...formData, cookMethod: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select cooking method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stovetop">Stovetop</SelectItem>
                    <SelectItem value="oven">Oven</SelectItem>
                    <SelectItem value="grill">Grill</SelectItem>
                    <SelectItem value="slow-cooker">Slow Cooker</SelectItem>
                    <SelectItem value="microwave">Microwave</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleGenerate}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Generate Variations
              </Button>
            </div>
          </Card>
        )}

        {/* Results Card */}
        {showResults && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white text-center flex-1">
                Your Custom {formData.dishName} Collection
              </h2>
              <button
                onClick={() => setShowResults(false)}
                className="text-purple-400 hover:text-purple-300"
              >
                <ChevronUp className="w-10 h-10" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {customDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}