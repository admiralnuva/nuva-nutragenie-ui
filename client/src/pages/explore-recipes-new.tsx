import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

interface Dish {
  id: number;
  name: string;
  calories: number;
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  image: string;
  protein?: string;
}

export default function ExploreRecipesNew() {
  const [, setLocation] = useLocation();
  
  // Personalize Diet & Pantry Card State
  const [isDietCardCollapsed, setIsDietCardCollapsed] = useState(false);
  
  // Recipe Options State
  const [activeRecipeOption, setActiveRecipeOption] = useState<'chef' | 'pantry' | 'create' | 'takeout' | null>(null);
  
  // Sample dish data
  const chefDishes: Dish[] = [
    { id: 1, name: 'Mediterranean Bowl', calories: 420, cookTime: '25 min', difficulty: 'Easy', image: '/api/placeholder/200/150', protein: '28g' },
    { id: 2, name: 'Herb Crusted Fish', calories: 380, cookTime: '30 min', difficulty: 'Medium', image: '/api/placeholder/200/150', protein: '35g' },
    { id: 3, name: 'Power Smoothie Bowl', calories: 320, cookTime: '10 min', difficulty: 'Easy', image: '/api/placeholder/200/150', protein: '22g' },
    { id: 4, name: 'Quinoa Salad', calories: 290, cookTime: '15 min', difficulty: 'Easy', image: '/api/placeholder/200/150', protein: '18g' },
    { id: 5, name: 'Stuffed Peppers', calories: 350, cookTime: '45 min', difficulty: 'Medium', image: '/api/placeholder/200/150', protein: '24g' },
    { id: 6, name: 'Vegetable Soup', calories: 180, cookTime: '20 min', difficulty: 'Easy', image: '/api/placeholder/200/150', protein: '8g' }
  ];

  const pantryDishes: Dish[] = [
    { id: 101, name: 'Fried Rice', calories: 320, cookTime: '15 min', difficulty: 'Easy', image: '/api/placeholder/200/150' },
    { id: 102, name: 'Garlic Bread', calories: 180, cookTime: '10 min', difficulty: 'Easy', image: '/api/placeholder/200/150' },
    { id: 103, name: 'Pasta Primavera', calories: 280, cookTime: '20 min', difficulty: 'Medium', image: '/api/placeholder/200/150' },
    { id: 104, name: 'Scrambled Eggs', calories: 220, cookTime: '5 min', difficulty: 'Easy', image: '/api/placeholder/200/150' },
    { id: 105, name: 'Vegetable Soup', calories: 150, cookTime: '25 min', difficulty: 'Easy', image: '/api/placeholder/200/150' },
    { id: 106, name: 'Toast & Jam', calories: 160, cookTime: '3 min', difficulty: 'Easy', image: '/api/placeholder/200/150' }
  ];

  // Event handlers for diet card
  const handleDietCardToggle = () => {
    console.log('🔧 NEW: Diet card toggle clicked');
    setIsDietCardCollapsed(!isDietCardCollapsed);
  };

  // Event handlers for recipe options
  const handleRecipeOptionClick = (option: 'chef' | 'pantry' | 'create' | 'takeout') => {
    console.log(`🎯 NEW: ${option} option clicked`);
    setActiveRecipeOption(option);
  };

  // Render dish card
  const renderDish = (dish: Dish) => (
    <div key={dish.id} className="bg-gray-700 rounded-lg p-3 space-y-2">
      <img 
        src={dish.image} 
        alt={dish.name}
        className="w-full h-24 object-cover rounded-md"
      />
      <h3 className="text-white text-sm font-medium">{dish.name}</h3>
      <div className="flex justify-between text-xs text-gray-300">
        <span>{dish.calories} cal</span>
        <span>{dish.cookTime}</span>
      </div>
      <div className="flex justify-end">
        <span className={`text-xs px-2 py-1 rounded ${
          dish.difficulty === 'Easy' ? 'bg-green-600' :
          dish.difficulty === 'Medium' ? 'bg-yellow-600' : 'bg-red-600'
        } text-white`}>
          {dish.difficulty}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-6">
        <button 
          onClick={() => setLocation('/nuva-signup')}
          className="text-white hover:text-purple-300 transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
          <p className="text-lg font-semibold text-purple-300 mt-1">Explore Recipe Options</p>
        </div>
        <div className="w-16"></div>
      </div>

      <div className="px-4 space-y-4">
        {/* Personalize Diet & Pantry Card */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Personalize Diet & Pantry</h2>
              <button
                onClick={handleDietCardToggle}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                {isDietCardCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
              </button>
            </div>
          </div>
          
          {!isDietCardCollapsed && (
            <div className="p-4 space-y-4">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-yellow-300">Diet Preferences</h3>
                <p className="text-sm text-gray-300">Configure your dietary preferences here...</p>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-yellow-300">Pantry Ingredients</h3>
                <p className="text-sm text-gray-300">Select your available ingredients...</p>
              </div>
              
              <div className="flex items-center space-x-3 bg-purple-600/20 border border-purple-600 rounded-lg p-3">
                <input 
                  type="checkbox" 
                  id="meal-confirm"
                  className="w-5 h-5 text-purple-600 border-purple-400 rounded focus:ring-purple-500"
                />
                <label htmlFor="meal-confirm" className="text-sm font-bold text-yellow-300">
                  I confirm my meal preferences
                </label>
              </div>
              
              <div className="flex items-center space-x-3 bg-purple-600/20 border border-purple-600 rounded-lg p-3">
                <input 
                  type="checkbox" 
                  id="pantry-confirm"
                  className="w-5 h-5 text-purple-600 border-purple-400 rounded focus:ring-purple-500"
                />
                <label htmlFor="pantry-confirm" className="text-sm font-bold text-yellow-300">
                  I confirm my pantry ingredients
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Recipe Options Card */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Recipe Options</h2>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => handleRecipeOptionClick('chef')}
                className={`h-14 rounded-lg border font-medium transition-all duration-200 ${
                  activeRecipeOption === 'chef'
                    ? 'bg-purple-600 border-purple-600 text-white' 
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                }`}
              >
                Chef's Choice
              </button>
              
              <button 
                onClick={() => handleRecipeOptionClick('pantry')}
                className={`h-14 rounded-lg border font-medium transition-all duration-200 ${
                  activeRecipeOption === 'pantry'
                    ? 'bg-purple-600 border-purple-600 text-white' 
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                }`}
              >
                Pantry Dishes
              </button>
              
              <button 
                onClick={() => handleRecipeOptionClick('create')}
                className={`h-14 rounded-lg border font-medium transition-all duration-200 ${
                  activeRecipeOption === 'create'
                    ? 'bg-purple-600 border-purple-600 text-white' 
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                }`}
              >
                Create Dishes
              </button>
              
              <button 
                onClick={() => handleRecipeOptionClick('takeout')}
                className={`h-14 rounded-lg border font-medium transition-all duration-200 ${
                  activeRecipeOption === 'takeout'
                    ? 'bg-purple-600 border-purple-600 text-white' 
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                }`}
              >
                Take-Out
              </button>
            </div>
          </div>
        </div>

        {/* Chef's Choice Dishes */}
        {activeRecipeOption === 'chef' && (
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Chef's Choice</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                {chefDishes.map(renderDish)}
              </div>
            </div>
          </div>
        )}

        {/* Pantry Dishes */}
        {activeRecipeOption === 'pantry' && (
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Pantry Dishes</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                {pantryDishes.map(renderDish)}
              </div>
            </div>
          </div>
        )}

        {/* Create Dishes */}
        {activeRecipeOption === 'create' && (
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Create Dishes</h2>
            </div>
            <div className="p-4">
              <p className="text-gray-300 mb-4">Create your custom dishes here...</p>
              <button
                onClick={() => setLocation('/create-dishes')}
                className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                Go to Create Dishes
              </button>
            </div>
          </div>
        )}

        {/* Take-Out */}
        {activeRecipeOption === 'takeout' && (
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Take-Out Options</h2>
            </div>
            <div className="p-4">
              <p className="text-gray-300">Order take-out meals here...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}