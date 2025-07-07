import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { NavigationButton } from "@/components/ui/reusable-buttons";

export default function NuvaSplashScreen() {
  const [, setLocation] = useLocation();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className={`relative z-10 text-center space-y-8 transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Logo placeholder */}
        <div className="w-32 h-32 mx-auto bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-2xl">
          <div className="text-6xl">🧬</div>
        </div>

        {/* App name */}
        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            NutraGenie
          </h1>
          <div className="w-24 h-1 bg-white/60 mx-auto rounded-full"></div>
        </div>

        {/* App description */}
        <div className="space-y-4 max-w-sm">
          <p className="text-xl font-medium text-white/90 drop-shadow-md leading-relaxed">
            AI-powered nutrition platform designed to enhance wellness
          </p>
          <p className="text-lg text-white/80 drop-shadow-md leading-relaxed">
            Intelligent, personalized nutritional guidance through interactive meal experiences
          </p>
        </div>

        {/* Get Started button */}
        <div className="pt-8">
          <NavigationButton onClick={() => setLocation("/nuva-signup")}>
            Get Started
          </NavigationButton>
        </div>

        {/* Version info */}
        <p className="text-sm text-white/60 drop-shadow-sm">
          Nuva v1.0 • Clean Architecture
        </p>
      </div>
    </div>
  );
}