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
  { label: '🩺 Diabetes', value: 'diabetes' },
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
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 text-lg text-white">
                    <Shield className="w-5 h-5 text-purple-400" />
                    Dietary Restrictions
                  </CardTitle>
                  <CardDescription className="text-gray-300">Select dietary choice to create personalized nutrition</CardDescription>
                </div>
                <div className="flex flex-col items-center ml-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-white">
                    <img 
                      src={userAvatarSrc} 
                      alt="User Avatar"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-xs text-gray-300 mt-1 text-center font-medium">
                    {userData?.nickname || "User"}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {dietaryRestrictions.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleSelection(setSelectedDietary, option.value)}
                    className={`px-3 py-2 rounded-lg border-2 font-medium transition-all text-sm text-left ${
                      selectedDietary.includes(option.value)
                        ? 'border-purple-500 bg-purple-500 text-white scale-105'
                        : 'border-gray-600 text-gray-300 hover:border-purple-400 hover:bg-purple-500/20 hover:text-purple-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Health Conditions */}
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 text-lg text-white">
                    <Heart className="w-5 h-5 text-purple-400" />
                    Health Factors
                  </CardTitle>
                  <CardDescription className="text-gray-300">Select health factors</CardDescription>
                </div>
                <div className="flex flex-col items-center ml-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-white">
                    <img 
                      src={userAvatarSrc} 
                      alt="User Avatar"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-xs text-gray-300 mt-1 text-center font-medium">
                    {userData?.nickname || "User"}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {healthConditions.map(condition => (
                  <button
                    key={condition.value}
                    type="button"
                    onClick={() => toggleSelection(setSelectedHealth, condition.value)}
                    className={`px-3 py-2 rounded-lg border-2 font-medium transition-all text-sm text-left ${
                      selectedHealth.includes(condition.value)
                        ? 'border-purple-500 bg-purple-500 text-white scale-105'
                        : 'border-gray-600 text-gray-300 hover:border-purple-400 hover:bg-purple-500/20 hover:text-purple-300'
                    }`}
                  >
                    {condition.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fitness Goals */}
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 text-lg text-white">
                    <Target className="w-5 h-5 text-purple-400" />
                    Fitness Goals
                  </CardTitle>
                  <CardDescription className="text-gray-300">Your fitness and wellness goals</CardDescription>
                </div>
                <div className="flex flex-col items-center ml-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-white">
                    <img 
                      src={userAvatarSrc} 
                      alt="User Avatar"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
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
                <div className="flex-1">
                  <CardTitle className="text-lg text-white">Allergies & Restrictions</CardTitle>
                  <CardDescription className="text-gray-300">List any food allergies or severe restrictions</CardDescription>
                </div>
                <div className="flex flex-col items-center ml-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-white">
                    <img 
                      src={userAvatarSrc} 
                      alt="User Avatar"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
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
                <div className="flex-1">
                  <CardTitle className="text-lg text-white">Nutritional Goals</CardTitle>
                  <CardDescription className="text-gray-300">Set your daily nutrition targets</CardDescription>
                </div>
                <div className="flex flex-col items-center ml-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white">
                    <img 
                      src={userAvatarSrc} 
                      alt="User Avatar"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-xs text-gray-300 mt-1 text-center font-medium">
                    {userData?.nickname || "User"}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
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