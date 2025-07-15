import React, { useState } from "react";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function ExploreRecipeOptionsScreen() {
  // Recipe type selection state
  const [selectedRecipeType, setSelectedRecipeType] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <BackButton />
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
          <h2 className="text-lg font-semibold text-purple-300 mt-1">Explore Recipe Options</h2>
        </div>
        <div className="w-8"></div>
      </div>

      <div className="space-y-6">
        {/* Card 1 - Recipe & Dishes */}
        <Card className="mb-3 bg-gray-800/90 backdrop-blur-sm border-gray-700">
          <CardContent className="space-y-3 p-4">
            <Button
              onClick={() => setLocation("/chefs-choice")}
              className="w-full bg-transparent hover:bg-gray-700/50 text-white pl-3 pr-4 py-4 h-20 rounded-lg border border-gray-600"
            >
              <div className="flex items-center justify-start gap-3 h-full">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">⭐</span>
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">Chef's Choice</p>
                  <p className="text-sm text-amber-200 truncate">AI-selected recipes</p>
                </div>
                <div className="text-white text-lg flex-shrink-0">→</div>
              </div>
            </Button>

            <Button
              onClick={() => setLocation("/pantry-dishes")}
              className="w-full bg-transparent hover:bg-gray-700/50 text-white pl-3 pr-4 py-4 h-20 rounded-lg border border-gray-600"
            >
              <div className="flex items-center justify-start gap-3 h-full">
                <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🏠</span>
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">Pantry Dishes</p>
                  <p className="text-sm text-amber-200 truncate">Use what you have</p>
                </div>
                <div className="text-white text-lg flex-shrink-0">→</div>
              </div>
            </Button>

            <Button
              onClick={() => setLocation("/create-dishes")}
              className="w-full bg-transparent hover:bg-gray-700/50 text-white pl-3 pr-4 py-4 h-20 rounded-lg border border-gray-600"
            >
              <div className="flex items-center justify-start gap-3 h-full">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🎨</span>
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">Create Dishes</p>
                  <p className="text-sm text-amber-200 truncate">Build custom recipes</p>
                </div>
                <div className="text-white text-lg flex-shrink-0">→</div>
              </div>
            </Button>

            <Button
              onClick={() => setLocation("/takeout-orders")}
              className="w-full bg-transparent hover:bg-gray-700/50 text-white pl-3 pr-4 py-4 h-20 rounded-lg border border-gray-600"
            >
              <div className="flex items-center justify-start gap-3 h-full">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">📦</span>
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">Take-Out</p>
                  <p className="text-sm text-amber-200 truncate">Order from local chefs</p>
                </div>
                <div className="text-white text-lg flex-shrink-0">→</div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Card 2 - Grocery Hub */}
        <Card className="mb-3 bg-gray-800/90 backdrop-blur-sm border-gray-700">
          <CardContent className="p-3">
            <Button
              onClick={() => setLocation("/grocery-hub")}
              className="w-full bg-transparent hover:bg-gray-700/50 text-white pl-3 pr-4 py-4 h-20 rounded-lg border border-gray-600"
            >
              <div className="flex items-center justify-start gap-3 h-full">
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🥬</span>
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">Grocery Hub</p>
                  <p className="text-sm text-amber-200 truncate">Manage shopping lists</p>
                </div>
                <div className="text-white text-lg flex-shrink-0">→</div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Card 3 - Personalize Diet & Pantry */}
        <Card className="mb-3 bg-gray-800/90 backdrop-blur-sm border-gray-700">
          <CardContent className="p-3">
            <Button
              onClick={() => setLocation("/personalize-diet-pantry")}
              className="w-full bg-transparent hover:bg-gray-700/50 text-white pl-3 pr-4 py-4 h-20 rounded-lg border border-gray-600"
            >
              <div className="flex items-center justify-start gap-3 h-full">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">⚙️</span>
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">Personalize Diet & Pantry</p>
                  <p className="text-sm text-amber-200 truncate">Set your preferences</p>
                </div>
                <div className="text-white text-lg flex-shrink-0">→</div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}