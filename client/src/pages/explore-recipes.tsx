import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ScreenHeader } from "@/components/ui/screen-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";

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

export default function ExploreRecipesScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage<any>("nutragenie_user", null);
  const [tempUser] = useLocalStorage<any>("nutragenie_temp_user", null);
  
  // Get user data - check both current and temp user
  const userData = currentUser || tempUser;

  // Get user avatar
  const userAvatarSrc = userData?.avatar ? userAvatars[userData.avatar as keyof typeof userAvatars] : userAvatar1;

  // Meal preferences state
  const [mealPreferences, setMealPreferences] = useState({
    cuisine: "",
    mealType: "",
    spiceLevel: "",
    skillLevel: "",
    cookingMethod: "",
    kidFriendly: ""
  });

  // Format dietary preferences data into text rows (max 6 rows)
  const formatDietaryData = () => {
    const rows = [];
    
    // Helper function to capitalize first letter of each word
    const capitalizeWords = (str: string) => {
      return str.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    };

    // Row 1: Dietary Restrictions (comma-separated)
    if (userData?.dietaryRestrictions && userData.dietaryRestrictions.length > 0) {
      const formattedRestrictions = userData.dietaryRestrictions.map(restriction => 
        capitalizeWords(restriction)
      );
      rows.push({ value: formattedRestrictions.join(", ") });
    }
    
    // Row 2: Health Conditions (comma-separated)
    if (userData?.healthGoals && userData.healthGoals.length > 0) {
      const healthConditions = userData.healthGoals.filter((goal: string) => 
        ['diabetes', 'cardiovascular', 'kidney', 'blood-pressure', 'cancer', 'bone-health'].includes(goal)
      );
      if (healthConditions.length > 0) {
        const formattedConditions = healthConditions.map(condition => 
          capitalizeWords(condition)
        );
        rows.push({ value: formattedConditions.join(", ") });
      }
      
      // Row 3: Fitness Goals (comma-separated)
      const fitnessGoals = userData.healthGoals.filter((goal: string) => 
        ['build-muscle', 'lose-weight', 'endurance', 'wellness'].includes(goal)
      );
      if (fitnessGoals.length > 0) {
        const formattedGoals = fitnessGoals.map(goal => 
          capitalizeWords(goal)
        );
        rows.push({ value: formattedGoals.join(", ") });
      }
    }
    
    // Row 4: Allergies with label
    if (userData?.allergies && userData.allergies.trim()) {
      rows.push({ label: "Allergies", value: userData.allergies });
    }
    
    return rows.slice(0, 6); // Ensure max 6 rows
  };

  const dietaryRows = formatDietaryData();
  
  // Check if user has any dietary data
  const hasDietaryData = userData?.dietaryRestrictions || userData?.healthGoals || userData?.allergies;

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-md mx-auto pt-2">
        <ScreenHeader 
          title="NutraGenie"
          subtitle="Explore Recipe Options"
          backTo="/dietary"
        />

        <div className="space-y-4">
          {/* Card 1: Dietary Preferences Summary */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-purple-600">Your dietary preferences:</CardTitle>
                <div className="flex flex-col items-center">
                  <div className="rounded-lg overflow-hidden bg-white shadow-sm" style={{width: '80px', height: '80px'}}>
                    <img 
                      src={userAvatarSrc} 
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5 font-medium">
                    {userData?.nickname || "User"}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-1">
              {!userData ? (
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm mb-3">Please create your account first to view dietary preferences</p>
                  <button 
                    onClick={() => setLocation("/nuva-signup")}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700"
                  >
                    Create Account
                  </button>
                </div>
              ) : dietaryRows.length > 0 ? (
                <div className="space-y-0">
                  {dietaryRows.map((row, index) => (
                    <div key={index} className="flex items-center text-sm py-1">
                      {row.label ? (
                        <>
                          <span className="font-medium text-gray-700">{row.label}:</span>
                          <span className="text-gray-600 ml-2">{row.value}</span>
                        </>
                      ) : (
                        <span className="text-gray-600">{row.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-3">
                  <p className="text-gray-500 text-sm mb-3">Welcome {userData?.nickname}! Complete your dietary profile to see personalized recipes.</p>
                  <button 
                    onClick={() => setLocation("/dietary")}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700"
                  >
                    Complete Dietary Setup
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Card 2: Meal Preferences */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-purple-600">Meal Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Cuisine */}
                <div className="space-y-2">
                  <Label htmlFor="cuisine" className="text-sm font-medium text-gray-700">Cuisine</Label>
                  <Select value={mealPreferences.cuisine} onValueChange={(value) => setMealPreferences(prev => ({...prev, cuisine: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cuisine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="italian">Italian</SelectItem>
                      <SelectItem value="mexican">Mexican</SelectItem>
                      <SelectItem value="asian">Asian</SelectItem>
                      <SelectItem value="american">American</SelectItem>
                      <SelectItem value="mediterranean">Mediterranean</SelectItem>
                      <SelectItem value="indian">Indian</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="thai">Thai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Meal Type */}
                <div className="space-y-2">
                  <Label htmlFor="mealType" className="text-sm font-medium text-gray-700">Meal Type</Label>
                  <Select value={mealPreferences.mealType} onValueChange={(value) => setMealPreferences(prev => ({...prev, mealType: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                      <SelectItem value="snack">Snack</SelectItem>
                      <SelectItem value="dessert">Dessert</SelectItem>
                      <SelectItem value="appetizer">Appetizer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Spice Level */}
                <div className="space-y-2">
                  <Label htmlFor="spiceLevel" className="text-sm font-medium text-gray-700">Spice Level</Label>
                  <Select value={mealPreferences.spiceLevel} onValueChange={(value) => setMealPreferences(prev => ({...prev, spiceLevel: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select spice level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mild">Mild</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hot">Hot</SelectItem>
                      <SelectItem value="extra-hot">Extra Hot</SelectItem>
                      <SelectItem value="no-spice">No Spice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Skill Level */}
                <div className="space-y-2">
                  <Label htmlFor="skillLevel" className="text-sm font-medium text-gray-700">Skill Level</Label>
                  <Select value={mealPreferences.skillLevel} onValueChange={(value) => setMealPreferences(prev => ({...prev, skillLevel: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select skill level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Cooking Method */}
                <div className="space-y-2">
                  <Label htmlFor="cookingMethod" className="text-sm font-medium text-gray-700">Cooking Method</Label>
                  <Select value={mealPreferences.cookingMethod} onValueChange={(value) => setMealPreferences(prev => ({...prev, cookingMethod: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cooking method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baking">Baking</SelectItem>
                      <SelectItem value="grilling">Grilling</SelectItem>
                      <SelectItem value="frying">Frying</SelectItem>
                      <SelectItem value="steaming">Steaming</SelectItem>
                      <SelectItem value="roasting">Roasting</SelectItem>
                      <SelectItem value="slow-cooking">Slow Cooking</SelectItem>
                      <SelectItem value="stir-frying">Stir Frying</SelectItem>
                      <SelectItem value="no-cook">No Cook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Kid Friendly */}
                <div className="space-y-2">
                  <Label htmlFor="kidFriendly" className="text-sm font-medium text-gray-700">Kid Friendly</Label>
                  <Select value={mealPreferences.kidFriendly} onValueChange={(value) => setMealPreferences(prev => ({...prev, kidFriendly: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="no-preference">No Preference</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}