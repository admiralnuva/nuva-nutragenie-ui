import { useState } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";

const dietaryOptions = [
  { label: '🥬 Vegetarian', value: 'vegetarian' },
  { label: '🌱 Vegan', value: 'vegan' },
  { label: '🚫🌾 Gluten-Free', value: 'gluten-free' },
  { label: '🥛 Dairy-Free', value: 'dairy-free' },
  { label: '🥜 Nut-Free', value: 'nut-free' },
  { label: '🐟 Pescatarian', value: 'pescatarian' }
];

const healthGoals = [
  { label: '💪 Build Muscle', value: 'build-muscle' },
  { label: '⚖️ Lose Weight', value: 'lose-weight' },
  { label: '❤️ Heart Health', value: 'heart-health' },
  { label: '🧠 Brain Health', value: 'brain-health' }
];

export default function DietaryScreen() {
  const [, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useLocalStorage("nutragenie_user", null);
  const { toast } = useToast();
  
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedHealth, setSelectedHealth] = useState<string[]>([]);
  const [allergies, setAllergies] = useState("");

  const updateUserMutation = useMutation({
    mutationFn: async (updates: any) => {
      const response = await apiRequest("PATCH", `/api/users/${currentUser.id}`, updates);
      return response.json();
    },
    onSuccess: (updatedUser) => {
      setCurrentUser(updatedUser);
      toast({ title: "Profile Updated!", description: "Your dietary preferences have been saved." });
      setLocation("/recipes");
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const toggleDietary = (value: string) => {
    setSelectedDietary(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const toggleHealth = (value: string) => {
    setSelectedHealth(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserMutation.mutate({
      dietaryRestrictions: selectedDietary,
      healthGoals: selectedHealth,
      allergies
    });
  };

  return (
    <div className="h-screen bg-warm-neutral-50 p-6">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/signup")}
            className="rounded-full hover:bg-warm-neutral-200"
          >
            <ArrowLeft className="h-6 w-6 text-warm-neutral-700" />
          </Button>
          <h2 className="text-xl font-bold text-warm-neutral-800">Dietary Profile</h2>
          <div className="w-10"></div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="text-center mb-6">
            <p className="text-warm-neutral-600">Help us personalize your cooking experience</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dietary Restrictions */}
            <div>
              <Label className="block text-sm font-medium text-warm-neutral-700 mb-3">Dietary Restrictions</Label>
              <div className="grid grid-cols-2 gap-3">
                {dietaryOptions.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleDietary(option.value)}
                    className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                      selectedDietary.includes(option.value)
                        ? 'border-brand-green-500 bg-brand-green-50 text-brand-green-700'
                        : 'border-warm-neutral-300 text-warm-neutral-700 hover:border-brand-green-500 hover:bg-brand-green-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Health Goals */}
            <div>
              <Label className="block text-sm font-medium text-warm-neutral-700 mb-3">Health Goals</Label>
              <div className="grid grid-cols-2 gap-3">
                {healthGoals.map(goal => (
                  <button
                    key={goal.value}
                    type="button"
                    onClick={() => toggleHealth(goal.value)}
                    className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                      selectedHealth.includes(goal.value)
                        ? 'border-brand-green-500 bg-brand-green-50 text-brand-green-700'
                        : 'border-warm-neutral-300 text-warm-neutral-700 hover:border-brand-green-500 hover:bg-brand-green-50'
                    }`}
                  >
                    {goal.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Allergies */}
            <div>
              <Label htmlFor="allergies" className="block text-sm font-medium text-warm-neutral-700 mb-2">
                Allergies & Additional Notes
              </Label>
              <Textarea
                id="allergies"
                placeholder="List any allergies or special dietary needs..."
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-warm-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:border-transparent h-24 resize-none"
              />
            </div>

            <div className="mt-8">
              <Button
                type="submit"
                disabled={updateUserMutation.isPending}
                className="w-full bg-brand-green-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-brand-green-600 transition-all duration-200"
              >
                {updateUserMutation.isPending ? "Saving..." : "Start Cooking!"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
