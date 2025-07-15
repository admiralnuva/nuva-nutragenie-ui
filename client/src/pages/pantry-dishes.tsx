import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DishCard } from "@/components/ui/dish-card";

export default function PantryDishesScreen() {

  const pantryDishes = [
    {
      id: 1,
      name: "Quick Fried Rice",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
      calories: 320,
      protein: "12g",
      cookTime: "15 min",
      difficulty: "Easy"
    },
    {
      id: 2,
      name: "Garlic Bread",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
      calories: 180,
      protein: "6g",
      cookTime: "10 min",
      difficulty: "Easy"
    },
    {
      id: 3,
      name: "Simple Pasta",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
      calories: 280,
      protein: "10g",
      cookTime: "12 min",
      difficulty: "Easy"
    },
    {
      id: 4,
      name: "Scrambled Eggs",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
      calories: 220,
      protein: "18g",
      cookTime: "5 min",
      difficulty: "Easy"
    },
    {
      id: 5,
      name: "Vegetable Soup",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
      calories: 150,
      protein: "8g",
      cookTime: "20 min",
      difficulty: "Easy"
    },
    {
      id: 6,
      name: "Toast with Jam",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
      calories: 140,
      protein: "4g",
      cookTime: "3 min",
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
            <p className="text-lg font-semibold text-purple-300 mt-1">Pantry Dishes</p>
          </div>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-3 py-3 space-y-3 pb-20">
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
          <div className="grid grid-cols-1 gap-4">
            {pantryDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}