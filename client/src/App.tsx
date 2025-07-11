import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BottomNavigation } from "@/components/ui/bottom-navigation";


import DietaryScreen from "@/pages/dietary";
import VoiceCookingScreen from "@/pages/voice-cooking";
import TakeOutScreen from "@/pages/takeout";
import CookScreen from "@/pages/cook";
import NuvaSplashScreen from "@/pages/nuva-splash";
import NuvaSignupScreen from "@/pages/nuva-signup";
import CreateDishesScreen from "@/pages/create-dishes";
import RecipesScreen from "@/pages/recipes";
import ProfileScreen from "@/pages/profile";
import HealthAnalyticsScreen from "@/pages/health";
import HomeScreen from "@/pages/home";
import GroceryListEnhanced from "@/pages/grocery-list-enhanced";
import InstacartScreen from "@/pages/instacart";


function Router() {
  const [location, setLocation] = useLocation();
  
  // Fix malformed route on initial load
  useEffect(() => {
    if (location.includes('"') || location.includes('\\')) {
      setLocation("/");
    }
  }, [location, setLocation]);
  
  // If route is still malformed, force nuva splash screen
  if (location.includes('"') || location.includes('\\')) {
    return <NuvaSplashScreen />;
  }
  
  return (
    <Switch>
      <Route path="/" component={NuvaSplashScreen} />
      <Route path="/nuva" component={NuvaSplashScreen} />
      <Route path="/nuva-signup" component={NuvaSignupScreen} />
      <Route path="/nuva-home" component={HomeScreen} />

      <Route path="/dietary" component={DietaryScreen} />

      <Route path="/recipes" component={RecipesScreen} />
      <Route path="/create-dishes" component={CreateDishesScreen} />
      <Route path="/home" component={HomeScreen} />

      <Route path="/grocery-list" component={GroceryListEnhanced} />
      <Route path="/instacart" component={InstacartScreen} />
      <Route path="/cook" component={CookScreen} />
      <Route path="/voice-cooking" component={VoiceCookingScreen} />

      <Route path="/takeout" component={TakeOutScreen} />
      <Route path="/nuva-signup" component={NuvaSignupScreen} />
      <Route path="/profile" component={ProfileScreen} />
      <Route path="/health" component={HealthAnalyticsScreen} />

    </Switch>
  );
}

function AppContent() {
  const [location] = useLocation();
  
  // Pages that should NOT show bottom navigation
  const hideBottomNav = ['/', '/nuva', '/nuva-signup', '/dietary'];
  const showBottomNav = !hideBottomNav.includes(location);

  return (
    <div className="mobile-container bg-white shadow-2xl">
      <Toaster />
      <Router />
      {showBottomNav && <BottomNavigation />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
