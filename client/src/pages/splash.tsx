import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { Loader2, ChefHat, Heart, Smartphone } from "lucide-react";

export default function SplashScreen() {
  const [, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useLocalStorage<any>("nutragenie_user", null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Smart navigation based on user state
  useEffect(() => {
    // If user exists and has completed onboarding, redirect to home
    if (currentUser && currentUser.nickname && currentUser.selectedChef) {
      const timer = setTimeout(() => {
        setLocation("/home");
      }, 2000); // Give user time to see splash
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
        <div className="mb-8">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <ChefHat className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white drop-shadow-lg">NutraGenie</h1>
          <p className="text-white mb-2 text-lg sm:text-xl leading-relaxed font-semibold drop-shadow-md">
            Your AI nutrition platform that bridges cooking and convenience
          </p>
          <p className="text-white/95 mb-8 text-base sm:text-lg font-medium drop-shadow-sm">
            Personalized recipes, health tracking, and marketplace integration
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-4 mb-8 text-white/90">
          <div className="text-center">
            <ChefHat className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm font-medium">AI Chef</p>
          </div>
          <div className="text-center">
            <Heart className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm font-medium">Health Tracking</p>
          </div>
          <div className="text-center">
            <Smartphone className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm font-medium">Smart Grocery</p>
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
