import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BackButton } from "@/components/ui/back-button";
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
  Pause
} from "lucide-react";

export default function VoiceCookingScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage<any>("nutragenie_user", null);
  const [isListening, setIsListening] = useState(true); // Always listening by default
  const [isMuted, setIsMuted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [chefResponse, setChefResponse] = useState("");
  const [chefGender, setChefGender] = useState("female");
  const [chefVoice, setChefVoice] = useState("calm");
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

  const recipe = {
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
  };

  const voiceOptions = {
    male: {
      energetic: "🔥 Energetic",
      calm: "😌 Calm", 
      playful: "🎉 Playful",
      therapeutic: "🌿 Therapeutic"
    },
    female: {
      energetic: "⚡ Energetic",
      calm: "💫 Calm",
      playful: "🌟 Playful", 
      therapeutic: "🧘‍♀️ Therapeutic"
    }
  };

  // Mock voice recognition - always listening
  useEffect(() => {
    if (isListening && isCooking && !isMuted) {
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
        
        // Add to conversation
        setConversation(prev => [...prev, {
          sender: 'user',
          message: userMessage,
          timestamp: new Date()
        }]);
        
        handleVoiceCommand(userMessage);
      }, 4000 + Math.random() * 3000); // Varying response times
      return () => clearTimeout(timer);
    }
  }, [isListening, currentStep, isCooking, isMuted]);

  const handleVoiceCommand = (userMessage: string) => {
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
    
    const chefMessage = chefResponses[Math.floor(Math.random() * chefResponses.length)];
    setChefResponse(chefMessage);
    
    // Add chef response to conversation
    setTimeout(() => {
      setConversation(prev => [...prev, {
        sender: 'chef',
        message: chefMessage,
        timestamp: new Date()
      }]);
    }, 800);
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

  const markStepComplete = (stepIndex: number) => {
    const updatedSteps = [...completedSteps];
    updatedSteps[stepIndex] = true;
    setCompletedSteps(updatedSteps);
    
    if (stepIndex === currentStep && stepIndex < recipe.steps.length - 1) {
      setCurrentStep(stepIndex + 1);
    }
    
    // Voice feedback
    const personality = getVoicePersonality();
    const completionMessage = `${personality.celebration} Step ${stepIndex + 1} completed! ${stepIndex < recipe.steps.length - 1 ? "Let's move to the next step." : "You've finished the entire recipe!"}`;
    
    setConversation(prev => [...prev, {
      sender: 'chef',
      message: completionMessage,
      timestamp: new Date()
    }]);

    // Check if all steps completed
    if (updatedSteps.every(step => step)) {
      handleRecipeCompletion();
    }
  };

  const handleRecipeCompletion = () => {
    setUserProgress(prev => ({
      ...prev,
      dishesCooked: prev.dishesCooked + 1,
      cookingBadges: prev.dishesCooked + 1 >= 15 ? prev.cookingBadges + 1 : prev.cookingBadges,
      canPublishBook: prev.dishesCooked + 1 >= 15
    }));
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center gap-3 mb-3">
          <BackButton to="/cook" />
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-800">Voice Interaction Cooking</h1>
            <p className="text-sm text-gray-600">{recipe.name} • {recipe.difficulty}</p>
          </div>
          <Badge variant="secondary">{completedSteps.filter(Boolean).length}/{recipe.totalSteps}</Badge>
        </div>
        
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round((completedSteps.filter(Boolean).length / recipe.totalSteps) * 100)}%</span>
          </div>
          <Progress value={(completedSteps.filter(Boolean).length / recipe.totalSteps) * 100} className="h-2" />
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-4">
        
        {/* Card 1: Voice Assistant with Avatars */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ChefHat className="w-5 h-5" />
              Voice Cooking Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Avatar Section */}
            <div className="flex items-center justify-center gap-6 mb-4">
              {/* User Avatar */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl mb-2">
                  {currentUser?.avatar || "👤"}
                </div>
                <p className="text-xs text-gray-600">You</p>
              </div>
              
              {/* Voice Waves Animation */}
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-1 bg-green-500 rounded-full ${isListening && !isMuted ? 'animate-pulse' : ''}`}
                    style={{
                      height: `${Math.random() * 20 + 10}px`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
              
              {/* Chef Avatar */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl mb-2">
                  {chefGender === "female" ? "👩‍🍳" : "👨‍🍳"}
                </div>
                <p className="text-xs text-gray-600">Chef Antoine</p>
              </div>
            </div>

            {/* Voice Options */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <Button
                  variant={chefGender === "female" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChefGender("female")}
                  className="flex-1"
                >
                  👩‍🍳 Female Chef
                </Button>
                <Button
                  variant={chefGender === "male" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChefGender("male")}
                  className="flex-1"
                >
                  👨‍🍳 Male Chef
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(voiceOptions[chefGender as keyof typeof voiceOptions]).map(([voice, label]) => (
                  <Button
                    key={voice}
                    variant={chefVoice === voice ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChefVoice(voice)}
                    className="text-xs"
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Voice Controls */}
            <div className="flex gap-2">
              <Button
                onClick={() => setIsMuted(!isMuted)}
                variant={isMuted ? "destructive" : "outline"}
                size="sm"
                className="flex-1"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 mr-2" />
                    Unmute Chef
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 mr-2" />
                    Mute Chef
                  </>
                )}
              </Button>
              
              <Button
                onClick={() => setIsListening(!isListening)}
                variant={isListening ? "default" : "outline"}
                size="sm"
                className="flex-1"
              >
                {isListening ? (
                  <>
                    <Mic className="w-4 h-4 mr-2" />
                    Listening
                  </>
                ) : (
                  <>
                    <MicOff className="w-4 h-4 mr-2" />
                    Start Listening
                  </>
                )}
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-800 text-sm">
                💡 <strong>AI video cooking coming shortly</strong><br/>
                Get visual guidance and feedback on your technique
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Cooking Steps */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-lg">
              <span>Cooking Steps</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAllSteps(!showAllSteps)}
                >
                  {showAllSteps ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  {showAllSteps ? "Collapse" : "View All"}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isCooking ? (
              <div className="text-center space-y-3">
                <p className="text-gray-600">Ready to start cooking?</p>
                <Button 
                  onClick={() => setIsCooking(true)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Cooking
                </Button>
              </div>
            ) : (
              <>
                {/* Current Step Highlight */}
                {!showAllSteps && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-green-600">Step {currentStep + 1}</Badge>
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <Timer className="w-3 h-3" />
                        {recipe.steps[currentStep]?.duration}
                      </span>
                    </div>
                    <p className="font-medium mb-2">{recipe.steps[currentStep]?.instruction}</p>
                    <p className="text-sm text-green-700 mb-3">💡 {recipe.steps[currentStep]?.tips}</p>
                    <Button
                      onClick={() => markStepComplete(currentStep)}
                      disabled={completedSteps[currentStep]}
                      className="w-full"
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
                )}

                {/* All Steps View */}
                <Collapsible open={showAllSteps} onOpenChange={setShowAllSteps}>
                  <CollapsibleContent className="space-y-3">
                    {recipe.steps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`border rounded-lg p-3 ${
                          completedSteps[index] 
                            ? 'bg-gray-50 border-gray-300' 
                            : index === currentStep 
                              ? 'bg-green-50 border-green-300' 
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
                  </CollapsibleContent>
                </Collapsible>

                {/* Recipe Actions */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t">
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
              </>
            )}
          </CardContent>
        </Card>

        {/* Continue Cooking Card */}
        {isCooking && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Continue Cooking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xl">
                  🍜
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{recipe.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Timer className="w-3 h-3" />
                    <span>{recipe.estimatedTime}</span>
                    <span>•</span>
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {completedSteps.filter(Boolean).length}/{recipe.totalSteps}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Photo Progress
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setLocation("/grocery-list")}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Gamification Progress */}
        {userProgress.dishesCooked > 10 && (
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Cooking Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-yellow-600">{userProgress.dishesCooked}</div>
                  <div className="text-xs text-gray-600">Dishes Cooked</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">{userProgress.cookingBadges}</div>
                  <div className="text-xs text-gray-600">Badges Earned</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">{userProgress.socialShares}</div>
                  <div className="text-xs text-gray-600">Social Shares</div>
                </div>
              </div>
              
              {userProgress.canPublishBook && (
                <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 text-center">
                  <p className="text-yellow-800 font-medium mb-2">🎉 Congratulations!</p>
                  <p className="text-yellow-700 text-sm mb-3">You've cooked 15+ dishes! You can now publish your cookbook.</p>
                  <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                    <Share2 className="w-3 h-3 mr-1" />
                    Publish Cookbook
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Conversation History */}
        {conversation.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Voice Conversation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-60 overflow-y-auto">
              {conversation.slice(-6).map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-blue-50 border border-blue-200 ml-4' 
                      : 'bg-green-50 border border-green-200 mr-4'
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

      </div>
    </div>
  );
}