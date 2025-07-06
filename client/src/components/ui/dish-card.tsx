import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface DishCardProps {
  dish: {
    id?: number | string;
    name: string;
    cookTime: number;
    prepTime?: number;
    calories: number;
    protein: number;
    difficulty: string;
    ingredients: string[] | any[];
    emoji?: string;
    dishImage?: React.ReactNode;
    badges?: string[];
  };
  isSelected?: boolean;
  onSelect?: (dishId: string | number) => void;
  onSubstitutions?: (dishId: string | number) => void;
  onViewRecipe?: (dishId: string | number) => void;
  className?: string;
}

export function DishCard({ 
  dish, 
  isSelected = false, 
  onSelect, 
  onSubstitutions, 
  onViewRecipe,
  className = ""
}: DishCardProps) {
  const dishId = dish.id || dish.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const totalTime = dish.cookTime + (dish.prepTime || 0);
  const ingredientCount = Array.isArray(dish.ingredients) ? dish.ingredients.length : 0;

  const handleTickClick = () => {
    onSelect?.(dishId);
  };

  const handleSubstitutionsClick = () => {
    if (!isSelected) {
      onSelect?.(dishId); // Auto-select when clicking substitutions
    }
    onSubstitutions?.(dishId);
  };

  const handleViewRecipeClick = () => {
    if (!isSelected) {
      onSelect?.(dishId); // Auto-select when clicking view recipe
    }
    onViewRecipe?.(dishId);
  };

  const getSkillLevelDisplay = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
      case 'beginner':
        return '👶 Beginner';
      case 'medium':
      case 'intermediate':
        return '👨‍🍳 Intermediate';
      case 'hard':
      case 'advanced':
        return '👨‍🎓 Advanced';
      case 'kid-friendly':
        return '🧒 Kid Friendly';
      default:
        return `${difficulty}`;
    }
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden transition-all hover:shadow-md ${className}`}>
      {/* A) Top Rectangle - Dish Display */}
      <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-violet-200 relative flex items-center justify-center">
        {dish.emoji ? (
          <div className="text-8xl opacity-95">{dish.emoji}</div>
        ) : dish.dishImage ? (
          dish.dishImage
        ) : (
          <div className="text-8xl opacity-95">🍽️</div>
        )}
        
        {/* Selection Tick - Green Circle */}
        <div 
          className="absolute top-3 right-3 cursor-pointer"
          onClick={handleTickClick}
        >
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
            isSelected 
              ? 'bg-green-500 border-green-500' 
              : 'bg-white border-gray-300 hover:border-green-400'
          }`}>
            {isSelected && <Check className="w-5 h-5 text-white" />}
          </div>
        </div>
      </div>

      {/* B) Content Section */}
      <div className="p-4">
        {/* Row 1: Dish Name | Cook Time */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-lg flex-1 pr-2">{dish.name}</h3>
          <span className="text-sm text-gray-600 font-medium">⏱️ {totalTime} min</span>
        </div>

        {/* Row 2: Nutritional Values & Details */}
        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
          <div className="flex items-center gap-3">
            <span className="text-blue-600 font-semibold">💪 {dish.protein}g protein</span>
            <span className="text-orange-600 font-semibold">🔥 {dish.calories} cal</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span className="text-purple-600 font-medium">{getSkillLevelDisplay(dish.difficulty)}</span>
          <span className="text-indigo-600">{ingredientCount} ingredients</span>
        </div>

        {/* Badges if any */}
        {dish.badges && dish.badges.length > 0 && (
          <div className="flex gap-1 mt-2">
            {dish.badges.slice(0, 2).map((badge, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {badge}
              </Badge>
            ))}
          </div>
        )}

        {/* C) White Space */}
        <div className="my-3"></div>

        {/* D) Action Buttons */}
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            className="flex-1 h-9 text-sm"
            onClick={handleSubstitutionsClick}
          >
            Substitutions
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="flex-1 h-9 text-sm"
            onClick={handleViewRecipeClick}
          >
            View Recipe
          </Button>
        </div>
      </div>
    </div>
  );
}