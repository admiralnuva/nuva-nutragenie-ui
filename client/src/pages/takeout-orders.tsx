import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DishCard } from "@/components/ui/dish-card";

export default function TakeoutOrdersScreen() {
  const [showForm, setShowForm] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState("soups");
  const [formData, setFormData] = useState({
    servingSize: "",
    cuisine: "",
    mealType: "",
    spiceLevel: "",
    deliveryDate: ""
  });

  const menuCategories = {
    soups: [
      {
        id: 1,
        name: "Chicken Noodle Soup",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
        calories: 220,
        protein: "18g",
        cookTime: "Ready in 20 min",
        difficulty: "Takeout"
      },
      {
        id: 2,
        name: "Tomato Basil Soup",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop",
        calories: 180,
        protein: "6g",
        cookTime: "Ready in 15 min",
        difficulty: "Takeout"
      },
      {
        id: 3,
        name: "Mushroom Bisque",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop",
        calories: 260,
        protein: "8g",
        cookTime: "Ready in 25 min",
        difficulty: "Takeout"
      },
      {
        id: 4,
        name: "Vegetable Minestrone",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
        calories: 190,
        protein: "7g",
        cookTime: "Ready in 18 min",
        difficulty: "Takeout"
      },
      {
        id: 5,
        name: "Butternut Squash Soup",
        image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&h=300&fit=crop",
        calories: 210,
        protein: "5g",
        cookTime: "Ready in 22 min",
        difficulty: "Takeout"
      },
      {
        id: 6,
        name: "Seafood Chowder",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop",
        calories: 340,
        protein: "24g",
        cookTime: "Ready in 30 min",
        difficulty: "Takeout"
      },
      {
        id: 7,
        name: "Lentil Soup",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
        calories: 230,
        protein: "16g",
        cookTime: "Ready in 25 min",
        difficulty: "Takeout"
      }
    ],
    salads: [
      {
        id: 8,
        name: "Caesar Salad",
        image: "https://images.unsplash.com/photo-1512852939750-1305098529bf?w=400&h=300&fit=crop",
        calories: 320,
        protein: "25g",
        cookTime: "Ready in 10 min",
        difficulty: "Takeout"
      },
      {
        id: 9,
        name: "Greek Salad",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
        calories: 280,
        protein: "12g",
        cookTime: "Ready in 8 min",
        difficulty: "Takeout"
      },
      {
        id: 10,
        name: "Quinoa Buddha Bowl",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
        calories: 350,
        protein: "18g",
        cookTime: "Ready in 12 min",
        difficulty: "Takeout"
      },
      {
        id: 11,
        name: "Kale & Avocado Salad",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
        calories: 290,
        protein: "8g",
        cookTime: "Ready in 7 min",
        difficulty: "Takeout"
      },
      {
        id: 12,
        name: "Spinach & Strawberry Salad",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
        calories: 240,
        protein: "10g",
        cookTime: "Ready in 9 min",
        difficulty: "Takeout"
      },
      {
        id: 13,
        name: "Mediterranean Salad",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
        calories: 310,
        protein: "14g",
        cookTime: "Ready in 11 min",
        difficulty: "Takeout"
      },
      {
        id: 14,
        name: "Asian Chicken Salad",
        image: "https://images.unsplash.com/photo-1512852939750-1305098529bf?w=400&h=300&fit=crop",
        calories: 380,
        protein: "28g",
        cookTime: "Ready in 13 min",
        difficulty: "Takeout"
      }
    ],
    entrees: [
      {
        id: 15,
        name: "Grilled Salmon",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop",
        calories: 420,
        protein: "35g",
        cookTime: "Ready in 25 min",
        difficulty: "Takeout"
      },
      {
        id: 16,
        name: "Chicken Parmesan",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        calories: 480,
        protein: "42g",
        cookTime: "Ready in 30 min",
        difficulty: "Takeout"
      },
      {
        id: 17,
        name: "Beef Stir Fry",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
        calories: 450,
        protein: "32g",
        cookTime: "Ready in 20 min",
        difficulty: "Takeout"
      },
      {
        id: 18,
        name: "Vegetable Pasta",
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop",
        calories: 360,
        protein: "14g",
        cookTime: "Ready in 22 min",
        difficulty: "Takeout"
      },
      {
        id: 19,
        name: "Turkey Meatballs",
        image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop",
        calories: 390,
        protein: "28g",
        cookTime: "Ready in 27 min",
        difficulty: "Takeout"
      },
      {
        id: 20,
        name: "Fish Tacos",
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop",
        calories: 340,
        protein: "25g",
        cookTime: "Ready in 18 min",
        difficulty: "Takeout"
      },
      {
        id: 21,
        name: "Mushroom Risotto",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
        calories: 390,
        protein: "12g",
        cookTime: "Ready in 35 min",
        difficulty: "Takeout"
      }
    ],
    desserts: [
      {
        id: 22,
        name: "Chocolate Lava Cake",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
        calories: 420,
        protein: "6g",
        cookTime: "Ready in 15 min",
        difficulty: "Takeout"
      },
      {
        id: 23,
        name: "Tiramisu",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
        calories: 380,
        protein: "8g",
        cookTime: "Ready in 10 min",
        difficulty: "Takeout"
      },
      {
        id: 24,
        name: "Berry Cheesecake",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
        calories: 450,
        protein: "7g",
        cookTime: "Ready in 12 min",
        difficulty: "Takeout"
      },
      {
        id: 25,
        name: "Apple Pie",
        image: "https://images.unsplash.com/photo-1535920527002-b35e96722bd4?w=400&h=300&fit=crop",
        calories: 320,
        protein: "4g",
        cookTime: "Ready in 8 min",
        difficulty: "Takeout"
      },
      {
        id: 26,
        name: "Crème Brûlée",
        image: "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=400&h=300&fit=crop",
        calories: 290,
        protein: "5g",
        cookTime: "Ready in 6 min",
        difficulty: "Takeout"
      },
      {
        id: 27,
        name: "Gelato Trio",
        image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&h=300&fit=crop",
        calories: 240,
        protein: "4g",
        cookTime: "Ready in 3 min",
        difficulty: "Takeout"
      },
      {
        id: 28,
        name: "Chocolate Mousse",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
        calories: 310,
        protein: "6g",
        cookTime: "Ready in 5 min",
        difficulty: "Takeout"
      }
    ]
  };

  const handleOrder = () => {
    setShowForm(false);
    setShowResults(true);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <Link href="/explore-recipe-options">
            <ArrowLeft className="w-6 h-6 text-white cursor-pointer" />
          </Link>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
            <p className="text-lg font-semibold text-purple-300 mt-1">Take-Out Orders</p>
          </div>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-3 py-3 space-y-3 pb-20">
        {/* Order Form Card */}
        {showForm && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
            <h2 className="text-xl font-bold text-yellow-400 mb-4 text-center drop-shadow">Take-Out for Individual, Group, Weekly Meals</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-yellow-400 text-sm font-medium mb-2 drop-shadow">Serving Size</label>
                <Select value={formData.servingSize} onValueChange={(value) => setFormData({...formData, servingSize: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white [&>svg]:text-yellow-400">
                    <SelectValue placeholder="Select serving size" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="1" className="text-white">1 person</SelectItem>
                    <SelectItem value="2" className="text-white">2 people</SelectItem>
                    <SelectItem value="4" className="text-white">4 people</SelectItem>
                    <SelectItem value="weekly" className="text-white">Weekly (7 meals)</SelectItem>
                    <SelectItem value="monthly" className="text-white">Monthly (30 meals)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-yellow-400 text-sm font-medium mb-2 drop-shadow">Cuisine</label>
                <Select value={formData.cuisine} onValueChange={(value) => setFormData({...formData, cuisine: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white [&>svg]:text-yellow-400">
                    <SelectValue placeholder="Select cuisine" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="american" className="text-white">American</SelectItem>
                    <SelectItem value="italian" className="text-white">Italian</SelectItem>
                    <SelectItem value="asian" className="text-white">Asian</SelectItem>
                    <SelectItem value="mexican" className="text-white">Mexican</SelectItem>
                    <SelectItem value="indian" className="text-white">Indian</SelectItem>
                    <SelectItem value="mediterranean" className="text-white">Mediterranean</SelectItem>
                    <SelectItem value="thai" className="text-white">Thai</SelectItem>
                    <SelectItem value="chinese" className="text-white">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-yellow-400 text-sm font-medium mb-2 drop-shadow">Meal Type</label>
                <Select value={formData.mealType} onValueChange={(value) => setFormData({...formData, mealType: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white [&>svg]:text-yellow-400">
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="breakfast" className="text-white">Breakfast</SelectItem>
                    <SelectItem value="lunch" className="text-white">Lunch</SelectItem>
                    <SelectItem value="dinner" className="text-white">Dinner</SelectItem>
                    <SelectItem value="mixed" className="text-white">Mixed Meals</SelectItem>
                    <SelectItem value="party" className="text-white">Party Catering</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-yellow-400 text-sm font-medium mb-2 drop-shadow">Spice Level</label>
                <Select value={formData.spiceLevel} onValueChange={(value) => setFormData({...formData, spiceLevel: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white [&>svg]:text-yellow-400">
                    <SelectValue placeholder="Select spice level" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="mild" className="text-white">Mild</SelectItem>
                    <SelectItem value="medium" className="text-white">Medium</SelectItem>
                    <SelectItem value="spicy" className="text-white">Spicy</SelectItem>
                    <SelectItem value="extra-hot" className="text-white">Extra Hot</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-yellow-400 text-sm font-medium mb-2 drop-shadow">Delivery Date</label>
                <div className="relative">
                  <Input
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:w-6 [&::-webkit-calendar-picker-indicator]:h-6 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                </div>
              </div>

              <Button 
                onClick={handleOrder}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Design Take-Out Menu
              </Button>
            </div>
          </Card>
        )}

        {/* Results Card with Tabs */}
        {showResults && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
            <h2 className="text-xl font-bold text-yellow-400 mb-4 text-center drop-shadow">7-Day Take-Out Menu</h2>
            
            {/* Tab Navigation */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {[
                { key: "soups", label: "Soup" },
                { key: "salads", label: "Salad" },
                { key: "entrees", label: "Entree" },
                { key: "desserts", label: "Dessert" }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`p-2 rounded-lg font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? "bg-purple-500 text-white"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Dishes Grid */}
            <div className="grid grid-cols-1 gap-4">
              {menuCategories[activeTab as keyof typeof menuCategories].map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}