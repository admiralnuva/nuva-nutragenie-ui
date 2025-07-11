import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

export default function ExploreRecipesClean() {
  const [, setLocation] = useLocation();
  
  // Card state - completely separate from Recipe Options
  const [cardCollapsed, setCardCollapsed] = useState(false);
  
  // Recipe Options state - completely separate from card
  const [selectedRecipeOption, setSelectedRecipeOption] = useState<string>('');
  const [showChefsChoice, setShowChefsChoice] = useState(false);
  const [showPantryDishes, setShowPantryDishes] = useState(false);
  const [showTakeOut, setShowTakeOut] = useState(false);
  
  const chefsChoiceDishes: Dish[] = [
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

  // Recipe Options handlers - completely isolated
  const handleChefsChoice = () => {
    console.log('🎯 CLEAN: Chef\'s Choice clicked');
    setSelectedRecipeOption('chefs-choice');
    setShowChefsChoice(true);
    setShowPantryDishes(false);
    setShowTakeOut(false);
  };

  const handlePantryDishes = () => {
    console.log('🎯 CLEAN: Pantry Dishes clicked');
    setSelectedRecipeOption('pantry-dishes');
    setShowPantryDishes(true);
    setShowChefsChoice(false);
    setShowTakeOut(false);
  };

  const handleCreateDishes = () => {
    console.log('🎯 CLEAN: Create Dishes clicked');
    setSelectedRecipeOption('create-dishes');
    setShowChefsChoice(false);
    setShowPantryDishes(false);
    setShowTakeOut(false);
    setLocation('/create-dishes');
  };

  const handleTakeOut = () => {
    console.log('🎯 CLEAN: Take-Out clicked');
    setSelectedRecipeOption('take-out');
    setShowTakeOut(true);
    setShowChefsChoice(false);
    setShowPantryDishes(false);
  };

  // Card handlers - completely isolated
  const handleCardToggle = () => {
    console.log(`🔧 CLEAN: Card ${cardCollapsed ? 'EXPAND' : 'COLLAPSE'} clicked`);
    setCardCollapsed(!cardCollapsed);
  };

  const renderDishCard = (dish: Dish) => (
    <div key={dish.id} className="bg-gray-700/50 rounded-lg p-4 space-y-3">
      <div className="relative">
        <img 
          src={dish.image} 
          alt={dish.name}
          className="w-full h-32 object-cover rounded-lg"
        />
      </div>
      <div>
        <h3 className="text-white font-medium text-sm mb-1">{dish.name}</h3>
        <div className="flex justify-between items-center text-xs text-gray-300">
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
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
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
        <div className="w-8"></div>
      </div>

      <div className="flex flex-col space-y-4">
        {/* Card 1: Personalize Diet & Pantry */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-white">Personalize Diet & Pantry</CardTitle>
              <button
                onClick={handleCardToggle}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {cardCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
              </button>
            </div>
          </CardHeader>
          {!cardCollapsed && (
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-300">Diet and pantry preferences content here...</p>
                <div className="flex items-center space-x-3 bg-purple-600/20 border border-purple-600 rounded-lg p-3">
                  <input 
                    type="checkbox" 
                    id="meal-confirm"
                    className="w-6 h-6 rounded border-purple-400"
                  />
                  <label htmlFor="meal-confirm" className="text-sm font-bold text-yellow-300">
                    I confirm my meal preferences
                  </label>
                </div>
                <div className="flex items-center space-x-3 bg-purple-600/20 border border-purple-600 rounded-lg p-3">
                  <input 
                    type="checkbox" 
                    id="pantry-confirm"
                    className="w-6 h-6 rounded border-purple-400"
                  />
                  <label htmlFor="pantry-confirm" className="text-sm font-bold text-yellow-300">
                    I confirm my pantry ingredients
                  </label>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Card 2: Recipe Options */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-white">Recipe Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button 
                className={`h-14 border rounded-md transition-all duration-200 font-medium ${
                  selectedRecipeOption === 'chefs-choice'
                    ? 'bg-purple-600 border-purple-600 text-white' 
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                }`}
                onClick={handleChefsChoice}
              >
                Chef's Choice
              </button>
              <button 
                className={`h-14 border rounded-md transition-all duration-200 font-medium ${
                  selectedRecipeOption === 'pantry-dishes'
                    ? 'bg-purple-600 border-purple-600 text-white' 
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                }`}
                onClick={handlePantryDishes}
              >
                Pantry Dishes
              </button>
              <button 
                className={`h-14 border rounded-md transition-all duration-200 font-medium ${
                  selectedRecipeOption === 'create-dishes'
                    ? 'bg-purple-600 border-purple-600 text-white' 
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                }`}
                onClick={handleCreateDishes}
              >
                Create Dishes
              </button>
              <button 
                className={`h-14 border rounded-md transition-all duration-200 font-medium ${
                  selectedRecipeOption === 'take-out'
                    ? 'bg-purple-600 border-purple-600 text-white' 
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                }`}
                onClick={handleTakeOut}
              >
                Take-Out
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Chef's Choice Dishes */}
        {showChefsChoice && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-white">Chef's Choice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {chefsChoiceDishes.map(renderDishCard)}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pantry Dishes */}
        {showPantryDishes && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-white">Pantry Dishes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {pantryDishes.map(renderDishCard)}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Take-Out */}
        {showTakeOut && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-white">Take-Out Options</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Take-out ordering content here...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}