import { BackButton } from "@/components/ui/back-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award, Target, MessageCircle } from "lucide-react";

export default function HomeScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-3">
        <BackButton to="/" />
        <h1 className="text-lg font-semibold text-gray-800">NutraGenie</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Welcome Card */}
        <Card className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <h2 className="text-xl font-bold mb-2">Welcome back, Chef!</h2>
          <p className="text-blue-100">Ready to create something delicious today?</p>
        </Card>

        {/* Analytics Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <TrendingUp size={20} />
            Analytics
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3">
              <div className="text-2xl font-bold text-indigo-600">12</div>
              <div className="text-sm text-gray-600">Recipes Created</div>
            </Card>
            <Card className="p-3">
              <div className="text-2xl font-bold text-orange-600">8</div>
              <div className="text-sm text-gray-600">Orders Placed</div>
            </Card>
            <Card className="p-3">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </Card>
            <Card className="p-3">
              <div className="text-2xl font-bold text-purple-600">95%</div>
              <div className="text-sm text-gray-600">Goal Progress</div>
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

        {/* Comments/Community */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <MessageCircle size={20} />
            Community
          </h3>
          <Card className="p-3">
            <div className="text-center text-gray-500">
              <MessageCircle size={40} className="mx-auto mb-2 text-gray-300" />
              <p className="text-sm">Coming Soon!</p>
              <p className="text-xs text-gray-400">Connect with fellow food enthusiasts</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}