import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { FrameworkHeader } from "@/components/ui/framework-header";
import { MediumCard, SmallCard } from "@/components/ui/sized-cards";
import { NavigationButton, SelectionButton } from "@/components/ui/reusable-buttons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, ChefHat, Phone, Check, MapPin } from "lucide-react";

// Import user avatar images
import userAvatar1 from "@/assets/avatars/user/user1.png";
import userAvatar2 from "@/assets/avatars/user/user2.png";
import userAvatar3 from "@/assets/avatars/user/user3.png";
import userAvatar4 from "@/assets/avatars/user/user4.png";

// Import chef avatar images
import chefAvatar1 from "@/assets/avatars/chef/chef1.png";
import chefAvatar2 from "@/assets/avatars/chef/chef2.png";
import chefAvatar3 from "@/assets/avatars/chef/chef3.png";
import chefAvatar4 from "@/assets/avatars/chef/chef4.png";

const userAvatars = [
  { id: 'user1', src: userAvatar1, alt: 'User Avatar 1' },
  { id: 'user2', src: userAvatar2, alt: 'User Avatar 2' },
  { id: 'user3', src: userAvatar3, alt: 'User Avatar 3' },
  { id: 'user4', src: userAvatar4, alt: 'User Avatar 4' }
];

const chefs = [
  { name: 'Chef Marcus', personality: 'Precise & Classic', avatar: chefAvatar1 },
  { name: 'Chef Luna', personality: 'Friendly & Vibrant', avatar: chefAvatar2 },
  { name: 'Chef Blaze', personality: 'Bold & Spicy', avatar: chefAvatar3 },
  { name: 'Chef Harmony', personality: 'Zen & Delicate', avatar: chefAvatar4 }
];

