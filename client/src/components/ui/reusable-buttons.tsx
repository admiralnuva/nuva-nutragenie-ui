import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface NavigationButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

interface CardActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline" | "secondary";
  disabled?: boolean;
}

interface SelectionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  isSelected?: boolean;
  disabled?: boolean;
}

// Navigation buttons - consistent size and blue styling for all navigation
export function NavigationButton({ children, onClick, disabled }: NavigationButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full h-12 text-base font-medium bg-blue-500 text-white border-blue-500 hover:bg-blue-600 active:bg-purple-600 active:border-purple-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300"
    >
      {children}
    </Button>
  );
}

// Card action buttons - 3 fit horizontally in a card
export function CardActionButton({ children, onClick, variant = "outline", disabled }: CardActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      disabled={disabled}
      className="flex-1 h-10 text-sm font-medium mx-1"
    >
      {children}
    </Button>
  );
}

// Selection buttons - based on Dietary Preferences size
export function SelectionButton({ children, onClick, isSelected = false, disabled }: SelectionButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={isSelected ? "default" : "outline"}
      disabled={disabled}
      className={`h-11 px-4 text-sm font-medium transition-all ${
        isSelected 
          ? 'bg-purple-600 text-white border-purple-600 shadow-md scale-105' 
          : 'bg-white text-gray-700 border-gray-300 hover:border-purple-400 hover:bg-purple-50'
      }`}
    >
      {children}
    </Button>
  );
}