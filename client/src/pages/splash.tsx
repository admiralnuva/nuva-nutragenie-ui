import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";

export default function SplashScreen() {
  const [, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useLocalStorage<any>("nutragenie_user", null);

  // Clear any existing user data for fresh testing
  useEffect(() => {
    setCurrentUser(null);
  }, [setCurrentUser]);

  return (
    <div className="h-screen bg-gradient-to-br from-green-500 to-emerald-600 flex flex-col items-center justify-center p-8">
      <div className="text-center">
        {/* AI Health Logo - Placeholder */}
        <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center border-2 border-white/30">
          <div className="text-2xl">🤖</div>
          <div className="text-xl ml-1">❤️</div>
        </div>
        <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">NutraGenie</h1>
        <p className="text-white mb-2 text-xl leading-relaxed font-semibold drop-shadow-md">Your AI nutrition platform that bridges cooking and convenience</p>
        <p className="text-white/95 mb-8 text-lg font-medium drop-shadow-sm">Personalized recipes, health tracking, and marketplace integration</p>
        
        <div className="space-y-4 w-full max-w-xs">
          <button 
            onClick={() => setLocation("/signup")}
            className="w-full bg-white text-green-600 py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Start Account Creation
          </button>
          <button 
            onClick={() => setLocation("/recipes")}
            className="w-full bg-transparent border-2 border-white text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-200"
          >
            Skip to Recipes
          </button>
        </div>
      </div>
    </div>
  );
}
