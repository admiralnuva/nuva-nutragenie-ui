import { useState } from "react";
import { BackButton } from "@/components/ui/back-button";
import { Card } from "@/components/ui/card";
import { ChevronUp, ArrowLeftRight, Book, Heart, ChefHat, Plus } from "lucide-react";

export default function ExploreRecipeOptionsScreen() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const chefRecommendedDishes = [
    {
      id: 1,
      name: "Tuscan Salmon",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
      calories: 550,
      protein: "45g",
      cookTime: "30 min",
      difficulty: "Easy"
    },
    {
      id: 2,
      name: "Herb Crusted Chicken",
      image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop",
      calories: 420,
      protein: "38g", 
      cookTime: "25 min",
      difficulty: "Medium"
    },
    {
      id: 3,
      name: "Mediterranean Pasta",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d935?w=400&h=300&fit=crop",
      calories: 380,
      protein: "22g",
      cookTime: "20 min", 
      difficulty: "Easy"
    },
    {
      id: 4,
      name: "Grilled Vegetable Bowl",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      calories: 290,
      protein: "15g",
      cookTime: "35 min",
      difficulty: "Easy"
    },
    {
      id: 5,
      name: "Beef Stir Fry",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
      calories: 485,
      protein: "42g",
      cookTime: "18 min",
      difficulty: "Medium"
    },
    {
      id: 6,
      name: "Quinoa Power Bowl",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      calories: 350,
      protein: "28g",
      cookTime: "25 min",
      difficulty: "Easy"
    }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pb-20">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 px-4 py-4 flex items-center justify-between">
        <BackButton to="/home" className="text-white" />
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
          <p className="text-lg font-semibold text-purple-600 mt-1">Explore Recipe Options</p>
        </div>
        <div className="w-8"></div>
      </div>

      <div className="p-4 space-y-6">
        {/* Card 1 - Preferences */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white">Preferences</h2>
        </Card>

        {/* Card 2 - Recipe Options */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recipe Options</h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setSelectedOption(selectedOption === "chefs-choice" ? null : "chefs-choice")}
              className={`py-4 px-6 rounded-lg transition-colors ${
                selectedOption === "chefs-choice" 
                  ? "bg-purple-600 text-white" 
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              <span className="text-base font-medium">Chef's Choice</span>
            </button>
            <button 
              onClick={() => setSelectedOption(selectedOption === "pantry-dishes" ? null : "pantry-dishes")}
              className={`py-4 px-6 rounded-lg transition-colors ${
                selectedOption === "pantry-dishes" 
                  ? "bg-purple-600 text-white" 
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              <span className="text-base font-medium">Pantry Dishes</span>
            </button>
            <button 
              onClick={() => setSelectedOption(selectedOption === "create-dishes" ? null : "create-dishes")}
              className={`py-4 px-6 rounded-lg transition-colors ${
                selectedOption === "create-dishes" 
                  ? "bg-purple-600 text-white" 
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              <span className="text-base font-medium">Create Dishes</span>
            </button>
            <button 
              onClick={() => setSelectedOption(selectedOption === "take-out" ? null : "take-out")}
              className={`py-4 px-6 rounded-lg transition-colors ${
                selectedOption === "take-out" 
                  ? "bg-purple-600 text-white" 
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              <span className="text-base font-medium">Take-Out</span>
            </button>
          </div>
        </Card>

        {/* Chef Recommends Card - shown when Chef's Choice is selected */}
        {selectedOption === "chefs-choice" && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Chef Recommends</h2>
              <button className="text-gray-400 hover:text-white transition-colors">
                <ChevronUp size={24} />
              </button>
            </div>
            <div className="space-y-4">
              {chefRecommendedDishes.map((dish) => (
                <div key={dish.id} className="bg-gray-700/50 rounded-lg overflow-hidden">
                  {/* Image Section - Full Width */}
                  <div className="w-full">
                    <img 
                      src={dish.image} 
                      alt={dish.name}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                  
                  {/* Data Section */}
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-lg mb-3">{dish.name}</h3>
                    
                    {/* Nutrition Info - Two Rows */}
                    <div className="mb-3">
                      <div className="flex items-center gap-6 text-sm mb-2">
                        <span className="text-orange-400">• {dish.calories} calories</span>
                        <span className="text-yellow-400">• {dish.protein} protein</span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-300">
                        <span className="text-blue-400">• {dish.cookTime} cook time</span>
                        <span>{dish.difficulty} difficulty</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button className="w-10 h-10 bg-yellow-600 hover:bg-yellow-700 rounded-lg flex items-center justify-center transition-colors">
                        <ArrowLeftRight size={18} className="text-white" />
                      </button>
                      <button className="w-10 h-10 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center transition-colors">
                        <Book size={18} className="text-white" />
                      </button>
                      <button className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-lg flex items-center justify-center transition-colors">
                        <Heart size={18} className="text-white" />
                      </button>
                      <button className="w-10 h-10 bg-orange-600 hover:bg-orange-700 rounded-lg flex items-center justify-center transition-colors">
                        <ChefHat size={18} className="text-white" />
                      </button>
                      <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors">
                        <Plus size={18} className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Card 3 - History */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white">History</h2>
        </Card>

        {/* Card 4 - Summary */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white">Summary</h2>
        </Card>
      </div>
    </div>
  );
}