import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowLeft, Play, Clock, Users } from "lucide-react";

export default function ExploreRecipeOptionsScreen() {
  const [, setLocation] = useLocation();

  // Custom SVG Icons optimized for 36px size
  const CustomIcons = {
    Settings: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
        <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97L2.46 14.6c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.31.61.22l2.49-1c.52.39 1.06.73 1.69.98l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.25 1.17-.59 1.69-.98l2.49 1c.22.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
      </svg>
    ),
    Star: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22L12 18.77L5.82 22L7 14.14L2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    Home: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
        <path d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z"/>
      </svg>
    ),
    Palette: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
        <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5c0-.61-.23-1.21-.64-1.67c-.08-.09-.13-.21-.13-.33c0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6C22 6.04 17.51 2 12 2zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8S8 8.67 8 9.5S7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5S18.33 11 17.5 11z"/>
      </svg>
    ),
    Truck: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
        <path d="M18 18.5a1.5 1.5 0 0 1-1.5 1.5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5m1.5-9L17 12v6a1 1 0 0 1-1 1h-1a3 3 0 0 0-6 0H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3h2.5m-11 7.5a1.5 1.5 0 0 1-1.5 1.5A1.5 1.5 0 0 1 6.5 18A1.5 1.5 0 0 1 8 16.5a1.5 1.5 0 0 1 1.5 1.5Z"/>
      </svg>
    ),
    ShoppingBag: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
        <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm6 9a1 1 0 0 1-2 0v-1a1 1 0 0 1 2 0v1z"/>
      </svg>
    )
  };

  // iOS-style grid options
  const recipeOptions = [
    {
      id: "personalize",
      title: "Personalize Diet",
      icon: CustomIcons.Settings,
      color: "bg-indigo-500",
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
        <div className="w-8"></div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
          <h2 className="text-lg font-semibold text-purple-300 mt-1">Explore Recipe Options</h2>
        </div>
        <Button
          onClick={() => setLocation("/explore-recipe-test")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 text-sm rounded-lg"
        >
          Test
        </Button>
      </div>

      {/* iOS-Style Grid Layout */}
      <div className="mb-8">
        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
          {recipeOptions.map((option) => {
            const IconComponent = option.icon;
            const buttonBg = option.id === 'chefs-choice' ? 'bg-emerald-500/25' : 
                            option.id === 'pantry' ? 'bg-blue-500/30' :
                            option.id === 'create' ? 'bg-emerald-500/25' :
                            option.id === 'takeout' ? 'bg-blue-500/30' :
                            option.id === 'grocery' ? 'bg-teal-500/30' :
                            option.id === 'personalize' ? 'bg-indigo-500/30' : '';
            return (
              <div key={option.id} className="flex flex-col items-center space-y-2">
                <button
                  onClick={() => setLocation(option.path)}
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform ${option.color} ${buttonBg}`}
                >
                  <IconComponent />
                </button>
                <span className="text-sm font-medium text-white text-center leading-tight">{option.title}</span>
              </div>
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