import { ArrowLeftRight, Book, Heart, ChefHat, Plus, Check } from "lucide-react";
import { useState, useEffect } from "react";

interface Dish {
  id: number;
  name: string;
  image: string;
  calories: number;
  protein: string;
  cookTime: string;
  difficulty: string;
}

interface Substitution {
  id: string;
  name: string;
  quantity: string;
  calories: number;
  protein: string;
}

interface DishCardProps {
  dish: Dish;
}

export function DishCard({ dish }: DishCardProps) {
  const [isSubstitutionOpen, setIsSubstitutionOpen] = useState(false);
  const [selectedSubstitution, setSelectedSubstitution] = useState<string | null>(null);
  const [hasSubstitution, setHasSubstitution] = useState(false);

  // Sample substitution data - will come from API
  const substitutions: Substitution[] = [
    {
      id: '1',
      name: 'Turkey Breast',
      quantity: '2 lbs',
      calories: 160,
      protein: '36g'
    },
    {
      id: '2', 
      name: 'Tofu',
      quantity: '2 lbs',
      calories: 140,
      protein: '20g'
    }
  ];

  const handleSubstitutionClick = () => {
    setIsSubstitutionOpen(!isSubstitutionOpen);
  };

  const handleSubstitutionSelect = (substitutionId: string) => {
    setSelectedSubstitution(substitutionId);
    setHasSubstitution(true);
    // Auto-save to API would happen here
    console.log('Saving substitution selection:', { dishId: dish.id, substitutionId });
    
    // Auto-collapse after 2 seconds
    setTimeout(() => {
      setIsSubstitutionOpen(false);
    }, 2000);
  };

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
        
        {/* Action Buttons - Spaced for fat fingers */}
        <div className="flex items-center justify-between w-full">
          <button 
            onClick={handleSubstitutionClick}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
              hasSubstitution 
                ? 'bg-teal-600 hover:bg-teal-700' 
                : 'bg-yellow-600 hover:bg-yellow-700'
            }`}
          >
            <ArrowLeftRight size={20} className="text-white" />
          </button>
          <button className="w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center transition-colors">
            <Book size={20} className="text-white" />
          </button>
          <button className="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-lg flex items-center justify-center transition-colors">
            <Heart size={20} className="text-white" />
          </button>
          <button className="w-12 h-12 bg-orange-600 hover:bg-orange-700 rounded-lg flex items-center justify-center transition-colors">
            <ChefHat size={20} className="text-white" />
          </button>
          <button className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors">
            <Plus size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Substitution Expansion Panel */}
      {isSubstitutionOpen && (
        <div className="border-t border-gray-600 bg-gray-800/90 backdrop-blur-sm p-4 space-y-3 animate-in slide-in-from-top duration-300">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-2">Choose Substitution</h4>
          </div>
          
          {/* Original Ingredient */}
          <div className="bg-gray-700 rounded-lg p-3 border border-blue-500">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <span className="font-medium text-white">Original: {dish.name} Protein</span>
                <div className="text-sm text-gray-300 mt-1">
                  2 lbs • {dish.calories} cal • {dish.protein} protein
                </div>
              </div>
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
            </div>
          </div>

          {/* Substitution Options */}
          {substitutions.map((sub) => (
            <div 
              key={sub.id}
              onClick={() => handleSubstitutionSelect(sub.id)}
              className={`bg-gray-700 rounded-lg p-3 border cursor-pointer transition-all hover:bg-gray-650 ${
                selectedSubstitution === sub.id 
                  ? 'border-purple-500 bg-gray-650' 
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <span className="font-medium text-white">{sub.name}</span>
                  <div className="text-sm text-gray-300 mt-1">
                    {sub.quantity} • {sub.calories} cal • {sub.protein} protein
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedSubstitution === sub.id
                    ? 'bg-purple-500 border-purple-500'
                    : 'border-gray-400 hover:border-purple-400'
                }`}>
                  {selectedSubstitution === sub.id && (
                    <Check size={14} className="text-white" />
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Quick Stats Comparison */}
          {selectedSubstitution && (
            <div className="bg-gray-700/50 rounded-lg p-3 mt-4">
              <div className="text-sm text-gray-300 text-center">
                <span className="text-green-400">✓</span> Substitution will be saved automatically
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}