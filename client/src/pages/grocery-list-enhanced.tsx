import { useState } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Minus, Trash2, Printer, ShoppingCart, Fish, Wheat, Apple, Salad, Carrot, Coffee, Milk, Cookie, Beef, Soup, Edit3, Save, FileText } from "lucide-react";

// Category definitions with icons
const categories = {
  meat: { name: "Meat & Poultry", icon: Beef, color: "text-red-400" },
  fish: { name: "Fish & Seafood", icon: Fish, color: "text-blue-400" },
  vegetables: { name: "Vegetables", icon: Carrot, color: "text-green-400" },
  fruits: { name: "Fruits", icon: Apple, color: "text-orange-400" },
  grains: { name: "Grains & Pasta", icon: Wheat, color: "text-yellow-400" },
  dairy: { name: "Dairy & Eggs", icon: Milk, color: "text-purple-400" },
  pantry: { name: "Pantry Items", icon: Coffee, color: "text-amber-400" }
};

// Enhanced grocery items with more variety
const mockGroceryItems = [
  { name: "Chicken Breast", quantity: "2 lbs", category: "meat", inPantry: false },
  { name: "Ground Turkey", quantity: "1 lb", category: "meat", inPantry: false },
  { name: "Lean Ground Beef", quantity: "1.5 lbs", category: "meat", inPantry: false },
  { name: "Salmon Fillet", quantity: "1.5 lbs", category: "fish", inPantry: false },
  { name: "Cod Fillets", quantity: "1 lb", category: "fish", inPantry: false },
  { name: "Shrimp", quantity: "1 bag", category: "fish", inPantry: false },
  { name: "Bell Peppers", quantity: "3 pieces", category: "vegetables", inPantry: false },
  { name: "Mixed Greens", quantity: "2 bags", category: "vegetables", inPantry: false },
  { name: "Tomatoes", quantity: "6 pieces", category: "vegetables", inPantry: false },
  { name: "Onions", quantity: "2 lbs", category: "vegetables", inPantry: false },
  { name: "Garlic", quantity: "1 bulb", category: "vegetables", inPantry: false },
  { name: "Spinach", quantity: "2 bags", category: "vegetables", inPantry: false },
  { name: "Broccoli", quantity: "2 heads", category: "vegetables", inPantry: false },
  { name: "Carrots", quantity: "2 lbs", category: "vegetables", inPantry: false },
  { name: "Bananas", quantity: "2 bunches", category: "fruits", inPantry: false },
  { name: "Apples", quantity: "8 pieces", category: "fruits", inPantry: false },
  { name: "Berries", quantity: "3 containers", category: "fruits", inPantry: false },
  { name: "Quinoa", quantity: "1 bag", category: "grains", inPantry: false },
  { name: "Brown Rice", quantity: "2 lbs", category: "grains", inPantry: false },
  { name: "Whole Wheat Pasta", quantity: "3 boxes", category: "grains", inPantry: false },
  { name: "Oats", quantity: "1 container", category: "grains", inPantry: false },
  { name: "Greek Yogurt", quantity: "4 containers", category: "dairy", inPantry: false },
  { name: "Eggs", quantity: "2 dozen", category: "dairy", inPantry: false },
  { name: "Milk", quantity: "1 gallon", category: "dairy", inPantry: false },
  { name: "Cheese", quantity: "2 blocks", category: "dairy", inPantry: false },
  { name: "Coconut Milk", quantity: "3 cans", category: "pantry", inPantry: false },
  { name: "Olive Oil", quantity: "1 bottle", category: "pantry", inPantry: false },
  { name: "Nuts & Seeds", quantity: "4 bags", category: "pantry", inPantry: false },
  { name: "Spices", quantity: "5 containers", category: "pantry", inPantry: false }
];

// Group items by category
const groupItemsByCategory = (items: any[]) => {
  const grouped: { [key: string]: any[] } = {};
  items.forEach(item => {
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category].push(item);
  });
  return grouped;
};

