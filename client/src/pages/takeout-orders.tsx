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
  const [formData, setFormData] = useState({
    servingSize: "",
    cuisine: "",
    mealType: "",
    spiceLevel: "",
    deliveryDate: ""
  });

  const takeoutDishes = [
    {
      id: 1,
      name: "Classic Burger",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      calories: 520,
      protein: "28g",
      cookTime: "Ready in 30 min",
      difficulty: "Takeout"
    },
    {
      id: 2,
      name: "Margherita Pizza",
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop",
      calories: 380,
      protein: "18g",
      cookTime: "Ready in 25 min",
      difficulty: "Takeout"
    },
    {
      id: 3,
      name: "Chicken Pad Thai",
      image: "https://images.unsplash.com/photo-1559314809-0f31657def5e?w=400&h=300&fit=crop",
      calories: 450,
      protein: "32g",
      cookTime: "Ready in 35 min",
      difficulty: "Takeout"
    }
  ];

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
            <p className="text-lg font-semibold text-purple-300 mt-1">Takeout Orders</p>
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
                    className="bg-gray-700 border-gray-600 text-white [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>
              </div>

              <Button 
                onClick={handleOrder}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Design Take out Menu
              </Button>
            </div>
          </Card>
        )}

        {/* Results Card */}
        {showResults && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
            <div className="grid grid-cols-1 gap-4">
              {takeoutDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}