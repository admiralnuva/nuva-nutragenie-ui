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
import { ArrowLeft } from "lucide-react";

const userAvatars = ['😀', '👩', '👨', '🧑‍🦰', '🧑‍🦱'];

export default function SignupScreen() {
  const [, setLocation] = useLocation();
  const [, setCurrentUser] = useLocalStorage("nutragenie_user", null);
  const { toast } = useToast();
  
  const [nickname, setNickname] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState('😀');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.length >= 2 && phoneNumber.length >= 10 && ageGroup) {
      createUserMutation.mutate({
        nickname,
        ageGroup,
        phoneNumber,
        avatar: selectedAvatar,
        selectedChef: {
          name: 'Chef Antoine',
          personality: 'Precise & Classic',
          emoji: '👨‍🍳'
        },
        dietaryRestrictions: [],
        healthGoals: [],
        allergies: ''
      });
    }
  };

  const isFormValid = nickname.length >= 2 && phoneNumber.length >= 10 && ageGroup;

  return (
    <div className="h-screen bg-warm-neutral-50 p-6">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/")}
            className="rounded-full hover:bg-warm-neutral-200"
          >
            <ArrowLeft className="h-6 w-6 text-warm-neutral-700" />
          </Button>
          <h2 className="text-xl font-bold text-warm-neutral-800">Create Account</h2>
          <div className="w-10"></div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="text-center mb-8">
            <p className="text-warm-neutral-600">Let's get you cooking with your personal AI chef!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Selection */}
            <div>
              <Label className="block text-sm font-medium text-warm-neutral-700 mb-3">Choose Your Avatar</Label>
              <div className="flex justify-center gap-3">
                {userAvatars.map(avatar => (
                  <button
                    key={avatar}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`flex items-center justify-center w-16 h-16 rounded-full border-2 ${
                      selectedAvatar === avatar ? 'border-brand-green-500' : 'border-transparent'
                    } bg-warm-neutral-200 text-2xl hover:border-brand-green-500 transition-all`}
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
                  Nickname
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

            <div className="mt-8">
              <Button
                type="submit"
                disabled={!isFormValid || createUserMutation.isPending}
                className="w-full bg-brand-green-500 text-white py-4 px-6 rounded-xl font-semibold text-lg disabled:bg-warm-neutral-300 disabled:cursor-not-allowed hover:bg-brand-green-600 transition-all duration-200"
              >
                {createUserMutation.isPending ? "Creating Account..." : "Continue"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
