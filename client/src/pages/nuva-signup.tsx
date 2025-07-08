import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
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
  { id: 'chef1', name: 'Chef Marcus', displayName: 'Marcus', personality: 'Precise & Classic', avatar: chefAvatar1 },
  { id: 'chef2', name: 'Chef Luna', displayName: 'Luna', personality: 'Friendly & Vibrant', avatar: chefAvatar2 },
  { id: 'chef3', name: 'Chef Blaze', displayName: 'Blaze', personality: 'Bold & Spicy', avatar: chefAvatar3 },
  { id: 'chef4', name: 'Chef Harmony', displayName: 'Harmony', personality: 'Zen & Delicate', avatar: chefAvatar4 }
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
  const [selectedChef, setSelectedChef] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<any>(null);
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
      setLocation("/dietary");
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
      
      // Navigate directly to dietary screen without creating user first
      setTimeout(() => {
        // Store temporary user data in localStorage
        const tempUserData = {
          nickname: nickname || 'TestUser',
          ageGroup: ageGroup || '25-30',
          phoneNumber: phoneNumber || '1234567890',
          streetAddress: streetAddress || '',
          city: city || '',
          state: state || '',
          zipCode: zipCode || '',
          avatar: selectedAvatar?.id || 'user1',
          selectedChef: selectedChef ? chefs.find(chef => chef.id === selectedChef) : null,
          chefNickname: chefNickname || ''
        };
        localStorage.setItem('nutragenie_temp_user', JSON.stringify(tempUserData));
        setLocation("/dietary");
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="flex items-center justify-between pt-8 pb-4 px-4">
        <div className="w-8"></div>
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
          <p className="text-gray-300 text-lg font-semibold mt-1">Create Account</p>
        </div>
        <div className="w-8"></div>
      </div>

      <div className="p-4 space-y-4 max-w-md mx-auto" style={{ paddingBottom: '40px' }}>
        
        {/* Profile Card */}
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 mb-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white">Your Profile</h3>
              <p className="text-gray-300 text-sm">Choose your avatar, nickname, and age group</p>
            </div>
            <div className="w-20 h-20 rounded-full overflow-hidden">
              {selectedAvatar ? (
                <img 
                  src={selectedAvatar.src} 
                  alt={selectedAvatar.alt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
          </div>
          {/* Avatar Selection */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {userAvatars.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar)}
                className={`w-20 h-20 rounded-lg overflow-hidden transition-all ${
                  selectedAvatar?.id === avatar.id 
                    ? 'scale-105' 
                    : 'hover:scale-102'
                }`}
                style={{ width: '80px', height: '80px' }}
              >
                <img src={avatar.src} alt={avatar.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Nickname and Age Group in same row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="nickname" className="text-gray-300">Nickname</Label>
              <Input
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter your nickname"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <div className="space-y-2 col-span-1">
              <Label className="text-gray-300">Age Group</Label>
              <Select value={ageGroup} onValueChange={setAgeGroup}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="18-25" className="text-white hover:bg-purple-600">18-25</SelectItem>
                  <SelectItem value="26-35" className="text-white hover:bg-purple-600">26-35</SelectItem>
                  <SelectItem value="36-45" className="text-white hover:bg-purple-600">36-45</SelectItem>
                  <SelectItem value="46-55" className="text-white hover:bg-purple-600">46-55</SelectItem>
                  <SelectItem value="56-65" className="text-white hover:bg-purple-600">56-65</SelectItem>
                  <SelectItem value="65+" className="text-white hover:bg-purple-600">65+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Address Card */}
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 mb-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white">Your Address</h3>
              <p className="text-gray-300 text-sm">Enter your delivery address</p>
            </div>
            <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          {/* Address 1 */}
          <div className="space-y-2 mb-3">
            <Label htmlFor="address1" className="text-gray-300">Address</Label>
            <Input
              id="address1"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              placeholder="Enter street address"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          {/* City, State, Zip in same row */}
          <div className="grid grid-cols-12 gap-2">
            <div className="space-y-2 col-span-6">
              <Label htmlFor="city" className="text-gray-300">City</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <div className="space-y-2 col-span-3">
              <Label className="text-gray-300">State</Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="AL" className="text-white hover:bg-gray-600">AL</SelectItem>
                  <SelectItem value="CA" className="text-white hover:bg-gray-600">CA</SelectItem>
                  <SelectItem value="FL" className="text-white hover:bg-gray-600">FL</SelectItem>
                  <SelectItem value="NY" className="text-white hover:bg-gray-600">NY</SelectItem>
                  <SelectItem value="TX" className="text-white hover:bg-gray-600">TX</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 col-span-3">
              <Label htmlFor="zip" className="text-gray-300">Zip</Label>
              <Input
                id="zip"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="12345"
                maxLength={6}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Chef Card */}
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 mb-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white">Choose Your AI Chef</h3>
              <p className="text-gray-300 text-sm">Select your personal cooking assistant</p>
            </div>
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-600">
              {selectedChef ? (
                <img 
                  src={chefs.find(chef => chef.id === selectedChef)?.avatar} 
                  alt={chefs.find(chef => chef.id === selectedChef)?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <ChefHat className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
          </div>
          {/* Chef Selection - 4 avatars in a row */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {chefs.map((chef) => (
              <div key={chef.id} className="flex flex-col items-center">
                <button
                  onClick={() => setSelectedChef(chef.id)}
                  className={`w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                    selectedChef === chef.id 
                      ? 'ring-2 ring-gray-400 border-gray-400 scale-105' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <img src={chef.avatar} alt={chef.name} className="w-full h-full object-cover" />
                </button>
                <p className="text-xs text-center mt-1 font-medium text-gray-300">{chef.displayName}</p>
              </div>
            ))}
          </div>
          
          {/* Chef Nickname Input */}
          {selectedChef && (
            <div className="space-y-2">
              <Label htmlFor="chefNickname" className="text-gray-300">Chef's Name</Label>
              <Input
                id="chefNickname"
                value={chefNickname}
                onChange={(e) => setChefNickname(e.target.value)}
                placeholder="Give your chef a name"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          )}
        </div>

        {/* Phone Verification Card */}
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 mb-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white">Phone Verification</h3>
              <p className="text-gray-300 text-sm">Verify your phone number for account security</p>
            </div>
            <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
              <Phone className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          {!codeSent ? (
            <div className="space-y-3">
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                type="tel"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <Button 
                onClick={sendVerificationCode}
                disabled={!isPhoneComplete || isVerifying}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-800"
              >
                {isVerifying ? "Sending..." : "Send Code"}
              </Button>
            </div>
          ) : !isVerified ? (
            <div className="space-y-3">
              <Input
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
                maxLength={4}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <Button 
                onClick={verifyCode}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white"
              >
                Verify Code
              </Button>
            </div>
          ) : (
            <div className="text-center py-2">
              <Check className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-green-400 font-medium">Phone Verified!</p>
            </div>
          )}
        </div>

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