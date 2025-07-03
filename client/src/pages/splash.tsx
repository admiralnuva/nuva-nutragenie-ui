import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";

export default function SplashScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage("nutragenie_user", null);

  useEffect(() => {
    if (currentUser) {
      // Auto-redirect returning users
      setTimeout(() => setLocation("/recipes"), 2000);
    }
  }, [currentUser, setLocation]);

  return (
    <div className="h-screen bg-gradient-to-br from-brand-green-400 to-brand-green-600 flex flex-col items-center justify-center p-8 text-white">
      <div className="text-center fade-in">
        <div className="text-6xl mb-6 bounce">🧑‍🍳</div>
        <h1 className="text-3xl font-bold mb-2">NutraGenie</h1>
        <p className="text-green-100 mb-8 text-lg">Your Personal AI Chef</p>
        
        {!currentUser ? (
          <div className="space-y-4 w-full max-w-xs">
            <button 
              onClick={() => setLocation("/signup")}
              className="w-full bg-white text-brand-green-600 py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Get Started
            </button>
            <button 
              onClick={() => setLocation("/recipes")}
              className="w-full bg-transparent border-2 border-white text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-white hover:text-brand-green-600 transition-all duration-200"
            >
              I'm Already a Chef
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-green-100 mb-4">Welcome back, {currentUser.nickname}!</p>
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
}
