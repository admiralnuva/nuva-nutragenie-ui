import { useState } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { FrameworkHeader } from "@/components/ui/framework-header";
import { ArrowLeft, Plus, Minus, Trash2, Printer, ShoppingCart, Fish, Wheat, Apple, Salad, Carrot, Coffee, Milk, Cookie, Beef, Soup, Edit3, Save, FileText } from "lucide-react";

// Category definitions with icons
const categories = {
  meat: { name: "Meat & Poultry", icon: Beef, color: "text-red-600" },
  fish: { name: "Fish & Seafood", icon: Fish, color: "text-blue-600" },
  vegetables: { name: "Vegetables", icon: Carrot, color: "text-green-600" },
  fruits: { name: "Fruits", icon: Apple, color: "text-orange-600" },
  grains: { name: "Grains & Pasta", icon: Wheat, color: "text-yellow-600" },
  dairy: { name: "Dairy & Eggs", icon: Milk, color: "text-purple-600" },
  pantry: { name: "Pantry Items", icon: Coffee, color: "text-amber-600" }
};

// Mock grocery items organized by category
const mockGroceryItems = [
  {
    name: "Chicken Breast",
    quantity: "2 lbs",
    category: "meat",
    inPantry: false
  },
  {
    name: "Ground Turkey",
    quantity: "1 lb",
    category: "meat",
    inPantry: false
  },
  {
    name: "Salmon Fillet",
    quantity: "1.5 lbs",
    category: "fish",
    inPantry: false
  },
  {
    name: "Bell Peppers",
    quantity: "3 pieces",
    category: "vegetables",
    inPantry: false
  },
  {
    name: "Mixed Greens",
    quantity: "1 bag",
    category: "vegetables",
    inPantry: false
  },
  {
    name: "Tomatoes",
    quantity: "4 pieces",
    category: "vegetables",
    inPantry: false
  },
  {
    name: "Bananas",
    quantity: "1 bunch",
    category: "fruits",
    inPantry: false
  },
  {
    name: "Quinoa",
    quantity: "1 bag",
    category: "grains",
    inPantry: false
  },
  {
    name: "Red Lentils",
    quantity: "1 bag",
    category: "grains",
    inPantry: false
  },
  {
    name: "Greek Yogurt",
    quantity: "2 containers",
    category: "dairy",
    inPantry: false
  },
  {
    name: "Coconut Milk",
    quantity: "2 cans",
    category: "pantry",
    inPantry: false
  },
  {
    name: "Olive Oil",
    quantity: "1 bottle",
    category: "pantry",
    inPantry: false
  }
];

// Group items by category
const groupItemsByCategory = (items: any[]) => {
  const grouped: any = {};
  
  Object.keys(categories).forEach(categoryKey => {
    grouped[categoryKey] = items.filter(item => item.category === categoryKey);
  });
  
  return grouped;
};

export default function GroceryListScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage<any>("nutragenie_user", null);
  const [tempUser] = useLocalStorage<any>("nutragenie_temp_user", null);
  
  // Get user data - check both current and temp user
  const userData = currentUser || tempUser;
  
  const [groceryItems, setGroceryItems] = useState(mockGroceryItems);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("pantry");
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState("");
  
  // Group items by category
  const groupedItems = groupItemsByCategory(groceryItems);

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
        category: newItemCategory,
        inPantry: false
      };
      setGroceryItems(prev => [...prev, newItem]);
      setNewItemName("");
      setNewItemQuantity("");
    }
  };

  // Start editing item
  const startEdit = (itemName: string, currentQuantity: string) => {
    setEditingItem(itemName);
    setEditQuantity(currentQuantity);
  };

  // Save edit
  const saveEdit = () => {
    if (editingItem && editQuantity.trim()) {
      updateQuantity(editingItem, editQuantity);
      setEditingItem(null);
      setEditQuantity("");
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingItem(null);
    setEditQuantity("");
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
        <div className="text-lg font-semibold text-purple-600 text-center">
          {userData?.nickname ? `${userData.nickname}'s Grocery List` : 'Grocery List'}
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