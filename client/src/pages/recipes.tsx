import { useState } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChefHat, 
  Utensils, 
  PlusCircle,
  Clock,
  Users,
  Star,
  Search,
  Filter
} from "lucide-react";

export default function RecipesScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage("nutragenie_user", null);

  // Featured recipe categories
  const categories = [
    {
      id: 'quick',
      name: 'Quick Meals',
      icon: Clock,
      description: 'Ready in 30 minutes or less',
      color: 'bg-green-500',
      count: 24
    },
    {
      id: 'healthy',
      name: 'Healthy Options',
      icon: Star,
      description: 'Nutritious and balanced meals',
      color: 'bg-blue-500',
      count: 18
    },
    {
      id: 'family',
      name: 'Family Favorites',
      icon: Users,
      description: 'Perfect for family dinners',
      color: 'bg-purple-500',
      count: 15
    },
    {
      id: 'custom',
      name: 'Create Custom',
      icon: PlusCircle,
      description: 'Design your own dishes',
      color: 'bg-orange-500',
      count: '∞'
    }
  ];

  const handleCategorySelect = (categoryId: string) => {
    if (categoryId === 'custom') {
      setLocation('/create-dishes');
    } else {
      // Navigate to recipe list for that category
      setLocation(`/recipes/${categoryId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pb-20">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 px-4 py-4 flex items-center justify-between">
        <BackButton to="/home" className="text-white" />
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
          <p className="text-lg font-semibold text-purple-300 mt-1">Recipes</p>
        </div>
        <div className="w-8"></div>
      </div>

      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Welcome back{currentUser ? `, ${(currentUser as any).nickname}` : ''}!
                </h2>
                <p className="text-gray-300">What would you like to cook today?</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Bar */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search recipes..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recipe Categories */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Recipe Categories</h3>
          <div className="grid grid-cols-1 gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card 
                  key={category.id}
                  className="bg-gray-800/90 backdrop-blur-sm border-gray-700 hover:border-purple-500 transition-colors cursor-pointer"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white">{category.name}</h4>
                        <p className="text-gray-300 text-sm">{category.description}</p>
                      </div>
                      <Badge variant="secondary" className="bg-gray-700 text-white">
                        {category.count}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => setLocation('/create-dishes')}
                className="h-16 bg-purple-600 hover:bg-purple-700 text-white flex flex-col gap-1"
              >
                <PlusCircle className="w-5 h-5" />
                <span className="text-sm">Create Dish</span>
              </Button>
              <Button 
                onClick={() => setLocation('/voice-cooking')}
                className="h-16 bg-blue-600 hover:bg-blue-700 text-white flex flex-col gap-1"
              >
                <Utensils className="w-5 h-5" />
                <span className="text-sm">Start Cooking</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}