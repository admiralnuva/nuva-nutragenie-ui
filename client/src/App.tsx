import { Switch, Route, useLocation } from "wouter";
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
import AIVideoCookingScreen from "@/pages/ai-video-cooking";
import ProfileScreen from "@/pages/profile";
import HealthAnalyticsScreen from "@/pages/health";
import HomeScreen from "@/pages/home";

import GroceryListScreen from "@/pages/grocery-list";
import InstacartScreen from "@/pages/instacart";

function Router() {
  return (
    <Switch>
      <Route path="/" component={SplashScreen} />
      <Route path="/signup" component={SignupScreen} />
      <Route path="/dietary" component={DietaryScreen} />
      <Route path="/home" component={HomeScreen} />
      <Route path="/recipes" component={RecipesScreen} />
      <Route path="/recipe-details" component={RecipeDetailsScreen} />
      <Route path="/review-recipes" component={ReviewRecipesScreen} />
      <Route path="/grocery-list" component={GroceryListScreen} />
      <Route path="/instacart" component={InstacartScreen} />


      <Route path="/cooking/:recipeId?" component={CookingScreen} />
      <Route path="/voice-cooking" component={VoiceCookingScreen} />
      <Route path="/ai-video-cooking" component={AIVideoCookingScreen} />
      <Route path="/profile" component={ProfileScreen} />
      <Route path="/health" component={HealthAnalyticsScreen} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [location] = useLocation();
  
  // Pages that should NOT show bottom navigation
  const hideBottomNav = ['/', '/signup', '/dietary', '/health'];
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
