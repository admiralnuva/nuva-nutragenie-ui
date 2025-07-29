import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Utensils, Edit2, Save, X } from "lucide-react";

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

const dietaryOptions = [
  { emoji: '🥬', label: 'Vegetarian', value: 'vegetarian' },
  { emoji: '🌱', label: 'Vegan', value: 'vegan' },
  { emoji: '🚫', label: 'Gluten-Free', value: 'gluten-free' },
  { emoji: '🥛', label: 'Dairy-Free', value: 'dairy-free' },
  { emoji: '🥜', label: 'Nut-Free', value: 'nut-free' },
  { emoji: '🐟', label: 'Pescatarian', value: 'pescatarian' },
  { emoji: '🥩', label: 'Keto', value: 'keto' },
  { emoji: '🌾', label: 'Low-Carb', value: 'low-carb' }
];

const healthOptions = [
  { emoji: '🩺', label: 'Diabetes', value: 'diabetes' },
  { emoji: '❤️', label: 'Heart Issues', value: 'cardiovascular' },
  { emoji: '🫘', label: 'Kidney', value: 'kidney' },
  { emoji: '🩸', label: 'Hypertension', value: 'blood-pressure' },
  { emoji: '🎗️', label: 'Cancer', value: 'cancer' },
  { emoji: '✅', label: 'None', value: 'none' }
];

const fitnessOptions = [
  { emoji: '💪', label: 'Build Muscle', value: 'build-muscle' },
  { emoji: '⚖️', label: 'Lose Weight', value: 'lose-weight' },
  { emoji: '🏃', label: 'Endurance', value: 'endurance' },
  { emoji: '🧘', label: 'Holistic', value: 'wellness' }
];

interface DietaryPreferencesCardProps {
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
  onSave: (data: any) => void;
}

export function DietaryPreferencesCard({ userData, onSave }: DietaryPreferencesCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    dietaryRestrictions: userData?.dietaryRestrictions || [],
    healthGoals: userData?.healthGoals || [],
    allergies: userData?.allergies || '',
    nutritionalTargets: userData?.nutritionalTargets || {
      calories: [300, 600],
      protein: [15, 40],
      carbs: [20, 60],
      fat: [10, 25],
      fiber: [5, 25]
    }
  });

  const userAvatarSrc = userData?.avatar ? userAvatars[userData.avatar as keyof typeof userAvatars] : userAvatar1;

  const toggleSelection = (category: 'dietaryRestrictions' | 'healthGoals', value: string) => {
    setEditData(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleSave = () => {
    onSave(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      dietaryRestrictions: userData?.dietaryRestrictions || [],
      healthGoals: userData?.healthGoals || [],
      allergies: userData?.allergies || '',
      nutritionalTargets: userData?.nutritionalTargets || {
        calories: [300, 600],
        protein: [15, 40],
        carbs: [20, 60],
        fat: [10, 25],
        fiber: [5, 25]
      }
    });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Utensils className="w-5 h-5" />
              Dietary Preferences
            </CardTitle>
            <CardDescription>Your nutrition and health preferences</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center">
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="text-purple-600 hover:text-purple-700"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isEditing ? (
          // View Mode
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Dietary Restrictions</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {(userData?.dietaryRestrictions || []).map((restriction) => {
                  const option = dietaryOptions.find(opt => opt.value === restriction);
                  return (
                    <Badge key={restriction} variant="secondary">
                      {option?.emoji} {option?.label}
                    </Badge>
                  );
                })}
                {(!userData?.dietaryRestrictions || userData.dietaryRestrictions.length === 0) && (
                  <p className="text-sm text-gray-500">No restrictions set</p>
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Health & Fitness Goals</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {(userData?.healthGoals || []).map((goal) => {
                  const option = [...healthOptions, ...fitnessOptions].find(opt => opt.value === goal);
                  return (
                    <Badge key={goal} variant="secondary">
                      {option?.emoji} {option?.label}
                    </Badge>
                  );
                })}
                {(!userData?.healthGoals || userData.healthGoals.length === 0) && (
                  <p className="text-sm text-gray-500">No goals set</p>
                )}
              </div>
            </div>

            {userData?.allergies && (
              <div>
                <Label className="text-sm font-medium text-gray-700">Allergies</Label>
                <p className="text-sm text-gray-600 mt-1">{userData.allergies}</p>
              </div>
            )}
          </div>
        ) : (
          // Edit Mode
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Dietary Restrictions</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {dietaryOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => toggleSelection('dietaryRestrictions', option.value)}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      editData.dietaryRestrictions.includes(option.value)
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-sm">
                      {option.emoji} {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Health Conditions</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {healthOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => toggleSelection('healthGoals', option.value)}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      editData.healthGoals.includes(option.value)
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-sm">
                      {option.emoji} {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Fitness Goals</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {fitnessOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => toggleSelection('healthGoals', option.value)}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      editData.healthGoals.includes(option.value)
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-sm">
                      {option.emoji} {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="allergies" className="text-sm font-medium text-gray-700">Allergies & Additional Notes</Label>
              <Textarea
                id="allergies"
                value={editData.allergies}
                onChange={(e) => setEditData({...editData, allergies: e.target.value})}
                className="mt-1"
                placeholder="List any allergies or additional dietary requirements..."
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Nutritional Targets</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-medium text-gray-700">Calories</label>
                    <span className="text-xs text-gray-600">{editData.nutritionalTargets.calories?.[0]}-{editData.nutritionalTargets.calories?.[1]}</span>
                  </div>
                  <Slider
                    value={editData.nutritionalTargets.calories || [300, 600]}
                    onValueChange={(value) => setEditData({
                      ...editData,
                      nutritionalTargets: { ...editData.nutritionalTargets, calories: value }
                    })}
                    max={1000}
                    min={100}
                    step={50}
                    className="w-full"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-medium text-gray-700">Protein</label>
                    <span className="text-xs text-gray-600">{editData.nutritionalTargets.protein?.[0]}-{editData.nutritionalTargets.protein?.[1]}g</span>
                  </div>
                  <Slider
                    value={editData.nutritionalTargets.protein || [15, 40]}
                    onValueChange={(value) => setEditData({
                      ...editData,
                      nutritionalTargets: { ...editData.nutritionalTargets, protein: value }
                    })}
                    max={60}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex-1">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}