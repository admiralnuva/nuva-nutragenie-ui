import { Home, ChefHat, Mic, User, Truck, LucideIcon } from "lucide-react";
import { useLocation } from "wouter";

interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: ChefHat, label: "Recipes", path: "/explore-recipes" },
  { icon: Mic, label: "Voice Cook", path: "/voice-cooking" },
  { icon: Truck, label: "Take-Out", path: "/takeout" },
  { icon: User, label: "Profile", path: "/profile" }
];

export function BottomNavigation() {
  const [location, setLocation] = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 px-2 py-2 safe-area-bottom z-50">
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
                  ? "text-purple-400 bg-purple-900/30" 
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
              }`}
            >
              <Icon size={20} className={isActive ? "text-purple-400" : ""} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}