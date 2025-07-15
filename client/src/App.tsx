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

import NuvaSplashScreen from "@/pages/nuva-splash";
import NuvaSignupScreen from "@/pages/nuva-signup";
import CreateDishesScreen from "@/pages/create-dishes";
import ExploreRecipeOptionsScreen from "@/pages/explore-recipe-options";

import ProfileScreen from "@/pages/profile";

import HomeScreen from "@/pages/home";

import InstacartScreen from "@/pages/instacart";
import GroceryHubScreen from "@/pages/grocery-hub";
import ChefsChoiceScreen from "@/pages/chefs-choice";
import PantryDishesScreen from "@/pages/pantry-dishes";
import CustomDishesScreen from "@/pages/custom-dishes";
import TakeoutOrdersScreen from "@/pages/takeout-orders";
import PersonalizeDietPantryScreen from "@/pages/personalize-diet-pantry";


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


      <Route path="/create-dishes" component={CreateDishesScreen} />
      <Route path="/explore-recipe-options" component={() => {
        try {
          return <ExploreRecipeOptionsScreen />;
        } catch (error) {
          console.error("ExploreRecipeOptionsScreen error:", error);
          return <div className="p-4 text-white bg-red-900">Error loading page: {String(error)}</div>;
        }
      }} />
      <Route path="/home" component={HomeScreen} />


      <Route path="/instacart" component={InstacartScreen} />
      <Route path="/grocery-hub" component={GroceryHubScreen} />

      <Route path="/voice-cooking" component={VoiceCookingScreen} />

      <Route path="/takeout" component={TakeOutScreen} />
      <Route path="/chefs-choice" component={ChefsChoiceScreen} />
      <Route path="/pantry-dishes" component={PantryDishesScreen} />
      <Route path="/custom-dishes" component={CustomDishesScreen} />
      <Route path="/takeout-orders" component={TakeoutOrdersScreen} />
      <Route path="/personalize-diet-pantry" component={PersonalizeDietPantryScreen} />
      <Route path="/profile" component={ProfileScreen} />


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
