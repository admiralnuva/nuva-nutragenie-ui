import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";
import { OnboardingMascot } from "@/components/ui/onboarding-mascot";
import { ArrowLeft, Heart, Target, Shield } from "lucide-react";

// Import user avatar images
import userAvatar1 from "@/assets/avatars/user/user1.png";
import userAvatar2 from "@/assets/avatars/user/user2.png";
import userAvatar3 from "@/assets/avatars/user/user3.png";
import userAvatar4 from "@/assets/avatars/user/user4.png";

const userAvatars = {
  'user1': userAvatar1,
  'user2': userAvatar2,
  'user3': userAvatar3,
  'user4': userAvatar4
};

const dietaryRestrictions = [
  { label: '🥬 Vegetarian', value: 'vegetarian' },
  { label: '🌱 Vegan', value: 'vegan' },
  { label: '🚫 Gluten-Free', value: 'gluten-free' },
  { label: '🥛 Dairy-Free', value: 'dairy-free' },
  { label: '🥜 Nut-Free', value: 'nut-free' },
  { label: '🐟 Pescatarian', value: 'pescatarian' },
  { label: '🥩 Keto', value: 'keto' },
  { label: '🌾 Low-Carb', value: 'low-carb' }
];

const healthConditions = [
  { label: '💉 Diabetes', value: 'diabetes' },
  { label: '❤️ Heart Issues', value: 'cardiovascular' },
  { label: '🫘 Kidney', value: 'kidney' },
  { label: '🩸 Hypertension', value: 'blood-pressure' },
  { label: '🎗️ Cancer', value: 'cancer' },
  { label: '✅ None', value: 'none' }
];

const fitnessGoals = [
  { label: '💪 Build Muscle', value: 'build-muscle' },
  { label: '⚖️ Lose Weight', value: 'lose-weight' },
  { label: '🏃 Endurance', value: 'endurance' },
  { label: '🧘 Holistic', value: 'wellness' }
];

