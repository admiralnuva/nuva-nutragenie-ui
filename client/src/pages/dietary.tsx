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
  { icon: '🥬', label: 'Vegetarian', value: 'vegetarian' },
  { icon: '🌱', label: 'Vegan', value: 'vegan' },
  { icon: '🚫', label: 'Gluten-Free', value: 'gluten-free' },
  { icon: '🥛', label: 'Dairy-Free', value: 'dairy-free' },
  { icon: '🥜', label: 'Nut-Free', value: 'nut-free' },
  { icon: '🐟', label: 'Pescatarian', value: 'pescatarian' },
  { icon: '🥩', label: 'Keto', value: 'keto' },
  { icon: '🌾', label: 'Low-Carb', value: 'low-carb' }
];

const healthConditions = [
  { icon: '💉', label: 'Diabetes', value: 'diabetes' },
  { icon: '❤️', label: 'Heart Issues', value: 'cardiovascular' },
  { icon: '🫘', label: 'Kidney Issues', value: 'kidney' },
  { icon: '🩸', label: 'Hypertension', value: 'blood-pressure' },
  { icon: '🎗️', label: 'Cancer', value: 'cancer' },
  { icon: '✅', label: 'None', value: 'none' }
];

const fitnessGoals = [
  { icon: '💪', label: 'Build Muscle', value: 'build-muscle' },
  { icon: '⚖️', label: 'Lose Weight', value: 'lose-weight' },
  { icon: '🏃', label: 'Build Endurance', value: 'endurance' },
  { icon: '🧘', label: 'Holistic Health', value: 'wellness' }
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
  const [selectedCalorieRange, setSelectedCalorieRange] = useState<string>("1301-1500");
  const [selectedProteinRange, setSelectedProteinRange] = useState<string>("71-100");
  const [selectedCarbRange, setSelectedCarbRange] = useState<string>("101-150");
  const [selectedFatRange, setSelectedFatRange] = useState<string>("36-50");
  const [selectedFiberRange, setSelectedFiberRange] = useState<string>("16-20");

  // Initialize form with saved data when component loads
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      
      // Load dietary restrictions
      if (userData.dietaryRestrictions) {
        setSelectedDietary(userData.dietaryRestrictions);
      }
      
      // Load health goals - filter health conditions and fitness goals
      if (userData.healthGoals) {
        const healthConditions = userData.healthGoals.filter((goal: string) => 
          ['diabetes', 'cardiovascular', 'kidney', 'blood-pressure', 'cancer', 'none'].includes(goal)
        );
        const fitnessGoals = userData.healthGoals.filter((goal: string) => 
          ['build-muscle', 'lose-weight', 'endurance', 'wellness'].includes(goal)
        );
        
        setSelectedHealth(healthConditions);
        setSelectedFitness(fitnessGoals);
      }
      
      // Load allergies and other text fields
      if (userData.allergies) {
        setAllergies(userData.allergies);
      }
      
      // Load nutritional goals
      if (userData.selectedCalorieRange) {
        setSelectedCalorieRange(userData.selectedCalorieRange);
      }
      if (userData.selectedProteinRange) {
        setSelectedProteinRange(userData.selectedProteinRange);
      }
      if (userData.selectedCarbRange) {
        setSelectedCarbRange(userData.selectedCarbRange);
      }
      if (userData.selectedFatRange) {
        setSelectedFatRange(userData.selectedFatRange);
      }
      if (userData.selectedFiberRange) {
        setSelectedFiberRange(userData.selectedFiberRange);
      }
    }
  }, [userData]);

  // Auto-calculate macros based on calorie selection
  const updateMacrosBasedOnCalories = (calorieRange: string) => {
    const calorieMapping = {
      "1200-1300": { protein: "50-70", carbs: "50-100", fat: "20-35", fiber: "10-15" },
      "1301-1500": { protein: "71-100", carbs: "101-150", fat: "36-50", fiber: "16-20" },
      "1501-1800": { protein: "101-130", carbs: "151-200", fat: "51-70", fiber: "21-25" },
      "1801-2000": { protein: "131-160", carbs: "201-250", fat: "71-90", fiber: "26-30" },
      "2001-2300": { protein: "161-190", carbs: "251-300", fat: "91-110", fiber: "31-35" },
      "2301-2600": { protein: "191-220", carbs: "301-350", fat: "111-130", fiber: "36-40" },
      "2601-3000": { protein: "221-250", carbs: "351-400", fat: "131-150", fiber: "41-50" },
      "3001-3500": { protein: "221-250", carbs: "351-400", fat: "131-150", fiber: "41-50" }
    };
    
    const mapping = calorieMapping[calorieRange as keyof typeof calorieMapping];
    if (mapping) {
      setSelectedProteinRange(mapping.protein);
      setSelectedCarbRange(mapping.carbs);
      setSelectedFatRange(mapping.fat);
      setSelectedFiberRange(mapping.fiber);
    }
  };
  
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

        // Don't throw - we already saved to localStorage
        return updatedUserData;
      }
    },
    onSuccess: (newUser) => {
      toast({ title: "Dietary preferences saved successfully!" });
      setLocation("/recipes");
    },
    onError: (error: any) => {

      // Even if there's an error, localStorage data is saved, so navigate anyway
      toast({ title: "Preferences saved locally. Continuing to recipes..." });
      setLocation("/recipes");
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
      selectedCalorieRange,
      selectedProteinRange,
      selectedCarbRange,
      selectedFatRange,
      selectedFiberRange
    };
    
    // Save to both localStorage locations
    localStorage.setItem('nutragenie_user', JSON.stringify(updatedUserData));
    localStorage.setItem('nutragenie_temp_user', JSON.stringify(updatedUserData));
    setCurrentUser(updatedUserData);
    

    
    // Clear completion status and set flag for first-time user experience
    localStorage.removeItem('nutragenie_diet_pantry_completed');
    localStorage.setItem('nutragenie_from_dietary', 'true');
    
    // Show success message and navigate to personalize diet & pantry page
    toast({ title: "Dietary preferences saved successfully!" });
    setLocation("/personalize-diet-pantry");
  };

  const isFormValid = selectedDietary.length > 0 || selectedHealth.length > 0 || selectedFitness.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="max-w-lg mx-auto pt-2">
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
            <p className="text-lg font-semibold text-yellow-400 mt-1">Dietary Preferences</p>
          </div>
          <div className="w-8"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Dietary Restrictions */}
          <Card ref={dietaryCardRef} tabIndex={-1} className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 border-l-4 border-l-purple-500 hover:border-l-purple-400 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="flex items-center gap-2 text-lg text-yellow-400 whitespace-nowrap">
                    <Shield className="w-5 h-5 text-purple-400" />
                    Dietary Restrictions
                  </CardTitle>
                  <CardDescription className="text-white">Select dietary choice to create personalized nutrition</CardDescription>
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
                      className={`px-3 py-2 rounded-lg border-2 font-medium transition-all text-sm text-center flex flex-col items-center justify-center h-16 ${
                        isSelected
                          ? 'border-purple-500 bg-purple-500 text-white scale-105'
                          : isDisabled
                          ? 'border-gray-700 bg-gray-800 text-gray-500 opacity-50 cursor-not-allowed'
                          : 'border-gray-600 text-gray-300 hover:border-purple-400 hover:bg-purple-500/20 hover:text-purple-300'
                      }`}
                    >
                      <div className="text-lg leading-none">{option.icon}</div>
                      <div className="text-xs mt-1 leading-tight">{option.label}</div>
                      {isDisabled && <span className="absolute top-1 right-1 text-xs">🚫</span>}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Health Conditions */}
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 border-l-4 border-l-purple-500 hover:border-l-purple-400 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg text-yellow-400 whitespace-nowrap">
                <Heart className="w-5 h-5 text-purple-400" />
                Health Factors
              </CardTitle>
              <CardDescription className="text-white">Select health factors</CardDescription>
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
                      className={`px-3 py-2 rounded-lg border-2 font-medium transition-all text-sm text-center flex flex-col items-center justify-center h-16 relative ${
                        isSelected
                          ? 'border-purple-500 bg-purple-500 text-white scale-105'
                          : isDisabled
                          ? 'border-gray-700 bg-gray-800 text-gray-500 opacity-50 cursor-not-allowed'
                          : 'border-gray-600 text-gray-300 hover:border-purple-400 hover:bg-purple-500/20 hover:text-purple-300'
                      }`}
                    >
                      <div className="text-lg leading-none">{condition.icon}</div>
                      <div className="text-xs mt-1 leading-tight">{condition.label}</div>
                      {isDisabled && <span className="absolute top-1 right-1 text-xs">🚫</span>}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Fitness Goals */}
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 border-l-4 border-l-purple-500 hover:border-l-purple-400 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg text-yellow-400 whitespace-nowrap">
                <Target className="w-5 h-5 text-purple-400" />
                Fitness Goals
              </CardTitle>
              <CardDescription className="text-white">Your fitness and wellness goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {fitnessGoals.map(goal => (
                  <button
                    key={goal.value}
                    type="button"
                    onClick={() => toggleSelection(setSelectedFitness, goal.value)}
                    className={`px-3 py-2 rounded-lg border-2 font-medium transition-all text-sm text-center flex flex-col items-center justify-center h-16 ${
                      selectedFitness.includes(goal.value)
                        ? 'border-purple-500 bg-purple-500 text-white scale-105'
                        : 'border-gray-600 text-gray-300 hover:border-purple-400 hover:bg-purple-500/20 hover:text-purple-300'
                    }`}
                  >
                    <div className="text-lg leading-none">{goal.icon}</div>
                    <div className="text-xs mt-1 leading-tight">{goal.label}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Allergies */}
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 border-l-4 border-l-purple-500 hover:border-l-purple-400 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-yellow-400 whitespace-nowrap">Allergies & Restrictions</CardTitle>
              <CardDescription className="text-white">List any food allergies or severe restrictions</CardDescription>
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
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 border-l-4 border-l-purple-500 hover:border-l-purple-400 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-yellow-400 whitespace-nowrap">Nutritional Goals</CardTitle>
              <CardDescription className="text-white">Set your daily nutrition targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Primary Nutrients Section */}
              <div className="space-y-3">
                <div className="text-xs text-gray-400 uppercase tracking-wide">Primary Nutrients</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-2">
                    <div className="text-sm mt-5" title="Daily calorie target based on your fitness goals">🔥</div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-yellow-300 mb-1 drop-shadow-lg">Calories</div>
                      <Select value={selectedCalorieRange} onValueChange={(value) => {
                      setSelectedCalorieRange(value);
                      updateMacrosBasedOnCalories(value);
                    }}>
                        <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white text-xs h-8">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="1200-1300" className="text-white hover:bg-gray-600">1200-1300 (Weight Loss)</SelectItem>
                          <SelectItem value="1301-1500" className="text-white hover:bg-gray-600">1301-1500 (Light Activity)</SelectItem>
                          <SelectItem value="1501-1800" className="text-white hover:bg-gray-600">1501-1800 (Moderate Activity)</SelectItem>
                          <SelectItem value="1801-2000" className="text-white hover:bg-gray-600">1801-2000 (Active Lifestyle)</SelectItem>
                          <SelectItem value="2001-2300" className="text-white hover:bg-gray-600">2001-2300 (Very Active)</SelectItem>
                          <SelectItem value="2301-2600" className="text-white hover:bg-gray-600">2301-2600 (Athletic)</SelectItem>
                          <SelectItem value="2601-3000" className="text-white hover:bg-gray-600">2601-3000 (High Performance)</SelectItem>
                          <SelectItem value="3001-3500" className="text-white hover:bg-gray-600">3001-3500 (Elite Athlete)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="text-sm mt-5" title="Essential for muscle building and repair">💪</div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-yellow-300 mb-1 drop-shadow-lg">Protein (Auto-calculated, click to adjust)</div>
                      <Select value={selectedProteinRange} onValueChange={setSelectedProteinRange}>
                        <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white text-xs h-8">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="50-70" className="text-white hover:bg-gray-600">50-70g (Sedentary)</SelectItem>
                          <SelectItem value="71-100" className="text-white hover:bg-gray-600">71-100g (Light Exercise)</SelectItem>
                          <SelectItem value="101-130" className="text-white hover:bg-gray-600">101-130g (Regular Exercise)</SelectItem>
                          <SelectItem value="131-160" className="text-white hover:bg-gray-600">131-160g (Active Training)</SelectItem>
                          <SelectItem value="161-190" className="text-white hover:bg-gray-600">161-190g (Muscle Building)</SelectItem>
                          <SelectItem value="191-220" className="text-white hover:bg-gray-600">191-220g (Intense Training)</SelectItem>
                          <SelectItem value="221-250" className="text-white hover:bg-gray-600">221-250g (Bodybuilding)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-600"></div>

              {/* Secondary Nutrients Section */}
              <div className="space-y-3">
                <div className="text-xs text-gray-400 uppercase tracking-wide">Secondary Nutrients</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex items-start space-x-2">
                    <div className="text-sm mt-5" title="Energy source for workouts and brain function">🌾</div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-yellow-300 mb-1 drop-shadow-lg">Carbs (Auto-calculated, click to adjust)</div>
                      <Select value={selectedCarbRange} onValueChange={setSelectedCarbRange}>
                        <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white text-xs h-8">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="50-100" className="text-white hover:bg-gray-600">50-100g (Keto/Low Carb)</SelectItem>
                          <SelectItem value="101-150" className="text-white hover:bg-gray-600">101-150g (Moderate Low)</SelectItem>
                          <SelectItem value="151-200" className="text-white hover:bg-gray-600">151-200g (Balanced)</SelectItem>
                          <SelectItem value="201-250" className="text-white hover:bg-gray-600">201-250g (Active)</SelectItem>
                          <SelectItem value="251-300" className="text-white hover:bg-gray-600">251-300g (High Energy)</SelectItem>
                          <SelectItem value="301-350" className="text-white hover:bg-gray-600">301-350g (Endurance)</SelectItem>
                          <SelectItem value="351-400" className="text-white hover:bg-gray-600">351-400g (Ultra Endurance)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="text-sm mt-5" title="Essential for hormone production and nutrient absorption">🥑</div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-yellow-300 mb-1 drop-shadow-lg">Fat (Auto-calculated, click to adjust)</div>
                      <Select value={selectedFatRange} onValueChange={setSelectedFatRange}>
                        <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white text-xs h-8">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="20-35" className="text-white hover:bg-gray-600">20-35g (Low Fat)</SelectItem>
                          <SelectItem value="36-50" className="text-white hover:bg-gray-600">36-50g (Moderate)</SelectItem>
                          <SelectItem value="51-70" className="text-white hover:bg-gray-600">51-70g (Balanced)</SelectItem>
                          <SelectItem value="71-90" className="text-white hover:bg-gray-600">71-90g (Higher Fat)</SelectItem>
                          <SelectItem value="91-110" className="text-white hover:bg-gray-600">91-110g (High Fat)</SelectItem>
                          <SelectItem value="111-130" className="text-white hover:bg-gray-600">111-130g (Keto)</SelectItem>
                          <SelectItem value="131-150" className="text-white hover:bg-gray-600">131-150g (High Keto)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="text-sm mt-5" title="Important for digestive health and satiety">🌿</div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-yellow-300 mb-1 drop-shadow-lg">Fiber (Auto-calculated, click to adjust)</div>
                      <Select value={selectedFiberRange} onValueChange={setSelectedFiberRange}>
                        <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white text-xs h-8">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="10-15" className="text-white hover:bg-gray-600">10-15g (Low)</SelectItem>
                          <SelectItem value="16-20" className="text-white hover:bg-gray-600">16-20g (Below Average)</SelectItem>
                          <SelectItem value="21-25" className="text-white hover:bg-gray-600">21-25g (Recommended)</SelectItem>
                          <SelectItem value="26-30" className="text-white hover:bg-gray-600">26-30g (Good)</SelectItem>
                          <SelectItem value="31-35" className="text-white hover:bg-gray-600">31-35g (High)</SelectItem>
                          <SelectItem value="36-40" className="text-white hover:bg-gray-600">36-40g (Very High)</SelectItem>
                          <SelectItem value="41-50" className="text-white hover:bg-gray-600">41-50g (Maximum)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>


            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid}
            className="w-full py-6 px-8 font-semibold text-xl bg-blue-500 text-white hover:bg-blue-600 active:bg-purple-600 disabled:bg-gray-600 disabled:text-gray-400 select-text"
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