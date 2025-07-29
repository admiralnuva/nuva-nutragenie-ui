import React, { useState } from "react";

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

      <div className="space-y-4">
        {/* Recipe & Dishes Options - Grouped with Border */}
        <div className="border border-gray-600 rounded-lg p-3 space-y-3">
          <Button
            onClick={() => setLocation("/chefs-choice")}
            className="w-full bg-emerald-500/25 hover:bg-emerald-500/35 text-white p-4 h-20 rounded-lg"
          >
            <div className="flex items-center gap-3 h-full">
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
            className="w-full bg-blue-500/30 hover:bg-blue-500/40 text-white p-4 h-20 rounded-lg"
          >
            <div className="flex items-center gap-3 h-full">
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
            className="w-full bg-emerald-500/25 hover:bg-emerald-500/35 text-white p-4 h-20 rounded-lg"
          >
            <div className="flex items-center gap-3 h-full">
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
            onClick={() => setLocation("/takeout")}
            className="w-full bg-blue-500/30 hover:bg-blue-500/40 text-white p-4 h-20 rounded-lg"
          >
            <div className="flex items-center gap-3 h-full">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🚚</span>
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="font-semibold text-white truncate">Take-Out</p>
                <p className="text-sm text-amber-200 truncate">Order delivery</p>
              </div>
              <div className="text-white text-lg flex-shrink-0">→</div>
            </div>
          </Button>
        </div>

        {/* Other Options - Grouped with Border */}
        <div className="border border-gray-600 rounded-lg p-3 space-y-3">
          <Button
            onClick={() => setLocation("/grocery-hub")}
            className="w-full bg-teal-500/30 hover:bg-teal-500/40 text-white p-4 h-20 rounded-lg"
          >
            <div className="flex items-center gap-3 h-full">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🛒</span>
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="font-semibold text-white truncate">Grocery Hub</p>
                <p className="text-sm text-amber-200 truncate">Manage shopping lists</p>
              </div>
              <div className="text-white text-lg flex-shrink-0">→</div>
            </div>
          </Button>

          <Button
            onClick={() => setLocation("/personalize-diet-pantry")}
            className="w-full bg-indigo-500/30 hover:bg-indigo-500/40 text-white p-4 h-20 rounded-lg"
          >
            <div className="flex items-center gap-3 h-full">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg">⚙️</span>
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="font-semibold text-white truncate">Personalize Diet & Pantry</p>
                <p className="text-sm text-amber-200 truncate">Set preferences</p>
              </div>
              <div className="text-white text-lg flex-shrink-0">→</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}