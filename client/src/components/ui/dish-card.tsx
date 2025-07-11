import { ArrowLeftRight, Book, Heart, ChefHat, Plus } from "lucide-react";

interface Dish {
  id: number;
  name: string;
  image: string;
  calories: number;
  protein: string;
  cookTime: string;
  difficulty: string;
}

interface DishCardProps {
  dish: Dish;
}

export function DishCard({ dish }: DishCardProps) {
  return (
    <div className="bg-gray-700/50 rounded-lg overflow-hidden">
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
  );
}