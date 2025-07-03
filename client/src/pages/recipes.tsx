import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { User, MessageCircle, BookOpen, ChefHat, Utensils } from "lucide-react";

// Pantry ingredients by category
const pantryIngredients = {
  meat: ['Chicken Breast', 'Ground Beef', 'Turkey', 'Pork Chops', 'Bacon', 'Ground Turkey'],
  fish: ['Salmon', 'Cod', 'Shrimp', 'Tuna', 'Tilapia', 'Crab'],
  vegetables: ['Bell Peppers', 'Tomatoes', 'Cucumber', 'Broccoli', 'Cauliflower', 'Zucchini'],
  rootVegetables: ['Onions', 'Garlic', 'Carrots', 'Potatoes', 'Sweet Potatoes', 'Ginger'],
  leafyVegetables: ['Spinach', 'Lettuce', 'Kale', 'Arugula', 'Basil', 'Cilantro'],
  dairy: ['Milk', 'Eggs', 'Butter', 'Cheese', 'Greek Yogurt', 'Cream'],
  fruits: ['Apples', 'Bananas', 'Lemons', 'Limes', 'Berries', 'Avocado'],
  baking: ['Flour', 'Sugar', 'Baking Powder', 'Vanilla Extract', 'Olive Oil', 'Salt'],
  spices: ['Black Pepper', 'Paprika', 'Cumin', 'Oregano', 'Thyme', 'Garlic Powder']
};

const cuisineTypes = [
  { label: '🇺🇸 American', value: 'american' },
  { label: '🇨🇳 Chinese', value: 'chinese' },
  { label: '🇲🇽 Mexican', value: 'mexican' },
  { label: '🇯🇵 Japanese', value: 'japanese' },
  { label: '🇮🇳 Indian', value: 'indian' }
];

const suggestedDishes = {
  american: [
    { name: 'Classic Burger', calories: 520, protein: 28, image: '🍔', popular: true },
    { name: 'BBQ Ribs', calories: 680, protein: 42, image: '🍖', popular: false },
    { name: 'Mac & Cheese', calories: 420, protein: 18, image: '🧀', popular: true },
    { name: 'Fried Chicken', calories: 480, protein: 32, image: '🍗', popular: false },
    { name: 'Apple Pie', calories: 320, protein: 4, image: '🥧', popular: false }
  ],
  chinese: [
    { name: 'Kung Pao Chicken', calories: 380, protein: 26, image: '🥘' },
    { name: 'Sweet & Sour Pork', calories: 420, protein: 24, image: '🍖' },
    { name: 'Fried Rice', calories: 340, protein: 12, image: '🍚' },
    { name: 'Dumplings', calories: 280, protein: 14, image: '🥟' },
    { name: 'Hot Pot', calories: 450, protein: 28, image: '🍲' }
  ],
  mexican: [
    { name: 'Tacos al Pastor', calories: 320, protein: 18, image: '🌮' },
    { name: 'Chicken Burrito', calories: 480, protein: 26, image: '🌯' },
    { name: 'Guacamole Bowl', calories: 220, protein: 8, image: '🥑' },
    { name: 'Quesadilla', calories: 380, protein: 22, image: '🧀' },
    { name: 'Enchiladas', calories: 420, protein: 24, image: '🌶️' }
  ],
  japanese: [
    { name: 'Salmon Teriyaki', calories: 360, protein: 32, image: '🐟' },
    { name: 'Chicken Katsu', calories: 440, protein: 28, image: '🍗' },
    { name: 'Ramen Bowl', calories: 480, protein: 20, image: '🍜' },
    { name: 'Sushi Roll', calories: 280, protein: 16, image: '🍣' },
    { name: 'Tempura', calories: 320, protein: 14, image: '🍤' }
  ],
  indian: [
    { name: 'Butter Chicken', calories: 420, protein: 28, image: '🍛' },
    { name: 'Biryani', calories: 480, protein: 22, image: '🍚' },
    { name: 'Dal Curry', calories: 280, protein: 16, image: '🍲' },
    { name: 'Tandoori Chicken', calories: 360, protein: 32, image: '🍗' },
    { name: 'Naan Bread', calories: 240, protein: 8, image: '🫓' }
  ]
};

