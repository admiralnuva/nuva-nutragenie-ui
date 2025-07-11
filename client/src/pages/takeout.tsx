import { useState } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Truck, 
  Clock, 
  MapPin, 
  Phone, 
  ChefHat, 
  Star, 
  Plus,
  Search,
  Filter,
  Calendar,
  CreditCard,
  ShoppingBag,
  Users
} from "lucide-react";

export default function TakeOutScreen() {
  const [, setLocation] = useLocation();
  const [, setNavigationSource] = useLocalStorage<string>("nutragenie_navigation_source", "");
  
  // Set navigation source when going to recipes
  const handleExploreRecipes = () => {
    setNavigationSource("take-out");
    setLocation("/explore-recipes");
  };

  const [selectedOrderType, setSelectedOrderType] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'local' | 'chains'>('local');

  const localChefs = [
    {
      id: 1,
      name: "Chef Maria's Kitchen",
      cuisine: "Mediterranean",
      rating: 4.8,
      deliveryTime: "45-60 min",
      specialties: ["Healthy", "Organic", "Gluten-Free"],
      image: "🧑‍🍳",
      popular: true
    },
    {
      id: 2,
      name: "Antonio's Home Cooking",
      cuisine: "Italian",
      rating: 4.9,
      deliveryTime: "30-45 min",
      specialties: ["Fresh Pasta", "Wood-Fired Pizza"],
      image: "👨‍🍳",
      popular: false
    },
    {
      id: 3,
      name: "Healthy Bites Co.",
      cuisine: "Wellness",
      rating: 4.7,
      deliveryTime: "35-50 min",
      specialties: ["Keto", "Vegan", "Meal Prep"],
      image: "🥗",
      popular: true
    }
  ];

  const orderTypes = [
    {
      id: "single",
      title: "Single Order",
      description: "1 person, ready in 30-60 minutes",
      icon: "🍽️",
      estimatedCost: "$15-25"
    },
    {
      id: "family",
      title: "Family Order",
      description: "2-4 people, ready in 45-75 minutes",
      icon: "👨‍👩‍👧‍👦",
      estimatedCost: "$35-60"
    },
    {
      id: "group",
      title: "Group Order",
      description: "5+ people, schedule 1-2 days ahead",
      icon: "🎉",
      estimatedCost: "$75-150"
    },
    {
      id: "weekly",
      title: "Weekly Meal Plan",
      description: "7 days of meals, schedule weekly",
      icon: "📅",
      estimatedCost: "$120-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pb-20">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 px-4 py-4 flex items-center justify-between">
        <BackButton to="/explore-recipes" className="text-white" />
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
          <p className="text-lg font-semibold text-purple-300 mt-1">Take-Out Orders</p>
        </div>
        <div className="w-8"></div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Recipe Access */}
        <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <CardContent className="p-4">
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
          </CardContent>
        </Card>

        {/* Order Type Selection */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-white">Select Order Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {orderTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedOrderType(type.id)}
                  className={`p-4 rounded-lg border transition-all text-left ${
                    selectedOrderType === type.id
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600/20 hover:border-purple-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{type.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold">{type.title}</h4>
                      <p className="text-sm opacity-80">{type.description}</p>
                      <p className="text-xs font-medium mt-1">{type.estimatedCost}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Local vs Chain Toggle */}
        {selectedOrderType && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white">Choose Restaurants</CardTitle>
                <div className="flex bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('local')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                      activeTab === 'local'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Local Chefs
                  </button>
                  <button
                    onClick={() => setActiveTab('chains')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                      activeTab === 'chains'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Chain Restaurants
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {activeTab === 'local' ? (
                <div className="space-y-3">
                  {localChefs.map((chef) => (
                    <div key={chef.id} className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{chef.image}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-white">{chef.name}</h4>
                            {chef.popular && (
                              <Badge className="bg-yellow-500 text-yellow-900 text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-300">{chef.cuisine}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-300">{chef.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-300">{chef.deliveryTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mb-3">
                        {chef.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-gray-500 text-gray-300">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        onClick={() => {
                          console.log(`Order from ${chef.name}`);
                        }}
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        View Menu & Order
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Truck className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">Chain Restaurants</h4>
                  <p className="text-gray-400 mb-4">
                    Integration with popular delivery services coming soon
                  </p>
                  <Badge variant="outline" className="border-gray-500 text-gray-300">
                    Coming Soon
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2 bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white"
                onClick={() => {
                  console.log('View order history');
                }}
              >
                <Clock className="w-5 h-5" />
                <span className="text-xs">Order History</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2 bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white"
                onClick={() => {
                  console.log('Reorder favorites');
                }}
              >
                <Star className="w-5 h-5" />
                <span className="text-xs">Reorder Favorites</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2 bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white"
                onClick={() => {
                  console.log('Schedule delivery');
                }}
              >
                <Calendar className="w-5 h-5" />
                <span className="text-xs">Schedule Delivery</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2 bg-gray-700 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white"
                onClick={() => {
                  console.log('Group ordering');
                }}
              >
                <Users className="w-5 h-5" />
                <span className="text-xs">Group Ordering</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}