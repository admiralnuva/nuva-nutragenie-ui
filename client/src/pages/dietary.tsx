import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  
  // Get user's selected avatar
  const userAvatarSrc = currentUser?.avatar ? userAvatars[currentUser.avatar as keyof typeof userAvatars] : userAvatar1;
  
  // Ref for the dietary restrictions card to focus on it
  const dietaryCardRef = useRef<HTMLDivElement>(null);
  
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedHealth, setSelectedHealth] = useState<string[]>([]);
  const [selectedFitness, setSelectedFitness] = useState<string[]>([]);
  const [allergies, setAllergies] = useState("");
  
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
      // If no user exists in localStorage, create a default one first
      if (!currentUser?.id) {
        const defaultUser = {
          nickname: 'User',
          ageGroup: '25-30',
          phoneNumber: '1234567890',
          avatar: 'user1',
          selectedChef: {
            name: 'Chef Marcus',
            personality: 'Precise & Classic',
            avatar: 'chef1'
          },
          dietaryRestrictions: [],
          healthGoals: [],
          allergies: ''
        };
        
        // Create the user first
        const createResponse = await apiRequest("POST", "/api/users", defaultUser);
        const newUser = await createResponse.json();
        setCurrentUser(newUser);
        
        // Then update with dietary preferences
        const updateResponse = await apiRequest("PATCH", `/api/users/${newUser.id}`, updates);
        return updateResponse.json();
      }
      
      // Update existing user
      const response = await apiRequest("PATCH", `/api/users/${currentUser.id}`, updates);
      return response.json();
    },
    onSuccess: (updatedUser) => {
      setCurrentUser(updatedUser);
      toast({ title: "Profile Updated!", description: "Your dietary preferences have been saved." });
      setLocation("/recipes");
    },
    onError: (error: any) => {
      console.error('Update user error:', error);
      toast({ title: "Error", description: "Failed to update dietary preferences. Please try again.", variant: "destructive" });
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
    updateUserMutation.mutate({
      dietaryRestrictions: selectedDietary,
      healthGoals: [...selectedHealth, ...selectedFitness],
      allergies
    });
  };

  const isFormValid = selectedDietary.length > 0 || selectedHealth.length > 0 || selectedFitness.length > 0;

  return (
    <div className="min-h-screen bg-warm-neutral-50 p-6">
      <div className="max-w-md mx-auto pt-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <BackButton to="/signup" />
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-gray-800">NutraGenie</h1>
          </div>
          <div className="w-8"></div>
        </div>
        <div className="text-lg font-semibold text-brand-indigo-600 text-center mb-6">
          Dietary Preferences
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Dietary Restrictions */}
          <Card ref={dietaryCardRef} tabIndex={-1}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="w-5 h-5" />
                    Dietary Restrictions
                  </CardTitle>
                  <CardDescription>Select dietary choice to create personalized nutrition</CardDescription>
                </div>
                <div className="flex flex-col items-center ml-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-white">
                    <img 
                      src={userAvatarSrc} 
                      alt="User Avatar"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1 text-center font-medium">
                    {currentUser?.nickname || "User"}
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
                        ? 'border-indigo-500 bg-indigo-500 text-white scale-105'
                        : 'border-gray-300 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Health Conditions */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Heart className="w-5 h-5" />
                    Health Factors
                  </CardTitle>
                  <CardDescription>Select health factors</CardDescription>
                </div>
                <div className="flex flex-col items-center ml-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-white">
                    <img 
                      src={userAvatarSrc} 
                      alt="User Avatar"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1 text-center font-medium">
                    {currentUser?.nickname || "User"}
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
                        ? 'border-indigo-500 bg-indigo-500 text-white scale-105'
                        : 'border-gray-300 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700'
                    }`}
                  >
                    {condition.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fitness Goals */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="w-5 h-5" />
                    Fitness Goals
                  </CardTitle>
                  <CardDescription>Your fitness and wellness goals</CardDescription>
                </div>
                <div className="flex flex-col items-center ml-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-white">
                    <img 
                      src={userAvatarSrc} 
                      alt="User Avatar"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1 text-center font-medium">
                    {currentUser?.nickname || "User"}
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
                        ? 'border-indigo-500 bg-indigo-500 text-white scale-105'
                        : 'border-gray-300 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700'
                    }`}
                  >
                    {goal.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Allergies */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">Allergies & Restrictions</CardTitle>
                  <CardDescription>List any food allergies or severe restrictions</CardDescription>
                </div>
                <div className="flex flex-col items-center ml-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-white">
                    <img 
                      src={userAvatarSrc} 
                      alt="User Avatar"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1 text-center font-medium">
                    {currentUser?.nickname || "User"}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="e.g., Severe peanut allergy, shellfish allergy..."
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-warm-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-indigo-500 focus:border-transparent h-20 resize-none"
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid || updateUserMutation.isPending}
            className="w-full py-4 px-6 font-semibold text-lg"
          >
            {updateUserMutation.isPending ? "Saving Profile..." : "Explore Recipes"}
          </Button>

          {!isFormValid && (
            <p className="text-center text-sm text-warm-neutral-500">
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