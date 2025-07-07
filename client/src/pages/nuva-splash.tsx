import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { Loader2, ChefHat, Heart, Smartphone } from "lucide-react";

export default function NuvaSplashScreen() {
  const [, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useLocalStorage<any>("nutragenie_user", null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Smart navigation based on user state
  useEffect(() => {
    // If user exists and has completed onboarding, redirect to home
    if (currentUser && currentUser.nickname && currentUser.selectedChef) {
      const timer = setTimeout(() => {
        setLocation("/nuva-home");
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
          
          {/* AI + Health Indicator */}
          <div className="flex items-center justify-center gap-3 mb-4 text-white/90">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">AI Powered</span>
            </div>
            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-400" fill="currentColor" />
              <span className="text-sm font-medium">Health Focused</span>
            </div>
          </div>
        </div>

        {/* App Description */}
        <div className="mb-8 space-y-3 animate-in slide-in-from-bottom-6 duration-1000 delay-500">
          <p className="text-lg sm:text-xl text-white/95 font-medium drop-shadow-lg leading-relaxed">
            AI-powered nutrition platform designed to enhance wellness for users 40+
          </p>
          <p className="text-base sm:text-lg text-white/85 drop-shadow-md leading-relaxed">
            Intelligent, personalized nutritional guidance through interactive meal experiences
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-3 gap-4 mb-8 animate-in slide-in-from-bottom-8 duration-1000 delay-700">
          {[
            { icon: ChefHat, label: "AI Chef", description: "Personal cooking assistant" },
            { icon: Heart, label: "Health Tracking", description: "Nutrition & wellness monitoring" },
            { icon: Smartphone, label: "Voice Commands", description: "Hands-free cooking guidance" }
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2 backdrop-blur-sm border border-white/30">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-white drop-shadow-md">{feature.label}</h3>
              <p className="text-xs text-white/70 drop-shadow-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 animate-in slide-in-from-bottom-10 duration-1000 delay-900">
          {isReturningUser ? (
            <>
              <div className="text-white/90 mb-4">
                <p className="text-lg font-medium drop-shadow-md">Welcome back, {currentUser.nickname}! 👋</p>
                <p className="text-sm text-white/75 drop-shadow-sm">Redirecting to your dashboard...</p>
              </div>
              <div className="flex justify-center">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavigation("/nuva-signup")}
                disabled={isLoading}
                className="w-full bg-white text-indigo-600 font-semibold py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading...</span>
                  </div>
                ) : (
                  "Get Started"
                )}
              </button>
              
              {error && (
                <div className="text-red-200 text-sm bg-red-500/20 backdrop-blur-sm border border-red-300/30 rounded-lg p-3">
                  {error}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <p className="text-xs text-white/50 mt-8 drop-shadow-sm animate-in fade-in duration-1000 delay-1100">
          Nuva v1.0 • Clean Architecture • Enhanced for wellness-focused users
        </p>
      </div>
    </div>
  );
}