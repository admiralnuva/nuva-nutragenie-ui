import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
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
            <CardContent className="space-y-4">
              {/* OPTION 1: Simple Input Grid - Most Minimalistic */}
              <div className="hidden" id="option1">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <label className="text-xs text-gray-400 block mb-1">Calories</label>
                    <input 
                      type="number"
                      placeholder="2000"
                      className="w-full px-2 py-2 text-sm bg-gray-700 border border-gray-600 rounded text-white text-center"
                    />
                  </div>
                  <div className="text-center">
                    <label className="text-xs text-gray-400 block mb-1">Protein (g)</label>
                    <input 
                      type="number"
                      placeholder="150"
                      className="w-full px-2 py-2 text-sm bg-gray-700 border border-gray-600 rounded text-white text-center"
                    />
                  </div>
                  <div className="text-center">
                    <label className="text-xs text-gray-400 block mb-1">Carbs (g)</label>
                    <input 
                      type="number"
                      placeholder="200"
                      className="w-full px-2 py-2 text-sm bg-gray-700 border border-gray-600 rounded text-white text-center"
                    />
                  </div>
                  <div className="text-center">
                    <label className="text-xs text-gray-400 block mb-1">Fat (g)</label>
                    <input 
                      type="number"
                      placeholder="65"
                      className="w-full px-2 py-2 text-sm bg-gray-700 border border-gray-600 rounded text-white text-center"
                    />
                  </div>
                </div>
              </div>

              {/* OPTION 2: Preset Buttons - Ultra Clean */}
              <div className="hidden" id="option2">
                <div className="text-center mb-3">
                  <p className="text-xs text-gray-400">Choose your nutrition level</p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <button className="px-4 py-2 bg-gray-700 hover:bg-purple-600 rounded-lg text-sm text-white transition-colors">
                    Light (1500 cal • 100g protein • 150g carbs • 50g fat)
                  </button>
                  <button className="px-4 py-2 bg-gray-700 hover:bg-purple-600 rounded-lg text-sm text-white transition-colors">
                    Moderate (2000 cal • 150g protein • 200g carbs • 65g fat)
                  </button>
                  <button className="px-4 py-2 bg-gray-700 hover:bg-purple-600 rounded-lg text-sm text-white transition-colors">
                    Active (2500 cal • 180g protein • 250g carbs • 80g fat)
                  </button>
                </div>
              </div>

              {/* OPTION 3: Icon + Values - Visual Clean */}
              <div className="hidden" id="option3">
                <div className="flex justify-between items-center">
                  <div className="text-center flex-1">
                    <div className="text-2xl mb-1">🔥</div>
                    <div className="text-xs text-gray-400">Calories</div>
                    <div className="text-sm text-white font-medium">2000</div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="text-2xl mb-1">💪</div>
                    <div className="text-xs text-gray-400">Protein</div>
                    <div className="text-sm text-white font-medium">150g</div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="text-2xl mb-1">🌾</div>
                    <div className="text-xs text-gray-400">Carbs</div>
                    <div className="text-sm text-white font-medium">200g</div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="text-2xl mb-1">🥑</div>
                    <div className="text-xs text-gray-400">Fat</div>
                    <div className="text-sm text-white font-medium">65g</div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <button className="text-xs text-purple-400 hover:text-purple-300">Customize</button>
                </div>
              </div>

              {/* OPTION 4: Current Design (for comparison) */}
              <div id="option4">
                {/* First row: Calories and Protein */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-medium text-gray-300">Calories</label>
                      <span className="text-xs text-gray-400">{calorieRange[0]}-{calorieRange[1]}</span>
                    </div>
                    <Slider
                      value={calorieRange}
                      onValueChange={setCalorieRange}
                      max={1000}
                      min={100}
                      step={50}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-medium text-gray-300">Protein</label>
                      <span className="text-xs text-gray-400">{proteinRange[0]}-{proteinRange[1]}g</span>
                    </div>
                    <Slider
                      value={proteinRange}
                      onValueChange={setProteinRange}
                      max={60}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Second row: Carbs and Fat */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-medium text-gray-300">Carbs</label>
                      <span className="text-xs text-gray-400">{carbRange[0]}-{carbRange[1]}g</span>
                    </div>
                    <Slider
                      value={carbRange}
                      onValueChange={setCarbRange}
                      max={100}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-medium text-gray-300">Fat</label>
                      <span className="text-xs text-gray-400">{fatRange[0]}-{fatRange[1]}g</span>
                    </div>
                    <Slider
                      value={fatRange}
                      onValueChange={setFatRange}
                      max={50}
                      min={5}
                      step={2}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Third row: Fiber (centered) */}
                <div className="flex justify-center">
                  <div className="w-1/2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-medium text-gray-300">Fiber</label>
                      <span className="text-xs text-gray-400">{fiberRange[0]}-{fiberRange[1]}g</span>
                    </div>
                    <Slider
                      value={fiberRange}
                      onValueChange={setFiberRange}
                      max={25}
                      min={5}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Demo Toggle Buttons */}
              <div className="mt-4 pt-3 border-t border-gray-600">
                <p className="text-xs text-gray-500 mb-2 text-center">Design Options (for demo):</p>
                <div className="flex gap-2 justify-center">
                  <button 
                    onClick={() => {
                      document.getElementById('option1')?.classList.remove('hidden');
                      document.getElementById('option2')?.classList.add('hidden');
                      document.getElementById('option3')?.classList.add('hidden');
                      document.getElementById('option4')?.classList.add('hidden');
                    }}
                    className="px-2 py-1 text-xs bg-gray-600 hover:bg-purple-600 rounded text-white"
                  >
                    Input
                  </button>
                  <button 
                    onClick={() => {
                      document.getElementById('option1')?.classList.add('hidden');
                      document.getElementById('option2')?.classList.remove('hidden');
                      document.getElementById('option3')?.classList.add('hidden');
                      document.getElementById('option4')?.classList.add('hidden');
                    }}
                    className="px-2 py-1 text-xs bg-gray-600 hover:bg-purple-600 rounded text-white"
                  >
                    Preset
                  </button>
                  <button 
                    onClick={() => {
                      document.getElementById('option1')?.classList.add('hidden');
                      document.getElementById('option2')?.classList.add('hidden');
                      document.getElementById('option3')?.classList.remove('hidden');
                      document.getElementById('option4')?.classList.add('hidden');
                    }}
                    className="px-2 py-1 text-xs bg-gray-600 hover:bg-purple-600 rounded text-white"
                  >
                    Icons
                  </button>
                  <button 
                    onClick={() => {
                      document.getElementById('option1')?.classList.add('hidden');
                      document.getElementById('option2')?.classList.add('hidden');
                      document.getElementById('option3')?.classList.add('hidden');
                      document.getElementById('option4')?.classList.remove('hidden');
                    }}
                    className="px-2 py-1 text-xs bg-gray-600 hover:bg-purple-600 rounded text-white"
                  >
                    Current
                  </button>
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