export default function NuvaSignupScreen() {
  const [, setLocation] = useLocation();
  const [, setCurrentUser] = useLocalStorage("nutragenie_user", null);
  const { toast } = useToast();
  
  const [nickname, setNickname] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<any>(null);
  const [selectedChef, setSelectedChef] = useState<any>(null);
  const [chefNickname, setChefNickname] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [activeCard, setActiveCard] = useState<number>(1);

  const createUserMutation = useMutation({
    mutationFn: (userData: any) => apiRequest('/api/users', 'POST', userData),
    onSuccess: (user) => {
      setCurrentUser(user);
      toast({ title: "Account Created!", description: "Welcome to NutraGenie!" });
      setLocation("/nuva-dietary");
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to create account", 
        variant: "destructive" 
      });
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
      
      setTimeout(() => {
        createUserMutation.mutate({
          nickname: nickname || 'TestUser',
          ageGroup: ageGroup || '25-30',
          phoneNumber: phoneNumber || '1234567890',
          avatar: selectedAvatar?.id || 'user1',
          selectedChef: {
            name: chefNickname || 'Chef',
            personality: selectedChef?.personality || 'Friendly & Encouraging',
            avatar: selectedChef?.avatar || chefAvatar1
          },
          dietaryRestrictions: [],
          healthGoals: [],
          allergies: ''
        });
      }, 1000);
    } else {
      toast({ title: "Invalid Code", description: "Please enter the correct verification code.", variant: "destructive" });
    }
  };

  // Section completion checks
  const isProfileComplete = selectedAvatar && nickname.length >= 2 && ageGroup;
  const isChefComplete = selectedChef && chefNickname.length >= 2;
  const isPhoneComplete = phoneNumber.length >= 10;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700">
      <FrameworkHeader 
        screenName="Create Account" 
        showBack 
        onBack={() => setLocation("/nuva")} 
      />

      <div className="p-4 space-y-4 max-w-md mx-auto" style={{ paddingTop: '100px', paddingBottom: '40px' }}>
        
        {/* Profile Card */}
        <MediumCard
          title="Your Profile"
          cardName="Profile Setup"
          description="Choose your avatar, nickname, and age group"
          avatar={
            selectedAvatar ? (
              <img 
                src={selectedAvatar.src} 
                alt={selectedAvatar.alt}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-indigo-100 rounded-full flex items-center justify-center">
                <User className="w-1/2 h-1/2 text-indigo-600" />
              </div>
            )
          }
        >
          {/* Avatar Selection */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {userAvatars.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar)}
                className={`w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                  selectedAvatar?.id === avatar.id 
                    ? 'ring-2 ring-indigo-500 border-indigo-500 scale-105' 
                    : 'border-gray-300 hover:border-indigo-400'
                }`}
              >
                <img src={avatar.src} alt={avatar.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Nickname and Age Group in same row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="nickname">Nickname</Label>
              <Input
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter your nickname"
              />
            </div>
            <div className="space-y-2 col-span-1">
              <Label>Age Group</Label>
              <Select value={ageGroup} onValueChange={setAgeGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18-25">18-25</SelectItem>
                  <SelectItem value="26-35">26-35</SelectItem>
                  <SelectItem value="36-45">36-45</SelectItem>
                  <SelectItem value="46-55">46-55</SelectItem>
                  <SelectItem value="56-65">56-65</SelectItem>
                  <SelectItem value="65+">65+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </MediumCard>

        {/* Address Card */}
        <SmallCard
          title="Your Address"
          cardName=""
          description="Enter your delivery address"
          avatar={
            <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center">
              <MapPin className="w-1/2 h-1/2 text-blue-600" />
            </div>
          }
        >
          {/* Address 1 */}
          <div className="space-y-2 mb-3">
            <Label htmlFor="address1">Address</Label>
            <Input
              id="address1"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              placeholder="Enter street address"
            />
          </div>

          {/* City, State, Zip in same row */}
          <div className="grid grid-cols-12 gap-2">
            <div className="space-y-2 col-span-6">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
            <div className="space-y-2 col-span-3">
              <Label>State</Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger>
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AL">AL</SelectItem>
                  <SelectItem value="CA">CA</SelectItem>
                  <SelectItem value="FL">FL</SelectItem>
                  <SelectItem value="NY">NY</SelectItem>
                  <SelectItem value="TX">TX</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 col-span-3">
              <Label htmlFor="zip">Zip</Label>
              <Input
                id="zip"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="12345"
                maxLength={6}
              />
            </div>
          </div>
        </SmallCard>

        {/* Chef Card */}
        <MediumCard
          title="Choose Your AI Chef"
          cardName="Chef Selection"
          description="Select your personal cooking assistant"
          avatar={
            selectedChef ? (
              <img 
                src={selectedChef.avatar} 
                alt={selectedChef.name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-orange-100 rounded-full flex items-center justify-center">
                <ChefHat className="w-1/2 h-1/2 text-orange-600" />
              </div>
            )
          }
        >
          {/* Chef Selection */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {chefs.map((chef, index) => (
              <button
                key={index}
                onClick={() => setSelectedChef(chef)}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  selectedChef?.name === chef.name 
                    ? 'ring-2 ring-indigo-500 border-indigo-500 bg-indigo-50' 
                    : 'border-gray-300 hover:border-indigo-400'
                }`}
              >
                <img src={chef.avatar} alt={chef.name} className="w-12 h-12 rounded-full mx-auto mb-2" />
                <p className="text-sm font-medium text-center">{chef.name}</p>
                <p className="text-xs text-gray-500 text-center">{chef.personality}</p>
              </button>
            ))}
          </div>

          {/* Chef Nickname */}
          <div className="space-y-2">
            <Label htmlFor="chefNickname">Chef Nickname</Label>
            <Input
              id="chefNickname"
              value={chefNickname}
              onChange={(e) => setChefNickname(e.target.value)}
              placeholder="What should we call your chef?"
            />
          </div>
        </MediumCard>

        {/* Phone Verification Card */}
        <SmallCard
          title="Phone Verification"
          cardName="Verify Phone"
          description="Verify your phone number for account security"
          avatar={
            <div className="w-full h-full bg-green-100 rounded-full flex items-center justify-center">
              <Phone className="w-1/2 h-1/2 text-green-600" />
            </div>
          }
        >
          {!codeSent ? (
            <div className="space-y-3">
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                type="tel"
              />
              <NavigationButton 
                onClick={sendVerificationCode}
                disabled={!isPhoneComplete || isVerifying}
              >
                {isVerifying ? "Sending..." : "Send Code"}
              </NavigationButton>
            </div>
          ) : !isVerified ? (
            <div className="space-y-3">
              <Input
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
                maxLength={4}
              />
              <NavigationButton onClick={verifyCode}>
                Verify Code
              </NavigationButton>
            </div>
          ) : (
            <div className="text-center py-2">
              <Check className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-green-600 font-medium">Phone Verified!</p>
            </div>
          )}
        </SmallCard>

        {/* Complete Setup Button */}
        {isVerified && (
          <div className="pt-4">
            <NavigationButton 
              onClick={() => createUserMutation.mutate({
                nickname: nickname || 'TestUser',
                ageGroup: ageGroup || '25-30',
                phoneNumber: phoneNumber || '1234567890',
                avatar: selectedAvatar?.id || 'user1',
                selectedChef: {
                  name: chefNickname || 'Chef',
                  personality: selectedChef?.personality || 'Friendly & Encouraging',
                  avatar: selectedChef?.avatar || chefAvatar1
                },
                dietaryRestrictions: [],
                healthGoals: [],
                allergies: ''
              })}
              disabled={createUserMutation.isPending}
            >
              {createUserMutation.isPending ? "Creating Account..." : "Complete Setup"}
            </NavigationButton>
          </div>
        )}
      </div>
    </div>
  );
}