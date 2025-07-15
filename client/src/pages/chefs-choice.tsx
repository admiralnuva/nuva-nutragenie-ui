import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ChevronUp, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DishCard } from "@/components/ui/dish-card";

export default function ChefsChoiceScreen() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const chefsChoiceDishes = [
    {
      id: 1,
      name: "Classic Beef Stew",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop",
      calories: 420,
      protein: "35g",
      cookTime: "45 min",
      difficulty: "Medium"
    },
    {
      id: 2,
      name: "Lemon Herb Salmon",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
      calories: 380,
      protein: "42g",
      cookTime: "25 min",
      difficulty: "Easy"
    },
    {
      id: 3,
      name: "Mediterranean Quinoa Bowl",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      calories: 340,
      protein: "18g",
      cookTime: "20 min",
      difficulty: "Easy"
    },
    {
      id: 4,
      name: "Thai Green Curry",
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
      calories: 390,
      protein: "28g",
      cookTime: "35 min",
      difficulty: "Medium"
    },
    {
      id: 5,
      name: "Roasted Chicken Thighs",
      image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
      calories: 450,
      protein: "38g",
      cookTime: "40 min",
      difficulty: "Easy"
    },
    {
      id: 6,
      name: "Vegetable Stir-Fry",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
      calories: 220,
      protein: "8g",
      cookTime: "15 min",
      difficulty: "Easy"
    }
  ];

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
            <p className="text-lg font-semibold text-purple-300 mt-1">Chef's Choice</p>
          </div>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-3 py-3 space-y-3 pb-20">
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white text-center flex-1">Chef Recommends</h2>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-purple-400 hover:text-purple-300"
            >
              {isCollapsed ? (
                <ChevronDown className="w-10 h-10" />
              ) : (
                <ChevronUp className="w-10 h-10" />
              )}
            </button>
          </div>
          
          {!isCollapsed && (
            <div className="grid grid-cols-1 gap-4">
              {chefsChoiceDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}