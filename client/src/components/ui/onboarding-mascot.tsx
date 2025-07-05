import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, MessageCircle, Sparkles, Heart, Target, Shield, ThumbsDown } from "lucide-react";

interface MascotMessage {
  id: string;
  text: string;
  delay?: number;
  persistent?: boolean;
  actionButton?: {
    text: string;
    action: () => void;
  };
}

interface OnboardingMascotProps {
  messages: MascotMessage[];
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  onComplete?: () => void;
  mascotName?: string;
}

export function OnboardingMascot({ 
  messages, 
  position = "bottom-right", 
  onComplete,
  mascotName = "Genie"
}: OnboardingMascotProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const currentMessage = messages[currentMessageIndex];

  useEffect(() => {
    if (messages.length > 0 && !isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, currentMessage?.delay || 1000);

      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, messages, isDismissed, currentMessage]);

  const handleNext = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 500);
    } else {
      setIsVisible(false);
      onComplete?.();
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    onComplete?.();
  };

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4", 
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4"
  };

  if (isDismissed || !currentMessage) return null;

  return (
    <div className={`fixed ${positionClasses[position]} z-50 max-w-sm`}>
      {/* Mascot Container */}
      <div 
        className={`bg-white rounded-2xl shadow-xl border-2 border-indigo-200 p-4 transition-all duration-500 transform ${
          isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-2'
        }`}
      >
        {/* Header with Mascot */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-indigo-700 text-sm">{mascotName}</h4>
              {!currentMessage.persistent && (
                <button
                  onClick={handleDismiss}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Message Content */}
        <div className="mb-4">
          <p className="text-gray-700 text-sm leading-relaxed">{currentMessage.text}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MessageCircle className="w-3 h-3" />
            <span>{currentMessageIndex + 1} of {messages.length}</span>
          </div>
          
          <div className="flex gap-2">
            {currentMessage.actionButton && (
              <Button
                size="sm"
                variant="outline"
                onClick={currentMessage.actionButton.action}
                className="text-xs"
              >
                {currentMessage.actionButton.text}
              </Button>
            )}
            
            <Button
              size="sm"
              onClick={handleNext}
              className="text-xs bg-indigo-500 hover:bg-indigo-600"
            >
              {currentMessageIndex < messages.length - 1 ? "Next" : "Got it!"}
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Animation */}
      <div className="absolute -top-2 -right-2">
        <div className="w-6 h-6 bg-yellow-400 rounded-full animate-bounce shadow-lg flex items-center justify-center">
          <span className="text-xs">✨</span>
        </div>
      </div>
    </div>
  );
}

// Preset message collections for different screens
export const ONBOARDING_MESSAGES = {
  signup: [
    {
      id: "welcome",
      text: "Welcome to NutraGenie! I'm here to help you create your perfect nutrition profile. Let's start by choosing your avatar!",
      delay: 1000
    },
    {
      id: "avatar-selection", 
      text: "Pick an avatar that represents you! This will appear throughout your personalized experience.",
      delay: 500
    },
    {
      id: "chef-selection",
      text: "Now choose your AI chef companion! Each has their own cooking style and personality to match your preferences.",
      delay: 500
    }
  ],
  dietary: [
    {
      id: "dietary-intro",
      text: "Great! Now let's personalize your nutrition. I'll guide you through each section to create the perfect meal plans for you.",
      delay: 1000
    },
    {
      id: "dietary-restrictions",
      text: "Start with any dietary restrictions you follow. This helps me suggest recipes that fit your lifestyle perfectly!",
      delay: 500
    },
    {
      id: "health-factors",
      text: "Share any health factors I should consider. This ensures your meal plans support your wellness goals.",
      delay: 500
    }
  ],
  recipes: [
    {
      id: "recipe-intro",
      text: "Amazing! Your profile is complete. Now I can generate personalized recipes based on your preferences and goals!",
      delay: 1000
    },
    {
      id: "ingredient-selection",
      text: "Select ingredients you have or want to use. I'll create recipes that make the most of what's available to you.",
      delay: 500
    }
  ]
};