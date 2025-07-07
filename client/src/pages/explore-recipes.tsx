import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ScreenHeader } from "@/components/ui/screen-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Clock, Users, ChefHat, Flame, Target, Utensils, ShoppingCart, Sparkles, Plus, List } from "lucide-react";

// Import user avatar images
import userAvatar1 from "@/assets/avatars/user/user1.png";
import userAvatar2 from "@/assets/avatars/user/user2.png";
import userAvatar3 from "@/assets/avatars/user/user3.png";
import userAvatar4 from "@/assets/avatars/user/user4.png";

// Import chef avatar images
import chefAvatar1 from "@/assets/avatars/chef/chef1.png";
import chefAvatar2 from "@/assets/avatars/chef/chef2.png";
import chefAvatar3 from "@/assets/avatars/chef/chef3.png";
import chefAvatar4 from "@/assets/avatars/chef/chef4.png";

const userAvatars = {
  'user1': userAvatar1,
  'user2': userAvatar2,
  'user3': userAvatar3,
  'user4': userAvatar4
};

const chefAvatars = {
  'chef1': chefAvatar1,
  'chef2': chefAvatar2,
  'chef3': chefAvatar3,
  'chef4': chefAvatar4
};

export default function ExploreRecipesScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage<any>("nutragenie_user", null);
  const [tempUser] = useLocalStorage<any>("nutragenie_temp_user", null);
  
  // Get user data - check both current and temp user
  const userData = currentUser || tempUser;

  // Get user and chef avatars
  const userAvatarSrc = userData?.avatar ? userAvatars[userData.avatar as keyof typeof userAvatars] : userAvatar1;
  const chefAvatarSrc = userData?.chef ? chefAvatars[userData.chef as keyof typeof chefAvatars] : chefAvatar1;
  
  // Get dynamic avatar for Card 3 based on active selection
  const getDynamicAvatar = () => {
    if (activeCard === 'pantry-dishes' || activeCard === 'chefs-choice') {
      return chefAvatarSrc;
    }
    return userAvatarSrc;
  };

  // Meal preferences state
  const [mealPreferences, setMealPreferences] = useState({
    cuisine: "",
    mealType: "",
    spiceLevel: "",
    skillLevel: "",
    cookingMethod: "",
    prepTime: "",
    servingSize: ""
  });

  // Pantry management state
  const [activeCard, setActiveCard] = useState<string>('pantry-ingredients');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(['chicken-breast', 'salmon', 'onions', 'garlic', 'olive-oil']);
  const [customIngredients, setCustomIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState<string>('');

  // Ingredient categories
  const ingredientCategories = {
    'Meat': ['chicken-breast', 'ground-beef', 'pork-chops', 'turkey', 'lamb'],
    'Fish': ['salmon', 'tuna', 'cod', 'shrimp', 'crab'],
    'Vegetables': ['onions', 'garlic', 'tomatoes', 'carrots', 'broccoli', 'spinach', 'bell-peppers'],
    'Grains': ['rice', 'pasta', 'quinoa', 'bread', 'oats'],
    'Dairy': ['milk', 'cheese', 'yogurt', 'butter', 'eggs'],
    'Pantry': ['olive-oil', 'salt', 'pepper', 'flour', 'sugar', 'vinegar']
  };

  const handleIngredientToggle = (ingredient: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(item => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const addCustomIngredient = () => {
    if (newIngredient.trim() && !customIngredients.includes(newIngredient.trim()) && !selectedIngredients.includes(newIngredient.trim())) {
      const ingredient = newIngredient.trim();
      setCustomIngredients(prev => [...prev, ingredient]);
      setSelectedIngredients(prev => [...prev, ingredient]);
      setNewIngredient('');
    }
  };

  // Format dietary preferences data into text rows (max 6 rows)
  const formatDietaryData = () => {
    const rows = [];
    
    // Helper function to capitalize first letter of each word
    const capitalizeWords = (str: string) => {
      return str.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    };

    // Row 1: Dietary Restrictions (comma-separated)
    if (userData?.dietaryRestrictions && userData.dietaryRestrictions.length > 0) {
      const formattedRestrictions = userData.dietaryRestrictions.map(restriction => 
        capitalizeWords(restriction)
      );
      rows.push({ value: formattedRestrictions.join(", ") });
    }
    
    // Row 2: Health Conditions (comma-separated)
    if (userData?.healthGoals && userData.healthGoals.length > 0) {
      const healthConditions = userData.healthGoals.filter((goal: string) => 
        ['diabetes', 'cardiovascular', 'kidney', 'blood-pressure', 'cancer', 'bone-health'].includes(goal)
      );
      if (healthConditions.length > 0) {
        const formattedConditions = healthConditions.map(condition => 
          capitalizeWords(condition)
        );
        rows.push({ value: formattedConditions.join(", ") });
      }
      
      // Row 3: Fitness Goals (comma-separated)
      const fitnessGoals = userData.healthGoals.filter((goal: string) => 
        ['build-muscle', 'lose-weight', 'endurance', 'wellness'].includes(goal)
      );
      if (fitnessGoals.length > 0) {
        const formattedGoals = fitnessGoals.map(goal => 
          capitalizeWords(goal)
        );
        rows.push({ value: formattedGoals.join(", ") });
      }
    }
    
    // Row 4: Allergies with label
    if (userData?.allergies && userData.allergies.trim()) {
      rows.push({ label: "Allergies", value: userData.allergies });
    }
    
    return rows.slice(0, 6); // Ensure max 6 rows
  };

  const dietaryRows = formatDietaryData();
  
  // Check if user has any dietary data
  const hasDietaryData = userData?.dietaryRestrictions || userData?.healthGoals || userData?.allergies;

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-md mx-auto pt-2">
        <ScreenHeader 
          title="NutraGenie"
          subtitle="Explore Recipe Options"
          backTo="/dietary"
        />

        <div className="space-y-4">
          {/* Card 1: Dietary Preferences Summary */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-purple-600">Your dietary preferences:</CardTitle>
                <div className="flex flex-col items-center">
                  <div className="rounded-lg overflow-hidden bg-white shadow-sm" style={{width: '80px', height: '80px'}}>
                    <img 
                      src={userAvatarSrc} 
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5 font-medium">
                    {userData?.nickname || "User"}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-1">
              {!userData ? (
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm mb-3">Please create your account first to view dietary preferences</p>
                  <button 
                    onClick={() => setLocation("/nuva-signup")}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700"
                  >
                    Create Account
                  </button>
                </div>
              ) : dietaryRows.length > 0 ? (
                <div className="space-y-0">
                  {dietaryRows.map((row, index) => (
                    <div key={index} className="flex items-center text-sm py-1">
                      {row.label ? (
                        <>
                          <span className="font-medium text-gray-700">{row.label}:</span>
                          <span className="text-gray-600 ml-2">{row.value}</span>
                        </>
                      ) : (
                        <span className="text-gray-600">{row.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-3">
                  <p className="text-gray-500 text-sm mb-3">Welcome {userData?.nickname}! Complete your dietary profile to see personalized recipes.</p>
                  <button 
                    onClick={() => setLocation("/dietary")}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700"
                  >
                    Complete Dietary Setup
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Card 2: Meal Preferences */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-purple-600">Meal Preferences</CardTitle>
                <div className="flex items-center">
                  <div className="rounded-lg overflow-hidden bg-white shadow-sm" style={{width: '80px', height: '80px'}}>
                    <img 
                      src={userAvatarSrc} 
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Serving Size */}
                <div className="space-y-2">
                  <Label htmlFor="servingSize" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Users size={16} className="text-purple-600" />
                    Serving Size
                  </Label>
                  <Select value={mealPreferences.servingSize} onValueChange={(value) => setMealPreferences(prev => ({...prev, servingSize: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select serving size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-person">1 person</SelectItem>
                      <SelectItem value="2-people">2 people</SelectItem>
                      <SelectItem value="3-4-people">3-4 people</SelectItem>
                      <SelectItem value="5-6-people">5-6 people</SelectItem>
                      <SelectItem value="7-8-people">7-8 people</SelectItem>
                      <SelectItem value="large-group">Large group (9+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Cuisine */}
                <div className="space-y-2">
                  <Label htmlFor="cuisine" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <ChefHat size={16} className="text-purple-600" />
                    Cuisine
                  </Label>
                  <Select value={mealPreferences.cuisine} onValueChange={(value) => setMealPreferences(prev => ({...prev, cuisine: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cuisine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="italian">Italian</SelectItem>
                      <SelectItem value="mexican">Mexican</SelectItem>
                      <SelectItem value="asian">Asian</SelectItem>
                      <SelectItem value="american">American</SelectItem>
                      <SelectItem value="mediterranean">Mediterranean</SelectItem>
                      <SelectItem value="indian">Indian</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="thai">Thai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Meal Type */}
                <div className="space-y-2">
                  <Label htmlFor="mealType" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Utensils size={16} className="text-purple-600" />
                    Meal Type
                  </Label>
                  <Select value={mealPreferences.mealType} onValueChange={(value) => setMealPreferences(prev => ({...prev, mealType: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                      <SelectItem value="snack">Snack</SelectItem>
                      <SelectItem value="dessert">Dessert</SelectItem>
                      <SelectItem value="appetizer">Appetizer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Spice Level */}
                <div className="space-y-2">
                  <Label htmlFor="spiceLevel" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Flame size={16} className="text-purple-600" />
                    Spice Level
                  </Label>
                  <Select value={mealPreferences.spiceLevel} onValueChange={(value) => setMealPreferences(prev => ({...prev, spiceLevel: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select spice level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mild">Mild</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hot">Hot</SelectItem>
                      <SelectItem value="extra-hot">Extra Hot</SelectItem>
                      <SelectItem value="no-spice">No Spice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Skill Level */}
                <div className="space-y-2">
                  <Label htmlFor="skillLevel" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Target size={16} className="text-purple-600" />
                    Skill Level
                  </Label>
                  <Select value={mealPreferences.skillLevel} onValueChange={(value) => setMealPreferences(prev => ({...prev, skillLevel: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select skill level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Cooking Method */}
                <div className="space-y-2">
                  <Label htmlFor="cookingMethod" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <ChefHat size={16} className="text-purple-600" />
                    Cooking Method
                  </Label>
                  <Select value={mealPreferences.cookingMethod} onValueChange={(value) => setMealPreferences(prev => ({...prev, cookingMethod: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cooking method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baking">Baking</SelectItem>
                      <SelectItem value="grilling">Grilling</SelectItem>
                      <SelectItem value="frying">Frying</SelectItem>
                      <SelectItem value="steaming">Steaming</SelectItem>
                      <SelectItem value="roasting">Roasting</SelectItem>
                      <SelectItem value="slow-cooking">Slow Cooking</SelectItem>
                      <SelectItem value="stir-frying">Stir Frying</SelectItem>
                      <SelectItem value="no-cook">No Cook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Prep Time */}
                <div className="space-y-2">
                  <Label htmlFor="prepTime" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Clock size={16} className="text-purple-600" />
                    Prep Time
                  </Label>
                  <Select value={mealPreferences.prepTime} onValueChange={(value) => setMealPreferences(prev => ({...prev, prepTime: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select prep time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15-min">15 minutes</SelectItem>
                      <SelectItem value="30-min">30 minutes</SelectItem>
                      <SelectItem value="45-min">45 minutes</SelectItem>
                      <SelectItem value="1-hour">1 hour</SelectItem>
                      <SelectItem value="1.5-hour">1.5 hours</SelectItem>
                      <SelectItem value="2-hour">2+ hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Card 3 - Recipe Options */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-purple-600">Recipe Options</CardTitle>
                <div className="flex items-center">
                  <div className="rounded-lg overflow-hidden bg-white shadow-sm" style={{width: '80px', height: '80px'}}>
                    <img 
                      src={getDynamicAvatar()} 
                      alt={activeCard === 'pantry-dishes' || activeCard === 'chefs-choice' ? "Chef Avatar" : "User Avatar"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  className={`h-16 flex flex-col items-center justify-center space-y-1 border-purple-200 hover:border-purple-300 ${
                    activeCard === 'pantry-ingredients' 
                      ? 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700' 
                      : 'hover:bg-purple-50'
                  }`}
                  onClick={() => setActiveCard('pantry-ingredients')}
                >
                  <ShoppingCart size={18} className={activeCard === 'pantry-ingredients' ? 'text-white' : 'text-purple-600'} />
                  <span className={`text-sm font-medium ${activeCard === 'pantry-ingredients' ? 'text-white' : 'text-gray-700'} text-center leading-tight`}>Pantry Ingredients</span>
                </Button>

                <Button 
                  variant="outline" 
                  className={`h-16 flex flex-col items-center justify-center space-y-1 border-purple-200 hover:border-purple-300 ${
                    activeCard === 'create-dish' 
                      ? 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700' 
                      : 'hover:bg-purple-50'
                  }`}
                  onClick={() => setActiveCard('create-dish')}
                >
                  <Plus size={18} className={activeCard === 'create-dish' ? 'text-white' : 'text-purple-600'} />
                  <span className={`text-sm font-medium ${activeCard === 'create-dish' ? 'text-white' : 'text-gray-700'} text-center leading-tight`}>Create Dish</span>
                </Button>

                <Button 
                  variant="outline" 
                  className={`h-16 flex flex-col items-center justify-center space-y-1 border-purple-200 hover:border-purple-300 ${
                    activeCard === 'pantry-dishes' 
                      ? 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700' 
                      : 'hover:bg-purple-50'
                  }`}
                  onClick={() => setActiveCard('pantry-dishes')}
                >
                  <Utensils size={18} className={activeCard === 'pantry-dishes' ? 'text-white' : 'text-purple-600'} />
                  <span className={`text-sm font-medium ${activeCard === 'pantry-dishes' ? 'text-white' : 'text-gray-700'} text-center leading-tight`}>Pantry Dishes</span>
                </Button>

                <Button 
                  variant="outline" 
                  className={`h-16 flex flex-col items-center justify-center space-y-1 border-purple-200 hover:border-purple-300 ${
                    activeCard === 'chefs-choice' 
                      ? 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700' 
                      : 'hover:bg-purple-50'
                  }`}
                  onClick={() => setActiveCard('chefs-choice')}
                >
                  <Sparkles size={18} className={activeCard === 'chefs-choice' ? 'text-white' : 'text-purple-600'} />
                  <span className={`text-sm font-medium ${activeCard === 'chefs-choice' ? 'text-white' : 'text-gray-700'} text-center leading-tight`}>Chef's Choice</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pantry Dishes Large Card */}
          {activeCard === 'pantry-dishes' && (
            <>
              <Card className="bg-white border border-gray-200 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base text-purple-600">Dishes that can be cooked from pantry ingredients</CardTitle>
                    <div className="flex items-center">
                      <div className="rounded-lg overflow-hidden bg-white shadow-sm" style={{width: '80px', height: '80px'}}>
                        <img 
                          src={chefAvatarSrc} 
                          alt="Chef Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Pasta Aglio e Olio", time: "15 min", calories: "340", difficulty: "Easy" },
                      { name: "Fried Rice", time: "20 min", calories: "280", difficulty: "Easy" },
                      { name: "Scrambled Eggs", time: "5 min", calories: "190", difficulty: "Beginner" },
                      { name: "Garlic Bread", time: "10 min", calories: "160", difficulty: "Easy" },
                      { name: "Simple Soup", time: "25 min", calories: "120", difficulty: "Easy" },
                      { name: "Toast & Jam", time: "3 min", calories: "140", difficulty: "Beginner" }
                    ].map((dish, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <h4 className="font-medium text-sm text-gray-900 mb-1">{dish.name}</h4>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Clock size={12} />
                            <span>{dish.time}</span>
                          </div>
                          <span>{dish.calories} cal</span>
                        </div>
                        <div className="mt-1">
                          <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded">{dish.difficulty}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Chef's Choice Large Card */}
          {activeCard === 'chefs-choice' && (
            <>
              <Card className="bg-white border border-gray-200 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base text-purple-600">Chef's Special Recommendations</CardTitle>
                    <div className="flex items-center">
                      <div className="rounded-lg overflow-hidden bg-white shadow-sm" style={{width: '80px', height: '80px'}}>
                        <img 
                          src={chefAvatarSrc} 
                          alt="Chef Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Mediterranean Bowl", time: "30 min", calories: "420", difficulty: "Medium" },
                      { name: "Thai Curry", time: "35 min", calories: "380", difficulty: "Medium" },
                      { name: "Quinoa Salad", time: "20 min", calories: "310", difficulty: "Easy" },
                      { name: "Stuffed Peppers", time: "45 min", calories: "350", difficulty: "Medium" },
                      { name: "Herb Crusted Fish", time: "25 min", calories: "290", difficulty: "Medium" },
                      { name: "Power Smoothie Bowl", time: "10 min", calories: "240", difficulty: "Easy" }
                    ].map((dish, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <h4 className="font-medium text-sm text-gray-900 mb-1">{dish.name}</h4>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Clock size={12} />
                            <span>{dish.time}</span>
                          </div>
                          <span>{dish.calories} cal</span>
                        </div>
                        <div className="mt-1">
                          <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded">{dish.difficulty}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Create Dish Large Card */}
          {activeCard === 'create-dish' && (
            <>
              <Card className="bg-white border border-gray-200 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base text-purple-600">Create Your Custom Dish</CardTitle>
                    <div className="flex items-center">
                      <div className="rounded-lg overflow-hidden bg-white shadow-sm" style={{width: '80px', height: '80px'}}>
                        <img 
                          src={userAvatarSrc} 
                          alt="User Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dish Name</label>
                      <Input placeholder="Enter your dish name..." className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Main Ingredients</label>
                      <Input placeholder="e.g., chicken, rice, vegetables..." className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cooking Style</label>
                      <select className="w-full p-2 border border-gray-300 rounded-md">
                        <option>Grilled</option>
                        <option>Baked</option>
                        <option>Stir-fried</option>
                        <option>Steamed</option>
                        <option>Raw/Salad</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Prep Time</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option>Under 15 min</option>
                          <option>15-30 min</option>
                          <option>30-60 min</option>
                          <option>Over 1 hour</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option>Beginner</option>
                          <option>Easy</option>
                          <option>Medium</option>
                          <option>Advanced</option>
                        </select>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      Create Recipe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Pantry Ingredients Large Card */}
          {activeCard === 'pantry-ingredients' && (
            <>
              <Card className="bg-white border border-gray-200 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base text-purple-600">Select Pantry Ingredients</CardTitle>
                    <div className="flex items-center">
                      <div className="rounded-lg overflow-hidden bg-white shadow-sm" style={{width: '80px', height: '80px'}}>
                        <img 
                          src={userAvatarSrc} 
                          alt="User Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 max-h-96 overflow-y-auto pb-4">
                  {Object.entries(ingredientCategories).map(([category, ingredients]) => (
                    <div key={category} className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-md shadow-lg shadow-purple-200/50 border border-purple-100">
                      <Label htmlFor={`${category}-select`} className="text-sm font-medium text-gray-800 flex items-center gap-2 min-w-[100px]">
                        <ChefHat size={16} className="text-purple-600" />
                        {category}
                      </Label>
                      <Select>
                        <SelectTrigger className="flex-1 shadow-sm border-gray-300">
                          <SelectValue placeholder={`Select ${category.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {ingredients.map((ingredient) => (
                            <div 
                              key={ingredient} 
                              className="flex items-center space-x-3 p-3 hover:bg-purple-50 cursor-pointer"
                              onClick={() => handleIngredientToggle(ingredient)}
                            >
                              <Checkbox
                                id={ingredient}
                                checked={selectedIngredients.includes(ingredient)}
                                onCheckedChange={() => handleIngredientToggle(ingredient)}
                                className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 w-5 h-5"
                              />
                              <Label 
                                htmlFor={ingredient}
                                className="text-sm text-gray-700 capitalize cursor-pointer flex-1"
                              >
                                {ingredient.replace('-', ' ')}
                              </Label>
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}

                  {/* Custom Ingredients Section */}
                  <div className="space-y-2 border-t border-gray-200 pt-3 mt-4">
                    <h3 className="font-medium text-gray-800 text-sm">Add Custom Ingredients</h3>
                    <div className="flex space-x-2">
                      <Input
                        value={newIngredient}
                        onChange={(e) => setNewIngredient(e.target.value)}
                        placeholder="Enter ingredient name"
                        className="flex-1 shadow-sm"
                        onKeyPress={(e) => e.key === 'Enter' && addCustomIngredient()}
                      />
                      <Button 
                        onClick={addCustomIngredient}
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 shadow-sm"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                    {customIngredients.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {customIngredients.map((ingredient) => (
                          <div 
                            key={ingredient} 
                            className="flex items-center space-x-3 p-2 hover:bg-purple-50 rounded cursor-pointer"
                            onClick={() => handleIngredientToggle(ingredient)}
                          >
                            <Checkbox
                              id={`custom-${ingredient}`}
                              checked={selectedIngredients.includes(ingredient)}
                              onCheckedChange={() => handleIngredientToggle(ingredient)}
                              className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 w-5 h-5"
                            />
                            <Label 
                              htmlFor={`custom-${ingredient}`}
                              className="text-sm text-gray-700 capitalize cursor-pointer"
                            >
                              {ingredient}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Ingredients in Your Pantry Card */}
              <Card className="bg-white border border-gray-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base text-purple-600">
                      Ingredients in your pantry
                    </CardTitle>
                    <div className="flex items-center">
                      <div className="rounded-lg overflow-hidden bg-white shadow-sm" style={{width: '80px', height: '80px'}}>
                        <img 
                          src={userAvatarSrc} 
                          alt="User Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-purple-600 leading-relaxed">
                    {selectedIngredients.length > 0 ? (
                      selectedIngredients.map((ingredient, index) => (
                        <span key={ingredient} className="capitalize">
                          {ingredient.replace('-', ' ')}
                          {index < selectedIngredients.length - 1 ? ', ' : ''}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">No ingredients selected</span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button 
                      variant="outline"
                      className="border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      Grocery List
                    </Button>
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Weekly Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

        </div>
      </div>
    </div>
  );
}