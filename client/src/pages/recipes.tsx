import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { BackButton } from "@/components/ui/back-button";
import { User, ChefHat, ChevronDown, ChevronUp, Sparkles, Check, ShoppingCart } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Import avatar images
import userAvatar1 from "@assets/User/file_00000000092861f8a6a01284cc629bd0.png";
import userAvatar2 from "@assets/User/file_00000000144c61f58d6ed72273889fd2.png";
import userAvatar3 from "@assets/User/file_000000006df061f8bb3e4e285dff4d1f.png";
import userAvatar4 from "@assets/User/file_00000000da2061f882c7fc433368cf6a.png";

import chefAvatar1 from "@assets/Chef/file_000000008b1061f99729a5ff4af22cb2.png";
import chefAvatar2 from "@assets/Chef/file_00000000aae061fba11590016ae2044d.png";
import chefAvatar3 from "@assets/Chef/file_00000000ba9061fb818d3ba5eec439b8 (1).png";
import chefAvatar4 from "@assets/Chef/file_00000000e49c61f58b106664f70fe407.png";

// Avatar mapping
const userAvatars = {
  'user1': userAvatar1,
  'user2': userAvatar2,
  'user3': userAvatar3,
  'user4': userAvatar4,
};

const chefAvatars = {
  'chef1': chefAvatar1,
  'chef2': chefAvatar2,
  'chef3': chefAvatar3,
  'chef4': chefAvatar4,
};

// Pantry ingredients by category
const pantryIngredients = {
  meat: ['Chicken Breast', 'Ground Beef', 'Turkey', 'Pork Chops', 'Bacon', 'Ground Turkey', 'Lamb', 'Duck', 'Sausage'],
  fish: ['Salmon', 'Cod', 'Shrimp', 'Tuna', 'Tilapia', 'Crab', 'Lobster', 'Mussels', 'Scallops', 'Anchovies'],
  vegetables: ['Bell Peppers', 'Tomatoes', 'Cucumber', 'Broccoli', 'Cauliflower', 'Zucchini', 'Eggplant', 'Mushrooms', 'Asparagus', 'Green Beans'],
  rootVegetables: ['Onions', 'Garlic', 'Carrots', 'Potatoes', 'Sweet Potatoes', 'Ginger', 'Beets', 'Turnips', 'Radishes', 'Shallots'],
  leafyVegetables: ['Spinach', 'Lettuce', 'Kale', 'Arugula', 'Basil', 'Cilantro', 'Parsley', 'Mint', 'Chard', 'Cabbage'],
  dairy: ['Milk', 'Eggs', 'Butter', 'Cheese', 'Greek Yogurt', 'Cream', 'Sour Cream', 'Cottage Cheese', 'Ricotta', 'Mozzarella'],
  fruits: ['Apples', 'Bananas', 'Lemons', 'Limes', 'Berries', 'Avocado', 'Oranges', 'Grapes', 'Pears', 'Mangoes'],
  grains: ['Rice', 'Pasta', 'Bread', 'Quinoa', 'Oats', 'Barley', 'Couscous', 'Bulgur', 'Farro', 'Buckwheat'],
  legumes: ['Black Beans', 'Chickpeas', 'Lentils', 'Kidney Beans', 'Pinto Beans', 'Navy Beans', 'Split Peas', 'Lima Beans', 'Cannellini Beans'],
  spices: ['Salt', 'Pepper', 'Garlic Powder', 'Onion Powder', 'Paprika', 'Cumin', 'Oregano', 'Thyme', 'Rosemary', 'Bay Leaves'],
  oils: ['Olive Oil', 'Vegetable Oil', 'Coconut Oil', 'Butter', 'Sesame Oil', 'Avocado Oil', 'Canola Oil', 'Sunflower Oil']
};

// Cuisine types
const cuisineTypes = [
  { value: 'italian', label: 'Italian' },
  { value: 'mediterranean', label: 'Mediterranean' },
  { value: 'asian', label: 'Asian' },
  { value: 'mexican', label: 'Mexican' },
  { value: 'indian', label: 'Indian' },
  { value: 'american', label: 'American' },
  { value: 'french', label: 'French' },
  { value: 'thai', label: 'Thai' },
  { value: 'middle-eastern', label: 'Middle Eastern' },
  { value: 'japanese', label: 'Japanese' }
];

// Skill levels
const skillLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' }
];

