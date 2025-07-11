import { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function TakeOutScreen() {
  const [, setLocation] = useLocation();
  
  // Take-out form state
  const [takeOutDishName, setTakeOutDishName] = useState('Chicken Curry');
  const [takeOutServingSize, setTakeOutServingSize] = useState('2 people');
  const [takeOutCuisine, setTakeOutCuisine] = useState('Indian');
  const [takeOutMealType, setTakeOutMealType] = useState('Dinner');
  const [takeOutCookMethod, setTakeOutCookMethod] = useState('');
  const [takeOutDate, setTakeOutDate] = useState('07/11/2025');
  const [takeOutCardCollapsed, setTakeOutCardCollapsed] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<'soups' | 'salads' | 'main' | 'desserts'>('soups');

  // Take-out form handlers
  const handleGenerateVariations = () => {
    if (!takeOutDishName || !takeOutServingSize || !takeOutCuisine || !takeOutMealType || !takeOutCookMethod || !takeOutDate) {
      alert('Please fill in all fields');
      return;
    }
    setTakeOutCardCollapsed(true);
    // Show course selection after form collapse
    setTimeout(() => {
      setTakeOutCardCollapsed(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setLocation('/explore-recipes')}
            className="text-purple-600 hover:text-purple-400 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-purple-600">NutraGenie</h1>
          <div className="w-6"></div>
        </div>
        <p className="text-lg font-semibold text-gray-300 mt-1 text-center">Take-Out Order</p>
      </header>

      <div className="p-4 space-y-4">
        {/* Take-Out Card */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-yellow-300 drop-shadow-lg">Tell us what you're craving</CardTitle>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTakeOutCardCollapsed(!takeOutCardCollapsed)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronDown 
                    size={20} 
                    className={`transform transition-transform ${takeOutCardCollapsed ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            </div>
          </CardHeader>
          
          {!takeOutCardCollapsed && (
            <CardContent className="space-y-4">
              {/* Dish Name */}
              <div>
                <label className="text-sm font-bold text-yellow-300 drop-shadow-lg mb-1 block">Dish Name</label>
                <Input
                  value={takeOutDishName}
                  onChange={(e) => setTakeOutDishName(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Enter dish name"
                />
              </div>
              
              {/* Row 1: Serving Size & Cuisine */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-yellow-300 drop-shadow-lg mb-1 block">Serving Size</label>
                  <Select value={takeOutServingSize} onValueChange={setTakeOutServingSize}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="2 people" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 people">1 people</SelectItem>
                      <SelectItem value="2 people">2 people</SelectItem>
                      <SelectItem value="4 people">4 people</SelectItem>
                      <SelectItem value="6+ people">6+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-bold text-yellow-300 drop-shadow-lg mb-1 block">Cuisine</label>
                  <Select value={takeOutCuisine} onValueChange={setTakeOutCuisine}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Indian" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Indian">Indian</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                      <SelectItem value="Italian">Italian</SelectItem>
                      <SelectItem value="Mexican">Mexican</SelectItem>
                      <SelectItem value="Thai">Thai</SelectItem>
                      <SelectItem value="American">American</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Row 2: Meal Type & Cook Method */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-yellow-300 drop-shadow-lg mb-1 block">Meal Type</label>
                  <Select value={takeOutMealType} onValueChange={setTakeOutMealType}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Dinner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Breakfast">Breakfast</SelectItem>
                      <SelectItem value="Lunch">Lunch</SelectItem>
                      <SelectItem value="Dinner">Dinner</SelectItem>
                      <SelectItem value="Snack">Snack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-bold text-yellow-300 drop-shadow-lg mb-1 block">Cook Method</label>
                  <Select value={takeOutCookMethod} onValueChange={setTakeOutCookMethod}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grilled">Grilled</SelectItem>
                      <SelectItem value="Fried">Fried</SelectItem>
                      <SelectItem value="Baked">Baked</SelectItem>
                      <SelectItem value="Steamed">Steamed</SelectItem>
                      <SelectItem value="Roasted">Roasted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Delivery Date */}
              <div>
                <label className="text-sm font-bold text-yellow-300 drop-shadow-lg mb-1 block">Delivery Date</label>
                <Input
                  value={takeOutDate}
                  onChange={(e) => setTakeOutDate(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="MM/DD/YYYY"
                />
              </div>

              {/* Course Selection Buttons */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-yellow-300 drop-shadow-lg block">Course Selection</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedCourse('soups')}
                    className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                      selectedCourse === 'soups'
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-orange-500/50'
                    }`}
                  >
                    Soups
                  </button>
                  <button
                    onClick={() => setSelectedCourse('salads')}
                    className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                      selectedCourse === 'salads'
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-orange-500/50'
                    }`}
                  >
                    Salads
                  </button>
                  <button
                    onClick={() => setSelectedCourse('main')}
                    className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                      selectedCourse === 'main'
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-orange-500/50'
                    }`}
                  >
                    Main Entree
                  </button>
                  <button
                    onClick={() => setSelectedCourse('desserts')}
                    className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                      selectedCourse === 'desserts'
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-orange-500/50'
                    }`}
                  >
                    Desserts
                  </button>
                </div>
              </div>

              {/* Generate Variations Button */}
              <Button 
                onClick={handleGenerateVariations}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
              >
                Generate Variations
              </Button>
            </CardContent>
          )}
        </Card>

        {/* Bottom spacing */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}