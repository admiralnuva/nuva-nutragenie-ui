import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { Loader2, ChefHat, Heart, Smartphone } from "lucide-react";

export default function SplashScreen() {
  const [, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useLocalStorage<any>("nutragenie_user", null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  console.log("SplashScreen component rendered");

  // Smart navigation based on user state
  useEffect(() => {
    // If user exists and has completed onboarding, redirect to home
    if (currentUser && currentUser.nickname && currentUser.selectedChef) {
      const timer = setTimeout(() => {
        setLocation("/home");
      }, 3000); // Reduced from 10s to 3s for better UX
      return () => clearTimeout(timer);
    }
  }, [currentUser, setLocation]);

  const handleNavigation = async (path: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Add slight delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      setLocation(path);
    } catch (err) {
      setError("Navigation failed. Please try again.");
      setIsLoading(false);
    }
  };

  const isReturningUser = currentUser && currentUser.nickname;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-500 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="text-center max-w-md mx-auto">
        {/* App Logo and Title */}
        <div className="mb-8 animate-in fade-in duration-1000">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/30 shadow-2xl animate-in zoom-in duration-700 delay-200">
            <ChefHat className="w-14 h-14 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-white drop-shadow-2xl animate-in slide-in-from-bottom-4 duration-800 delay-300">
            NutraGenie
          </h1>
          <p className="text-white mb-3 text-xl sm:text-2xl leading-relaxed font-semibold drop-shadow-lg animate-in slide-in-from-bottom-4 duration-800 delay-500">
            Your AI nutrition companion that bridges cooking and convenience
          </p>
          <p className="text-white/95 mb-8 text-lg sm:text-xl font-medium drop-shadow-md animate-in slide-in-from-bottom-4 duration-800 delay-700">
            Personalized recipes, health tracking, and marketplace integration
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-6 mb-10 text-white/90 animate-in fade-in duration-1000 delay-900">
          <div className="text-center transform hover:scale-105 transition-transform duration-200">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm border border-white/30">
              <ChefHat className="w-7 h-7" />
            </div>
            <p className="text-sm font-semibold">AI Chef</p>
          </div>
          <div className="text-center transform hover:scale-105 transition-transform duration-200">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm border border-white/30">
              <Heart className="w-7 h-7" />
            </div>
            <p className="text-sm font-semibold">Health Tracking</p>
          </div>
          <div className="text-center transform hover:scale-105 transition-transform duration-200">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm border border-white/30">
              <Smartphone className="w-7 h-7" />
            </div>
            <p className="text-sm font-semibold">Smart Grocery</p>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/20 border border-red-300 text-white p-3 rounded-lg mb-4 backdrop-blur-sm">
            {error}
          </div>
        )}

        {/* Returning User Welcome */}
        {isReturningUser && (
          <div className="bg-white/20 p-4 rounded-lg mb-6 backdrop-blur-sm">
            <p className="text-white font-medium">Welcome back, {currentUser.nickname}! 👋</p>
            <p className="text-white/90 text-sm">Redirecting to your dashboard...</p>
          </div>
        )}

        {/* Reset Button for Testing (only show when user exists) */}
        {isReturningUser && (
          <div className="mb-4">
            <button 
              onClick={() => {
                setCurrentUser(null);
                localStorage.removeItem("nutragenie_user");
                setLocation("/");
              }}
              className="bg-red-500/20 border border-red-300 text-white px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-red-500/30 transition-colors text-sm"
            >
              Reset for Testing (Clear User Data)
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 w-full">
          {!isReturningUser ? (
            <>
              <button 
                onClick={() => handleNavigation("/signup")}
                disabled={isLoading}
                className="w-full bg-white text-indigo-600 py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                Get Started
              </button>
              <button 
                onClick={() => handleNavigation("/recipes")}
                disabled={isLoading}
                className="w-full bg-transparent border-2 border-white text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Browse Recipes
              </button>
              <p className="text-white/80 text-sm mt-3">
                New users start with account creation for personalized experience
              </p>
            </>
          ) : (
            <button 
              onClick={() => handleNavigation("/home")}
              disabled={isLoading}
              className="w-full bg-white text-indigo-600 py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              Continue to Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
