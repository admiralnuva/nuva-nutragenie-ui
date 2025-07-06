import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BackButton } from "@/components/ui/back-button";
import { OnboardingTooltip } from "@/components/ui/onboarding-tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Mic, 
  MicOff, 
  Volume2,
  VolumeX,
  ChefHat,
  Timer,
  CheckCircle,
  Download,
  Printer,
  Camera,
  Share2,
  Trophy,
  Star,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import user1Avatar from "@/assets/avatars/user/user1.png";
import chef1Avatar from "@/assets/avatars/chef/chef1.png";

export default function VoiceCookingScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage<any>("nutragenie_user", null);
  const [cookingMode, setCookingMode] = useState<"voice" | "text">("voice"); // Default to voice
  const [isListening, setIsListening] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [chefResponse, setChefResponse] = useState("");
  const [chefGender, setChefGender] = useState("female");
  const [chefVoice, setChefVoice] = useState("energetic");
  const [showAllSteps, setShowAllSteps] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(new Array(8).fill(false));
  const [isCooking, setIsCooking] = useState(false);
  const [conversation, setConversation] = useState<Array<{sender: 'user' | 'chef', message: string, timestamp: Date}>>([]);
  const [userProgress, setUserProgress] = useState({
    cookingBadges: 3,
    dishesCooked: 12,
    socialShares: 5,
    canPublishBook: false
  });
  const [stepCompletionStreak, setStepCompletionStreak] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [emergencyStop, setEmergencyStop] = useState(false);
  
  // Visual feedback states
  const [voiceCommandDetected, setVoiceCommandDetected] = useState<string | null>(null);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [lastVoiceCommand, setLastVoiceCommand] = useState<{command: string, timestamp: number} | null>(null);
  const [userSpeaking, setUserSpeaking] = useState(false);
  const [chefSpeaking, setChefSpeaking] = useState(false);
  const [cookingTimer, setCookingTimer] = useState<{minutes: number, seconds: number, isActive: boolean}>({
    minutes: 0,
    seconds: 0,
    isActive: false
  });
  const [modeTransition, setModeTransition] = useState(false);

  // Recipe definitions
  const recipes = {
    quinoa: {
      name: "Mediterranean Quinoa Bowl",
      totalSteps: 8,
      estimatedTime: "25 minutes",
      difficulty: "Easy",
      servings: 4,
      steps: [
        {
          id: 1,
          instruction: "Rinse 1 cup of quinoa under cold water until the water runs clear.",
          duration: "2 minutes",
          tips: "This removes the bitter coating called saponin"
        },
        {
          id: 2,
          instruction: "In a medium saucepan, bring 2 cups of vegetable broth to a boil.",
          duration: "3 minutes", 
          tips: "Using broth instead of water adds extra flavor"
        },
        {
          id: 3,
          instruction: "Add the rinsed quinoa, reduce heat to low, cover and simmer for 15 minutes.",
          duration: "15 minutes",
          tips: "Don't lift the lid while cooking - let the steam do its work"
        },
        {
          id: 4,
          instruction: "While quinoa cooks, dice 1 cucumber and 2 tomatoes into small cubes.",
          duration: "5 minutes",
          tips: "Keep the pieces uniform for the best presentation"
        },
        {
          id: 5,
          instruction: "Crumble 4 oz feta cheese and slice 1/4 cup Kalamata olives.",
          duration: "3 minutes",
          tips: "Pat the feta dry for better texture"
        },
        {
          id: 6,
          instruction: "Make dressing: whisk 3 tbsp olive oil, 2 tbsp lemon juice, 1 tsp oregano.",
          duration: "2 minutes",
          tips: "Fresh lemon juice makes all the difference"
        },
        {
          id: 7,
          instruction: "Once quinoa is done, fluff with a fork and let cool for 5 minutes.",
          duration: "5 minutes",
          tips: "Cooling prevents the vegetables from wilting"
        },
        {
          id: 8,
          instruction: "Combine quinoa, vegetables, feta, olives. Drizzle dressing and toss gently.",
          duration: "3 minutes",
          tips: "Taste and adjust seasoning with salt and pepper"
        }
      ]
    },
    tomatoSoup: {
      name: "Creamy Tomato Soup",
      totalSteps: 8,
      estimatedTime: "30 minutes",
      difficulty: "Medium",
      servings: 3,
      steps: [
        {
          id: 1,
          instruction: "Heat 2 tbsp olive oil in a large pot over medium heat.",
          duration: "2 minutes",
          tips: "Make sure the oil is warm but not smoking"
        },
        {
          id: 2,
          instruction: "Add 1 diced onion and cook until softened, about 5 minutes.",
          duration: "5 minutes",
          tips: "Stir occasionally to prevent burning"
        },
        {
          id: 3,
          instruction: "Add 3 cloves minced garlic and cook for 1 minute until fragrant.",
          duration: "1 minute",
          tips: "Don't let the garlic brown or it will taste bitter"
        },
        {
          id: 4,
          instruction: "Add 28 oz can crushed tomatoes, 2 cups vegetable broth, and 1 tsp dried basil.",
          duration: "2 minutes",
          tips: "Use high-quality canned tomatoes for best flavor"
        },
        {
          id: 5,
          instruction: "Bring to a boil, then reduce heat and simmer for 15 minutes.",
          duration: "15 minutes",
          tips: "Let the flavors meld together"
        },
        {
          id: 6,
          instruction: "Use an immersion blender to puree until smooth.",
          duration: "3 minutes",
          tips: "Be careful with hot liquids - blend gradually"
        },
        {
          id: 7,
          instruction: "Stir in 1/2 cup heavy cream and season with salt and pepper.",
          duration: "2 minutes",
          tips: "Add cream slowly to prevent curdling"
        },
        {
          id: 8,
          instruction: "Taste and adjust seasoning. Serve hot with fresh basil.",
          duration: "1 minute",
          tips: "A pinch of sugar can balance acidity if needed"
        }
      ]
    }
  };

  const [currentRecipeKey, setCurrentRecipeKey] = useState<keyof typeof recipes>("quinoa");
  const recipe = recipes[currentRecipeKey];

  const voiceOptions = {
    male: {
      energetic: "Energetic",
      calm: "Calm", 
      playful: "Playful"
    },
    female: {
      energetic: "Energetic",
      calm: "Calm",
      playful: "Playful"
    }
  };

  // Mock voice recognition - only in voice mode when cooking
  useEffect(() => {
    if (isListening && isCooking && !isMuted && cookingMode === "voice") {
      const timer = setTimeout(() => {
        const responses = [
          "How much quinoa should I use?",
          "Is the quinoa ready yet?",
          "What's the next step?", 
          "Can you repeat that instruction?",
          "I think I'm done with this step",
          "This smells amazing!",
          "Should I move to the next step?",
          "How do I know when it's ready?"
        ];
        const userMessage = responses[Math.floor(Math.random() * responses.length)];
        setTranscript(userMessage);
        
        // Visual feedback for voice command detection
        setVoiceCommandDetected(userMessage);
        setLastVoiceCommand({command: userMessage, timestamp: Date.now()});
        
        // Clear voice command feedback after 2 seconds
        setTimeout(() => setVoiceCommandDetected(null), 2000);
        
        // Add to conversation
        setConversation(prev => [...prev, {
          sender: 'user',
          message: userMessage,
          timestamp: new Date()
        }]);
        
        handleVoiceCommand(userMessage);
      }, 1500 + Math.random() * 1000); // Faster response times
      return () => clearTimeout(timer);
    }
  }, [isListening, currentStep, isCooking, isMuted, cookingMode]);

  const handleVoiceCommand = (userMessage: string) => {
    // Show AI processing feedback
    setAiProcessing(true);
    
    const voicePersonality = getVoicePersonality();
    const chefResponses = [
      `${voicePersonality.greeting} You'll need exactly 1 cup of quinoa. You're doing fantastic!`,
      `${voicePersonality.encouragement} The quinoa should be fluffy and all liquid absorbed. About 2 more minutes!`,
      `${voicePersonality.guidance} Now we're dicing fresh vegetables. Take your time, keep pieces uniform.`,
      `${voicePersonality.supportive} Of course! Let me repeat that step. Cooking is about patience and practice.`,
      `${voicePersonality.celebration} Perfect! You're ready for the next step. Well done!`,
      `${voicePersonality.encouragement} I can sense you're getting the hang of this! Keep going!`,
      `${voicePersonality.guidance} Yes, move to the next step when you feel confident about this one.`
    ];
    
    // Simulate AI processing time
    setTimeout(() => {
      const chefMessage = chefResponses[Math.floor(Math.random() * chefResponses.length)];
      setChefResponse(chefMessage);
      setAiProcessing(false);
      
      // Add chef response to conversation after processing
      setConversation(prev => [...prev, {
        sender: 'chef',
        message: chefMessage,
        timestamp: new Date()
      }]);
    }, 800 + Math.random() * 400); // Realistic AI processing time
  };

  const getVoicePersonality = () => {
    const personalities = {
      energetic: {
        greeting: "Hey there, superstar!",
        encouragement: "You're crushing it!",
        guidance: "Let's keep this energy up!",
        supportive: "Absolutely!",
        celebration: "AMAZING work!"
      },
      calm: {
        greeting: "Perfect, let's take this step by step.",
        encouragement: "You're doing beautifully.",
        guidance: "Nice and easy now.",
        supportive: "Of course, I'm here to help.",
        celebration: "Wonderful job."
      },
      playful: {
        greeting: "Ooh, cooking time!",
        encouragement: "You're a natural!",
        guidance: "This is going to be so good!",
        supportive: "No worries, we've got this!",
        celebration: "Look at you go!"
      },
      therapeutic: {
        greeting: "Take a deep breath, we're in this together.",
        encouragement: "You're finding your rhythm.",
        guidance: "Let's move mindfully through this.",
        supportive: "I understand, let's go slowly.",
        celebration: "You should feel proud of this progress."
      }
    };
    return personalities[chefVoice as keyof typeof personalities];
  };

  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (cookingTimer.isActive) {
      interval = setInterval(() => {
        setCookingTimer(prev => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          } else {
            // Timer finished - trigger notification
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Cooking Timer', { body: 'Timer finished! Check your food.' });
            }
            return { ...prev, isActive: false };
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cookingTimer.isActive]);

  // Offline mode detection
  useEffect(() => {
    const handleOnline = () => setIsOfflineMode(false);
    const handleOffline = () => setIsOfflineMode(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Mode transition animation
  const handleModeSwitch = (mode: "voice" | "text") => {
    setModeTransition(true);
    setTimeout(() => {
      setCookingMode(mode);
      setModeTransition(false);
    }, 150);
  };

  // Emergency stop function
  const handleEmergencyStop = () => {
    setEmergencyStop(true);
    setIsCooking(false);
    setCookingTimer(prev => ({ ...prev, isActive: false }));
    setConversation(prev => [...prev, {
      sender: 'chef',
      message: 'Emergency stop activated. Stay safe! When you\'re ready, you can resume cooking.',
      timestamp: new Date()
    }]);
  };

  // Start timer function
  const startTimer = (minutes: number) => {
    setCookingTimer({ minutes, seconds: 0, isActive: true });
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  // Simulate user speaking
  const simulateUserSpeaking = () => {
    setUserSpeaking(true);
    setVoiceCommandDetected("Next step please");
    setTimeout(() => {
      setUserSpeaking(false);
      setVoiceCommandDetected(null);
      // Chef responds
      simulateChefResponse();
    }, 2000);
  };

  // Simulate chef speaking
  const simulateChefResponse = () => {
    setChefSpeaking(true);
    setAiProcessing(true);
    setTimeout(() => {
      setAiProcessing(false);
      setChefSpeaking(false);
    }, 3000);
  };

  const markStepComplete = (stepIndex: number) => {
    const updatedSteps = [...completedSteps];
    updatedSteps[stepIndex] = true;
    setCompletedSteps(updatedSteps);
    
    // Streak and celebration logic
    setStepCompletionStreak(prev => prev + 1);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 1500);
    
    if (stepIndex === currentStep && stepIndex < recipe.steps.length - 1) {
      setCurrentStep(stepIndex + 1);
    }
    
    // Enhanced voice feedback with streaks - trigger chef speaking
    setChefSpeaking(true);
    const personality = getVoicePersonality();
    const streakBonus = stepCompletionStreak > 1 ? ` 🔥 ${stepCompletionStreak + 1} step streak!` : "";
    const completionMessage = `${personality.celebration} Step ${stepIndex + 1} completed!${streakBonus} ${stepIndex < recipe.steps.length - 1 ? "You're on fire! Next step awaits." : "🎉 Recipe complete! You're a culinary superstar!"}`;
    
    setConversation(prev => [...prev, {
      sender: 'chef',
      message: completionMessage,
      timestamp: new Date()
    }]);
    
    // Stop chef speaking after message
    setTimeout(() => setChefSpeaking(false), 2500);

    // Check if all steps completed
    if (updatedSteps.every(step => step)) {
      handleRecipeCompletion();
    }
  };

  const handleRecipeCompletion = () => {
    // Update user progress
    setUserProgress(prev => ({
      ...prev,
      dishesCooked: prev.dishesCooked + 1,
      cookingBadges: prev.dishesCooked + 1 >= 15 ? prev.cookingBadges + 1 : prev.cookingBadges,
      canPublishBook: prev.dishesCooked + 1 >= 15
    }));

    // Navigate to home page (analytics) after completion
    setTimeout(() => {
      setLocation('/');
    }, 2000); // Give time for final celebration message
  };

  const saveRecipe = () => {
    // Save to profile
    alert("Recipe saved to your profile!");
  };

  const downloadRecipe = () => {
    const recipeText = `${recipe.name}\n\nIngredients and Instructions:\n\n${recipe.steps.map((step, i) => `${i + 1}. ${step.instruction}\nTip: ${step.tips}\n`).join('\n')}`;
    const blob = new Blob([recipeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recipe.name.replace(/\s+/g, '_')}.txt`;
    a.click();
  };

  const printRecipe = () => {
    window.print();
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToNextStep = () => {
    if (currentStep < recipe.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <BackButton to="/recipes" />
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-gray-800">NutraGenie</h1>
            <div className="text-lg font-semibold text-brand-indigo-600">Let's Cook</div>
            {isOfflineMode && (
              <div className="text-xs text-orange-600 mt-1">📶 Offline Mode Active</div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{completedSteps.filter(Boolean).length}/{recipe.totalSteps}</Badge>
          </div>
        </div>
        
        {/* User and Chef Avatars with Stop Button */}
        <div className="flex items-center justify-center gap-6 mt-4 relative">
          {/* Emergency Stop Button - aligned with chef avatar on the right */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
            <OnboardingTooltip
              id="emergency-stop"
              title="Emergency Stop"
              description="Instantly pause all cooking activities if you need to step away or handle an emergency situation. You can resume cooking anytime."
              position="left"
            >
              <Button 
                size="sm" 
                variant="destructive"
                onClick={handleEmergencyStop}
                className="px-2 py-1 text-xs"
              >
                🚨 STOP
              </Button>
            </OnboardingTooltip>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-blue-200">
                <img 
                  src={user1Avatar} 
                  alt="User Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* User Speaker Icon */}
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white transition-all duration-300 ${
                userSpeaking ? 'bg-green-500 scale-110' : 'bg-gray-300'
              }`}>
                <Volume2 className={`w-3 h-3 ${userSpeaking ? 'text-white' : 'text-gray-600'}`} />
              </div>
            </div>
            <span className="text-xs text-gray-600 mt-1">You</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-indigo-200">
                <img 
                  src={chef1Avatar} 
                  alt="Chef Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Chef Speaker Icon */}
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white transition-all duration-300 ${
                chefSpeaking ? 'bg-indigo-500 scale-110' : 'bg-gray-300'
              }`}>
                <Volume2 className={`w-3 h-3 ${chefSpeaking ? 'text-white' : 'text-gray-600'}`} />
              </div>
            </div>
            <span className="text-xs text-gray-600 mt-1">Chef Antoine</span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-2 space-y-2">
        
        {/* Celebration Animation */}
        {showCelebration && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>
        )}

        {/* Emergency Stop Warning */}
        {emergencyStop && (
          <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-2">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🚨</div>
              <div>
                <h3 className="font-semibold text-red-800">Emergency Stop Activated</h3>
                <p className="text-sm text-red-700">All cooking activities paused for safety. You can resume when ready.</p>
              </div>
              <Button 
                size="sm" 
                onClick={() => setEmergencyStop(false)}
                className="bg-indigo-600 hover:bg-green-700"
              >
                Resume
              </Button>
            </div>
          </div>
        )}

        {/* Card 1: Enhanced Cooking Interface (Main Focus) */}
        <Card className="border-2 border-green-300 bg-green-50 min-h-[600px] relative overflow-hidden">
          <CardHeader className="pb-1">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-3">
                {stepCompletionStreak > 1 && (
                  <div className="bg-orange-100 border border-orange-300 rounded-full px-2 py-1">
                    <span className="text-xs font-bold text-orange-600">🔥 {stepCompletionStreak}</span>
                  </div>
                )}
              </div>
            </CardTitle>
            
            {/* Single Row Controls */}
            <div className="bg-white rounded-lg p-2 border border-indigo-200 mt-2">
              <div className="flex gap-1 items-center">
                <OnboardingTooltip
                  id="voice-cooking-mode"
                  title="Voice Cooking Assistant"
                  description="Switch to voice mode for hands-free cooking guidance. Chef Antoine will listen to your questions and provide audio responses. Perfect when your hands are busy!"
                  position="bottom"
                >
                  <Button
                    variant={cookingMode === "voice" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      handleModeSwitch("voice");
                      setIsMuted(false);
                    }}
                    className={`text-xs transition-all duration-200 px-2 ${modeTransition ? 'scale-95 opacity-50' : ''}`}
                    disabled={modeTransition}
                  >
                    {cookingMode === "voice" ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3" />}
                  </Button>
                </OnboardingTooltip>
                {Object.entries(voiceOptions[chefGender as keyof typeof voiceOptions]).map(([voice, label]) => (
                  <Button
                    key={voice}
                    variant={chefVoice === voice ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChefVoice(voice)}
                    className="text-xs flex-1 px-2"
                  >
                    {label}
                  </Button>
                ))}
                <Button
                  variant={cookingMode === "text" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    handleModeSwitch("text");
                    setIsMuted(true);
                  }}
                  className={`text-xs transition-all duration-200 px-2 ${modeTransition ? 'scale-95 opacity-50' : ''}`}
                  disabled={modeTransition}
                >
                  Text Only
                </Button>
              </div>
            </div>

          </CardHeader>
          
          <CardContent className="space-y-1">

            {/* Dish Name */}
            <div className="text-center mb-1">
              <h2 className="text-base font-normal text-gray-700">{recipe.name}</h2>
            </div>

            {!isCooking ? (
              <div className="space-y-2 flex flex-col h-full">
                <div className="bg-white border border-indigo-200 rounded-lg p-3 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="font-semibold text-indigo-600 text-lg">Step 1</span>
                      <div className="flex gap-1.5 items-center justify-center">
                        {recipe.steps.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === 0 ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Timer className="w-3 h-3" />
                      {recipe.steps[0]?.duration}
                    </span>
                  </div>
                  <p className="font-medium mb-4 text-lg leading-relaxed">{recipe.steps[0]?.instruction}</p>
                  <p className="text-sm text-green-700">💡 {recipe.steps[0]?.tips}</p>
                </div>
                
                <Button 
                  onClick={() => setIsCooking(true)}
                  className="w-full bg-indigo-600 hover:bg-green-700 text-lg py-4 mt-auto"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {cookingMode === "voice" ? "Start Voice Cooking" : "Start Text Cooking"}
                </Button>
              </div>
            ) : (
              <>
                {/* Voice Mode Display */}
                {cookingMode === "voice" ? (
                  <div className="space-y-4">
                    {/* Voice Command Feedback */}
                    {voiceCommandDetected && (
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-3 animate-pulse">
                        <div className="flex items-center">
                          <Mic className="w-4 h-4 text-blue-600 mr-2" />
                          <span className="text-sm font-medium text-blue-800">
                            Heard: "{voiceCommandDetected}"
                          </span>
                        </div>
                      </div>
                    )}

                    {/* AI Processing Feedback */}
                    {aiProcessing && (
                      <div className="bg-indigo-50 border-l-4 border-indigo-400 p-3">
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                          <span className="text-sm font-medium text-indigo-800">
                            Chef Antoine is thinking...
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Current Step with Voice Bubbles */}
                    <div className="bg-white border border-indigo-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="font-semibold text-indigo-600">Step {currentStep + 1}</span>
                          <div className="flex-1 max-w-24">
                            <Progress 
                              value={(completedSteps.filter(Boolean).length / recipe.totalSteps) * 100}
                              className="h-2"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {cookingTimer.isActive && (
                            <div className="bg-orange-100 border border-orange-300 rounded px-2 py-1">
                              <span className="text-xs font-mono text-orange-700">
                                {String(cookingTimer.minutes).padStart(2, '0')}:{String(cookingTimer.seconds).padStart(2, '0')}
                              </span>
                            </div>
                          )}
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <Timer className="w-3 h-3" />
                            {recipe.steps[currentStep]?.duration}
                          </span>
                        </div>
                      </div>
                      <p className="font-medium mb-4">{recipe.steps[currentStep]?.instruction}</p>
                      
                      {/* Quick Timer Controls */}
                      {!cookingTimer.isActive && (
                        <div className="flex gap-2 mb-4">
                          <Button size="sm" variant="outline" onClick={() => startTimer(5)}>
                            5min
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => startTimer(10)}>
                            10min
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => startTimer(15)}>
                            15min
                          </Button>
                          <Button size="sm" variant="outline" onClick={simulateUserSpeaking}>
                            🎤 Test Voice
                          </Button>
                        </div>
                      )}
                      
                      {/* Voice Conversation Bubbles */}
                      {conversation.length > 0 && (
                        <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
                          {conversation.slice(-2).map((msg, index) => (
                            <div
                              key={`${msg.timestamp.getTime()}-${index}`}
                              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                                  msg.sender === 'user' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-green-100 text-green-800'
                                }`}
                              >
                                <p>{msg.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <Button
                        onClick={() => markStepComplete(currentStep)}
                        disabled={completedSteps[currentStep]}
                        className="w-full text-lg py-3"
                      >
                        {completedSteps[currentStep] ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Completed
                          </>
                        ) : (
                          "Mark Complete"
                        )}
                      </Button>
                    </div>

                    {/* View All Steps for Voice Mode */}
                    <div className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAllSteps(!showAllSteps)}
                      >
                        {showAllSteps ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        {showAllSteps ? "Hide All Steps" : "View All Steps"}
                      </Button>
                    </div>

                    {/* All Steps View with Recipe Actions */}
                    <Collapsible open={showAllSteps} onOpenChange={setShowAllSteps}>
                      <CollapsibleContent className="space-y-3">
                        {recipe.steps.map((step, index) => (
                          <div
                            key={step.id}
                            className={`border rounded-lg p-3 ${
                              completedSteps[index] 
                                ? 'bg-white border-border' 
                                : index === currentStep 
                                  ? 'bg-white border-green-300' 
                                  : 'bg-white border-gray-200'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <Badge 
                                variant={completedSteps[index] ? "secondary" : index === currentStep ? "default" : "outline"}
                              >
                                Step {index + 1}
                              </Badge>
                              <span className="text-sm text-gray-600 flex items-center gap-1">
                                <Timer className="w-3 h-3" />
                                {step.duration}
                              </span>
                            </div>
                            <p className={`font-medium mb-2 ${completedSteps[index] ? 'line-through text-gray-500' : ''}`}>
                              {step.instruction}
                            </p>
                            <p className="text-sm text-gray-600">💡 {step.tips}</p>
                          </div>
                        ))}
                        
                        {/* Recipe Actions */}
                        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-indigo-200">
                          <Button variant="outline" size="sm" onClick={saveRecipe}>
                            <Star className="w-3 h-3 mr-1" />
                            Save
                          </Button>
                          <Button variant="outline" size="sm" onClick={downloadRecipe}>
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm" onClick={printRecipe}>
                            <Printer className="w-3 h-3 mr-1" />
                            Print
                          </Button>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                ) : (
                  /* Text Mode Display */
                  <div className="space-y-4">
                    {/* Current Step for Text Mode */}
                    {!showAllSteps && (
                      <div className="bg-white border border-indigo-200 rounded-lg p-6 flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 flex-1">
                            <span className="font-semibold text-indigo-600 text-lg">Step {currentStep + 1}</span>
                            <div className="flex-1 max-w-24">
                              <Progress 
                                value={(completedSteps.filter(Boolean).length / recipe.totalSteps) * 100}
                                className="h-2"
                              />
                            </div>
                          </div>
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <Timer className="w-3 h-3" />
                            {recipe.steps[currentStep]?.duration}
                          </span>
                        </div>
                        <p className="font-medium mb-4 text-lg leading-relaxed">{recipe.steps[currentStep]?.instruction}</p>
                        <p className="text-sm text-green-700 mb-6">💡 {recipe.steps[currentStep]?.tips}</p>
                        
                        {/* Step Navigation Controls */}
                        <div className="flex items-center gap-3 mb-4">
                          <Button
                            onClick={goToPreviousStep}
                            disabled={currentStep === 0}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Previous
                          </Button>
                          <Button
                            onClick={() => markStepComplete(currentStep)}
                            disabled={completedSteps[currentStep]}
                            className="flex-1"
                          >
                            {completedSteps[currentStep] ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Done
                              </>
                            ) : (
                              "Complete"
                            )}
                          </Button>
                          <Button
                            onClick={goToNextStep}
                            disabled={currentStep === recipe.steps.length - 1}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            Next
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* All Steps View */}
                    <Collapsible open={showAllSteps} onOpenChange={setShowAllSteps}>
                      <CollapsibleContent className="space-y-3">
                        {recipe.steps.map((step, index) => (
                          <div
                            key={step.id}
                            className={`border rounded-lg p-3 ${
                              completedSteps[index] 
                                ? 'bg-white border-border' 
                                : index === currentStep 
                                  ? 'bg-white border-green-300' 
                                  : 'bg-white border-gray-200'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <Badge 
                                variant={completedSteps[index] ? "secondary" : index === currentStep ? "default" : "outline"}
                              >
                                Step {index + 1}
                              </Badge>
                              <span className="text-sm text-gray-600 flex items-center gap-1">
                                <Timer className="w-3 h-3" />
                                {step.duration}
                              </span>
                            </div>
                            <p className={`font-medium mb-2 ${completedSteps[index] ? 'line-through text-gray-500' : ''}`}>
                              {step.instruction}
                            </p>
                            <p className="text-sm text-gray-600 mb-3">💡 {step.tips}</p>
                            <Button
                              onClick={() => markStepComplete(index)}
                              disabled={completedSteps[index]}
                              size="sm"
                              className="w-full"
                            >
                              {completedSteps[index] ? (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Completed
                                </>
                              ) : (
                                "Mark Complete"
                              )}
                            </Button>
                          </div>
                        ))}
                        
                        {/* Recipe Actions */}
                        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-indigo-200">
                          <Button variant="outline" size="sm" onClick={saveRecipe}>
                            <Star className="w-3 h-3 mr-1" />
                            Save
                          </Button>
                          <Button variant="outline" size="sm" onClick={downloadRecipe}>
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm" onClick={printRecipe}>
                            <Printer className="w-3 h-3 mr-1" />
                            Print
                          </Button>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* View All Steps Toggle - Moved to Bottom */}
                    <div className="text-center pt-4 border-t border-indigo-200">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAllSteps(!showAllSteps)}
                      >
                        {showAllSteps ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        {showAllSteps ? "Hide All Steps" : "View All Steps"}
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Card 2: Voice Conversation History */}
        {conversation.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Voice Conversation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-60 overflow-y-auto">
              {conversation.slice(-4).map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-blue-50 border border-blue-200 ml-4' 
                      : 'bg-green-50 border border-indigo-200 mr-4'
                  }`}
                >
                  <p className="text-sm">
                    <strong>{msg.sender === 'user' ? 'You' : 'Chef Antoine'}:</strong> {msg.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Card 3: Continue Cooking (Compact) */}
        <Card>
          <CardContent className="pt-4 pb-3">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800">{recipes.tomatoSoup.name}</h4>
              <div className="text-sm text-gray-600">Step 3 of {recipes.tomatoSoup.totalSteps} • {recipes.tomatoSoup.servings} servings</div>
            </div>
            <Button 
              className="w-full bg-orange-600 hover:bg-orange-700 mt-3"
              onClick={() => {
                // Switch to Tomato Soup recipe and resume cooking
                setCurrentRecipeKey("tomatoSoup");
                setCurrentStep(2); // Set to step 3 (0-indexed)
                setIsCooking(true); // Enable cooking mode
                setCookingMode("voice"); // Set to voice mode
                setIsListening(true); // Start listening
                setEmergencyStop(false); // Clear any emergency stops
              }}
            >
              Continue Cooking
            </Button>
          </CardContent>
        </Card>

        {/* Card 4: Quick Actions (Compact) */}
        <Card>
          <CardContent className="pt-4 pb-3">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Photo Progress
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setLocation("/grocery-list")}
              >
                <ShoppingCart className="w-4 h-4" />
                Add Missing Items
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}