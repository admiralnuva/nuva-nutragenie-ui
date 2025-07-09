import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/ui/back-button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Star,
  CreditCard,
  Calendar,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Dish {
  id: number;
  name: string;
  price: number;
  selected: boolean;
}

interface Chef {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
  avatar: string;
  selected: boolean;
}

type OrderType = "individual" | "group" | "weekly";

export default function TakeOutScreen() {
  const [orderType, setOrderType] = useState<OrderType>("individual");
  const [isDishesCollapsed, setIsDishesCollapsed] = useState(false);
  const [dishes, setDishes] = useState<Dish[]>([
    { id: 1, name: "Spicy Thai Basil Chicken", price: 15.50, selected: false },
    { id: 2, name: "Creamy Tuscan Salmon", price: 18.00, selected: false },
    { id: 3, name: "Vegetarian Lentil Soup", price: 12.00, selected: false },
    { id: 4, name: "Beef and Broccoli Stir-fry", price: 16.00, selected: false },
    { id: 5, name: "Mediterranean Quinoa Bowl", price: 14.00, selected: false },
    { id: 6, name: "Herb-Crusted Salmon", price: 22.00, selected: false },
    { id: 7, name: "Chicken Tikka Masala", price: 17.50, selected: false },
    { id: 8, name: "Veggie Pad Thai", price: 13.50, selected: false },
    { id: 9, name: "BBQ Pulled Pork Bowl", price: 19.00, selected: false },
    { id: 10, name: "Greek Chicken Gyros", price: 16.50, selected: false }
  ]);
  
  // Dynamic chef options based on order type
  const getChefsByOrderType = (orderType: OrderType): Chef[] => {
    switch (orderType) {
      case "individual":
        return [
          { 
            id: 1, 
            name: "Chef Ramsay's Kitchen", 
            rating: 4.9, 
            reviewCount: 150, 
            price: 25.50, 
            avatar: "C",
            selected: false 
          },
          { 
            id: 2, 
            name: "Fresh & Fast Meals", 
            rating: 4.7, 
            reviewCount: 89, 
            price: 22.00, 
            avatar: "F",
            selected: false 
          }
        ];
      case "group":
        return [
          { 
            id: 3, 
            name: "Catering Central", 
            rating: 4.8, 
            reviewCount: 200, 
            price: 45.00, 
            avatar: "C",
            selected: false 
          },
          { 
            id: 4, 
            name: "Group Feast Kitchen", 
            rating: 4.6, 
            reviewCount: 125, 
            price: 38.50, 
            avatar: "G",
            selected: false 
          },
          { 
            id: 5, 
            name: "Event Meal Solutions", 
            rating: 4.5, 
            reviewCount: 95, 
            price: 42.00, 
            avatar: "E",
            selected: false 
          }
        ];
      case "weekly":
        return [
          { 
            id: 6, 
            name: "Weekly Meal Prep Co.", 
            rating: 4.9, 
            reviewCount: 300, 
            price: 85.00, 
            avatar: "W",
            selected: false 
          },
          { 
            id: 7, 
            name: "Subscription Chef", 
            rating: 4.7, 
            reviewCount: 180, 
            price: 78.00, 
            avatar: "S",
            selected: false 
          },
          { 
            id: 8, 
            name: "Healthy Weekly Kitchen", 
            rating: 4.8, 
            reviewCount: 220, 
            price: 92.00, 
            avatar: "H",
            selected: false 
          }
        ];
      default:
        return [];
    }
  };

  const [chefs, setChefs] = useState<Chef[]>(getChefsByOrderType("individual"));

  const [groupOrderDetails, setGroupOrderDetails] = useState({
    servings: "4",
    deliveryDate: "07/10/2025"
  });

  const [weeklyPlanDetails, setWeeklyPlanDetails] = useState({
    mealsPerWeek: "5 Meals/Week",
    planType: "Single"
  });

  const [userData] = useLocalStorage("userData", null);

  // Update chefs when order type changes
  useEffect(() => {
    setChefs(getChefsByOrderType(orderType));
  }, [orderType]);

  const toggleDishSelection = (dishId: number) => {
    setDishes(dishes.map(dish => 
      dish.id === dishId ? { ...dish, selected: !dish.selected } : dish
    ));
  };

  const toggleChefSelection = (chefId: number) => {
    setChefs(chefs.map(chef => 
      chef.id === chefId 
        ? { ...chef, selected: !chef.selected }
        : { ...chef, selected: false }
    ));
  };

  const getSelectedDishesTotal = () => {
    return dishes.filter(dish => dish.selected).reduce((total, dish) => total + dish.price, 0);
  };

  const getSelectedChefPrice = () => {
    const selectedChef = chefs.find(chef => chef.selected);
    return selectedChef ? selectedChef.price : 0;
  };

  const getSubtotal = () => {
    return getSelectedDishesTotal() + getSelectedChefPrice();
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const deliveryFee = 5.00;
    const taxesFees = 0.00;
    return subtotal + deliveryFee + taxesFees;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-md mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700">
          <BackButton to="/explore-recipes" className="text-white" />
          <h1 className="text-xl font-bold text-white">Place Your Order</h1>
          <div className="w-8"></div>
        </div>

        <div className="p-4 space-y-4">
          
          {/* Select Your Dishes */}
          <div>
            <div 
              className="flex items-center justify-between mb-3 cursor-pointer"
              onClick={() => setIsDishesCollapsed(!isDishesCollapsed)}
            >
              <h2 className="text-lg font-semibold text-white">Select Your Dishes</h2>
              <div className="w-8 h-8 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center">
                {isDishesCollapsed ? (
                  <ChevronDown className="w-4 h-4 text-gray-300" />
                ) : (
                  <ChevronUp className="w-4 h-4 text-gray-300" />
                )}
              </div>
            </div>
            
            {!isDishesCollapsed && (
              <div className="space-y-2">
                {dishes.map((dish) => (
                  <div 
                    key={dish.id} 
                    className="flex items-center justify-between p-4 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg"
                    onClick={() => toggleDishSelection(dish.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox 
                        checked={dish.selected}
                        onChange={() => toggleDishSelection(dish.id)}
                        className="border-gray-500"
                      />
                      <span className="text-white font-medium">{dish.name}</span>
                    </div>
                    <span className="text-white font-semibold">${dish.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Delivery Address */}
          <div className="flex items-center justify-between p-4 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-white font-medium">Delivery Address</div>
                <div className="text-gray-400 text-sm">123 Main Street, Anytown, USA 12345</div>
              </div>
            </div>
            <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-gray-700/50 p-2">
              Change
            </Button>
          </div>

          {/* Order Type Tabs */}
          <div className="flex gap-2 mb-4">
            <Button
              variant={orderType === "individual" ? "default" : "outline"}
              onClick={() => setOrderType("individual")}
              className={`flex-1 ${
                orderType === "individual" 
                  ? 'bg-gray-600 text-white border-gray-500' 
                  : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              Individual
            </Button>
            <Button
              variant={orderType === "group" ? "default" : "outline"}
              onClick={() => setOrderType("group")}
              className={`flex-1 ${
                orderType === "group" 
                  ? 'bg-gray-600 text-white border-gray-500' 
                  : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              Group Order
            </Button>
            <Button
              variant={orderType === "weekly" ? "default" : "outline"}
              onClick={() => setOrderType("weekly")}
              className={`flex-1 ${
                orderType === "weekly" 
                  ? 'bg-gray-600 text-white border-gray-500' 
                  : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              Weekly Plan
            </Button>
          </div>

          {/* Order Type Specific Content */}
          {orderType === "group" && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Group Order Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Number of Servings</label>
                  <Select value={groupOrderDetails.servings} onValueChange={(value) => 
                    setGroupOrderDetails(prev => ({...prev, servings: value}))
                  }>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white [&>svg]:text-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="4" className="text-white hover:bg-gray-600 focus:bg-gray-600">4</SelectItem>
                      <SelectItem value="6" className="text-white hover:bg-gray-600 focus:bg-gray-600">6</SelectItem>
                      <SelectItem value="8" className="text-white hover:bg-gray-600 focus:bg-gray-600">8</SelectItem>
                      <SelectItem value="10" className="text-white hover:bg-gray-600 focus:bg-gray-600">10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Delivery Date</label>
                  <input
                    type="date"
                    value={groupOrderDetails.deliveryDate}
                    onChange={(e) => setGroupOrderDetails(prev => ({...prev, deliveryDate: e.target.value}))}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {orderType === "weekly" && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Weekly Meal Plan</h3>
              <div className="space-y-3">
                <div>
                  <Select value={weeklyPlanDetails.mealsPerWeek} onValueChange={(value) => 
                    setWeeklyPlanDetails(prev => ({...prev, mealsPerWeek: value}))
                  }>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white [&>svg]:text-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="3 Meals/Week" className="text-white hover:bg-gray-600 focus:bg-gray-600">3 Meals/Week</SelectItem>
                      <SelectItem value="5 Meals/Week" className="text-white hover:bg-gray-600 focus:bg-gray-600">5 Meals/Week</SelectItem>
                      <SelectItem value="7 Meals/Week" className="text-white hover:bg-gray-600 focus:bg-gray-600">7 Meals/Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={weeklyPlanDetails.planType} onValueChange={(value) => 
                    setWeeklyPlanDetails(prev => ({...prev, planType: value}))
                  }>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white [&>svg]:text-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="Single" className="text-white hover:bg-gray-600 focus:bg-gray-600">Single</SelectItem>
                      <SelectItem value="Couple" className="text-white hover:bg-gray-600 focus:bg-gray-600">Couple</SelectItem>
                      <SelectItem value="Family" className="text-white hover:bg-gray-600 focus:bg-gray-600">Family</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {orderType === "individual" && (
            <div className="p-4 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-white font-medium">Delivery Schedule</span>
              </div>
              <div className="p-3 bg-blue-600/20 border border-blue-600 rounded-lg">
                <div className="text-white font-medium">ASAP Delivery</div>
                <div className="text-blue-400 text-sm">Within 3 hours</div>
              </div>
            </div>
          )}

          {/* Choose a Chef or Kitchen */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Choose a Chef or Kitchen</h3>
            <div className="space-y-3">
              {chefs.map((chef) => (
                <div 
                  key={chef.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    chef.selected 
                      ? 'bg-blue-600/20 border-blue-600' 
                      : 'bg-gray-800/90 border-gray-700 hover:border-gray-600'
                  }`}
                  onClick={() => toggleChefSelection(chef.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        chef.selected ? 'bg-blue-600' : 'bg-gray-600'
                      }`}>
                        {chef.avatar}
                      </div>
                      <div>
                        <div className="text-white font-medium">{chef.name}</div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-gray-300 text-sm">{chef.rating} ({chef.reviewCount}+)</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-white font-semibold">${chef.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Payment Method</h3>
            <div className="space-y-2">
              <Button className="w-full bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 h-12 justify-center">
                <div className="text-lg font-semibold">🍎 Pay</div>
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 justify-center">
                <div className="text-lg font-semibold">G Pay</div>
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700/50 h-12 justify-between"
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Credit or Debit Card</span>
                </div>
                <span>›</span>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-2 py-4">
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>${getSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Delivery Fee</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Taxes & Fees</span>
              <span>$0.00</span>
            </div>
            <div className="border-t border-gray-600 pt-2">
              <div className="flex justify-between text-white font-semibold text-lg">
                <span>Total</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white h-14 text-lg font-semibold">
            Place Order
          </Button>

        </div>
      </div>
    </div>
  );
}