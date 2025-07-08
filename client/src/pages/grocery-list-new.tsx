import { useState } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FrameworkHeader } from "@/components/ui/framework-header";
import { Plus, Trash2, Printer, ShoppingCart, Fish, Wheat, Apple, Carrot, Coffee, Milk, Beef, Edit3, Save, Minus, FileText } from "lucide-react";

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
  { name: "Chicken Breast", quantity: "2 lbs", category: "meat", inPantry: false },
  { name: "Ground Turkey", quantity: "1 lb", category: "meat", inPantry: false },
  { name: "Salmon Fillet", quantity: "1.5 lbs", category: "fish", inPantry: false },
  { name: "Bell Peppers", quantity: "3 pieces", category: "vegetables", inPantry: false },
  { name: "Mixed Greens", quantity: "1 bag", category: "vegetables", inPantry: false },
  { name: "Tomatoes", quantity: "4 pieces", category: "vegetables", inPantry: false },
  { name: "Bananas", quantity: "1 bunch", category: "fruits", inPantry: false },
  { name: "Quinoa", quantity: "1 bag", category: "grains", inPantry: false },
  { name: "Red Lentils", quantity: "1 bag", category: "grains", inPantry: false },
  { name: "Greek Yogurt", quantity: "2 containers", category: "dairy", inPantry: false },
  { name: "Coconut Milk", quantity: "2 cans", category: "pantry", inPantry: false },
  { name: "Olive Oil", quantity: "1 bottle", category: "pantry", inPantry: false }
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

  // Handle save list
  const handleSaveList = () => {
    // Save grocery list to localStorage for Profile page access
    const savedLists = JSON.parse(localStorage.getItem("nutragenie_grocery_history") || "[]");
    const newList = {
      id: Date.now(),
      date: getCurrentDate(),
      items: groceryItems,
      totalItems: groceryItems.length
    };
    savedLists.unshift(newList); // Add to beginning of array
    localStorage.setItem("nutragenie_grocery_history", JSON.stringify(savedLists));
    alert("Grocery list saved to your profile!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <FrameworkHeader title="Grocery List" />

      {/* Content */}
      <div className="max-w-md mx-auto p-4 space-y-4 pb-20">
        {/* Date and Summary */}
        <div className="text-center">
          <p className="text-sm text-gray-600">{getCurrentDate()}</p>
          <p className="text-lg font-semibold text-purple-600">
            {userData?.nickname ? `${userData.nickname}'s Grocery List` : 'Grocery List'}
          </p>
          <Badge variant="secondary" className="mt-1">
            {groceryItems.length} total items
          </Badge>
        </div>

        {/* Categorized Items */}
        {Object.entries(categories).map(([categoryKey, categoryInfo]) => {
          const categoryItems = groupedItems[categoryKey] || [];
          if (categoryItems.length === 0) return null;
          
          const IconComponent = categoryInfo.icon;
          
          return (
            <Card key={categoryKey} className="bg-white border border-gray-200">
              <CardHeader className="pb-2 pt-3">
                <div className="flex items-center gap-2">
                  <IconComponent size={20} className={categoryInfo.color} />
                  <CardTitle className="text-base">{categoryInfo.name}</CardTitle>
                  <Badge variant="outline" className="ml-auto">
                    {categoryItems.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                {categoryItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 text-sm">{item.name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {editingItem === item.name ? (
                        <div className="flex items-center gap-1">
                          <Input
                            value={editQuantity}
                            onChange={(e) => setEditQuantity(e.target.value)}
                            className="w-20 h-8 text-center text-xs"
                            placeholder="Qty"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={saveEdit}
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                          >
                            <Save size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={cancelEdit}
                            className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                          >
                            <Minus size={14} />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <div className="min-w-16 text-center text-sm font-medium text-gray-600">
                            {item.quantity}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => startEdit(item.name, item.quantity)}
                            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                          >
                            <Edit3 size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeItem(item.name)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}

        {/* Add New Item */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="pb-2 pt-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Plus size={20} className="text-purple-600" />
              Add New Item
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Item name"
                className="h-10"
              />
              <Input
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(e.target.value)}
                placeholder="Quantity"
                className="h-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value)}
                className="flex-1 h-10 px-3 border border-gray-300 rounded-md bg-white text-sm"
              >
                {Object.entries(categories).map(([key, cat]) => (
                  <option key={key} value={key}>{cat.name}</option>
                ))}
              </select>
              <Button onClick={addNewItem} className="h-10 px-4 bg-purple-600 hover:bg-purple-700">
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button 
            onClick={handlePrint}
            variant="outline" 
            className="h-12 flex flex-col items-center justify-center gap-1 border-purple-200 hover:bg-purple-50"
          >
            <Printer size={18} className="text-purple-600" />
            <span className="text-xs">Print List</span>
          </Button>
          <Button 
            onClick={handleSaveList}
            variant="outline" 
            className="h-12 flex flex-col items-center justify-center gap-1 border-purple-200 hover:bg-purple-50"
          >
            <FileText size={18} className="text-purple-600" />
            <span className="text-xs">Save List</span>
          </Button>
          <Button 
            onClick={handleInstacart}
            className="h-12 flex flex-col items-center justify-center gap-1 bg-blue-500 text-white border-blue-500 hover:bg-blue-600 active:bg-purple-600 active:border-purple-600"
          >
            <ShoppingCart size={18} />
            <span className="text-xs">Instacart</span>
          </Button>
        </div>
      </div>
    </div>
  );
}