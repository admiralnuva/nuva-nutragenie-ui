import { useState } from "react";
import { ChevronUp, ChevronDown, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

interface GroceryCategory {
  id: string;
  name: string;
  items: GroceryItem[];
  isExpanded: boolean;
}

export default function GroceryHubScreen() {
  const [activeTab, setActiveTab] = useState<'edit' | 'shop' | 'instacart'>('edit');
  const [newItemName, setNewItemName] = useState('');
  const [selectedCategoryForAdd, setSelectedCategoryForAdd] = useState<string>('');

  const [categories, setCategories] = useState<GroceryCategory[]>([
    {
      id: 'meat-poultry',
      name: 'Meat & Poultry',
      isExpanded: true,
      items: [
        { id: '1', name: 'Chicken Breast', quantity: 2, unit: 'lbs' },
        { id: '2', name: 'Ground Beef', quantity: 1, unit: 'lb' },
        { id: '3', name: 'Pork Chops', quantity: 4, unit: 'pieces' }
      ]
    },
    {
      id: 'fish-seafood',
      name: 'Fish & Seafood',
      isExpanded: true,
      items: [
        { id: '4', name: 'Salmon Fillet', quantity: 1, unit: 'lb' },
        { id: '5', name: 'Shrimp', quantity: 1, unit: 'bag' },
        { id: '6', name: 'Tuna', quantity: 2, unit: 'cans' }
      ]
    },
    {
      id: 'vegetables',
      name: 'Vegetables',
      isExpanded: false,
      items: [
        { id: '7', name: 'Bell Peppers', quantity: 3, unit: 'pieces' },
        { id: '8', name: 'Onions', quantity: 2, unit: 'pieces' },
        { id: '9', name: 'Carrots', quantity: 1, unit: 'bag' },
        { id: '10', name: 'Broccoli', quantity: 2, unit: 'heads' }
      ]
    },
    {
      id: 'dairy-eggs',
      name: 'Dairy & Eggs',
      isExpanded: false,
      items: [
        { id: '11', name: 'Milk', quantity: 1, unit: 'gallon' },
        { id: '12', name: 'Eggs', quantity: 1, unit: 'dozen' },
        { id: '13', name: 'Cheese', quantity: 2, unit: 'packs' },
        { id: '14', name: 'Greek Yogurt', quantity: 4, unit: 'cups' }
      ]
    },
    {
      id: 'grains-pasta',
      name: 'Grains & Pasta',
      isExpanded: false,
      items: [
        { id: '15', name: 'Brown Rice', quantity: 1, unit: 'bag' },
        { id: '16', name: 'Quinoa', quantity: 1, unit: 'box' },
        { id: '17', name: 'Whole Wheat Pasta', quantity: 2, unit: 'boxes' },
        { id: '18', name: 'Oats', quantity: 1, unit: 'container' }
      ]
    },
    {
      id: 'fruits',
      name: 'Fruits',
      isExpanded: false,
      items: [
        { id: '19', name: 'Bananas', quantity: 1, unit: 'bunch' },
        { id: '20', name: 'Apples', quantity: 6, unit: 'pieces' },
        { id: '21', name: 'Berries', quantity: 2, unit: 'containers' },
        { id: '22', name: 'Oranges', quantity: 4, unit: 'pieces' }
      ]
    },
    {
      id: 'legumes-beans',
      name: 'Legumes & Beans',
      isExpanded: false,
      items: [
        { id: '23', name: 'Black Beans', quantity: 3, unit: 'cans' },
        { id: '24', name: 'Chickpeas', quantity: 2, unit: 'cans' },
        { id: '25', name: 'Lentils', quantity: 1, unit: 'bag' },
        { id: '26', name: 'Kidney Beans', quantity: 2, unit: 'cans' }
      ]
    },
    {
      id: 'nuts-seeds',
      name: 'Nuts & Seeds',
      isExpanded: false,
      items: [
        { id: '27', name: 'Almonds', quantity: 1, unit: 'bag' },
        { id: '28', name: 'Walnuts', quantity: 1, unit: 'bag' },
        { id: '29', name: 'Chia Seeds', quantity: 1, unit: 'container' },
        { id: '30', name: 'Peanut Butter', quantity: 1, unit: 'jar' }
      ]
    },
    {
      id: 'condiments-seasonings',
      name: 'Condiments & Seasonings',
      isExpanded: false,
      items: [
        { id: '31', name: 'Olive Oil', quantity: 1, unit: 'bottle' },
        { id: '32', name: 'Salt', quantity: 1, unit: 'container' },
        { id: '33', name: 'Black Pepper', quantity: 1, unit: 'container' },
        { id: '34', name: 'Garlic Powder', quantity: 1, unit: 'container' }
      ]
    },
    {
      id: 'pantry-staples',
      name: 'Pantry Staples',
      isExpanded: false,
      items: [
        { id: '35', name: 'Flour', quantity: 1, unit: 'bag' },
        { id: '36', name: 'Sugar', quantity: 1, unit: 'bag' },
        { id: '37', name: 'Baking Powder', quantity: 1, unit: 'container' },
        { id: '38', name: 'Vanilla Extract', quantity: 1, unit: 'bottle' }
      ]
    }
  ]);

  const toggleCategory = (categoryId: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { ...cat, isExpanded: !cat.isExpanded }
        : cat
    ));
  };

  const updateQuantity = (categoryId: string, itemId: string, change: number) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? {
            ...cat,
            items: cat.items.map(item => 
              item.id === itemId 
                ? { ...item, quantity: Math.max(0, item.quantity + change) }
                : item
            )
          }
        : cat
    ));
  };

  const deleteItem = (categoryId: string, itemId: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? {
            ...cat,
            items: cat.items.filter(item => item.id !== itemId)
          }
        : cat
    ));
  };

  const addCustomItem = () => {
    if (!newItemName.trim() || !selectedCategoryForAdd) return;

    const newItem: GroceryItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      quantity: 1,
      unit: 'piece'
    };

    setCategories(prev => prev.map(cat => 
      cat.id === selectedCategoryForAdd 
        ? {
            ...cat,
            items: [...cat.items, newItem]
          }
        : cat
    ));

    setNewItemName('');
    setSelectedCategoryForAdd('');
  };

  const handleSave = () => {
    console.log('Saving grocery list:', categories);
    // API call to save grocery list
  };

  const handleAddToInstacart = () => {
    console.log('Adding to Instacart:', categories);
    // Navigate to Instacart integration
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
        </div>
        <div className="flex items-center justify-center mt-1">
          <h2 className="text-lg font-semibold text-purple-300">Grocery Hub</h2>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="px-6 py-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'edit'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Edit List
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'shop'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Shop
          </button>
          <button
            onClick={() => setActiveTab('instacart')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'instacart'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Instacart
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-6 pb-24 overflow-y-auto">
        {activeTab === 'edit' && (
          <div className="space-y-4">
            {/* Category Cards */}
            {categories.map((category) => (
              <div key={category.id} className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-800 hover:bg-gray-750 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                  {category.isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {/* Category Content */}
                {category.isExpanded && (
                  <div className="p-6 space-y-3">
                    {category.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
                        <div className="flex-1">
                          <span className="text-white font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(category.id, item.id, -1)}
                              className="w-8 h-8 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-4 h-4 text-white" />
                            </button>
                            <span className="text-white min-w-[3rem] text-center">
                              {item.quantity} {item.unit}
                            </span>
                            <button
                              onClick={() => updateQuantity(category.id, item.id, 1)}
                              className="w-8 h-8 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-4 h-4 text-white" />
                            </button>
                          </div>
                          {/* Delete Button */}
                          <button
                            onClick={() => deleteItem(category.id, item.id)}
                            className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Add Custom Item to Category */}
                    <div className="mt-4 p-4 bg-gray-600 rounded-lg">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add custom ingredient..."
                          value={selectedCategoryForAdd === category.id ? newItemName : ''}
                          onChange={(e) => {
                            setNewItemName(e.target.value);
                            setSelectedCategoryForAdd(category.id);
                          }}
                          className="flex-1 bg-gray-700 border-gray-600 text-white"
                        />
                        <button
                          onClick={addCustomItem}
                          disabled={!newItemName.trim() || selectedCategoryForAdd !== category.id}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 mb-8">
              <Button 
                onClick={handleSave}
                className="flex-1 bg-green-600 hover:bg-green-500 text-white py-4 text-lg font-semibold"
              >
                Save
              </Button>
              <Button 
                onClick={handleAddToInstacart}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 text-lg font-semibold"
              >
                Add to Instacart
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'shop' && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-white mb-2">Shop View</h3>
            <p className="text-gray-400">Coming soon - In-store shopping experience</p>
          </div>
        )}

        {activeTab === 'instacart' && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-white mb-2">Instacart Integration</h3>
            <p className="text-gray-400">Coming soon - Full Instacart shopping experience</p>
          </div>
        )}
      </div>
    </div>
  );
}