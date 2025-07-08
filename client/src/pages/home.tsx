import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { BackButton } from "@/components/ui/back-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  const [activeView, setActiveView] = useState<'quickActions' | 'healthTracking'>('quickActions');
  
  // Health form state management
  const [showHealthForm, setShowHealthForm] = useState(false);
  const [healthData, setHealthData] = useState({
    date: new Date().toISOString().split('T')[0],
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    bloodSugar: '',
    weight: ''
  });
  
  // Current metrics display (would normally come from API)
  const [currentMetrics, setCurrentMetrics] = useState({
    bloodPressure: '122/78',
    bloodSugar: '94',
    weight: '165'
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

  // Handle health form submission
  const handleHealthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update current metrics with new data
    if (healthData.bloodPressureSystolic && healthData.bloodPressureDiastolic) {
      setCurrentMetrics(prev => ({
        ...prev,
        bloodPressure: `${healthData.bloodPressureSystolic}/${healthData.bloodPressureDiastolic}`
      }));
    }
    
    if (healthData.bloodSugar) {
      setCurrentMetrics(prev => ({
        ...prev,
        bloodSugar: healthData.bloodSugar
      }));
    }
    
    if (healthData.weight) {
      setCurrentMetrics(prev => ({
        ...prev,
        weight: healthData.weight
      }));
    }
    
    // Reset form and hide it
    setHealthData({
      date: new Date().toISOString().split('T')[0],
      bloodPressureSystolic: '',
      bloodPressureDiastolic: '',
      bloodSugar: '',
      weight: ''
    });
    setShowHealthForm(false);
    
    toast({
      title: "Health Data Updated",
      description: "Your health metrics have been successfully recorded.",
      variant: "default"
    });
  };

  // Toggle health form visibility
  const toggleHealthForm = () => {
    setShowHealthForm(!showHealthForm);
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
      label: "Past Recipes", 
      icon: History, 
      color: "bg-purple-500", 
      path: "/profile?tab=recipes",
      description: "Review your history"
    },
    { 
      label: "Grocery List", 
      icon: ShoppingCart, 
      color: "bg-emerald-500", 
      path: "/grocery-list",
      description: "Manage shopping"
    },
    { 
      label: "Explore Recipes", 
      icon: Utensils, 
      color: "bg-blue-500", 
      path: "/recipes",
      description: "Find new dishes"
    },
    { 
      label: "Interactive Voice Cooking", 
      icon: Play, 
      color: "bg-indigo-500", 
      path: "/voice-cooking",
      description: "Start cooking with AI"
    }
  ];

  const getPersonalizedGreeting = () => {
    const greetings: { [key: string]: string[] } = {
      morning: [`Good morning!`, "What's for breakfast today?"],
      afternoon: [`Good afternoon!`, "Ready for a delicious lunch?"],
      evening: [`Good evening!`, "Time for a wonderful dinner?"]
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pb-20">
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
        <Card className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="space-y-1">
            {/* Row 1 - Avatars with Greeting Between */}
            <div className="flex items-center justify-between">
              {/* User Avatar - Left */}
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img 
                  src={user1Avatar} 
                  alt="User Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Greeting & Username - Center */}
              <div className="text-center">
                <h2 className="text-lg font-bold">{getPersonalizedGreeting()[0]}</h2>
                <p className="text-lg font-bold">{currentUser?.nickname || "Chef"}</p>
              </div>
              
              {/* Chef Marcus Avatar - Right */}
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img 
                  src={chef1Avatar} 
                  alt="Chef Marcus" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Row 2 - Motivational Text */}
            <div className="text-center">
              <p className="text-purple-100 text-xs">Let's cook something exciting today!</p>
            </div>
          </div>
        </Card>

        {/* Toggle Header */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 
              className={`text-lg font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                activeView === 'quickActions' ? 'text-indigo-300' : 'text-white'
              }`}
              onClick={() => setActiveView('quickActions')}
            >
              <ChefHat size={20} />
              Quick Actions
            </h3>
            <h3 
              className={`text-lg font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                activeView === 'healthTracking' ? 'text-indigo-300' : 'text-white'
              }`}
              onClick={() => setActiveView('healthTracking')}
            >
              <Activity size={20} />
              Health & Nutrition
            </h3>
          </div>

          {/* Quick Actions View */}
          {activeView === 'quickActions' && (
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
          )}
        </div>

          {/* Health & Nutrition Tracking View */}
          {activeView === 'healthTracking' && (
            <div>
              
              {/* Add Health Reading Button - Enhanced */}
              <button 
                onClick={toggleHealthForm}
                className="w-full px-4 py-3 mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <div className={`transition-transform duration-200 ${showHealthForm ? 'rotate-180' : ''}`}>
                  {showHealthForm ? '✕' : '+'}
                </div>
                {showHealthForm ? 'Cancel Entry' : 'Add Health Readings'}
              </button>

              {/* Collapsible Health Form - Enhanced */}
              <div className={`overflow-hidden transition-all duration-500 ease-out ${
                showHealthForm ? 'max-h-80 opacity-100 mb-2 transform translate-y-0' : 'max-h-0 opacity-0 transform -translate-y-2'
              }`}>
                <Card className="p-4 bg-transparent border-2 border-white shadow-none rounded-xl">
                  <form onSubmit={handleHealthSubmit} className="space-y-3">
                    {/* Date Selection - Compact */}
                    <div className="flex items-center gap-2">
                      <div className="text-indigo-400">📅</div>
                      <Label htmlFor="date" className="text-xs font-semibold text-white">Date:</Label>
                      <Input
                        type="date"
                        id="date"
                        value={healthData.date}
                        onChange={(e) => setHealthData({...healthData, date: e.target.value})}
                        className="h-8 text-sm border-2 border-white bg-transparent text-white focus:ring-white focus:border-cyan-300 flex-1"
                      />
                    </div>

                    {/* Health Inputs with Icons */}
                    <div className="grid grid-cols-4 gap-2">
                      {/* Systolic BP */}
                      <div className="bg-transparent p-2 rounded-lg border border-red-300 hover:border-red-400 transition-colors">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-red-400 text-xs">❤️</span>
                          <Label htmlFor="systolic" className="text-xs font-semibold text-red-300">Sys</Label>
                        </div>
                        <Input
                          type="number"
                          id="systolic"
                          placeholder="120"
                          value={healthData.bloodPressureSystolic}
                          onChange={(e) => setHealthData({...healthData, bloodPressureSystolic: e.target.value})}
                          className="h-8 text-sm border-0 bg-transparent text-center font-bold text-white placeholder-red-200 focus:ring-red-400 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>

                      {/* Diastolic BP */}
                      <div className="bg-transparent p-2 rounded-lg border border-red-300 hover:border-red-400 transition-colors">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-red-400 text-xs">💓</span>
                          <Label htmlFor="diastolic" className="text-xs font-semibold text-red-300">Dia</Label>
                        </div>
                        <Input
                          type="number"
                          id="diastolic"
                          placeholder="80"
                          value={healthData.bloodPressureDiastolic}
                          onChange={(e) => setHealthData({...healthData, bloodPressureDiastolic: e.target.value})}
                          className="h-8 text-sm border-0 bg-transparent text-center font-bold text-white placeholder-red-200 focus:ring-red-400 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>

                      {/* Blood Sugar */}
                      <div className="bg-transparent p-2 rounded-lg border border-green-300 hover:border-green-400 transition-colors">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-green-400 text-xs">🩸</span>
                          <Label htmlFor="bloodSugar" className="text-xs font-semibold text-green-300">Sugar</Label>
                        </div>
                        <Input
                          type="number"
                          id="bloodSugar"
                          placeholder="94"
                          value={healthData.bloodSugar}
                          onChange={(e) => setHealthData({...healthData, bloodSugar: e.target.value})}
                          className="h-8 text-sm border-0 bg-transparent text-center font-bold text-white placeholder-green-200 focus:ring-green-400 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>

                      {/* Weight */}
                      <div className="bg-transparent p-2 rounded-lg border border-blue-300 hover:border-blue-400 transition-colors">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-blue-400 text-xs">⚖️</span>
                          <Label htmlFor="weight" className="text-xs font-semibold text-blue-300">Weight</Label>
                        </div>
                        <Input
                          type="number"
                          id="weight"
                          placeholder="165"
                          value={healthData.weight}
                          onChange={(e) => setHealthData({...healthData, weight: e.target.value})}
                          className="h-8 text-sm border-0 bg-transparent text-center font-bold text-white placeholder-blue-200 focus:ring-blue-400 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white h-10 text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                    >
                      Save Health Data
                    </Button>
                  </form>
                </Card>
              </div>
          
          {/* Compact Health Metrics Card */}
          <Card className="p-4 mb-2 bg-transparent border-2 border-white shadow-none">
            <div className="space-y-4">
              
              {/* Blood Pressure & Blood Sugar with Trends */}
              <div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {/* Blood Pressure */}
                  <div className="bg-transparent p-4 rounded-xl border-2 border-red-400 hover:border-red-300 transition-all duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-red-300">❤️</span>
                      <div className="text-xs font-semibold text-red-100">Blood Pressure</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xl font-bold text-red-200">{currentMetrics.bloodPressure}</div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  
                  {/* Blood Sugar */}
                  <div className="bg-transparent p-4 rounded-xl border-2 border-green-400 hover:border-green-300 transition-all duration-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-300">🩸</span>
                      <div className="text-xs font-semibold text-green-100">Blood Sugar</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xl font-bold text-green-200">{currentMetrics.bloodSugar} mg/dL</div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                </div>
                
                {/* Trend Visualization - Sample Graph Options */}
                <div className="bg-transparent border-2 border-indigo-400 p-3 rounded-lg">
                  <div className="text-sm font-bold text-white mb-2">7-Day Trends</div>
                  <div className="grid grid-cols-2 gap-4">
                    {/* BP Trend - Bar Charts with Color Coding */}
                    <div>
                      <div className="text-xs font-bold text-white mb-1">Blood Pressure</div>
                      <div className="flex items-end gap-1 h-8">
                        {/* Day 1: 118/75 - Normal (green) */}
                        <div className="flex-1 bg-green-500 rounded-sm h-5"></div>
                        {/* Day 2: 125/82 - Slightly high (red) */}
                        <div className="flex-1 bg-red-400 rounded-sm h-6"></div>
                        {/* Day 3: 119/78 - Normal (green) */}
                        <div className="flex-1 bg-green-500 rounded-sm h-5"></div>
                        {/* Day 4: 135/88 - High (red) */}
                        <div className="flex-1 bg-red-600 rounded-sm h-8"></div>
                        {/* Day 5: 121/79 - Normal (green) */}
                        <div className="flex-1 bg-green-500 rounded-sm h-5"></div>
                        {/* Day 6: 124/81 - Slightly high (red) */}
                        <div className="flex-1 bg-red-400 rounded-sm h-6"></div>
                        {/* Day 7: 122/78 - Normal (green) - Today */}
                        <div className="flex-1 bg-green-600 rounded-sm h-6"></div>
                      </div>

                    </div>
                    {/* Sugar Trend - Bar Charts with Color Coding */}
                    <div>
                      <div className="text-xs font-bold text-white mb-1">Blood Sugar</div>
                      <div className="flex items-end gap-1 h-8">
                        {/* Day 1: 88 mg/dL - Normal (green) */}
                        <div className="flex-1 bg-green-500 rounded-sm h-5"></div>
                        {/* Day 2: 125 mg/dL - High (red) */}
                        <div className="flex-1 bg-red-400 rounded-sm h-7"></div>
                        {/* Day 3: 92 mg/dL - Normal (green) */}
                        <div className="flex-1 bg-green-500 rounded-sm h-5"></div>
                        {/* Day 4: 145 mg/dL - High (red) */}
                        <div className="flex-1 bg-red-600 rounded-sm h-8"></div>
                        {/* Day 5: 89 mg/dL - Normal (green) */}
                        <div className="flex-1 bg-green-500 rounded-sm h-5"></div>
                        {/* Day 6: 110 mg/dL - Slightly high (red) */}
                        <div className="flex-1 bg-red-400 rounded-sm h-6"></div>
                        {/* Day 7: 94 mg/dL - Normal (green) - Today */}
                        <div className="flex-1 bg-green-600 rounded-sm h-5"></div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              
              {/* Daily Goals */}
              <div>
                <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                  <Target className="text-green-300" size={16} />
                  Daily Goals
                </h4>
                
                <div className="bg-transparent border-2 border-indigo-400 p-3 rounded-lg">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-xs text-white">TDEE</div>
                      <div className="text-lg font-bold text-green-300">2,247</div>
                    </div>
                    <div>
                      <div className="text-xs text-white">Protein</div>
                      <div className="text-lg font-bold text-blue-300">156g</div>
                    </div>
                    <div>
                      <div className="text-xs text-white">Water</div>
                      <div className="text-lg font-bold text-cyan-300">2.1L</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Today's Activity - Single Row */}
              <div>
                <h4 className="text-base font-semibold text-white mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="text-blue-300" size={16} />
                    Today's Activity
                  </div>
                  <Badge className="bg-transparent border border-green-300 text-green-300 text-xs rounded-sm px-2 py-1">Live</Badge>
                </h4>
                
                <div className="grid gap-2" style={{gridTemplateColumns: "1fr 1fr 1fr 1.5fr"}}>
                  {/* Steps */}
                  <div className="bg-transparent border-2 border-blue-400 p-2 rounded text-center">
                    <div className="text-xs text-blue-100">Steps</div>
                    <div className="text-lg font-bold text-blue-200">8,247</div>
                    <div className="flex justify-center mt-1">
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  
                  {/* Calories */}
                  <div className="bg-transparent border-2 border-orange-400 p-2 rounded text-center">
                    <div className="text-xs text-orange-100">Calories</div>
                    <div className="text-lg font-bold text-orange-200">524</div>
                    <div className="flex justify-center mt-1">
                      <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                    </div>
                  </div>
                  
                  {/* Distance */}
                  <div className="bg-transparent border-2 border-cyan-400 p-2 rounded text-center">
                    <div className="text-xs text-cyan-100">Distance</div>
                    <div className="text-lg font-bold text-cyan-200">4.1 mi</div>
                    <div className="flex justify-center mt-1">
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  
                  {/* Heart Rate - Wider */}
                  <div className="bg-transparent border-2 border-red-400 p-2 rounded text-center">
                    <div className="text-xs text-red-100">Heart Rate</div>
                    <div className="text-lg font-bold text-red-200">72 bpm</div>
                    <div className="flex justify-center mt-1">
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Monthly Readings Link */}
              <div className="text-center">
                <p className="text-xs text-gray-500">For monthly readings go to profile page</p>
              </div>
            </div>
          </Card>
            </div>
          )}

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

      </div>

      <BottomNavigation />
    </div>
  );
}