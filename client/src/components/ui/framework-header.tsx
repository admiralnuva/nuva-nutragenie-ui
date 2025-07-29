import { ArrowLeft } from "lucide-react";

interface FrameworkHeaderProps {
  screenName: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function FrameworkHeader({ screenName, showBack = false, onBack }: FrameworkHeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-4 py-3">
        {showBack ? (
          <button 
            onClick={onBack} 
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-8"></div>
        )}
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800">NutraGenie</h1>
          <p className="text-lg font-bold text-purple-600">{screenName}</p>
        </div>
        <div className="w-8"></div>
      </div>
    </div>
  );
}