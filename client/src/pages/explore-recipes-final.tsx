import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

// Types
interface Dish {
  id: number;
  name: string;
  calories: number;
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  image: string;
  protein?: string;
}

// Component: Independent Personalize Card
function PersonalizeCard() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    console.log(`💡 PERSONALIZE: ${isCollapsed ? 'Expanding' : 'Collapsing'} card`);
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Personalize Diet & Pantry</h2>
          <button
            onClick={handleToggle}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="p-4 space-y-4">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-yellow-300 drop-shadow-lg">Diet Preferences</h3>
            <p className="text-sm text-gray-300">Vegetarian, Vegan, Keto preferences...</p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-yellow-300 drop-shadow-lg">Pantry Ingredients</h3>
            <p className="text-sm text-gray-300">Available ingredients in your pantry...</p>
          </div>
          
          <div className="flex items-center space-x-3 bg-purple-600/20 border border-purple-600 rounded-lg p-3">
            <input 
              type="checkbox" 
              id="meal-confirm"
              className="w-5 h-5 text-purple-600 border-purple-400 rounded"
            />
            <label htmlFor="meal-confirm" className="text-sm font-bold text-yellow-300 drop-shadow-lg">
              I confirm my meal preferences
            </label>
          </div>
          
          <div className="flex items-center space-x-3 bg-purple-600/20 border border-purple-600 rounded-lg p-3">
            <input 
              type="checkbox" 
              id="pantry-confirm"
              className="w-5 h-5 text-purple-600 border-purple-400 rounded"
            />
            <label htmlFor="pantry-confirm" className="text-sm font-bold text-yellow-300 drop-shadow-lg">
              I confirm my pantry ingredients
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

// Component: Independent Recipe Options Card
function RecipeOptionsCard({ onOptionSelect }: { onOptionSelect: (option: string) => void }) {
  const [, setLocation] = useLocation();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionClick = (option: string) => {
    console.log(`🎯 RECIPE: ${option} selected`);
    setSelectedOption(option);
    
    if (option === 'create') {
      setLocation('/create-dishes');
    } else {
      onOptionSelect(option);
    }
  };

  const getButtonClass = (option: string) => {
    return `h-14 rounded-lg border font-medium transition-all duration-200 ${
      selectedOption === option
        ? 'bg-purple-600 border-purple-600 text-white' 
        : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
    }`;
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Recipe Options</h2>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => handleOptionClick('chef')}
            className={getButtonClass('chef')}
          >
            Chef's Choice
          </button>
          
          <button 
            onClick={() => handleOptionClick('pantry')}
            className={getButtonClass('pantry')}
          >
            Pantry Dishes
          </button>
          
          <button 
            onClick={() => handleOptionClick('create')}
            className={getButtonClass('create')}
          >
            Create Dishes
          </button>
          
          <button 
            onClick={() => handleOptionClick('takeout')}
            className={getButtonClass('takeout')}
          >
            Take-Out
          </button>
        </div>
      </div>
    </div>
  );
}

// Component: Independent Dish Display Card
function DishDisplayCard({ title, dishes }: { title: string; dishes: Dish[] }) {
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
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {dishes.map(renderDish)}
        </div>
      </div>
    </div>
  );
}

// Main Component: Independent Architecture
export default function ExploreRecipesFinal() {
  const [, setLocation] = useLocation();
  const [activeDisplay, setActiveDisplay] = useState<string>('');

  // Sample data
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

  const handleRecipeOptionSelect = (option: string) => {
    console.log(`📋 MAIN: Displaying ${option} dishes`);
    setActiveDisplay(option);
  };

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

      {/* Independent Cards */}
      <div className="px-4 space-y-4">
        {/* Card 1: Personalize Diet & Pantry - Completely Independent */}
        <PersonalizeCard />

        {/* Card 2: Recipe Options - Completely Independent */}
        <RecipeOptionsCard onOptionSelect={handleRecipeOptionSelect} />

        {/* Conditional Display Cards - Independent */}
        {activeDisplay === 'chef' && (
          <DishDisplayCard title="Chef's Choice" dishes={chefDishes} />
        )}

        {activeDisplay === 'pantry' && (
          <DishDisplayCard title="Pantry Dishes" dishes={pantryDishes} />
        )}

        {activeDisplay === 'takeout' && (
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Take-Out Options</h2>
            </div>
            <div className="p-4">
              <p className="text-gray-300">Order take-out meals for your convenience...</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center space-x-3 bg-purple-600/20 border border-purple-600 rounded-lg p-3">
                  <span className="text-sm font-bold text-yellow-300 drop-shadow-lg">Serving Size:</span>
                  <select className="bg-gray-700 border border-gray-600 text-white rounded px-2 py-1 text-sm">
                    <option>2 people</option>
                    <option>4 people</option>
                    <option>6 people</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}