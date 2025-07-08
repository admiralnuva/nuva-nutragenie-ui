import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, ChefHat, BookOpen, Heart, Play, Check } from "lucide-react";

interface ExpandableDishCardProps {
  dish: {
    id: number;
    name: string;
    calories: number;
    cookTime: string;
    difficulty: "Easy" | "Medium" | "Hard";
    image?: string;
    description?: string;
  };
  onRecipe?: (dish: any) => void;
  onSaveRecipe?: (dish: any) => void;
  onCookNow?: (dish: any) => void;
}

export function ExpandableDishCard({ 
  dish, 
  onRecipe, 
  onSaveRecipe, 
  onCookNow 
}: ExpandableDishCardProps) {
  const [isSelected, setIsSelected] = useState(false);

  // Generate AI-style food image placeholder
  const getImagePlaceholder = (dishName: string) => {
    const colors = [
      'from-orange-400 to-red-500', // warm foods
      'from-green-400 to-emerald-500', // vegetables
      'from-yellow-400 to-orange-500', // grains/pasta
      'from-purple-400 to-pink-500', // colorful dishes
      'from-blue-400 to-cyan-500', // seafood
    ];
    
    const colorIndex = dish.id % colors.length;
    const gradientClass = colors[colorIndex];
    
    return (
      <div className={`w-full h-20 bg-gradient-to-br ${gradientClass} rounded-t-lg flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 text-center">
          <ChefHat size={20} className="text-white/90 mx-auto mb-1" />
          <div className="text-xs text-white/80 font-medium px-2">AI Generated</div>
        </div>
        <div className="absolute top-1 right-1 w-3 h-3 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-1 left-1 w-4 h-4 bg-white/10 rounded-full"></div>
      </div>
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-green-600 font-semibold";
      case "Medium": return "text-yellow-600 font-semibold";
      case "Hard": return "text-red-600 font-semibold";
      default: return "text-gray-600 font-semibold";
    }
  };

  const handleCardClick = () => {
    setIsSelected(!isSelected);
  };

  const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg relative ${
        isSelected ? 'shadow-lg ring-2 ring-purple-300' : 'shadow-md'
      }`}
      onClick={handleCardClick}
    >
      {/* Square 2: AI-Generated Dish Image with Selection Tick */}
      <div className="relative">
        {dish.image ? (
          <img 
            src={dish.image} 
            alt={dish.name}
            className="w-full h-20 object-cover"
          />
        ) : (
          getImagePlaceholder(dish.name)
        )}
        
        {/* Selection Tick - Bigger dot on right side of image */}
        <div className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
          isSelected ? 'bg-purple-600 scale-110' : 'bg-white/30 hover:bg-white/50'
        }`}>
          {isSelected && <Check size={16} className="text-white" />}
        </div>

        {/* Action buttons on image when selected - Recipe and Cook Now */}
        {isSelected && (
          <div className="absolute bottom-2 left-2 right-2 flex gap-2 animate-in fade-in duration-200">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white text-gray-700 rounded-full flex items-center justify-center"
              onClick={(e) => handleButtonClick(e, () => onRecipe?.(dish))}
            >
              <BookOpen size={14} />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white text-gray-700 rounded-full flex items-center justify-center"
              onClick={(e) => handleButtonClick(e, () => onCookNow?.(dish))}
            >
              <Play size={14} />
            </Button>
          </div>
        )}
      </div>

      {/* Square 1: Dish Information */}
      <div className="p-3">
        {/* Row 1: Dish Name */}
        <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-1">
          {dish.name}
        </h3>
        
        {/* Row 2: Calories and Timer (left aligned) + Difficulty (extreme right) */}
        <div className="flex items-center justify-between text-xs mb-2">
          <div className="flex items-center gap-3 text-gray-600">
            <span className="font-medium">{dish.calories} cal</span>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{dish.cookTime}</span>
            </div>
          </div>
          <span className={`text-xs ${getDifficultyColor(dish.difficulty)}`}>
            {dish.difficulty}
          </span>
        </div>


      </div>
    </div>
  );
}