export default function GroceryListEnhanced() {
  const [, setLocation] = useLocation();
  const [groceryItems, setGroceryItems] = useLocalStorage<any[]>("nutragenie_grocery_items", mockGroceryItems);
  const [newItem, setNewItem] = useState({ name: "", quantity: "", category: "vegetables" });
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ name: string; quantity: string }>({ name: "", quantity: "" });

  const groupedItems = groupItemsByCategory(groceryItems);

  const handleAddItem = () => {
    if (newItem.name && newItem.quantity) {
      const newGroceryItem = {
        name: newItem.name,
        quantity: newItem.quantity,
        category: newItem.category,
        inPantry: false
      };
      setGroceryItems([...groceryItems, newGroceryItem]);
      setNewItem({ name: "", quantity: "", category: "vegetables" });
    }
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = groceryItems.filter((_, i) => i !== index);
    setGroceryItems(updatedItems);
  };

  const handleEditItem = (index: number) => {
    const item = groceryItems[index];
    setEditingItem(item.name);
    setEditValues({ name: item.name, quantity: item.quantity });
  };

  const handleSaveEdit = (index: number) => {
    const updatedItems = [...groceryItems];
    updatedItems[index] = {
      ...updatedItems[index],
      name: editValues.name,
      quantity: editValues.quantity
    };
    setGroceryItems(updatedItems);
    setEditingItem(null);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditValues({ name: "", quantity: "" });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleInstacart = () => {
    setLocation("/instacart");
  };

  const handleSave = () => {
    // Save to localStorage (already handled by useLocalStorage)
    alert("Grocery list saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => setLocation("/recipes")}
            className="text-white hover:text-purple-300 transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
            <p className="text-lg font-semibold text-purple-300 mt-1">Grocery List</p>
          </div>
          <div className="w-8"></div>
        </div>

        <div className="space-y-4">
          {/* Header with item count */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              Shopping List ({groceryItems.length} items)
            </h2>
            <div className="text-sm text-gray-400">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>

          {/* Grocery items by category */}
          <div className="space-y-4">
            {Object.entries(groupedItems).map(([categoryKey, items]) => {
              const category = categories[categoryKey as keyof typeof categories];
              if (!category || items.length === 0) return null;

              return (
                <Card key={categoryKey} className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg text-white">
                      <category.icon size={20} className={category.color} />
                      {category.name}
                      <Badge variant="secondary" className="ml-auto bg-purple-600/20 text-purple-300">
                        {items.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {items.map((item, index) => {
                        const globalIndex = groceryItems.findIndex(gi => gi.name === item.name);
                        const isEditing = editingItem === item.name;
                        
                        return (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                            <div className="flex-1">
                              {isEditing ? (
                                <div className="flex gap-2">
                                  <Input
                                    value={editValues.name}
                                    onChange={(e) => setEditValues({...editValues, name: e.target.value})}
                                    className="flex-1 bg-gray-600 border-gray-500 text-white"
                                    placeholder="Item name"
                                  />
                                  <Input
                                    value={editValues.quantity}
                                    onChange={(e) => setEditValues({...editValues, quantity: e.target.value})}
                                    className="w-24 bg-gray-600 border-gray-500 text-white"
                                    placeholder="Qty"
                                  />
                                </div>
                              ) : (
                                <div>
                                  <span className="font-medium text-white">{item.name}</span>
                                  <span className="text-sm text-gray-400 ml-2">{item.quantity}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {isEditing ? (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleSaveEdit(globalIndex)}
                                    className="text-green-400 hover:text-green-300 hover:bg-green-900/20"
                                  >
                                    <Save size={16} />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleCancelEdit}
                                    className="text-gray-400 hover:text-gray-300 hover:bg-gray-800/50"
                                  >
                                    ✕
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditItem(globalIndex)}
                                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                                  >
                                    <Edit3 size={16} />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteItem(globalIndex)}
                                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Add new item */}
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-white">Add New Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    placeholder="Item name"
                    className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Input
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                    placeholder="Quantity"
                    className="w-24 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  >
                    {Object.entries(categories).map(([key, category]) => (
                      <option key={key} value={key}>{category.name}</option>
                    ))}
                  </select>
                  <Button onClick={handleAddItem} className="px-4 bg-purple-600 hover:bg-purple-700">
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action buttons at bottom */}
          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
            >
              <Save size={16} />
              Save
            </Button>
            <Button 
              variant="outline" 
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
            >
              <Printer size={16} />
              Print
            </Button>
            <Button 
              variant="outline" 
              onClick={handleInstacart}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
            >
              <ShoppingCart size={16} />
              Instacart
            </Button>
          </div>
        </div>
        
        {/* Bottom spacing */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}