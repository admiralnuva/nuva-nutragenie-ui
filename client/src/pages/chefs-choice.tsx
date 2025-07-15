import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DishCard } from "@/components/ui/dish-card";

export default function ChefsChoiceScreen() {

  const chefsChoiceDishes = [
    {
      id: 1,
      name: "Classic Beef Stew",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      calories: 420,
      protein: "35g",
      cookTime: "45 min",
      difficulty: "Medium"
    },
    {
      id: 2,
      name: "Lemon Herb Salmon",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop",
      calories: 380,
      protein: "42g",
      cookTime: "25 min",
      difficulty: "Easy"
    },
    {
      id: 3,
      name: "Mediterranean Quinoa Bowl",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
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
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
      calories: 450,
      protein: "38g",
      cookTime: "40 min",
      difficulty: "Easy"
    },
    {
      id: 6,
      name: "Vegetable Stir-Fry",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
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
          <div className="grid grid-cols-1 gap-4">
            {chefsChoiceDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}