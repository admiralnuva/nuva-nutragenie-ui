import { useState, useEffect } from "react";
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
import { OnboardingMascot, ONBOARDING_MESSAGES } from "@/components/ui/onboarding-mascot";
import { ArrowLeft, Check, User, ChefHat, MapPin, Phone, Shield, AlertCircle } from "lucide-react";
import { z } from "zod";

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

// Validation schemas
const signupSchema = z.object({
  nickname: z.string().min(1, "Enter nickname").min(2, "Nickname must be at least 2 characters").max(30, "Nickname too long"),
  ageGroup: z.string().min(1, "Enter age group"),
  phoneNumber: z.string().min(1, "Enter phone number").regex(/^\+?[\d\s\-\(\)]{10,}$/, "Please enter a valid phone number"),
  streetAddress: z.string().min(1, "Enter street address").min(5, "Please enter a valid street address"),
  city: z.string().min(1, "Enter city").min(2, "Please enter a valid city"),
  state: z.string().min(1, "Enter state").min(2, "Please enter a valid state"),
  zipCode: z.string().min(1, "Enter ZIP code").regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
  chefNickname: z.string().min(1, "Enter chef nickname").min(2, "Chef nickname must be at least 2 characters")
});

type ValidationErrors = Partial<Record<keyof z.infer<typeof signupSchema>, string>>;

