import { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, ChevronDown, ChevronUp, Repeat, BookOpen, Save, CookingPot, Plus, ArrowLeftRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

export default function CreateDishesScreen() {
  const [, setLocation] = useLocation();
  const [dishName, setDishName] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [mealType, setMealType] = useState('');
  const [cookMethod, setCookMethod] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showInputForm, setShowInputForm] = useState(true);
  const [activeTab, setActiveTab] = useState<'variations' | 'favorites'>('variations');
  
  // Take-Out form state
  const [showTakeOut, setShowTakeOut] = useState(false);
  const [takeOutServingSize, setTakeOutServingSize] = useState('');
  const [takeOutCuisine, setTakeOutCuisine] = useState('');
  const [takeOutMealType, setTakeOutMealType] = useState('');
  const [takeOutDeliveryDate, setTakeOutDeliveryDate] = useState('');
  const [isTakeOutFormCollapsed, setIsTakeOutFormCollapsed] = useState(false);
  const [showTakeOutMenu, setShowTakeOutMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'soup' | 'salad' | 'entree' | 'dessert'>('soup');

  // Take-Out menu dish data
  const takeOutDishes = {
    soup: [
      { id: 201, name: 'Tomato Basil Soup', calories: 280, cookTime: '25 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 202, name: 'Chicken Noodle Soup', calories: 320, cookTime: '35 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 203, name: 'Minestrone Soup', calories: 260, cookTime: '40 min', difficulty: 'Medium' as const, image: '/api/placeholder/200/150' },
      { id: 204, name: 'Butternut Squash Soup', calories: 240, cookTime: '30 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 205, name: 'French Onion Soup', calories: 350, cookTime: '45 min', difficulty: 'Medium' as const, image: '/api/placeholder/200/150' },
      { id: 206, name: 'Mushroom Bisque', calories: 290, cookTime: '35 min', difficulty: 'Medium' as const, image: '/api/placeholder/200/150' }
    ],
    salad: [
      { id: 301, name: 'Caesar Salad', calories: 340, cookTime: '15 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 302, name: 'Greek Salad', calories: 280, cookTime: '10 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 303, name: 'Garden Salad', calories: 180, cookTime: '10 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 304, name: 'Cobb Salad', calories: 420, cookTime: '20 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 305, name: 'Quinoa Power Salad', calories: 360, cookTime: '15 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 306, name: 'Spinach Berry Salad', calories: 240, cookTime: '12 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' }
    ],
    entree: [
      { id: 401, name: 'Grilled Chicken Breast', calories: 520, cookTime: '25 min', difficulty: 'Medium' as const, image: '/api/placeholder/200/150' },
      { id: 402, name: 'Pan-Seared Salmon', calories: 480, cookTime: '20 min', difficulty: 'Medium' as const, image: '/api/placeholder/200/150' },
      { id: 403, name: 'Beef Stir Fry', calories: 560, cookTime: '30 min', difficulty: 'Medium' as const, image: '/api/placeholder/200/150' },
      { id: 404, name: 'Tofu Pad Thai', calories: 420, cookTime: '25 min', difficulty: 'Medium' as const, image: '/api/placeholder/200/150' },
      { id: 405, name: 'Pork Tenderloin', calories: 540, cookTime: '35 min', difficulty: 'Hard' as const, image: '/api/placeholder/200/150' },
      { id: 406, name: 'Lamb Chops', calories: 580, cookTime: '30 min', difficulty: 'Hard' as const, image: '/api/placeholder/200/150' }
    ],
    dessert: [
      { id: 501, name: 'Chocolate Cheesecake', calories: 450, cookTime: '15 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 502, name: 'Vanilla Ice Cream', calories: 280, cookTime: '5 min', difficulty: 'Easy' as const, image: '/api/placeholder/200/150' },
      { id: 503, name: 'Tiramisu', calories: 380, cookTime: '20 min', difficulty: 'Medium' as const, image: '/api/placeholder/200/150' },
      { id: 504, name: 'Apple Pie', calories: 420, cookTime: '45 min', difficulty: 'Hard' as const, image: '/api/placeholder/200/150' },
      { id: 505, name: 'Chocolate Lava Cake', calories: 520, cookTime: '25 min', difficulty: 'Medium' as const, image: '/api/placeholder/200/150' },
      { id: 506, name: 'Fruit Tart', calories: 340, cookTime: '30 min', difficulty: 'Medium' as const, image: '/api/placeholder/200/150' }
    ]
  };

  // Sample dish variations data
  const dishVariations = [
    {
      id: 1,
      name: "Classic Chicken Curry",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
      calories: 420,
      protein: "32g",
      cookTime: "45 min",
      difficulty: "Medium"
    },
    {
      id: 2,
      name: "Coconut Chicken Curry",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
      calories: 385,
      protein: "28g",
      cookTime: "40 min",
      difficulty: "Easy"
    },
    {
      id: 3,
      name: "Spicy Chicken Curry",
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop",
      calories: 410,
      protein: "30g",
      cookTime: "50 min",
      difficulty: "Medium"
    },
    {
      id: 4,
      name: "Thai Chicken Curry",
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
      calories: 395,
      protein: "29g",
      cookTime: "35 min",
      difficulty: "Easy"
    },
    {
      id: 5,
      name: "Butter Chicken Curry",
      image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=400&h=300&fit=crop",
      calories: 450,
      protein: "34g",
      cookTime: "55 min",
      difficulty: "Hard"
    },
    {
      id: 6,
      name: "Green Chicken Curry",
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop",
      calories: 375,
      protein: "27g",
      cookTime: "42 min",
      difficulty: "Medium"
    }
  ];

  // Sample favorite dishes data
  const favoriteDishes = [
    {
      id: 1,
      name: "Mediterranean Quinoa Bowl",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
      calories: 350,
      protein: "18g",
      cookTime: "25 min",
      difficulty: "Easy"
    },
    {
      id: 2,
      name: "Grilled Salmon Teriyaki",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop",
      calories: 420,
      protein: "35g",
      cookTime: "20 min",
      difficulty: "Medium"
    },
    {
      id: 3,
      name: "Beef Stir Fry Noodles",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      calories: 480,
      protein: "28g",
      cookTime: "30 min",
      difficulty: "Easy"
    },
    {
      id: 4,
      name: "Mushroom Risotto",
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
      calories: 390,
      protein: "12g",
      cookTime: "40 min",
      difficulty: "Hard"
    },
    {
      id: 5,
      name: "Chicken Caesar Salad",
      image: "https://images.unsplash.com/photo-1512852939750-1305098529bf?w=400&h=300&fit=crop",
      calories: 320,
      protein: "25g",
      cookTime: "15 min",
      difficulty: "Easy"
    },
    {
      id: 6,
      name: "Vegetable Pasta Primavera",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
      calories: 360,
      protein: "14g",
      cookTime: "25 min",
      difficulty: "Easy"
    }
  ];

  // Substitution ingredient data for Create Dishes
  const createDishSubstitutions = {
    1: { // Classic Chicken Curry
      mainIngredients: [
        { name: "Chicken Breast", calories: 165, protein: 31, substitutions: ["Turkey Breast", "Tofu", "Tempeh"] },
        { name: "Coconut Milk", calories: 93, protein: 1, substitutions: ["Greek Yogurt", "Cashew Cream", "Almond Milk"] },
        { name: "Curry Powder", calories: 6, protein: 0.3, substitutions: ["Garam Masala", "Turmeric", "Paprika"] }
      ]
    },
    2: { // Coconut Chicken Curry
      mainIngredients: [
        { name: "Chicken Thighs", calories: 179, protein: 25, substitutions: ["Chicken Breast", "Fish", "Jackfruit"] },
        { name: "Coconut Cream", calories: 133, protein: 1.4, substitutions: ["Heavy Cream", "Cashew Cream", "Soy Cream"] },
        { name: "Thai Chilies", calories: 3, protein: 0.1, substitutions: ["Jalapeños", "Bell Peppers", "Paprika"] }
      ]
    },
    3: { // Spicy Chicken Curry
      mainIngredients: [
        { name: "Chicken Breast", calories: 165, protein: 31, substitutions: ["Beef", "Pork", "Seitan"] },
        { name: "Hot Peppers", calories: 4, protein: 0.2, substitutions: ["Mild Peppers", "Hot Sauce", "Chili Powder"] },
        { name: "Tomatoes", calories: 18, protein: 0.9, substitutions: ["Bell Peppers", "Zucchini", "Eggplant"] }
      ]
    }
    // Add more as needed for all 6 dishes
  };

  // Substitution state management
  const [substitutionOpenDish, setSubstitutionOpenDish] = useState<number | null>(null);
  const [selectedSubstitutions, setSelectedSubstitutions] = useState<{[dishId: number]: {[ingredientIndex: number]: string}}>({});
  const [substitutionConfirmed, setSubstitutionConfirmed] = useState<{[dishId: number]: boolean}>({});

  // Helper function to calculate updated nutrition values
  const calculateUpdatedNutrition = (dishId: number, originalCalories: number, originalProtein: string) => {
    const dishSubs = createDishSubstitutions[dishId as keyof typeof createDishSubstitutions];
    if (!dishSubs) return { calories: originalCalories, protein: originalProtein };

    const selectedSubs = selectedSubstitutions[dishId] || {};
    let totalCalories = originalCalories;
    let totalProtein = parseFloat(originalProtein.replace('g', ''));

    // Calculate nutrition difference for each substitution
    dishSubs.mainIngredients.forEach((ingredient, index) => {
      const selectedSub = selectedSubs[index];
      if (selectedSub && selectedSub !== ingredient.name) {
        // Calculate actual nutrition differences based on ingredient data
        const originalIngredient = ingredient;
        const substitutionIndex = ingredient.substitutions.indexOf(selectedSub);
        
        if (substitutionIndex !== -1) {
          // Apply specific nutrition changes based on substitution type
          if (selectedSub.toLowerCase().includes('tofu') || selectedSub.toLowerCase().includes('tempeh')) {
            // Plant proteins: lower calories, similar protein
            totalCalories -= Math.round(originalIngredient.calories * 0.2);
            totalProtein -= Math.round(originalIngredient.protein * 0.1);
          } else if (selectedSub.toLowerCase().includes('greek yogurt') || selectedSub.toLowerCase().includes('cashew')) {
            // Dairy alternatives: moderate calorie reduction
            totalCalories -= Math.round(originalIngredient.calories * 0.3);
            totalProtein += Math.round(originalIngredient.protein * 0.1);
          } else if (selectedSub.toLowerCase().includes('turkey') || selectedSub.toLowerCase().includes('fish')) {
            // Lean meats: slight calorie reduction, protein boost
            totalCalories -= Math.round(originalIngredient.calories * 0.1);
            totalProtein += Math.round(originalIngredient.protein * 0.15);
          } else {
            // Default: moderate reduction for healthier options
            totalCalories -= Math.round(originalIngredient.calories * 0.15);
            totalProtein -= Math.round(originalIngredient.protein * 0.05);
          }
        }
      }
    });

    // Ensure minimum values
    totalCalories = Math.max(totalCalories, Math.round(originalCalories * 0.7));
    totalProtein = Math.max(totalProtein, Math.round(parseFloat(originalProtein.replace('g', '')) * 0.8));

    return { calories: totalCalories, protein: `${totalProtein}g` };
  };

  // Handle substitution selection
  const handleSubstitutionSelect = (dishId: number, ingredientIndex: number, substitution: string) => {
    setSelectedSubstitutions(prev => ({
      ...prev,
      [dishId]: {
        ...prev[dishId],
        [ingredientIndex]: substitution
      }
    }));
  };

  // Handle substitution confirmation
  const handleSubstitutionConfirm = (dishId: number) => {
    setSubstitutionConfirmed(prev => ({ ...prev, [dishId]: true }));
    // Auto-collapse substitution card after 1 second
    setTimeout(() => {
      setSubstitutionOpenDish(null);
    }, 1000);
  };

  // Cook confirmation state
  const [cookConfirmationOpen, setCookConfirmationOpen] = useState<number | null>(null);
  const [cookConfirmed, setCookConfirmed] = useState<{[dishId: number]: boolean}>({});

  // Handle cook button click
  const handleCookClick = (dishId: number, dishName: string) => {
    setCookConfirmationOpen(dishId);
  };

  // Handle cook confirmation
  const handleCookConfirm = (dishId: number) => {
    setCookConfirmed(prev => ({ ...prev, [dishId]: true }));
    // Navigate to cook screen after confirmation
    setTimeout(() => {
      setLocation('/voice-cooking');
    }, 500);
  };

  // Handle take-out form submission
  const handleDesignTakeOutMenu = () => {
    if (takeOutServingSize && takeOutCuisine && takeOutMealType && takeOutDeliveryDate) {
      // Collapse the form and show menu
      setIsTakeOutFormCollapsed(true);
      setShowTakeOutMenu(true);
      // Take-out menu designed successfully
    }
  };

  // Check if take-out form is complete
  const isTakeOutFormComplete = takeOutServingSize && takeOutCuisine && takeOutMealType && takeOutDeliveryDate;

  const handleGenerateVariations = () => {
    if (dishName && servingSize && cuisine && mealType && cookMethod) {
      setShowResults(true);
      setShowInputForm(false); // Hide the input form when results are shown
      setActiveTab('variations');
    }
  };

  const isFormComplete = dishName && servingSize && cuisine && mealType && cookMethod;

  const currentDishes = activeTab === 'variations' ? dishVariations : favoriteDishes;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setLocation('/explore-recipe-options')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
            <p className="text-lg font-semibold text-purple-300 mt-1">Create Your Meal</p>
          </div>
          <div className="w-6"></div> {/* Spacer to balance the back button */}
        </div>
      </div>

      <div className="max-w-lg mx-auto p-3 space-y-4">

        {/* Take-Out Form Card */}
        {showTakeOut && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-yellow-300 font-bold text-xl drop-shadow-lg">
                  Order take out for group or weekly meals
                </CardTitle>
                {isTakeOutFormCollapsed && (
                  <button
                    onClick={() => setIsTakeOutFormCollapsed(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronDown size={20} />
                  </button>
                )}
                {!isTakeOutFormCollapsed && (
                  <button
                    onClick={() => setShowTakeOut(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronUp size={20} />
                  </button>
                )}
              </div>
            </CardHeader>
            
            {!isTakeOutFormCollapsed && (
              <CardContent className="space-y-4">
                {/* Serving Size and Cuisine Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-yellow-300 font-bold text-sm mb-2 drop-shadow-lg">
                      Serving Size
                    </label>
                    <Select onValueChange={setTakeOutServingSize} value={takeOutServingSize}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2 people">2 people</SelectItem>
                        <SelectItem value="4 people">4 people</SelectItem>
                        <SelectItem value="6 people">6 people</SelectItem>
                        <SelectItem value="8 people">8 people</SelectItem>
                        <SelectItem value="10+ people">10+ people</SelectItem>
                        <SelectItem value="Weekly (14 meals)">Weekly (14 meals)</SelectItem>
                        <SelectItem value="Monthly (30 meals)">Monthly (30 meals)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-yellow-300 font-bold text-sm mb-2 drop-shadow-lg">
                      Cuisine
                    </label>
                    <Select onValueChange={setTakeOutCuisine} value={takeOutCuisine}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select cuisine" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="American">American</SelectItem>
                        <SelectItem value="Italian">Italian</SelectItem>
                        <SelectItem value="Mexican">Mexican</SelectItem>
                        <SelectItem value="Chinese">Chinese</SelectItem>
                        <SelectItem value="Indian">Indian</SelectItem>
                        <SelectItem value="Japanese">Japanese</SelectItem>
                        <SelectItem value="Thai">Thai</SelectItem>
                        <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Meal Type and Delivery Date Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-yellow-300 font-bold text-sm mb-2 drop-shadow-lg">
                      Meal Type
                    </label>
                    <Select onValueChange={setTakeOutMealType} value={takeOutMealType}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select meal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Breakfast">Breakfast</SelectItem>
                        <SelectItem value="Lunch">Lunch</SelectItem>
                        <SelectItem value="Dinner">Dinner</SelectItem>
                        <SelectItem value="Mixed Meals">Mixed Meals</SelectItem>
                        <SelectItem value="Party Catering">Party Catering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-yellow-300 font-bold text-sm mb-2 drop-shadow-lg">
                      Delivery Date
                    </label>
                    <Input
                      type="date"
                      value={takeOutDeliveryDate}
                      onChange={(e) => setTakeOutDeliveryDate(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                {/* Design Take out Menu Button */}
                <Button
                  onClick={handleDesignTakeOutMenu}
                  disabled={!isTakeOutFormComplete}
                  className={`w-full h-12 mt-6 ${
                    isTakeOutFormComplete
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Design Take out Menu
                </Button>
              </CardContent>
            )}
          </Card>
        )}

        {/* Take-Out Menu Card */}
        {showTakeOutMenu && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg">Take-Out Menu Categories</CardTitle>
                <button
                  onClick={() => setShowTakeOutMenu(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronUp size={20} />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Category Buttons */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                <Button
                  variant="outline"
                  className={`h-12 border transition-all duration-200 ${
                    selectedCategory === 'soup'
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                  }`}
                  onClick={() => setSelectedCategory('soup')}
                >
                  Soup
                </Button>
                <Button
                  variant="outline"
                  className={`h-12 border transition-all duration-200 ${
                    selectedCategory === 'salad'
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                  }`}
                  onClick={() => setSelectedCategory('salad')}
                >
                  Salad
                </Button>
                <Button
                  variant="outline"
                  className={`h-12 border transition-all duration-200 ${
                    selectedCategory === 'entree'
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                  }`}
                  onClick={() => setSelectedCategory('entree')}
                >
                  Entree
                </Button>
                <Button
                  variant="outline"
                  className={`h-12 border transition-all duration-200 ${
                    selectedCategory === 'dessert'
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                  }`}
                  onClick={() => setSelectedCategory('dessert')}
                >
                  Dessert
                </Button>
              </div>

              {/* Dish Grid */}
              <div className="grid grid-cols-1 gap-4">
                {takeOutDishes[selectedCategory].map((dish) => (
                  <div key={dish.id} className="bg-gray-800 rounded-lg overflow-hidden">
                    {/* Dish Image */}
                    <div className="relative h-40">
                      <img 
                        src={dish.image} 
                        alt={dish.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                    
                    {/* Info Section */}
                    <div className="p-4 space-y-3">
                      {/* Dish Name */}
                      <h3 className="text-white font-semibold text-xl mb-3">{dish.name}</h3>
                      
                      {/* Nutrition Info - 2x2 Grid */}
                      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          <span className="text-sm text-gray-300">{dish.calories} calories</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span className="text-sm text-gray-300">25g protein</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-sm text-gray-300">{dish.cookTime}</span>
                        </div>
                        <div className="text-sm text-gray-300">{dish.difficulty} difficulty</div>
                      </div>
                      
                      {/* Action Icons */}
                      <div className="flex items-center justify-between pt-2">
                        <button className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center hover:from-yellow-600 hover:to-yellow-700 transition-all">
                          <ArrowLeftRight size={18} className="text-white" />
                        </button>
                        <button 
                          onClick={() => {}}
                          className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-purple-700 transition-all"
                        >
                          <BookOpen size={18} className="text-white" />
                        </button>
                        <button className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center hover:from-green-600 hover:to-green-700 transition-all">
                          <Heart size={18} className="text-white" />
                        </button>
                        <button 
                          onClick={handleCookClick}
                          className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center hover:from-orange-600 hover:to-red-700 transition-all"
                        >
                          <CookingPot size={18} className="text-white" />
                        </button>
                        <button className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all">
                          <Plus size={18} className="text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Input Form Card */}
        {showInputForm && !showTakeOut && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-yellow-300 font-bold text-xl drop-shadow-lg">Tell us what you're craving</CardTitle>
                <button
                  onClick={() => setShowInputForm(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronUp size={20} />
                </button>
              </div>
            </CardHeader>
          <CardContent className="space-y-4">
            {/* Dish Name */}
            <div>
              <label className="block text-yellow-300 font-bold text-sm mb-2 drop-shadow-lg">
                Dish Name
              </label>
              <Input
                placeholder="e.g., Chicken Curry"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            {/* First Row - Serving Size and Cuisine */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-yellow-300 font-bold text-sm mb-2 drop-shadow-lg">
                  Serving Size
                </label>
                <Select value={servingSize} onValueChange={setServingSize}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white [&>svg]:text-blue-400">
                    <SelectValue placeholder="2 people" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="1">1 person</SelectItem>
                    <SelectItem value="2">2 people</SelectItem>
                    <SelectItem value="3">3 people</SelectItem>
                    <SelectItem value="4">4 people</SelectItem>
                    <SelectItem value="6">6 people</SelectItem>
                    <SelectItem value="8">8 people</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-yellow-300 font-bold text-sm mb-2 drop-shadow-lg">
                  Cuisine
                </label>
                <Select value={cuisine} onValueChange={setCuisine}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white [&>svg]:text-blue-400">
                    <SelectValue placeholder="Indian" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="American">American</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Indian">Indian</SelectItem>
                    <SelectItem value="Italian">Italian</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                    <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                    <SelectItem value="Mexican">Mexican</SelectItem>
                    <SelectItem value="Thai">Thai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Second Row - Meal Type and Cook Method */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-yellow-300 font-bold text-sm mb-2 drop-shadow-lg">
                  Meal Type
                </label>
                <Select value={mealType} onValueChange={setMealType}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white [&>svg]:text-blue-400">
                    <SelectValue placeholder="Dinner" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="Breakfast">Breakfast</SelectItem>
                    <SelectItem value="Lunch">Lunch</SelectItem>
                    <SelectItem value="Dinner">Dinner</SelectItem>
                    <SelectItem value="Snack">Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-yellow-300 font-bold text-sm mb-2 drop-shadow-lg">
                  Cook Method
                </label>
                <Select value={cookMethod} onValueChange={setCookMethod}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white [&>svg]:text-blue-400">
                    <SelectValue placeholder="Stove-top" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="Stove-top">Stove-top</SelectItem>
                    <SelectItem value="Oven">Oven</SelectItem>
                    <SelectItem value="Grill">Grill</SelectItem>
                    <SelectItem value="Air Fryer">Air Fryer</SelectItem>
                    <SelectItem value="Slow Cooker">Slow Cooker</SelectItem>
                    <SelectItem value="Instant Pot">Instant Pot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerateVariations}
              disabled={!isFormComplete}
              className={`w-full h-12 text-white font-semibold transition-all duration-200 ${
                isFormComplete
                  ? 'bg-blue-600 hover:bg-blue-700 active:bg-purple-600'
                  : 'bg-gray-600 cursor-not-allowed'
              }`}
            >
              Generate Variations
            </Button>
          </CardContent>
          </Card>
        )}

        {/* Collapsed Input Form Indicator */}
        {!showInputForm && !showResults && !showTakeOut && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-yellow-300 font-bold text-lg drop-shadow-lg">Create Your Meal</CardTitle>
                <button
                  onClick={() => setShowInputForm(true)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronDown size={20} />
                </button>
              </div>
            </CardHeader>
          </Card>
        )}

        {/* Results Card */}
        {showResults && !showTakeOut && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-4">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className={`flex-1 h-12 transition-all duration-200 ${
                    activeTab === 'variations'
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                  }`}
                  onClick={() => setActiveTab('variations')}
                >
                  Dish Variations
                </Button>
                <Button
                  variant="outline"
                  className={`flex-1 h-12 transition-all duration-200 ${
                    activeTab === 'favorites'
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                  }`}
                  onClick={() => setActiveTab('favorites')}
                >
                  My Favorites
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {currentDishes.map((dish) => {
                  const updatedNutrition = calculateUpdatedNutrition(dish.id, dish.calories, dish.protein);
                  const isSubstitutionOpen = substitutionOpenDish === dish.id;
                  const dishSubs = createDishSubstitutions[dish.id as keyof typeof createDishSubstitutions];
                  
                  return (
                    <div key={dish.id} className="bg-gray-800 rounded-lg overflow-hidden">
                      {/* Dish Image */}
                      <div className="relative h-40">
                        <img 
                          src={dish.image} 
                          alt={dish.name}
                          className="w-full h-full object-cover"
                        />
                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </div>
                      
                      {/* Info Section */}
                      <div className="p-4 space-y-3">
                        {/* Dish Name */}
                        <h3 className="text-white font-semibold text-xl mb-3">{dish.name}</h3>
                        
                        {/* Real-time Nutrition Updates */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            <span className="text-sm text-gray-300">
                              {updatedNutrition.calories} calories
                              {substitutionConfirmed[dish.id] && updatedNutrition.calories !== dish.calories && (
                                <span className="text-green-400 ml-1">✓</span>
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span className="text-sm text-gray-300">
                              {updatedNutrition.protein} protein
                              {substitutionConfirmed[dish.id] && updatedNutrition.protein !== dish.protein && (
                                <span className="text-green-400 ml-1">✓</span>
                              )}
                            </span>
                          </div>
                        </div>
                        
                        {/* Row 2: Cook Time and Difficulty */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-sm text-gray-300">{dish.cookTime} cook time</span>
                          </div>
                          <span className="text-sm text-gray-300">{dish.difficulty} difficulty</span>
                        </div>
                        
                        {/* Action Icons Row */}
                        <div className="flex items-center justify-between mt-4">
                            <button 
                              onClick={() => setSubstitutionOpenDish(isSubstitutionOpen ? null : dish.id)}
                              className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center hover:from-yellow-600 hover:to-yellow-700 transition-all"
                            >
                              <ArrowLeftRight size={18} className="text-white" />
                            </button>
                            <button className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-purple-700 transition-all">
                              <BookOpen size={18} className="text-white" />
                            </button>
                            <button className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center hover:from-green-600 hover:to-green-700 transition-all">
                              <Heart size={18} className="text-white" />
                            </button>
                            <button 
                              onClick={() => handleCookClick(dish.id, dish.name)}
                              className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center hover:from-orange-600 hover:to-red-700 transition-all"
                            >
                              <CookingPot size={18} className="text-white" />
                            </button>
                            <button className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all">
                              <Plus size={18} className="text-white" />
                            </button>
                        </div>
                      </div>

                      {/* Substitution Expandable Card */}
                      {isSubstitutionOpen && dishSubs && (
                        <div className="border-t border-gray-700 bg-gray-800/90 backdrop-blur-sm p-4 space-y-4">
                          {/* Header - Title Only */}
                          <div className="text-center">
                            <h4 className="text-lg font-semibold text-white">Ingredient Substitutions</h4>
                          </div>
                          
                          {/* Nutrition Summary - Second Row */}
                          <div className="flex items-center justify-center gap-6 text-sm">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                              <span className="text-gray-300">{updatedNutrition.calories} cal</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                              <span className="text-gray-300">{updatedNutrition.protein}</span>
                            </div>
                          </div>

                          {/* Ingredient List with Substitutions */}
                          <div className="space-y-3">
                            {dishSubs.mainIngredients.map((ingredient, index) => {
                              const selectedSub = selectedSubstitutions[dish.id]?.[index];
                              
                              return (
                                <div key={index} className="bg-gray-700/50 rounded-lg p-3">
                                  {/* Main Ingredient */}
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-yellow-300 drop-shadow-lg">{ingredient.name}</span>
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                      <span>🔥 {ingredient.calories}</span>
                                      <span>💪 {ingredient.protein}g</span>
                                    </div>
                                  </div>
                                  
                                  {/* Substitution Options */}
                                  <div className="grid grid-cols-3 gap-2">
                                    {[ingredient.name, ...ingredient.substitutions].map((option) => (
                                      <button
                                        key={option}
                                        onClick={() => handleSubstitutionSelect(dish.id, index, option)}
                                        className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                                          (selectedSub || ingredient.name) === option
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-600 text-gray-300 hover:bg-purple-500/50'
                                        }`}
                                      >
                                        {option}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Confirmation Section */}
                          <div className="pt-3 border-t border-gray-600">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`substitution-confirm-${dish.id}`}
                                checked={substitutionConfirmed[dish.id] || false}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    handleSubstitutionConfirm(dish.id);
                                  }
                                }}
                                className="w-7 h-7 rounded-full border-gray-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                              />
                              <label
                                htmlFor={`substitution-confirm-${dish.id}`}
                                className="text-sm font-bold text-yellow-300 cursor-pointer drop-shadow-lg"
                              >
                                I confirm these substitutions are complete
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Cook Confirmation Dialog */}
      {cookConfirmationOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">Ready to Start Cooking?</h3>
            
            <p className="text-gray-300 text-center mb-6">
              Confirm you have made substitutions for{" "}
              <span className="text-yellow-300 font-bold">
                {dishVariations.find(d => d.id === cookConfirmationOpen)?.name}
              </span>{" "}
              and have ingredients in the pantry so you can start cooking
            </p>

            {/* Confirmation Checkbox */}
            <div className="flex items-center space-x-2 mb-6">
              <Checkbox
                id="cook-confirm"
                checked={cookConfirmed[cookConfirmationOpen] || false}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleCookConfirm(cookConfirmationOpen);
                  }
                }}
                className="w-7 h-7 rounded-full border-gray-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <label
                htmlFor="cook-confirm"
                className="text-sm font-bold text-yellow-300 cursor-pointer drop-shadow-lg"
              >
                I confirm I'm ready to start cooking
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setCookConfirmationOpen(null)}
                className="flex-1 bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleCookConfirm(cookConfirmationOpen)}
                disabled={!cookConfirmed[cookConfirmationOpen]}
                className={`flex-1 ${
                  cookConfirmed[cookConfirmationOpen]
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Start Cooking
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}