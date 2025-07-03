import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

interface BackButtonProps {
  to?: string;
  className?: string;
}

export function BackButton({ to, className = "" }: BackButtonProps) {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    if (to) {
      setLocation(to);
    } else {
      // Default back behavior
      window.history.back();
    }
  };

  return (
    <button 
      onClick={handleBack}
      className={`flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors ${className}`}
    >
      <ArrowLeft size={20} />
    </button>
  );
}