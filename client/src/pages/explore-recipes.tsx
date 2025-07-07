import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ScreenHeader } from "@/components/ui/screen-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExploreRecipesScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage<any>("nutragenie_user", null);
  const [tempUser] = useLocalStorage<any>("nutragenie_temp_user", null);
  
  // Get user data - check both current and temp user
  const userData = currentUser || tempUser;

  // Debug: Log user data to see what's available
  console.log("Current user data:", currentUser);
  console.log("Temp user data:", tempUser);
  console.log("Using userData:", userData);

  // Format dietary preferences data into text rows (max 6 rows)
  const formatDietaryData = () => {
    const rows = [];
    
    // Row 1: Dietary Restrictions
    if (userData?.dietaryRestrictions && userData.dietaryRestrictions.length > 0) {
      const restrictions = userData.dietaryRestrictions.slice(0, 3).join(', ');
      const extra = userData.dietaryRestrictions.length > 3 ? ` +${userData.dietaryRestrictions.length - 3} more` : '';
      rows.push({ label: "Dietary", value: restrictions + extra });
    }
    
    // Row 2: Health Conditions (from healthGoals array)
    if (userData?.healthGoals && userData.healthGoals.length > 0) {
      // Filter health conditions vs fitness goals
      const healthConditions = userData.healthGoals.filter((goal: string) => 
        ['diabetes', 'cardiovascular', 'kidney', 'blood-pressure', 'cancer', 'bone-health'].includes(goal)
      );
      if (healthConditions.length > 0) {
        const conditions = healthConditions.slice(0, 2).join(', ');
        const extra = healthConditions.length > 2 ? ` +${healthConditions.length - 2} more` : '';
        rows.push({ label: "Health", value: conditions + extra });
      }
      
      // Row 3: Fitness Goals
      const fitnessGoals = userData.healthGoals.filter((goal: string) => 
        ['build-muscle', 'lose-weight', 'endurance', 'wellness'].includes(goal)
      );
      if (fitnessGoals.length > 0) {
        const goals = fitnessGoals.slice(0, 2).join(', ');
        const extra = fitnessGoals.length > 2 ? ` +${fitnessGoals.length - 2} more` : '';
        rows.push({ label: "Fitness", value: goals + extra });
      }
    }
    
    // Row 4: Food Dislikes
    if (userData?.foodDislikes && userData.foodDislikes.trim()) {
      const dislikes = userData.foodDislikes.length > 30 ? userData.foodDislikes.substring(0, 30) + '...' : userData.foodDislikes;
      rows.push({ label: "Dislikes", value: dislikes });
    }
    
    // Row 5: Allergies
    if (userData?.allergies && userData.allergies.trim()) {
      const allergies = userData.allergies.length > 30 ? userData.allergies.substring(0, 30) + '...' : userData.allergies;
      rows.push({ label: "Allergies", value: allergies });
    }
    
    // Row 6: Additional Notes
    if (userData?.additionalNotes && userData.additionalNotes.trim()) {
      const notes = userData.additionalNotes.length > 30 ? userData.additionalNotes.substring(0, 30) + '...' : userData.additionalNotes;
      rows.push({ label: "Notes", value: notes });
    }
    
    return rows.slice(0, 6); // Ensure max 6 rows
  };

  const dietaryRows = formatDietaryData();
  
  // Debug: Log dietary rows
  console.log("Dietary rows:", dietaryRows);
  console.log("Available properties:", Object.keys(userData || {}));
  
  // Debug: Add temporary sample data to show how it would look
  const hasDietaryData = userData?.dietaryRestrictions || userData?.healthGoals || userData?.foodDislikes || userData?.allergies;
  console.log("Has dietary data:", hasDietaryData);

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
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-purple-600">Your Dietary Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {!userData ? (
                <div className="text-center py-6">
                  <p className="text-gray-500 text-sm mb-3">Please create your account first to view dietary preferences</p>
                  <button 
                    onClick={() => setLocation("/nuva-signup")}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700"
                  >
                    Create Account
                  </button>
                </div>
              ) : dietaryRows.length > 0 ? (
                dietaryRows.map((row, index) => (
                  <div key={index} className="flex justify-between items-start text-sm">
                    <span className="font-medium text-gray-700 w-20 flex-shrink-0">{row.label}:</span>
                    <span className="text-gray-600 flex-1 text-right">{row.value}</span>
                  </div>
                ))
              ) : (
                <div className="space-y-3 py-4">
                  <p className="text-gray-600 text-sm text-center mb-4">Welcome {userData?.nickname}! Let's complete your dietary profile to get personalized recipes.</p>
                  
                  {/* Quick Setup Options */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-700 text-center">Quick setup for testing:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button 
                        onClick={() => {
                          const sampleData = {
                            ...userData,
                            dietaryRestrictions: ['vegetarian', 'gluten-free'],
                            healthGoals: ['diabetes', 'lose-weight'],
                            foodDislikes: 'mushrooms, spicy food',
                            allergies: 'nuts, shellfish',
                            additionalNotes: 'Prefer Mediterranean meals'
                          };
                          localStorage.setItem('nutragenie_user', JSON.stringify(sampleData));
                          window.location.reload();
                        }}
                        className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs"
                      >
                        Add Sample Data
                      </button>
                      <button 
                        onClick={() => setLocation("/dietary")}
                        className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs"
                      >
                        Manual Setup
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setLocation("/dietary")}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 w-full"
                  >
                    Complete Dietary Preferences
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}