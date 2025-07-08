import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import NotFound from "@/pages/not-found";
import SplashScreen from "@/pages/splash";
import SignupScreen from "@/pages/signup";
import DietaryScreen from "@/pages/dietary";
import RecipesScreen from "@/pages/recipes";
import ReviewRecipesScreen from "@/pages/review-recipes";
import RecipeDetailsScreen from "@/pages/recipe-details";
import CookingScreen from "@/pages/cooking";
import VoiceCookingScreen from "@/pages/voice-cooking";
import VoiceCookingTestScreen from "@/pages/voice-cooking-test";
import AIVideoCookingScreen from "@/pages/ai-video-cooking";
import CardsScreen from "@/pages/cards";
import NuvaSplashScreen from "@/pages/nuva-splash";
import NuvaSignupScreen from "@/pages/nuva-signup";
import ExploreRecipesScreen from "@/pages/explore-recipes";
import ProfileScreen from "@/pages/profile";
import HealthAnalyticsScreen from "@/pages/health";
import HomeScreen from "@/pages/home";

import GroceryListScreen from "@/pages/grocery-list-new";
import InstacartScreen from "@/pages/instacart";
import WeeklyMealPlanningScreen from "@/pages/weekly-meal-planning";

function Router() {
  const [location, setLocation] = useLocation();
  
  // Fix malformed route on initial load
  useEffect(() => {
    if (location.includes('"') || location.includes('\\')) {
      setLocation("/");
    }
  }, [location, setLocation]);
  
  // If route is still malformed, force splash screen
  if (location.includes('"') || location.includes('\\')) {
    return <SplashScreen />;
  }
  
  return (
    <Switch>
      <Route path="/" component={SplashScreen} />
      <Route path="/nuva" component={NuvaSplashScreen} />
      <Route path="/nuva-home" component={HomeScreen} />
      <Route path="/splash" component={SplashScreen} />
      <Route path="/signup" component={SignupScreen} />
      <Route path="/dietary" component={DietaryScreen} />
      <Route path="/explore-recipes" component={ExploreRecipesScreen} />
      <Route path="/home" component={HomeScreen} />
      <Route path="/recipes" component={RecipesScreen} />
      <Route path="/recipe-details" component={RecipeDetailsScreen} />
      <Route path="/review-recipes" component={ReviewRecipesScreen} />
      <Route path="/grocery-list" component={GroceryListScreen} />
      <Route path="/instacart" component={InstacartScreen} />
      <Route path="/cooking/:recipeId?" component={CookingScreen} />
      <Route path="/voice-cooking" component={VoiceCookingScreen} />
      <Route path="/ai-video-cooking" component={AIVideoCookingScreen} />
      <Route path="/weekly-meal-planning" component={WeeklyMealPlanningScreen} />
      <Route path="/cards" component={CardsScreen} />
      <Route path="/nuva-signup" component={NuvaSignupScreen} />
      <Route path="/profile" component={ProfileScreen} />
      <Route path="/health" component={HealthAnalyticsScreen} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [location] = useLocation();
  
  // Pages that should NOT show bottom navigation
  const hideBottomNav = ['/', '/splash', '/nuva', '/nuva-signup', '/signup', '/dietary', '/health'];
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
