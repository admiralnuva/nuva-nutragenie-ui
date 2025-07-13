import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Minus, X } from "lucide-react";

interface IngredientItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  category: string;
}

export default function GroceryListEnhanced() {
  const [selectedMode, setSelectedMode] = useState<"edit" | "shop" | "order" | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<{[key: string]: boolean}>({});
  const [groceryList, setGroceryList] = useState<IngredientItem[]>([
    { id: 1, name: "Milk", quantity: 1, unit: "gallon", category: "Dairy & Eggs" },
    { id: 2, name: "Bread", quantity: 2, unit: "loaves", category: "Grains & Pasta" },
    { id: 3, name: "Chicken Breast", quantity: 2, unit: "lbs", category: "Meat" },
    { id: 4, name: "Bananas", quantity: 6, unit: "pieces", category: "Fruits" },
    { id: 5, name: "Tomatoes", quantity: 4, unit: "pieces", category: "Vegetables" }
  ]);

  // Dummy pantry data
  const pantryIngredients = {
    "Meat": ["Chicken Breast", "Ground Beef", "Salmon", "Turkey"],
    "Vegetables": ["Bell Peppers", "Onions", "Carrots", "Broccoli", "Spinach"],
    "Dairy & Eggs": ["Milk", "Cheese", "Eggs", "Butter", "Yogurt"],
    "Grains & Pasta": ["Rice", "Pasta", "Bread", "Quinoa", "Oats"],
    "Fruits": ["Bananas", "Apples", "Oranges", "Berries", "Avocado"]
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromList(id);
      return;
    }
    setGroceryList(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromList = (id: number) => {
    setGroceryList(prev => prev.filter(item => item.id !== id));
  };

  const addToGroceryList = (ingredient: string, category: string) => {
    const newId = Math.max(...groceryList.map(item => item.id), 0) + 1;
    const newItem: IngredientItem = {
      id: newId,
      name: ingredient,
      quantity: 1,
      unit: "piece",
      category: category
    };
    setGroceryList(prev => [...prev, newItem]);
  };

  const groupedGroceryList = groceryList.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
    return groups;
  }, {} as {[key: string]: IngredientItem[]});

  const handleSave = () => {
    setSelectedMode(null);
    // Add save logic here
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen">
      {/* Header - No back button as requested */}
      <div className="bg-gray-900 border-b border-gray-700 p-4">
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
            <p className="text-lg font-semibold text-purple-600 mt-1">Groceries & Shopping</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Card 1 - Ingredients in your pantry */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 border-l-4 border-l-green-500 p-6 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 hover:scale-[1.02] hover:border-l-green-400">
          <h2 className="text-xl font-bold text-white mb-4 text-center">Ingredients in your pantry</h2>
          <div className="space-y-4">
            {Object.entries(pantryIngredients).map(([category, ingredients]) => (
              <div key={category}>
                <h3 className="text-yellow-300 font-semibold mb-2">{category}:</h3>
                <p className="text-gray-300 text-sm">{ingredients.join(", ")}</p>
                <hr className="border-gray-600 mt-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Card 2 - Manage Grocery & shopping */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 border-l-4 border-l-blue-500 p-6 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] hover:border-l-blue-400">
          <h2 className="text-xl font-bold text-white mb-4 text-center">Manage Grocery & shopping</h2>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setSelectedMode(selectedMode === "edit" ? null : "edit")}
              className={`p-4 rounded-lg border text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                selectedMode === "edit"
                  ? "bg-blue-700 text-white border-blue-600 shadow-lg shadow-blue-500/40"
                  : "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/30"
              }`}
            >
              Edit List
            </button>
            <button
              onClick={() => setSelectedMode(selectedMode === "shop" ? null : "shop")}
              className={`p-4 rounded-lg border text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                selectedMode === "shop"
                  ? "bg-blue-700 text-white border-blue-600 shadow-lg shadow-blue-500/40"
                  : "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/30"
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => setSelectedMode(selectedMode === "order" ? null : "order")}
              className={`p-4 rounded-lg border text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                selectedMode === "order"
                  ? "bg-blue-700 text-white border-blue-600 shadow-lg shadow-blue-500/40"
                  : "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/30"
              }`}
            >
              Order
            </button>
          </div>
        </Card>

        {/* Card 3 - Review Grocery List (appears when Edit List is selected) */}
        {selectedMode === "edit" && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 border-l-4 border-l-indigo-500 p-6 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:scale-[1.02] hover:border-l-indigo-400">
            <h2 className="text-xl font-bold text-white mb-4 text-center">Review Grocery List</h2>
            
            {/* Current Grocery List */}
            <div className="space-y-4 mb-6">
              <h3 className="text-yellow-300 font-semibold">Current Items:</h3>
              {Object.entries(groupedGroceryList).map(([category, items]) => (
                <div key={category} className="space-y-2">
                  <h4 className="text-purple-300 font-medium">{category}</h4>
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
                      <span className="text-gray-300">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Minus size={16} className="text-white" />
                        </button>
                        <span className="text-white min-w-[60px] text-center">
                          {item.quantity} {item.unit}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Plus size={16} className="text-white" />
                        </button>
                        <button
                          onClick={() => removeFromList(item.id)}
                          className="w-8 h-8 bg-gray-600 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors ml-2"
                        >
                          <X size={16} className="text-white" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Add New Ingredients */}
            <div className="space-y-4 mb-6">
              <h3 className="text-yellow-300 font-semibold">Add from Pantry Categories:</h3>
              {Object.entries(pantryIngredients).map(([category, ingredients]) => (
                <div key={category} className="space-y-2">
                  <h4 className="text-purple-300 font-medium">{category}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {ingredients.map((ingredient) => {
                      const isInList = groceryList.some(item => item.name === ingredient);
                      return (
                        <button
                          key={ingredient}
                          onClick={() => !isInList && addToGroceryList(ingredient, category)}
                          disabled={isInList}
                          className={`p-2 rounded-lg text-sm transition-all duration-200 ${
                            isInList
                              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105"
                          }`}
                        >
                          {isInList ? "✓ Added" : `+ ${ingredient}`}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Save Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold"
              >
                Save Grocery List
              </Button>
            </div>
          </Card>
        )}

        {/* Placeholder cards for Shop and Order modes */}
        {selectedMode === "shop" && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 border-l-4 border-l-yellow-500 p-6">
            <h2 className="text-xl font-bold text-white mb-4 text-center">Shopping Options</h2>
            <p className="text-gray-300 text-center">Shop functionality coming soon...</p>
          </Card>
        )}

        {selectedMode === "order" && (
          <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 border-l-4 border-l-orange-500 p-6">
            <h2 className="text-xl font-bold text-white mb-4 text-center">Order Options</h2>
            <p className="text-gray-300 text-center">Order functionality coming soon...</p>
          </Card>
        )}
      </div>
    </div>
  );
}