import { BackButton } from "@/components/ui/back-button";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Clock, Star, MapPin, Truck } from "lucide-react";

export default function TakeOutScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-3">
        <BackButton to="/recipes" />
        <h1 className="text-lg font-semibold text-gray-800">NutraGenie Take-Out</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Coming Soon Banner */}
        <Card className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <h2 className="text-xl font-bold mb-2">Cloud Kitchen Network</h2>
          <p className="text-blue-100">Order from local chefs who love to cook!</p>
        </Card>

        {/* Location */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <MapPin className="text-gray-600" size={20} />
            <div>
              <div className="font-medium text-gray-800">Delivery Location</div>
              <div className="text-sm text-gray-600">Downtown, San Francisco</div>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              Change
            </Button>
          </div>
        </Card>

        {/* Featured Cloud Kitchens */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Featured Kitchens</h3>
          <div className="space-y-3">
            {[
              {
                name: "Chef Maria's Kitchen",
                specialty: "Mediterranean Fusion",
                rating: 4.8,
                deliveryTime: "25-35 min",
                badge: "Popular"
              },
              {
                name: "Healthy Bowls Co.",
                specialty: "Plant-Based Bowls",
                rating: 4.6,
                deliveryTime: "30-40 min",
                badge: "New"
              },
              {
                name: "Spice Route",
                specialty: "Indian Cuisine",
                rating: 4.9,
                deliveryTime: "20-30 min",
                badge: "Fastest"
              }
            ].map((kitchen, index) => (
              <Card key={index} className="p-4 opacity-75">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-red-200 rounded-lg flex items-center justify-center">
                    👨‍🍳
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-800">{kitchen.name}</h4>
                      <Badge variant="outline">{kitchen.badge}</Badge>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">{kitchen.specialty}</div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-current" />
                        <span>{kitchen.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{kitchen.deliveryTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Orders</h3>
          <Card className="p-4">
            <div className="text-center text-gray-500">
              <ShoppingBag size={40} className="mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No orders yet</p>
              <p className="text-xs text-gray-400">Your order history will appear here</p>
            </div>
          </Card>
        </div>

        {/* Features Preview */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Coming Features</h3>
          <div className="space-y-3">
            <Card className="p-4 opacity-75">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Truck className="text-green-600" size={20} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Real-time Tracking</div>
                  <div className="text-sm text-gray-600">Track your order from kitchen to doorstep</div>
                </div>
                <Badge variant="outline">Soon</Badge>
              </div>
            </Card>

            <Card className="p-4 opacity-75">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  🎯
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Custom Orders</div>
                  <div className="text-sm text-gray-600">Request recipes from your generated collection</div>
                </div>
                <Badge variant="outline">Soon</Badge>
              </div>
            </Card>

            <Card className="p-4 opacity-75">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  💰
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Chef Marketplace</div>
                  <div className="text-sm text-gray-600">Connect with local home chefs</div>
                </div>
                <Badge variant="outline">Soon</Badge>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-20 flex-col gap-2" disabled>
            🔍
            <span className="text-sm">Browse Menus</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2" disabled>
            ⭐
            <span className="text-sm">Favorite Chefs</span>
          </Button>
        </div>
      </div>
    </div>
  );
}