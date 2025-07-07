import { ReactNode } from "react";
import { Check } from "lucide-react";

interface ReusableDishProps {
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
    dishImage?: ReactNode;
    badges?: string[];
  };
  isSelected?: boolean;
  onSelect?: (dishId: string | number) => void;
  onSubstitutions?: (dishId: string | number) => void;
  onViewRecipe?: (dishId: string | number) => void;
  className?: string;
}

export function ReusableDish({ 
  dish, 
  isSelected = false, 
  onSelect, 
  onSubstitutions, 
  onViewRecipe,
  className = ""
}: ReusableDishProps) {
  const dishId = dish.id || dish.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const totalTime = dish.cookTime + (dish.prepTime || 0);
  const ingredientCount = Array.isArray(dish.ingredients) ? dish.ingredients.length : 0;

  const handleTickClick = () => {
    onSelect?.(dishId);
  };

  const handleSubstitutionsClick = () => {
    if (!isSelected) {
      onSelect?.(dishId);
    }
    onSubstitutions?.(dishId);
  };

  const handleViewRecipeClick = () => {
    if (!isSelected) {
      onSelect?.(dishId);
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
      {/* Top Rectangle - Dish Display */}
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

      {/* Bottom Rectangle - Dish Information */}
      <div className="p-4 space-y-3">
        {/* Dish Name & Basic Info */}
        <div>
          <h3 className="font-semibold text-gray-800 text-base leading-tight mb-1">{dish.name}</h3>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>⏱️ {totalTime}min</span>
            <span>🔥 {dish.calories}cal</span>
            <span>💪 {dish.protein}g protein</span>
          </div>
        </div>

        {/* Skill Level & Ingredient Count */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">{getSkillLevelDisplay(dish.difficulty)}</span>
          <span className="text-gray-500">{ingredientCount} ingredients</span>
        </div>

        {/* Badges */}
        {dish.badges && dish.badges.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {dish.badges.slice(0, 2).map((badge, index) => (
              <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleSubstitutionsClick}
            className="flex-1 px-3 py-2 text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            Substitutions
          </button>
          <button
            onClick={handleViewRecipeClick}
            className="flex-1 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
          >
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
}