import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Heart, Target, Utensils } from "lucide-react";

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

const dietaryLabels: { [key: string]: string } = {
  'vegetarian': '🥬 Vegetarian',
  'vegan': '🌱 Vegan',
  'gluten-free': '🚫 Gluten-Free',
  'dairy-free': '🥛 Dairy-Free',
  'nut-free': '🥜 Nut-Free',
  'pescatarian': '🐟 Pescatarian',
  'keto': '🥩 Keto',
  'low-carb': '🌾 Low-Carb'
};

const healthLabels: { [key: string]: string } = {
  'diabetes': '🩺 Diabetes',
  'cardiovascular': '❤️ Heart Issues',
  'kidney': '🫘 Kidney',
  'blood-pressure': '🩸 Hypertension',
  'cancer': '🎗️ Cancer',
  'none': '✅ None'
};

const fitnessLabels: { [key: string]: string } = {
  'build-muscle': '💪 Build Muscle',
  'lose-weight': '⚖️ Lose Weight',
  'endurance': '🏃 Endurance',
  'wellness': '🧘 Holistic'
};

interface DietaryPreferencesSummaryProps {
  userData: {
    nickname?: string;
    avatar?: string;
    dietaryRestrictions?: string[];
    healthGoals?: string[];
    allergies?: string;
    nutritionalTargets?: {
      calories?: number[];
      protein?: number[];
      carbs?: number[];
      fat?: number[];
      fiber?: number[];
    };
  };
}

export function DietaryPreferencesSummary({ userData }: DietaryPreferencesSummaryProps) {
  const userAvatarSrc = userData?.avatar ? userAvatars[userData.avatar as keyof typeof userAvatars] : userAvatar1;

  // Get dietary preferences from user data
  const dietaryRestrictions = userData?.dietaryRestrictions || [];
  const healthGoals = userData?.healthGoals || [];
  const allergies = userData?.allergies || '';
  const nutritionalTargets = userData?.nutritionalTargets || {};

  // Separate health conditions from fitness goals
  const healthConditions = healthGoals.filter((goal: string) => 
    ['diabetes', 'cardiovascular', 'kidney', 'blood-pressure', 'cancer', 'none'].includes(goal)
  );
  const fitnessGoals = healthGoals.filter((goal: string) => 
    ['build-muscle', 'lose-weight', 'endurance', 'wellness'].includes(goal)
  );

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Utensils className="w-5 h-5" />
              Dietary Preferences
            </CardTitle>
            <CardDescription>Your personalized nutrition profile</CardDescription>
          </div>
          <div className="flex flex-col items-center ml-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-white">
              <img 
                src={userAvatarSrc} 
                alt="User Avatar"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <p className="text-xs text-gray-600 mt-1 text-center font-medium">
              {userData?.nickname || "User"}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Dietary Restrictions */}
        {dietaryRestrictions.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-purple-600" />
              <h4 className="text-sm font-semibold text-gray-800">Dietary Restrictions</h4>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {dietaryRestrictions.map((restriction: string) => dietaryLabels[restriction] || restriction).join(', ')}
            </p>
          </div>
        )}

        {/* Health Conditions */}
        {healthConditions.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-purple-600" />
              <h4 className="text-sm font-semibold text-gray-800">Health Factors</h4>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {healthConditions.map((condition: string) => healthLabels[condition] || condition).join(', ')}
            </p>
          </div>
        )}

        {/* Fitness Goals */}
        {fitnessGoals.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-purple-600" />
              <h4 className="text-sm font-semibold text-gray-800">Fitness Goals</h4>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {fitnessGoals.map((goal: string) => fitnessLabels[goal] || goal).join(', ')}
            </p>
          </div>
        )}

        {/* Allergies */}
        {allergies && (
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Allergies & Restrictions</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{allergies}</p>
          </div>
        )}

        {/* Nutritional Goals */}
        {nutritionalTargets && Object.keys(nutritionalTargets).length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Daily Nutritional Goals</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {nutritionalTargets.calories && (
                <div className="bg-purple-50 p-2 rounded">
                  <span className="font-medium">Calories:</span> {nutritionalTargets.calories[0]}-{nutritionalTargets.calories[1]}
                </div>
              )}
              {nutritionalTargets.protein && (
                <div className="bg-purple-50 p-2 rounded">
                  <span className="font-medium">Protein:</span> {nutritionalTargets.protein[0]}-{nutritionalTargets.protein[1]}g
                </div>
              )}
              {nutritionalTargets.carbs && (
                <div className="bg-purple-50 p-2 rounded">
                  <span className="font-medium">Carbs:</span> {nutritionalTargets.carbs[0]}-{nutritionalTargets.carbs[1]}g
                </div>
              )}
              {nutritionalTargets.fat && (
                <div className="bg-purple-50 p-2 rounded">
                  <span className="font-medium">Fat:</span> {nutritionalTargets.fat[0]}-{nutritionalTargets.fat[1]}g
                </div>
              )}
              {nutritionalTargets.fiber && (
                <div className="bg-purple-50 p-2 rounded">
                  <span className="font-medium">Fiber:</span> {nutritionalTargets.fiber[0]}-{nutritionalTargets.fiber[1]}g
                </div>
              )}
            </div>
          </div>
        )}

      </CardContent>
    </Card>
  );
}