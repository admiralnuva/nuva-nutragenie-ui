import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/ui/back-button";
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack,
  Volume2,
  Camera,
  Video,
  VideoOff,
  MessageCircle,
  ChefHat,
  Timer,
  CheckCircle
} from "lucide-react";

export default function VoiceCookingScreen() {
  const [, setLocation] = useLocation();
  const [isListening, setIsListening] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [chefResponse, setChefResponse] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const recipe = {
    name: "Mediterranean Quinoa Bowl",
    totalSteps: 8,
    estimatedTime: "25 minutes",
    steps: [
      {
        id: 1,
        instruction: "Rinse 1 cup of quinoa under cold water until the water runs clear.",
        duration: "2 minutes",
        tips: "This removes the bitter coating called saponin",
        completed: false
      },
      {
        id: 2,
        instruction: "In a medium saucepan, bring 2 cups of vegetable broth to a boil.",
        duration: "3 minutes",
        tips: "Using broth instead of water adds extra flavor",
        completed: false
      },
      {
        id: 3,
        instruction: "Add the rinsed quinoa, reduce heat to low, cover and simmer for 15 minutes.",
        duration: "15 minutes",
        tips: "Don't lift the lid while cooking - let the steam do its work",
        completed: false
      },
      {
        id: 4,
        instruction: "While quinoa cooks, dice 1 cucumber and 2 tomatoes into small cubes.",
        duration: "5 minutes",
        tips: "Keep the pieces uniform for the best presentation",
        completed: false
      }
    ]
  };

  const [steps, setSteps] = useState(recipe.steps);

  // Mock voice recognition
  useEffect(() => {
    if (isListening) {
      const timer = setTimeout(() => {
        const responses = [
          "How much quinoa should I use?",
          "Is the quinoa ready yet?",
          "What's the next step?",
          "Can you repeat that instruction?",
          "How do I know when it's done?"
        ];
        setTranscript(responses[Math.floor(Math.random() * responses.length)]);
        handleVoiceCommand();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isListening]);

  const handleVoiceCommand = () => {
    const chefResponses = [
      "Perfect! You'll need exactly 1 cup of quinoa. I can see you're doing great!",
      "Great question! The quinoa should be fluffy and all the liquid absorbed. About 2 more minutes to go!",
      "Excellent timing! Now we're going to dice those fresh vegetables. Take your time and keep those pieces nice and uniform.",
      "Of course! Let me repeat that step for you. Remember, cooking is all about patience and practice.",
      "You'll know it's perfect when the grains are tender and have doubled in size. Trust your instincts!"
    ];
    setChefResponse(chefResponses[Math.floor(Math.random() * chefResponses.length)]);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTranscript("");
      setChefResponse("");
    }
  };

  const toggleVideo = async () => {
    if (!isVideoOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
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

  const markStepComplete = (stepIndex: number) => {
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].completed = true;
    setSteps(updatedSteps);
    if (stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 1);
    }
  };

  const navigateStep = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (direction === 'prev' && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center gap-3 mb-3">
          <BackButton to="/cook" />
          <div className="flex-1">
            <h1 className="text-xl font-bold text-green-600">Voice Cooking Assistant</h1>
            <p className="text-sm text-gray-600">{recipe.name}</p>
          </div>
          <Badge variant="secondary">{currentStep + 1}/{recipe.totalSteps}</Badge>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / recipe.totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4 space-y-4">
        
        {/* Video Feed */}
        <Card className="relative overflow-hidden">
          <CardContent className="p-0">
            {isVideoOn ? (
              <div className="relative">
                <video 
                  ref={videoRef}
                  className="w-full h-48 object-cover"
                  autoPlay 
                  muted 
                  playsInline
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-red-500 text-white">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                    LIVE
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-black/70 text-white">
                    <ChefHat className="w-3 h-3 mr-1" />
                    Chef Antoine is watching
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <p className="text-green-700 font-medium">Turn on camera for AI guidance</p>
                  <p className="text-green-600 text-sm">Get real-time cooking tips</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Current Step */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {currentStep + 1}
                </span>
                Step {currentStep + 1}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Timer className="w-4 h-4" />
                {steps[currentStep]?.duration}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">{steps[currentStep]?.instruction}</p>
            
            {steps[currentStep]?.tips && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-yellow-800 text-sm">
                  💡 <strong>Chef's Tip:</strong> {steps[currentStep].tips}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                onClick={() => markStepComplete(currentStep)}
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={steps[currentStep]?.completed}
              >
                {steps[currentStep]?.completed ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Completed
                  </>
                ) : (
                  "Mark Complete"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Voice Interaction */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageCircle className="w-5 h-5" />
              Talk to Chef Antoine
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Voice Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateStep('prev')}
                disabled={currentStep === 0}
              >
                <SkipBack className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={toggleListening}
                className={`w-16 h-16 rounded-full ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-6 h-6 text-white" />
                ) : (
                  <Mic className="w-6 h-6 text-white" />
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateStep('next')}
                disabled={currentStep === steps.length - 1}
              >
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>

            {isListening && (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-2 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  Listening...
                </div>
              </div>
            )}

            {/* Conversation */}
            {transcript && (
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-800">
                    <strong>You:</strong> {transcript}
                  </p>
                </div>
                {chefResponse && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-800">
                      <strong>Chef Antoine:</strong> {chefResponse}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Camera Controls */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Camera Assistant</h3>
                <p className="text-sm text-gray-600">Get visual feedback on your cooking</p>
              </div>
              <Button
                onClick={toggleVideo}
                variant={isVideoOn ? "destructive" : "default"}
                className="flex items-center gap-2"
              >
                {isVideoOn ? (
                  <>
                    <VideoOff className="w-4 h-4" />
                    Turn Off
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4" />
                    Turn On
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Voice Commands */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Try Saying:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Badge variant="outline" className="justify-center py-2">
                "Next step"
              </Badge>
              <Badge variant="outline" className="justify-center py-2">
                "Repeat that"
              </Badge>
              <Badge variant="outline" className="justify-center py-2">
                "How long left?"
              </Badge>
              <Badge variant="outline" className="justify-center py-2">
                "Set timer"
              </Badge>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}