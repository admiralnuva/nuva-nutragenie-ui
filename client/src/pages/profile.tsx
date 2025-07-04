import { useState } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BackButton } from "@/components/ui/back-button";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { 
  User, 
  Edit, 
  Apple, 
  ShoppingCart, 
  FileText, 
  BarChart3, 
  Calendar,
  DollarSign,
  Clock,
  TrendingUp,
  TrendingDown,
  Target
} from "lucide-react";

// Mock data for demonstration
const mockOrderHistory = [
  { id: "IC123456", date: "2025-01-03", store: "Whole Foods", items: 12, total: 89.47, status: "Delivered" },
  { id: "IC123455", date: "2025-01-01", store: "Safeway", items: 8, total: 67.23, status: "Delivered" },
  { id: "IC123454", date: "2024-12-29", store: "Costco", items: 15, total: 124.99, status: "Delivered" }
];

const mockGroceryHistory = [
  { id: 1, date: "2025-01-03", items: 12, printed: true },
  { id: 2, date: "2025-01-01", items: 8, printed: false },
  { id: 3, date: "2024-12-29", items: 15, printed: true }
];

const mockAnalytics = {
  totalOrders: 23,
  totalSpent: 1847.32,
  avgOrderValue: 80.32,
  favoriteStore: "Whole Foods",
  monthlySpending: [120, 150, 180, 210, 185, 165],
  nutritionGoals: {
    calories: { target: 2000, actual: 1850, percentage: 92 },
    protein: { target: 150, actual: 142, percentage: 95 },
    carbs: { target: 250, actual: 210, percentage: 84 },
    fat: { target: 67, actual: 71, percentage: 106 }
  }
};

export default function ProfileScreen() {
  const [, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useLocalStorage<any>("nutragenie_user", null);
  const [activeSection, setActiveSection] = useState("account");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(currentUser || {});

  const handleSaveProfile = () => {
    setCurrentUser(editedUser);
    setIsEditing(false);
  };

  const sections = [
    { id: "account", title: "Account Information", icon: User },
    { id: "dietary", title: "Dietary Preferences", icon: Apple },
    { id: "grocery", title: "Grocery List History", icon: FileText },
    { id: "orders", title: "Instacart Orders", icon: ShoppingCart },
    { id: "analytics", title: "Analytics Dashboard", icon: BarChart3 }
  ];

  const renderAccountSection = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Account Information
        </CardTitle>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            <div className="space-y-2">
              <Label>Avatar</Label>
              <div className="flex gap-2">
                {["😀", "👩", "👨", "🧑", "👩‍🦱", "👨‍🦱"].map((emoji) => (
                  <Button
                    key={emoji}
                    variant={editedUser.avatar === emoji ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEditedUser({...editedUser, avatar: emoji})}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Nickname</Label>
              <Input
                value={editedUser.nickname || ""}
                onChange={(e) => setEditedUser({...editedUser, nickname: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Age Group</Label>
              <div className="flex gap-2">
                {["18-24", "25-30", "31-40", "41-50", "51+"].map((age) => (
                  <Button
                    key={age}
                    variant={editedUser.ageGroup === age ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEditedUser({...editedUser, ageGroup: age})}
                  >
                    {age}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                value={editedUser.phoneNumber || ""}
                onChange={(e) => setEditedUser({...editedUser, phoneNumber: e.target.value})}
                placeholder="(555) 123-4567"
              />
            </div>
            <Button onClick={handleSaveProfile} className="w-full">
              Save Changes
            </Button>
          </>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currentUser?.avatar || "👤"}</span>
              <div>
                <div className="font-medium">{currentUser?.nickname || "User"}</div>
                <div className="text-sm text-gray-600">{currentUser?.ageGroup || "Age not set"}</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <div>Phone: {currentUser?.phoneNumber || "Not provided"}</div>
              <div>Member since: January 2025</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderDietarySection = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Apple className="w-5 h-5" />
          Dietary Preferences
        </CardTitle>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setLocation("/dietary")}
        >
          <Edit className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Dietary Restrictions</h4>
          <div className="flex flex-wrap gap-2">
            {(currentUser?.dietaryRestrictions || ["Vegetarian"]).map((restriction: string) => (
              <Badge key={restriction} variant="secondary">{restriction}</Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Health Conditions</h4>
          <div className="flex flex-wrap gap-2">
            {(currentUser?.healthConditions || ["None"]).map((condition: string) => (
              <Badge key={condition} variant="outline">{condition}</Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Fitness Goals</h4>
          <div className="flex flex-wrap gap-2">
            {(currentUser?.fitnessGoals || ["Wellness"]).map((goal: string) => (
              <Badge key={goal} className="bg-green-100 text-green-800">{goal}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderGroceryHistory = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Grocery List History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockGroceryHistory.map((list) => (
          <div key={list.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <div className="font-medium">{list.date}</div>
              <div className="text-sm text-gray-600">{list.items} items</div>
            </div>
            <div className="flex gap-2">
              {list.printed && <Badge variant="secondary">Printed</Badge>}
              <Button size="sm" variant="outline">
                Print
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderOrderHistory = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Instacart Order History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockOrderHistory.map((order) => (
          <div key={order.id} className="p-3 border rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium">Order #{order.id}</div>
                <div className="text-sm text-gray-600">{order.store}</div>
              </div>
              <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>
                {order.status}
              </Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span>{order.date}</span>
              <span>{order.items} items • ${order.total}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderAnalytics = () => (
    <div className="space-y-4">
      {/* Overview Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Analytics Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{mockAnalytics.totalOrders}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${mockAnalytics.totalSpent}</div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${mockAnalytics.avgOrderValue}</div>
              <div className="text-sm text-gray-600">Avg Order</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{mockAnalytics.favoriteStore}</div>
              <div className="text-sm text-gray-600">Favorite Store</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nutrition Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Nutrition Goals Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(mockAnalytics.nutritionGoals).map(([key, data]) => (
            <div key={key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="capitalize">{key}</span>
                <span>{data.actual}/{data.target}g</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${data.percentage > 100 ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{width: `${Math.min(data.percentage, 100)}%`}}
                  />
                </div>
                <span className="text-xs text-gray-600">{data.percentage}%</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case "account": return renderAccountSection();
      case "dietary": return renderDietarySection();
      case "grocery": return renderGroceryHistory();
      case "orders": return renderOrderHistory();
      case "analytics": return renderAnalytics();
      default: return renderAccountSection();
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-bold mb-4">Please Sign In</h2>
            <Button onClick={() => setLocation("/signup")} className="w-full">
              Go to Sign Up
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center gap-3 mb-4">
          <BackButton to="/home" />
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        </div>
        
        {/* Section Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveSection(section.id)}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <section.icon className="w-4 h-4" />
              {section.title}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4">
        {renderActiveSection()}
      </div>

      <BottomNavigation />
    </div>
  );
}