// Time-friendly options
const timeFriendlyOptions = [
  { value: '15-min', label: '15 minutes' },
  { value: '30-min', label: '30 minutes' },
  { value: '45-min', label: '45 minutes' },
  { value: '60-min', label: '1 hour' },
  { value: '90-min', label: '1.5 hours' },
  { value: '2-hours', label: '2+ hours' }
];

// Smart recommended dishes
const smartRecommendedDishes = [
  {
    name: 'Chicken Stir-Fry',
    ingredients: ['Chicken Breast', 'Bell Peppers', 'Broccoli', 'Garlic', 'Soy Sauce', 'Sesame Oil'],
    prepTime: 15,
    cookTime: 10,
    calories: 350,
    protein: 25,
    difficulty: 'Easy',
    badges: ['High Protein', 'Quick'],
    emoji: '🍗'
  },
  {
    name: 'Mediterranean Salmon',
    ingredients: ['Salmon', 'Lemon', 'Olive Oil', 'Garlic', 'Oregano', 'Tomatoes'],
    prepTime: 10,
    cookTime: 15,
    calories: 420,
    protein: 35,
    difficulty: 'Medium',
    badges: ['Heart Healthy', 'Omega-3'],
    emoji: '🐟'
  },
  {
    name: 'Vegetable Curry',
    ingredients: ['Cauliflower', 'Chickpeas', 'Spinach', 'Coconut Oil', 'Cumin', 'Turmeric'],
    prepTime: 20,
    cookTime: 25,
    calories: 280,
    protein: 12,
    difficulty: 'Medium',
    badges: ['Vegetarian', 'Fiber Rich'],
    emoji: '🍛'
  },
  {
    name: 'Quinoa Bowl',
    ingredients: ['Quinoa', 'Avocado', 'Black Beans', 'Tomatoes', 'Lime', 'Cilantro'],
    prepTime: 15,
    cookTime: 20,
    calories: 320,
    protein: 14,
    difficulty: 'Easy',
    badges: ['Complete Protein', 'Vegan'],
    emoji: '🥗'
  }
];

