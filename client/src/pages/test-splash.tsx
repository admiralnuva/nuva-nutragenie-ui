import { useLocation } from "wouter";

export default function TestSplash() {
  const [, setLocation] = useLocation();

  return (
    <div className="h-screen bg-gradient-to-br from-green-500 to-emerald-600 flex flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">NutraGenie</h1>
        <p className="text-white mb-8 text-xl">Test Version</p>
        
        <div className="space-y-4 w-full max-w-xs">
          <button 
            onClick={() => setLocation("/signup")}
            className="w-full bg-white text-green-600 py-4 px-6 rounded-xl font-semibold text-lg"
          >
            Start Account Creation
          </button>
          <button 
            onClick={() => setLocation("/recipes")}
            className="w-full bg-transparent border-2 border-white text-white py-4 px-6 rounded-xl font-semibold text-lg"
          >
            Skip to Recipes
          </button>
        </div>
      </div>
    </div>
  );
}