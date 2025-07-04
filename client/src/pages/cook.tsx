import { useLocation } from "wouter";
import { BackButton } from "@/components/ui/back-button";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Video, MessageCircle, Clock, Users, Mic, Camera } from "lucide-react";

export default function CookScreen() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-3">
        <BackButton to="/recipes" />
        <h1 className="text-lg font-semibold text-gray-800">NutraGenie Cook</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Interactive Cooking Features */}
        <div className="space-y-3">
          {/* Voice Cooking */}
          <Card className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 rounded-full p-2">
                <Mic className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold">Voice Cooking Assistant</h3>
                <p className="text-green-100 text-sm">Chat with Chef Antoine while cooking</p>
              </div>
            </div>
            <Button 
              onClick={() => setLocation("/voice-cooking")}
              className="w-full bg-white text-green-600 hover:bg-gray-100"
            >
              <Mic className="w-4 h-4 mr-2" />
              Start Voice Session
            </Button>
          </Card>

          {/* AI Video Cooking */}
          <Card className="p-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 rounded-full p-2">
                <Camera className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold">AI Video Cooking</h3>
                <p className="text-purple-100 text-sm">Get visual feedback on your technique</p>
              </div>
              <Badge className="bg-yellow-400 text-yellow-900 text-xs">
                Premium
              </Badge>
            </div>
            <Button 
              onClick={() => setLocation("/ai-video-cooking")}
              className="w-full bg-white text-purple-600 hover:bg-gray-100"
            >
              <Camera className="w-4 h-4 mr-2" />
              Start AI Video Session
            </Button>
          </Card>
        </div>

        {/* Current Recipe */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Continue Cooking</h3>
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                🍜
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">Creamy Tomato Soup</h4>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={14} />
                  <span>Step 3 of 8</span>
                  <Users size={14} />
                  <span>3 servings</span>
                </div>
              </div>
              <Badge className="bg-orange-100 text-orange-800">In Progress</Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                  <Play size={16} className="mr-2" />
                  Continue Cooking
                </Button>
                <Button variant="outline" size="icon">
                  <Video size={16} />
                </Button>
              </div>
              
              <div className="text-sm text-gray-600">
                <div className="font-medium mb-1">Current Step:</div>
                <div>"Add the diced tomatoes and let them simmer for 5 minutes until they start to break down..."</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Features Preview */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Coming Features</h3>
          <div className="space-y-3">
            <Card className="p-4 opacity-75">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Video className="text-blue-600" size={20} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Video Guidance</div>
                  <div className="text-sm text-gray-600">Step-by-step video instructions for each recipe</div>
                </div>
                <Badge variant="outline">Soon</Badge>
              </div>
            </Card>

            <Card className="p-4 opacity-75">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="text-green-600" size={20} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">AI Cooking Assistant</div>
                  <div className="text-sm text-gray-600">Real-time help and tips while you cook</div>
                </div>
                <Badge variant="outline">Soon</Badge>
              </div>
            </Card>

            <Card className="p-4 opacity-75">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  ⏱️
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Smart Timers</div>
                  <div className="text-sm text-gray-600">Automatic timing for each cooking step</div>
                </div>
                <Badge variant="outline">Soon</Badge>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-20 flex-col gap-2">
              📝
              <span className="text-sm">Recipe Notes</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              📸
              <span className="text-sm">Photo Progress</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              🛒
              <span className="text-sm">Missing Items</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              💡
              <span className="text-sm">Get Help</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}