export default function RecipesScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage("nutragenie_user", null) as any;
  const [userData] = useLocalStorage("userData", null);
  
  // Current view state
  const [pantryView, setPantryView] = useState("ingredients");
  
  // Form state
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [servingSize, setServingSize] = useState("4");
  const [skillLevel, setSkillLevel] = useState("");
  const [timeFriendly, setTimeFriendly] = useState("");
  
  // Nutritional goals state
  const [nutritionalGoals, setNutritionalGoals] = useState({
    calories: "1500-1800",
    protein: "70-100g",
    carbs: "100-150g",
    fiber: "10-15g"
  });
  
  // Ingredient selection state
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customIngredient, setCustomIngredient] = useState("");
  
  // Initialize default ingredients based on dietary preferences
  useEffect(() => {
    if (currentUser?.dietaryRestrictions) {
      const defaultIngredients = [];
      if (currentUser.dietaryRestrictions.includes('vegetarian') || currentUser.dietaryRestrictions.includes('vegan')) {
        defaultIngredients.push('Spinach', 'Quinoa', 'Chickpeas', 'Avocado', 'Olive Oil');
      }
      if (currentUser.dietaryRestrictions.includes('keto')) {
        defaultIngredients.push('Avocado', 'Salmon', 'Eggs', 'Olive Oil', 'Spinach');
      }
      if (defaultIngredients.length > 0) {
        setSelectedIngredients(defaultIngredients);
      }
    }
  }, [currentUser]);

  // Get user avatar
  const userAvatarSrc = currentUser?.selectedAvatar ? userAvatars[currentUser.selectedAvatar] : userAvatar1;

  // Generate recipe function
  const generateRecipe = () => {
    setLocation("/review-recipes");
  };

  // Add custom ingredient
  const addCustomIngredient = () => {
    if (customIngredient.trim() && !selectedIngredients.includes(customIngredient.trim())) {
      setSelectedIngredients(prev => [...prev, customIngredient.trim()]);
      setCustomIngredient("");
    }
  };

  // Get matching ingredients for a dish
  const getMatchingIngredients = (dish: any) => {
    return dish.ingredients.filter((ingredient: string) => 
      selectedIngredients.some(selected => 
        selected.toLowerCase().includes(ingredient.toLowerCase()) || 
        ingredient.toLowerCase().includes(selected.toLowerCase())
      )
    );
  };

  // Get dishes sorted by ingredient match
  const getSortedDishes = () => {
    return smartRecommendedDishes.sort((a, b) => {
      const matchA = getMatchingIngredients(a).length;
      const matchB = getMatchingIngredients(b).length;
      return matchB - matchA;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-indigo-100">
        <div className="flex items-center justify-between p-4 max-w-2xl mx-auto">
          <BackButton to="/home" />
          <h1 className="text-xl font-bold text-gray-900">NutraGenie</h1>
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <ChefHat className="w-4 h-4 text-indigo-600" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto" style={{ paddingTop: '80px' }}>
        {/* Card 1: Dietary Preferences */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="py-3 pb-2">
            <CardTitle className="text-lg">Dietary Preferences</CardTitle>
            <p className="text-xs text-gray-600 mt-1">Select ingredients based on your dietary needs</p>
          </CardHeader>
          <CardContent className="space-y-3 pt-1 pb-3">
            {Object.entries(pantryIngredients).map(([category, items]) => (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700 capitalize flex items-center gap-2">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                    <Badge variant="secondary" className="text-xs">
                      {selectedIngredients.filter(ingredient => items.includes(ingredient)).length}/{items.length}
                    </Badge>
                  </h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const categoryIngredients = items;
                      const allSelected = categoryIngredients.every(ingredient => selectedIngredients.includes(ingredient));
                      if (allSelected) {
                        setSelectedIngredients(prev => prev.filter(ingredient => !categoryIngredients.includes(ingredient)));
                      } else {
                        setSelectedIngredients(prev => [...new Set([...prev, ...categoryIngredients])]);
                      }
                    }}
                    className="text-xs h-6"
                  >
                    {items.every(ingredient => selectedIngredients.includes(ingredient)) ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {items.slice(0, 6).map(ingredient => (
                    <label key={ingredient} className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        checked={selectedIngredients.includes(ingredient)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedIngredients(prev => [...prev, ingredient]);
                          } else {
                            setSelectedIngredients(prev => prev.filter(item => item !== ingredient));
                          }
                        }}
                        className="h-3 w-3"
                      />
                      <span className="text-xs text-gray-700">{ingredient}</span>
                    </label>
                  ))}
                </div>
                {items.length > 6 && (
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-xs h-6 p-0 text-indigo-600">
                        <ChevronDown className="h-3 w-3 mr-1" />
                        Show {items.length - 6} more
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2">
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {items.slice(6).map(ingredient => (
                          <label key={ingredient} className="flex items-center space-x-2 cursor-pointer">
                            <Checkbox
                              checked={selectedIngredients.includes(ingredient)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedIngredients(prev => [...prev, ingredient]);
                                } else {
                                  setSelectedIngredients(prev => prev.filter(item => item !== ingredient));
                                }
                              }}
                              className="h-3 w-3"
                            />
                            <span className="text-xs text-gray-700">{ingredient}</span>
                          </label>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Card 2: Nutritional Adjustments */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="py-3 pb-2">
            <CardTitle className="text-lg">Nutritional Adjustments</CardTitle>
            <p className="text-xs text-gray-600 mt-1">Fine-tune your nutritional targets</p>
          </CardHeader>
          <CardContent className="space-y-3 pt-1 pb-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Calories</label>
                <Select value={nutritionalGoals.calories} onValueChange={(value) => setNutritionalGoals(prev => ({...prev, calories: value}))}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1200-1500">1200-1500 cal</SelectItem>
                    <SelectItem value="1500-1800">1500-1800 cal</SelectItem>
                    <SelectItem value="1800-2200">1800-2200 cal</SelectItem>
                    <SelectItem value="2200+">2200+ cal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Protein</label>
                <Select value={nutritionalGoals.protein} onValueChange={(value) => setNutritionalGoals(prev => ({...prev, protein: value}))}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50-70g">50-70g</SelectItem>
                    <SelectItem value="70-100g">70-100g</SelectItem>
                    <SelectItem value="100-130g">100-130g</SelectItem>
                    <SelectItem value="130g+">130g+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Carbs</label>
                <Select value={nutritionalGoals.carbs} onValueChange={(value) => setNutritionalGoals(prev => ({...prev, carbs: value}))}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50-100g">50-100g</SelectItem>
                    <SelectItem value="100-150g">100-150g</SelectItem>
                    <SelectItem value="150-200g">150-200g</SelectItem>
                    <SelectItem value="200g+">200g+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Fiber</label>
                <Select value={nutritionalGoals.fiber} onValueChange={(value) => setNutritionalGoals(prev => ({...prev, fiber: value}))}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5-10g">5-10g</SelectItem>
                    <SelectItem value="10-15g">10-15g</SelectItem>
                    <SelectItem value="15-20g">15-20g</SelectItem>
                    <SelectItem value="20-25g">20-25g</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-3 p-2 bg-indigo-50 rounded-md">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-indigo-600" />
                <span className="text-xs text-indigo-700 font-medium">Nutritional goals aligned with your health profile</span>
              </div>
              <p className="text-xs text-indigo-600 mt-1">
                {currentUser?.healthGoals?.includes('lose-weight') ? 'Lower calorie targets support weight loss goals' :
                 currentUser?.healthGoals?.includes('build-muscle') ? 'Higher protein targets support muscle building' :
                 'Balanced nutrition targets for overall wellness'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Pantry Ingredients */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="py-3 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Pantry Ingredients</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPantryView(pantryView === 'ingredients' ? 'dishes' : 'ingredients')}
                  className="text-xs"
                >
                  {pantryView === 'ingredients' ? 'View Dishes' : 'View Ingredients'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-1 pb-3">
            {pantryView === 'ingredients' ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Cuisine</label>
                    <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select cuisine" />
                      </SelectTrigger>
                      <SelectContent>
                        {cuisineTypes.map(cuisine => (
                          <SelectItem key={cuisine.value} value={cuisine.value}>
                            {cuisine.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Servings</label>
                    <Select value={servingSize} onValueChange={setServingSize}>
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 10}, (_, i) => i + 1).map(num => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'serving' : 'servings'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Skill Level</label>
                    <Select value={skillLevel} onValueChange={setSkillLevel}>
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {skillLevels.map(level => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Time Available</label>
                    <Select value={timeFriendly} onValueChange={setTimeFriendly}>
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeFriendlyOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Add custom ingredient..."
                    value={customIngredient}
                    onChange={(e) => setCustomIngredient(e.target.value)}
                    className="flex-1 h-8"
                    onKeyPress={(e) => e.key === 'Enter' && addCustomIngredient()}
                  />
                  <Button
                    onClick={addCustomIngredient}
                    size="sm"
                    className="h-8"
                  >
                    Add
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-indigo-500" />
                  <h4 className="text-sm font-medium text-gray-700">Smart Recommendations</h4>
                  <Badge variant="secondary" className="text-xs">
                    {getSortedDishes().length} dishes
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  {getSortedDishes().map((dish, index) => {
                    const matchingIngredients = getMatchingIngredients(dish);
                    const matchPercentage = Math.round((matchingIngredients.length / dish.ingredients.length) * 100);
                    
                    return (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg">{dish.emoji}</span>
                              <h5 className="font-medium text-gray-900">{dish.name}</h5>
                              <Badge variant="outline" className="text-xs">
                                {matchPercentage}% match
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-600 mb-1">
                              <span>{dish.prepTime + dish.cookTime} min</span>
                              <span>{dish.calories} cal</span>
                              <span>{dish.protein}g protein</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {dish.badges.map((badge, badgeIndex) => (
                                <Badge key={badgeIndex} variant="secondary" className="text-xs">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Card 4: Recipe Generation */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="py-3 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">Recipe Generation</CardTitle>
                <p className="text-xs text-gray-600 mt-1">Generate personalized recipes based on your selections</p>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-indigo-600" />
                <Badge variant="secondary" className="text-xs">
                  {selectedIngredients.length} ingredients
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-1 pb-3">
            <div className="bg-indigo-50 p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <Check className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-700">Ready to generate recipes</span>
              </div>
              <p className="text-xs text-indigo-600">
                {selectedIngredients.length > 0 ? 
                  `Using ${selectedIngredients.length} selected ingredients and your dietary preferences` :
                  'Select ingredients above to get personalized recipe suggestions'
                }
              </p>
            </div>
            
            <Button
              onClick={generateRecipe}
              className="w-full bg-blue-500 text-white border-blue-500 hover:bg-blue-600 active:bg-purple-600 active:border-purple-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300"
              disabled={selectedIngredients.length === 0}
            >
              Generate Recipes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}