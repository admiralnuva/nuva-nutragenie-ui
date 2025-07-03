import { useState } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Clock, Users, Flame, User, MessageCircle, BookOpen } from "lucide-react";

const filterCategories = [
  { label: 'All', value: 'all' },
  { label: 'Quick (15min)', value: 'quick' },
  { label: 'Healthy', value: 'healthy' },
  { label: 'Desserts', value: 'dessert' }
];

export default function RecipesScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage("nutragenie_user", null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const { data: recipes = [], isLoading } = useQuery({
    queryKey: ["/api/recipes", selectedFilter],
    enabled: !!currentUser
  });

  const filteredRecipes = recipes.filter((recipe: any) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const BottomNavigation = () => (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[393px] bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        <button className="flex flex-col items-center gap-1 py-2 px-3 text-brand-green-500">
          <BookOpen className="w-6 h-6" />
          <span className="text-xs font-medium">Recipes</span>
        </button>
        <button 
          onClick={() => setLocation("/cooking")}
          className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400 hover:text-brand-green-500 transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs font-medium">Chef AI</span>
        </button>
        <button 
          onClick={() => setLocation("/profile")}
          className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400 hover:text-brand-green-500 transition-colors"
        >
          <User className="w-6 h-6" />
          <span className="text-xs font-medium">Profile</span>
        </button>
      </div>
    </div>
  );

  if (!currentUser) {
    setLocation("/");
    return null;
  }

  return (
    <div className="h-screen bg-brand-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-green-500 flex items-center justify-center text-white text-lg">
            {currentUser.avatar}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{currentUser.nickname}</p>
            <p className="text-xs text-gray-500">Ready to cook?</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLocation("/profile")}
          className="rounded-full hover:bg-gray-100"
        >
          <User className="w-6 h-6 text-gray-600" />
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="What do you want to cook?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green-500"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {filterCategories.map(category => (
            <Button
              key={category.value}
              variant={selectedFilter === category.value ? "default" : "outline"}
              onClick={() => setSelectedFilter(category.value)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap ${
                selectedFilter === category.value
                  ? 'bg-brand-green-500 text-white hover:bg-brand-green-600'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-brand-green-50'
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Recipe Cards */}
      <div className="px-4 pb-24 space-y-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-green-500 border-t-transparent mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading delicious recipes...</p>
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No recipes found. Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            {/* Featured Recipe */}
            {filteredRecipes[0] && (
              <Card className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <img 
                  src={filteredRecipes[0].imageUrl || "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=200"} 
                  alt={filteredRecipes[0].title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg text-gray-800">{filteredRecipes[0].title}</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm text-gray-600">{filteredRecipes[0].rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{filteredRecipes[0].description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {filteredRecipes[0].cookTime} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {filteredRecipes[0].servings} servings
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4" />
                        {filteredRecipes[0].calories} cal
                      </span>
                    </div>
                    <Button
                      onClick={() => setLocation(`/cooking/${filteredRecipes[0].id}`)}
                      className="bg-brand-green-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-brand-green-600 transition-all"
                    >
                      Cook Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recipe Grid */}
            <div className="grid grid-cols-2 gap-4">
              {filteredRecipes.slice(1).map((recipe: any) => (
                <Card key={recipe.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <img 
                    src={recipe.imageUrl || "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=120"} 
                    alt={recipe.title}
                    className="w-full h-24 object-cover"
                  />
                  <CardContent className="p-3">
                    <h4 className="font-semibold text-sm text-gray-800">{recipe.title}</h4>
                    <p className="text-xs text-gray-500 mb-2">{recipe.cookTime} min • {recipe.calories} cal</p>
                    <Button
                      onClick={() => setLocation(`/cooking/${recipe.id}`)}
                      className="w-full bg-brand-green-100 text-brand-green-700 py-2 rounded-lg text-sm font-medium hover:bg-brand-green-200 transition-all"
                    >
                      Cook
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
