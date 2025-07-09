import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// Import user avatars
import user1Avatar from '@assets/avatars/user/user1.png';
import user2Avatar from '@assets/avatars/user/user2.png';
import user3Avatar from '@assets/avatars/user/user3.png';
import user4Avatar from '@assets/avatars/user/user4.png';

const userAvatars = {
  user1: user1Avatar,
  user2: user2Avatar,
  user3: user3Avatar,
  user4: user4Avatar,
};

export default function ExploreRecipesScreen() {
  const [, setLocation] = useLocation();
  const [userData] = useLocalStorage('userData', null);
  const [activeTab, setActiveTab] = useState('diet');
  
  // Meal preferences state
  const [mealPreferences, setMealPreferences] = useState({
    servingSize: '',
    cuisine: '',
    mealType: '',
    spiceLevel: '',
    skillLevel: '',
    cookMethod: '',
    prepTime: ''
  });

  // Pantry ingredients state
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [isPantryConfirmed, setIsPantryConfirmed] = useState(false);

  const ingredientOptions = [
    'Ground Beef', 'Chicken Breast', 'Salmon', 'Eggs', 'Rice', 'Pasta',
    'Onions', 'Tomatoes', 'Garlic', 'Bell Peppers', 'Mushrooms', 'Spinach',
    'Cheese', 'Milk', 'Butter', 'Olive Oil', 'Salt', 'Black Pepper'
  ];

  // User avatar source
  const userAvatarSrc = userData?.avatar ? userAvatars[userData.avatar as keyof typeof userAvatars] : user1Avatar;

  // Check completion states
  const isMealComplete = mealPreferences.servingSize && mealPreferences.cuisine && mealPreferences.mealType;
  const isPantryComplete = isPantryConfirmed && selectedIngredients.length >= 5;

  useEffect(() => {
    console.log('Page loaded - Card starts collapsed at top position');
    console.log('Meal completion check:', {
      fieldsCompleted: !!(mealPreferences.servingSize && mealPreferences.cuisine && mealPreferences.mealType),
      confirmed: isPantryConfirmed,
      newMealComplete: isMealComplete
    });
    console.log('Pantry completion check:', {
      selectedIngredients: selectedIngredients.length,
      pantryCompleted: isPantryComplete
    });
  }, [mealPreferences, selectedIngredients.length, isPantryConfirmed, isMealComplete, isPantryComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6">
      <div className="max-w-md mx-auto pt-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => setLocation("/dietary")}
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

        <div className="space-y-4">
          {/* Card 1: Preferences and Pantry Ingredients */}
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-white">Preferences and Pantry Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Tab Navigation */}
              <div className="flex gap-2 mb-4">
                <Button
                  variant={activeTab === 'diet' ? "default" : "outline"}
                  onClick={() => setActiveTab('diet')}
                  className={`flex-1 h-12 ${
                    activeTab === 'diet' 
                      ? 'bg-gray-600 text-white border-gray-500' 
                      : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  Diet
                </Button>
                <Button
                  variant={activeTab === 'meal' ? "default" : "outline"}
                  onClick={() => setActiveTab('meal')}
                  className={`flex-1 h-12 flex items-center justify-center gap-2 ${
                    activeTab === 'meal' 
                      ? 'bg-gray-600 text-white border-gray-500' 
                      : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  Meal
                  {isMealComplete && <span className="text-green-400 text-xs">✓</span>}
                </Button>
                <Button
                  variant={activeTab === 'pantry' ? "default" : "outline"}
                  onClick={() => setActiveTab('pantry')}
                  className={`flex-1 h-12 flex items-center justify-center gap-2 ${
                    activeTab === 'pantry' 
                      ? 'bg-gray-600 text-white border-gray-500' 
                      : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  Pantry
                  {isPantryComplete && <span className="text-green-400 text-xs">✓</span>}
                </Button>
              </div>

              {/* Tab Content */}
              {activeTab === 'diet' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Your Dietary Preferences</h3>
                  {userData && (
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-purple-300 mb-1">Dietary Restrictions</h4>
                        <div className="text-sm text-gray-300">
                          {userData.dietaryRestrictions?.join(', ') || 'None specified'}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-purple-300 mb-1">Health Goals</h4>
                        <div className="text-sm text-gray-300">
                          {userData.healthGoals?.join(', ') || 'None specified'}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-purple-300 mb-1">Nutritional Goals</h4>
                        <div className="text-sm text-gray-300">
                          Cal ({userData.selectedCalorieRange}), Protein ({userData.selectedProteinRange}g), Carbs ({userData.selectedCarbRange}g), Fat ({userData.selectedFatRange}g)
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'meal' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Meal Preferences</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-purple-300 mb-1">Serving Size</label>
                      <Select value={mealPreferences.servingSize} onValueChange={(value) => setMealPreferences({...mealPreferences, servingSize: value})}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 person</SelectItem>
                          <SelectItem value="2">2 people</SelectItem>
                          <SelectItem value="4">4 people</SelectItem>
                          <SelectItem value="6">6+ people</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-purple-300 mb-1">Cuisine</label>
                      <Select value={mealPreferences.cuisine} onValueChange={(value) => setMealPreferences({...mealPreferences, cuisine: value})}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="american">American</SelectItem>
                          <SelectItem value="italian">Italian</SelectItem>
                          <SelectItem value="mexican">Mexican</SelectItem>
                          <SelectItem value="asian">Asian</SelectItem>
                          <SelectItem value="mediterranean">Mediterranean</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-purple-300 mb-1">Meal Type</label>
                      <Select value={mealPreferences.mealType} onValueChange={(value) => setMealPreferences({...mealPreferences, mealType: value})}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="breakfast">Breakfast</SelectItem>
                          <SelectItem value="lunch">Lunch</SelectItem>
                          <SelectItem value="dinner">Dinner</SelectItem>
                          <SelectItem value="snack">Snack</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {isMealComplete && (
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <span>✓ Meal preferences complete</span>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'pantry' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Select Pantry Ingredients</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {ingredientOptions.map((ingredient) => (
                      <button
                        key={ingredient}
                        onClick={() => {
                          if (selectedIngredients.includes(ingredient)) {
                            setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
                          } else {
                            setSelectedIngredients([...selectedIngredients, ingredient]);
                          }
                        }}
                        className={`p-2 text-sm rounded border ${
                          selectedIngredients.includes(ingredient)
                            ? 'bg-purple-600 text-white border-purple-500'
                            : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                        }`}
                      >
                        {ingredient}
                      </button>
                    ))}
                  </div>
                  {selectedIngredients.length >= 5 && (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="pantry-confirm"
                        checked={isPantryConfirmed}
                        onCheckedChange={(checked) => setIsPantryConfirmed(checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor="pantry-confirm" className="text-sm text-gray-300">
                        I confirm these pantry ingredients are complete
                      </label>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Card 2: Recipe Options */}
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-white">Recipe Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button className="h-14 bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600">
                  Pantry Dishes
                </Button>
                <Button className="h-14 bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600">
                  Chef's Choice
                </Button>
                <Button className="h-14 bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600">
                  Create a Dish
                </Button>
                <Button className="h-14 bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600">
                  Take-Out
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Summary */}
          {(isMealComplete && isPantryComplete) && (
            <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-white">
                  Summary for {userData?.nickname || 'User'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-purple-300 mb-2">Meal Preferences</h4>
                    <div className="text-sm text-gray-400 space-y-1">
                      <div>Serving: {mealPreferences.servingSize}, Cuisine: {mealPreferences.cuisine}</div>
                      <div>Meal Type: {mealPreferences.mealType}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="border-t border-gray-600 pt-3"></div>
                    <h4 className="text-sm font-medium text-purple-300 mb-2">Pantry Ingredients</h4>
                    <div className="text-sm text-gray-400">
                      {selectedIngredients.slice(0, 8).join(', ')}
                      {selectedIngredients.length > 8 && ` and ${selectedIngredients.length - 8} more`}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600 text-gray-300">
                      Grocery List
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-gray-700 border-gray-600 text-gray-300"
                    >
                      Edit Preferences
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Bottom spacing to account for bottom navigation */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}