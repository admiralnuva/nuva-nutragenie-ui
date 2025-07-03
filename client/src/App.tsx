import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import SplashScreen from "@/pages/splash";
import SignupScreen from "@/pages/signup";
import DietaryScreen from "@/pages/dietary";
import RecipesScreen from "@/pages/recipes";
import CookingScreen from "@/pages/cooking";
import ProfileScreen from "@/pages/profile";
import HealthAnalyticsScreen from "@/pages/health";

function Router() {
  return (
    <Switch>
      <Route path="/" component={SplashScreen} />
      <Route path="/signup" component={SignupScreen} />
      <Route path="/dietary" component={DietaryScreen} />
      <Route path="/recipes" component={RecipesScreen} />
      <Route path="/cooking/:recipeId?" component={CookingScreen} />
      <Route path="/profile" component={ProfileScreen} />
      <Route path="/health" component={HealthAnalyticsScreen} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="mobile-container bg-white shadow-2xl">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
