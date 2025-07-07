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

  // Clean implementation without debug logs

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
    
    // Row 4: Allergies
    if (userData?.allergies && userData.allergies.trim()) {
      const allergies = userData.allergies.length > 30 ? userData.allergies.substring(0, 30) + '...' : userData.allergies;
      rows.push({ label: "Allergies", value: allergies });
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
                <div className="text-center py-4">
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

        </div>
      </div>
    </div>
  );
}