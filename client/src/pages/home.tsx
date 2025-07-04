import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { BackButton } from "@/components/ui/back-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
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
  PieChart
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
  const [timeOfDay] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 17) return "afternoon";
    return "evening";
  });

  // Generate sample data for charts based on current user data
  const generateMonthlyData = () => {
    const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
    const baseRecipes = currentUser?.recipesCompleted || 0;
    const basePoints = currentUser?.cookingPoints || 0;
    
    return {
      recipes: months.map((_, i) => Math.max(0, baseRecipes - (5-i) + Math.floor(Math.random() * 3))),
      cookingPoints: months.map((_, i) => Math.max(0, basePoints - (5-i) * 15 + Math.floor(Math.random() * 20))),
      orders: months.map((_, i) => Math.floor(Math.random() * 8) + 2),
    };
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black pb-20">
      {/* Header */}
      <div className="bg-gray-800/90 backdrop-blur-sm border-b border-gray-700 px-4 py-4 flex items-center gap-3">
        <BackButton to="/" />
        <h1 className="text-lg font-semibold text-white">NutraGenie</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Welcome Card */}
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{currentUser?.avatar || "👨‍🍳"}</span>
              <div>
                <h2 className="text-xl font-bold">{getPersonalizedGreeting()[0]}</h2>
                <p className="text-blue-100">{getPersonalizedGreeting()[1]}</p>
              </div>
            </div>
            {currentUser?.selectedChef && (
              <div className="flex items-center gap-2 mt-4 text-blue-100">
                <span className="text-lg">{currentUser.selectedChef.emoji}</span>
                <span className="text-sm">Chef {currentUser.selectedChef.name} is ready to help!</span>
              </div>
            )}
          </div>
          <div className="absolute -right-6 -bottom-6 text-6xl opacity-20">🍳</div>
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
                onClick={() => setLocation(action.path)}
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

        {/* Cooking Analytics Charts */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 size={20} />
            Cooking Analytics
          </h3>
          
          {/* Recipe Progress Bar Chart */}
          <Card className="p-4 mb-4 bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-white">Monthly Recipe Progress</h4>
              <Badge variant="outline" className="text-indigo-300 border-indigo-300/50 bg-indigo-500/20">
                Last 6 Months
              </Badge>
            </div>
            <div className="h-48 bg-white rounded-lg p-2">
              <Bar data={recipesChartData} options={chartOptions} />
            </div>
          </Card>

          {/* Points & Orders Line Chart */}
          <Card className="p-4 mb-4 bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-white">Activity Trends</h4>
              <Badge variant="outline" className="text-purple-300 border-purple-300/50 bg-purple-500/20">
                Trending Up
              </Badge>
            </div>
            <div className="h-48 bg-white rounded-lg p-2">
              <Line data={progressChartData} options={lineChartOptions} />
            </div>
          </Card>

          {/* Achievement Breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white">Achievements</h4>
                <PieChart size={16} className="text-white/60" />
              </div>
              <div className="h-32 bg-white rounded-lg p-2">
                <Doughnut data={achievementData} options={doughnutOptions} />
              </div>
            </Card>

            <Card className="p-4 bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white">This Month</h4>
                <TrendingUp size={16} className="text-green-400" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/80">Recipes</span>
                  <span className="font-semibold text-indigo-400">
                    {monthlyData.recipes[monthlyData.recipes.length - 1] || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/80">Points</span>
                  <span className="font-semibold text-purple-400">
                    {monthlyData.cookingPoints[monthlyData.cookingPoints.length - 1] || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/80">Orders</span>
                  <span className="font-semibold text-emerald-400">
                    {monthlyData.orders[monthlyData.orders.length - 1] || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/80">Streak</span>
                  <span className="font-semibold text-orange-400">
                    {currentUser?.weekStreak || 0} days
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Gaming/Achievements */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Award size={20} />
            Achievements
          </h3>
          <div className="space-y-2">
            <Card className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  🏆
                </div>
                <div>
                  <div className="font-medium text-gray-800">Master Chef</div>
                  <div className="text-sm text-gray-600">Complete 10 recipes</div>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Earned</Badge>
            </Card>
            
            <Card className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  🔥
                </div>
                <div>
                  <div className="font-medium text-gray-800">Streak Master</div>
                  <div className="text-sm text-gray-600">7-day cooking streak</div>
                </div>
              </div>
              <Badge variant="outline">2 more days</Badge>
            </Card>
          </div>
        </div>

        {/* Trending */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Target size={20} />
            Trending This Week
          </h3>
          <div className="space-y-2">
            {["Quinoa Buddha Bowl", "Spicy Korean Kimchi Soup", "Mediterranean Pasta"].map((dish, index) => (
              <Card key={index} className="p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-800">{dish}</div>
                  <div className="text-sm text-gray-600">{Math.floor(Math.random() * 50) + 20} people cooking</div>
                </div>
                <Badge variant="outline">#{index + 1}</Badge>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Award size={20} />
            Achievements
          </h3>
          <div className="space-y-3">
            <Card className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  🏆
                </div>
                <div>
                  <div className="font-medium text-gray-800">Master Chef</div>
                  <div className="text-sm text-gray-600">Complete 10 recipes</div>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                {(currentUser?.recipesCompleted || 0) >= 10 ? "Earned!" : `${Math.max(0, 10 - (currentUser?.recipesCompleted || 0))} left`}
              </Badge>
            </Card>
            
            <Card className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  🔥
                </div>
                <div>
                  <div className="font-medium text-gray-800">Streak Master</div>
                  <div className="text-sm text-gray-600">7-day cooking streak</div>
                </div>
              </div>
              <Badge variant="outline">
                {(currentUser?.weekStreak || 0) >= 7 ? "Earned!" : `${Math.max(0, 7 - (currentUser?.weekStreak || 0))} days left`}
              </Badge>
            </Card>

            <Card className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  ⭐
                </div>
                <div>
                  <div className="font-medium text-gray-800">Point Collector</div>
                  <div className="text-sm text-gray-600">Earn 100 cooking points</div>
                </div>
              </div>
              <Badge variant="outline">
                {(currentUser?.cookingPoints || 0) >= 100 ? "Earned!" : `${Math.max(0, 100 - (currentUser?.cookingPoints || 0))} points left`}
              </Badge>
            </Card>
          </div>
        </div>

        {/* Today's Suggestions */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Target size={20} />
            Suggested for You
          </h3>
          <div className="space-y-3">
            {["Mediterranean Quinoa Bowl", "Spicy Korean Bibimbap", "Classic Italian Carbonara"].map((dish, index) => (
              <Card 
                key={index} 
                className="p-4 cursor-pointer hover:shadow-md transition-all duration-200"
                onClick={() => setLocation("/recipes")}
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