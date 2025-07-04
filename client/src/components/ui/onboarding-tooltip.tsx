import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, ArrowRight } from "lucide-react";

interface OnboardingTooltipProps {
  id: string;
  title: string;
  description: string;
  targetSelector?: string;
  position?: "top" | "bottom" | "left" | "right";
  onComplete?: () => void;
  children?: React.ReactNode;
}

export function OnboardingTooltip({
  id,
  title,
  description,
  position = "bottom",
  onComplete,
  children
}: OnboardingTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    // Check if this tooltip has been shown before
    const shownTooltips = JSON.parse(localStorage.getItem("nutragenie_tooltips_shown") || "[]");
    if (!shownTooltips.includes(id)) {
      setIsVisible(true);
    } else {
      setHasBeenShown(true);
    }
  }, [id]);

  const handleComplete = () => {
    const shownTooltips = JSON.parse(localStorage.getItem("nutragenie_tooltips_shown") || "[]");
    if (!shownTooltips.includes(id)) {
      shownTooltips.push(id);
      localStorage.setItem("nutragenie_tooltips_shown", JSON.stringify(shownTooltips));
    }
    setIsVisible(false);
    setHasBeenShown(true);
    onComplete?.();
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!isVisible || hasBeenShown) {
    return <>{children}</>;
  }

  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2", 
    left: "right-full mr-2",
    right: "left-full ml-2"
  };

  return (
    <div className="relative">
      {children}
      <div className={`absolute z-50 ${positionClasses[position]} left-1/2 transform -translate-x-1/2 w-72`}>
        <Card className="p-4 bg-indigo-600 text-white border-indigo-500 shadow-xl">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-sm">{title}</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-white hover:bg-indigo-700 h-6 w-6 p-0"
            >
              <X size={14} />
            </Button>
          </div>
          <p className="text-sm text-indigo-100 mb-4">{description}</p>
          <div className="flex gap-2">
            <Button
              onClick={handleComplete}
              size="sm"
              className="bg-white text-indigo-600 hover:bg-indigo-50 flex items-center gap-1"
            >
              Got it <ArrowRight size={14} />
            </Button>
            <Button
              onClick={handleSkip}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-indigo-700"
            >
              Skip
            </Button>
          </div>
        </Card>
        {/* Arrow pointer */}
        <div className={`absolute ${position === 'bottom' ? '-top-2' : '-bottom-2'} left-1/2 transform -translate-x-1/2`}>
          <div className={`w-0 h-0 ${
            position === 'bottom' 
              ? 'border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-indigo-600'
              : 'border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-indigo-600'
          }`}></div>
        </div>
      </div>
    </div>
  );
}