import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowLeft, Settings, Star, Home, Palette, Truck, ShoppingBag, Play, Clock, Users } from "lucide-react";

export default function ExploreRecipeTestScreen() {
  const [, setLocation] = useLocation();

  // iOS-style grid options
  const recipeOptions = [
    {
      id: "personalize",
      title: "Personalize Diet",
      icon: Settings,
      color: "bg-blue-500",
      path: "/personalize-diet-pantry"
    },
    {
      id: "chefs-choice", 
      title: "Chef's Choice",
      icon: Star,
      color: "bg-amber-500",
      path: "/chefs-choice"
    },
    {
      id: "pantry",
      title: "Pantry Dishes", 
      icon: Home,
      color: "bg-green-500",
      path: "/pantry-dishes"
    },
    {
      id: "create",
      title: "Create Dishes",
      icon: Palette,
      color: "bg-purple-500", 
      path: "/create-dishes"
    },
    {
      id: "takeout",
      title: "Take-Out",
      icon: Truck,
      color: "bg-red-500",
      path: "/takeout"
    },
    {
      id: "grocery",
      title: "Grocery Hub",
      icon: ShoppingBag,
      color: "bg-indigo-500",
      path: "/grocery-hub"
    }
  ];

  // Streaming content mock data
  const streamingContent = [
    {
      id: 1,
      title: "Perfect Pasta Techniques",
      chef: "Chef Maria Rodriguez",
      duration: "25 min",
      viewers: "2.3K",
      thumbnail: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300&h=200&fit=crop",
      isLive: true
    },
    {
      id: 2, 
      title: "Knife Skills Masterclass",
      chef: "Chef James Chen",
      duration: "18 min",
      viewers: "1.8K",
      thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
      isLive: false
    },
    {
      id: 3,
      title: "Bread Baking Basics", 
      chef: "Chef Sophie Laurent",
      duration: "35 min",
      viewers: "3.1K",
      thumbnail: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop",
      isLive: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={() => setLocation("/explore-recipe-options")}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-gray-800 p-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
          <h2 className="text-lg font-semibold text-purple-300 mt-1">Recipe Options (Test)</h2>
        </div>
        <div className="w-8"></div>
      </div>

      {/* iOS-Style Grid Layout */}
      <div className="mb-8">
        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
          {recipeOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Button
                key={option.id}
                onClick={() => setLocation(option.path)}
                className="flex flex-col items-center p-4 bg-transparent hover:bg-gray-800/30 transition-all duration-200 h-auto space-y-2"
              >
                <div className={`w-24 h-24 ${option.color} rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform`}>
                  <IconComponent size={56} className="text-white drop-shadow-sm" />
                </div>
                <span className="text-sm font-medium text-white text-center leading-tight">{option.title}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Streaming Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Cooking Classes & Tips</h3>
          <Button variant="ghost" size="sm" className="text-purple-300 hover:text-purple-200">
            View All
          </Button>
        </div>

        {/* Horizontal Scrollable Cards */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {streamingContent.map((content) => (
            <Card key={content.id} className="min-w-[280px] bg-gray-800/80 border-gray-700 hover:bg-gray-700/80 transition-all cursor-pointer">
              <div className="relative">
                <img 
                  src={content.thumbnail}
                  alt={content.title}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                {content.isLive && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    LIVE
                  </div>
                )}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {content.duration}
                </div>
                <div className="absolute inset-0 bg-black/20 rounded-t-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Play size={32} className="text-white" />
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold text-white text-sm mb-2 line-clamp-2">{content.title}</h4>
                <p className="text-gray-300 text-xs mb-2">{content.chef}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Users size={12} />
                    {content.viewers} watching
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 h-auto text-xs">
                    {content.isLive ? "Join Live" : "Watch"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Content */}
        <Card className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-white mb-2">🔥 Trending Now</h4>
                <p className="text-purple-200 text-sm mb-3">Master Chef Antoine's 5-Course French Dinner</p>
                <div className="flex items-center gap-4 text-xs text-gray-300">
                  <span className="flex items-center gap-1"><Clock size={12} /> 2 hours</span>
                  <span className="flex items-center gap-1"><Users size={12} /> 5.2K watching</span>
                </div>
              </div>
              <Button className="bg-white text-purple-900 hover:bg-gray-100 font-semibold px-6">
                Join Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}