export default function SignupScreen() {
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
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [activeCard, setActiveCard] = useState<number | null>(1);
  
  // Mascot guidance state
  const [showMascot, setShowMascot] = useState(true);
  const [currentMascotStep, setCurrentMascotStep] = useState(0);

  // Dynamic mascot messages based on progress
  const getMascotMessages = () => {
    const messages = [];
    
    if (!selectedAvatar) {
      messages.push({
        id: "welcome",
        text: "Welcome to NutraGenie! I'm Genie, your nutrition guide. Let's create your personalized profile - start by choosing your avatar!",
        delay: 1000
      });
    } else if (!isNicknameValid) {
      messages.push({
        id: "nickname",
        text: "Great avatar choice! Now enter your nickname - this is how I'll greet you throughout the app.",
        delay: 500
      });
    } else if (!ageGroup) {
      messages.push({
        id: "age",
        text: "Perfect! Now select your age group so I can tailor nutrition recommendations to your life stage.",
        delay: 500
      });
    } else if (!selectedChef) {
      messages.push({
        id: "chef",
        text: "Excellent! Now choose your AI chef companion. Each has their own cooking style and personality to match your preferences.",
        delay: 500
      });
    } else if (!isVerified) {
      messages.push({
        id: "verification",
        text: "Almost there! Verify your phone number to secure your account and enable personalized meal notifications.",
        delay: 500
      });
    } else {
      messages.push({
        id: "complete",
        text: "Amazing! Your profile is complete. I'll guide you through setting up your dietary preferences next.",
        delay: 500
      });
    }
    
    return messages;
  };

  const createUserMutation = useMutation({
    mutationFn: async (userData: any) => {
      const response = await apiRequest("POST", "/api/users", userData);
      return response.json();
    },
    onSuccess: (user) => {
      setCurrentUser(user);
      toast({ title: "Account created successfully!", description: "Redirecting to dietary preferences..." });
      
      // Smooth transition to dietary preferences
      setTimeout(() => {
        setLocation("/dietary");
      }, 1500);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const validateField = (fieldName: string, value: string) => {
    try {
      const fieldSchema = signupSchema.shape[fieldName as keyof typeof signupSchema.shape];
      fieldSchema.parse(value);
      setValidationErrors(prev => ({ ...prev, [fieldName]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(prev => ({ ...prev, [fieldName]: error.errors[0]?.message }));
      }
    }
  };

  const validateForm = (): boolean => {
    const formData = {
      nickname,
      ageGroup,
      phoneNumber,
      streetAddress,
      city,
      state,
      zipCode,
      chefNickname
    };

    try {
      signupSchema.parse(formData);
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: ValidationErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as keyof ValidationErrors] = err.message;
          }
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    if (touched[fieldName] || value === '') {
      validateField(fieldName, value);
    }
  };

  const sendVerificationCode = () => {
    if (!validateForm()) {
      toast({ 
        title: "Please fix errors", 
        description: "Complete all required fields with valid information.", 
        variant: "destructive" 
      });
      return;
    }

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
      
      // Show success message first, then create user after a brief pause
      setTimeout(() => {
        toast({ title: "Setting up your profile...", description: "This will only take a moment." });
        
        // Create user after success feedback
        setTimeout(() => {
          createUserMutation.mutate({
            nickname: nickname || 'TestUser',
            ageGroup: ageGroup || '25-30',
            phoneNumber: phoneNumber || '1234567890',
            address: `${streetAddress || ''}, ${city || ''}, ${state || ''} ${zipCode || ''}`.replace(/^,\s*/, '').replace(/,\s*,/g, ',').trim(),
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
      }, 1000);
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
  };

  // Field-level validation checks
  const isAvatarSelected = selectedAvatar !== null;
  const isNicknameValid = nickname.trim().length >= 2;
  const isAgeValid = ageGroup.length > 0;
  const isAddressValid = streetAddress.trim().length >= 5;
  const isCityValid = city.trim().length >= 2;
  const isStateValid = state.trim().length >= 2;
  const isZipValid = zipCode.trim().length >= 5;
  const isChefAvatarSelected = selectedChef !== null;
  const isChefNicknameValid = chefNickname.trim().length >= 2;
  const isPhoneValid = phoneNumber.trim().length >= 10;

  // Section completion checks
  const isProfileComplete = isAvatarSelected && isNicknameValid && isAgeValid;
  const isAddressComplete = isAddressValid && isCityValid && isStateValid && isZipValid;
  const isChefComplete = isChefAvatarSelected && isChefNicknameValid;
  const isPhoneComplete = isPhoneValid;
  const isVerifiedComplete = isVerified;

  // Auto-advance to next card when current section is completed
  useEffect(() => {
    if (isProfileComplete && activeCard === 1) {
      setActiveCard(2);
    } else if (isChefComplete && activeCard === 2) {
      setActiveCard(3);
    }
  }, [isProfileComplete, isChefComplete, activeCard]);

  // Trigger validation when fields lose focus
  const handleCardClick = (cardNumber: number) => {
    // Check if user can navigate to the requested card
    if (cardNumber === 2 && !isProfileComplete) {
      // Mark all profile fields as touched to show errors
      setTouched(prev => ({ 
        ...prev, 
        nickname: true, 
        ageGroup: true, 
        avatar: true 
      }));
      return; // Prevent navigation
    }
    if (cardNumber === 3 && (!isProfileComplete || !isChefComplete)) {
      // Mark all required fields as touched
      setTouched(prev => ({ 
        ...prev, 
        nickname: true, 
        ageGroup: true, 
        avatar: true,
        chef: true,
        chefNickname: true
      }));
      return; // Prevent navigation
    }
    setActiveCard(cardNumber);
  };
  const isFormComplete = isProfileComplete && isAddressComplete && isChefComplete && isPhoneComplete && isVerifiedComplete;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-md mx-auto">
        {/* Standard Header */}
        <div className="flex items-center justify-between pt-8 pb-4 px-4">
          <BackButton onClick={() => setLocation('/splash')} className="w-8 h-8" />
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
            <p className="text-purple-300 text-lg font-semibold mt-1">Create Account</p>
          </div>
          <div className="w-8"></div>
        </div>
        
        <div className="p-6 space-y-3">
          {/* Profile Section */}
          <Card 
            className={`bg-gray-800/90 backdrop-blur-sm border border-gray-700 transition-all cursor-pointer ${
              activeCard === 1 ? 'border-purple-500 shadow-lg' : 'border-gray-700'
            } ${isProfileComplete ? 'ring-2 ring-purple-500' : ''}`}
            onClick={() => handleCardClick(1)}
          >
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg text-white">
                <User className="w-5 h-5 text-purple-400" />
                Your Profile
                {isProfileComplete && <Check className="w-5 h-5 text-purple-500" />}
              </CardTitle>
              <CardDescription className="text-gray-300">Choose avatar, nickname, & age</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Avatar Selection */}
              <div>
                <Label className="block text-sm font-medium text-purple-300 mb-3">
                  Avatar <span className="text-red-500">*</span> 
                  {!selectedAvatar && <span className="text-xs text-purple-400 ml-2">(Select first to continue)</span>}
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {userAvatars.map((avatar) => (
                    <div key={avatar.id} className="flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAvatar(avatar);
                          setTouched(prev => ({ ...prev, avatar: true }));
                        }}
                        className={`flex items-center justify-center w-20 h-20 rounded-lg ${
                          selectedAvatar?.id === avatar.id ? 'ring-2 ring-purple-500 shadow-md scale-105' : 
                          !selectedAvatar ? 'ring-2 ring-orange-400' : ''
                        } bg-gray-700 hover:ring-2 hover:ring-purple-400 transition-all overflow-hidden`}
                      >
                        <img 
                          src={avatar.src} 
                          alt={avatar.alt}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </button>
                    </div>
                  ))}
                </div>
                {!selectedAvatar && (
                  <div className="flex items-center gap-1 mt-2 text-orange-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    Please select an avatar to continue
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="nickname" className="block text-sm font-medium text-purple-300 mb-2">
                    Nickname
                  </Label>
                  <Input
                    id="nickname"
                    type="text"
                    placeholder={selectedAvatar ? "Your name" : "Select avatar first"}
                    value={nickname}
                    disabled={!selectedAvatar}
                    tabIndex={selectedAvatar ? 0 : -1}
                    onChange={(e) => {
                      setNickname(e.target.value);
                      handleFieldChange('nickname', e.target.value);
                      setTouched(prev => ({ ...prev, nickname: true }));
                    }}
                    onBlur={() => {
                      setTouched(prev => ({ ...prev, nickname: true }));
                      // Validate on blur
                      if (nickname.trim().length < 2) {
                        setValidationErrors(prev => ({ ...prev, nickname: "Enter nickname" }));
                      }
                    }}
                    onFocus={() => {
                      if (!selectedAvatar) {
                        setTouched(prev => ({ ...prev, avatar: true }));
                      }
                    }}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      !selectedAvatar ? 'border-gray-300 bg-gray-100 cursor-not-allowed' :
                      validationErrors.nickname ? 'border-red-500 focus:ring-red-500' : 'border-warm-neutral-300 focus:ring-brand-indigo-500'
                    } focus:outline-none focus:ring-2 focus:border-transparent`}
                  />
                  {validationErrors.nickname && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {validationErrors.nickname}
                    </div>
                  )}
                </div>

                <div className="col-span-1">
                  <Label htmlFor="ageGroup" className="block text-sm font-medium text-purple-300 mb-2">
                    Age
                  </Label>
                  <Select 
                    value={ageGroup} 
                    disabled={!selectedAvatar || !isNicknameValid}
                    onValueChange={(value) => {
                      setAgeGroup(value);
                      handleFieldChange('ageGroup', value);
                      setTouched(prev => ({ ...prev, ageGroup: true }));
                    }}
                    onOpenChange={(isOpen) => {
                      if (isOpen && (!selectedAvatar || !isNicknameValid)) {
                        setTouched(prev => ({ 
                          ...prev, 
                          ageGroup: true,
                          avatar: !selectedAvatar,
                          nickname: !isNicknameValid
                        }));
                      }
                    }}>
                    <SelectTrigger 
                      tabIndex={selectedAvatar && isNicknameValid ? 0 : -1}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        !selectedAvatar || !isNicknameValid ? 'border-gray-300 bg-gray-100 cursor-not-allowed' :
                        validationErrors.ageGroup ? 'border-red-500 focus:ring-red-500' : 'border-warm-neutral-300 focus:ring-brand-indigo-500'
                      } focus:outline-none focus:ring-2 focus:border-transparent`}>
                      <SelectValue placeholder={
                        !selectedAvatar ? "Select avatar first" :
                        !isNicknameValid ? "Enter nickname first" : "Age"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<16">&lt; 16</SelectItem>
                      <SelectItem value="17-30">17-30</SelectItem>
                      <SelectItem value="31-50">31-50</SelectItem>
                      <SelectItem value="51+">51 and above</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.ageGroup && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {validationErrors.ageGroup}
                    </div>
                  )}
                  {(!selectedAvatar || !isNicknameValid) && touched.ageGroup && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {!selectedAvatar ? "Select avatar first" : "Complete nickname first"}
                    </div>
                  )}
                </div>
              </div>


            </CardContent>
          </Card>

          {/* Address Section */}
          <Card className={`transition-all ${isAddressComplete ? 'ring-2 ring-brand-indigo-500' : ''}`}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5" />
                Your Address
                {isAddressComplete && <Check className="w-5 h-5 text-purple-500" />}
              </CardTitle>
              <CardDescription>Delivery and location details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Street Address */}
              <div>
                <Label htmlFor="streetAddress" className="block text-sm font-medium text-purple-300 mb-2">
                  Street Address
                </Label>
                <Input
                  id="streetAddress"
                  type="text"
                  placeholder="123 Main Street"
                  value={streetAddress}
                  tabIndex={isProfileComplete ? 0 : -1}
                  onChange={(e) => {
                    setStreetAddress(e.target.value);
                    handleFieldChange('streetAddress', e.target.value);
                    setTouched(prev => ({ ...prev, streetAddress: true }));
                  }}
                  onBlur={() => {
                    setTouched(prev => ({ ...prev, streetAddress: true }));
                    if (streetAddress.trim().length < 5) {
                      setValidationErrors(prev => ({ ...prev, streetAddress: "Enter street address" }));
                    }
                  }}
                  onFocus={() => {
                    if (!isProfileComplete) {
                      setTouched(prev => ({ 
                        ...prev, 
                        nickname: true, 
                        ageGroup: true, 
                        avatar: true 
                      }));
                    }
                  }}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    !isProfileComplete ? 'border-red-500 bg-red-50' :
                    validationErrors.streetAddress ? 'border-red-500 focus:ring-red-500' : 'border-warm-neutral-300 focus:ring-brand-indigo-500'
                  } focus:outline-none focus:ring-2 focus:border-transparent`}
                />
                {validationErrors.streetAddress && (
                  <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {validationErrors.streetAddress}
                  </div>
                )}
                {!isProfileComplete && touched.streetAddress && (
                  <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    Complete profile section first (avatar, nickname, age)
                  </div>
                )}
              </div>

              {/* City, State, Zip Row */}
              <div className="grid grid-cols-7 gap-3">
                <div className="col-span-3">
                  <Label htmlFor="city" className="block text-sm font-medium text-purple-300 mb-2">
                    City
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder={isAddressValid ? "San Francisco" : "Enter address first"}
                    value={city}
                    disabled={!isAddressValid}
                    onChange={(e) => {
                      setCity(e.target.value);
                      handleFieldChange('city', e.target.value);
                      setTouched(prev => ({ ...prev, city: true }));
                    }}
                    onBlur={() => setTouched(prev => ({ ...prev, city: true }))}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      !isAddressValid ? 'border-gray-300 bg-gray-100 cursor-not-allowed' :
                      validationErrors.city ? 'border-red-500 focus:ring-red-500' : 'border-warm-neutral-300 focus:ring-brand-indigo-500'
                    } focus:outline-none focus:ring-2 focus:border-transparent`}
                  />
                  {validationErrors.city && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-3 h-3" />
                      <span className="text-xs">{validationErrors.city}</span>
                    </div>
                  )}
                </div>
                <div className="col-span-2">
                  <Label htmlFor="state" className="block text-sm font-medium text-purple-300 mb-2">
                    State
                  </Label>
                  <Select 
                    value={state} 
                    disabled={!isAddressValid || !isCityValid}
                    onValueChange={(value) => {
                      setState(value);
                      handleFieldChange('state', value);
                      setTouched(prev => ({ ...prev, state: true }));
                    }}>
                    <SelectTrigger className={`w-full ${
                      !isAddressValid || !isCityValid ? 'border-gray-300 bg-gray-100 cursor-not-allowed' :
                      validationErrors.state ? 'border-red-500 focus:ring-red-500' : 'border-warm-neutral-300'
                    }`}>
                      <SelectValue placeholder={
                        !isAddressValid ? "Enter address first" :
                        !isCityValid ? "Enter city first" : "CA"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AL">AL</SelectItem>
                      <SelectItem value="AK">AK</SelectItem>
                      <SelectItem value="AZ">AZ</SelectItem>
                      <SelectItem value="AR">AR</SelectItem>
                      <SelectItem value="CA">CA</SelectItem>
                      <SelectItem value="CO">CO</SelectItem>
                      <SelectItem value="CT">CT</SelectItem>
                      <SelectItem value="DE">DE</SelectItem>
                      <SelectItem value="FL">FL</SelectItem>
                      <SelectItem value="GA">GA</SelectItem>
                      <SelectItem value="HI">HI</SelectItem>
                      <SelectItem value="ID">ID</SelectItem>
                      <SelectItem value="IL">IL</SelectItem>
                      <SelectItem value="IN">IN</SelectItem>
                      <SelectItem value="IA">IA</SelectItem>
                      <SelectItem value="KS">KS</SelectItem>
                      <SelectItem value="KY">KY</SelectItem>
                      <SelectItem value="LA">LA</SelectItem>
                      <SelectItem value="ME">ME</SelectItem>
                      <SelectItem value="MD">MD</SelectItem>
                      <SelectItem value="MA">MA</SelectItem>
                      <SelectItem value="MI">MI</SelectItem>
                      <SelectItem value="MN">MN</SelectItem>
                      <SelectItem value="MS">MS</SelectItem>
                      <SelectItem value="MO">MO</SelectItem>
                      <SelectItem value="MT">MT</SelectItem>
                      <SelectItem value="NE">NE</SelectItem>
                      <SelectItem value="NV">NV</SelectItem>
                      <SelectItem value="NH">NH</SelectItem>
                      <SelectItem value="NJ">NJ</SelectItem>
                      <SelectItem value="NM">NM</SelectItem>
                      <SelectItem value="NY">NY</SelectItem>
                      <SelectItem value="NC">NC</SelectItem>
                      <SelectItem value="ND">ND</SelectItem>
                      <SelectItem value="OH">OH</SelectItem>
                      <SelectItem value="OK">OK</SelectItem>
                      <SelectItem value="OR">OR</SelectItem>
                      <SelectItem value="PA">PA</SelectItem>
                      <SelectItem value="RI">RI</SelectItem>
                      <SelectItem value="SC">SC</SelectItem>
                      <SelectItem value="SD">SD</SelectItem>
                      <SelectItem value="TN">TN</SelectItem>
                      <SelectItem value="TX">TX</SelectItem>
                      <SelectItem value="UT">UT</SelectItem>
                      <SelectItem value="VT">VT</SelectItem>
                      <SelectItem value="VA">VA</SelectItem>
                      <SelectItem value="WA">WA</SelectItem>
                      <SelectItem value="WV">WV</SelectItem>
                      <SelectItem value="WI">WI</SelectItem>
                      <SelectItem value="WY">WY</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.state && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-3 h-3" />
                      <span className="text-xs">{validationErrors.state}</span>
                    </div>
                  )}
                </div>
                <div className="col-span-2">
                  <Label htmlFor="zipCode" className="block text-sm font-medium text-purple-300 mb-2">
                    Zip
                  </Label>
                  <Input
                    id="zipCode"
                    type="text"
                    placeholder={
                      !isAddressValid ? "Address first" :
                      !isCityValid ? "City first" :
                      !isStateValid ? "State first" : "94102"
                    }
                    maxLength={10}
                    value={zipCode}
                    disabled={!isAddressValid || !isCityValid || !isStateValid}
                    onChange={(e) => {
                      setZipCode(e.target.value);
                      handleFieldChange('zipCode', e.target.value);
                      setTouched(prev => ({ ...prev, zipCode: true }));
                    }}
                    onBlur={() => setTouched(prev => ({ ...prev, zipCode: true }))}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      !isAddressValid || !isCityValid || !isStateValid ? 'border-gray-300 bg-gray-100 cursor-not-allowed' :
                      validationErrors.zipCode ? 'border-red-500 focus:ring-red-500' : 'border-warm-neutral-300 focus:ring-brand-indigo-500'
                    } focus:outline-none focus:ring-2 focus:border-transparent`}
                  />
                  {validationErrors.zipCode && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-3 h-3" />
                      <span className="text-xs">{validationErrors.zipCode}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chef Selection Section */}
          <Card 
            className={`transition-all border-2 cursor-pointer ${
              activeCard === 2 ? 'border-indigo-500 shadow-lg' : 'border-white'
            } ${isChefComplete ? 'ring-2 ring-green-500' : ''}`}
            onClick={() => handleCardClick(2)}
          >
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ChefHat className="w-5 h-5" />
                Your AI Chef
                {isChefComplete && <Check className="w-5 h-5 text-purple-500" />}
              </CardTitle>
              <CardDescription>Select your personal cooking assistant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Chef Avatar Selection */}
              <div>
                <Label className="block text-sm font-medium text-purple-300 mb-3">
                  Chef Avatar <span className="text-red-500">*</span>
                  {!selectedChef && <span className="text-xs text-indigo-600 ml-2">(Select first to continue)</span>}
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {chefs.map(chef => (
                    <div key={chef.name} className="flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedChef(chef);
                          setChefNickname(chef.name);
                          setTouched(prev => ({ ...prev, chef: true }));
                        }}
                        className={`flex items-center justify-center w-20 h-20 rounded-lg ${
                          selectedChef?.name === chef.name ? 'ring-2 ring-indigo-500 bg-indigo-50 shadow-md scale-105' : 
                          !selectedChef ? 'ring-2 ring-orange-400' : ''
                        } bg-white hover:ring-2 hover:ring-indigo-400 hover:bg-indigo-50 transition-all overflow-hidden`}
                      >
                        <img 
                          src={chef.avatar} 
                          alt={chef.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </button>
                      <p className="text-xs text-gray-600 mt-1 text-center">
                        {chef.name.replace('Chef ', '')}
                      </p>
                    </div>
                  ))}
                </div>
                {!selectedChef && (
                  <div className="flex items-center gap-1 mt-2 text-orange-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    Please select a chef avatar to continue
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="chefNickname" className="block text-sm font-medium text-purple-300 mb-2">
                  Chef's Name
                </Label>
                <Input
                  id="chefNickname"
                  type="text"
                  placeholder={selectedChef ? "Enter chef's name" : "Select chef avatar first"}
                  value={chefNickname}
                  disabled={!selectedChef}
                  onChange={(e) => {
                    setChefNickname(e.target.value);
                    handleFieldChange('chefNickname', e.target.value);
                    setTouched(prev => ({ ...prev, chefNickname: true }));
                  }}
                  onBlur={() => setTouched(prev => ({ ...prev, chefNickname: true }))}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    !selectedChef ? 'border-gray-300 bg-gray-100 cursor-not-allowed' :
                    validationErrors.chefNickname ? 'border-red-500 focus:ring-red-500' : 'border-warm-neutral-300 focus:ring-brand-indigo-500'
                  } focus:outline-none focus:ring-2 focus:border-transparent`}
                />
                {validationErrors.chefNickname && (
                  <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {validationErrors.chefNickname}
                  </div>
                )}
                {selectedChef && (
                  <p className="text-xs text-warm-neutral-500 mt-1">Personality: {selectedChef.personality}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Phone Verification Section */}
          <Card 
            className={`transition-all border-2 cursor-pointer ${
              activeCard === 3 ? 'border-indigo-500 shadow-lg' : 'border-white'
            } ${isVerifiedComplete ? 'ring-2 ring-green-500' : ''}`}
            onClick={() => handleCardClick(3)}
          >
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Phone className="w-5 h-5" />
                Phone Verification
                {isVerifiedComplete && <Check className="w-5 h-5 text-brand-indigo-600" />}
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
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      handleFieldChange('phoneNumber', e.target.value);
                    }}
                    onBlur={() => setTouched(prev => ({ ...prev, phoneNumber: true }))}
                    className={`flex-1 px-3 py-2 rounded-lg border ${validationErrors.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'border-warm-neutral-300 focus:ring-brand-indigo-500'} focus:outline-none focus:ring-2 focus:border-transparent`}
                  />
                  <Button
                    onClick={sendVerificationCode}
                    disabled={isVerifying || codeSent}
                  >
                    {isVerifying ? "Sending..." : codeSent ? "Sent" : "Send Code"}
                  </Button>
                </div>
                {validationErrors.phoneNumber && (
                  <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {validationErrors.phoneNumber}
                  </div>
                )}
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
                      className="flex-1 px-3 py-2 rounded-lg border border-warm-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-indigo-500 focus:border-transparent text-center font-mono"
                      maxLength={4}
                    />
                    <Button
                      onClick={verifyCode}
                      disabled={verificationCode.length !== 4}

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
                <div className="flex items-center gap-2 text-brand-indigo-600 bg-brand-indigo-100 p-3 rounded-lg">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-medium">Phone number verified successfully!</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Status Message for Account Creation */}
          {createUserMutation.isPending && (
            <div className="w-full bg-brand-indigo-100 text-brand-indigo-700 py-4 px-6 rounded-xl font-semibold text-lg text-center">
              Creating Account...
            </div>
          )}

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            <div className={`w-3 h-3 rounded-full ${isProfileComplete ? 'bg-brand-indigo-500' : 'bg-warm-neutral-300'} transition-all duration-200`} />
            <div className={`w-3 h-3 rounded-full ${isChefComplete ? 'bg-brand-indigo-500' : 'bg-warm-neutral-300'} transition-all duration-200`} />
            <div className={`w-3 h-3 rounded-full ${isVerified ? 'bg-brand-indigo-500' : 'bg-warm-neutral-300'} transition-all duration-200`} />
          </div>
        </div>
      </div>

      {/* Onboarding Mascot */}
      {showMascot && (
        <OnboardingMascot
          messages={getMascotMessages()}
          position="bottom-right"
          onComplete={() => setShowMascot(false)}
          mascotName="Genie"
        />
      )}
    </div>
  );
}