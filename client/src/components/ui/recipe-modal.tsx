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
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm p-6 border-b border-gray-700/50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <ChefHat size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent truncate flex-1">
                {recipe.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 bg-gray-800/80 hover:bg-gray-700/80 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg border border-gray-600/50"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Recipe Info */}
          <div className="p-6 border-b border-gray-700/50">
            <div className="flex gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-xl backdrop-blur-sm">
                <Clock size={18} className="text-blue-400" />
                <span className="text-white font-medium">{recipe.cookTime}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-xl backdrop-blur-sm">
                <Users size={18} className="text-green-400" />
                <span className="text-white font-medium">{recipe.servings} servings</span>
              </div>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="p-6 border-b border-gray-700/50">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Utensils size={18} className="text-white" />
              </div>
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Ingredients
              </span>
            </h3>
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 backdrop-blur-sm hover:bg-green-500/15 transition-all duration-300 animate-in slide-in-from-left">
              <div className="space-y-1">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-3 py-1" style={{animationDelay: `${index * 100}ms`}}>
                    <div className="w-2 h-2 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex-shrink-0 shadow-lg"></div>
                    <span className="text-white">
                      <span className="font-bold text-green-300">{ingredient.quantity}</span> 
                      <span className="ml-2 font-medium text-emerald-200">{ingredient.name}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cooking Steps Section */}
          <div className="p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <ChefHat size={18} className="text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Cooking Steps
              </span>
            </h3>
            <div className="space-y-5">
              {recipe.steps.map((step, index) => (
                <div key={index} className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5 backdrop-blur-sm hover:bg-blue-500/15 transition-all duration-300 animate-in slide-in-from-right" style={{animationDelay: `${index * 150}ms`}}>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <p className="text-white leading-relaxed pt-2 text-lg">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Footer Action Bar */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm p-6 border-t border-gray-700/50 flex-shrink-0">
          <div className="flex gap-4 justify-center">
            <button
              onClick={onClose}
              className="px-8 py-4 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-2xl transition-all duration-300 font-semibold border border-gray-600/50 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
              disabled={isSaving}
            >
              Close
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || isSaved}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl transition-all duration-500 font-semibold shadow-xl ${
                isSaved 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white scale-110 shadow-green-500/30' 
                  : isSaving
                  ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white cursor-not-allowed scale-105 shadow-blue-500/30'
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white hover:scale-110 hover:shadow-purple-500/40'
              } border border-white/20 backdrop-blur-sm`}
            >
              {isSaved ? (
                <>
                  <Check size={20} className="animate-in zoom-in duration-300" />
                  <span>Saved to Profile!</span>
                </>
              ) : isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>Save Recipe</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}