export default function DietaryScreen() {
  const [, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useLocalStorage<any>("nutragenie_user", null);
  const { toast } = useToast();
  
  // Get temporary user data if user not created yet
  const tempUserData = JSON.parse(localStorage.getItem('nutragenie_temp_user') || '{}');
  const userData = currentUser || tempUserData;
  
  // Get user's selected avatar
  const userAvatarSrc = userData?.avatar ? userAvatars[userData.avatar as keyof typeof userAvatars] : userAvatar1;
  
  // Ref for the dietary restrictions card to focus on it
  const dietaryCardRef = useRef<HTMLDivElement>(null);
  
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedHealth, setSelectedHealth] = useState<string[]>([]);
  const [selectedFitness, setSelectedFitness] = useState<string[]>([]);
  const [allergies, setAllergies] = useState("");
  const [foodDislikes, setFoodDislikes] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  
  // Nutritional adjustments state
  const [calorieRange, setCalorieRange] = useState([300, 600]);
  const [proteinRange, setProteinRange] = useState([15, 40]);
  const [carbRange, setCarbRange] = useState([20, 60]);
  const [fatRange, setFatRange] = useState([10, 25]);
  const [fiberRange, setFiberRange] = useState([5, 25]);
  
  // New state for dropdown selections (minimalistic design)
  const [selectedCalorieRange, setSelectedCalorieRange] = useState<string>("1801-2000");
  const [selectedProteinRange, setSelectedProteinRange] = useState<string>("131-160");
  const [selectedCarbRange, setSelectedCarbRange] = useState<string>("151-200");
  const [selectedFatRange, setSelectedFatRange] = useState<string>("51-70");
  const [selectedFiberRange, setSelectedFiberRange] = useState<string>("21-25");
  
  // Mascot guidance state
  const [showMascot, setShowMascot] = useState(true);

  // Dynamic mascot messages for dietary page
  const getDietaryMascotMessages = () => {
    if (selectedDietary.length === 0 && selectedHealth.length === 0 && selectedFitness.length === 0) {
      return [
        {
          id: "dietary-intro",
          text: "Perfect! Now I'll help you set up your dietary preferences. This ensures your meal plans match your lifestyle and health goals.",
          delay: 1000
        },
        {
          id: "start-here",
          text: "Start with dietary restrictions - these are the foundation for personalized recipes that fit your needs!",
          delay: 500
        }
      ];
    } else if (selectedDietary.length > 0 && selectedHealth.length === 0) {
      return [
        {
          id: "health-next",
          text: "Great dietary choices! Now select any health factors I should consider for optimal nutrition planning.",
          delay: 500
        }
      ];
    } else if (selectedFitness.length === 0) {
      return [
        {
          id: "fitness-goals",
          text: "Excellent! Don't forget to set your fitness goals - this helps me recommend meals that support your wellness journey.",
          delay: 500
        }
      ];
    } else {
      return [
        {
          id: "almost-done",
          text: "Amazing progress! Feel free to add any food dislikes or allergies, then we'll generate your first personalized recipes!",
          delay: 500
        }
      ];
    }
  };

  // Focus on dietary restrictions when page loads
  useEffect(() => {
    if (dietaryCardRef.current) {
      dietaryCardRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      dietaryCardRef.current.focus();
    }
  }, []);

  const updateUserMutation = useMutation({
    mutationFn: async (updates: any) => {
      // Save dietary data to localStorage immediately
      const currentUserData = userData || JSON.parse(localStorage.getItem('nutragenie_temp_user') || '{}');
      const updatedUserData = { 
        ...currentUserData, 
        ...updates, 
        foodDislikes, 
        additionalNotes 
      };
      
      // Save to both temp and permanent user storage
      localStorage.setItem('nutragenie_temp_user', JSON.stringify(updatedUserData));
      localStorage.setItem('nutragenie_user', JSON.stringify(updatedUserData));
      setCurrentUser(updatedUserData);
      
      // Also try to save to backend
      try {
        const userSubmissionData = {
          nickname: userData?.nickname || 'User',
          ageGroup: userData?.ageGroup || '25-30',
          phoneNumber: userData?.phoneNumber || '1234567890',
          streetAddress: userData?.streetAddress || '',
          city: userData?.city || '',
          state: userData?.state || '',
          zipCode: userData?.zipCode || '',
          avatar: userData?.avatar || 'user1',
          selectedChef: {
            name: userData?.chefNickname || userData?.selectedChef?.name || 'Chef Marcus',
            personality: userData?.selectedChef?.personality || 'Precise & Classic',
            emoji: userData?.selectedChef?.displayName || 'Chef'
          },
          ...updates  // Include the dietary preferences
        };
        
        const response = await apiRequest("POST", "/api/users", userSubmissionData);
        return response.json();
      } catch (error) {
        console.error('Backend save failed:', error);
        // Don't throw - we already saved to localStorage
        return updatedUserData;
      }
    },
    onSuccess: (newUser) => {
      toast({ title: "Dietary preferences saved successfully!" });
      setLocation("/explore-recipes");
    },
    onError: (error: any) => {
      console.error('Save error:', error);
      // Even if there's an error, localStorage data is saved, so navigate anyway
      toast({ title: "Preferences saved locally. Continuing to recipes..." });
      setLocation("/explore-recipes");
    }
  });

  // Define dietary conflicts
  const dietaryConflicts = {
    'vegetarian': ['keto'],
    'vegan': ['keto'],
    'keto': ['vegetarian', 'vegan'],
    'pescatarian': ['vegetarian', 'vegan'] // Pescatarian conflicts with vegetarian/vegan
  };

  // Check if a dietary option is disabled due to conflicts
  const isDietaryOptionDisabled = (value: string) => {
    if (selectedDietary.includes(value)) return false; // Already selected options are never disabled
    
    // Check if any currently selected option conflicts with this value
    return selectedDietary.some(selected => {
      const conflicts = dietaryConflicts[selected as keyof typeof dietaryConflicts] || [];
      return conflicts.includes(value);
    });
  };

  const toggleDietarySelection = (value: string) => {
    // Don't allow selection if option is disabled
    if (isDietaryOptionDisabled(value)) return;
    
    setSelectedDietary(prev => {
      if (prev.includes(value)) {
        // If removing, just remove it
        return prev.filter(item => item !== value);
      } else {
        // If adding, check for conflicts
        const conflicts = dietaryConflicts[value as keyof typeof dietaryConflicts] || [];
        const newSelection = [...prev, value];
        
        // Remove any conflicting selections
        const filteredSelection = newSelection.filter(item => 
          item === value || !conflicts.includes(item)
        );
        
        // Also remove items that conflict with the new selection
        const finalSelection = filteredSelection.filter(item => {
          if (item === value) return true;
          const itemConflicts = dietaryConflicts[item as keyof typeof dietaryConflicts] || [];
          return !itemConflicts.includes(value);
        });
        
        return finalSelection;
      }
    });
  };

  // Check if a health option is disabled due to conflicts
  const isHealthOptionDisabled = (value: string) => {
    if (selectedHealth.includes(value)) return false; // Already selected options are never disabled
    
    // If 'none' is selected, disable all other health options
    if (selectedHealth.includes('none') && value !== 'none') return true;
    
    // If any health condition is selected, disable 'none'
    if (value === 'none' && selectedHealth.some(item => item !== 'none')) return true;
    
    return false;
  };

  const toggleHealthSelection = (value: string) => {
    // Don't allow selection if option is disabled
    if (isHealthOptionDisabled(value)) return;
    
    setSelectedHealth(prev => {
      if (prev.includes(value)) {
        // If removing, just remove it
        return prev.filter(item => item !== value);
      } else {
        // If adding 'none', remove all other selections
        if (value === 'none') {
          return ['none'];
        }
        
        // If adding any health condition, remove 'none' and add the new selection
        const withoutNone = prev.filter(item => item !== 'none');
        return [...withoutNone, value];
      }
    });
  };

  const toggleSelection = (setState: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setState(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save directly to localStorage first for immediate feedback
    const currentUserData = userData || JSON.parse(localStorage.getItem('nutragenie_temp_user') || '{}');
    const updatedUserData = {
      ...currentUserData,
      dietaryRestrictions: selectedDietary,
      healthGoals: [...selectedHealth, ...selectedFitness],
      allergies: allergies,
      nutritionalTargets: {
        calories: calorieRange,
        protein: proteinRange,
        carbs: carbRange,
        fat: fatRange,
        fiber: fiberRange
      }
    };
    
    // Save to both localStorage locations
    localStorage.setItem('nutragenie_user', JSON.stringify(updatedUserData));
    localStorage.setItem('nutragenie_temp_user', JSON.stringify(updatedUserData));
    setCurrentUser(updatedUserData);
    
    // Debug: Log what we're saving
    console.log("Saving dietary data:", updatedUserData);
    console.log("Selected dietary:", selectedDietary);
    console.log("Selected health:", selectedHealth);
    console.log("Selected fitness:", selectedFitness);
    console.log("Allergies:", allergies);
    
    // Show success message and navigate
    toast({ title: "Dietary preferences saved successfully!" });
    setLocation("/explore-recipes");
  };

  const isFormValid = selectedDietary.length > 0 || selectedHealth.length > 0 || selectedFitness.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6">
      <div className="max-w-md mx-auto pt-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => setLocation("/nuva-signup")}
            className="text-white hover:text-purple-300 transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-white">NutraGenie</h1>
            <p className="text-lg font-semibold text-purple-300 mt-1">Dietary Preferences</p>
          </div>
          <div className="w-8"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Dietary Restrictions */}
          <Card ref={dietaryCardRef} tabIndex={-1} className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="flex items-center gap-2 text-lg text-white whitespace-nowrap">
                    <Shield className="w-5 h-5 text-purple-400" />
                    Dietary Restrictions
                  </CardTitle>
                  <CardDescription className="text-gray-300">Select dietary choice to create personalized nutrition</CardDescription>
                </div>
                <div className="flex flex-col items-center flex-shrink-0">
                  <img 
                    src={userAvatarSrc} 
                    alt="User Avatar"
                    className="w-20 h-20 object-cover rounded-lg border-0"
                    style={{ border: 'none !important', outline: 'none', boxShadow: 'none', backgroundColor: 'transparent' }}
                  />
                  <p className="text-xs text-gray-300 mt-1 text-center font-medium">
                    {userData?.nickname || "User"}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {dietaryRestrictions.map(option => {
                  const isSelected = selectedDietary.includes(option.value);
                  const isDisabled = isDietaryOptionDisabled(option.value);
                  
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggleDietarySelection(option.value)}
                      disabled={isDisabled}
                      className={`px-3 py-2 rounded-lg border-2 font-medium transition-all text-sm text-left ${
                        isSelected
                          ? 'border-purple-500 bg-purple-500 text-white scale-105'
                          : isDisabled
                          ? 'border-gray-700 bg-gray-800 text-gray-500 opacity-50 cursor-not-allowed'
                          : 'border-gray-600 text-gray-300 hover:border-purple-400 hover:bg-purple-500/20 hover:text-purple-300'
                      }`}
                    >
                      {option.label}
                      {isDisabled && <span className="ml-1 text-xs">🚫</span>}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Health Conditions */}
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="flex items-center gap-2 text-lg text-white whitespace-nowrap">
                    <Heart className="w-5 h-5 text-purple-400" />
                    Health Factors
                  </CardTitle>
                  <CardDescription className="text-gray-300">Select health factors</CardDescription>
                </div>
                <div className="flex flex-col items-center flex-shrink-0">
                  <img 
                    src={userAvatarSrc} 
                    alt="User Avatar"
                    className="w-20 h-20 object-cover rounded-lg border-0"
                    style={{ border: 'none !important', outline: 'none', boxShadow: 'none', backgroundColor: 'transparent' }}
                  />
                  <p className="text-xs text-gray-300 mt-1 text-center font-medium">
                    {userData?.nickname || "User"}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {healthConditions.map(condition => {
                  const isSelected = selectedHealth.includes(condition.value);
                  const isDisabled = isHealthOptionDisabled(condition.value);
                  
                  return (
                    <button
                      key={condition.value}
                      type="button"
                      onClick={() => toggleHealthSelection(condition.value)}
                      disabled={isDisabled}
                      className={`px-3 py-2 rounded-lg border-2 font-medium transition-all text-sm text-left ${
                        isSelected
                          ? 'border-purple-500 bg-purple-500 text-white scale-105'
                          : isDisabled
                          ? 'border-gray-700 bg-gray-800 text-gray-500 opacity-50 cursor-not-allowed'
                          : 'border-gray-600 text-gray-300 hover:border-purple-400 hover:bg-purple-500/20 hover:text-purple-300'
                      }`}
                    >
                      {condition.label}
                      {isDisabled && <span className="ml-1 text-xs">🚫</span>}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Fitness Goals */}
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="flex items-center gap-2 text-lg text-white whitespace-nowrap">
                    <Target className="w-5 h-5 text-purple-400" />
                    Fitness Goals
                  </CardTitle>
                  <CardDescription className="text-gray-300">Your fitness and wellness goals</CardDescription>
                </div>
                <div className="flex flex-col items-center flex-shrink-0">
                  <img 
                    src={userAvatarSrc} 
                    alt="User Avatar"
                    className="w-20 h-20 object-cover rounded-lg border-0"
                    style={{ border: 'none !important', outline: 'none', boxShadow: 'none', backgroundColor: 'transparent' }}
                  />
                  <p className="text-xs text-gray-300 mt-1 text-center font-medium">
                    {userData?.nickname || "User"}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {fitnessGoals.map(goal => (
                  <button
                    key={goal.value}
                    type="button"
                    onClick={() => toggleSelection(setSelectedFitness, goal.value)}
                    className={`px-3 py-2 rounded-lg border-2 font-medium transition-all text-sm text-left ${
                      selectedFitness.includes(goal.value)
                        ? 'border-purple-500 bg-purple-500 text-white scale-105'
                        : 'border-gray-600 text-gray-300 hover:border-purple-400 hover:bg-purple-500/20 hover:text-purple-300'
                    }`}
                  >
                    {goal.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Allergies */}
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg text-white whitespace-nowrap">Allergies & Restrictions</CardTitle>
                  <CardDescription className="text-gray-300">List any food allergies or severe restrictions</CardDescription>
                </div>
                <div className="flex flex-col items-center flex-shrink-0">
                  <img 
                    src={userAvatarSrc} 
                    alt="User Avatar"
                    className="w-20 h-20 object-cover rounded-lg border-0"
                    style={{ border: 'none !important', outline: 'none', boxShadow: 'none', backgroundColor: 'transparent' }}
                  />
                  <p className="text-xs text-gray-300 mt-1 text-center font-medium">
                    {userData?.nickname || "User"}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="e.g., Severe peanut allergy, shellfish allergy..."
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-20 resize-none"
              />
            </CardContent>
          </Card>

          {/* Nutritional Adjustments */}
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg text-white whitespace-nowrap">Nutritional Goals</CardTitle>
                  <CardDescription className="text-gray-300">Set your daily nutrition targets</CardDescription>
                </div>
                <div className="flex flex-col items-center flex-shrink-0">
                  <img 
                    src={userAvatarSrc} 
                    alt="User Avatar"
                    className="w-20 h-20 object-cover rounded-lg border-0"
                    style={{ border: 'none !important', outline: 'none', boxShadow: 'none', backgroundColor: 'transparent' }}
                  />
                  <p className="text-xs text-gray-300 mt-1 text-center font-medium">
                    {userData?.nickname || "User"}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Compact 2-Row Layout with Icons Beside Dropdowns */}
              
              {/* Row 1: Calories and Protein */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <div className="text-sm">🔥</div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-1">Calories</div>
                    <Select value={selectedCalorieRange} onValueChange={setSelectedCalorieRange}>
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white text-xs h-8">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="1200-1300" className="text-white hover:bg-gray-600">1200-1300</SelectItem>
                        <SelectItem value="1301-1500" className="text-white hover:bg-gray-600">1301-1500</SelectItem>
                        <SelectItem value="1501-1800" className="text-white hover:bg-gray-600">1501-1800</SelectItem>
                        <SelectItem value="1801-2000" className="text-white hover:bg-gray-600">1801-2000</SelectItem>
                        <SelectItem value="2001-2300" className="text-white hover:bg-gray-600">2001-2300</SelectItem>
                        <SelectItem value="2301-2600" className="text-white hover:bg-gray-600">2301-2600</SelectItem>
                        <SelectItem value="2601-3000" className="text-white hover:bg-gray-600">2601-3000</SelectItem>
                        <SelectItem value="3001-3500" className="text-white hover:bg-gray-600">3001-3500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="text-sm">💪</div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-1">Protein</div>
                    <Select value={selectedProteinRange} onValueChange={setSelectedProteinRange}>
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white text-xs h-8">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="50-70" className="text-white hover:bg-gray-600">50-70g</SelectItem>
                        <SelectItem value="71-100" className="text-white hover:bg-gray-600">71-100g</SelectItem>
                        <SelectItem value="101-130" className="text-white hover:bg-gray-600">101-130g</SelectItem>
                        <SelectItem value="131-160" className="text-white hover:bg-gray-600">131-160g</SelectItem>
                        <SelectItem value="161-190" className="text-white hover:bg-gray-600">161-190g</SelectItem>
                        <SelectItem value="191-220" className="text-white hover:bg-gray-600">191-220g</SelectItem>
                        <SelectItem value="221-250" className="text-white hover:bg-gray-600">221-250g</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Row 2: Carbs, Fat, and Fiber */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex items-center space-x-2">
                  <div className="text-sm">🌾</div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-1">Carbs</div>
                    <Select value={selectedCarbRange} onValueChange={setSelectedCarbRange}>
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white text-xs h-8">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="50-100" className="text-white hover:bg-gray-600">50-100g</SelectItem>
                        <SelectItem value="101-150" className="text-white hover:bg-gray-600">101-150g</SelectItem>
                        <SelectItem value="151-200" className="text-white hover:bg-gray-600">151-200g</SelectItem>
                        <SelectItem value="201-250" className="text-white hover:bg-gray-600">201-250g</SelectItem>
                        <SelectItem value="251-300" className="text-white hover:bg-gray-600">251-300g</SelectItem>
                        <SelectItem value="301-350" className="text-white hover:bg-gray-600">301-350g</SelectItem>
                        <SelectItem value="351-400" className="text-white hover:bg-gray-600">351-400g</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="text-sm">🥑</div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-1">Fat</div>
                    <Select value={selectedFatRange} onValueChange={setSelectedFatRange}>
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white text-xs h-8">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="20-35" className="text-white hover:bg-gray-600">20-35g</SelectItem>
                        <SelectItem value="36-50" className="text-white hover:bg-gray-600">36-50g</SelectItem>
                        <SelectItem value="51-70" className="text-white hover:bg-gray-600">51-70g</SelectItem>
                        <SelectItem value="71-90" className="text-white hover:bg-gray-600">71-90g</SelectItem>
                        <SelectItem value="91-110" className="text-white hover:bg-gray-600">91-110g</SelectItem>
                        <SelectItem value="111-130" className="text-white hover:bg-gray-600">111-130g</SelectItem>
                        <SelectItem value="131-150" className="text-white hover:bg-gray-600">131-150g</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="text-sm">🌿</div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-1">Fiber</div>
                    <Select value={selectedFiberRange} onValueChange={setSelectedFiberRange}>
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white text-xs h-8">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="10-15" className="text-white hover:bg-gray-600">10-15g</SelectItem>
                        <SelectItem value="16-20" className="text-white hover:bg-gray-600">16-20g</SelectItem>
                        <SelectItem value="21-25" className="text-white hover:bg-gray-600">21-25g</SelectItem>
                        <SelectItem value="26-30" className="text-white hover:bg-gray-600">26-30g</SelectItem>
                        <SelectItem value="31-35" className="text-white hover:bg-gray-600">31-35g</SelectItem>
                        <SelectItem value="36-40" className="text-white hover:bg-gray-600">36-40g</SelectItem>
                        <SelectItem value="41-50" className="text-white hover:bg-gray-600">41-50g</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid}
            className="w-full py-4 px-6 font-semibold text-lg bg-blue-500 text-white hover:bg-blue-600 active:bg-purple-600 disabled:bg-gray-600 disabled:text-gray-400"
          >
            Explore Recipes
          </Button>

          {!isFormValid && (
            <p className="text-center text-sm text-purple-300">
              Please select at least one dietary restriction, health condition, or fitness goal
            </p>
          )}
        </form>
      </div>

      {/* Onboarding Mascot */}
      {showMascot && (
        <OnboardingMascot
          messages={getDietaryMascotMessages()}
          position="bottom-left"
          onComplete={() => setShowMascot(false)}
          mascotName="Genie"
        />
      )}
    </div>
  );
}