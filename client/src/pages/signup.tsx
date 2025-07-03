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
import { ArrowLeft, ArrowRight } from "lucide-react";

const userAvatars = ['😀', '👩', '👨', '🧑‍🦰', '🧑‍🦱', '👦', '👧', '🧓', '👴', '👵'];

const chefs = [
  { name: 'Chef Antoine', personality: 'Precise & Classic', emoji: '👨‍🍳' },
  { name: 'Chef Sofia', personality: 'Friendly & Vibrant', emoji: '👩‍🍳' },
  { name: 'Chef Ravi', personality: 'Bold & Spicy', emoji: '🧑‍🍳' },
  { name: 'Chef Sakura', personality: 'Zen & Delicate', emoji: '🍜' },
  { name: 'Chef Marco', personality: 'Traditional & Warm', emoji: '👨‍🍳' },
  { name: 'Chef Elena', personality: 'Creative & Fun', emoji: '👩‍🍳' }
];

export default function SignupScreen() {
  const [, setLocation] = useLocation();
  const [, setCurrentUser] = useLocalStorage("nutragenie_user", null);
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [nickname, setNickname] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState('😀');
  const [selectedChef, setSelectedChef] = useState(chefs[0]);
  const [chefNickname, setChefNickname] = useState(chefs[0].name);
  const [isVerifying, setIsVerifying] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

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
    // Simulate sending verification code
    setTimeout(() => {
      setCodeSent(true);
      setIsVerifying(false);
      toast({ title: "Code Sent!", description: "Check your phone for the verification code." });
    }, 2000);
  };

  const verifyCode = () => {
    if (verificationCode === "1234") {
      // Auto-validate and create user
      createUserMutation.mutate({
        nickname,
        ageGroup,
        phoneNumber,
        avatar: selectedAvatar,
        selectedChef: {
          name: chefNickname,
          personality: selectedChef.personality,
          emoji: selectedChef.emoji
        },
        dietaryRestrictions: [],
        healthGoals: [],
        allergies: ''
      });
    } else {
      toast({ title: "Invalid Code", description: "Please enter the correct verification code.", variant: "destructive" });
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && nickname.length >= 2 && ageGroup) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedChef && chefNickname) {
      setCurrentStep(3);
    } else if (currentStep === 3 && phoneNumber.length >= 10) {
      sendVerificationCode();
      setCurrentStep(4);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStep1Valid = nickname.length >= 2 && ageGroup;
  const isStep2Valid = selectedChef && chefNickname.length >= 2;
  const isStep3Valid = phoneNumber.length >= 10;

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-warm-neutral-600">Let's start by setting up your profile</p>
      </div>

      {/* Avatar Selection */}
      <div>
        <Label className="block text-sm font-medium text-warm-neutral-700 mb-3">Choose Your Avatar</Label>
        <div className="grid grid-cols-5 gap-3 justify-items-center">
          {userAvatars.map(avatar => (
            <button
              key={avatar}
              type="button"
              onClick={() => setSelectedAvatar(avatar)}
              className={`flex items-center justify-center w-16 h-16 rounded-full border-2 ${
                selectedAvatar === avatar ? 'border-brand-green-500 bg-brand-green-50' : 'border-warm-neutral-300'
              } bg-warm-neutral-100 text-2xl hover:border-brand-green-500 transition-all`}
            >
              {avatar}
            </button>
          ))}
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="nickname" className="block text-sm font-medium text-warm-neutral-700 mb-2">
            Your Nickname
          </Label>
          <Input
            id="nickname"
            type="text"
            placeholder="Enter your nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-warm-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <Label htmlFor="ageGroup" className="block text-sm font-medium text-warm-neutral-700 mb-2">
            Age Group
          </Label>
          <Select value={ageGroup} onValueChange={setAgeGroup}>
            <SelectTrigger className="w-full px-4 py-3 rounded-xl border border-warm-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent">
              <SelectValue placeholder="Select age group" />
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
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-warm-neutral-600">Now let's choose your personal AI chef</p>
      </div>

      {/* Chef Avatar Selection */}
      <div>
        <Label className="block text-sm font-medium text-warm-neutral-700 mb-3">Chef Avatar</Label>
        <div className="grid grid-cols-3 gap-3 justify-items-center">
          {chefs.map(chef => (
            <button
              key={chef.name}
              type="button"
              onClick={() => {
                setSelectedChef(chef);
                setChefNickname(chef.name);
              }}
              className={`flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 ${
                selectedChef.emoji === chef.emoji ? 'border-brand-green-500 bg-brand-green-50' : 'border-warm-neutral-300'
              } bg-warm-neutral-100 text-2xl hover:border-brand-green-500 transition-all`}
            >
              {chef.emoji}
              <span className="text-xs text-warm-neutral-600 mt-1">{chef.personality.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chef Nickname */}
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
          className="w-full px-4 py-3 rounded-xl border border-warm-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent"
        />
        <p className="text-xs text-warm-neutral-500 mt-1">Personality: {selectedChef.personality}</p>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-warm-neutral-600">We need to verify your phone number</p>
      </div>

      <div>
        <Label htmlFor="phone" className="block text-sm font-medium text-warm-neutral-700 mb-2">
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="(555) 123-4567"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-warm-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-warm-neutral-600">Enter the verification code sent to {phoneNumber}</p>
      </div>

      <div>
        <Label htmlFor="verificationCode" className="block text-sm font-medium text-warm-neutral-700 mb-2">
          Verification Code
        </Label>
        <Input
          id="verificationCode"
          type="text"
          placeholder="Enter 4-digit code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-warm-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent text-center text-lg font-mono"
          maxLength={4}
        />
        <p className="text-xs text-warm-neutral-500 mt-1 text-center">
          For demo purposes, use code: <span className="font-mono font-bold">1234</span>
        </p>
      </div>

      {verificationCode.length === 4 && (
        <Button
          onClick={verifyCode}
          disabled={createUserMutation.isPending}
          className="w-full bg-brand-green-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-brand-green-600 transition-all duration-200"
        >
          {createUserMutation.isPending ? "Verifying..." : "Verify & Continue"}
        </Button>
      )}
    </div>
  );

  return (
    <div className="h-screen bg-warm-neutral-50 p-6">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={currentStep === 1 ? () => setLocation("/") : prevStep}
            className="rounded-full hover:bg-warm-neutral-200"
          >
            <ArrowLeft className="h-6 w-6 text-warm-neutral-700" />
          </Button>
          <h2 className="text-xl font-bold text-warm-neutral-800">
            {currentStep === 1 && "Create Account"}
            {currentStep === 2 && "Choose Your Chef"}
            {currentStep === 3 && "Phone Number"}
            {currentStep === 4 && "Verify Phone"}
          </h2>
          <div className="w-10"></div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${
                  step <= currentStep ? 'bg-brand-green-500' : 'bg-warm-neutral-300'
                } transition-all duration-200`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="mt-8">
            <Button
              onClick={nextStep}
              disabled={
                (currentStep === 1 && !isStep1Valid) ||
                (currentStep === 2 && !isStep2Valid) ||
                (currentStep === 3 && (!isStep3Valid || isVerifying))
              }
              className="w-full bg-brand-green-500 text-white py-4 px-6 rounded-xl font-semibold text-lg disabled:bg-warm-neutral-300 disabled:cursor-not-allowed hover:bg-brand-green-600 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {currentStep === 3 && isVerifying ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Sending Code...
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}