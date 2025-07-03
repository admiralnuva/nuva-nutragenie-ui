import { useState } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/ui/back-button";
import { ArrowLeft, Settings, User, MessageCircle, BookOpen, Edit, BarChart3 } from "lucide-react";

const achievements = [
  {
    id: 1,
    title: "First Recipe!",
    description: "Completed your first recipe",
    icon: "🏆",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-800",
    descColor: "text-yellow-600"
  },
  {
    id: 2,
    title: "Healthy Eater",
    description: "Cooked 5 healthy recipes",
    icon: "🌱",
    bgColor: "bg-green-50",
    textColor: "text-green-800",
    descColor: "text-green-600"
  },
  {
    id: 3,
    title: "Speed Chef",
    description: "Completed a 15-minute recipe",
    icon: "⚡",
    bgColor: "bg-blue-50",
    textColor: "text-blue-800",
    descColor: "text-blue-600"
  }
];

export default function ProfileScreen() {
  const [, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useLocalStorage("nutragenie_user", null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Mock progress data - in real app, this would come from the user object
  const progressData = {
    cookingPoints: { current: 5, total: 100 },
    purchasePoints: { current: 5, total: 100 },
    weekStreak: 4,
    completedChallenges: 9,
    totalChallenges: 10,
    recipesCompleted: 68,
    level: 3
  };

  const capColors = ['#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#FFD700'];

  const BottomNavigation = () => (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[393px] bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        <button 
          onClick={() => setLocation("/recipes")}
          className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400 hover:text-brand-green-500 transition-colors"
        >
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
        <button className="flex flex-col items-center gap-1 py-2 px-3 text-brand-green-500">
          <User className="w-6 h-6 fill-current" />
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
    <div className="h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <BackButton to="/home" />
        <h2 className="font-bold text-lg text-gray-800">NutraGenie Profile</h2>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-gray-100"
        >
          <Settings className="w-6 h-6 text-gray-600" />
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Summary */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-brand-green-500 flex items-center justify-center text-white text-2xl">
                {currentUser.avatar}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{currentUser.nickname}</h3>
                <p className="text-gray-600">Home Chef • Level {progressData.level}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-yellow-500">
                    {Array(3).fill(0).map((_, i) => (
                      <span key={i} className="text-sm">⭐</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{progressData.recipesCompleted} recipes completed</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-brand-green-50">
            <CardContent className="p-4">
              <div className="text-2xl mb-2">⭐</div>
              <div className="text-2xl font-bold text-brand-green-700">{progressData.cookingPoints.current}</div>
              <p className="text-sm text-brand-green-600">Cooking Points</p>
              <Progress 
                value={(progressData.cookingPoints.current / progressData.cookingPoints.total) * 100} 
                className="mt-2 h-2"
              />
              <p className="text-xs text-brand-green-600 mt-1">
                {progressData.cookingPoints.total - progressData.cookingPoints.current} to next star
              </p>
            </CardContent>
          </Card>

          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="text-2xl mb-2">🎖️</div>
              <div className="text-2xl font-bold text-blue-700">{progressData.purchasePoints.current}</div>
              <p className="text-sm text-blue-600">Purchase Points</p>
              <Progress 
                value={(progressData.purchasePoints.current / progressData.purchasePoints.total) * 100} 
                className="mt-2 h-2"
              />
              <p className="text-xs text-blue-600 mt-1">
                {progressData.purchasePoints.total - progressData.purchasePoints.current} to next badge
              </p>
            </CardContent>
          </Card>

          <Card className="bg-orange-50">
            <CardContent className="p-4">
              <div className="text-2xl mb-2">🔥</div>
              <div className="text-2xl font-bold text-orange-700">{progressData.weekStreak}</div>
              <p className="text-sm text-orange-600">Week Streak</p>
              <div className="flex gap-1 mt-2">
                {Array(4).fill(0).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-3 h-3 rounded-full ${
                      i < progressData.weekStreak ? 'bg-orange-500' : 'bg-orange-200'
                    }`}
                  ></div>
                ))}
              </div>
              <p className="text-xs text-orange-600 mt-1">This month!</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50">
            <CardContent className="p-4">
              <div className="text-2xl mb-2">🧢</div>
              <div className="text-2xl font-bold text-purple-700">
                {Math.floor(progressData.completedChallenges / 10)}
              </div>
              <p className="text-sm text-purple-600">Chef Caps</p>
              <div className="flex gap-1 mt-2">
                {capColors.slice(0, 3).map((color, i) => (
                  <div 
                    key={i} 
                    className={`text-lg ${
                      i < Math.floor(progressData.completedChallenges / 10) ? '' : 'opacity-20'
                    }`}
                    style={{ color }}
                  >
                    🧢
                  </div>
                ))}
              </div>
              <p className="text-xs text-purple-600 mt-1">
                {progressData.completedChallenges}/{progressData.totalChallenges} challenges
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <h4 className="font-bold text-gray-800 mb-3">Recent Achievements</h4>
            <div className="space-y-3">
              {achievements.map(achievement => (
                <div key={achievement.id} className={`flex items-center gap-3 p-3 ${achievement.bgColor} rounded-lg`}>
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <p className={`font-semibold ${achievement.textColor}`}>{achievement.title}</p>
                    <p className={`text-sm ${achievement.descColor}`}>{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Profile Settings */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <h4 className="font-bold text-gray-800 mb-3">Profile Settings</h4>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all"
                onClick={() => setLocation("/signup")}
              >
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <span>Edit Profile</span>
                </div>
                <Edit className="w-5 h-5 text-gray-400" />
              </Button>
              
              <Button
                variant="outline"
                className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all"
                onClick={() => setLocation("/dietary")}
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-500" />
                  <span>Dietary Preferences</span>
                </div>
                <Edit className="w-5 h-5 text-gray-400" />
              </Button>

              <Button
                variant="outline"
                className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all"
                onClick={() => setLocation("/health")}
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-gray-500" />
                  <span>Health Analytics</span>
                </div>
                <Edit className="w-5 h-5 text-gray-400" />
              </Button>
              
              <Button
                variant="outline"
                className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">👨‍🍳</span>
                  <span>Choose Your Chef</span>
                </div>
                <Edit className="w-5 h-5 text-gray-400" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}
