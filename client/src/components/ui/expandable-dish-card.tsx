import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, ChefHat, BookOpen, Heart, Play, Check } from "lucide-react";
import { RecipeDetailsModal } from "./recipe-details-modal";

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
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  // Generate AI-style food image placeholder
  const getImagePlaceholder = (dishName: string) => {
    return (
      <div className="w-full h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-t-lg flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center">
          <ChefHat size={20} className="text-white/90 mx-auto" />
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

  const handleRecipeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowRecipeModal(true);
  };

  const handleModalSave = (dish: any) => {
    onSaveRecipe?.(dish);
    setShowRecipeModal(false);
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
        
        {/* Selection Tick - Large with solid background for visibility */}
        <div className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
          isSelected ? 'bg-purple-600 scale-110 shadow-lg' : 'bg-white/90 hover:bg-white border-2 border-gray-300'
        }`}>
          {isSelected ? (
            <Check size={20} className="text-white" />
          ) : (
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          )}
        </div>


      </div>

      {/* Square 1: Dish Information */}
      <div className="p-2">
        {/* Row 1: Dish Name with ellipsis if too long */}
        <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">
          {dish.name}
        </h3>
        
        {/* Row 2: Calories (left aligned) and Time (right aligned) */}
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="font-medium text-purple-600">{dish.calories} cal</span>
          <div className="flex items-center gap-1 text-purple-600 pr-1">
            <Clock size={12} />
            <span>{dish.cookTime.replace(' min', '')}</span>
          </div>
        </div>

        {/* Row 3: Recipe and Cook buttons when selected */}
        {isSelected && (
          <div className="flex justify-between items-center mt-2 animate-in fade-in duration-200">
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
              onClick={handleRecipeClick}
            >
              <BookOpen size={18} />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 bg-orange-50 hover:bg-orange-100 text-orange-600 border-orange-200"
              onClick={(e) => handleButtonClick(e, () => onCookNow?.(dish))}
            >
              <Play size={18} />
            </Button>
          </div>
        )}


      </div>

      {/* Recipe Details Modal */}
      <RecipeDetailsModal
        dish={dish}
        isOpen={showRecipeModal}
        onClose={() => setShowRecipeModal(false)}
        onSave={handleModalSave}
      />
    </div>
  );
}