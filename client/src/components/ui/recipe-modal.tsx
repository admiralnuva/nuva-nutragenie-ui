import { X, Save, Check, Clock, Users, ChefHat, Utensils } from "lucide-react";
import { useState } from "react";

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
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSaved(true);
      setIsSaving(false);
      onSave();
      
      // Show saved state for 2 seconds, then close modal
      setTimeout(() => {
        setIsSaved(false);
        onClose();
      }, 2000);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-start justify-center p-4 pt-8 md:pt-16">
      <div className="bg-gray-900/90 backdrop-blur-md border border-gray-700/50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-500 flex flex-col shadow-2xl shadow-purple-500/20">
        {/* Fixed Header */}
        <div className="bg-gray-800 p-3 border-b border-gray-700/50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <h2 className="text-lg font-bold text-white truncate">
                {recipe.name}
              </h2>
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <Clock size={14} className="text-blue-400" />
                  {recipe.cookTime}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} className="text-green-400" />
                  {recipe.servings}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Ingredients Section */}
          <div className="p-4 border-b border-gray-700/50">
            <h3 className="text-lg font-semibold mb-3 text-green-400">
              Ingredients
            </h3>
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></div>
                  <span className="text-white text-sm">
                    <span className="font-semibold text-green-300">{ingredient.quantity}</span> 
                    <span className="ml-2 text-emerald-200">{ingredient.name}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cooking Steps Section */}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-3 text-blue-400">
              Cooking Steps
            </h3>
            <div className="space-y-3">
              {recipe.steps.map((step, index) => (
                <div key={index} className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-white leading-relaxed text-sm pt-0.5">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Footer Action Bar */}
        <div className="bg-gray-800 p-3 border-t border-gray-700/50 flex-shrink-0">
          <div className="flex justify-between items-center">
            <button
              onClick={handleSave}
              disabled={isSaving || isSaved}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                isSaved 
                  ? 'bg-green-600 text-white' 
                  : isSaving
                  ? 'bg-blue-500 text-white cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isSaved ? (
                <>
                  <Check size={16} />
                  <span>Saved!</span>
                </>
              ) : isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Save</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
              disabled={isSaving}
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}