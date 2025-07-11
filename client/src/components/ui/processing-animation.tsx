import { useState, useEffect } from "react";
import { ChefHat, Sparkles, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProcessingAnimationProps {
  onComplete: () => void;
  duration?: number;
}

export function ProcessingAnimation({ onComplete, duration = 4000 }: ProcessingAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);

  const steps = [
    { icon: ChefHat, text: "Analyzing your preferences...", color: "text-purple-400" },
    { icon: Sparkles, text: "Finding perfect ingredients...", color: "text-blue-400" },
    { icon: Clock, text: "Creating personalized recipes...", color: "text-green-400" },
    { icon: CheckCircle2, text: "Ready to cook!", color: "text-purple-400" }
  ];

  useEffect(() => {
    const stepDuration = duration / steps.length;
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return prev;
        }
      });
    }, stepDuration);

    // Sparkle animation
    const sparkleInterval = setInterval(() => {
      setShowSparkles((prev) => !prev);
    }, 600);

    return () => {
      clearInterval(interval);
      clearInterval(sparkleInterval);
    };
  }, [duration, steps.length, onComplete]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 shadow-2xl max-w-sm mx-4">
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-6">
            
            {/* Main Icon with Pulse Animation */}
            <div className="relative">
              <div className="w-20 h-20 mx-auto relative">
                <div className="absolute inset-0 bg-purple-600/20 rounded-full animate-ping"></div>
                <div className="absolute inset-2 bg-purple-600/40 rounded-full animate-ping animation-delay-75"></div>
                <div className="relative w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <ChefHat className="w-10 h-10 text-white animate-bounce" />
                </div>
              </div>
              
              {/* Floating Sparkles */}
              {showSparkles && (
                <>
                  <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-spin" />
                  <Sparkles className="absolute -bottom-2 -left-2 w-4 h-4 text-blue-400 animate-pulse" />
                  <Sparkles className="absolute top-4 -left-4 w-5 h-5 text-purple-400 animate-bounce" />
                </>
              )}
            </div>

            {/* Progress Steps */}
            <div className="space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 transition-all duration-500 ${
                      isActive ? 'scale-105' : isCompleted ? 'opacity-70' : 'opacity-30'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      isCompleted ? 'bg-green-600' : isActive ? 'bg-purple-600' : 'bg-gray-600'
                    } transition-colors duration-500`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : (
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white animate-pulse' : 'text-gray-400'}`} />
                      )}
                    </div>
                    <span className={`text-sm font-medium transition-colors duration-500 ${
                      isActive ? step.color : isCompleted ? 'text-green-400' : 'text-gray-500'
                    }`}>
                      {step.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-2 mt-6">
              <div 
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>

            {/* Loading Text */}
            <div className="text-center">
              <h3 className="text-lg font-bold text-white mb-2">Creating Your Recipes</h3>
              <p className="text-sm text-gray-300">
                Our AI chef is crafting personalized dishes just for you...
              </p>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function QuickProcessingAnimation({ 
  onComplete, 
  duration = 2000,
  title = "Processing...",
  description = "Please wait while we work our magic"
}: {
  onComplete: () => void;
  duration?: number;
  title?: string;
  description?: string;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + (100 / (duration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 shadow-2xl max-w-xs mx-4">
        <CardContent className="pt-6 pb-6">
          <div className="text-center space-y-4">
            
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 bg-purple-600/20 rounded-full animate-pulse"></div>
              <div className="relative w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white animate-spin" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
              <p className="text-sm text-gray-300">{description}</p>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="text-xs text-gray-400">{Math.round(progress)}% complete</p>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}