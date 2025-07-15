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
              <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-4 h-20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center space-x-4 h-full">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate">Chef's Choice</h3>
                    <p className="text-blue-200 text-sm truncate">AI-selected recipes</p>
                  </div>
                  <div className="text-blue-200 flex-shrink-0">→</div>
                </div>
              </Card>
            </Link>

            <Link href="/pantry-dishes" className="block">
              <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-4 h-20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center space-x-4 h-full">
                  <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🏠</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate">Pantry Dishes</h3>
                    <p className="text-blue-200 text-sm truncate">Use what you have</p>
                  </div>
                  <div className="text-blue-200 flex-shrink-0">→</div>
                </div>
              </Card>
            </Link>

            <Link href="/create-dishes" className="block">
              <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-4 h-20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center space-x-4 h-full">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate">Create Dishes</h3>
                    <p className="text-blue-200 text-sm truncate">Build custom recipes</p>
                  </div>
                  <div className="text-blue-200 flex-shrink-0">→</div>
                </div>
              </Card>
            </Link>

            <Link href="/takeout-orders" className="block">
              <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-4 h-20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center space-x-4 h-full">
                  <div className="w-12 h-12 bg-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📦</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate">Take-Out</h3>
                    <p className="text-blue-200 text-sm truncate">Order from local chefs</p>
                  </div>
                  <div className="text-blue-200 flex-shrink-0">→</div>
                </div>
              </Card>
            </Link>
          </div>
        </Card>

        {/* Card 2 - Grocery List */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-4 h-20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <Link href="/grocery-hub" className="block">
            <div className="flex items-center space-x-4 h-full">
              <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🥬</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white truncate">Grocery Hub</h3>
                <p className="text-blue-200 text-sm truncate">Manage shopping lists</p>
              </div>
              <div className="text-blue-200 flex-shrink-0">→</div>
            </div>
          </Link>
        </Card>

        {/* Card 3 - Personalize Diet & Pantry */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-4 h-20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <Link href="/personalize-diet-pantry" className="block">
            <div className="flex items-center space-x-4 h-full">
              <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⚙️</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white truncate">Personalize Diet & Pantry</h3>
                <p className="text-blue-200 text-sm truncate">Set your preferences</p>
              </div>
              <div className="text-blue-200 flex-shrink-0">→</div>
            </div>
          </Link>
        </Card>
      </div>
    </div>
  );
}