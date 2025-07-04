// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { generateChefResponse } from "@/lib/openai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart, Send, Play, Pause } from "lucide-react";

export default function CookingScreen() {
  const [, setLocation] = useLocation();
  const { recipeId } = useParams();
  const [currentUser] = useLocalStorage("nutragenie_user", null);
  const queryClient = useQueryClient();
  
  const [chatInput, setChatInput] = useState("");
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds
  const [currentStep, setCurrentStep] = useState(2);
  const [totalSteps] = useState(5);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Fetch recipe details
  const { data: recipe } = useQuery({
    queryKey: ["/api/recipes", recipeId],
    enabled: !!recipeId && !!currentUser
  });

  // Fetch chat messages
  const { data: chatMessages = [] } = useQuery({
    queryKey: ["/api/chat", (currentUser as any)?.id, recipeId],
    enabled: !!currentUser && !!recipeId
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      if (!currentUser) throw new Error("User not authenticated");
      const response = await apiRequest("POST", "/api/chat", {
        userId: (currentUser as any).id,
        recipeId: parseInt(recipeId || "1"),
        sender: "user",
        message
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat", (currentUser as any)?.id, recipeId] });
      setChatInput("");
    }
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            setTimerRunning(false);
            // Show completion notification
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeRemaining]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Add initial chef message when recipe loads
  useEffect(() => {
    if (recipe && (chatMessages as any).length === 0 && currentUser) {
      sendMessageMutation.mutate("Hi! I'm ready to start cooking!");
    }
  }, [recipe, (chatMessages as any).length, currentUser]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (chatInput.trim() && !sendMessageMutation.isPending) {
      sendMessageMutation.mutate(chatInput.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const addQuickResponse = (message: string) => {
    if (!sendMessageMutation.isPending) {
      sendMessageMutation.mutate(message);
    }
  };

  if (!currentUser) {
    setLocation("/");
    return null;
  }

  if (!recipe && recipeId) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-green-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-brand-green-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/recipes")}
            className="rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-gray-800">NutraGenie</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-gray-100"
          >
            <Heart className="w-6 h-6 text-gray-600" />
          </Button>
        </div>
        <div className="text-lg font-semibold text-brand-green-600 text-center">
          Let's Cook
        </div>
      </div>

      {/* Timer & Progress */}
      <Card className="mx-4 mt-4 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-green-600">
                {formatTime(timeRemaining)}
              </div>
              <p className="text-sm text-gray-500">Total Time</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800">
                Step {currentStep}/{totalSteps}
              </div>
              <p className="text-sm text-gray-500">Progress</p>
            </div>
            <Button
              onClick={() => setTimerRunning(!timerRunning)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                timerRunning 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-brand-green-500 hover:bg-brand-green-600 text-white'
              }`}
            >
              {timerRunning ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </>
              )}
            </Button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-brand-green-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* Dish Name */}
      <div className="mx-4 my-3 text-center">
        <h2 className="text-xl font-bold text-gray-800">
          {(recipe as any)?.title || "Mediterranean Quinoa Bowl"}
        </h2>
        <p className="text-sm text-gray-600">Currently cooking</p>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 p-4 pb-32 overflow-hidden">
        <div 
          ref={chatContainerRef}
          className="space-y-4 h-full overflow-y-auto"
        >
          {chatMessages.map((message: any) => (
            <div key={message.id} className={`flex gap-3 chat-bubble ${
              message.sender === 'user' ? 'justify-end' : ''
            }`}>
              {message.sender === 'chef' && (
                <div className="w-10 h-10 rounded-full bg-brand-green-500 flex items-center justify-center text-white text-lg flex-shrink-0">
                  {currentUser.selectedChef.emoji}
                </div>
              )}
              
              <div className={`rounded-2xl p-4 shadow-sm max-w-xs ${
                message.sender === 'user'
                  ? 'bg-brand-green-500 text-white rounded-tr-sm'
                  : 'bg-white text-gray-800 rounded-tl-sm'
              }`}>
                <p>{message.message}</p>
                
                {/* Quick response buttons for latest chef message */}
                {message.sender === 'chef' && message.id === chatMessages[chatMessages.length - 1]?.id && (
                  <div className="mt-3 space-y-2">
                    <Button
                      onClick={() => addQuickResponse('Done! What\'s next?')}
                      className="w-full bg-brand-green-100 text-brand-green-700 py-2 rounded-lg text-sm font-medium hover:bg-brand-green-200 transition-all"
                      disabled={sendMessageMutation.isPending}
                    >
                      ✅ Done! What's next?
                    </Button>
                    <Button
                      onClick={() => addQuickResponse('Can you explain that step again?')}
                      className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all"
                      disabled={sendMessageMutation.isPending}
                    >
                      ❓ Can you explain that again?
                    </Button>
                  </div>
                )}
              </div>
              
              {message.sender === 'user' && (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white text-lg flex-shrink-0">
                  {currentUser.avatar}
                </div>
              )}
            </div>
          ))}
          
          {sendMessageMutation.isPending && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-green-500 flex items-center justify-center text-white text-lg flex-shrink-0">
                {currentUser.selectedChef.emoji}
              </div>
              <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm max-w-xs">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[393px] bg-white border-t border-gray-200 p-4">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <Input
              placeholder={`Ask ${currentUser.selectedChef.name} anything...`}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green-500"
              disabled={sendMessageMutation.isPending}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!chatInput.trim() || sendMessageMutation.isPending}
            className="bg-brand-green-500 text-white p-3 rounded-xl hover:bg-brand-green-600 transition-all flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