export default function RecipesScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage("nutragenie_user", null);
  
  // Card 2 - Recipe Options Toggle
  const [recipeMode, setRecipeMode] = useState<'pantry' | 'create'>('pantry');
  
  // Card 3 - Pantry Ingredients
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [otherIngredients, setOtherIngredients] = useState("");
  const [recentIngredients] = useState<string[]>(['Chicken Breast', 'Bell Peppers', 'Onions', 'Olive Oil']);
  
  // Smart defaults based on user preferences
  const getSmartDefaults = () => {
    const defaults: string[] = [];
    if (currentUser?.dietaryRestrictions?.includes('vegetarian')) {
      defaults.push('Bell Peppers', 'Onions', 'Spinach', 'Cheese');
    } else {
      defaults.push('Chicken Breast', 'Onions', 'Garlic', 'Olive Oil');
    }
    return defaults;
  };
  
  // Card 3 - Create Recipe
  const [recipeName, setRecipeName] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [selectedDish, setSelectedDish] = useState("");
  
  // Card 4 - Nutritional Values
  const [calories, setCalories] = useState([400]);
  const [protein, setProtein] = useState([25]);
  const [carbs, setCarbs] = useState([45]);
  const [fat, setFat] = useState([15]);

  // Initialize with smart defaults
  useEffect(() => {
    setSelectedIngredients(getSmartDefaults());
  }, []);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const toggleSelectAllCategory = (category: string, ingredients: string[]) => {
    const allSelected = ingredients.every(ing => selectedIngredients.includes(ing));
    if (allSelected) {
      setSelectedIngredients(prev => prev.filter(ing => !ingredients.includes(ing)));
    } else {
      setSelectedIngredients(prev => Array.from(new Set([...prev, ...ingredients])));
    }
  };

  // Ingredient pairing suggestions
  const getCompatibleIngredients = (ingredient: string): string[] => {
    const pairings: { [key: string]: string[] } = {
      'Chicken Breast': ['Garlic', 'Onions', 'Bell Peppers', 'Olive Oil'],
      'Salmon': ['Lemon', 'Garlic', 'Spinach', 'Olive Oil'],
      'Bell Peppers': ['Onions', 'Garlic', 'Olive Oil'],
      'Spinach': ['Garlic', 'Cheese', 'Olive Oil'],
    };
    return pairings[ingredient] || [];
  };

  const getEstimatedTime = () => {
    const baseTime = recipeMode === 'pantry' ? 15 : 20;
    const ingredientBonus = Math.floor(selectedIngredients.length / 3) * 5;
    return baseTime + ingredientBonus;
  };

  const getNutritionalImpact = () => {
    const total = calories[0] + protein[0] + carbs[0] + fat[0];
    if (total < 200) return { color: 'text-blue-600', text: 'Light meal' };
    if (total < 400) return { color: 'text-green-600', text: 'Balanced meal' };
    if (total < 600) return { color: 'text-orange-600', text: 'Hearty meal' };
    return { color: 'text-red-600', text: 'High-calorie meal' };
  };

  const BottomNavigation = () => (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[393px] bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        <button className="flex flex-col items-center gap-1 py-2 px-3 text-brand-green-500">
          <BookOpen className="w-6 h-6" />
          <span className="text-xs font-medium">Recipes</span>
        </button>
        <button 
          onClick={() => setLocation("/cooking")}
          className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400 hover:text-brand-green-500 transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs font-medium">Chef AI</span>
        </button>
        <button 
          onClick={() => setLocation("/profile")}
          className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400 hover:text-brand-green-500 transition-colors"
        >
          <User className="w-6 h-6" />
          <span className="text-xs font-medium">Profile</span>
        </button>
      </div>
    </div>
  );

  if (!currentUser) {
    setLocation("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-warm-neutral-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Explore Recipes</h1>
      </div>

      <div className="p-4 space-y-3">
        {/* Card 1 - Dietary Preferences */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Your Dietary Profile</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-1 text-sm text-gray-600">
              {currentUser?.dietaryRestrictions?.map((restriction: string) => (
                <span key={restriction}>{restriction}</span>
              ))}
              {currentUser?.healthGoals?.map((goal: string) => (
                <span key={goal}>{goal}</span>
              ))}
              {(!currentUser?.dietaryRestrictions?.length && !currentUser?.healthGoals?.length) && (
                <span className="text-gray-500">No dietary preferences set</span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Card 2 - Recipe Options Toggle */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Button
                variant={recipeMode === 'pantry' ? 'default' : 'outline'}
                onClick={() => setRecipeMode('pantry')}
                className="flex-1"
              >
                <ChefHat className="w-4 h-4 mr-2" />
                Pantry Recipes
              </Button>
              <Button
                variant={recipeMode === 'create' ? 'default' : 'outline'}
                onClick={() => setRecipeMode('create')}
                className="flex-1"
              >
                <Utensils className="w-4 h-4 mr-2" />
                Create Recipe
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Card 3 - Cuisine & Serving Selection */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
                <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    {cuisineTypes.map((cuisine) => (
                      <SelectItem key={cuisine.value} value={cuisine.value}>
                        {cuisine.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Servings</label>
                <Select value={servingSize} onValueChange={setServingSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Servings" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size} {size === 1 ? 'person' : 'people'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 4 - Dynamic Content */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              {recipeMode === 'pantry' ? 'Pantry Ingredients' : 'Recipe Details'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {recipeMode === 'pantry' ? (
              <div className="space-y-4">
                {/* Ingredient Count & Quick Actions */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {selectedIngredients.length} ingredients selected • Est. {getEstimatedTime()}min
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedIngredients([])}
                    className="text-xs"
                  >
                    Clear All
                  </Button>
                </div>

                {/* Recent Ingredients */}
                <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-brand-green-500">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-700 text-sm">Recent Ingredients</h4>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedIngredients(prev => Array.from(new Set([...prev, ...recentIngredients])))}
                      className="text-xs"
                    >
                      Add All
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {recentIngredients.map((ingredient) => (
                      <div key={ingredient} className="flex items-center space-x-2">
                        <Checkbox
                          id={`recent-${ingredient}`}
                          checked={selectedIngredients.includes(ingredient)}
                          onCheckedChange={() => toggleIngredient(ingredient)}
                        />
                        <label
                          htmlFor={`recent-${ingredient}`}
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          {ingredient}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ingredient Categories */}
                {Object.entries(pantryIngredients).map(([category, ingredients]) => (
                  <div key={category} className="border-b border-gray-100 pb-3 last:border-b-0">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-700 capitalize">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                        <span className="text-xs text-gray-500 ml-2">
                          ({ingredients.filter(ing => selectedIngredients.includes(ing)).length}/{ingredients.length})
                        </span>
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSelectAllCategory(category, ingredients)}
                        className="text-xs"
                      >
                        {ingredients.every(ing => selectedIngredients.includes(ing)) ? 'Deselect All' : 'Select All'}
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {ingredients.map((ingredient) => {
                        const isSelected = selectedIngredients.includes(ingredient);
                        const isCompatible = selectedIngredients.some(selected => 
                          getCompatibleIngredients(selected).includes(ingredient)
                        );
                        const isDietaryRestricted = 
                          (currentUser?.dietaryRestrictions?.includes('vegetarian') && 
                           ['meat', 'fish'].includes(category)) ||
                          (currentUser?.dietaryRestrictions?.includes('vegan') && 
                           ['meat', 'fish', 'dairy'].includes(category));

                        return (
                          <div key={ingredient} className="flex items-center space-x-2">
                            <Checkbox
                              id={ingredient}
                              checked={isSelected}
                              onCheckedChange={() => toggleIngredient(ingredient)}
                              disabled={isDietaryRestricted}
                            />
                            <label
                              htmlFor={ingredient}
                              className={`text-sm leading-none cursor-pointer ${
                                isSelected ? 'font-semibold text-brand-green-700' :
                                isDietaryRestricted ? 'text-gray-400 line-through' :
                                isCompatible ? 'text-blue-600 font-medium' : 'font-medium'
                              }`}
                            >
                              {ingredient}
                              {isCompatible && !isSelected && <span className="text-blue-500 ml-1">✨</span>}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Custom Ingredients */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Other Ingredients</h4>
                  <Input
                    placeholder="Add custom ingredients..."
                    value={otherIngredients}
                    onChange={(e) => setOtherIngredients(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Name</label>
                  <Input
                    placeholder="Enter recipe name"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                  />
                </div>

                {selectedCuisine && (
                  <>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-3">Suggested Dishes</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {suggestedDishes[selectedCuisine as keyof typeof suggestedDishes]?.map((dish) => (
                          <div
                            key={dish.name}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors relative ${
                              selectedDish === dish.name ? 'border-brand-green-500 bg-brand-green-50' : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setSelectedDish(dish.name)}
                          >
                            {dish.popular && (
                              <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-0.5">
                                Popular
                              </Badge>
                            )}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{dish.image}</span>
                                <span className="font-medium">{dish.name}</span>
                              </div>
                              <div className="text-sm text-gray-500">
                                {dish.calories} cal • {dish.protein}g protein
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-3">Previous Dishes</h4>
                      <div className="text-sm text-gray-500">
                        No previous dishes for this cuisine yet.
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Card 5 - Nutritional Adjustments */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Adjust Nutritional Values</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {/* Nutritional Impact Display */}
            <div className="flex justify-between items-center mb-3">
              <span className={`text-sm font-medium ${getNutritionalImpact().color}`}>
                {getNutritionalImpact().text}
              </span>
              <span className="text-xs text-gray-500">
                Total: {calories[0] + protein[0] + carbs[0] + fat[0]}
              </span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Calories: {calories[0]}
                </label>
                <span className="text-xs text-gray-500">
                  {currentUser?.healthGoals?.includes('lose weight') ? 'Low cal recommended' : 
                   currentUser?.healthGoals?.includes('build muscle') ? 'High cal recommended' : ''}
                </span>
              </div>
              <Slider
                value={calories}
                onValueChange={setCalories}
                max={800}
                min={200}
                step={50}
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Protein: {protein[0]}g
                </label>
                <span className="text-xs text-gray-500">
                  {currentUser?.healthGoals?.includes('build muscle') ? 'High protein recommended' : ''}
                </span>
              </div>
              <Slider
                value={protein}
                onValueChange={setProtein}
                max={50}
                min={10}
                step={5}
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Carbs: {carbs[0]}g
                </label>
                <span className="text-xs text-gray-500">
                  {currentUser?.dietaryRestrictions?.includes('keto') ? 'Keep low for keto' : ''}
                </span>
              </div>
              <Slider
                value={carbs}
                onValueChange={setCarbs}
                max={80}
                min={20}
                step={5}
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Fat: {fat[0]}g
                </label>
                <span className="text-xs text-gray-500">
                  {currentUser?.dietaryRestrictions?.includes('keto') ? 'High fat for keto' : ''}
                </span>
              </div>
              <Slider
                value={fat}
                onValueChange={setFat}
                max={40}
                min={5}
                step={5}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Generate Recipe Button */}
        <div className="space-y-2">
          <Button 
            className="w-full bg-brand-green-500 hover:bg-brand-green-600 text-white py-4 text-lg font-semibold"
            onClick={() => setLocation('/review-recipes')}
          >
            Generate Recipe • {getEstimatedTime()}min
          </Button>
          <div className="flex justify-between text-xs text-gray-500">
            <span>
              {recipeMode === 'pantry' ? `${selectedIngredients.length} ingredients` : selectedDish || 'No dish selected'}
            </span>
            <span>
              {selectedCuisine ? cuisineTypes.find(c => c.value === selectedCuisine)?.label : 'No cuisine'}
            </span>
          </div>
          
          {/* Save Template Option */}
          <Button 
            variant="outline" 
            className="w-full text-sm"
            onClick={() => {
              // Save current selections as template
              localStorage.setItem('nutragenie_recipe_template', JSON.stringify({
                mode: recipeMode,
                ingredients: selectedIngredients,
                cuisine: selectedCuisine,
                servings: servingSize,
                dish: selectedDish,
                nutrition: { calories: calories[0], protein: protein[0], carbs: carbs[0], fat: fat[0] }
              }));
            }}
          >
            Save as Template
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}