import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { BackButton } from "@/components/ui/back-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { useToast } from "@/hooks/use-toast";
import user1Avatar from "@/assets/avatars/user/user1.png";
import chef1Avatar from "@/assets/avatars/chef/chef1.png";
import { 
  TrendingUp, 
  Award, 
  Target, 
  MessageCircle, 
  ChefHat, 
  Clock, 
  Star,
  Play,
  ShoppingCart,
  Utensils,
  BarChart3,
  PieChart,
  AlertCircle,
  Loader2,
  RefreshCw,
  UserX,
  History,
  Activity,
  Heart,
  Zap
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function HomeScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage<any>("nutragenie_user", null);
  const [isLoading, setIsLoading] = useState(false);
  const [chartError, setChartError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const [timeOfDay] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 17) return "afternoon";
    return "evening";
  });

  // Check if user exists and redirect if not
  useEffect(() => {
    if (!currentUser) {
      toast({
        title: "Welcome to NutraGenie",
        description: "Please create an account to get started",
        variant: "default"
      });
      setLocation("/signup");
    }
  }, [currentUser, setLocation, toast]);

  // Handle navigation with error catching
  const handleNavigation = (path: string) => {
    try {
      setIsLoading(true);
      setLocation(path);
    } catch (error) {
      toast({
        title: "Navigation Error",
        description: "Unable to navigate. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Generate sample data for charts based on current user data with error handling
  const generateMonthlyData = () => {
    try {
      const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
      const baseRecipes = currentUser?.recipesCompleted || 5;
      const basePoints = currentUser?.cookingPoints || 35;
      
      return {
        recipes: months.map((_, i) => Math.max(0, baseRecipes - (5-i) + Math.floor(Math.random() * 3))),
        cookingPoints: months.map((_, i) => Math.max(0, basePoints - (5-i) * 15 + Math.floor(Math.random() * 20))),
        orders: months.map((_, i) => Math.floor(Math.random() * 8) + 2),
      };
    } catch (error) {
      setChartError("Unable to load chart data");
      return {
        recipes: [1, 2, 3, 4, 5, 6],
        cookingPoints: [15, 25, 35, 45, 55, 65],
        orders: [2, 3, 4, 5, 6, 7],
      };
    }
  };

  const monthlyData = generateMonthlyData();
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  // Chart configurations
  const recipesChartData = {
    labels: months,
    datasets: [
      {
        label: 'Recipes Cooked',
        data: monthlyData.recipes,
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const progressChartData = {
    labels: months,
    datasets: [
      {
        label: 'Cooking Points',
        data: monthlyData.cookingPoints,
        borderColor: 'rgba(168, 85, 247, 1)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4,
        pointBackgroundColor: 'rgba(168, 85, 247, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
      },
      {
        label: 'Shopping Orders',
        data: monthlyData.orders,
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
      },
    ],
  };

  const achievementData = {
    labels: ['Completed', 'In Progress', 'Locked'],
    datasets: [
      {
        data: [3, 2, 5],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(156, 163, 175, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11,
          },
        },
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          color: '#6B7280',
          font: {
            size: 11,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11,
          },
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#6B7280',
          font: {
            size: 11,
          },
        },
      },
    },
  };

  const quickActions = [
    { 
      label: "Voice Cooking", 
      icon: Play, 
      color: "bg-indigo-500", 
      path: "/voice-cooking",
      description: "Start cooking with AI"
    },
    { 
      label: "Explore Recipes", 
      icon: Utensils, 
      color: "bg-blue-500", 
      path: "/recipes",
      description: "Find new dishes"
    },
    { 
      label: "Past Recipes", 
      icon: History, 
      color: "bg-purple-500", 
      path: "/recipes?filter=past",
      description: "Review your history"
    },
    { 
      label: "Grocery List", 
      icon: ShoppingCart, 
      color: "bg-emerald-500", 
      path: "/grocery-list",
      description: "Manage shopping"
    }
  ];

  const getPersonalizedGreeting = () => {
    const name = currentUser?.nickname || "Chef";
    const greetings: { [key: string]: string[] } = {
      morning: [`Good morning, ${name}!`, "What's for breakfast today?"],
      afternoon: [`Good afternoon, ${name}!`, "Ready for a delicious lunch?"],
      evening: [`Good evening, ${name}!`, "Time for a wonderful dinner?"]
    };
    return greetings[timeOfDay] || greetings.morning;
  };

  // Handle missing user data scenario
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-6 text-center">
          <UserX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Account Required</h2>
          <p className="text-gray-600 mb-4">
            Please create an account to access your personalized dashboard
          </p>
          <Button 
            onClick={() => handleNavigation("/signup")}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Create Account
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-500 pb-20">
      {/* Header */}
      <div className="bg-white/20 backdrop-blur-sm border-b border-white/30 px-4 py-4 flex items-center gap-3">
        <BackButton to="/" />
        <h1 className="text-lg font-semibold text-white drop-shadow-md">NutraGenie</h1>
        {chartError && (
          <div className="ml-auto flex items-center gap-2 text-amber-300 text-sm">
            <AlertCircle className="w-4 h-4" />
            Data Issue
          </div>
        )}
      </div>

      <div className="p-4 space-y-6">
        {/* Compact Welcome Card */}
        <Card className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <div className="space-y-2">
            {/* Row 1 - Avatars with Greeting Between */}
            <div className="flex items-center justify-between">
              {/* User Avatar - Left */}
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img 
                  src={user1Avatar} 
                  alt="User Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Greeting - Center */}
              <div className="text-center">
                <h2 className="text-lg font-bold">{getPersonalizedGreeting()[0]}</h2>
              </div>
              
              {/* Chef Marcus Avatar - Right */}
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img 
                  src={chef1Avatar} 
                  alt="Chef Marcus" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Row 2 - User Nickname */}
            <div className="text-center">
              <p className="text-blue-100 text-sm font-medium">{currentUser?.nickname || "Chef"}</p>
            </div>
            
            {/* Row 3 - Motivational Text */}
            <div className="text-center">
              <p className="text-blue-100 text-xs">Let's cook something exciting today!</p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <ChefHat size={20} />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="p-4 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
                onClick={() => handleNavigation(action.path)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white`}>
                    <action.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{action.label}</div>
                    <div className="text-sm text-gray-600">{action.description}</div>
                  </div>
                  <div className="text-gray-400">→</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Health & Nutrition Metrics - Card #1 */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 drop-shadow-md">
            <Activity size={20} />
            Health & Nutrition Tracking
          </h3>
          
          {/* Comprehensive Health Metrics Card */}
          <Card className="p-6 mb-4 bg-white/95 backdrop-blur-md border-white/30 shadow-xl">
            <div className="space-y-6">
              
              {/* Wearable Data Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Heart className="text-red-500" size={18} />
                  Live Health Data
                  <Badge className="bg-green-100 text-green-800 text-xs">Synced with Apple/Android</Badge>
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Steps & Activity */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="text-blue-600" size={16} />
                      <span className="text-sm font-medium text-gray-700">Daily Steps</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">8,247</div>
                    <div className="text-xs text-gray-600">Goal: 10,000 • 82% complete</div>
                    <div className="mt-2 bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  
                  {/* Distance */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="text-purple-600" size={16} />
                      <span className="text-sm font-medium text-gray-700">Distance</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">4.1 mi</div>
                    <div className="text-xs text-gray-600">Active: 45 mins</div>
                  </div>
                  
                  {/* Calories Burned */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="text-orange-600" size={16} />
                      <span className="text-sm font-medium text-gray-700">Calories Burned</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-600">524</div>
                    <div className="text-xs text-gray-600">Exercise + BMR</div>
                  </div>
                  
                  {/* Heart Rate */}
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="text-red-600" size={16} />
                      <span className="text-sm font-medium text-gray-700">Heart Rate</span>
                    </div>
                    <div className="text-2xl font-bold text-red-600">72 bpm</div>
                    <div className="text-xs text-gray-600">Resting • Normal range</div>
                  </div>
                </div>
              </div>

              {/* TDEE & Nutrition Goals */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Target className="text-green-600" size={18} />
                  Daily Nutrition Goals
                </h4>
                
                <div className="grid grid-cols-1 gap-4">
                  {/* TDEE Calculator Results */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Daily Calories Needed</div>
                        <div className="text-2xl font-bold text-green-600">2,247</div>
                        <div className="text-xs text-gray-600">TDEE-based calculation</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Protein Target</div>
                        <div className="text-2xl font-bold text-blue-600">156g</div>
                        <div className="text-xs text-gray-600">1.2g per kg body weight</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Today's Consumption */}
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Calories Consumed</div>
                        <div className="text-2xl font-bold text-yellow-600">1,834</div>
                        <div className="text-xs text-gray-600">From recipes tracked</div>
                        <div className="mt-2 bg-yellow-200 rounded-full h-2">
                          <div className="bg-yellow-600 h-2 rounded-full w-4/5"></div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Protein Consumed</div>
                        <div className="text-2xl font-bold text-blue-600">127g</div>
                        <div className="text-xs text-gray-600">81% of daily goal</div>
                        <div className="mt-2 bg-blue-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full w-4/5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Manual Health Input Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <BarChart3 className="text-indigo-600" size={18} />
                  Health Metrics to Track
                </h4>
                
                <div className="grid grid-cols-2 gap-3">
                  {/* Blood Pressure Input */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-gray-700 mb-2">Blood Pressure</div>
                    <div className="flex gap-2">
                      <input className="w-16 px-2 py-1 border rounded text-sm" placeholder="120" />
                      <span className="text-gray-500">/</span>
                      <input className="w-16 px-2 py-1 border rounded text-sm" placeholder="80" />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Last: 118/75 (Jan 3)</div>
                  </div>
                  
                  {/* Blood Sugar Input */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-gray-700 mb-2">Blood Sugar</div>
                    <div className="flex gap-2">
                      <input className="w-20 px-2 py-1 border rounded text-sm" placeholder="95" />
                      <span className="text-xs text-gray-500 mt-1">mg/dL</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Last: 92 (Jan 2)</div>
                  </div>
                </div>
                
                <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors">
                  Add Today's Readings
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Single Achievement Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 drop-shadow-md">
            <Award size={20} />
            Achievement
          </h3>
          
          <Card className="p-4 mb-4 bg-white/95 backdrop-blur-md border-white/30 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  🏆
                </div>
                <div>
                  <div className="font-medium text-gray-800">Master Chef</div>
                  <div className="text-sm text-gray-600">Complete 10 recipes</div>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Earned</Badge>
            </div>
          </Card>
        </div>

        {/* Trending This Week */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 drop-shadow-md">
            <TrendingUp size={20} />
            Trending This Week
          </h3>
          <div className="space-y-3">
            {["Mediterranean Quinoa Bowl", "Spicy Korean Bibimbap", "Classic Italian Carbonara"].map((dish, index) => (
              <Card 
                key={index} 
                className="p-4 cursor-pointer hover:shadow-md transition-all duration-200"
                onClick={() => handleNavigation("/recipes")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      🍽️
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{dish}</div>
                      <div className="text-sm text-gray-600">Based on your preferences</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">#{index + 1}</Badge>
                    <div className="text-gray-400">→</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>

      <BottomNavigation />
    </div>
  );
}