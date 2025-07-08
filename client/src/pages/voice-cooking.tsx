import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { 
  Mic, 
  MicOff, 
  Volume2,
  Pause
} from "lucide-react";
import chef1Avatar from "@/assets/avatars/chef/chef1.png";
import chef2Avatar from "@/assets/avatars/chef/chef2.png";
import chef3Avatar from "@/assets/avatars/chef/chef3.png";
import chef4Avatar from "@/assets/avatars/chef/chef4.png";

export default function VoiceCookingScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage<any>("nutragenie_user", null);
  const [isListening, setIsListening] = useState(false);
  const [isChefThinking, setIsChefThinking] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<Array<{
    sender: 'user' | 'chef';
    message: string;
    timestamp: Date;
  }>>([
    {
      sender: 'chef',
      message: 'Hello! How can I help you with your cooking today?',
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Voice settings
  const [selectedVoice, setSelectedVoice] = useState<"energetic" | "calm" | "playful">("energetic");

  // Get chef avatar based on user selection
  const getChefAvatar = () => {
    if (!currentUser?.chefAvatar) return chef1Avatar;
    
    const avatarMap: { [key: string]: string } = {
      'chef1': chef1Avatar,
      'chef2': chef2Avatar,
      'chef3': chef3Avatar,
      'chef4': chef4Avatar
    };
    return avatarMap[currentUser.chefAvatar] || chef1Avatar;
  };

  // Get chef name
  const getChefName = () => {
    return currentUser?.chefName || "Chef Marcus";
  };

  // Voice options
  const voiceOptions = [
    { id: "energetic", label: "Energetic", icon: Volume2 },
    { id: "calm", label: "Calm", icon: Volume2 },
    { id: "playful", label: "Playful", icon: Volume2 }
  ];

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  // Handle send message
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = {
      sender: 'user' as const,
      message: message.trim(),
      timestamp: new Date()
    };
    setConversation(prev => [...prev, userMessage]);
    setMessage("");
    
    // Show chef thinking
    setIsChefThinking(true);
    
    // Simulate chef response after delay
    setTimeout(() => {
      setIsChefThinking(false);
      const chefResponse = {
        sender: 'chef' as const,
        message: getChefResponse(message.trim()),
        timestamp: new Date()
      };
      setConversation(prev => [...prev, chefResponse]);
    }, 2000);
  };

  // Get chef response based on voice personality
  const getChefResponse = (userMessage: string) => {
    const responses = {
      energetic: [
        "Absolutely! Let's get cooking with energy!",
        "That's fantastic! I'm excited to help you create something amazing!",
        "Perfect! Let's turn up the heat and make something delicious!",
        "Great question! I'm here to guide you through every step!"
      ],
      calm: [
        "Of course, let's take this step by step together.",
        "I understand. We'll work through this calmly and carefully.",
        "That's a thoughtful question. Here's what I suggest...",
        "No worries, we'll go at your pace and make it perfect."
      ],
      playful: [
        "Ooh, I love where this is going! Let's have some fun!",
        "Haha, you're speaking my language! Time to get creative!",
        "This is going to be so much fun! Ready to play with flavors?",
        "You're asking all the right questions! Let's cook up some magic!"
      ]
    };
    
    const responseList = responses[selectedVoice];
    return responseList[Math.floor(Math.random() * responseList.length)];
  };

  // Handle voice recording toggle
  const toggleListening = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // Start listening simulation
      setTimeout(() => {
        setIsListening(false);
        handleSendMessage();
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative z-[9999]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900">
        <BackButton to="/recipes" className="text-white" />
        <div className="text-center">
          <h1 className="text-lg font-bold text-white">NutraGenie</h1>
        </div>
        <div className="w-8" /> {/* Spacer for centering */}
      </div>

      {/* Chef Info Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img 
              src={getChefAvatar()} 
              alt="Chef Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold text-white">{getChefName()}</h2>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-gray-300">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Voice Options - moved here from bottom */}
        <div className="flex items-center gap-2">
          {voiceOptions.map((voice) => (
            <button
              key={voice.id}
              onClick={() => setSelectedVoice(voice.id as typeof selectedVoice)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                selectedVoice === voice.id 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <voice.icon size={16} />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {conversation.map((msg, index) => (
            <div 
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs px-4 py-3 rounded-2xl ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-white'
                }`}
              >
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          ))}
          
          {/* Chef thinking indicator */}
          {isChefThinking && (
            <div className="flex justify-start">
              <div className="max-w-xs px-4 py-3 rounded-2xl bg-gray-700 text-white">
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-purple-400 rounded-full animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{getChefName()} is thinking...</p>
                    <p className="text-xs text-gray-400">Analyzing your request...</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 bg-black fixed bottom-0 left-0 right-0 z-[10000]">
        <div className="flex items-center gap-3">
          {/* Microphone Button */}
          <button
            onClick={toggleListening}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              isListening 
                ? 'bg-red-600 text-white animate-pulse' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {isListening ? <MicOff size={24} /> : <Mic size={24} />}
          </button>

          {/* Text Input Area */}
          <div className="flex-1 bg-gray-700 rounded-full px-6 py-4">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="w-full bg-transparent text-white placeholder-gray-400 outline-none text-lg"
            />
          </div>

          {/* Pause Button */}
          <button 
            onClick={() => {
              // Handle pause functionality
              console.log('Pause clicked');
            }}
            className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
          >
            <Pause size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}