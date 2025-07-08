import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, BookOpen, Settings } from "lucide-react";

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
        
        {/* Selection Tick - Large with solid background for visibility */}
        <div 
          className="absolute top-3 right-3 cursor-pointer"
          onClick={handleTickClick}
        >
          <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all shadow-lg ${
            isSelected 
              ? 'bg-purple-600 border-purple-600 scale-110' 
              : 'bg-white/95 border-gray-400 hover:border-purple-400 hover:bg-white'
          }`}>
            {isSelected ? (
              <Check className="w-6 h-6 text-white" />
            ) : (
              <div className="w-4 h-4 rounded-full bg-gray-400"></div>
            )}
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

        {/* Row 3: Action buttons when selected */}
        {isSelected && (
          <div className="flex justify-between items-center mt-3 animate-in fade-in duration-200">
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-3 bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200 text-xs"
              onClick={handleViewRecipeClick}
            >
              <BookOpen size={12} className="mr-1" />
              Recipe
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-3 bg-orange-50 hover:bg-orange-100 text-orange-600 border-orange-200 text-xs"
              onClick={handleSubstitutionsClick}
            >
              <Settings size={12} className="mr-1" />
              Substitutions
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}