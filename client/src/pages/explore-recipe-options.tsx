import { BackButton } from "@/components/ui/back-button";
import { Card } from "@/components/ui/card";

export default function ExploreRecipeOptionsScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pb-20">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 px-4 py-4 flex items-center justify-between">
        <BackButton to="/home" className="text-white" />
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
          <p className="text-lg font-semibold text-purple-600 mt-1">Explore Recipe Options</p>
        </div>
        <div className="w-8"></div>
      </div>

      <div className="p-4 space-y-6">
        {/* Card 1 - Preferences */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white">Preferences</h2>
        </Card>

        {/* Card 2 - Recipe Options */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white">Recipe Options</h2>
        </Card>

        {/* Card 3 - History */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white">History</h2>
        </Card>

        {/* Card 4 - Summary */}
        <Card className="bg-gray-800/90 backdrop-blur-sm border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white">Summary</h2>
        </Card>
      </div>
    </div>
  );
}