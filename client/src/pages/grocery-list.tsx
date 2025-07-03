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
    quantity: "3 large",
    nutrition: { calories: 37, protein: 1 },
    dishes: ["Vegetable Stir Fry"],
    inPantry: false
  },
  {
    name: "Soy Sauce",
    quantity: "3 tbsp",
    nutrition: { calories: 11, protein: 2 },
    dishes: ["Vegetable Stir Fry"],
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
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-semibold text-gray-800">Shopping List</h2>
                <p className="text-sm text-gray-600">{getCurrentDate()}</p>
              </div>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {groceryItems.length} items
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
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
          </CardContent>
        </Card>

        {/* Grocery Items */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Items</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {groceryItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{item.name}</div>
                  <div className="text-sm text-gray-600">
                    For: {item.dishes.join(", ")}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.nutrition.calories} cal • {item.nutrition.protein}g protein
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.name, e.target.value)}
                    className="w-20 h-8 text-center text-sm"
                    placeholder="Qty"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.name)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {groceryItems.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No items in your grocery list</p>
                <p className="text-sm">Add items below or go back to select recipes</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add New Item */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Add Custom Item</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <div className="space-y-2">
              <Input
                placeholder="Item name (e.g., Bananas)"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
              <Input
                placeholder="Quantity (e.g., 6 pieces)"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(e.target.value)}
              />
            </div>
            <Button 
              onClick={addNewItem}
              disabled={!newItemName.trim() || !newItemQuantity.trim()}
              className="w-full bg-brand-green-500 hover:bg-brand-green-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}