import { X, Save } from "lucide-react";

interface Ingredient {
  name: string;
  quantity: string;
}

interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
  steps: string[];
  cookTime: string;
  servings: number;
}

interface RecipeModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export function RecipeModal({ recipe, isOpen, onClose, onSave }: RecipeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gray-900 p-4 flex items-center justify-between border-b border-gray-700">
          <h2 className="text-xl font-bold text-white truncate flex-1 mr-4">
            {recipe.name}
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={onSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Save size={16} />
              <span>Save</span>
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Recipe Info */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex gap-6 text-sm text-gray-300">
              <span>🕒 {recipe.cookTime}</span>
              <span>👥 {recipe.servings} servings</span>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-yellow-300 mb-3 flex items-center gap-2">
              📋 Ingredients Summary
            </h3>
            <div className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-200">
                    <span className="font-medium">{ingredient.quantity}</span> {ingredient.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cooking Steps Section */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-yellow-300 mb-3 flex items-center gap-2">
              👩‍🍳 Cooking Steps
            </h3>
            <div className="space-y-4">
              {recipe.steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-gray-200 leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}