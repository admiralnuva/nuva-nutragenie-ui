import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/ui/back-button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus, Trash2, ShoppingCart, MapPin, Clock, CreditCard } from "lucide-react";

// Store options with different pricing multipliers
const stores = [
  { id: "wholefood", name: "Whole Foods Market", multiplier: 1.0, deliveryFee: 3.99 },
  { id: "safeway", name: "Safeway", multiplier: 0.85, deliveryFee: 2.99 },
  { id: "costco", name: "Costco", multiplier: 0.75, deliveryFee: 5.99 },
  { id: "walmart", name: "Walmart", multiplier: 0.70, deliveryFee: 1.99 }
];

// Base cart items with Whole Foods pricing
const baseCartItems = [
  { id: 1, name: "Chicken Breast", basePrice: 8.99, quantity: 2, unit: "lbs", inStock: true },
  { id: 2, name: "Mixed Greens", basePrice: 4.49, quantity: 1, unit: "bag", inStock: true },
  { id: 3, name: "Bell Peppers", basePrice: 1.99, quantity: 3, unit: "pieces", inStock: true },
  { id: 4, name: "Soy Sauce", basePrice: 3.29, quantity: 1, unit: "bottle", inStock: true },
  { id: 5, name: "Salmon Fillet", basePrice: 12.99, quantity: 1.5, unit: "lbs", inStock: true },
  { id: 6, name: "Quinoa", basePrice: 5.99, quantity: 1, unit: "bag", inStock: true },
  { id: 7, name: "Red Lentils", basePrice: 4.49, quantity: 1, unit: "bag", inStock: true },
  { id: 8, name: "Coconut Milk", basePrice: 2.99, quantity: 2, unit: "cans", inStock: true },
  { id: 9, name: "Ground Turkey", basePrice: 6.99, quantity: 1.5, unit: "lbs", inStock: true },
  { id: 10, name: "Breadcrumbs", basePrice: 2.49, quantity: 1, unit: "package", inStock: true },
  { id: 11, name: "Tomatoes", basePrice: 0.99, quantity: 6, unit: "pieces", inStock: true },
  { id: 12, name: "Cucumber", basePrice: 0.79, quantity: 2, unit: "pieces", inStock: true }
];

export default function InstacartScreen() {
  const [, setLocation] = useLocation();
  const [selectedStore, setSelectedStore] = useState("wholefood");
  const [cartItems, setCartItems] = useState(baseCartItems);
  const [serviceFee] = useState(5.00);
  const [tip, setTip] = useState(6.00);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber] = useState(`IC${Math.floor(Math.random() * 1000000)}`);

  // Get current store data
  const currentStore = stores.find(store => store.id === selectedStore)!;
  
  // Calculate price for each item based on selected store
  const getItemPrice = (basePrice: number) => {
    return basePrice * currentStore.multiplier;
  };

  // Update item quantity
  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 0) return;
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (getItemPrice(item.basePrice) * item.quantity), 0);
  const total = subtotal + currentStore.deliveryFee + serviceFee + tip;

  // Handle checkout
  const handleCheckout = () => {
    setOrderPlaced(true);
  };

  // If order is placed, show confirmation
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-600">Order Confirmed!</h2>
            <div className="space-y-2">
              <p className="text-lg font-semibold">Order #{orderNumber}</p>
              <p className="text-gray-600">Your order from {currentStore.name} has been placed successfully.</p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                <div className="flex items-center gap-2 text-green-700">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">Estimated Delivery: 1-2 hours</span>
                </div>
                <div className="flex items-center gap-2 text-green-700 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>123 Main Street, Apt 2B</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 mt-4">
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Items:</span>
                    <span>{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3 pt-4">
              <Button 
                onClick={() => setLocation("/profile")}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                View Order History
              </Button>
              <Button 
                variant="outline"
                onClick={() => setLocation("/home")}
                className="w-full"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <BackButton to="/grocery-list" />
            <div className="flex-1">
              <h1 className="text-xl font-bold text-green-600">Instacart</h1>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Items: {cartItems.length}</div>
              <div className="text-sm font-semibold">${total.toFixed(2)}</div>
            </div>
          </div>
          {/* Delivery Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-green-600" />
              <span>123 Main Street, Apt 2B</span>
              <Button variant="ghost" size="sm" className="text-green-600 h-6 px-2 text-xs">Edit</Button>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-green-600" />
              <span>Delivery in 1-2 hours (1:00-3:00 PM)</span>
              <Button variant="ghost" size="sm" className="text-green-600 h-6 px-2 text-xs">Change</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4 space-y-4 pb-20">
        {/* Cart Items */}
        <Card>
          <CardHeader className="pb-3 space-y-3">
            {/* Row 1: Store Selection */}
            <div>
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a store" />
                </SelectTrigger>
                <SelectContent>
                  {stores.map((store) => (
                    <SelectItem key={store.id} value={store.id}>
                      {store.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Row 2: Summary Info */}
            <div className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded-lg">
              <div className="flex gap-4">
                <span>Subtotal: ${subtotal.toFixed(2)}</span>
                <span>Delivery: ${currentStore.deliveryFee.toFixed(2)}</span>
                <span>Service: ${serviceFee.toFixed(2)}</span>
              </div>
            </div>

            {/* Row 3: Cart Title */}
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Your Cart ({cartItems.length} items)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{item.name}</div>
                  <div className="text-sm font-semibold text-green-600">
                    ${getItemPrice(item.basePrice).toFixed(2)} per {item.unit}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-7 w-7 p-0"
                    disabled={item.quantity <= 0}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <div className="w-10 text-center">
                    <Input
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseFloat(e.target.value) || 0)}
                      className="w-10 h-7 text-center text-xs p-1"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-7 w-7 p-0"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="h-7 w-7 p-0 text-red-500 hover:text-red-700 ml-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <div className="flex justify-between">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>${currentStore.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Fee</span>
              <span>${serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Tip</span>
              <div className="flex gap-1">
                <Button 
                  variant={tip === 4.00 ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setTip(4.00)}
                  className="h-7 px-2 text-xs"
                >
                  $4
                </Button>
                <Button 
                  variant={tip === 6.00 ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setTip(6.00)}
                  className="h-7 px-2 text-xs"
                >
                  $6
                </Button>
                <Button 
                  variant={tip === 8.00 ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setTip(8.00)}
                  className="h-7 px-2 text-xs"
                >
                  $8
                </Button>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <div className="flex-1">
                <div className="font-medium">•••• •••• •••• 4242</div>
                <div className="text-sm text-gray-600">Visa ending in 4242</div>
              </div>
              <Button variant="ghost" size="sm" className="text-green-600">Change</Button>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Button */}
        <Button 
          onClick={handleCheckout}
          className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg font-semibold"
        >
          Place Order • ${total.toFixed(2)}
        </Button>

        {/* Footer Info */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>By placing your order, you agree to Instacart's Terms of Service</p>
          <p>Estimated delivery: 1-2 hours</p>
        </div>
      </div>
    </div>
  );
}