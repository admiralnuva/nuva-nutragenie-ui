import { Home, ChefHat, Mic, ShoppingBag, User, LucideIcon } from "lucide-react";
import { useLocation } from "wouter";

interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: ChefHat, label: "Recipes", path: "/recipes" },
  { icon: Mic, label: "Voice Cook", path: "/voice-cooking" },
  { icon: ShoppingBag, label: "Take-Out", path: "/takeout" },
  { icon: User, label: "Profile", path: "/profile" }
];

export function BottomNavigation() {
  const [location, setLocation] = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-bottom">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => setLocation(item.path)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? "text-green-600 bg-green-50" 
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon size={20} className={isActive ? "text-green-600" : ""} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}