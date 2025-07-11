import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function ExploreRecipeOptionsScreen() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setLocation("/home")}
            className="p-2 rounded-lg hover:bg-gray-800"
          >
            <ArrowLeft className="w-6 h-6 text-purple-400" />
          </button>
          <div className="flex flex-col items-center flex-1">
            <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
            <p className="text-lg font-semibold text-purple-300 mt-1">Explore Recipe Options</p>
          </div>
          <div className="w-10 h-6"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Explore Recipe Options</h2>
          <p className="text-gray-300 text-lg">Coming Soon</p>
        </div>
      </div>
    </div>
  );
}