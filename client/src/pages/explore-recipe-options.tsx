import React, { useState } from "react";
import { BackButton } from "@/components/ui/back-button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";

export default function ExploreRecipeOptionsScreen() {
  // Recipe type selection state
  const [selectedRecipeType, setSelectedRecipeType] = useState<string | null>(null);

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
        <Card className="bg-gray-800/95 backdrop-blur-sm border-gray-600 p-6 hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:bg-gray-750/95 rounded-xl">
          <div className="space-y-5">
            <Link href="/chefs-choice" className="block">
              <Card className="bg-gray-750/70 backdrop-blur border-gray-600/40 p-5 hover:shadow-lg transition-all duration-400 hover:scale-[1.005] hover:bg-gray-700/80 rounded-lg">
                <div className="flex items-center space-x-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">Chef's Choice</h3>
                    <p className="text-blue-200 text-sm">AI-selected recipes for you</p>
                    <p className="text-blue-200 text-xs">Personalized recommendations</p>
                  </div>
                  <div className="text-blue-200">→</div>
                </div>
              </Card>
            </Link>

            <Link href="/pantry-dishes" className="block">
              <Card className="bg-gray-750/70 backdrop-blur border-gray-600/40 p-5 hover:shadow-lg transition-all duration-400 hover:scale-[1.005] hover:bg-gray-700/80 rounded-lg">
                <div className="flex items-center space-x-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-300 to-amber-500 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-2xl">🏠</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">Pantry Dishes</h3>
                    <p className="text-blue-200 text-sm">Use what you have at home</p>
                    <p className="text-blue-200 text-xs">Quick & easy options</p>
                  </div>
                  <div className="text-blue-200">→</div>
                </div>
              </Card>
            </Link>

            <Link href="/create-dishes" className="block">
              <Card className="bg-gray-750/70 backdrop-blur border-gray-600/40 p-5 hover:shadow-lg transition-all duration-400 hover:scale-[1.005] hover:bg-gray-700/80 rounded-lg">
                <div className="flex items-center space-x-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">Create Dishes</h3>
                    <p className="text-blue-200 text-sm">Build custom recipes</p>
                    <p className="text-blue-200 text-xs">Tell us what you're craving</p>
                  </div>
                  <div className="text-blue-200">→</div>
                </div>
              </Card>
            </Link>

            <Link href="/takeout-orders" className="block">
              <Card className="bg-gray-750/70 backdrop-blur border-gray-600/40 p-5 hover:shadow-lg transition-all duration-400 hover:scale-[1.005] hover:bg-gray-700/80 rounded-lg">
                <div className="flex items-center space-x-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-300 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-2xl">📦</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">Take-Out</h3>
                    <p className="text-blue-200 text-sm">Order from local chefs</p>
                    <p className="text-blue-200 text-xs">Group & weekly meals</p>
                  </div>
                  <div className="text-blue-200">→</div>
                </div>
              </Card>
            </Link>
          </div>
        </Card>

        {/* Card 2 - Grocery List */}
        <Card className="bg-gray-800/95 backdrop-blur-sm border-gray-600 p-6 hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:bg-gray-750/95 rounded-xl">
          <Link href="/grocery-hub" className="block">
            <div className="flex items-center space-x-5">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-300 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-2xl">🥬</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Grocery Hub</h3>
                <p className="text-blue-200 text-sm">Manage shopping lists</p>
                <p className="text-blue-200 text-xs">Add & organize ingredients</p>
              </div>
              <div className="text-blue-200">→</div>
            </div>
          </Link>
        </Card>

        {/* Card 3 - Personalize Diet & Pantry */}
        <Card className="bg-gray-800/95 backdrop-blur-sm border-gray-600 p-6 hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:bg-gray-750/95 rounded-xl">
          <Link href="/personalize-diet-pantry" className="block">
            <div className="flex items-center space-x-5">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-2xl">⚙️</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white truncate">Personalize Diet & Pantry</h3>
                <p className="text-blue-200 text-sm truncate">Set your preferences</p>
                <p className="text-blue-200 text-xs truncate">Diet, meal types & pantry items</p>
              </div>
              <div className="text-blue-200 flex-shrink-0">→</div>
            </div>
          </Link>
        </Card>
      </div>
    </div>
  );
}