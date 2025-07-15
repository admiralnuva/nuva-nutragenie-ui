import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowLeft, Play, Clock, Users } from "lucide-react";

export default function ExploreRecipeTestScreen() {
  const [, setLocation] = useLocation();

  // Custom SVG Icons for better visibility
  const CustomIcons = {
    Settings: () => (
      <svg viewBox="0 0 64 64" fill="currentColor" className="w-16 h-16">
        <path d="M32 40c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8z"/>
        <path d="M56 28h-4.6c-.8-3.2-2.4-6-4.6-8.4L50 16.4c1.2-1.2 1.2-3.2 0-4.4s-3.2-1.2-4.4 0l-3.2 3.2c-2.4-2.2-5.2-3.8-8.4-4.6V6c0-1.6-1.4-3-3-3s-3 1.4-3 3v4.6c-3.2.8-6 2.4-8.4 4.6L16.4 12c-1.2-1.2-3.2-1.2-4.4 0s-1.2 3.2 0 4.4l3.2 3.2c-2.2 2.4-3.8 5.2-4.6 8.4H6c-1.6 0-3 1.4-3 3s1.4 3 3 3h4.6c.8 3.2 2.4 6 4.6 8.4L12 47.6c-1.2 1.2-1.2 3.2 0 4.4.6.6 1.4.9 2.2.9s1.6-.3 2.2-.9l3.2-3.2c2.4 2.2 5.2 3.8 8.4 4.6V58c0 1.6 1.4 3 3 3s3-1.4 3-3v-4.6c3.2-.8 6-2.4 8.4-4.6l3.2 3.2c.6.6 1.4.9 2.2.9s1.6-.3 2.2-.9c1.2-1.2 1.2-3.2 0-4.4l-3.2-3.2c2.2-2.4 3.8-5.2 4.6-8.4H56c1.6 0 3-1.4 3-3s-1.4-3-3-3z"/>
      </svg>
    ),
    Star: () => (
      <svg viewBox="0 0 64 64" fill="currentColor" className="w-16 h-16">
        <path d="M32 4l7.4 15.8L56 22.2l-12 11.7L46.8 50 32 42.2 17.2 50l2.8-16.1L8 22.2l16.6-2.4L32 4z"/>
      </svg>
    ),
    Home: () => (
      <svg viewBox="0 0 64 64" fill="currentColor" className="w-16 h-16">
        <path d="M32 6L8 26v32h48V26L32 6zM20 50v-16h24v16H20z"/>
      </svg>
    ),
    Palette: () => (
      <svg viewBox="0 0 64 64" fill="currentColor" className="w-16 h-16">
        <path d="M32 8C18.7 8 8 18.7 8 32c0 6.6 5.4 12 12 12 2.7 0 4-2.1 4-4 0-1.1-.4-2.1-1.2-2.8-.4-.4-.8-1.2-.8-2.2 0-2.2 1.8-4 4-4 8.8 0 16-7.2 16-16 0-13.3-10.7-24-24-24zM20 36c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm8-16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm16 0c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
      </svg>
    ),
    Truck: () => (
      <svg viewBox="0 0 64 64" fill="currentColor" className="w-16 h-16">
        <path d="M52 28H44V16c0-2.2-1.8-4-4-4H8c-2.2 0-4 1.8-4 4v28c0 2.2 1.8 4 4 4h4c0 4.4 3.6 8 8 8s8-3.6 8-8h12c0 4.4 3.6 8 8 8s8-3.6 8-8h4c2.2 0 4-1.8 4-4V36c0-4.4-3.6-8-8-8zM20 48c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm28 0c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
      </svg>
    ),
    ShoppingBag: () => (
      <svg viewBox="0 0 64 64" fill="currentColor" className="w-16 h-16">
        <path d="M48 20h-8v-4c0-4.4-3.6-8-8-8s-8 3.6-8 8v4h-8c-2.2 0-4 1.8-4 4v32c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V24c0-2.2-1.8-4-4-4zM24 16c0-4.4 3.6-8 8-8s8 3.6 8 8v4H24v-4zm16 16c0 2.2-1.8 4-4 4s-4-1.8-4-4v-4h8v4z"/>
      </svg>
    )
  };

  // iOS-style grid options
  const recipeOptions = [
    {
      id: "personalize",
      title: "Personalize Diet",
      icon: CustomIcons.Settings,
      color: "bg-indigo-600",
      path: "/personalize-diet-pantry"
    },
    {
      id: "chefs-choice", 
      title: "Chef's Choice",
      icon: CustomIcons.Star,
      color: "bg-blue-600",
      path: "/chefs-choice"
    },
    {
      id: "pantry",
      title: "Pantry Dishes", 
      icon: CustomIcons.Home,
      color: "bg-amber-600",
      path: "/pantry-dishes"
    },
    {
      id: "create",
      title: "Create Dishes",
      icon: CustomIcons.Palette,
      color: "bg-purple-600", 
      path: "/create-dishes"
    },
    {
      id: "takeout",
      title: "Take-Out",
      icon: CustomIcons.Truck,
      color: "bg-emerald-600",
      path: "/takeout"
    },
    {
      id: "grocery",
      title: "Grocery Hub",
      icon: CustomIcons.ShoppingBag,
      color: "bg-teal-600",
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
                  <div className="text-white">
                    <IconComponent />
                  </div>
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