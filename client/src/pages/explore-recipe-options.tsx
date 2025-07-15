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
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-4 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-lg">
          <div className="space-y-4">
            <Link href="/chefs-choice" className="block">
              <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-4 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
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
              <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-4 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center">
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
              <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-4 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
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
              <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-4 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-400 rounded-lg flex items-center justify-center">
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
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-4 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <Link href="/grocery-hub" className="block">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center">
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
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-4 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <Link href="/personalize-diet-pantry" className="block">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
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