import { useState } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { BackButton } from "@/components/ui/back-button";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  ChefHat, 
  Star, 
  Clock,
  CreditCard,
  ChevronRight
} from "lucide-react";

export default function TakeOutScreen() {
  const [, setLocation] = useLocation();
  const [, setNavigationSource] = useLocalStorage<string>("nutragenie_navigation_source", "");
  
  // Set navigation source when going to recipes
  const handleExploreRecipes = () => {
    setNavigationSource("take-out");
    setLocation("/recipes");
  };

  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);
  const [selectedOrderType, setSelectedOrderType] = useState<string>("Individual");
  const [selectedChef, setSelectedChef] = useState<string>("chef-ramsay");

  const dishes = [
    { id: "spicy-thai", name: "Spicy Thai Basil Chicken", price: 15.50 },
    { id: "tuscan-salmon", name: "Creamy Tuscan Salmon", price: 18.00 },
    { id: "lentil-soup", name: "Vegetarian Lentil Soup", price: 12.00 },
    { id: "beef-stir-fry", name: "Beef and Broccoli Stir-fry", price: 16.00 }
  ];

  const chefs = [
    {
      id: "chef-ramsay",
      name: "Chef Ramsay's Kitchen",
      initial: "C",
      rating: 4.8,
      reviews: 150,
      price: 25.50
    },
    {
      id: "fresh-fast",
      name: "Fresh & Fast Meals", 
      initial: "F",
      rating: 4.7,
      reviews: 89,
      price: 22.00
    }
  ];

  const toggleDish = (dishId: string) => {
    setSelectedDishes(prev => 
      prev.includes(dishId) 
        ? prev.filter(id => id !== dishId)
        : [...prev, dishId]
    );
  };

  const getSubtotal = () => {
    return selectedDishes.reduce((total, dishId) => {
      const dish = dishes.find(d => d.id === dishId);
      return total + (dish?.price || 0);
    }, 0);
  };

  const deliveryFee = 5.00;
  const taxesFees = 0.00;
  const total = getSubtotal() + deliveryFee + taxesFees;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pb-20">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 px-4 py-4 flex items-center justify-between">
        <BackButton to="/explore-recipe-options" className="text-white" />
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
          <p className="text-lg font-semibold text-purple-300 mt-1">Take-Out Order</p>
        </div>
        <div className="w-8"></div>
      </div>

      <div className="max-w-lg mx-auto p-3 space-y-4">
        {/* Select Your Dishes */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Select Your Dishes</h2>
          <div className="space-y-3">
            {dishes.map((dish) => (
              <div 
                key={dish.id}
                className="flex items-center justify-between p-4 bg-gray-800/90 rounded-lg border border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleDish(dish.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedDishes.includes(dish.id)
                        ? 'bg-blue-600 border-blue-600'
                        : 'border-gray-500'
                    }`}
                  >
                    {selectedDishes.includes(dish.id) && (
                      <div className="w-2 h-2 bg-white rounded"></div>
                    )}
                  </button>
                  <span className="text-white font-medium">{dish.name}</span>
                </div>
                <span className="text-white font-semibold">${dish.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-gray-800/90 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="text-white font-semibold">Delivery Address</h3>
                <p className="text-gray-300 text-sm">123 Main Street, Anytown, USA 12345</p>
              </div>
            </div>
            <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
              Change
            </Button>
          </div>
        </div>

        {/* Order Type Selection */}
        <div className="flex bg-gray-800/90 rounded-lg border border-gray-700 p-1">
          {["Individual", "Group Order", "Weekly Plan"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedOrderType(type)}
              className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-all ${
                selectedOrderType === type
                  ? 'bg-gray-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Delivery Schedule */}
        <div>
          <h3 className="text-white font-semibold mb-3">Delivery Schedule</h3>
          <div className="bg-blue-600/20 border border-blue-600 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <h4 className="text-white font-medium">ASAP Delivery</h4>
                <p className="text-gray-300 text-sm">Within 3 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Choose a Chef or Kitchen */}
        <div>
          <h3 className="text-white font-semibold mb-3">Choose a Chef or Kitchen</h3>
          <div className="space-y-3">
            {chefs.map((chef) => (
              <div 
                key={chef.id}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  selectedChef === chef.id
                    ? 'bg-blue-600/20 border-blue-600'
                    : 'bg-gray-800/90 border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setSelectedChef(chef.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedChef === chef.id 
                        ? 'border-blue-600 bg-blue-600' 
                        : 'border-gray-500'
                    }`}>
                      {selectedChef === chef.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{chef.initial}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{chef.name}</h4>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-gray-300 text-sm">{chef.rating} ({chef.reviews})</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-white font-semibold">${chef.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-white font-semibold mb-3">Payment Method</h3>
          <div className="space-y-3">
            <Button className="w-full bg-white text-black hover:bg-gray-100 py-3">
              <span className="font-semibold"> Pay</span>
            </Button>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3">
              <span className="font-semibold">G Pay</span>
            </Button>
            <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 py-3">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Credit or Debit Card</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-800/90 rounded-lg border border-gray-700 p-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300">Subtotal</span>
              <span className="text-white">${getSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Delivery Fee</span>
              <span className="text-white">${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Taxes & Fees</span>
              <span className="text-white">${taxesFees.toFixed(2)}</span>
            </div>
            <Separator className="bg-gray-600" />
            <div className="flex justify-between">
              <span className="text-white font-semibold">Total</span>
              <span className="text-white font-bold">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <Button 
          className="w-full bg-gray-600 hover:bg-gray-700 py-4 text-lg font-semibold"
          disabled={selectedDishes.length === 0}
        >
          Place Order
        </Button>

        {/* Quick Recipe Access */}
        <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <ChefHat className="w-6 h-6" />
              <div className="flex-1">
                <h3 className="text-lg font-bold">Want to Cook Instead?</h3>
                <p className="text-purple-100 text-sm">Explore our recipe collection with AI guidance</p>
              </div>
            </div>
            <Button 
              onClick={handleExploreRecipes}
              className="w-full bg-white text-purple-600 hover:bg-gray-100"
            >
              <ChefHat className="w-4 h-4 mr-2" />
              Explore Recipes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}