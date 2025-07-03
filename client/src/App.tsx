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
import CookingScreen from "@/pages/cooking";
import ProfileScreen from "@/pages/profile";
import HealthAnalyticsScreen from "@/pages/health";
import HomeScreen from "@/pages/home";
import CookScreen from "@/pages/cook";
import TakeOutScreen from "@/pages/takeout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={SplashScreen} />
      <Route path="/signup" component={SignupScreen} />
      <Route path="/dietary" component={DietaryScreen} />
      <Route path="/home" component={HomeScreen} />
      <Route path="/recipes" component={RecipesScreen} />
      <Route path="/review-recipes" component={ReviewRecipesScreen} />
      <Route path="/cook" component={CookScreen} />
      <Route path="/takeout" component={TakeOutScreen} />
      <Route path="/cooking/:recipeId?" component={CookingScreen} />
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
