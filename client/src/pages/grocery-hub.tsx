import { useState } from "react";
import { ChevronUp, ChevronDown, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  purchased?: boolean;
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
  const [selectedStore, setSelectedStore] = useState<string>('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Store options
  const stores = [
    'Whole Foods Market',
    'Safeway',
    'Kroger',
    'Lucky Supermarkets',
    'Target',
    'Walmart Grocery',
    'Sprouts Farmers Market'
  ];

  // Instacart items with prices - grouped by category
  const instacartItems = [
    { id: '1', name: 'Chicken Breast', quantity: 2, unit: 'lbs', price: 8.99, category: 'Meat & Poultry' },
    { id: '2', name: 'Ground Beef', quantity: 1, unit: 'lb', price: 6.49, category: 'Meat & Poultry' },
    { id: '4', name: 'Salmon Fillet', quantity: 1, unit: 'lb', price: 12.99, category: 'Fish & Seafood' },
    { id: '5', name: 'Shrimp', quantity: 1, unit: 'bag', price: 9.99, category: 'Fish & Seafood' },
    { id: '7', name: 'Bell Peppers', quantity: 3, unit: 'pieces', price: 4.29, category: 'Vegetables' },
    { id: '8', name: 'Onions', quantity: 2, unit: 'pieces', price: 2.99, category: 'Vegetables' },
    { id: '9', name: 'Carrots', quantity: 1, unit: 'bag', price: 2.49, category: 'Vegetables' },
    { id: '11', name: 'Milk', quantity: 1, unit: 'gallon', price: 4.99, category: 'Dairy & Eggs' },
    { id: '12', name: 'Eggs', quantity: 1, unit: 'dozen', price: 3.49, category: 'Dairy & Eggs' },
    { id: '15', name: 'Brown Rice', quantity: 1, unit: 'bag', price: 3.99, category: 'Grains & Pasta' },
    { id: '19', name: 'Bananas', quantity: 1, unit: 'bunch', price: 2.29, category: 'Fruits' },
    { id: '23', name: 'Black Beans', quantity: 3, unit: 'cans', price: 4.47, category: 'Legumes & Beans' },
    { id: '27', name: 'Almonds', quantity: 1, unit: 'bag', price: 6.99, category: 'Nuts & Seeds' },
    { id: '31', name: 'Olive Oil', quantity: 1, unit: 'bottle', price: 7.99, category: 'Condiments & Seasonings' },
    { id: '35', name: 'Flour', quantity: 1, unit: 'bag', price: 2.99, category: 'Pantry Staples' }
  ];

  const [instacartCart, setInstacartCart] = useState(instacartItems);

  // Shop screen state - dummy data from each category
  const [shopCategories, setShopCategories] = useState<GroceryCategory[]>([
    {
      id: 'meat-poultry',
      name: 'Meat & Poultry',
      isExpanded: true,
      items: [
        { id: '1', name: 'Chicken Breast', quantity: 2, unit: 'lbs', purchased: false },
        { id: '2', name: 'Ground Beef', quantity: 1, unit: 'lb', purchased: false }
      ]
    },
    {
      id: 'fish-seafood',
      name: 'Fish & Seafood',
      isExpanded: false,
      items: [
        { id: '4', name: 'Salmon Fillet', quantity: 1, unit: 'lb', purchased: false }
      ]
    },
    {
      id: 'vegetables',
      name: 'Vegetables',
      isExpanded: false,
      items: [
        { id: '7', name: 'Bell Peppers', quantity: 3, unit: 'pieces', purchased: false },
        { id: '8', name: 'Onions', quantity: 2, unit: 'pieces', purchased: false }
      ]
    },
    {
      id: 'dairy-eggs',
      name: 'Dairy & Eggs',
      isExpanded: false,
      items: [
        { id: '11', name: 'Milk', quantity: 1, unit: 'gallon', purchased: false },
        { id: '12', name: 'Eggs', quantity: 1, unit: 'dozen', purchased: false }
      ]
    },
    {
      id: 'grains-pasta',
      name: 'Grains & Pasta',
      isExpanded: false,
      items: [
        { id: '15', name: 'Brown Rice', quantity: 1, unit: 'bag', purchased: false }
      ]
    },
    {
      id: 'fruits',
      name: 'Fruits',
      isExpanded: false,
      items: [
        { id: '19', name: 'Bananas', quantity: 1, unit: 'bunch', purchased: false }
      ]
    },
    {
      id: 'legumes-beans',
      name: 'Legumes & Beans',
      isExpanded: false,
      items: [
        { id: '23', name: 'Black Beans', quantity: 3, unit: 'cans', purchased: false }
      ]
    },
    {
      id: 'nuts-seeds',
      name: 'Nuts & Seeds',
      isExpanded: false,
      items: [
        { id: '27', name: 'Almonds', quantity: 1, unit: 'bag', purchased: false }
      ]
    },
    {
      id: 'condiments-seasonings',
      name: 'Condiments & Seasonings',
      isExpanded: false,
      items: [
        { id: '31', name: 'Olive Oil', quantity: 1, unit: 'bottle', purchased: false }
      ]
    },
    {
      id: 'pantry-staples',
      name: 'Pantry Staples',
      isExpanded: false,
      items: [
        { id: '35', name: 'Flour', quantity: 1, unit: 'bag', purchased: false }
      ]
    }
  ]);

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
    // API call to save grocery list - autosave functionality
    // Automatically switch to Shop tab after saving
    setActiveTab('shop');
  };

  const handleAddToInstacart = () => {
    console.log('Adding to Instacart:', categories);
    // Switch to Instacart tab with current grocery items
    setActiveTab('instacart');
  };

  const updateInstacartQuantity = (itemId: string, change: number) => {
    setInstacartCart(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeInstacartItem = (itemId: string) => {
    setInstacartCart(prev => prev.filter(item => item.id !== itemId));
  };

  const calculateTotal = () => {
    return instacartCart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleSubmitOrder = () => {
    if (!selectedStore) {
      alert('Please select a store first');
      return;
    }
    console.log('Submitting Instacart order:', { store: selectedStore, items: instacartCart });
    setOrderSubmitted(true);
    setTimeout(() => setOrderSubmitted(false), 3000);
  };

  // Group items by category
  const groupedInstacartItems = instacartCart.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {} as Record<string, typeof instacartCart>);

  const toggleShopCategory = (categoryId: string) => {
    setShopCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { ...cat, isExpanded: !cat.isExpanded }
        : cat
    ));
  };

  const togglePurchased = (categoryId: string, itemId: string) => {
    setShopCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? {
            ...cat,
            items: cat.items.map(item => 
              item.id === itemId 
                ? { ...item, purchased: !item.purchased }
                : item
            )
          }
        : cat
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 px-3 py-3">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
        </div>
        <div className="flex items-center justify-center mt-1">
          <h2 className="text-lg font-semibold text-purple-300">Grocery Hub</h2>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="px-3 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'edit'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Edit List
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'shop'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Shop
          </button>
          <button
            onClick={() => setActiveTab('instacart')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'instacart'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Instacart
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-3 pb-20 overflow-y-auto">
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
          <div className="space-y-4">
            {/* Shop Category Cards */}
            {shopCategories.map((category) => (
              <div key={category.id} className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleShopCategory(category.id)}
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
                      <div 
                        key={item.id} 
                        className={`flex items-center justify-between rounded-lg p-4 cursor-pointer transition-all ${
                          item.purchased 
                            ? 'bg-gray-600 opacity-60' 
                            : 'bg-gray-700 hover:bg-gray-650'
                        }`}
                        onClick={() => togglePurchased(category.id, item.id)}
                      >
                        <div className="flex-1">
                          <span className={`font-medium ${
                            item.purchased ? 'text-gray-400 line-through' : 'text-white'
                          }`}>
                            {item.name}
                          </span>
                          <div className="text-sm text-gray-400 mt-1">
                            {item.quantity} {item.unit}
                          </div>
                        </div>
                        
                        {/* Purchase Checkbox */}
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            item.purchased 
                              ? 'bg-green-600 border-green-600' 
                              : 'border-gray-400 hover:border-green-400'
                          }`}>
                            {item.purchased && (
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Shop Progress Summary */}
            <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Shopping Progress</h3>
              <div className="text-gray-300">
                {(() => {
                  const totalItems = shopCategories.reduce((sum, cat) => sum + cat.items.length, 0);
                  const purchasedItems = shopCategories.reduce((sum, cat) => 
                    sum + cat.items.filter(item => item.purchased).length, 0
                  );
                  return (
                    <div className="flex justify-between">
                      <span>Items Purchased:</span>
                      <span className="font-semibold">{purchasedItems} / {totalItems}</span>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'instacart' && (
          <div className="space-y-6">
            {/* Order Confirmation */}
            {orderSubmitted && (
              <div className="bg-green-600/20 border border-green-600 rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-green-400 mb-2">Order Submitted Successfully!</h3>
                <p className="text-green-300">Your grocery order has been placed with {selectedStore}</p>
                <p className="text-sm text-green-400 mt-1">Estimated delivery: 1-2 hours</p>
              </div>
            )}

            {/* Store Selection */}
            <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Select Grocery Store</h3>
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger className="w-full bg-blue-600 border-blue-500 text-white hover:bg-blue-700 [&>svg]:text-white">
                  <SelectValue placeholder="Choose a store..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-200 border-gray-300">
                  {stores.map((store) => (
                    <SelectItem 
                      key={store} 
                      value={store}
                      className="text-gray-900 hover:bg-gray-300 focus:bg-gray-300"
                    >
                      {store}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Grouped Items List - Single Row Format */}
            <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Your Cart</h3>
              
              {Object.entries(groupedInstacartItems).map(([category, items]) => (
                <div key={category} className="mb-6">
                  {/* Category Header */}
                  <h4 className="text-yellow-300 font-semibold text-sm uppercase tracking-wide mb-3 border-b border-gray-600 pb-2">
                    {category}
                  </h4>
                  
                  {/* Category Items - Single Row Layout */}
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2 px-3 bg-gray-700/50 rounded hover:bg-gray-700 transition-colors">
                        {/* Item Name */}
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-white truncate block">{item.name}</span>
                        </div>
                        
                        {/* Price per unit */}
                        <div className="text-sm text-gray-300 px-2">
                          ${item.price.toFixed(2)}/{item.unit}
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => updateInstacartQuantity(item.id, -1)}
                            className="w-7 h-7 bg-gray-600 hover:bg-gray-500 rounded flex items-center justify-center text-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateInstacartQuantity(item.id, 1)}
                            className="w-7 h-7 bg-gray-600 hover:bg-gray-500 rounded flex items-center justify-center text-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        {/* Item Total */}
                        <div className="w-16 text-right font-semibold text-white px-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        
                        {/* Delete Button */}
                        <button
                          onClick={() => removeInstacartItem(item.id)}
                          className="w-7 h-7 bg-red-600 hover:bg-red-500 rounded flex items-center justify-center text-white transition-colors ml-2"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {instacartCart.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">Your cart is empty</p>
                </div>
              )}
            </div>

            {/* Order Summary & Submit */}
            {instacartCart.length > 0 && (
              <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-white">Total:</span>
                  <span className="text-2xl font-bold text-green-400">${calculateTotal()}</span>
                </div>
                
                <div className="text-sm text-gray-400 mb-4">
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span>$3.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee:</span>
                    <span>$2.99</span>
                  </div>
                  <div className="flex justify-between font-semibold text-white mt-2 pt-2 border-t border-gray-600">
                    <span>Final Total:</span>
                    <span>${(parseFloat(calculateTotal()) + 6.98).toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmitOrder}
                  disabled={!selectedStore || instacartCart.length === 0}
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Order
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}