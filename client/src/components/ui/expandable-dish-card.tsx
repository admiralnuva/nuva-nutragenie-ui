import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ChefHat, BookOpen, Heart, Play } from "lucide-react";

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
  const [isExpanded, setIsExpanded] = useState(false);

  // Generate AI-style food image placeholder (will be replaced with actual AI generation)
  const getImagePlaceholder = (dishName: string) => {
    // Create a food-themed SVG placeholder that looks like an AI-generated image
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
      <div className={`w-full h-32 bg-gradient-to-br ${gradientClass} rounded-t-lg flex items-center justify-center relative overflow-hidden`}>
        {/* AI-style food illustration */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 text-center">
          <ChefHat size={32} className="text-white/90 mx-auto mb-1" />
          <div className="text-xs text-white/80 font-medium px-2">
            AI Generated
          </div>
        </div>
        {/* Decorative elements to simulate AI food photography */}
        <div className="absolute top-2 right-2 w-4 h-4 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 bg-white/10 rounded-full"></div>
      </div>
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation(); // Prevent card toggle when clicking buttons
    action();
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isExpanded ? 'ring-2 ring-purple-200' : ''
      }`}
      onClick={handleCardClick}
    >
      {/* AI-Generated Dish Image */}
      {dish.image ? (
        <img 
          src={dish.image} 
          alt={dish.name}
          className="w-full h-32 object-cover"
        />
      ) : (
        getImagePlaceholder(dish.name)
      )}

      {/* Dish Information */}
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-1">
          {dish.name}
        </h3>
        
        {/* Dish Details Row */}
        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
          <div className="flex items-center gap-3">
            <span className="font-medium">{dish.calories} cal</span>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{dish.cookTime}</span>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className={`text-xs px-2 py-1 ${getDifficultyColor(dish.difficulty)}`}
          >
            {dish.difficulty}
          </Badge>
        </div>

        {/* Expandable Action Buttons */}
        {isExpanded && (
          <div className="space-y-2 mt-3 pt-3 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-3 gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-8 text-xs border-purple-200 hover:bg-purple-50 hover:border-purple-300"
                onClick={(e) => handleButtonClick(e, () => onRecipe?.(dish))}
              >
                <BookOpen size={12} className="mr-1" />
                Recipe
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8 text-xs border-purple-200 hover:bg-purple-50 hover:border-purple-300"
                onClick={(e) => handleButtonClick(e, () => onSaveRecipe?.(dish))}
              >
                <Heart size={12} className="mr-1" />
                Save
              </Button>
              <Button
                size="sm"
                className="h-8 text-xs bg-purple-600 hover:bg-purple-700 text-white"
                onClick={(e) => handleButtonClick(e, () => onCookNow?.(dish))}
              >
                <Play size={12} className="mr-1" />
                Cook
              </Button>
            </div>
          </div>
        )}

        {/* Tap hint when collapsed */}
        {!isExpanded && (
          <div className="text-center mt-2">
            <div className="text-xs text-gray-400">Tap for options</div>
          </div>
        )}
      </div>
    </div>
  );
}