import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Minus, Trash2, Printer, ShoppingCart } from "lucide-react";

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
    // This would integrate with Instacart API in real implementation
    alert("Instacart integration coming soon!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <BackButton to="/review-recipes" />
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">NutraGenie</h1>
              <p className="text-sm text-gray-600">Grocery List</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Date and Summary */}
        <Card>
          <CardContent className="pt-3 pb-3">
            <div className="text-center">
              <h2 className="font-semibold text-gray-800">Shopping List</h2>
              <p className="text-sm text-gray-600">{getCurrentDate()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Grocery Items */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Items</CardTitle>
              <Badge variant="secondary" className="text-sm px-2 py-1">
                {groceryItems.length} items
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-1">
            {groceryItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 py-1 border-b border-gray-100 last:border-b-0">
                <div className="flex-1 min-w-0">
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
        <Card>
          <CardContent className="pt-3 pb-3">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-800 text-sm">Add Custom Item</h3>
              <div className="flex gap-2">
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
                  className="h-8 w-8 p-0 bg-brand-green-500 hover:bg-brand-green-600 text-white"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons - Moved to Bottom */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handlePrint}
          >
            <Printer className="w-4 h-4" />
            Print List
          </Button>
          <Button 
            className="bg-brand-green-500 hover:bg-brand-green-600 text-white flex items-center gap-2"
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