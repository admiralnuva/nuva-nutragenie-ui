import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  Users, 
  Calendar, 
  MapPin, 
  ChefHat, 
  Plus, 
  Minus, 
  Truck, 
  Star,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface SelectedDish {
  id: number;
  name: string;
  cookTime: string;
  calories: number;
  difficulty: string;
  servings: number;
  estimatedPrice: number;
}

interface LocalChef {
  id: number;
  name: string;
  rating: number;
  specialties: string[];
  deliveryTime: string;
  avatar: string;
}

type OrderType = "single" | "family" | "group";

export default function TakeOutScreen() {
  const [selectedDishes, setSelectedDishes] = useState<SelectedDish[]>([]);
  const [orderType, setOrderType] = useState<OrderType>("single");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [selectedChef, setSelectedChef] = useState<LocalChef | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const [userData] = useLocalStorage("userData", null);

  // Mock data for selected dishes from recipe generation
  const availableDishes = [
    { id: 1, name: "Mediterranean Bowl", cookTime: "30 min", calories: 420, difficulty: "Medium", estimatedPrice: 18 },
    { id: 2, name: "Thai Curry", cookTime: "35 min", calories: 380, difficulty: "Medium", estimatedPrice: 22 },
    { id: 3, name: "Pasta Aglio e Olio", cookTime: "15 min", calories: 340, difficulty: "Easy", estimatedPrice: 14 },
    { id: 4, name: "Quinoa Salad", cookTime: "20 min", calories: 310, difficulty: "Easy", estimatedPrice: 16 },
    { id: 5, name: "Herb Crusted Fish", cookTime: "25 min", calories: 290, difficulty: "Medium", estimatedPrice: 26 },
    { id: 6, name: "Power Smoothie Bowl", cookTime: "10 min", calories: 240, difficulty: "Easy", estimatedPrice: 12 }
  ];

  // Mock local chefs
  const localChefs: LocalChef[] = [
    { id: 1, name: "Chef Maria", rating: 4.9, specialties: ["Mediterranean", "Italian"], deliveryTime: "45 min", avatar: "👩‍🍳" },
    { id: 2, name: "Chef David", rating: 4.8, specialties: ["Asian Fusion", "Thai"], deliveryTime: "1 hour", avatar: "👨‍🍳" },
    { id: 3, name: "Chef Sarah", rating: 4.7, specialties: ["Healthy", "Vegan"], deliveryTime: "40 min", avatar: "👩‍🍳" }
  ];

  const addDish = (dish: any) => {
    const existingDish = selectedDishes.find(d => d.id === dish.id);
    if (existingDish) {
      setSelectedDishes(selectedDishes.map(d => 
        d.id === dish.id ? { ...d, servings: d.servings + 1 } : d
      ));
    } else {
      setSelectedDishes([...selectedDishes, { ...dish, servings: 1 }]);
    }
  };

  const updateServings = (dishId: number, change: number) => {
    setSelectedDishes(selectedDishes.map(dish => 
      dish.id === dishId 
        ? { ...dish, servings: Math.max(0, dish.servings + change) }
        : dish
    ).filter(dish => dish.servings > 0));
  };

  const getTotalPeople = () => {
    return selectedDishes.reduce((total, dish) => total + dish.servings, 0);
  };

  const getTotalCost = () => {
    return selectedDishes.reduce((total, dish) => total + (dish.estimatedPrice * dish.servings), 0);
  };

  const getMinDeliveryDate = () => {
    const now = new Date();
    if (orderType === "group") {
      now.setDate(now.getDate() + 7); // 1 week ahead for group orders
    } else {
      now.setHours(now.getHours() + 3); // 3 hours for single/family
    }
    return now.toISOString().split('T')[0];
  };

  const getOrderTypeInfo = (type: OrderType) => {
    switch (type) {
      case "single":
        return { label: "Single Order", subtitle: "1 person", deliveryInfo: "Delivered in 3 hours", maxPeople: 1 };
      case "family":
        return { label: "Family Order", subtitle: "2-4 people", deliveryInfo: "Delivered in 3 hours", maxPeople: 4 };
      case "group":
        return { label: "Group Order", subtitle: "5+ people", deliveryInfo: "Schedule 1 week ahead", maxPeople: 20 };
    }
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    // In real implementation, this would send order to backend
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="max-w-md mx-auto space-y-6 pt-8">
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 text-center">
            <CardContent className="pt-8 pb-8">
              <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Order Placed Successfully!</h2>
              <p className="text-gray-300 mb-4">
                Your {getOrderTypeInfo(orderType).label.toLowerCase()} has been sent to {selectedChef?.name}
              </p>
              <Badge className="bg-purple-600 text-white mb-4">
                Estimated delivery: {selectedChef?.deliveryTime}
              </Badge>
              <Button 
                onClick={() => setOrderPlaced(false)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Place Another Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="max-w-md mx-auto space-y-6 pt-8">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-purple-300 mb-2">Take-Out Orders</h1>
          <p className="text-gray-300 text-sm">Local chefs deliver fresh meals to your door</p>
        </div>

        {/* Order Type Selection */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-purple-300 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Order Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {(["single", "family", "group"] as OrderType[]).map((type) => {
                const info = getOrderTypeInfo(type);
                return (
                  <Button
                    key={type}
                    variant="outline"
                    className={`h-16 flex flex-col items-center justify-center p-2 ${
                      orderType === type 
                        ? 'bg-purple-600 text-white border-purple-600' 
                        : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50'
                    }`}
                    onClick={() => setOrderType(type)}
                  >
                    <span className="text-xs font-medium">{info.label}</span>
                    <span className="text-xs text-gray-400">{info.subtitle}</span>
                  </Button>
                );
              })}
            </div>
            <div className="mt-3 p-3 bg-gray-700/30 rounded-lg">
              <p className="text-xs text-gray-300 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {getOrderTypeInfo(orderType).deliveryInfo}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Available Dishes */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-purple-300 flex items-center gap-2">
              <ChefHat className="w-5 h-5" />
              Available Dishes
            </CardTitle>
            <p className="text-sm text-gray-400">From your recent recipe selections</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {availableDishes.map((dish) => (
                <div key={dish.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-white text-sm">{dish.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-400">{dish.cookTime}</span>
                      <span className="text-xs text-gray-400">{dish.calories} cal</span>
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                        ${dish.estimatedPrice}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => addDish(dish)}
                    className="bg-purple-600 hover:bg-purple-700 text-white h-8 w-8 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Dishes */}
        {selectedDishes.length > 0 && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-purple-300">Your Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedDishes.map((dish) => (
                  <div key={dish.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-white text-sm">{dish.name}</h4>
                      <span className="text-xs text-gray-400">${dish.estimatedPrice} per serving</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateServings(dish.id, -1)}
                        className="h-7 w-7 p-0 border-gray-600"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-white text-sm w-8 text-center">{dish.servings}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateServings(dish.id, 1)}
                        className="h-7 w-7 p-0 border-gray-600"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Separator className="bg-gray-600" />
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total People: {getTotalPeople()}</span>
                  <span className="text-white font-medium">Total: ${getTotalCost()}</span>
                </div>

                {/* Order Type Validation */}
                {orderType !== "group" && getTotalPeople() > getOrderTypeInfo(orderType).maxPeople && (
                  <div className="p-3 bg-yellow-900/30 border border-yellow-600 rounded-lg">
                    <p className="text-yellow-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Too many servings for {getOrderTypeInfo(orderType).label.toLowerCase()}. Switch to {getTotalPeople() > 4 ? "Group" : "Family"} order.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Chef Selection */}
        {selectedDishes.length > 0 && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-purple-300">Available Chefs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {localChefs.map((chef) => (
                  <div 
                    key={chef.id} 
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedChef?.id === chef.id 
                        ? 'bg-purple-600/20 border-purple-600' 
                        : 'bg-gray-700/30 border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedChef(chef)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{chef.avatar}</span>
                        <div>
                          <h4 className="font-medium text-white text-sm">{chef.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-400">{chef.rating}</span>
                            </div>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-400">{chef.deliveryTime}</span>
                          </div>
                          <div className="flex gap-1 mt-1">
                            {chef.specialties.map((specialty) => (
                              <Badge key={specialty} variant="outline" className="text-xs border-gray-600 text-gray-400">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      {selectedChef?.id === chef.id && (
                        <CheckCircle2 className="w-5 h-5 text-purple-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Delivery Scheduling */}
        {selectedChef && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-purple-300 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Delivery Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Delivery Date
                  </label>
                  <input
                    type="date"
                    min={getMinDeliveryDate()}
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preferred Time
                  </label>
                  <select
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="">Select time</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="20:00">8:00 PM</option>
                  </select>
                </div>

                <div className="p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span>Delivery Address: {userData?.streetAddress || "123 Main St"}, {userData?.city || "City"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Place Order Button */}
        {selectedChef && deliveryDate && deliveryTime && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardContent className="pt-6">
              <Button
                onClick={handlePlaceOrder}
                disabled={orderType !== "group" && getTotalPeople() > getOrderTypeInfo(orderType).maxPeople}
                className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-medium"
              >
                <Truck className="w-5 h-5 mr-2" />
                Place Order - ${getTotalCost()}
              </Button>
              <p className="text-xs text-gray-400 text-center mt-2">
                Order will be prepared by {selectedChef.name} and delivered on {deliveryDate} at {deliveryTime}
              </p>
            </CardContent>
          </Card>
        )}

        <div className="h-20"></div> {/* Bottom spacing for navigation */}
      </div>
    </div>
  );
}