import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, Sparkles } from "lucide-react";

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  duration?: number; // in milliseconds
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
  isActive: boolean;
  onComplete?: () => void;
  className?: string;
}

export function ProgressIndicator({ 
  steps, 
  isActive, 
  onComplete, 
  className = "" 
}: ProgressIndicatorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setCurrentStep(0);
      setIsComplete(false);
      return;
    }

    if (currentStep < steps.length) {
      const stepDuration = steps[currentStep]?.duration || 2000;
      const timer = setTimeout(() => {
        if (currentStep === steps.length - 1) {
          setIsComplete(true);
          onComplete?.();
        } else {
          setCurrentStep(prev => prev + 1);
        }
      }, stepDuration);

      return () => clearTimeout(timer);
    }
  }, [currentStep, isActive, steps, onComplete]);

  if (!isActive && !isComplete) return null;

  return (
    <Card className={`p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
          {isComplete ? (
            <CheckCircle className="text-green-300" size={24} />
          ) : (
            <Sparkles className="text-yellow-300 animate-pulse" size={24} />
          )}
        </div>
        <div>
          <h3 className="font-bold text-lg">
            {isComplete ? "Ready!" : "Generating Your Recipe..."}
          </h3>
          <p className="text-indigo-100 text-sm">
            {isComplete ? "Your personalized recipe is ready" : "AI is crafting something delicious"}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const isCurrentStep = index === currentStep && !isComplete;
          const isCompletedStep = index < currentStep || isComplete;
          
          return (
            <div key={step.id} className="flex items-center gap-3">
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                isCompletedStep 
                  ? 'bg-green-400 text-white' 
                  : isCurrentStep 
                    ? 'bg-yellow-400 text-gray-800 animate-pulse' 
                    : 'bg-white/20 text-white/60'
              }`}>
                {isCompletedStep ? (
                  <CheckCircle size={16} />
                ) : isCurrentStep ? (
                  <Clock size={16} />
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              
              <div className="flex-1">
                <div className={`font-medium text-sm ${
                  isCurrentStep ? 'text-white' : isCompletedStep ? 'text-green-100' : 'text-white/60'
                }`}>
                  {step.title}
                </div>
                <div className={`text-xs ${
                  isCurrentStep ? 'text-indigo-100' : isCompletedStep ? 'text-green-200' : 'text-white/40'
                }`}>
                  {step.description}
                </div>
              </div>

              {isCurrentStep && (
                <div className="flex-shrink-0">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-yellow-400 h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: isComplete ? '100%' : `${((currentStep + 1) / steps.length) * 100}%` 
            }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-indigo-100 mt-2">
          <span>{isComplete ? 'Complete' : `Step ${currentStep + 1} of ${steps.length}`}</span>
          <span>{isComplete ? '100%' : `${Math.round(((currentStep + 1) / steps.length) * 100)}%`}</span>
        </div>
      </div>
    </Card>
  );
}