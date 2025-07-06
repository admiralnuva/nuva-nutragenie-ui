import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Minus, Trash2, Printer, ShoppingCart, Fish, Wheat, Apple, Salad, Carrot, Coffee, Milk, Cookie, Beef, Soup } from "lucide-react";

// Mock grocery items (this would come from the review-recipes page in real implementation)
const mockGroceryItems = [
  {
    name: "Chicken Breast",
    quantity: "2 lbs",
    nutrition: { calories: 540, protein: 101 },
    dishes: ["Grilled Chicken Salad"],
    inPantry: false
  },
  {
    name: "Mixed Greens",
    quantity: "1 bag",
    nutrition: { calories: 20, protein: 2 },
    dishes: ["Grilled Chicken Salad"],
    inPantry: false
  },
  {
    name: "Bell Peppers",
    quantity: "3 pieces",
    nutrition: { calories: 37, protein: 1 },
    dishes: ["Vegetable Stir Fry"],
    inPantry: false
  },
  {
    name: "Soy Sauce",
    quantity: "1 bottle",
    nutrition: { calories: 11, protein: 2 },
    dishes: ["Vegetable Stir Fry"],
    inPantry: false
  },
  {
    name: "Salmon Fillet",
    quantity: "1.5 lbs",
    nutrition: { calories: 412, protein: 58 },
    dishes: ["Salmon with Quinoa"],
    inPantry: false
  },
  {
    name: "Quinoa",
    quantity: "1 bag",
    nutrition: { calories: 626, protein: 24 },
    dishes: ["Salmon with Quinoa"],
    inPantry: false
  },
  {
    name: "Red Lentils",
    quantity: "1 bag",
    nutrition: { calories: 679, protein: 49 },
    dishes: ["Lentil Curry"],
    inPantry: false
  },
  {
    name: "Coconut Milk",
    quantity: "2 cans",
    nutrition: { calories: 445, protein: 5 },
    dishes: ["Lentil Curry"],
    inPantry: false
  },
  {
    name: "Ground Turkey",
    quantity: "1.5 lbs",
    nutrition: { calories: 640, protein: 89 },
    dishes: ["Turkey Meatballs"],
    inPantry: false
  },
  {
    name: "Breadcrumbs",
    quantity: "1 package",
    nutrition: { calories: 110, protein: 4 },
    dishes: ["Turkey Meatballs"],
    inPantry: false
  },
  {
    name: "Tomatoes",
    quantity: "6 pieces",
    nutrition: { calories: 22, protein: 1 },
    dishes: ["Garden Salad"],
    inPantry: false
  },
  {
    name: "Cucumber",
    quantity: "2 pieces",
    nutrition: { calories: 16, protein: 1 },
    dishes: ["Garden Salad"],
    inPantry: false
  }
];

// Function to get appropriate icon for ingredient
const getIngredientIcon = (ingredientName: string) => {
  const name = ingredientName.toLowerCase();
  
  if (name.includes('chicken') || name.includes('beef') || name.includes('meat')) {
    return <Beef className="w-4 h-4 text-orange-600" />;
  } else if (name.includes('salmon') || name.includes('fish') || name.includes('tuna')) {
    return <Fish className="w-4 h-4 text-blue-600" />;
  } else if (name.includes('greens') || name.includes('lettuce') || name.includes('salad')) {
    return <Salad className="w-4 h-4 text-green-600" />;
  } else if (name.includes('pepper') || name.includes('carrot') || name.includes('cucumber') || name.includes('tomato')) {
    return <Carrot className="w-4 h-4 text-orange-500" />;
  } else if (name.includes('quinoa') || name.includes('rice') || name.includes('grain') || name.includes('bread')) {
    return <Wheat className="w-4 h-4 text-amber-600" />;
  } else if (name.includes('apple') || name.includes('fruit') || name.includes('berry')) {
    return <Apple className="w-4 h-4 text-red-500" />;
  } else if (name.includes('milk') || name.includes('cheese') || name.includes('yogurt')) {
    return <Milk className="w-4 h-4 text-blue-400" />;
  } else if (name.includes('sauce') || name.includes('oil') || name.includes('dressing')) {
    return <Soup className="w-4 h-4 text-brown-600" />;
  } else if (name.includes('nuts') || name.includes('seeds') || name.includes('snack')) {
    return <Cookie className="w-4 h-4 text-yellow-600" />;
  } else {
    return <Coffee className="w-4 h-4 text-gray-600" />;
  }
};

export default function GroceryListScreen() {
  const [, setLocation] = useLocation();
  const [groceryItems, setGroceryItems] = useState(mockGroceryItems);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");

  // Get current date
  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Update item quantity
  const updateQuantity = (itemName: string, newQuantity: string) => {
    setGroceryItems(prev => 
      prev.map(item => 
        item.name === itemName 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Remove item
  const removeItem = (itemName: string) => {
    setGroceryItems(prev => prev.filter(item => item.name !== itemName));
  };

  // Add new item
  const addNewItem = () => {
    if (newItemName.trim() && newItemQuantity.trim()) {
      const newItem = {
        name: newItemName,
        quantity: newItemQuantity,
        nutrition: { calories: 0, protein: 0 },
        dishes: ["Custom"],
        inPantry: false
      };
      setGroceryItems(prev => [...prev, newItem]);
      setNewItemName("");
      setNewItemQuantity("");
    }
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Handle Instacart
  const handleInstacart = () => {
    setLocation("/instacart");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <BackButton to="/review-recipes" />
            <div className="flex-1 text-center">
              <h1 className="text-xl font-bold text-gray-900">NutraGenie</h1>
            </div>
            <div className="w-8"></div>
          </div>
        </div>
      </div>

      {/* Page Title */}
      <div className="max-w-md mx-auto px-4 pb-2">
        <div className="text-lg font-semibold text-brand-indigo-600 text-center">
          Grocery List
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4 space-y-3 pb-20">
        {/* Grocery Items */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Items</CardTitle>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">{getCurrentDate()}</p>
                <span className="text-sm text-gray-600">
                  {groceryItems.length} items
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-1">
            {groceryItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 py-1 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getIngredientIcon(item.name)}
                  <div className="font-medium text-gray-800 text-sm truncate">{item.name}</div>
                </div>
                <div className="flex items-center gap-1">
                  <Input
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.name, e.target.value)}
                    className="w-16 h-7 text-center text-xs"
                    placeholder="Qty"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.name)}
                    className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}

            {groceryItems.length === 0 && (
              <div className="text-center text-gray-500 py-4">
                <p className="text-sm">No items in your grocery list</p>
                <p className="text-xs">Add items below or go back to select recipes</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add New Item */}
        <div className="flex items-center gap-2 p-3 bg-white/60 backdrop-blur-sm border border-white/30 rounded-lg shadow-md">
          <span className="text-sm text-gray-700">Add</span>
          <Input
            placeholder="Item name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="flex-1 h-8 text-sm"
          />
          <Input
            placeholder="Qty"
            value={newItemQuantity}
            onChange={(e) => setNewItemQuantity(e.target.value)}
            className="w-20 h-8 text-sm"
          />
          <Button 
            onClick={addNewItem}
            disabled={!newItemName.trim() || !newItemQuantity.trim()}
            className="h-8 w-8 p-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Action Buttons - Moved to Bottom */}
        <div className="grid grid-cols-2 gap-3 pt-4 pb-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handlePrint}
          >
            <Printer className="w-4 h-4" />
            Print Grocery List
          </Button>
          <Button 
            className="flex items-center gap-2"
            onClick={handleInstacart}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Instacart
          </Button>
        </div>
      </div>
    </div>
  );
}