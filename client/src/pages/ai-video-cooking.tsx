import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BackButton } from "@/components/ui/back-button";
import { 
  Camera, 
  CameraOff, 
  Mic, 
  MicOff, 
  Eye, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  Timer,
  Thermometer,
  ChefHat,
  Star,
  Volume2,
  RotateCcw
} from "lucide-react";

// AI Recognition states
type RecognitionState = "scanning" | "detected" | "confirmed" | "warning";

interface AIFeedback {
  state: RecognitionState;
  message: string;
  confidence: number;
  suggestion?: string;
  cookingTip?: string;
}

export default function AIVideoCookingScreen() {
  const [, setLocation] = useLocation();
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [aiFeedback, setAiFeedback] = useState<AIFeedback>({
    state: "scanning",
    message: "Position your ingredients in view of the camera",
    confidence: 0
  });
  const [chefPersonality, setChefPersonality] = useState("encouraging");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [analysisTimer, setAnalysisTimer] = useState(0);

  const recipe = {
    name: "Perfect Scrambled Eggs",
    difficulty: "Beginner",
    totalTime: "8 minutes",
    steps: [
      {
        id: 1,
        instruction: "Crack 3 eggs into a clean bowl",
        aiChecks: ["ingredient_recognition", "quantity_check"],
        expectedItems: ["eggs", "bowl"],
        tips: "Look for fresh eggs with no cracks in the shell"
      },
      {
        id: 2,
        instruction: "Whisk eggs until completely smooth and uniform",
        aiChecks: ["texture_analysis", "color_consistency"],
        expectedItems: ["whisk", "mixed_eggs"],
        tips: "The mixture should be pale yellow with no white streaks"
      },
      {
        id: 3,
        instruction: "Heat butter in pan over medium-low heat",
        aiChecks: ["temperature_detection", "butter_melting"],
        expectedItems: ["pan", "butter"],
        tips: "Butter should sizzle gently, not brown or smoke"
      },
      {
        id: 4,
        instruction: "Pour eggs and stir continuously with spatula",
        aiChecks: ["cooking_technique", "texture_monitoring"],
        expectedItems: ["spatula", "cooking_eggs"],
        tips: "Keep the eggs moving to create small, fluffy curds"
      }
    ]
  };

  // Simulate AI analysis
  useEffect(() => {
    if (isVideoOn) {
      const interval = setInterval(() => {
        setAnalysisTimer(prev => prev + 1);
        simulateAIAnalysis();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isVideoOn, currentStep]);

  const simulateAIAnalysis = () => {
    const currentStepData = recipe.steps[currentStep];
    const feedbackOptions = [
      {
        state: "detected" as RecognitionState,
        message: `Great! I can see your ${currentStepData.expectedItems[0]}`,
        confidence: 95,
        suggestion: "You're doing perfectly - continue with confidence!",
        cookingTip: currentStepData.tips
      },
      {
        state: "warning" as RecognitionState,
        message: "The heat looks a bit high",
        confidence: 88,
        suggestion: "Try reducing the temperature slightly",
        cookingTip: "Lower heat gives you more control over the cooking process"
      },
      {
        state: "confirmed" as RecognitionState,
        message: "Perfect technique! Your eggs look amazing",
        confidence: 98,
        suggestion: "Ready for the next step!",
        cookingTip: "You're mastering the fundamentals beautifully"
      }
    ];

    const randomFeedback = feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)];
    setAiFeedback(randomFeedback);
  };

  const toggleVideo = async () => {
    if (!isVideoOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480 }, 
          audio: false 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setIsVideoOn(true);
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsVideoOn(false);
    }
  };

  const getPersonalityVoice = () => {
    const personalities = {
      encouraging: {
        voice: "warm and supportive",
        style: "🌟 Encouraging",
        color: "bg-green-500"
      },
      professional: {
        voice: "precise and technical", 
        style: "👩‍🍳 Professional",
        color: "bg-blue-500"
      },
      playful: {
        voice: "fun and energetic",
        style: "🎉 Playful", 
        color: "bg-purple-500"
      }
    };
    return personalities[chefPersonality as keyof typeof personalities];
  };

  const getFeedbackColor = () => {
    switch (aiFeedback.state) {
      case "detected": return "border-green-500 bg-green-50";
      case "confirmed": return "border-blue-500 bg-blue-50";
      case "warning": return "border-yellow-500 bg-yellow-50";
      default: return "border-gray-300 bg-gray-50";
    }
  };

  const getFeedbackIcon = () => {
    switch (aiFeedback.state) {
      case "detected": return <Eye className="w-5 h-5 text-green-600" />;
      case "confirmed": return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case "warning": return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default: return <Zap className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center gap-3 mb-3">
          <BackButton to="/cook" />
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-800">AI Video Cooking</h1>
            <p className="text-sm text-gray-600">{recipe.name} • {recipe.difficulty}</p>
          </div>
          <Badge variant="secondary">{currentStep + 1}/{recipe.steps.length}</Badge>
        </div>
        
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(((currentStep + 1) / recipe.steps.length) * 100)}%</span>
          </div>
          <Progress value={((currentStep + 1) / recipe.steps.length) * 100} className="h-2" />
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-4">
        
        {/* AI Video Feed */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              {isVideoOn ? (
                <>
                  <video 
                    ref={videoRef}
                    className="w-full h-64 object-cover"
                    autoPlay 
                    muted 
                    playsInline
                  />
                  {/* AI Analysis Overlay */}
                  <div className="absolute inset-0">
                    {/* Corner indicators */}
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-red-500 text-white">
                        <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                        AI WATCHING
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-black/70 text-white">
                        {analysisTimer}s
                      </Badge>
                    </div>
                    
                    {/* Scanning animation */}
                    {aiFeedback.state === "scanning" && (
                      <div className="absolute inset-0 border-2 border-blue-400 animate-pulse">
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-blue-400 animate-pulse" />
                      </div>
                    )}
                    
                    {/* Detection boxes */}
                    {aiFeedback.state === "detected" && (
                      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-green-400 rounded">
                        <div className="absolute -top-6 left-0 bg-green-500 text-white px-2 py-1 text-xs rounded">
                          Eggs detected ({aiFeedback.confidence}%)
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Bottom info bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <div className="flex items-center gap-2 text-white text-sm">
                      <ChefHat className="w-4 h-4" />
                      <span>Chef Antoine • {getPersonalityVoice().voice}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-64 bg-gradient-to-br from-purple-100 to-blue-200 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-purple-600 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-purple-800 mb-1">AI Visual Assistant</h3>
                    <p className="text-purple-600 text-sm mb-3">Get real-time cooking guidance</p>
                    <Badge className="bg-purple-600 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Premium Feature
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chef Personality Selector */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Choose Your Chef's Voice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {["encouraging", "professional", "playful"].map((personality) => (
                <Button
                  key={personality}
                  variant={chefPersonality === personality ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChefPersonality(personality)}
                  className="text-xs"
                >
                  {getPersonalityVoice().style}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Feedback */}
        <Card className={`border-2 ${getFeedbackColor()}`}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              {getFeedbackIcon()}
              AI Analysis
              {aiFeedback.confidence > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {aiFeedback.confidence}% confident
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="font-medium">{aiFeedback.message}</p>
            
            {aiFeedback.suggestion && (
              <div className="bg-white rounded-lg p-3 border">
                <p className="text-sm">
                  <strong>💡 Suggestion:</strong> {aiFeedback.suggestion}
                </p>
              </div>
            )}
            
            {aiFeedback.cookingTip && (
              <div className="bg-white rounded-lg p-3 border">
                <p className="text-sm">
                  <strong>👨‍🍳 Chef's Tip:</strong> {aiFeedback.cookingTip}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Current Step */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {currentStep + 1}
              </span>
              Current Step
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">{recipe.steps[currentStep]?.instruction}</p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-800 text-sm">
                <strong>AI is checking:</strong> {recipe.steps[currentStep]?.aiChecks.join(", ")}
              </p>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                variant="outline"
                disabled={currentStep === 0}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button 
                onClick={() => setCurrentStep(Math.min(recipe.steps.length - 1, currentStep + 1))}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={currentStep === recipe.steps.length - 1}
              >
                Next Step
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <Card>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={toggleVideo}
                className={`flex items-center gap-2 ${isVideoOn ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isVideoOn ? (
                  <>
                    <CameraOff className="w-4 h-4" />
                    Stop Camera
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4" />
                    Start Camera
                  </>
                )}
              </Button>
              
              <Button
                onClick={() => setIsListening(!isListening)}
                variant={isListening ? "destructive" : "outline"}
                className="flex items-center gap-2"
              >
                {isListening ? (
                  <>
                    <MicOff className="w-4 h-4" />
                    Stop Voice
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    Voice Chat
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">AI Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-green-600" />
                <span>Ingredient recognition & quantity checking</span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-red-600" />
                <span>Temperature monitoring & heat detection</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-blue-600" />
                <span>Technique analysis & timing guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-purple-600" />
                <span>Voice commands & real-time feedback</span>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}