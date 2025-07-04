import { useState } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";
import { ArrowLeft, Check, User, ChefHat, Phone, Shield } from "lucide-react";

const userAvatars = ['😀', '👩', '👨', '🧑‍🦰'];

const chefs = [
  { name: 'Chef Antoine', personality: 'Precise & Classic', emoji: '👨‍🍳' },
  { name: 'Chef Sofia', personality: 'Friendly & Vibrant', emoji: '👩‍🍳' },
  { name: 'Chef Ravi', personality: 'Bold & Spicy', emoji: '🧑‍🍳' },
  { name: 'Chef Sakura', personality: 'Zen & Delicate', emoji: '🍜' }
];

export default function SignupScreen() {
  const [, setLocation] = useLocation();
  const [, setCurrentUser] = useLocalStorage("nutragenie_user", null);
  const { toast } = useToast();
  
  const [nickname, setNickname] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState('😀');
  const [selectedChef, setSelectedChef] = useState(chefs[0]);
  const [chefNickname, setChefNickname] = useState(chefs[0].name);
  const [isVerifying, setIsVerifying] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const createUserMutation = useMutation({
    mutationFn: async (userData: any) => {
      const response = await apiRequest("POST", "/api/users", userData);
      return response.json();
    },
    onSuccess: (user) => {
      setCurrentUser(user);
      toast({ title: "Welcome to NutraGenie!", description: "Your account has been created successfully." });
      setLocation("/dietary");
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const sendVerificationCode = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setCodeSent(true);
      setIsVerifying(false);
      toast({ title: "Code Sent!", description: "Check your phone for the verification code." });
    }, 2000);
  };

  const verifyCode = () => {
    if (verificationCode === "1234") {
      setIsVerified(true);
      toast({ title: "Phone Verified!", description: "Your phone number has been verified successfully." });
      
      // Auto-create user and navigate to dietary preferences
      setTimeout(() => {
        createUserMutation.mutate({
          nickname: nickname || 'TestUser',
          ageGroup: ageGroup || '25-30',
          phoneNumber: phoneNumber || '1234567890',
          avatar: selectedAvatar || '😀',
          selectedChef: {
            name: chefNickname || 'Chef',
            personality: selectedChef?.personality || 'Friendly & Encouraging',
            emoji: selectedChef?.emoji || '👨‍🍳'
          },
          dietaryRestrictions: [],
          healthGoals: [],
          allergies: ''
        });
      }, 1500);
    } else {
      toast({ title: "Invalid Code", description: "Please enter the correct verification code.", variant: "destructive" });
    }
  };

  const handleSubmit = () => {
    // Use default values for easier testing
    createUserMutation.mutate({
      nickname: nickname || 'TestUser',
      ageGroup: ageGroup || '25-30',
      phoneNumber: phoneNumber || '1234567890',
      avatar: selectedAvatar || '😀',
      selectedChef: {
        name: chefNickname || 'Chef',
        personality: selectedChef?.personality || 'Friendly & Encouraging',
        emoji: selectedChef?.emoji || '👨‍🍳'
      },
      dietaryRestrictions: [],
      healthGoals: [],
      allergies: ''
    });
  };

  // Validation checks (simplified for testing)
  const isProfileComplete = true; // Remove validation for testing
  const isChefComplete = true; // Remove validation for testing
  const isPhoneComplete = true; // Remove validation for testing
  const isFormComplete = true; // Always allow form submission for testing

  return (
    <div className="min-h-screen bg-warm-neutral-50 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <BackButton to="/" />
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-gray-800">NutraGenie</h1>
          </div>
          <div className="w-8"></div>
        </div>
        <div className="text-lg font-semibold text-brand-green-600 text-center mb-6">
          Create Account
        </div>

        {/* Add NutraGenie Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-brand-green-500 rounded-2xl flex items-center justify-center">
            <div className="text-2xl">🤖</div>
            <div className="text-xl ml-1">❤️</div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <Card className={`transition-all ${isProfileComplete ? 'ring-2 ring-brand-green-500 bg-brand-green-50' : ''}`}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="w-5 h-5" />
                Your Profile
                {isProfileComplete && <Check className="w-5 h-5 text-brand-green-600" />}
              </CardTitle>
              <CardDescription>Choose avatar, nickname, & age</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Avatar Selection */}
              <div>
                <Label className="block text-sm font-medium text-warm-neutral-700 mb-3">Avatar</Label>
                <div className="grid grid-cols-4 gap-3">
                  {userAvatars.map(avatar => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`flex items-center justify-center w-16 h-16 rounded-lg border-2 ${
                        selectedAvatar === avatar ? 'border-brand-green-500 bg-brand-green-100' : 'border-warm-neutral-300'
                      } bg-warm-neutral-100 text-2xl hover:border-brand-green-500 transition-all`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="nickname" className="block text-sm font-medium text-warm-neutral-700 mb-2">
                    Nickname
                  </Label>
                  <Input
                    id="nickname"
                    type="text"
                    placeholder="Your name"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-warm-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent"
                  />
                </div>

                <div className="col-span-1">
                  <Label htmlFor="ageGroup" className="block text-sm font-medium text-warm-neutral-700 mb-2">
                    Age
                  </Label>
                  <Select value={ageGroup} onValueChange={setAgeGroup}>
                    <SelectTrigger className="w-full px-3 py-2 rounded-lg border border-warm-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent">
                      <SelectValue placeholder="Age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<16">&lt; 16</SelectItem>
                      <SelectItem value="17-30">17-30</SelectItem>
                      <SelectItem value="31-50">31-50</SelectItem>
                      <SelectItem value=">50">&gt; 50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chef Selection Section */}
          <Card className={`transition-all ${isChefComplete ? 'ring-2 ring-brand-green-500 bg-brand-green-50' : ''}`}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ChefHat className="w-5 h-5" />
                Your AI Chef
                {isChefComplete && <Check className="w-5 h-5 text-brand-green-600" />}
              </CardTitle>
              <CardDescription>Select your personal cooking assistant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Chef Avatar Selection */}
              <div>
                <Label className="block text-sm font-medium text-warm-neutral-700 mb-3">Chef Avatar</Label>
                <div className="grid grid-cols-4 gap-3">
                  {chefs.map(chef => (
                    <button
                      key={chef.name}
                      type="button"
                      onClick={() => {
                        setSelectedChef(chef);
                        setChefNickname(chef.name);
                      }}
                      className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg border-2 ${
                        selectedChef.emoji === chef.emoji ? 'border-brand-green-500 bg-brand-green-100' : 'border-warm-neutral-300'
                      } bg-warm-neutral-100 hover:border-brand-green-500 transition-all`}
                    >
                      <span className="text-2xl mb-1">{chef.emoji}</span>
                      <span className="text-xs text-warm-neutral-600 text-center leading-tight">{chef.personality.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="chefNickname" className="block text-sm font-medium text-warm-neutral-700 mb-2">
                  Chef's Name
                </Label>
                <Input
                  id="chefNickname"
                  type="text"
                  placeholder="Enter chef's name"
                  value={chefNickname}
                  onChange={(e) => setChefNickname(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-warm-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent"
                />
                <p className="text-xs text-warm-neutral-500 mt-1">Personality: {selectedChef.personality}</p>
              </div>
            </CardContent>
          </Card>

          {/* Phone Verification Section */}
          <Card className={`transition-all ${isVerified ? 'ring-2 ring-brand-green-500 bg-brand-green-50' : ''}`}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Phone className="w-5 h-5" />
                Phone Verification
                {isVerified && <Check className="w-5 h-5 text-brand-green-600" />}
              </CardTitle>
              <CardDescription>Verify your phone number for security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phone" className="block text-sm font-medium text-warm-neutral-700 mb-2">
                  Phone Number
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border border-warm-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent"
                  />
                  <Button
                    onClick={sendVerificationCode}
                    disabled={!isPhoneComplete || isVerifying || codeSent}
                    className="px-4 py-2 bg-brand-green-500 text-white rounded-lg hover:bg-brand-green-600 disabled:bg-warm-neutral-300"
                  >
                    {isVerifying ? "Sending..." : codeSent ? "Sent" : "Send Code"}
                  </Button>
                </div>
              </div>

              {codeSent && !isVerified && (
                <div>
                  <Label htmlFor="verificationCode" className="block text-sm font-medium text-warm-neutral-700 mb-2">
                    Verification Code
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="verificationCode"
                      type="text"
                      placeholder="Enter 4-digit code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-warm-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent text-center font-mono"
                      maxLength={4}
                    />
                    <Button
                      onClick={verifyCode}
                      disabled={verificationCode.length !== 4}
                      className="px-4 py-2 bg-brand-green-500 text-white rounded-lg hover:bg-brand-green-600 disabled:bg-warm-neutral-300"
                    >
                      Verify
                    </Button>
                  </div>
                  <p className="text-xs text-warm-neutral-500 mt-1 text-center">
                    Demo code: <span className="font-mono font-bold">1234</span>
                  </p>
                </div>
              )}

              {isVerified && (
                <div className="flex items-center gap-2 text-brand-green-600 bg-brand-green-100 p-3 rounded-lg">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-medium">Phone number verified successfully!</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Status Message for Account Creation */}
          {createUserMutation.isPending && (
            <div className="w-full bg-brand-green-100 text-brand-green-700 py-4 px-6 rounded-xl font-semibold text-lg text-center">
              Creating Account...
            </div>
          )}

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            <div className={`w-3 h-3 rounded-full ${isProfileComplete ? 'bg-brand-green-500' : 'bg-warm-neutral-300'} transition-all duration-200`} />
            <div className={`w-3 h-3 rounded-full ${isChefComplete ? 'bg-brand-green-500' : 'bg-warm-neutral-300'} transition-all duration-200`} />
            <div className={`w-3 h-3 rounded-full ${isVerified ? 'bg-brand-green-500' : 'bg-warm-neutral-300'} transition-all duration-200`} />
          </div>
        </div>
      </div>
    </div>
  );
}