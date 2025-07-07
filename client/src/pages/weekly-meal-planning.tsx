import { useState } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { ScreenHeader } from "@/components/ui/screen-header";
import { Clock, Users, Flame, ChevronDown, ChevronUp } from "lucide-react";

// Mock weekly meal data
const weeklyMeals = [
  {
    id: 1,
    name: "Mediterranean Quinoa Bowl",
    calories: 420,
    cookTime: "25 min",
    difficulty: "Easy",
    day: "Monday"
  },
  {
    id: 2,
    name: "Grilled Salmon with Asparagus",
    calories: 380,
    cookTime: "20 min", 
    difficulty: "Medium",
    day: "Tuesday"
  },
  {
    id: 3,
    name: "Vegetarian Stir-Fry",
    calories: 350,
    cookTime: "15 min",
    difficulty: "Easy",
    day: "Wednesday"
  },
  {
    id: 4,
    name: "Lemon Herb Chicken",
    calories: 450,
    cookTime: "35 min",
    difficulty: "Medium",
    day: "Thursday"
  },
  {
    id: 5,
    name: "Black Bean Tacos",
    calories: 320,
    cookTime: "18 min",
    difficulty: "Easy",
    day: "Friday"
  },
  {
    id: 6,
    name: "Mushroom Risotto",
    calories: 400,
    cookTime: "40 min",
    difficulty: "Hard",
    day: "Saturday"
  }
];

export default function WeeklyMealPlanningScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage<any>("nutragenie_user", null);
  const [tempUser] = useLocalStorage<any>("nutragenie_temp_user", null);
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Get user data - check both current and temp user
  const userData = currentUser || tempUser;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <BackButton to="/explore-recipes" />
            <div className="flex-1 text-center">
              <h1 className="text-xl font-bold text-gray-900">NutraGenie</h1>
            </div>
            <div className="w-8"></div>
          </div>
        </div>
      </div>

      <ScreenHeader 
        title="Weekly Meal Planning"
        subtitle={userData?.nickname ? `${userData.nickname}'s Weekly Plan` : 'Your Weekly Plan'}
      />

      {/* Content */}
      <div className="max-w-md mx-auto p-4 space-y-4 pb-20">
        {/* Weekly Meals Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-gray-800">This Week's Meals</CardTitle>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-sm text-gray-600">6 planned meals for the week</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>Avg 26 min prep</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 w-8 p-0 text-purple-600 hover:bg-purple-50"
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
          </CardHeader>
          {isExpanded && (
            <CardContent className="pt-0 space-y-2">
              {weeklyMeals.map((meal) => (
                <div 
                key={meal.id}
                className="flex flex-col p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                {/* First row: Dish name */}
                <div className="font-medium text-gray-800 text-sm mb-1">
                  {meal.name}
                </div>
                
                {/* Second row: Calories and timer (left-aligned) */}
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    <span>{meal.calories} cal</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{meal.cookTime}</span>
                  </div>
                </div>
                
                {/* Third row: Day and difficulty badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-purple-600">
                    {meal.day}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(meal.difficulty)}`}>
                    {meal.difficulty}
                  </span>
                </div>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline"
            className="border-blue-200 text-blue-600 hover:bg-blue-50 active:bg-purple-50 active:border-purple-200 active:text-purple-600"
            onClick={() => setLocation("/grocery-list")}
          >
            View Shopping List
          </Button>
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => setLocation("/voice-cooking")}
          >
            Start Cooking
          </Button>
        </div>
      </div>
    </div>
  );
}